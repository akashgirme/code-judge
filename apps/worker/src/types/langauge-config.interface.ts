export interface LanguageConfig {
  name: string;
  sourceFile: string;
  compileCmd?: string;
  runCmd: string;
  cpuTimeLimit: number;
  cpuExtraTime: number;
  wallTimeLimit: number;
  stackLimit: number;
  maxpProcessesAndOrThreads: number;
  memoryLimit: number;
  maxFileSize: number;
}
