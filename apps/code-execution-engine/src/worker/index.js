"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const pino_1 = require("pino");
dotenv.config();
const execPromise = util_1.default.promisify(child_process_1.exec);
const logger = (0, pino_1.pino)();
const JOB_QUEUE_NAME = process.env.JOB_QUEUE || 'C-QUEUE';
const RESULT_JOB_QUEUE = process.env.RESULT_JOB_QUEUE || 'RESULT-JOB-QUEUE';
const SUCCESSFUL_JOB = process.env.SUCCESSFUL_JOB || 'successful-job';
const FAILED_JOB = process.env.FAILED_JOB || 'failed-job';
const REDIS_URL = (_a = process.env.REDIS_URL) !== null && _a !== void 0 ? _a : 'redis://localhost:6379';
const url = new URL(REDIS_URL);
const connection = new ioredis_1.default({
    host: url.hostname,
    port: parseInt(url.port),
    password: url.password,
    username: url.username,
    maxRetriesPerRequest: null,
});
const resultJobQueue = new bullmq_1.Queue(RESULT_JOB_QUEUE, { connection });
const maxWallTimeLimit = parseInt((_b = process.env.MAX_WALL_TIME_LIMIT) !== null && _b !== void 0 ? _b : '10'); // Default: 10 seconds
const memoryLimit = parseInt((_c = process.env.MEMORY_LIMIT) !== null && _c !== void 0 ? _c : '128') * 1024; // Default: 128 MB
const execute = (job) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const jobId = `${job.data.id.toString()}`;
    const workingDir = (_a = process.env.WORKING_DIR) !== null && _a !== void 0 ? _a : '/tmp';
    const scriptPath = `${workingDir}/${jobId}/script.sh`;
    const metadataPath = `${workingDir}/${jobId}/metadata.txt`;
    const exitCodeFilePath = `${workingDir}/${jobId}/exit_code.txt`;
    // Create commands to set limits and execute the script
    const ulimitCommand = `ulimit -v ${memoryLimit}; ulimit -t ${maxWallTimeLimit}`;
    const changeDirCommand = `cd ${workingDir}/${jobId}`;
    const executionCommand = `/usr/bin/time -f "time=%e\nmemory=%M" timeout ${maxWallTimeLimit}s /bin/bash ${scriptPath}`;
    const fullCommand = `sh -c '${ulimitCommand} && ${changeDirCommand} && ${executionCommand} ; echo $? > ${exitCodeFilePath}'`;
    try {
        const { stdout, stderr } = yield execPromise(fullCommand);
        // Read the metadata file
        let metadata = '';
        const metadataFileContent = fs_1.default.readFileSync(metadataPath, 'utf8');
        const exitCodeFileContent = fs_1.default.readFileSync(exitCodeFilePath, 'utf8');
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
        }
        else if (metadataFileContent.includes('status=execution-error')) {
            status = 'runtime-error';
        }
        else if (metadataFileContent.includes('status=successful')) {
            status = 'successful';
        }
        if (exitCodeFileContent.includes('137')) {
            status = 'memory-exceeded';
        }
        else if (exitCodeFileContent.includes('124')) {
            status = 'time-limit-exceeded';
        }
        metadata = `status=${status}\ntime=${executionTime.toFixed(4)}\nmemory=${memoryUsage}`;
        // Write updated metadata to the file
        fs_1.default.writeFileSync(metadataPath, metadata);
        logger.info(`Job ${jobId} executed. Status: ${status}. Metadata written to ${metadataPath}`);
        logger.info(`Stdout: ${stdout}`);
    }
    catch (error) {
        logger.error(`Error executing script for job ${jobId}: ${error}`);
        // Write error to metadata file
        // fs.writeFileSync(metadataPath, `status=failed\ntime=0\nmemory=0`);
    }
});
function startWorker() {
    const worker = new bullmq_1.Worker(JOB_QUEUE_NAME, (job) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield execute(job);
            logger.info(`Processing job of type: ${job.name}`);
        }
        catch (error) {
            logger.error('Error processing job:', error);
            throw error;
        }
    }), { connection, concurrency: 1 });
    worker.on('completed', (job) => {
        logger.info(`Job ${job.id} completed successfully`);
        resultJobQueue.add(SUCCESSFUL_JOB, { id: job.data.id });
    });
    worker.on('failed', (job, err) => {
        logger.error(`Job ${job === null || job === void 0 ? void 0 : job.id} failed with error:`, err);
        resultJobQueue.add(FAILED_JOB, { id: job === null || job === void 0 ? void 0 : job.data.id });
    });
    logger.info(' 🚀🧑‍🏭 Worker started and listening for jobs...');
}
startWorker();
