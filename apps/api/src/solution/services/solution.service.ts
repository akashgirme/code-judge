import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ProblemService } from '../../problem/services';
import { AbilityFactory, Action } from '../../ability/ability.factory';
import { StorageService } from '../../object-store/storage.service';
import { User } from '../../user/entities';
import { AddSolutionDto, SolutionQueryDto } from '../dto';
import { Problem } from '../../problem/entities';
import { Languages } from '@code-judge/common';

@Injectable()
export class SolutionService {
  private readonly logger = new Logger(SolutionService.name);
  constructor(
    @Inject(forwardRef(() => ProblemService))
    private readonly problemService: ProblemService,
    private readonly storageService: StorageService,
    private readonly abilityFactory: AbilityFactory
  ) {}

  async getSolutionByProblemId({
    problemId,
    language,
  }: SolutionQueryDto): Promise<string> {
    const { slug } = await this.problemService.getProblemById(problemId);

    return this.getSolutionAddedAsProblemSolution(slug, language);
  }

  async getSolutionAddedAsProblemSolution(problemSlug: string, language: Languages) {
    const solution = await this.storageService.getObject(
      `problems/${problemSlug}/solutions/solution.${language}`
    );

    if (!solution) {
      throw new NotFoundException('Problem solution not found');
    }

    return solution;
  }

  async getSolutionAddedBySubmissionRecord(submissionSlug: string) {
    const solution = await this.storageService.getObject(submissionSlug);

    if (!solution) {
      throw new NotFoundException('Submission solution not found');
    }

    return solution;
  }

  async addSolutionToProblem(user: User, { problemId, code, language }: AddSolutionDto) {
    const ability = this.abilityFactory.defineAbilityForUser(user);
    const problem = await this.problemService.getProblemById(problemId);

    // If user doesn't have access to update problem & is trying to update a different person blog post
    if (!ability.can(Action.Update, Problem) && problem.author.id !== user.id) {
      throw new ForbiddenException(
        'Permission Error',
        `You do not have permission to add solutions to problem: ${problemId}`
      );
    }

    //TODO: Verify the solution before adding it
    await this.saveSolution(problem.slug, code, language);

    return { message: 'Solution added successfully' };
  }

  saveSolution(problemSlug: string, solution: string, language: Languages) {
    return this.storageService.putObject(
      `problems/${problemSlug}/solutions/solution.${language}`,
      solution
    );
  }
}
