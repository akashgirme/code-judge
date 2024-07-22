import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ProblemService } from '../problem/services';
import { StorageService } from '../storage/storage.service';
import { AddSolutionDto } from './dto';
import { User } from '../user/entities';
import { AbilityFactory, Action } from '../ability/ability.factory';
import { Problem } from '../problem/entities';

@Injectable()
export class SolutionService {
  constructor(
    private readonly problemService: ProblemService,
    private readonly storageService: StorageService,
    private readonly abilityFactory: AbilityFactory
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

  async addSolution(user: User, { problemId, code, language }: AddSolutionDto) {
    const ability = this.abilityFactory.defineAbilityForUser(user);
    const problem = await this.problemService.getProblemById(problemId);

    // If user doesn't have access to update problem & is trying to update a different person blog post
    if (!ability.can(Action.Update, Problem) && problem.author.id !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to add solution/s to this problem'
      );
    }

    // Logic to extecute the code and return the result
    // If all testcases pass then n' then add solution

    await this.storageService.putObject(
      `problems/${problem.slug}/solutions/solution.${language}`,
      code
    );

    return { message: 'Solution added successfully' };
  }
}
