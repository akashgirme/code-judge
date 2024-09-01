import { injectable } from 'tsyringe';
import fs from 'fs';
import { StatusMessage } from '@code-judge/common';

interface BuildResultMethodParams {
  metaDataFilePath: string;
  standardErrorFilePath: string;
  exitCodeFilePath: string;
  standardOutputFilePath: string;
  outputFilePath: string;
  execStdout: string;
  execStderr: string;
}

@injectable()
export class ResultService {
  constructor() {}

  async buildResult({
    metaDataFilePath,
    standardErrorFilePath,
    exitCodeFilePath,
    standardOutputFilePath,
    outputFilePath,
    execStdout,
    execStderr,
  }: BuildResultMethodParams) {
    let status: StatusMessage = StatusMessage.UNEXPECTED_ERROR;
    let executionTime: number = 0;
    let memoryUsage: number = 0;

    // Build testcases result
    const expectedOutput = fs.readFileSync(outputFilePath, 'utf-8');
    const actualOutput = fs.readFileSync(standardOutputFilePath, 'utf-8');

    // Split the content into lines
    const expectedLines = expectedOutput.trim().split('\n');
    const actualLines = actualOutput.trim().split('\n');

    // Compare lines and count matching test cases
    const totalTestCases = expectedLines.length;
    let testCasesPassed = 0;

    for (let i = 0; i < totalTestCases; i++) {
      if (expectedLines[i] === actualLines[i]) {
        testCasesPassed++;
      }
    }

    // Extract time and memory from stderr of exec
    const timeMatch = execStderr.match(/time=(\d+\.\d+)/);
    const memoryMatch = execStderr.match(/memory=(\d+)/);

    if (timeMatch && memoryMatch) {
      executionTime = parseFloat(timeMatch[1]);
      memoryUsage = parseInt(memoryMatch[1]);
    }

    // Read the metadata file & exit_code status file
    const metadataFileContent = fs.readFileSync(metaDataFilePath, 'utf8');
    const exitCodeFileContent = fs.readFileSync(exitCodeFilePath, 'utf8');

    // Check if the status was set by the bash script
    if (metadataFileContent.includes('status=compilation-error')) {
      status = StatusMessage.COMPILE_ERROR;
    } else if (metadataFileContent.includes('status=execution-error')) {
      status = StatusMessage.EXECUTION_ERROR;
    } else if (metadataFileContent.includes('status=successful')) {
      if (testCasesPassed === totalTestCases) status = StatusMessage.ACCEPTED;
      else if (testCasesPassed !== totalTestCases) {
        status = StatusMessage.WRONG_ANSWER;
      }
    }

    // Set status by exitecode
    /**
     - If process terminated due to 'memory-limit-execeeds' it returns the status code '137'
     - If terminated due to 'time-limit-exceeds' returns status code '124'
     */

    if (exitCodeFileContent.includes('137')) {
      status = StatusMessage.MEMORY_LIMIT_EXCEEDED;
    } else if (exitCodeFileContent.includes('124')) {
      status = StatusMessage.TIME_LIMIT_EXCEEDED;
    }

    if (!status) {
      status = StatusMessage.UNEXPECTED_ERROR;
    }

    // Read stderr if any
    const stderr = fs.readFileSync(standardErrorFilePath, 'utf-8');

    const result = {
      status,
      time: parseFloat(executionTime.toFixed(4)),
      memory: memoryUsage,
      testCasesPassed,
      totalTestCases,
      stderr,
    };

    return result;
  }
}
