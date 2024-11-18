import {
  QueueEventsListener,
  QueueEventsHost,
  OnQueueEvent,
  InjectQueue,
} from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { SubmissionService } from '../submission/services/submission.service';

@QueueEventsListener('submission')
export class SubmissionQueueEvents extends QueueEventsHost {
  constructor(
    @InjectQueue('submission') private readonly queue: Queue,
    private readonly submissionService: SubmissionService
  ) {
    super();
  }
  @OnQueueEvent('completed')
  async onCompleted({ jobId }: { jobId: string; returnvalue: string; prev?: string }) {
    try {
      const job = await this.queue.getJob(jobId);

      if (job) {
        await this.submissionService.createDBEntry(job.data);
      } else {
        console.error('Invalid job data:', job?.data);
      }
    } catch (error) {
      console.error('Error processing completed job:', error);
    }
    return;
  }
}
