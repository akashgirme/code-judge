import { injectable } from 'tsyringe';
import { getLanguageConfig, logger } from '../utils';
import { SubmissionService } from './submission.service';
import { SubmissionRequest, SubmissionState } from '@code-judge/common';
import { IsolateJob } from './isolate-job.service';
import { Submission } from '../types';

@injectable()
export class ExecutionService {
  constructor(
    private readonly submissionService: SubmissionService,
    private readonly isolateJob: IsolateJob
  ) {}

  async processSubmission(id: string): Promise<any> {
    let submissionReq: SubmissionRequest;

    submissionReq = await this.submissionService.getSubmission(id);

    const submission: Submission = {
      ...submissionReq,
      id: id,
      state: SubmissionState.STARTED,
      languageConfig: getLanguageConfig(submissionReq.language),
    };

    await this.isolateJob.perform(submission);

    const submissionResult = await this.submissionService.getSubmission(submission.id);

    return submissionResult;
  }
}

/**
 * Properly comment the isolateJob
 * Build SubmissionResult
 * Proper Docker image
 */
