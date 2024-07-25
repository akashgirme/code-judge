import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from '../entities';
import { CreateTopicDto } from '../dto';
import { In, Repository } from 'typeorm';

@Injectable()
export class TopicService {
  constructor(@InjectRepository(Topic) private readonly topicRepo: Repository<Topic>) {}

  async createTopic({ topicName }: CreateTopicDto) {
    await this.isTopicUnique(topicName);

    const newtopic = this.topicRepo.create({
      name: topicName,
    });

    const topic = await this.topicRepo.save(newtopic);
    return topic;
  }

  async isTopicUnique(topicName: string): Promise<void> {
    const topic = await this.topicRepo.findOneBy({ name: topicName });

    if (topic) {
      throw new BadRequestException(
        'Duplicate Topic Error',
        `A topic with name '${topicName}' already exists.`
      );
    }
  }

  async updateTopic(topicId: string, { topicName }: CreateTopicDto) {
    const topic = await this.findTopic(topicId);

    if (topic.name !== topicName) {
      await this.isTopicUnique(topicName);
    }

    topic.name = topicName;

    const updatedtopic = await this.topicRepo.save(topic);
    return updatedtopic;
  }

  async findTopic(topicId: string) {
    const topic = await this.topicRepo.findOne({ where: { id: topicId } });

    if (!topic) {
      throw new NotFoundException(
        'Topic Not Found',
        ` Topic not exist with topic id '${topicId}'`
      );
    }
    return topic;
  }

  async findTopics(topicIds: string[]) {
    const topics = await this.topicRepo.findBy({ id: In(topicIds) });

    if (topics.length !== topicIds.length) {
      const missingtopicIds = topicIds.filter(
        (topicId) => !topics.some((topic) => topic.id === topicId)
      );

      throw new NotFoundException(
        'Topics Not Found',
        `Topics with ids '${missingtopicIds.join(', ')}' not found.`
      );
    }

    return { topics };
  }

  async getAllTopics() {
    const alltopics = this.topicRepo.find();
    return alltopics;
  }
}
