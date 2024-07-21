import express from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { ExecutionController } from './controllers/execution.controller';
const app = express();

app.get('/health', (req, res) => res.json({ success: true }));

const executionController = container.resolve(ExecutionController);

app.use('/submissions', executionController.routes());

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
