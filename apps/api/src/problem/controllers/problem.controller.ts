import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProblemService } from '../services';
import { CurrentUser } from '../../auth/decorators';
import { User } from '../../user/entities';
import {
  AddTestCasesDto,
  AdminProblemDto,
  AllProblemsDto,
  ChangeProblemStatusDto,
  CreateProblemDto,
  ProblemDto,
  ProblemsQueryDto,
  ProblemsQueryValidatorDto,
  SuccessMessageDto,
  UpdateProblemDto,
} from '../dto';
import { Problem } from '../entities';
import { ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AbilityGuard } from '../../ability/ability.guard';
import { CheckAbilities } from '../../ability/ability.decorator';
import { Action } from '../../ability/ability.factory';

@ApiTags('problems')
@Controller('problems')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Post('/')
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.Create, subject: Problem })
  @ApiCreatedResponse({ type: Problem })
  createProblem(
    @CurrentUser() user: User,
    @Body() body: CreateProblemDto
  ): Promise<Problem> {
    return this.problemService.createProblem(user, body);
  }

  @Get('/')
  @ApiOkResponse({ type: AllProblemsDto })
  @ApiQuery({ type: () => ProblemsQueryDto })
  getProblems(@Query() query: ProblemsQueryValidatorDto): Promise<AllProblemsDto> {
    return this.problemService.getProblemsForPublic(query);
  }

  @Get('/admin')
  @ApiOkResponse({ type: AllProblemsDto })
  @ApiQuery({ type: () => ProblemsQueryDto })
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.Read, subject: Problem })
  getProblemsForAdmin(
    @CurrentUser() user: User,
    @Query() query: ProblemsQueryValidatorDto
  ): Promise<AllProblemsDto> {
    return this.problemService.getProblemsForAdmin(user, query);
  }

  @Get('/:problemId')
  @ApiOkResponse({ type: ProblemDto })
  getProblem(@Param('problemId', ParseIntPipe) problemId: number): Promise<ProblemDto> {
    return this.problemService.getProblem(problemId);
  }

  @Get('/admin/:problemId')
  @ApiOkResponse({ type: AdminProblemDto })
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.Read, subject: Problem })
  getProblemForAdmin(
    @Param('problemId', ParseIntPipe) problemId: number
  ): Promise<AdminProblemDto> {
    return this.problemService.getProblemForAdmin(problemId);
  }

  @Put('/:problemId')
  @ApiOkResponse({ type: Problem })
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.Update, subject: Problem })
  updateProblem(
    @Param('problemId', ParseIntPipe) problemId: number,
    @Body() body: UpdateProblemDto
  ): Promise<Problem> {
    return this.problemService.updateProblem(problemId, body);
  }

  @Put('/:problemId/change-status')
  @ApiOkResponse({ type: Problem })
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.Update, subject: Problem })
  changeProblemStatus(
    @Param('problemId', ParseIntPipe) problemId: number,
    @Body() body: ChangeProblemStatusDto
  ): Promise<Problem> {
    return this.problemService.changeProblemStatus(problemId, body);
  }

  @Post('/admin/add-testcases')
  @ApiOkResponse({ type: SuccessMessageDto })
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.Update, subject: Problem })
  addTestCasesToProblem(@Body() body: AddTestCasesDto) {
    return this.problemService.addTestCasesToProblem(body);
  }
}
