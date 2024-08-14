import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SubmissionService } from '../services/submission.service';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { CurrentUser } from '../../auth/decorators';
import { User } from '../../user/entities';
import { AllSubmissionsDto, CreateSubmissionDto, SubmissionResponseDto } from '../dto';
import { Submission } from '../entities';
import { AuthGuard } from '@nestjs/passport';
import { AbilityGuard } from '../../ability/ability.guard';
import { CheckAbilities } from '../../ability/ability.decorator';
import { Action } from '../../ability/ability.factory';
import {
  SubmissionsQueryDto,
  SubmissionsQueryValidatorDto,
} from '../dto/submissions-query.dto';

@Controller('submissions')
export class SubmissionController {
  private logger = new Logger(SubmissionController.name);

  constructor(private readonly submissionService: SubmissionService) {}

  @Post('/')
  @UseGuards(AuthGuard(), AbilityGuard)
  @ApiOkResponse({ type: Submission })
  async createSubmission(
    @CurrentUser() user: User,
    @Body() body: CreateSubmissionDto
  ): Promise<Submission> {
    return this.submissionService.createSubmission(user, body);
  }

  @Get('/problem/:problemId')
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: () => AllSubmissionsDto })
  @ApiQuery({ type: () => SubmissionsQueryDto })
  getSubmissionsByProblem(
    @Param('problemId', ParseIntPipe) problemId: number,
    @Query() query: SubmissionsQueryValidatorDto
  ): Promise<AllSubmissionsDto> {
    return this.submissionService.getSubmissionsByProblem(problemId, query);
  }

  @Get('/user/:problemId')
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.ReadOwn, subject: Submission })
  @ApiOkResponse({ type: [Submission] })
  getSubmissionsByUserAndProblem(
    @CurrentUser() user: User,
    @Param('problemId', ParseIntPipe) problemId: number
  ): Promise<Submission[]> {
    return this.submissionService.getSubmissionsByProblemAndUser(user, problemId);
  }

  @Get('/:submissionId')
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.ReadOwn, subject: Submission })
  @ApiOkResponse({ type: SubmissionResponseDto })
  getSubmissionById(
    @Param('submissionId', ParseIntPipe) submissionId: number
  ): Promise<SubmissionResponseDto> {
    return this.submissionService.getSubmissionById(submissionId);
  }
}
