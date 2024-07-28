import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SubmissionService } from '../services/submission.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { CurrentUser } from '../../auth/decorators';
import { User } from '../../user/entities';
import { CreateSubmissionDto, SubmissionResponseDto, UpdateSubmissionDto } from '../dto';
import { Submission } from '../entities';
import { AuthGuard } from '@nestjs/passport';
import { AbilityGuard } from '../../ability/ability.guard';
import { CheckAbilities } from '../../ability/ability.decorator';
import { Action } from '../../ability/ability.factory';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post('/')
  @UseGuards(AuthGuard(), AbilityGuard)
  @ApiOkResponse({ type: Submission })
  async createSubmission(
    @CurrentUser() user: User,
    @Body() body: CreateSubmissionDto
  ): Promise<Submission> {
    const submission = await this.submissionService.createSubmission(user, body);

    await this.submissionService.sendCodeToExecutionServer({
      submissionId: submission.id,
      problemId: body.problemId,
      sourceCodeSlug: submission.slug,
      language: body.language,
    });

    return submission;
  }

  @Post('/rejudge/:submissionId')
  @UseGuards(AuthGuard(), AbilityGuard)
  async rejudgeSubmission(
    @Param('submissionId') submissionId: string
  ): Promise<Submission> {
    //...
    return;
  }

  @Post('/callback')
  async handleExecutionCallback(@Body() body: UpdateSubmissionDto) {
    await this.submissionService.updateSubmissionResult(body);
  }

  @Get('/problem/:problemId')
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.ReadOwn, subject: Submission })
  @ApiOkResponse({ type: [Submission] })
  getSubmissionsByProblemAndUser(
    @CurrentUser() user: User,
    @Param('problemId') problemId: string
  ): Promise<Submission[]> {
    return this.submissionService.getSubmissionsByProblemAndUser(user, problemId);
  }

  @Get('/:submissionId')
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.ReadOwn, subject: Submission })
  @ApiOkResponse({ type: SubmissionResponseDto })
  findSubmissionById(
    @Param('submissionId') submissionId: string
  ): Promise<SubmissionResponseDto> {
    return this.submissionService.findSubmissionById(submissionId);
  }
}
