export interface LogEntry {
  level: string;
  message: string;
  timestamp: Date;
  context?: string;
}
