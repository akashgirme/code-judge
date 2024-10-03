import { Injectable } from '@nestjs/common';
import { StorageService } from '../../object-store/storage.service';
import { AddTestCaseParams } from '../types';

@Injectable()
export class TestCaseService {
  constructor(private readonly storageService: StorageService) {}

  async saveAuthorTestCases({ problemSlug, input, output }: AddTestCaseParams) {
    await Promise.all([
      this.storageService.putObject(
        `problems/${problemSlug}/author-testcases/input.txt`,
        input
      ),
      this.storageService.putObject(
        `problems/${problemSlug}/author-testcases/output.txt`,
        output
      ),
    ]);
  }

  async getAuthorTestCases(
    problemSlug: string
  ): Promise<{ input: string; output: string }> {
    const [input, output] = await Promise.all([
      this.storageService.getObject(`problems/${problemSlug}/author-testcases/input.txt`),
      this.storageService.getObject(
        `problems/${problemSlug}/author-testcases/output.txt`
      ),
    ]);

    return { input, output };
  }

  async savePlatformTestCases({ problemSlug, input, output }: AddTestCaseParams) {
    await Promise.all([
      this.storageService.putObject(
        `problems/${problemSlug}/platform-testcases/input.txt`,
        input
      ),
      this.storageService.putObject(
        `problems/${problemSlug}/platform-testcases/output.txt`,
        output
      ),
    ]);
  }

  async getPlatformTestCases(
    problemSlug: string
  ): Promise<{ input: string; output: string }> {
    const [input, output] = await Promise.all([
      this.storageService.getObject(
        `problems/${problemSlug}/platform-testcases/input.txt`
      ),
      this.storageService.getObject(
        `problems/${problemSlug}/platform-testcases/output.txt`
      ),
    ]);

    return { input, output };
  }
}
