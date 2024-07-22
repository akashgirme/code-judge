import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { SubmissionService } from '../services/submission.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { CurrentUser } from '../../auth/decorators';
import { User } from '../../user/entities';
import { CreateSubmissionDto, GetSubmissionDto, UpdateSubmissionResultDto } from '../dto';
import { Submission } from '../entities';
import { AuthGuard } from '@nestjs/passport';
import { AbilityGuard } from '../../ability/ability.guard';

@UseGuards(AuthGuard(), AbilityGuard)
@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post('/')
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
  async rejudgeSubmission() {
    //...
  }

  @Post('/callback')
  async handleExecutionCallback(@Body() body: UpdateSubmissionResultDto) {
    await this.submissionService.updateSubmissionResult(body);
  }

  @Get('/problem/:problemId')
  @ApiOkResponse({ type: [Submission] })
  getSubmissionsByProblemId(
    @CurrentUser() user: User,
    @Param('problemId') problemId: string
  ): Promise<Submission[]> {
    return this.submissionService.getSubmissionsByProblemId(user, problemId);
  }

  @Get('/:submissionId')
  @ApiOkResponse({ type: GetSubmissionDto })
  findSubmissionById(
    @Param('submissionId') submissionId: string
  ): Promise<GetSubmissionDto> {
    return this.submissionService.findSubmissionById(submissionId);
  }
}
