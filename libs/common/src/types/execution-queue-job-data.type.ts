import { Languages } from '../enum';

export interface ExecutionQueueJobDataType {
  id: number;
  language: Languages;
  sourceCode: string;
  input: string;
  expectedOutput: string;
}
