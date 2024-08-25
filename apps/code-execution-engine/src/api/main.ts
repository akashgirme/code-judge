import express from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';
import executionRouter from './routers/execution.router';
import { StartupService } from './services';

async function bootstrap() {
  const startupService = container.resolve(StartupService);
  startupService.initialize();

  const app = express();
  app.use(express.json());

  app.get('/health', (req, res) => res.json({ success: true }));

  app.use('/api/submissions', executionRouter);

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`🚀 Code-Execution-Engine is running on: http://localhost:${port}/api`);
  });
  server.on('error', console.error);
}

bootstrap().catch((error) => {
  console.error('Application failed to start', error);
  process.exit(1);
});
