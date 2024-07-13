import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import { CheckAbilities } from '../../ability/ability.decorator';
import { AbilityGuard } from '../../ability/ability.guard';
import { CreateTopicDto } from '../dto';
import { Topic } from '../entities';
import { TopicService } from '../services';
import { Action } from '../../ability/ability.factory';

@UseGuards(AuthGuard(), AbilityGuard)
@Controller('topics')
export class TopicController {
  constructor(private topicService: TopicService) {}

  @Post('/')
  @CheckAbilities({ action: Action.Create, subject: Topic })
  @ApiOkResponse({ type: Topic })
  createTopic(@Body() body: CreateTopicDto): Promise<Topic> {
    return this.topicService.createTopic(body);
  }

  @Put('/:topicId')
  @CheckAbilities({ action: Action.Update, subject: Topic })
  @ApiOkResponse({ type: Topic })
  updateTopic(
    @Param('topicId') tagId: string,
    @Body() body: CreateTopicDto
  ): Promise<Topic> {
    return this.topicService.updateTopic(tagId, body);
  }

  @Get('/')
  @CheckAbilities({ action: Action.Read, subject: Topic })
  @ApiOkResponse({ type: [Topic] })
  getAllTopics(): Promise<Topic[]> {
    return this.topicService.getAllTopics();
  }

  @Get('/:topicId')
  @CheckAbilities({ action: Action.Read, subject: Topic })
  @ApiOkResponse({ type: Topic })
  getTopic(@Param('topicId') tagId: string): Promise<Topic> {
    return this.topicService.findTopic(tagId);
  }
}
