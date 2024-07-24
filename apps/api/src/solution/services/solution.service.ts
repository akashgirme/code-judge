import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ProblemService } from '../../problem/services';
import { AbilityFactory, Action } from '../../ability/ability.factory';
import { StorageService } from '../../object-store/storage.service';
import { User } from '../../user/entities';
import { AddSolutionDto } from '../dto';
import { Problem } from '../../problem/entities';

@Injectable()
export class SolutionService {
  private readonly logger = new Logger(SolutionService.name);
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
        'Permission Error',
        `You do not have permission to add solutions to problem with id: ${problemId}`
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
