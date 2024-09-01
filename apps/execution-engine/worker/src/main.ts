import { logger } from './utils';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { QueueService, WorkerService } from './services';

// This will create a singleton instance of WorkerService & QueueService
const workerService = container.resolve(WorkerService);
const queueService = container.resolve(QueueService);

logger.info(`🚀🧑‍🏭 Worker started and listening for jobs...`);
