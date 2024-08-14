import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { ProblemService, TestCaseService } from '../../problem/services';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ExecutionRequestPayload } from '@code-judge/common';
import { SubmissionService } from '../../submission/services/submission.service';
import axios from 'axios';
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { SubmissionState } from '../../submission/enums';
import { StorageService } from '../../object-store/storage.service';

@Processor('CODE_EXECUTION')
@Injectable()
export class ExecutionService extends WorkerHost {
  private logger = new Logger(ExecutionService.name);
  constructor(
    @Inject(forwardRef(() => ProblemService))
    private readonly problemService: ProblemService,
    @Inject(forwardRef(() => StorageService))
    private readonly storageService: StorageService,
    @Inject(forwardRef(() => SubmissionService))
    private readonly submissionService: SubmissionService,
    @Inject(forwardRef(() => TestCaseService))
    private readonly testCaseService: TestCaseService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    super();
  }

  @OnWorkerEvent('active')
  async onActive(job: Job) {
    this.logger.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`
    );
    const { submissionId } = job.data.payload;

    await this.submissionService.updateSubmission({
      submissionId,
      state: SubmissionState.STARTED,
    });
  }

  @OnWorkerEvent('progress')
  async inProgress(job: Job) {
    const { submissionId } = job.data.payload;

    await this.submissionService.updateSubmission({
      submissionId,
      state: SubmissionState.RUNNING,
    });
  }

  /**
   *  BullMQ not support @Process() from @nestjs/bullmq
   * Hence need to use switch case
   */
  async process(job: Job): Promise<void> {
    switch (job.name) {
      case 'execute': {
        const { problemId, submissionId } = job.data.payload;
        await this.executeSubmission(problemId, submissionId);
        break;
      }
    }
    return;
  }

  async executeSubmission(problemId: number, submissionId: number) {
    const [problem, submission] = await Promise.all([
      this.problemService.getProblemById(problemId),
      this.submissionService.getSubmissionById(submissionId),
    ]);

    const { language, path } = submission;
    const { slug } = problem;

    const [sourceCode, testCases] = await Promise.all([
      this.storageService.getObject(path),
      this.testCaseService.getTestCases(slug),
    ]);

    const requestPayloadObj: ExecutionRequestPayload = {
      submissionId,
      sourceCode,
      language,
      testCasesInput: testCases.input,
      expectedOutput: testCases.output,
    };

    await this.sendRequestToExecutionServer(requestPayloadObj);
  }

  /**
   * This method send request to execution-server with payload.
   * @param {ExecutionRequestPayload}
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

    try {
      const response = await firstValueFrom(
        this.httpService.post(executionServerUrl, {
          submissionId,
          sourceCode,
          testCasesInput,
          expectedOutput,
          language,
        })
      );

      this.logger.log(`Response Status Code: ${response.status}`);
      this.logger.log(`Received Data: `, response.data);

      await this.submissionService.updateSubmission({
        ...response.data,
        state: SubmissionState.SUCCESS,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error with response
        this.logger.error('Execution server responded with error', error.response?.data);
      } else {
        // Axios error without response
        this.logger.error("Execution server didn't response");
      }
    }
  }
}
