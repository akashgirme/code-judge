import { Injectable } from '@nestjs/common';
import { StorageService } from '../../storage/storage.service';

@Injectable()
export class TestCaseService {
  constructor(private readonly storageService: StorageService) {}

  async saveTestCases(input: string, output: string, slug: string) {
    await this.storageService.putObject(`problems/${slug}/testcases/input.txt`, input);
    await this.storageService.putObject(`problems/${slug}/testcases/output.txt`, output);
  }
}
