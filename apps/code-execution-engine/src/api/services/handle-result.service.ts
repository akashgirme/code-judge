import { injectable } from 'tsyringe';

@injectable()
export class HandleResultService {
  async handleSuccessfulJob(id: number) {
    //Log Metadata.txt file
    // Log all files first understand the result and then write further logic
  }

  async handleFailedJob(id: number) {
    //Send statusMessage as executionFailed
  }
}
