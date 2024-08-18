import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';

@Injectable()
export class StorageService {
  s3Client: S3Client;
  private logger = new Logger(StorageService.name);
  private readonly PROBLEM_STORE_S3_BUCKET: string;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client();
    this.PROBLEM_STORE_S3_BUCKET =
      this.configService.get<string>('PROBLEM_STORE_S3_BUCKET_NAME') ??
      'problems-content';
  }

  async putObject(key: string, body: string) {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.PROBLEM_STORE_S3_BUCKET,
          Key: key,
          Body: body,
          ContentLength: Buffer.byteLength(body),
        })
      );
    } catch (error) {
      this.logger.error(`Failed to put object: ${error.message}`);
      throw error;
    }
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
      this.logger.error(`Failed to get object: ${error.message}`);
      throw error;
    }
  }

  async deleteObject(key: string) {
    try {
      await this.s3Client.send(
        new DeleteObjectCommand({ Bucket: this.PROBLEM_STORE_S3_BUCKET, Key: key })
      );
    } catch (error) {
      this.logger.error(`Failed to delete object: ${error.message}`);
      throw error;
    }
  }
}
