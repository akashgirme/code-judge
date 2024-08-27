import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { TestCaseService } from '../../problem/services';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ExecutionCallback, ExecutionRequestPayload } from '@code-judge/common';
import { SubmissionService } from '../../submission/services/submission.service';
import axios from 'axios';
import { SubmissionState } from '../../submission/enums';
import { StorageService } from '../../object-store/storage.service';
import { Problem } from '../../problem/entities';
import { Submission } from '../../submission/entities';

@Injectable()
export class ExecutionService {
  private logger = new Logger(ExecutionService.name);
  constructor(
    @Inject(forwardRef(() => StorageService))
    private readonly storageService: StorageService,
    @Inject(forwardRef(() => SubmissionService))
    private readonly submissionService: SubmissionService,
    @Inject(forwardRef(() => TestCaseService))
    private readonly testCaseService: TestCaseService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  async executeSubmission(problem: Problem, submission: Submission) {
    const { language, path } = submission;
    const { slug } = problem;

    const [sourceCode, testCases] = await Promise.all([
      this.storageService.getObject(path),
      this.testCaseService.getTestCases(slug),
    ]);

    const requestPayloadObj: ExecutionRequestPayload = {
      submissionId: submission.id,
      sourceCode,
      language,
      testCasesInput: testCases.input,
      expectedOutput: testCases.output,
    };

    await this.sendRequestToExecutionServer(requestPayloadObj);
  }

  /**
   * This method send request to execution-server with payload.
   * @param {Object} ExecutionRequestPayload;
   * @returns {Promise<void>}
   */
  async sendRequestToExecutionServer({
    submissionId,
    sourceCode,
    language,
    testCasesInput,
    expectedOutput,
  }: ExecutionRequestPayload): Promise<void> {
    const executionServerUrl =
      this.configService.get<string>('CODE_EXECUTION_REQUEST_URL') ?? '';
    const apiKey = this.configService.get<string>('EXECUTION_API_KEY') ?? '';

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          executionServerUrl,
          {
            submissionId,
            sourceCode,
            language,
            testCasesInput,
            expectedOutput,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
            },
          }
        )
      );

      this.logger.log(`Response Status Code: ${response.status}`);
      this.logger.log(`Received Data: `, response.data);

      if (response.data.message)
        await this.submissionService.updateSubmission({
          submissionId,
          state: SubmissionState.STARTED,
        });
    } catch (error) {
      await this.submissionService.updateSubmission({
        submissionId,
        state: SubmissionState.ERROR,
      });

      if (axios.isAxiosError(error)) {
        // Axios error with response
        this.logger.error('Execution server responded with error', error.response?.data);
      } else {
        // Axios error without response
        this.logger.error("Execution server didn't response");
      }
    }
  }

  async handleSubmissionCallback({
    submissionId,
    totalTestCases,
    testCasesPassed,
    statusMessage,
    stderr,
    time,
    memory,
  }: ExecutionCallback) {
    await this.submissionService.updateSubmission({
      submissionId,
      totalTestCases,
      testCasesPassed,
      statusMessage,
      state: SubmissionState.SUCCESS,
      stderr,
      time,
      memory,
      finished: true,
    });
  }
}
