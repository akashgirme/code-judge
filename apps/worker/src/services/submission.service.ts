import { injectable } from 'tsyringe';
import { redisClient } from '../config/redis-connection.config';
import { Submission } from '../types';

@injectable()
export class SubmissionService {
  async getSubmission(key: string): Promise<Submission> {
    let submission: Submission;
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
