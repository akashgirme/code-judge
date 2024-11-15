import { Processor, WorkerHost } from '@nestjs/bullmq';
import { SubmissionService } from '../submission/services/submission.service';
import { Job } from 'bullmq';

@Processor('addSubmissionToDB')
export class DbWritesService extends WorkerHost {
  constructor(private readonly submissionService: SubmissionService) {
    super();
  }
  async process(job: Job<any, any, string>): Promise<any> {
    const { submissionKey } = job.data;
    let attempts = 0;
    const maxAttempts = 5;
    let success = false;

    while (attempts < maxAttempts && !success) {
      try {
        await this.submissionService.createDBEntry(submissionKey);
        success = true;
      } catch (error) {
        attempts++;
        console.error(
          `Attempt ${attempts} failed for submissionKey ${submissionKey}:`,
          error
        );

        if (attempts < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempts));
        }
      }
    }
  }
}
