import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SolutionService } from './solution.service';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { AddSolutionDto, GetSolutionQueryDto } from './dto';
import { SuccessMessageDto } from '../auth/dto';
import { AuthGuard } from '@nestjs/passport';
import { AbilityGuard } from '../ability/ability.guard';
import { CheckAbilities } from '../ability/ability.decorator';
import { Action } from '../ability/ability.factory';

@UseGuards(AuthGuard, AbilityGuard)
@Controller('solutions')
export class SolutionController {
  constructor(private readonly solutionService: SolutionService) {}

  @Get('/')
  @ApiOkResponse({ type: String })
  @ApiQuery({ type: () => GetSolutionQueryDto })
  getSolution(@Query() query: GetSolutionQueryDto): Promise<string> {
    return this.solutionService.getSolution(query);
  }

  //TODO: Add ability check, Only author of problem and admin can add solution
  @Post('/')
  @CheckAbilities({ action: Action.Create, subject: null })
  @ApiOkResponse({ type: SuccessMessageDto })
  addSolution(@Body() body: AddSolutionDto): Promise<SuccessMessageDto> {
    return this.solutionService.addSolution(body);
  }
}
