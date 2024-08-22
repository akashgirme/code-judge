import { Body, Controller, Post } from '@nestjs/common';
import { ExecutionService } from '../services';
import { ExecutionCallback } from '@code-judge/common';

@Controller('execution')
export class ExecutionController {
  constructor(private readonly executionService: ExecutionService) {}

  @Post('/callback')
  handleCallback(@Body() body: ExecutionCallback): { message: string } {
    this.executionService.handleSubmissionCallback(body);
    return { message: 'Callback Received' };
  }
}
