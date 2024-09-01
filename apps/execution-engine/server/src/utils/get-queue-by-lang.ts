import { Languages } from '@code-judge/common';
import { Queues } from '../enums';

export const getJobQueue = (language: Languages): Queues => {
  switch (language) {
    case Languages.C:
      return Queues.C_JOB_QUEUE;
    case Languages.CPP:
      return Queues.CPP_JOB_QUEUE;
    case Languages.GO:
      return Queues.GO_JOB_QUEUE;
    case Languages.JAVA:
      return Queues.JAVA_JOB_QUEUE;
    case Languages.JAVASCRIPT:
      return Queues.JS_JOB_QUEUE;
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
};
