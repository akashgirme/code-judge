import express from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { ExecutionController } from './controllers/execution.controller';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ success: true }));

const executionController = container.resolve(ExecutionController);
app.use('/api/submissions', executionController.routes());

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`🚀 Code-Execution-Engine is running on: http://localhost:${port}/api`);
});
server.on('error', console.error);
