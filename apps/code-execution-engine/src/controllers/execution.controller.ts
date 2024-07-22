import { Router } from 'express';
import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { body, check, validationResult } from 'express-validator';
import { QueueService } from '../services';
import { CodeExecutionQueueJobTypes, Queues, SupportedLanguages } from '../enums';
import { enumToArray } from '../utils';
import { IExecutionPayload } from '../interfaces';

@injectable()
export class ExecutionController {
  router: Router;

  constructor(private queueService: QueueService) {
    this.router = Router();
  }

  async addJobToExecutionQueue(req: Request, res: Response) {
    const {
      submissionId,
      sourceCodeSlug,
      inputTestCasesSlug,
      expectedOutputSlug,
      language,
    }: IExecutionPayload = req.body;

    const queue = this.queueService.getQueue(Queues.CODE_EXECUTION);

    queue.add(CodeExecutionQueueJobTypes.EXECUTE_CODE, {
      submissionId,
      sourceCodeSlug,
      inputTestCasesSlug,
      expectedOutputSlug,
      language,
    });

    res.json({ message: 'Submission successfully added for execution' });
  }

  routes() {
    this.router.post(
      '/',
      [
        body('submissionId')
          .isString()
          .withMessage('submissionId should be a valid string')
          .isUUID()
          .withMessage('submissionId should be a valid UUID')
          .notEmpty()
          .withMessage('submissionId is required'),
        body('sourceCodeSlug')
          .notEmpty()
          .withMessage('sourceCodeSlug is required')
          .isString()
          .withMessage('sourceCodeSlug is should be a valid string'),
        body('inputTestCasesSlug')
          .notEmpty()
          .withMessage('inputTestCasesSlug is required')
          .isString()
          .withMessage('inputTestCasesSlug is should be a valid string'),
        body('expectedOutputSlug')
          .notEmpty()
          .withMessage('expectedOutputSlug is required')
          .isString()
          .withMessage('expectedOutputSlug is should be a valid string'),
        check('language')
          .notEmpty()
          .withMessage('Language is required')
          .isIn(enumToArray(SupportedLanguages))
          .withMessage('Language is not supported'),
      ],
      async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        await this.addJobToExecutionQueue(req, res);
      }
    );

    this.router.get('/supported-languages', (req: Request, res: Response) =>
      res.json(SupportedLanguages)
    );

    return this.router;
  }
}
