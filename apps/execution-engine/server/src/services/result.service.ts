import { injectable, singleton } from 'tsyringe';
import { logger } from '../utils';
import {
  ExecutionCallback,
  ResultQueueFailedJobDataType,
  ResultQueueSuccessfulJobDataType,
  StatusMessage,
} from '@code-judge/common';
import axios from 'axios';

@injectable()
@singleton()
export class ResultService {
  constructor() {}

  async handleSuccessfulJob({
    id,
    status,
    time,
    memory,
    testCasesPassed,
    totalTestCases,
    stderr,
  }: ResultQueueSuccessfulJobDataType) {
    const callbackObj: ExecutionCallback = {
      submissionId: id,
      statusMessage: status,
      time,
      memory,
      testCasesPassed,
      totalTestCases,
      stderr,
    };

    await this.sendCallback(callbackObj);
  }

  async handleFailedJob({ id }: ResultQueueFailedJobDataType) {
    const callbackObj: ExecutionCallback = {
      submissionId: id,
      statusMessage: StatusMessage.UNEXPECTED_ERROR,
    };

    await this.sendCallback(callbackObj);
  }

  private async sendCallback(callbackObj: ExecutionCallback) {
    const callbackUrl = process.env.CALLBACK_URL;
    const apiKey = process.env.EXECUTION_API_KEY;

    if (!callbackUrl || !apiKey) {
      logger.error('Callback URL or API Key not set');
      return;
    }

    const payload = callbackObj;

    try {
      const response = await axios.post(callbackUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        logger.info(`Callback sent successfully for job ${callbackObj.submissionId}`);
      } else {
        logger.warn(
          `Callback request for job ${callbackObj.submissionId} returned status: ${response.status}`
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        logger.error(
          `Error sending callback for job ${callbackObj.submissionId}: ${error.message}, ${error.response}, ${error.request}`
        );
      } else {
        logger.error(
          `Unexpected error sending callback for job ${callbackObj.submissionId}:`,
          error
        );
      }
    }
  }
}
