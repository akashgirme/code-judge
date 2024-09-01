import { StatusMessage } from '@code-judge/common';

export const buildStatusMessage = (
  status: string,
  testCasesPassed?: number,
  totalTestCases?: number
) => {
  if (status == 'successful' && testCasesPassed === totalTestCases) {
    return StatusMessage.ACCEPTED;
  } else if (status == 'successful' && testCasesPassed !== totalTestCases) {
    return StatusMessage.WRONG_ANSWER;
  } else if (status == 'compilation-error') {
    return StatusMessage.COMPILE_ERROR;
  } else if (status == 'execution-error') {
    return StatusMessage.EXECUTION_ERROR;
  } else if (status == 'runtime-error') {
    return StatusMessage.RUNTIME_ERROR;
  } else if (status == 'memory-exceeded') {
    return StatusMessage.MEMORY_LIMIT_EXCEEDED;
  } else if (status == 'time-limit-exceeded') {
    return StatusMessage.TIME_LIMIT_EXCEEDED;
  } else if (status == 'error') {
    return StatusMessage.UNEXPECTED_ERROR;
  } else {
    return StatusMessage.REJECTED;
  }
};
