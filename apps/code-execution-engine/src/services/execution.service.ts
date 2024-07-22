import { injectable } from 'tsyringe';
import { IExecutionPayload } from '../interfaces';
import { S3Service } from './s3.service';
import axios from 'axios';

@injectable()
export class ExecutionService {
  constructor(private readonly s3Service: S3Service) {}

  async executeCode({
    submissionId,
    sourceCodeSlug,
    inputTestCasesSlug,
    expectedOutputSlug,
    language,
  }: IExecutionPayload) {
    const sourceCode = await this.s3Service.getObject(sourceCodeSlug);
    const inputTestCases = await this.s3Service.getObject(inputTestCasesSlug);
    const expectedOutput = await this.s3Service.getObject(expectedOutputSlug);

    console.log(`Execution Payload\n'
      SourceCode: ${sourceCode}\n, 
      InputTestCases: ${inputTestCases}\n, 
      ExpectedOutput:${expectedOutput}\n,
      Execution-language: ${language}\n`);

    const callbackUrl = `${process.env.PROBLEM_API_SERVER_URL}/api/submissions/callback`;

    //TODO: This is mock function but here is actual execution via docker goes.
    setTimeout(async () => {
      const totalTestCases = 5;
      const testCasesPassed = 10;
      const stderr = 'Error: Invalid syntax';

      // Send result back to the problem server
      await axios.post(callbackUrl, {
        submissionId,
        totalTestCases,
        testCasesPassed,
        stderr,
      });
    }, 2000);
  }
}
