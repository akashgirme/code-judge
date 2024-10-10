import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProblemService, TestCaseService } from '../services';
import { CurrentUser } from '../../auth/decorators';
import { User } from '../../user/entities';
import {
  AdminProblemDto,
  AllProblemsDto,
  AuthorProblemDto,
  ChangeProblemStatusDto,
  CreateProblemDto,
  CreateTestCasesDto,
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
import { plainToClass } from 'class-transformer';

@ApiTags('problems')
@Controller('problems')
export class ProblemController {
  constructor(
    private readonly problemService: ProblemService,
    private testCaseService: TestCaseService
  ) {}

  @Post('/')
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.Create, subject: Problem })
  @ApiCreatedResponse({ type: () => AuthorProblemDto })
  async createProblem(
    @CurrentUser() user: User,
    @Body() body: CreateProblemDto
  ): Promise<AuthorProblemDto> {
    const problem = await this.problemService.createProblem(user, body);
    return plainToClass(AuthorProblemDto, problem);
  }

  @Get('/')
  @ApiOkResponse({ type: AllProblemsDto })
  @ApiQuery({ type: () => ProblemsQueryDto })
  getProblems(@Query() query: ProblemsQueryValidatorDto): Promise<AllProblemsDto> {
    return this.problemService.getProblemsForPublic(query);
  }

  @Get('/:problemId')
  @ApiOkResponse({ type: ProblemDto })
  async getProblem(
    @Param('problemId', ParseIntPipe) problemId: number
  ): Promise<ProblemDto> {
    const problem = await this.problemService.getProblemByID(problemId);
    return plainToClass(ProblemDto, problem);
  }

  @Put('/:problemId')
  @ApiOkResponse({ type: AuthorProblemDto })
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.UpdateOwn, subject: Problem })
  async updateProblem(
    @CurrentUser() user: User,
    @Param('problemId', ParseIntPipe) problemId: number,
    @Body() body: UpdateProblemDto
  ): Promise<AuthorProblemDto> {
    const problem = await this.problemService.updateProblem(user, problemId, body);

    return plainToClass(AuthorProblemDto, problem);
  }

  @Get('/author/:problemId')
  @ApiOkResponse({ type: AuthorProblemDto })
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.ReadOwn, subject: Problem })
  async getProblemForAuthor(
    @CurrentUser() user: User,
    @Param('problemId', ParseIntPipe) problemId: number
  ): Promise<AuthorProblemDto> {
    const problem = await this.problemService.getProblemByID(problemId);

    if (problem.author.id != user.id) {
      throw new ForbiddenException(`You don't have permission to see this problem`);
    }

    return plainToClass(AuthorProblemDto, problem);
  }

  @Get('/admin')
  @ApiOkResponse({ type: AllProblemsDto })
  @ApiQuery({ type: ProblemsQueryDto })
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.Manage, subject: Problem })
  getProblemsForAdmin(
    @CurrentUser() user: User,
    @Query() query: ProblemsQueryValidatorDto
  ): Promise<AllProblemsDto> {
    return this.problemService.getProblemsForAdmin(user, query);
  }

  @Get('/admin/:problemId')
  @ApiOkResponse({ type: AdminProblemDto })
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.Manage, subject: Problem })
  async getProblemForAdmin(
    @Param('problemId', ParseIntPipe) problemId: number
  ): Promise<AdminProblemDto> {
    const problem = await this.problemService.getProblemByID(problemId);

    return plainToClass(AdminProblemDto, problem);
  }

  @Put('/admin/:problemId/change-status')
  @ApiOkResponse({ type: AuthorProblemDto })
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.Manage, subject: Problem })
  async changeProblemStatus(
    @Param('problemId', ParseIntPipe) problemId: number,
    @Body() body: ChangeProblemStatusDto
  ): Promise<AuthorProblemDto> {
    const problem = await this.problemService.changeProblemStatus(problemId, body);
    return plainToClass(AuthorProblemDto, problem);
  }

  @Post('/admin/:problemId/add-testcases')
  @ApiOkResponse({ type: AdminProblemDto })
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.Manage, subject: Problem })
  async addTestCasesToProblem(
    @Param('problemId', ParseIntPipe) problemId: number,
    @Body() body: CreateTestCasesDto
  ): Promise<AdminProblemDto> {
    const problem = await this.testCaseService.addTestCases(problemId, body);
    return plainToClass(AdminProblemDto, problem);
  }
}
