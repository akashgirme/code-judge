import { Languages } from '@code-judge/common';

export const getSourceFileName = (language: Languages): string => {
  switch (language) {
    case Languages.C:
      return 'main.c';
    case Languages.CPP:
      return 'main.cpp';
    case Languages.GO:
      return 'main.go';
    case Languages.JAVA:
      return 'Main.java';
    case Languages.JAVASCRIPT:
      return 'main.js';
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
};
