import { env } from '../config/env';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
  }

  info(message: string): void {
    console.log(this.formatMessage('info', message));
  }

  warn(message: string): void {
    console.warn(this.formatMessage('warn', message));
  }

  error(message: string, error?: Error): void {
    console.error(this.formatMessage('error', message));
    if (error && env.NODE_ENV === 'development') {
      console.error(error.stack);
    }
  }

  debug(message: string): void {
    if (env.NODE_ENV === 'development') {
      console.debug(this.formatMessage('debug', message));
    }
  }
}

export const logger = new Logger();
