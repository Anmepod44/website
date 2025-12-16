/**
 * Logging utility for API requests and user interactions
 * Provides structured logging with different levels and contexts
 */

export interface LogContext {
  userId?: string;
  sessionId?: string;
  userAgent?: string;
  timestamp?: string;
  [key: string]: any;
}

export interface ApiLogData {
  method: string;
  endpoint: string;
  payload?: any;
  response?: any;
  error?: any;
  duration?: number;
  statusCode?: number;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;
  private logLevel = import.meta.env.VITE_LOG_LEVEL || 'info';

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private getUserAgent(): string {
    return navigator.userAgent;
  }

  private shouldLog(level: string): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const requestedLevelIndex = levels.indexOf(level);
    return requestedLevelIndex >= currentLevelIndex;
  }

  private formatLog(level: string, message: string, context?: LogContext, data?: any) {
    const logEntry = {
      timestamp: this.getTimestamp(),
      level: level.toUpperCase(),
      message,
      userAgent: this.getUserAgent(),
      url: window.location.href,
      ...context,
      ...(data && { data })
    };

    return logEntry;
  }

  private sendLog(logEntry: any) {
    // In development, log to console
    if (this.isDevelopment) {
      const { level, message, ...rest } = logEntry;
      console.group(`[${level}] ${message}`);
      console.log('Details:', rest);
      console.groupEnd();
    }

    // In production, you can send to your logging service
    // Example: Send to your backend logging endpoint
    if (!this.isDevelopment) {
      // Uncomment and configure for your logging service
      // fetch('/api/logs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(logEntry)
      // }).catch(console.error);
    }
  }

  debug(message: string, context?: LogContext, data?: any) {
    if (!this.shouldLog('debug')) return;
    const logEntry = this.formatLog('debug', message, context, data);
    this.sendLog(logEntry);
  }

  info(message: string, context?: LogContext, data?: any) {
    if (!this.shouldLog('info')) return;
    const logEntry = this.formatLog('info', message, context, data);
    this.sendLog(logEntry);
  }

  warn(message: string, context?: LogContext, data?: any) {
    if (!this.shouldLog('warn')) return;
    const logEntry = this.formatLog('warn', message, context, data);
    this.sendLog(logEntry);
  }

  error(message: string, context?: LogContext, data?: any) {
    if (!this.shouldLog('error')) return;
    const logEntry = this.formatLog('error', message, context, data);
    this.sendLog(logEntry);
  }

  // Specialized method for API request logging
  apiRequest(message: string, apiData: ApiLogData, context?: LogContext) {
    const logEntry = this.formatLog('info', message, context, {
      api: apiData,
      type: 'API_REQUEST'
    });
    this.sendLog(logEntry);
  }

  // Specialized method for user interaction logging
  userAction(action: string, context?: LogContext, data?: any) {
    const logEntry = this.formatLog('info', `User Action: ${action}`, context, {
      ...data,
      type: 'USER_ACTION'
    });
    this.sendLog(logEntry);
  }

  // Method to track user journey stages
  stageTransition(fromStage: string, toStage: string, context?: LogContext) {
    const logEntry = this.formatLog('info', `Stage Transition: ${fromStage} → ${toStage}`, context, {
      fromStage,
      toStage,
      type: 'STAGE_TRANSITION'
    });
    this.sendLog(logEntry);
  }
}

// Export singleton instance
export const logger = new Logger();

// Export the class for custom instances
export default Logger;