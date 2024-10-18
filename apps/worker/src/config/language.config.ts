import { LanguageConfig } from '../types';

export const cConfig: LanguageConfig = {
  name: 'C',
  sourceFile: 'main.c',
  compileCmd: 'gcc main.c',
  runCmd: './a.out',
  cpuTimeLimit: 2, // 2 sec
  cpuExtraTime: 0,
  wallTimeLimit: 2, // 2 sec
  stackLimit: 1024 * 1024 * 100, // 100MB
  maxpProcessesAndOrThreads: 10,
  memoryLimit: 1024 * 1024 * 50, // 50MB
  maxFileSize: 1024, // 1MB
};

export const cppConfig: LanguageConfig = {
  name: 'C++',
  sourceFile: 'main.cpp',
  compileCmd: 'g++ main.cpp',
  runCmd: './a.out',
  cpuTimeLimit: 2,
  cpuExtraTime: 0,
  wallTimeLimit: 2,
  stackLimit: 1024 * 1024 * 100, // 100MB
  maxpProcessesAndOrThreads: 10,
  memoryLimit: 1024 * 1024 * 50, // 50MB
  maxFileSize: 1024, // 1MB
};

export const goLangConfig: LanguageConfig = {
  name: 'Go',
  sourceFile: 'main.go',
  compileCmd: 'go build main.go',
  runCmd: './main',
  cpuTimeLimit: 3,
  cpuExtraTime: 0,
  wallTimeLimit: 3,
  stackLimit: 1024 * 1024 * 200, // 200MB
  maxpProcessesAndOrThreads: 10,
  memoryLimit: 1024 * 1024 * 100, // 100MB
  maxFileSize: 1024, // 1MB
};

export const javaConfig: LanguageConfig = {
  name: 'Java',
  sourceFile: 'Main.java',
  compileCmd: 'java Main.java',
  runCmd: 'java Main',
  cpuTimeLimit: 2,
  cpuExtraTime: 0,
  wallTimeLimit: 2,
  stackLimit: 1024 * 1024 * 200, // 200MB
  maxpProcessesAndOrThreads: 10,
  memoryLimit: 1024 * 1024 * 100, // 100MB
  maxFileSize: 1024, // 1MB
};

export const javaScriptConfig: LanguageConfig = {
  name: 'JavaScript (Node.js 20)',
  sourceFile: 'script.js',
  runCmd: 'node script.js',
  cpuTimeLimit: 2, // 2 sec
  cpuExtraTime: 0,
  wallTimeLimit: 2, // 2 sec
  stackLimit: 1024 * 1024 * 200, // 200MB
  maxpProcessesAndOrThreads: 10,
  memoryLimit: 1024 * 1024 * 100, // 100MB
  maxFileSize: 1024, // 1MB
};
