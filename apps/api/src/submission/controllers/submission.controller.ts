import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SubmissionService } from '../services/submission.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../auth/decorators';
import { User } from '../../user/entities';
import { CreateSubmissionDto, SubmissionDto } from '../dto';
import { Submission } from '../entities';
import { AuthGuard } from '@nestjs/passport';
import { AbilityGuard } from '../../ability/ability.guard';
import { CheckAbilities } from '../../ability/ability.decorator';
import { Action } from '../../ability/ability.factory';
import {} from '../dto/submissions-query.dto';

@ApiTags('submissions')
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
  @ApiOkResponse({ type: SubmissionDto })
  getSubmissionById(
    @CurrentUser() user: User,
    @Param('submissionId', ParseIntPipe) submissionId: number
  ): Promise<SubmissionDto> {
    return this.submissionService.getSubmission(user, submissionId);
  }
}
