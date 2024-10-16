console.log('Hello World');

import { logger } from './utils';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { WorkerService } from './services/worker.service';

// This will create a singleton instance of WorkerService & QueueService
const workerService = container.resolve(WorkerService);

logger.info(`🚀🧑‍🏭 Worker started and listening for jobs...`);
