import express, { Router } from 'express';
import { container } from 'tsyringe';
import { SubmissionController } from '../controllers';
import { apiKeyMiddleware } from '../middlewares';

const router: Router = express.Router();

const submissionController = container.resolve(SubmissionController);

router.post(
  '/',
  apiKeyMiddleware,
  submissionController.executeCode.bind(submissionController)
);

export default router;
