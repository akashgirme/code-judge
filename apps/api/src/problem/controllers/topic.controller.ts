import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckAbilities } from '../../ability/ability.decorator';
import { AbilityGuard } from '../../ability/ability.guard';
import { CreateTagDto } from '../dto';
import { Tag } from '../entities';
import { TagService } from '../services';
import { Action } from '../../ability/ability.factory';

@UseGuards(AuthGuard(), AbilityGuard)
@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(private tagService: TagService) {}

  @Post('/')
  @CheckAbilities({ action: Action.Create, subject: Tag })
  @ApiOkResponse({ type: Tag })
  createTag(@Body() body: CreateTagDto): Promise<Tag> {
    return this.tagService.createTag(body);
  }

  @Get('/')
  @CheckAbilities({ action: Action.Read, subject: Tag })
  @ApiOkResponse({ type: [Tag] })
  getAllTags(): Promise<Tag[]> {
    return this.tagService.getAllTags();
  }

  @Get('/:tagId')
  @CheckAbilities({ action: Action.Read, subject: Tag })
  @ApiOkResponse({ type: Tag })
  getTag(@Param('tagId', ParseIntPipe) tagId: number): Promise<Tag> {
    return this.tagService.findTag(tagId);
  }

  @Put('/:tagId')
  @CheckAbilities({ action: Action.Update, subject: Tag })
  @ApiOkResponse({ type: Tag })
  updateTag(
    @Param('tagId', ParseIntPipe) tagId: number,
    @Body() body: CreateTagDto
  ): Promise<Tag> {
    return this.tagService.updateTag(tagId, body);
  }
}
