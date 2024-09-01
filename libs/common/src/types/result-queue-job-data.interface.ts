import { StatusMessage } from '../enum';

export interface ResultQueueSuccessfulJobDataType {
  id: number;
  status: StatusMessage;
  time: number;
  memory: number;
  testCasesPassed: number;
  totalTestCases: number;
  stderr?: string;
}

export interface ResultQueueFailedJobDataType {
  id: number;
}
