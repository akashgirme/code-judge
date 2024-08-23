import { Worker, Job } from 'bullmq';
import { exec } from 'child_process';
import IORedis from 'ioredis';
import * as dotenv from 'dotenv';
dotenv.config();

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

const execute = async (job: Job) => {
  console.log(job.data);

  // Files
  const workingDir = process.env.WORKINGDIR ?? '/tmp';
  const scriptPath = `${workingDir}/${job.data.id}/script.sh`;
  const metadataFile = `${workingDir}/${job.data.id}/metadata.txt`;

  // Resource and security limits
  const cpuTimeLimit = parseInt(process.env.CPUTIMELIMIT ?? '2');
  const memoryLimit = parseInt(process.env.MEMORYLIMIT ?? '131072');
  const stackLimit = parseInt(process.env.STACKLIMIT ?? '8192');
  const maxWallTimeLimit = parseInt(process.env.MAX_WALL_TIME_LIMIT ?? '4');
  const maxProcessesAndOrThreads = parseInt(
    process.env.MAX_PROCESSES_AND_OR_THREADS ?? '50'
  );

  const isolateCommand = `isolate --init --cg \
    -s \
    -b ${job.data.id} \
    -M ${metadataFile} \
    -i /dev/null \
    -w ${maxWallTimeLimit} \
    -t ${cpuTimeLimit} \
    -m ${memoryLimit} \
    -k ${stackLimit} \
    -p${maxProcessesAndOrThreads} \
    -E HOME=/tmp \
    -E PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin" \
    -E LANG -E LANGUAGE -E LC_ALL \
    -d /etc:noexec \
    --run \
    -- /bin/bash -c "cd ${workingDir}/${job.data.id.toString()} && chmod +x ${scriptPath} && bash ${scriptPath}"`;

  return new Promise((resolve, reject) => {
    exec(isolateCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        reject(new Error(stderr));
        return;
      }
      console.log(`stdout: ${stdout}`);
      resolve(stdout);
    });
  });
};

function startWorker() {
  const worker = new Worker(
    QUEUE_NAME,
    async (job: Job) => {
      switch (job.name) {
        case JOB_TYPE:
          try {
            await execute(job);
            console.log(`Processing job of type: ${job.name}`);
          } catch (error) {
            console.error('Error processing job:', error);
            throw error;
          }
      }
    },
    { connection, concurrency: 1 }
  );

  worker.on('completed', (job) => {
    console.log(`Job ${job.id} of type ${job.name} completed successfully`);
  });

  worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} of type ${job?.name} failed with error:`, err);
  });

  console.log(' 🚀🧑‍🏭 Worker started and listening for jobs...');
}

startWorker();
