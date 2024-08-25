import { injectable } from 'tsyringe';
import { HandleResultService } from './handle-result.service';

@injectable()
export class StartupService {
  constructor(private handleResultService: HandleResultService) {}

  initialize() {
    // The HandleResultService is instantiated and starts processing
    // due to its constructor logic
    console.log('HandleResultService initialized');
  }
}
