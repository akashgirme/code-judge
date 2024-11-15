interface Metadata {
  time: number;
  'time-wall': number;
  'cg-mem'?: number;
  'max-rss'?: number;
  exitcode?: number;
  exitsig?: number;
  message?: string;
  status: string;
}
