import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import * as dotenv from 'dotenv';
dotenv.config();
import { exec } from 'child_process';
import { pino } from 'pino';
const logger = pino();

const redisUrl = process.env.REDIS_URL ?? 'redis://localhost:6379';
const url = new URL(redisUrl);
const connection = new IORedis({
  host: url.hostname,
  port: parseInt(url.port),
  password: url.password,
  username: url.username,
  maxRetriesPerRequest: null,
});

const QUEUE_NAME = process.env.QUEUE_NAME || 'code-execution';
const JOB_TYPE = process.env.JOB_TYPE || 'c-code-execution';

// Configure resource limits
const maxWallTimeLimit = parseInt(process.env.MAX_WALL_TIME_LIMIT ?? '10'); // Default: 10 seconds
const memoryLimit = parseInt(process.env.MEMORYLIMIT ?? '128') * 1024; // Default: 128 MB

const execute = async (job: Job) => {
  const jobId = `${job.data.id.toString()}`;
  const workingDir = process.env.WORKINGDIR ?? '/tmp';
  const scriptPath = `${workingDir}/${job.data.id}/script.sh`;

  // Create commands to set limits and execute the script
  const ulimitCommand = `ulimit -v ${memoryLimit}; ulimit -t ${maxWallTimeLimit}`;
  const changeDirCommand = `cd ${workingDir}/${jobId}`;
  const executionCommand = `timeout ${maxWallTimeLimit}s /bin/bash ${scriptPath}`;
  const fullCommand = `sh -c '${ulimitCommand} && ${changeDirCommand} && ${executionCommand}'`;

  exec(fullCommand, (error, stdout, stderr) => {
    if (error) {
      logger.error(`Error executing script: ${error.message}`);
      return;
    }
    if (stderr) {
      logger.error(`stderr: ${stderr}`);
      return;
    }
    logger.info(`stdout: ${stdout}`);
  });
};

function startWorker() {
  const worker = new Worker(
    QUEUE_NAME,
    async (job: Job) => {
      console.log(`Job: ${job}`);
      switch (job.name) {
        case JOB_TYPE:
          try {
            await execute(job);
            logger.info(`Processing job of type: ${job.name}`);
          } catch (error) {
            logger.error('Error processing job:', error);
            throw error;
          }
      }
    },
    { connection, concurrency: 1 }
  );

  worker.on('completed', (job) => {
    logger.info(`Job ${job.id} of type ${job.name} completed successfully`);
  });

  worker.on('failed', (job, err) => {
    logger.error(`Job ${job?.id} of type ${job?.name} failed with error:`, err);
  });

  logger.info(' 🚀🧑‍🏭 Worker started and listening for jobs...');
}

startWorker();
