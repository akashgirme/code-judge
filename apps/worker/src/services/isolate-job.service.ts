/**
 * `isolate` is a Linux-based tool designed for securely running untrusted or potentially harmful code in a sandboxed environment.
 * It isolates the execution of processes by limiting their access to system resources like CPU, memory, and file storage. \
 * The tool ensures that the code runs with restricted privileges, preventing it from interfering with the host system or other processes.
 *
 * Isolate was developed by `Martin Mareš (mj@ucw.cz)` and `Bernard Blackham (bernard@blackham.com.au)`
 * `https://github.com/ioi/isolate`
 * Manual: `https://www.ucw.cz/moe/isolate.1.html`
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import { existsSync, readFileSync } from 'fs';
import { injectable } from 'tsyringe';
import { SubmissionService } from './submission.service';
import { SubmissionState, SubmissionStatus } from '@code-judge/common';
import { Result, Submission } from '../types';
import path from 'path';

@injectable()
export class IsolateJob {
  private submission: Submission;
  private boxId: number;
  private workDir: string;
  private boxDir: string;
  private tmpDir: string;
  private sourceFile: string;
  private stdinFile: string;
  private stdoutFile: string;
  private stderrFile: string;
  private metadatFile: string;
  private runScriptFile: string;
  private expectedOutputFile: string;

  static readonly STDIN_FILE_NAME = 'stdin.txt';
  static readonly STDOUT_FILE_NAME = 'stdout.txt';
  static readonly STDERR_FILE_NAME = 'stderr.txt';
  static readonly METADATA_FILE_NAME = 'metadata.txt';
  static readonly RUN_SCRIPT_FILE_NAME = 'run.sh';
  static readonly EXPECTED_OUTPUT_FILE_NAME = 'expected_output.txt';
  static readonly COMPILE_SCRIPT_FILE_NAME = 'compile.sh';
  static readonly COMPILE_OUTPUT_FILE_NAME = 'compile_output.txt';

  constructor(private submissionService: SubmissionService) {}

  async perform(submission: Submission) {
    this.submission = submission;
    const time: number[] = [];
    const memory: number[] = [];
    const result: Result[] = [];

    // Update submission state to running as soon as job is received
    this.submission.state = SubmissionState.RUNNING;
    this.submissionService.updateSubmission(this.submission);

    this.initializeWorkdir();

    if (this.compile() === 'failure') {
      this.cleanup();
      console.log(`Submission Object on compilation error:`, this.submission);
      this.submission.state = SubmissionState.SUCCESS;
      await this.submissionService.updateSubmission(this.submission);
      return;
    }

    console.log(`Submission Object after compilation:`, this.submission);

    // Iterate over all test cases and run program for each test case and collect the output
    for (let i = 0; i < this.submission.testCases.length; i++) {
      fs.writeFileSync(this.stdinFile, this.submission.testCases[i].input);
      fs.writeFileSync(this.expectedOutputFile, this.submission.testCases[i].output);

      this.run();

      this.verify();

      time.push(this.submission.time);
      memory.push(this.submission.memory);
      result.push({
        input: this.submission.testCases[i].input,
        output: this.submission.stdout,
        expectedOutput: this.submission.testCases[i].output,
      });
    }

    // After all testcases run clean the code, testcases, compile.sh & other program files.
    this.cleanup();

    // Take average of time require to run program against all test cases
    this.submission.time = parseFloat(
      (time.reduce((a, b) => a + b, 0) / time.length).toFixed(4)
    );

    // Take average of memory require to run program against all test cases
    this.submission.memory = memory.reduce((a, b) => a + b, 0) / memory.length;
    this.submission.result = result;

    this.submission.totalTestCases = this.submission.testCases.length;

    let passedTestCases: number = 0;

    // Calculate the number of passed testcases, comparing expected output vs actual output
    this.submission.result.map((testCase) => {
      if (testCase.output === testCase.expectedOutput) passedTestCases++;
    });

    this.submission.passedTestCases = passedTestCases;

    this.submission.state = SubmissionState.SUCCESS;

    console.log(`Final submission Object after run & verify: `, this.submission);

    await this.submissionService.updateSubmission(this.submission);
  }

  /**
   * Initialize working directory for isolate sandbox envrironment
   * Write compileCmd, runCmd, sourceCode into respective files inside working Dir.
   */

  private initializeWorkdir() {
    this.boxId = Math.floor(100 + Math.random() * 900);
    this.workDir = execSync(`isolate -b ${this.boxId} --init`).toString().trim();
    this.boxDir = path.join(this.workDir, 'box');
    this.tmpDir = path.join(this.workDir, 'tmp');
    this.sourceFile = path.join(this.boxDir, this.submission.languageConfig.sourceFile);
    this.stdinFile = path.join(this.workDir, IsolateJob.STDIN_FILE_NAME);
    this.stdoutFile = path.join(this.workDir, IsolateJob.STDOUT_FILE_NAME);
    this.stderrFile = path.join(this.workDir, IsolateJob.STDERR_FILE_NAME);
    this.metadatFile = path.join(this.workDir, IsolateJob.METADATA_FILE_NAME);
    this.runScriptFile = path.join(this.boxDir, IsolateJob.RUN_SCRIPT_FILE_NAME);
    this.expectedOutputFile = path.join(
      this.workDir,
      IsolateJob.EXPECTED_OUTPUT_FILE_NAME
    );

    [
      this.sourceFile,
      this.stdinFile,
      this.stdoutFile,
      this.stderrFile,
      this.metadatFile,
      this.runScriptFile,
      this.expectedOutputFile,
    ].forEach((file) => this.initializeFile(file));

    fs.writeFileSync(this.sourceFile, this.submission.sourceCode, { encoding: 'utf-8' });
    fs.writeFileSync(this.runScriptFile, this.submission.languageConfig.runCmd, {
      encoding: 'utf-8',
    });
  }

  private initializeFile(file: string) {
    execSync(`sudo touch ${file} && sudo chown $(whoami):$(whoami) ${file}`);
  }

  /**
   * Method to Compile Code
   * Compile code and create executable of program
   */
  private compile(): 'success' | 'failure' {
    // Interpreted language don't have compilation step so pass the compilation process with 'success' message
    if (!this.submission.languageConfig.compileCmd) {
      return 'success';
    }

    const compileScriptFile = path.join(this.boxDir, IsolateJob.COMPILE_SCRIPT_FILE_NAME);
    this.initializeFile(compileScriptFile);

    fs.writeFileSync(compileScriptFile, this.submission.languageConfig.compileCmd, {
      encoding: 'utf-8',
    });

    const compileOutputFile = path.join(
      this.workDir,
      IsolateJob.COMPILE_OUTPUT_FILE_NAME
    );
    this.initializeFile(compileOutputFile);

    const command = `isolate \
      -s \
      -b ${this.boxId} \
      -M ${this.metadatFile} \
      --stderr-to-stdout \
      -i /dev/null \
      -t ${this.submission.languageConfig.cpuTimeLimit} \
      -x ${this.submission.languageConfig.cpuExtraTime} \
      -w ${this.submission.languageConfig.wallTimeLimit} \
      -p${this.submission.languageConfig.maxpProcessesAndOrThreads} \
      -k ${this.submission.languageConfig.stackLimit} \
      -m ${this.submission.languageConfig.memoryLimit} \
      -f ${this.submission.languageConfig.maxFileSize} \
      -E HOME=/tmp \
      -E PATH=\"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\" \
      -E LANG -E LANGUAGE -E LC_ALL \
      -d /etc:noexec \
      --run \
      -- /bin/bash $(basename ${compileScriptFile}) > ${compileOutputFile}`;

    command.replace(/\s+/g, ' ');

    execSync(command);

    // Read output/err while compiling the code from `compileOutputFile`
    const compileOutput =
      fs.readFileSync(compileOutputFile, { encoding: 'utf-8' })?.trim() || null;

    const metadata = this.getMetadata();
    this.resetMetadataFile();

    if (compileOutput || metadata.status === 'RE') {
      this.submission.stderr = compileOutput;
      this.submission.status = SubmissionStatus.COMPILE_ERROR;
      return 'failure';
    }

    /**
     * Check for `SIGSEGV` signal from metadata file,
     *If exists indicates that process is killed by control group due to `Memory limit is exceeds`.
     */
    if (metadata.signal === 'SIGSEGV') {
      this.submission.stderr = 'Compilation memory limit exceeded.';
      this.submission.status = SubmissionStatus.COMPILE_ERROR;

      return 'failure';
    }

    /**
     * Check for status from metadata file
     * If it is `TO` indicates that process is killed by control group due to `Time limit is exceeds`.
     */
    if (metadata.status === 'TO') {
      this.submission.stderr = 'Compilation time limit exceeded.';
      this.submission.status = SubmissionStatus.COMPILE_ERROR;

      return 'failure';
    }

    // After compilation complete unlink/remove `compileScriptFile` won't need it again.
    fs.unlinkSync(compileScriptFile);

    return 'success';
  }

  private run() {
    const command = `isolate \
      -s \
      -b ${this.boxId} \
      -M ${this.metadatFile} \
      -t ${this.submission.languageConfig.cpuTimeLimit} \
      -x ${this.submission.languageConfig.cpuExtraTime} \
      -w ${this.submission.languageConfig.wallTimeLimit} \
      -k ${this.submission.languageConfig.stackLimit} \
      -p${this.submission.languageConfig.maxpProcessesAndOrThreads} \
      -m ${this.submission.languageConfig.memoryLimit} \
      -f ${this.submission.languageConfig.maxFileSize} \
      -E HOME=/tmp \
      -E PATH=\"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\" \
      -E LANG -E LANGUAGE -E LC_ALL \
      -d /etc:noexec \
      --run \
      -- /bin/bash $(basename ${this.runScriptFile}) \
      < ${this.stdinFile} > ${this.stdoutFile} 2> ${this.stderrFile}`;

    command.replace(/\s+/g, ' ');

    execSync(command);
  }

  /**
   * Verify() method extract the stdout, stderr, metadata after successful run()
   * Builds the result like `memory`, `time`, `stdout`, `stderr`, `exitCode` etc.
   */
  private verify() {
    const metadata = this.getMetadata();

    let programStdout = readFileSync(this.stdoutFile, { encoding: 'utf-8' });
    programStdout = programStdout?.trim() ?? null;

    let programStderr = readFileSync(this.stderrFile, { encoding: 'utf-8' });
    programStderr = programStderr?.trim() ?? null;

    this.submission.time = parseFloat(metadata.time);
    this.submission.wallTime = parseFloat(metadata['time-wall']);
    this.submission.memory = parseInt(metadata['max-rss']!);
    this.submission.stdout = programStdout;
    this.submission.stderr = programStderr;
    this.submission.exitCode = metadata.exitcode ? parseInt(metadata.exitcode) : 0;
    this.submission.exitSignal = metadata.exitsig;
    this.submission.message = metadata.message;
    this.submission.status = this.determineStatus(metadata.status);

    // Handling specific errors for exec format
    if (
      this.submission.status === SubmissionStatus.INTERNAL_SERVER_ERROR &&
      (this.submission.message?.match(/^execve\(.+\): Exec format error$/) ||
        this.submission.message?.match(/^execve\(.+\): No such file or directory$/) ||
        this.submission.message?.match(/^execve\(.+\): Permission denied$/))
    ) {
      this.submission.status = SubmissionStatus.INTERNAL_SERVER_ERROR;
    }
  }

  private cleanup() {
    try {
      this.fixPermissions();

      execSync(`sudo rm -rf ${this.boxDir}/* ${this.tmpDir}/*`);
      [this.stdinFile, this.stdoutFile, this.stderrFile, this.metadatFile].forEach(
        (f) => {
          execSync(`sudo rm -rf ${f}`);
        }
      );

      execSync(`isolate --cg -b ${this.boxId} --cleanup`);

      if (existsSync(this.workDir)) {
        throw new Error(`Cleanup of sandbox ${this.boxId} failed.`);
      }
    } catch (error) {
      console.log(`Error occured while cleaning isolate sandbox`, error);
    }
  }

  private resetMetadataFile() {
    execSync(`sudo rm -f ${this.metadatFile}`);
    this.initializeFile(this.metadatFile);
  }

  private fixPermissions() {
    execSync(`sudo chown -R $(whoami): ${this.boxDir}`);
  }

  private strip(input: string | null | undefined): string {
    return input?.trim() || '';
  }

  /**
   * Metadata is generated by `isolate` during every run
   * Learn more about metadata here: `https://www.ucw.cz/moe/isolate.1.html#_meta_files`
   */
  private getMetadata(): Record<string, any> {
    const metadataContent = readFileSync(this.metadatFile, 'utf-8').split('\n');

    const metadata: Record<string, any> = {};

    metadataContent.forEach((line) => {
      const [key, value] = line.split(':');
      metadata[key?.trim()] = value?.trim();
    });

    console.log(`Metadata: `, metadata);

    return metadata;
  }

  /** Status
   * Two-letter status code:
   * RE — run-time error, i.e., exited with a non-zero exit code
   * SG — program died on a signal
   * TO — timed out
   * XX — internal error of the sandbox
   */
  private determineStatus(status: string): SubmissionStatus {
    const expectedOutput = readFileSync(this.expectedOutputFile, 'utf-8');

    const stdout = readFileSync(this.stdoutFile, 'utf-8');

    if (status === 'TO') {
      return SubmissionStatus.TIME_LIMIT_EXCEEDED;
    } else if (status === 'SG') {
      return SubmissionStatus.INTERNAL_SERVER_ERROR;
    } else if (status === 'RE') {
      return SubmissionStatus.RUNTIME_ERROR;
    } else if (status === 'XX') {
      return SubmissionStatus.INTERNAL_SERVER_ERROR;
    } else if (
      expectedOutput === null ||
      this.strip(expectedOutput) === this.strip(stdout)
    ) {
      return SubmissionStatus.ACCEPTED;
    } else {
      return SubmissionStatus.WRONG_ANSWER;
    }
  }
}
