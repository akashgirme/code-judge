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
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import {
  AllSolutionsDto,
  CreateSolutionDto,
  SolutionDto,
  SolutionQueryDto,
  SolutionQueryValidatorDto,
} from '../dto';
import { AuthGuard } from '@nestjs/passport';
import { AbilityGuard } from '../../ability/ability.guard';
import { CurrentUser } from '../../auth/decorators';
import { User } from '../../user/entities';
import { SolutionService } from '../services';

@UseGuards(AuthGuard(), AbilityGuard)
@Controller('solutions')
export class SolutionController {
  constructor(private readonly solutionService: SolutionService) {}

  @Post('/')
  @ApiOkResponse({ type: () => SolutionDto })
  createSolution(
    @CurrentUser() user: User,
    @Body() body: CreateSolutionDto
  ): Promise<SolutionDto> {
    return this.solutionService.createSolution(user, body);
  }

  @Get('/')
  @ApiOkResponse({ type: String })
  @ApiQuery({ type: () => SolutionQueryDto })
  getAllSolutions(@Query() query: SolutionQueryValidatorDto): Promise<AllSolutionsDto> {
    return this.solutionService.getAllSolutions(query);
  }

  @Get('/:solutionId')
  @ApiOkResponse({ type: () => SolutionDto })
  getSolutionById(
    @Param('solutionId', ParseIntPipe) solutionId: number
  ): Promise<SolutionDto> {
    return this.solutionService.getSolutionById(solutionId);
  }
}
