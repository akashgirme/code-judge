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

    try {
      await Promise.all([
        fs.writeFile(sourceCodeFilePath, sourceCode),
        fs.writeFile(inputFilePath, input),
        fs.writeFile(outputFilePath, expectedOutput),
        fs.writeFile(scriptFilePath, this.getScript(language)),
        fs.writeFile(metaDataFilePath, ''),
        fs.writeFile(standardOutputFilePath, ''),
        fs.writeFile(standardErrorFilePath, ''),
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
}
