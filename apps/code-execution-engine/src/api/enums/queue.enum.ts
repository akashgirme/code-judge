export enum Queues {
  WORKERS_JOB_QUEUE = 'workers-job-queue',
  WORKERS_RESULT_JOB_QUEUE = 'workers-result-job-queue',
}

export enum QueueJobTypes {
  C_CODE_EXECUTION = 'c-code-execution',
  CPP_CODE_EXECUTION = 'cpp-code-execution',
  GO_CODE_EXECUTION = 'go-code-execution',
  JAVA_CODE_EXECUTION = 'java-code-execution',
  JAVASCRIPT_CODE_EXECUTION = 'javascript-code-execution',
}

export enum ResultQueueJobType {
  FAILED_JOB = 'failed-job',
  SUCCESSFUL_JOB = 'successful-job',
}
