import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { injectable } from 'tsyringe';

@injectable()
export class S3Service {
  s3Client: S3Client;
  private readonly PROBLEM_STORE_S3_BUCKET: string;

  constructor() {
    this.s3Client = new S3Client();
    this.PROBLEM_STORE_S3_BUCKET = process.env.PROBLEM_STORE_S3_BUCKET_NAME;
  }

  async getObject(key: string) {
    try {
      const { Body } = await this.s3Client.send(
        new GetObjectCommand({
          Bucket: this.PROBLEM_STORE_S3_BUCKET,
          Key: key,
        })
      );
      if (Body instanceof Readable) {
        return await Body.transformToString();
      }
      throw new Error('Invalid object body');
    } catch (error) {
      console.error(`Failed to get object: ${error.message}`);
      throw error;
    }
  }
}
