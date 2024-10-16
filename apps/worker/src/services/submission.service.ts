import { injectable } from 'tsyringe';
import { redisClient } from '../config/redis-connection.config';
import { SubmissionRequest } from '@code-judge/common';
import { Submission } from '../types';

@injectable()
export class SubmissionService {
  // private getSubmission()
  // private updateSubmission()

  async getSubmission(key: string): Promise<SubmissionRequest> {
    let submission: SubmissionRequest;
    try {
      const value = await redisClient.get(`submission:${key}`);
      submission = JSON.parse(value);
      console.log(`Value for key ${key}:`, submission);
    } catch (err) {
      console.error('Error fetching value from Redis:', err);
    }

    return submission;
  }

  async updateSubmission(submission: Submission) {
    try {
      const stringifiedSubmission = JSON.stringify(submission);
      await redisClient.set(`submission:${submission.id}`, stringifiedSubmission);
    } catch (err) {
      console.error('Error storing value in Redis:', err);
    }
  }
}
