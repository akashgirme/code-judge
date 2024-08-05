import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProblemService } from '../services';
import { CurrentUser } from '../../auth/decorators';
import { User } from '../../user/entities';
import {
  CreateProblemDto,
  ProblemResponseDto,
  ProblemsQueryDto,
  ProblemsQueryValidatorDto,
  ProblemsResponseDto,
  UpdateProblemDto,
} from '../dto';
import { Problem } from '../entities';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AbilityGuard } from '../../ability/ability.guard';
import { CheckAbilities } from '../../ability/ability.decorator';
import { Action } from '../../ability/ability.factory';

@Controller('problems')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post('/')
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.Create, subject: Problem })
  @ApiOkResponse({ type: Problem })
  createProblem(
    @CurrentUser() user: User,
    @Body() body: CreateProblemDto
  ): Promise<Problem> {
    return this.problemService.createProblem(user, body);
  }

  @Get('/')
  @ApiOkResponse({ type: ProblemsResponseDto })
  @ApiQuery({ type: () => ProblemsQueryDto })
  getProblems(@Query() query: ProblemsQueryValidatorDto): Promise<ProblemsResponseDto> {
    return this.problemService.getProblemForPublic(query);
  }

  @Get('/admin')
  @ApiOkResponse({ type: ProblemsResponseDto })
  @ApiQuery({ type: () => ProblemsQueryDto })
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.ReadOwn, subject: Problem })
  getProblemsForAdmin(
    @CurrentUser() user: User,
    @Query() query: ProblemsQueryValidatorDto
  ): Promise<ProblemsResponseDto> {
    return this.problemService.getProblemForAdmin(user, query);
  }

  @Get('/:problemId')
  @ApiOkResponse({ type: ProblemResponseDto })
  getProblemById(@Param('problemId') problemId: string): Promise<ProblemResponseDto> {
    return this.problemService.getProblemById(problemId);
  }

  @Put('/:problemId')
  @ApiOkResponse({ type: Problem })
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.Update, subject: Problem })
  updateProblem(
    @CurrentUser() user: User,
    @Param('problemId') problemId: string,
    @Body() body: UpdateProblemDto
  ): Promise<Problem> {
    return this.problemService.updateProblem(user, problemId, body);
  }
}
