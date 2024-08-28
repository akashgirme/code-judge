import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ProblemService } from '../../problem/services';
import { StorageService } from '../../object-store/storage.service';
import { User } from '../../user/entities';
import {
  AllSolutionsDto,
  CreateSolutionDto,
  SolutionDto,
  SolutionQueryDto,
} from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Solution } from '../entities';
import { Repository } from 'typeorm';
import { SortOrder } from '../../common/types';
import { getPaginationMeta } from '../../common/utility';

@Injectable()
export class SolutionService {
  private readonly logger = new Logger(SolutionService.name);
  constructor(
    @InjectRepository(Solution)
    private solutionRepo: Repository<Solution>,
    @Inject(forwardRef(() => ProblemService))
    private readonly problemService: ProblemService,
    private readonly storageService: StorageService
  ) {}

  async createSolution(
    user: User,
    { problemId, description, language }: CreateSolutionDto
  ): Promise<SolutionDto> {
    const { slug } = await this.problemService.findProblemById(problemId);
    const path = `solutions/${slug}/${language}/${user.id}/solution-${Date.now()}.md`;
    await this.storageService.putObject(path, description);
    const solutionObj = this.solutionRepo.create({
      path,
      language,
      problem: { id: problemId },
      user,
    });

    const solution = await this.solutionRepo.save(solutionObj);

    return { ...solution, description };
  }

  async getAllSolutions({
    problemId,
    language,
    pageIndex = 0,
    pageSize = 10,
    order = SortOrder.DESC,
  }: SolutionQueryDto): Promise<AllSolutionsDto> {
    const [solutions, totalItems] = await this.solutionRepo
      .createQueryBuilder('solution')
      .leftJoinAndSelect('solution.user', 'user')
      .leftJoinAndSelect('solution.problem', 'problem')
      .select([
        'solution',
        'user.id',
        'user.firstName',
        'user.lastName',
        'problem.id',
        'problem.title',
      ])
      .where('solution.language = :language', { language })
      .andWhere('problem.id = :problemId', { problemId })
      .skip(pageIndex * pageSize)
      .take(pageSize)
      .orderBy('solution.createdAt', order)
      .getManyAndCount();

    const paginationMeta = getPaginationMeta(
      { pageIndex, pageSize },
      { totalItems, itemsOnPage: solutions.length }
    );

    return { solutions, paginationMeta };
  }

  async getSolutionById(solutionId: number): Promise<SolutionDto> {
    const solution = await this.solutionRepo.findOneBy({ id: solutionId });

    if (!solution) {
      throw new NotFoundException(`No solution found for id: ${solutionId}`);
    }

    const description = await this.storageService.getObject(solution.path);

    return { ...solution, description };
  }
}
