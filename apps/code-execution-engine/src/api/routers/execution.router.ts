import express, { Router } from 'express';
import { container } from 'tsyringe';
import { ExecutionController } from '../controllers';
import { apiKeyMiddleware } from '../middlewares';

const router: Router = express.Router();

const executionController = container.resolve(ExecutionController);

router.post(
  '/',
  apiKeyMiddleware,
  executionController.executeCode.bind(executionController)
);

export default router;
