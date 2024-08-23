import express from 'express';
import 'reflect-metadata';
import executionRouter from './routers/execution.router';

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ success: true }));

app.use('/api/submissions', executionRouter);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`🚀 Code-Execution-Engine is running on: http://localhost:${port}/api`);
});
server.on('error', console.error);
