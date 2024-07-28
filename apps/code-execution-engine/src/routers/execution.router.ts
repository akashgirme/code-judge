import express, { Router } from 'express';
import { container } from 'tsyringe';
import { ExecutionController } from '../controllers';

const router: Router = express.Router();

const executionController = container.resolve(ExecutionController);

router.post('/', executionController.executeCode.bind(executionController));

router.get(
  '/supported-languages',
  executionController.getSupportedLanguages.bind(executionController)
);

export default router;
