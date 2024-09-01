import { Languages } from '@code-judge/common';
import { languageScripts } from '../scripts/script';

export const getLanguageScript = (language: Languages): string => {
  const { script } = languageScripts.find((script) => script.extension === language);
  if (!script) {
    throw new Error(`Unsupported language: ${language}`);
  }
  return script;
};
