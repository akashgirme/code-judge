import { Injectable } from '@nestjs/common';
import { StorageService } from '../../object-store/storage.service';

@Injectable()
export class TestCaseService {
  constructor(private readonly storageService: StorageService) {}

  async saveTestCases(slug: string, testCasesInput: string, expectedOutput: string) {
    await Promise.all([
      this.storageService.putObject(
        `problems/${slug}/testcases/input.txt`,
        testCasesInput
      ),
      this.storageService.putObject(
        `problems/${slug}/testcases/output.txt`,
        expectedOutput
      ),
    ]);
  }

  getTestCasesInput(problemSlug: string) {
    return this.storageService.getObject(`problems/${problemSlug}/testcases/input.txt`);
  }

  getExpectedOutput(problemSlug: string) {
    return this.storageService.getObject(`problems/${problemSlug}/testcases/output.txt`);
  }
}
