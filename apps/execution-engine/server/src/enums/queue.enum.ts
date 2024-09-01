export enum Queues {
  C_JOB_QUEUE = 'C-QUEUE',
  CPP_JOB_QUEUE = 'CPP-QUEUE',
  JAVA_JOB_QUEUE = 'JAVA-QUEUE',
  GO_JOB_QUEUE = 'GO-QUEUE',
  JS_JOB_QUEUE = 'JS-QUEUE',
  RESULT_JOB_QUEUE = 'RESULT-JOB-QUEUE',
}

export enum ResultQueueJobType {
  FAILED_JOB = 'failed-job',
  SUCCESSFUL_JOB = 'successful-job',
}
