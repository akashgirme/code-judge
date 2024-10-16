import { Languages } from '@code-judge/common';
import {
  cConfig,
  cppConfig,
  goLangConfig,
  javaConfig,
  javaScriptConfig,
} from '../config/language.config';
import { LanguageConfig } from '../types';

export const getLanguageConfig = (language: Languages): LanguageConfig => {
  switch (language) {
    case Languages.C:
      return cConfig;
    case Languages.CPP:
      return cppConfig;
    case Languages.JAVA:
      return javaConfig;
    case Languages.GO:
      return goLangConfig;
    case Languages.JAVASCRIPT:
      return javaScriptConfig;
  }
};
