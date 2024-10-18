import 'reflect-metadata';
import { container } from 'tsyringe';
import { WorkerService } from './services/worker.service';

// This will create a singleton instance of WorkerService & QueueService
container.resolve(WorkerService);

console.info(`🚀🧑‍🏭 Worker started and listening for jobs...`);
