import {
  QueueEventsListener,
  QueueEventsHost,
  OnQueueEvent,
  InjectQueue,
} from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@QueueEventsListener('submission')
export class SubmissionQueueEvents extends QueueEventsHost {
  constructor(@InjectQueue('submission') private readonly queue: Queue) {
    super();
  }
  @OnQueueEvent('completed')
  async onCompleted({ jobId }: { jobId: string; returnvalue: string; prev?: string }) {
    const job = await this.queue.getJob(jobId);

    if (job) {
      const { id, name, data, finishedOn, returnvalue } = job;
      const { submissionKey } = data;

      await this.queue.add('addSubmissionToDB', { submissionKey });
    }
  }
}
