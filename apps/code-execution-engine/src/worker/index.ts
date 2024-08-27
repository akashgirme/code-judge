import * as dotenv from 'dotenv';
import { Worker, Job, Queue } from 'bullmq';
import IORedis from 'ioredis';
import { exec } from 'child_process';
import fs from 'fs';
import util from 'util';
import { pino } from 'pino';

dotenv.config();
const execPromise = util.promisify(exec);
const logger = pino();

const QUEUE_NAME = process.env.JOB_QUEUE || 'code-execution';
const JOB_TYPE = process.env.JOB_TYPE || 'c-code-execution';
const RESULT_JOB_QUEUE = process.env.RESULT_JOB_QUEUE || 'workers-result-job-queue';
const SUCCESSFUL_JOB = process.env.SUCCESSFUL_JOB || 'successful-job';
const FAILED_JOB = process.env.FAILED_JOB || 'failed-job';
const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';

const url = new URL(REDIS_URL);
const connection = new IORedis({
  host: url.hostname,
  port: parseInt(url.port),
  password: url.password,
  username: url.username,
  maxRetriesPerRequest: null,
});

const resultJobQueue = new Queue(RESULT_JOB_QUEUE, { connection });

const maxWallTimeLimit = parseInt(process.env.MAX_WALL_TIME_LIMIT ?? '10'); // Default: 10 seconds
const memoryLimit = parseInt(process.env.MEMORY_LIMIT ?? '128') * 1024; // Default: 128 MB

const execute = async (job: Job) => {
  const jobId = `${job.data.id.toString()}`;
  const workingDir = process.env.WORKING_DIR ?? '/tmp';
  const scriptPath = `${workingDir}/${jobId}/script.sh`;
  const metadataPath = `${workingDir}/${jobId}/metadata.txt`;

  // Create commands to set limits and execute the script
  const ulimitCommand = `ulimit -v ${memoryLimit}; ulimit -t ${maxWallTimeLimit}`;
  const changeDirCommand = `cd ${workingDir}/${jobId}`;
  const executionCommand = `/usr/bin/time -f "time=%e\nmemory=%M" timeout ${maxWallTimeLimit}s /bin/bash ${scriptPath}`;
  const fullCommand = `sh -c '${ulimitCommand} && ${changeDirCommand} && ${executionCommand}'`;

  try {
    const { stdout, stderr } = await execPromise(fullCommand);

    // Read the metadata file
    let metadata = '';
    const metadataFileContent = fs.readFileSync(metadataPath, 'utf8');
    let status = '';
    let executionTime = 0;
    let memoryUsage = 0;

    const timeMatch = stderr.match(/time=(\d+\.\d+)/);
    const memoryMatch = stderr.match(/memory=(\d+)/);

    if (timeMatch && memoryMatch) {
      executionTime = parseFloat(timeMatch[1]);
      memoryUsage = parseInt(memoryMatch[1]);
    }

    // Check if the status was set by the bash script
    if (metadataFileContent.includes('status=compilation-error')) {
      status = 'compilation-error';
    } else if (metadataFileContent.includes('status=execution-error')) {
      status = 'runtime-error';
    } else if (metadataFileContent.includes('status=successful')) {
      status = 'successful';
    }

    if (stderr.includes('Command terminated by signal 9')) {
      status = 'memory-exceeded';
    } else if (
      stderr.includes('Command terminated by signal 15') ||
      stderr.includes('Command exited with non-zero status 124')
    ) {
      status = 'time-limit-exceeded';
    }

    metadata = `status=${status}\ntime=${executionTime.toFixed(
      4
    )}\nmemory=${memoryUsage}`;

    // Write updated metadata to the file
    fs.writeFileSync(metadataPath, metadata);

    logger.info(
      `Job ${jobId} executed. Status: ${status}. Metadata written to ${metadataPath}`
    );
    logger.info(`Stdout: ${stdout}`);
  } catch (error) {
    logger.error(`Error executing script for job ${jobId}: ${error}`);
    // Write error to metadata file
    fs.writeFileSync(metadataPath, `status=failed\ntime=0\nmemory=0`);
  }
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
    resultJobQueue.add(SUCCESSFUL_JOB, { id: job.data.id });
  });

  worker.on('failed', (job, err) => {
    logger.error(`Job ${job?.id} of type ${job?.name} failed with error:`, err);
    resultJobQueue.add(FAILED_JOB, { id: job?.data.id });
  });

  logger.info(' 🚀🧑‍🏭 Worker started and listening for jobs...');
}

startWorker();
