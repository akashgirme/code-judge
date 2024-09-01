import { Job } from 'bullmq';
import { injectable } from 'tsyringe';
import { FileHandleService } from './file.service';
import { promisify } from 'util';
import { exec } from 'child_process';
import { ResultService } from './result.service';
import { ExecutionQueueJobDataType } from '@code-judge/common';
import { SubmissionResult } from '../types';
import { logger } from '../utils';
import * as fs from 'fs/promises';

const execPromise = promisify(exec);

@injectable()
export class ExecutionService {
  private readonly maxWallTimeLimit: number;
  private readonly memoryLimit: number;

  constructor(
    private readonly fileHandleService: FileHandleService,
    private readonly resultService: ResultService
  ) {
    this.maxWallTimeLimit = parseInt(process.env.MAX_WALL_TIME_LIMIT ?? '10'); // Default: 10 seconds
    this.memoryLimit = parseInt(process.env.MEMORY_LIMIT ?? '128') * 1024; // Default: 128 MB
  }

  async processSubmission({
    id,
    language,
    sourceCode,
    input,
    expectedOutput,
  }: ExecutionQueueJobDataType): Promise<SubmissionResult> {
    //Store request data into files;
    const {
      workingDir,
      sourceCodeFilePath,
      scriptFilePath,
      metaDataFilePath,
      exitCodeFilePath,
      standardOutputFilePath,
      outputFilePath,
      standardErrorFilePath,
    } = await this.fileHandleService.storeFiles({
      id,
      language,
      sourceCode,
      input,
      expectedOutput,
    });

    // execute the code
    const { execStdout, execStderr } = await this.execute(
      workingDir,
      sourceCodeFilePath,
      scriptFilePath
    );

    const result = await this.resultService.buildResult({
      metaDataFilePath,
      exitCodeFilePath,
      standardOutputFilePath,
      outputFilePath,
      standardErrorFilePath,
      execStdout,
      execStderr,
    });

    await this.fileHandleService.deleteDir(workingDir);

    return {
      id,
      ...result,
    };
  }

  async execute(workingDir: string, sourceCodeFilePath: string, scriptFilePath: string) {
    /**
     * 1. Create user with least permissions
     * 2. Build language specific script.sh
     * 3. Make script executabel 'chmod +x script.sh'
     * 4. Build cmd with memory and time limits
     * 5. Complie the code -> Create executable, if error then into stderr
     * 6. Run executable with stdin and store output in stdout, if err the into stderr.
     * If there is any error while any step build status like 'compile-error', 'runtime-error',
     * log into matadata.txt if successful then status=successful.
     */

    try {
      /*
      Execution Script will work like this
      1. Get language specific script by matching language and extension
      2. Pass sourceCode file as argument to script
      3. Like this 'script.sh main.cpp'
    */
      //TODO: Create a user with least privilege don't execute with root user
      await fs.chmod(scriptFilePath, '755');

      // Executions cmds with resource limit
      const ulimitCommand = `ulimit -v ${this.memoryLimit}; ulimit -t ${this.maxWallTimeLimit}`;
      const executionCommand = `/usr/bin/time -f "time=%e\\nmemory=%M" timeout ${this.maxWallTimeLimit}s /bin/bash ${scriptFilePath} ${sourceCodeFilePath}`;
      const exitCodeCommand = `echo $? > exit_code.txt`;
      const fullCommand = `sh -c '${ulimitCommand} && ${executionCommand}; ${exitCodeCommand}'`;

      const { stdout, stderr } = await execPromise(fullCommand, { cwd: workingDir });

      logger.info(
        `stdout & stderr info from executionService, stdout: ${stdout}, stderr: ${stderr}`
      );

      return {
        execStdout: stdout,
        execStderr: stderr,
      };
    } catch (error) {
      logger.error(`Error executing job ${workingDir}:`, error);
      throw error;
    }
  }
}
