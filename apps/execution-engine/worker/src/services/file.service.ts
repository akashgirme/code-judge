import { Languages } from '@code-judge/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import { injectable } from 'tsyringe';
import { logger, getSourceFileName, getLanguageScript } from '../utils';

interface StoreFileMethodParams {
  id: number;
  language: Languages;
  sourceCode: string;
  input: string;
  expectedOutput: string;
}

@injectable()
export class FileHandleService {
  private readonly BASE_DIR_NAME: string = '/tmp';
  private readonly INPUT_FILE_NAME: string = 'stdin.txt';
  private readonly ERROR_FILE_NAME: string = 'stderr.txt';
  private readonly OUTPUT_FILE_NAME: string = 'stdout.txt';
  private readonly EXEPECTED_OUTPUT_FILE_NAME: string = 'output.txt';
  private readonly METADATA_FILE_NAME: string = 'metadata.txt';
  private readonly SCRIPT_FILE_NAME: string = 'script.sh';
  private readonly EXIT_CODE_FILE_NAME: string = 'exit_code.txt';

  async storeFiles({
    id,
    language,
    sourceCode,
    input,
    expectedOutput,
  }: StoreFileMethodParams) {
    // Create working directory
    const jobId = id.toString();
    logger.info(`Info from file handle service, value of jobId.toString() is ${jobId}`);
    const workingDir = path.join(this.BASE_DIR_NAME, jobId);

    try {
      await fs.mkdir(workingDir, { recursive: true });
    } catch (error) {
      logger.info(`Failed to create working directory: ${workingDir}`, error);
      throw error;
    }

    // Defining/Joining file paths
    const sourceCodeFilePath = path.join(workingDir, getSourceFileName(language));
    const inputFilePath = path.join(workingDir, this.INPUT_FILE_NAME);
    const outputFilePath = path.join(workingDir, this.EXEPECTED_OUTPUT_FILE_NAME);
    const scriptFilePath = path.join(workingDir, this.SCRIPT_FILE_NAME);
    const metaDataFilePath = path.join(workingDir, this.METADATA_FILE_NAME);
    const standardOutputFilePath = path.join(workingDir, this.OUTPUT_FILE_NAME);
    const standardErrorFilePath = path.join(workingDir, this.ERROR_FILE_NAME);
    const exitCodeFilePath = path.join(workingDir, this.EXIT_CODE_FILE_NAME);

    try {
      await Promise.all([
        fs.writeFile(sourceCodeFilePath, sourceCode),
        fs.writeFile(inputFilePath, input),
        fs.writeFile(outputFilePath, expectedOutput),
        fs.writeFile(scriptFilePath, getLanguageScript(language)),
        fs.writeFile(metaDataFilePath, ''),
        fs.writeFile(standardOutputFilePath, ''),
        fs.writeFile(standardErrorFilePath, ''),
        fs.writeFile(exitCodeFilePath, ''),
      ]);
    } catch (error) {
      logger.info(`Error storing files in ${workingDir}:`, error);
      throw error;
    }

    return {
      workingDir,
      sourceCodeFilePath,
      scriptFilePath,
      metaDataFilePath,
      exitCodeFilePath,
      standardOutputFilePath,
      outputFilePath,
      standardErrorFilePath,
    };
  }

  async deleteDir(workingDir: string): Promise<void> {
    try {
      await fs.rm(workingDir, { recursive: true, force: true });
      logger.info(`Directory ${workingDir} deleted successfully`);
    } catch (err) {
      logger.error(`Error deleting directory ${workingDir}:`, err);
    }
  }
}
