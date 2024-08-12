import { injectable } from 'tsyringe';
import axios from 'axios';
import { ExecutionRequestPayload } from '@code-judge/common';

@injectable()
export class ExecutionService {
  async executeCode({
    requestId,
    executionType,
    sourceCode,
    testCasesInput,
    expectedOutput,
    language,
  }: ExecutionRequestPayload) {
    console.log(
      `Execution Payload Received \n'
      RequestId: ${requestId} \n,
      ExecutionType: ${executionType} \n
      SourceCode: ${sourceCode}\n, 
      InputTestCases: ${testCasesInput}\n, 
      ExpectedOutput:${expectedOutput}\n,
      Execution-language: ${language}\n`
    );

    const callbackUrl = process.env.PROBLEM_SERVER_CALLBACK_URL;

    //TODO: This is mock function but here is actual execution via docker goes.
    setTimeout(async () => {
      const totalTestCases = 10;
      const testCasesPassed = 10;
      const stderr = '';
      // Send result back to the problem server
      await axios.post(callbackUrl, {
        requestId,
        executionType,
        totalTestCases,
        testCasesPassed,
        stderr,
      } as ExecutionRequestPayload);
    }, 2000);
  }
}
