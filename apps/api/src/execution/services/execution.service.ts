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
import { ExecuteFuncReturn, ExecuteRequestArgs } from '../types';
import { SolutionService } from '../../solution/services';
import { SubmissionService } from '../../submission/services/submission.service';

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

  /***
   * If problemId and submissionId is provided then execution is done for submission
   * If only problemId is provided the execution is for problem verification.
   * @param {string} problemId // problemId as uuid
   * @param {string} submissionId //submissionId as uuid
   * @returns { Promise<ExecuteFuncReturn>}
   */
  async execute({
    problemId,
    submissionId,
  }: ExecuteRequestArgs): Promise<ExecuteFuncReturn> {
    const [problemResult, submissionResult] = await Promise.all([
      this.problemService.getProblemById(problemId),
      this.submissionService.getSubmissionById(submissionId),
    ]);

    const { slug: problemSlug, primarySolutionLanguage } = problemResult;
    const { slug: submissionSlug, language } = submissionResult;

    let sourceCode = await this.solutionService.getSolutionAddedBySubmissionRecord(
      submissionSlug
    );
    let executionLanguage = language;
    let requestId = submissionId;
    let executionType = ExecutionType.SUBMISSIONEXECUTION;

    if (!submissionId) {
      sourceCode = await this.solutionService.getSolutionAddedAsProblemSolution(
        problemSlug,
        primarySolutionLanguage
      );
      executionLanguage = primarySolutionLanguage;
      requestId = problemId;
      executionType = ExecutionType.PROBLEMEXECUTION;
    }

    const [inputTestCases, expectedOutput] = await Promise.all([
      this.testCaseService.getTestCasesInput(problemSlug),
      this.testCaseService.getExpectedOutput(problemSlug),
    ]);

    const { message, requestId: id } = await this.requestExecution({
      requestId,
      sourceCode,
      language: executionLanguage,
      testCasesInput: inputTestCases,
      expectedOutput,
      executionType,
    });

    return {
      message,
      requestId: id,
    } as ExecuteFuncReturn;
  }

  /**
   * This method send request to execution-server with payload and return a requestId
   * @returns {Promise<ExecuteFuncReturn>}
   */
  async requestExecution({
    requestId,
    sourceCode,
    language,
    testCasesInput,
    expectedOutput,
    executionType,
  }: ExecutionRequestPayload): Promise<ExecuteFuncReturn> {
    const executionServerUrl = this.configService.get<string>(
      'CODE_EXECUTION_REQUEST_URL'
    );

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
      if (error.response) {
        // Axios error with response
        this.logger.error('Execution server responded with error', error.response.data);
        throw new InternalServerErrorException(
          'Execution server error',
          `${error.response.data.message}`
        );
      } else {
        // Axios error without response
        this.logger.error("Execution server didn't response");
        throw new ServiceUnavailableException(
          'Failed to communicate with execution server'
        );
      }
    }

    this.logger.log('Execution Request Send ', requestId);

    return {
      message: 'Execution Request Send successfully ',
      requestId,
    } as ExecuteFuncReturn;
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
