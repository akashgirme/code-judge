import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SubmissionService } from '../services/submission.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../auth/decorators';
import { User } from '../../user/entities';
import {
  CreateSubmissionDto,
  CreateSubmissionResponseDto,
  RunStatusResponseDto,
  SubmissionResponse,
  SubmitStatusResponseDto,
} from '../dto';
import { Submission } from '../entities';
import { AuthGuard } from '@nestjs/passport';
import { AbilityGuard } from '../../ability/ability.guard';
import { CheckAbilities } from '../../ability/ability.decorator';
import { Action } from '../../ability/ability.factory';
import { Throttle } from '@nestjs/throttler';
import { plainToClass, plainToInstance } from 'class-transformer';

const RATE_LIMIT_TIME_IN_MILISECONDS = 30 * 1000; // 30s

@ApiTags('submissions')
@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post('/submit')
  @Throttle({ default: { limit: 5, ttl: RATE_LIMIT_TIME_IN_MILISECONDS } })
  @UseGuards(AuthGuard(), AbilityGuard)
  @ApiCreatedResponse({ type: CreateSubmissionResponseDto })
  async createSubmission(
    @CurrentUser() user: User,
    @Body() body: CreateSubmissionDto
  ): Promise<CreateSubmissionResponseDto> {
    return this.submissionService.createSubmission(user, body);
  }

  @Post('/run')
  @Throttle({ default: { limit: 5, ttl: RATE_LIMIT_TIME_IN_MILISECONDS } })
  @UseGuards(AuthGuard(), AbilityGuard)
  @ApiCreatedResponse({ type: CreateSubmissionResponseDto })
  async createRun(
    @CurrentUser() user: User,
    @Body() body: CreateSubmissionDto
  ): Promise<CreateSubmissionResponseDto> {
    return this.submissionService.createRun(user, body);
  }

  @Get('/status/run')
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.ReadOwn, subject: Submission })
  @ApiOkResponse({ type: RunStatusResponseDto })
  async getRunStatus(@Query('id') id: string): Promise<RunStatusResponseDto> {
    return this.submissionService.getRunStatus(id);
  }

  @Get('/status/submit')
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.ReadOwn, subject: Submission })
  @ApiOkResponse({ type: SubmitStatusResponseDto })
  async getSubmitStatus(@Query('id') id: string): Promise<SubmitStatusResponseDto> {
    return this.submissionService.getSubmitStatus(id);
  }

  @Get('/')
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.ReadOwn, subject: Submission })
  @ApiOkResponse({ type: [SubmissionResponse] })
  async getSubmissions(
    @CurrentUser() user: User,
    @Param('problemId', ParseIntPipe) problemId: number
  ): Promise<SubmissionResponse[]> {
    const submissions = await this.submissionService.getSubmissionsByProblem(
      user,
      problemId
    );

    return plainToInstance(SubmissionResponse, submissions);
  }

  @Get('/:submissionId')
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.ReadOwn, subject: Submission })
  @ApiOkResponse({ type: SubmissionResponse })
  async getSubmissionById(
    @CurrentUser() user: User,
    @Param('submissionId', ParseIntPipe) submissionId: number
  ): Promise<SubmissionResponse> {
    const submission = await this.submissionService.getSubmission(user, submissionId);
    return plainToClass(SubmissionResponse, submission);
  }
}
