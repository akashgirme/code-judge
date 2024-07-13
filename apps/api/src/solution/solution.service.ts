import { Injectable, NotFoundException } from '@nestjs/common';
import { ProblemService } from '../problem/services';
import { StorageService } from '../storage/storage.service';
import { AddSolutionDto } from './dto';

@Injectable()
export class SolutionService {
  constructor(
    private readonly problemService: ProblemService,
    private readonly storageService: StorageService
  ) {}

  async getSolution({ problemId, language }) {
    const { slug } = await this.problemService.getProblemById(problemId);

    const solution = await this.storageService.getObject(
      `problems/${slug}/solutions/solution.${language}`
    );

    if (!solution) {
      throw new NotFoundException('Solution not found');
    }

    return solution;
  }

  async addSolution({ problemId, code, language }: AddSolutionDto) {
    const { slug } = await this.problemService.getProblemById(problemId);

    // Logic to extecute the code and return the result
    // If all testcases pass then n' then add solution

    await this.storageService.putObject(
      `problems/${slug}/solutions/solution.${language}`,
      code
    );

    return { message: 'Solution added successfully' };
  }
}
