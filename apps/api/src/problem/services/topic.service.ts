import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tag } from '../entities';
import { CreateTagDto } from '../dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>
  ) {}

  async createTag({ tagName }: CreateTagDto) {
    await this.isTagUnique(tagName);

    const newTag = this.tagRepo.create({
      name: tagName,
    });

    const tag = await this.tagRepo.save(newTag);
    return tag;
  }

  async isTagUnique(tagName: string): Promise<void> {
    const tag = await this.tagRepo.findOne({ where: { name: tagName } });

    if (tag) {
      throw new BadRequestException(
        `A tag already exists for the given tagName = ${tagName}`
      );
    }
  }

  async updateTag(tagId: number, { tagName }: CreateTagDto) {
    const tag = await this.findTag(tagId);

    if (tag.name !== tagName) {
      await this.isTagUnique(tagName);
    }

    tag.name = tagName;

    const updatedTag = await this.tagRepo.save(tag);
    return updatedTag;
  }

  async findTag(tagId: number) {
    const tag = await this.tagRepo.findOne({ where: { id: tagId } });

    if (!tag) {
      throw new NotFoundException(`No tag found for tag id = ${tagId}`);
    }
    return tag;
  }

  async findTags(tagIds: number[]) {
    const tags = await this.tagRepo.findBy({ id: In(tagIds) });

    if (tags.length !== tagIds.length) {
      const missingTagIds = tagIds.filter(
        (tagId) => !tags.some((tag) => tag.id === tagId)
      );

      throw new BadRequestException(`Tags '${missingTagIds.join(', ')}' not found.`);
    }

    return { tags };
  }

  async getAllTags() {
    const allTags = this.tagRepo.find();
    return allTags;
  }
}
