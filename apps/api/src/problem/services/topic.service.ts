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

    console.log('Creating topic with name:', topicName);

    const newtopic = this.topicRepo.create({
      name: topicName,
    });

    const topic = await this.topicRepo.save(newtopic);
    return topic;
  }

  async isTopicUnique(topicName: string): Promise<void> {
    console.log('Checking if topic is unique:', topicName);

    const topic = await this.topicRepo.findOneBy({ name: topicName });

    console.log('topic:', topic);

    if (topic) {
      throw new BadRequestException(
        `A topic already exists for the given topicName = ${topicName}`
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
      throw new NotFoundException(`No topic found for topic id = ${topicId}`);
    }
    return topic;
  }

  async findTopics(topicIds: string[]) {
    const topics = await this.topicRepo.findBy({ id: In(topicIds) });

    if (topics.length !== topicIds.length) {
      const missingtopicIds = topicIds.filter(
        (topicId) => !topics.some((topic) => topic.id === topicId)
      );

      throw new BadRequestException(`topics '${missingtopicIds.join(', ')}' not found.`);
    }

    return { topics };
  }

  async getAllTopics() {
    const alltopics = this.topicRepo.find();
    return alltopics;
  }
}
