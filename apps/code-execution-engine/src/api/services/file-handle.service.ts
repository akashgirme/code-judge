import { Languages } from '@code-judge/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { injectable } from 'tsyringe';
import {
  cppScript,
  cScript,
  goScript,
  javaLanguageScript,
  javascriptScript,
} from '../../scripts';
import { logger } from '../utils';

@injectable()
export class FileHandleService {
  private readonly BASEDIR: string = '/tmp';
  private readonly INPUTFILE: string = 'stdin.txt';
  private readonly ERRORFILE: string = 'stderr.txt';
  private readonly OUTPUTFILE: string = 'stdout.txt';
  private readonly EXEPECTEDOUTPUTFILE: string = 'output.txt';
  private readonly METADATAFILE: string = 'metadata.txt';
  private readonly SCRIPTFILE: string = 'script.sh';
  private readonly EXITCODEFILE: string = 'exit_code.txt';

  async storeFiles(
    id: number,
    language: Languages,
    sourceCode: string,
    input: string,
    expectedOutput: string
  ) {
    const workingDir = path.join(this.BASEDIR, id.toString());
    // Create working directory
    try {
      await fs.mkdir(workingDir, { recursive: true });
    } catch (error) {
      logger.info(`Failed to create working directory: ${workingDir}`, error);
      throw error;
    }

    //Defining/Joing file paths
    const sourceCodeFilePath = path.join(workingDir, this.getSourceFileName(language));
    const inputFilePath = path.join(workingDir, this.INPUTFILE);
    const outputFilePath = path.join(workingDir, this.EXEPECTEDOUTPUTFILE);
    const scriptFilePath = path.join(workingDir, this.SCRIPTFILE);
    const metaDataFilePath = path.join(workingDir, this.METADATAFILE);
    const standardOutputFilePath = path.join(workingDir, this.OUTPUTFILE);
    const standardErrorFilePath = path.join(workingDir, this.ERRORFILE);
    const exitCodeFilePath = path.join(workingDir, this.EXITCODEFILE);

    try {
      await Promise.all([
        fs.writeFile(sourceCodeFilePath, sourceCode),
        fs.writeFile(inputFilePath, input),
        fs.writeFile(outputFilePath, expectedOutput),
        fs.writeFile(scriptFilePath, this.getScript(language)),
        fs.writeFile(metaDataFilePath, ''),
        fs.writeFile(standardOutputFilePath, ''),
        fs.writeFile(standardErrorFilePath, ''),
        fs.writeFile(exitCodeFilePath, ''),
      ]);
    } catch (error) {
      logger.info(`Error storing files in ${workingDir}:`, error);
      throw error;
    }
  }

  private getSourceFileName(language: Languages): string {
    switch (language) {
      case Languages.C:
        return 'main.c';
      case Languages.CPP:
        return 'main.cpp';
      case Languages.GO:
        return 'main.go';
      case Languages.JAVA:
        return 'main.java';
      case Languages.JAVASCRIPT:
        return 'main.js';
      default:
        throw new Error(`Unsupported language: ${language}`);
    }
  }

  private getScript(language: Languages): string {
    switch (language) {
      case Languages.C:
        return cScript;
      case Languages.CPP:
        return cppScript;
      case Languages.GO:
        return goScript;
      case Languages.JAVA:
        return javaLanguageScript;
      case Languages.JAVASCRIPT:
        return javascriptScript;
      default:
        throw new Error(`Unsupported language: ${language}`);
    }
  }

  async processResult(jobDir: string): Promise<{
    status: string;
    testCasesPassed?: number;
    totalTestCases?: number;
    stderr?: string;
    time?: number;
    memory?: number;
  }> {
    try {
      // Read metadata.txt
      const metadataPath = path.join(jobDir, 'metadata.txt');
      const stderrPath = path.join(jobDir, 'stderr.txt');
      const metadata = await fs.readFile(metadataPath, 'utf-8');
      const stderr = await fs.readFile(stderrPath, 'utf-8');
      const statusMatch = metadata.match(/status=([\w-]+)/);
      const timeMatch = metadata.match(/time=([\d.]+)/);
      const memoryMatch = metadata.match(/memory=(\d+)/);

      const status = statusMatch ? statusMatch[1] : 'unknown';
      const time = timeMatch ? parseFloat(timeMatch[1]) : 0;
      const memory = memoryMatch ? parseInt(memoryMatch[1]) : 0;

      if (status !== 'successful') {
        return { status, stderr, time, memory };
      }

      // Read output.txt and stdout.txt
      const outputPath = path.join(jobDir, 'output.txt');
      const stdoutPath = path.join(jobDir, 'stdout.txt');
      const expectedOutput = await fs.readFile(outputPath, 'utf-8');
      const actualOutput = await fs.readFile(stdoutPath, 'utf-8');

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

      return { status, testCasesPassed, totalTestCases, time, memory };
    } catch (error) {
      logger.error('Error processing results:', error);
      return { status: 'error' };
    }
  }

  async deleteDirectory(jobDir: string): Promise<void> {
    try {
      const files = await fs.readdir(jobDir);

      // Loop through all files and directories
      for (const file of files) {
        const filePath = path.join(jobDir, file);
        const stat = await fs.lstat(filePath);

        if (stat.isDirectory()) {
          // Recursively delete subdirectory
          await this.deleteDirectory(filePath);
        } else {
          // Delete file
          await fs.unlink(filePath);
        }
      }

      // Finally, remove the empty directory
      await fs.rmdir(jobDir);
      logger.info(`Directory ${jobDir} deleted successfully`);
    } catch (err) {
      logger.error(`Error deleting directory ${jobDir}:`, err);
    }
  }
}
