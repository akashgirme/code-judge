import { ExecutionCallback } from '@code-judge/common';
import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ExecutionService } from '../services';
import { stderr } from 'process';

@Controller('execute')
export class ExecutionController {
  private logger = new Logger(ExecutionController.name);

  constructor(private readonly executionService: ExecutionService) {}
  @Post('/callback')
  async handleExecutionCallback(@Body() body: ExecutionCallback): Promise<void> {
    //
    this.logger.log(`
      Execution response callback received \n
      RequestId: ${body.requestId} \n
      Execution Type: ${body.executionType} \n
      TotalTestCases: ${body.totalTestCases} \n
      TestCasesPassed: ${body.testCasesPassed} \n
      Standard error (if any): ${stderr}
    `);
    //

    await this.executionService.handleExecutionResponse(body);
  }
}
