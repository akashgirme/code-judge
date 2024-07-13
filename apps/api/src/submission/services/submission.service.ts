import { Injectable } from '@nestjs/common';
import { StorageService } from '../../storage/storage.service';
import { User } from '../../user/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Submission } from '../entities';
import { Repository } from 'typeorm';
import { CreateSubmissionDto } from '../dto';
import { ProblemService } from '../../problem/services';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission) private submissionRepo: Repository<Submission>,
    private readonly storageService: StorageService,
    private readonly problemService: ProblemService
  ) {}

  async createSubmission(user: User, { problemId, code, language }: CreateSubmissionDto) {
    const { slug } = await this.problemService.getProblemById(problemId);

    //TODO: TestCases are in string format but execution-engine accepts in txt file.
    const testCaseInput = await this.storageService.getObject(
      `problems/${slug}/test-cases/input.txt`
    );
    const testCasesOutput = await this.storageService.getObject(
      `problems/${slug}/test-cases/output.txt`
    );

    // Logic to extecute the code and return the result

    const submissionSlug = `submissions/${user.id}/${problemId}/${Date.now()}`;
    await this.storageService.putObject(submissionSlug, code);

    const submission = this.submissionRepo.create({
      slug: submissionSlug,
      language,
      user,
      problem: { id: problemId },
    });

    return this.submissionRepo.save(submission);
  }

  async getSubmissionsByProblemId(user: User, problemId: string) {
    const submissions = await this.submissionRepo
      .createQueryBuilder('submission')
      .where('submission.user = :userId', { userId: user.id })
      .andWhere('submission.problem = :problemId', { problemId })
      .orderBy('submission.createdAt', 'DESC')
      .getMany();

    return submissions;
  }

  async findSubmissionById(id: string) {
    const submission = await this.submissionRepo.findOneBy({ id });

    if (!submission) {
      throw new Error('Submission not found');
    }

    const code = await this.storageService.getObject(submission.slug);

    return { ...submission, code };
  }
}
