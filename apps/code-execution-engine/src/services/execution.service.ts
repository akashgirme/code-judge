import { injectable } from 'tsyringe';
import { IExecutionPayload } from '../interfaces';
import { S3Service } from './s3.service';

@injectable()
export class ExecutionService {
  constructor(private readonly s3Service: S3Service) {}

  async executeCode({
    sourceCodeSlug,
    inputTestCasesSlug,
    expectedOutputSlug,
    language,
  }: IExecutionPayload) {
    const sourceCode = await this.s3Service.getObject(sourceCodeSlug);
    const inputTestCases = await this.s3Service.getObject(inputTestCasesSlug);
    const expectedOutput = await this.s3Service.getObject(expectedOutputSlug);

    console.log('Executing code', sourceCode, inputTestCases, expectedOutput, language);
  }
}
