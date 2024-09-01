import express from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { QueueService, WorkerService } from './services';
import submissionRouter from './routers/submission.router';

async function bootstrap() {
  const app = express();
  app.use(express.json());

  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to server!' });
  });

  app.get('/health', (req, res) => res.json({ success: true }));

  app.use('/api/submissions', submissionRouter);

  // Initiate Queues and Workers on application start
  const queues = container.resolve(QueueService);
  const worker = container.resolve(WorkerService);

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`🚀 Execution-Engine server is running on: http://localhost:${port}/api`);
  });
  server.on('error', console.error);
}

bootstrap().catch((error) => {
  console.error('Application failed to start', error);
  process.exit(1);
});
