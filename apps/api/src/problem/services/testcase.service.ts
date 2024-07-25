import { Injectable } from '@nestjs/common';
import { StorageService } from '../../object-store/storage.service';

@Injectable()
export class TestCaseService {
  constructor(private readonly storageService: StorageService) {}

  async saveTestCases(input: string, output: string, slug: string) {
    await Promise.all([
      this.storageService.putObject(`problems/${slug}/testcases/input.txt`, input),
      this.storageService.putObject(`problems/${slug}/testcases/output.txt`, output),
    ]);
  }
}
