import { LanguageConfig } from '../types';

export const cConfig: LanguageConfig = {
  name: 'C (GCC 9.2.0)',
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
  name: 'C++ (GCC 9.2.0)',
  sourceFile: 'main.cpp',
  // compileCmd: 'g++ main.cpp',
  compileCmd: `g++ main.cpp`,
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
  name: 'Go (1.13.5)',
  sourceFile: 'main.go',
  compileCmd: 'GOCACHE=/tmp/.cache/go-build /usr/local/go/bin/go build main.go',
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
  name: 'Java (OpenJDK 13.0.1)',
  sourceFile: 'Main.java',
  compileCmd: '/usr/local/openjdk13/bin/javac Main.java',
  runCmd: '/usr/local/openjdk13/bin/java Main',
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
  runCmd: '/usr/local/node-12.14.0/bin/node script.js',
  cpuTimeLimit: 2, // 2 sec
  cpuExtraTime: 0,
  wallTimeLimit: 2, // 2 sec
  stackLimit: 1024 * 1024 * 200, // 200MB
  maxpProcessesAndOrThreads: 10,
  memoryLimit: 1024 * 1024 * 100, // 100MB
  maxFileSize: 1024, // 1MB
};
