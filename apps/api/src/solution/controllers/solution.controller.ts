import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { AddSolutionDto, SolutionQueryDto, SolutionQueryValidatorDto } from '../dto';
import { SuccessMessageDto } from '../../auth/dto';
import { AuthGuard } from '@nestjs/passport';
import { AbilityGuard } from '../../ability/ability.guard';
import { CheckAbilities } from '../../ability/ability.decorator';
import { Action } from '../../ability/ability.factory';
import { CurrentUser } from '../../auth/decorators';
import { User } from '../../user/entities';
import { SolutionService } from '../services';

@UseGuards(AuthGuard(), AbilityGuard)
@Controller('solutions')
export class SolutionController {
  constructor(private readonly solutionService: SolutionService) {}

  @Get('/')
  @ApiOkResponse({ type: String })
  @ApiQuery({ type: () => SolutionQueryDto })
  getSolution(@Query() query: SolutionQueryValidatorDto): Promise<string> {
    return this.solutionService.getSolution(query);
  }

  @Post('/')
  @CheckAbilities({ action: Action.Create, subject: null })
  @ApiOkResponse({ type: SuccessMessageDto })
  addSolution(
    @CurrentUser() user: User,
    @Body() body: AddSolutionDto
  ): Promise<SuccessMessageDto> {
    return this.solutionService.addSolution(user, body);
  }
}
