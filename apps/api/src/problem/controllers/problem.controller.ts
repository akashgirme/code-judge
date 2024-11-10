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
import { ProblemService, TestCaseService } from '../services';
import { CurrentUser } from '../../auth/decorators';
import { User } from '../../user/entities';
import {
  AdminProblemDto,
  AllProblemsDto,
  CreateProblemDto,
  ProblemDto,
  ProblemsQueryDto,
  ProblemsQueryValidatorDto,
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
  @ApiCreatedResponse({ type: AdminProblemDto })
  async createProblem(
    @CurrentUser() user: User,
    @Body() body: CreateProblemDto
  ): Promise<AdminProblemDto> {
    const problem = await this.problemService.createProblem(user, body);
    return plainToClass(AdminProblemDto, problem);
  }

  //TODO: Transform is not working gets actual testcases in response
  @Put('/:problemId')
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.UpdateOwn, subject: Problem })
  @ApiOkResponse({ type: AdminProblemDto })
  async updateProblem(
    @CurrentUser() user: User,
    @Param('problemId', ParseIntPipe) problemId: number,
    @Body() body: UpdateProblemDto
  ): Promise<AdminProblemDto> {
    const problem = await this.problemService.updateProblem(user, problemId, body);
    return plainToClass(AdminProblemDto, problem);
  }

  @Get('/')
  @ApiOkResponse({ type: AllProblemsDto })
  @ApiQuery({ type: () => ProblemsQueryDto })
  getProblems(@Query() query: ProblemsQueryValidatorDto): Promise<AllProblemsDto> {
    return this.problemService.getProblemsForPublic(query);
  }

  //TODO: ProblemDto transform not working gets actual testcases in response
  @Get('/:problemId')
  @ApiOkResponse({ type: ProblemDto })
  async getProblem(
    @Param('problemId', ParseIntPipe) problemId: number
  ): Promise<ProblemDto> {
    const problem = await this.problemService.getProblemByID(problemId);
    return plainToClass(ProblemDto, problem);
  }

  @Get('/admin')
  @ApiOkResponse({ type: AllProblemsDto })
  @ApiQuery({ type: () => ProblemsQueryDto })
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.ReadOwn, subject: Problem })
  getProblemsForAdmin(
    @CurrentUser() user: User,
    @Query() query: ProblemsQueryValidatorDto
  ): Promise<AllProblemsDto> {
    return this.problemService.getProblemsForAdmin(user, query);
  }

  @Get('/admin/:problemId')
  @ApiOkResponse({ type: AdminProblemDto })
  @UseGuards(AuthGuard(), AbilityGuard)
  @CheckAbilities({ action: Action.ReadOwn, subject: Problem })
  async getProblemForAdmin(
    @Param('problemId', ParseIntPipe) problemId: number
  ): Promise<AdminProblemDto> {
    const problem = await this.problemService.getProblemByID(problemId);

    return plainToClass(AdminProblemDto, problem);
  }
}
