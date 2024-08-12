import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ProblemService, TestCaseService } from '../../problem/services';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import {
  ExecutionCallback,
  ExecutionRequestPayload,
  ExecutionType,
} from '@code-judge/common';
import { SolutionService } from '../../solution/services';
import { SubmissionService } from '../../submission/services/submission.service';
import axios from 'axios';

@Injectable()
export class ExecutionService {
  private logger = new Logger(ExecutionService.name);
  constructor(
    @Inject(forwardRef(() => ProblemService))
    private readonly problemService: ProblemService,
    @Inject(forwardRef(() => SolutionService))
    private readonly solutionService: SolutionService,
    @Inject(forwardRef(() => SubmissionService))
    private readonly submissionService: SubmissionService,
    @Inject(forwardRef(() => TestCaseService))
    private readonly testCaseService: TestCaseService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  async verifyProblem(problemId: string) {
    const { slug, primarySolutionLanguage } = await this.problemService.getProblemById(
      problemId
    );
    const sourceCode = await this.solutionService.getSolutionAddedAsProblemSolution(
      slug,
      primarySolutionLanguage
    );

    const [testCasesInput, expectedOutput] = await Promise.all([
      this.testCaseService.getTestCasesInput(slug),
      this.testCaseService.getExpectedOutput(slug),
    ]);

    const requestPayloadObj: ExecutionRequestPayload = {
      requestId: problemId,
      sourceCode,
      language: primarySolutionLanguage,
      testCasesInput,
      expectedOutput,
      executionType: ExecutionType.PROBLEMEXECUTION,
    };

    await this.sendRequestToExecutionServer(requestPayloadObj);
  }

  async executeSubmission(problemId: string, submissionId: string) {
    const { slug, language } = await this.submissionService.getSubmissionById(
      submissionId
    );
    const [problem, sourceCode] = await Promise.all([
      this.problemService.getProblemById(problemId),
      this.solutionService.getSolutionAddedBySubmissionRecord(slug),
    ]);

    const [testCasesInput, expectedOutput] = await Promise.all([
      this.testCaseService.getTestCasesInput(problem.slug),
      this.testCaseService.getExpectedOutput(problem.slug),
    ]);

    const requestPayloadObj: ExecutionRequestPayload = {
      requestId: submissionId,
      sourceCode,
      language,
      testCasesInput,
      expectedOutput,
      executionType: ExecutionType.SUBMISSIONEXECUTION,
    };

    await this.sendRequestToExecutionServer(requestPayloadObj);
  }

  /**
   * This method send request to execution-server with payload.
   * @returns {Promise<void>}
   */
  async sendRequestToExecutionServer({
    requestId,
    sourceCode,
    language,
    testCasesInput,
    expectedOutput,
    executionType,
  }: ExecutionRequestPayload): Promise<void> {
    const executionServerUrl =
      this.configService.get<string>('CODE_EXECUTION_REQUEST_URL') ?? '';

    try {
      await firstValueFrom(
        this.httpService.post(executionServerUrl, {
          requestId,
          sourceCode,
          testCasesInput,
          expectedOutput,
          language,
          executionType,
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error with response
        this.logger.error('Execution server responded with error', error.response?.data);
        throw new InternalServerErrorException(
          'Execution server error',
          `${error.response?.data?.message}`
        );
      } else {
        // Axios error without response
        this.logger.error("Execution server didn't response");
        throw new ServiceUnavailableException(
          'Failed to communicate with execution server'
        );
      }
    }

    this.logger.log('Execution request send successfully: ', requestId);
  }

  async handleExecutionResponse({
    requestId,
    executionType,
    totalTestCases,
    testCasesPassed,
    stderr,
  }: ExecutionCallback) {
    if (executionType === ExecutionType.PROBLEMEXECUTION) {
      return this.problemService.setVerified(requestId);
    }

    return this.submissionService.updateSubmission({
      submissionId: requestId,
      totalTestCases,
      testCasesPassed,
      stderr,
    });
  }
}
