import { injectable } from 'tsyringe';
import {
  ExecutionCallback,
  ExecutionRequestPayload,
  StatusMessage,
} from '@code-judge/common';
import { finished } from 'stream';

@injectable()
export class ExecutionService {
  async executeCode({
    submissionId,
    sourceCode,
    testCasesInput,
    expectedOutput,
    language,
  }: ExecutionRequestPayload): Promise<ExecutionCallback> {
    console.log(
      `Execution Payload Received \n'
      RequestId: ${submissionId} \n,
      SourceCode: ${sourceCode}\n, 
      InputTestCases: ${testCasesInput}\n, 
      ExpectedOutput:${expectedOutput}\n,
      language: ${language}\n`
    );

    return new Promise((resolve) => {
      setTimeout(() => {
        const responseObj = {
          submissionId,
          totalTestCases: 10,
          testCasesPassed: 10,
          statusMessage: StatusMessage.ACCEPTED,
          finished: true,
        };
        resolve(responseObj);
      }, 2000);
    });
  }
}
