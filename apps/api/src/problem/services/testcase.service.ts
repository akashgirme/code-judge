import { Injectable } from '@nestjs/common';
import { StorageService } from '../../object-store/storage.service';

@Injectable()
export class TestCaseService {
  constructor(private readonly storageService: StorageService) {}

  async saveTestCases(problemSlug: string, input: string, output: string) {
    await Promise.all([
      this.storageService.putObject(`problems/${problemSlug}/testcases/input.txt`, input),
      this.storageService.putObject(
        `problems/${problemSlug}/testcases/output.txt`,
        output
      ),
    ]);
  }

  async getTestCases(problemSlug: string): Promise<{ input: string; output: string }> {
    const input = await this.storageService.getObject(
      `problems/${problemSlug}/testcases/input.txt`
    );

    const output = await this.storageService.getObject(
      `problems/${problemSlug}/testcases/output.txt`
    );

    return { input, output };
  }
}
