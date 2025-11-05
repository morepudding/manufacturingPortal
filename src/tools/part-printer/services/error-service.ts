/**
 * Part Printer - Error Service
 * 
 * Centralized service for handling errors in Part Printer tool.
 * Provides logging, error formatting, and decision logic.
 * 
 * @module part-printer/services/error-service
 */

import {
  PartPrinterError,
  ErrorCode,
  ErrorSeverity,
  ErrorAction,
  ERROR_MESSAGES,
  ERROR_CONFIG,
  createError,
  isBlockingError,
  shouldStopProcessing as shouldStop,
} from '../types/error'

/**
 * Error Service Class
 * Manages error handling, logging, and user notifications
 */
export class ErrorService {
  private errorHistory: PartPrinterError[] = []
  private maxHistorySize = 100

  /**
   * Handle an error and determine the appropriate action
   * 
   * @param error - The Part Printer error to handle
   * @returns Whether to stop processing
   */
  handleError(error: PartPrinterError): boolean {
    // Log the error
    this.logError(error)
    
    // Add to history
    this.addToHistory(error)
    
    // Determine if should stop
    return this.shouldStopProcessing(error)
  }

  /**
   * Get error message for a specific error code
   * 
   * @param code - Error code
   * @param details - Optional context details to inject into message
   * @returns Formatted error message
   */
  getErrorMessage(code: ErrorCode, details?: Record<string, any>): string {
    let message = ERROR_MESSAGES[code]
    
    // Inject details into message if provided
    if (details) {
      Object.keys(details).forEach((key) => {
        const placeholder = `{${key}}`
        if (message.includes(placeholder)) {
          message = message.replace(placeholder, String(details[key]))
        }
      })
    }
    
    return message
  }

  /**
   * Log an error with appropriate severity
   * 
   * @param error - The error to log
   */
  logError(error: PartPrinterError): void {
    const prefix = this.getLogPrefix(error.severity)
    const timestamp = error.timestamp?.toISOString() || new Date().toISOString()
    
    const logMessage = `${prefix} [${error.code}] ${error.message}`
    
    switch (error.severity) {
      case ErrorSeverity.BLOCKING:
        console.error(logMessage, {
          code: error.code,
          details: error.details,
          timestamp,
          stack: error.stack,
        })
        break
      
      case ErrorSeverity.WARNING:
        console.warn(logMessage, {
          code: error.code,
          details: error.details,
          timestamp,
        })
        break
      
      case ErrorSeverity.INFO:
        console.info(logMessage, {
          code: error.code,
          details: error.details,
          timestamp,
        })
        break
    }
  }

  /**
   * Check if processing should stop based on error
   * 
   * @param error - The error to check
   * @returns True if should stop processing
   */
  shouldStopProcessing(error: PartPrinterError): boolean {
    return shouldStop(error.code)
  }

  /**
   * Check if an error code is blocking
   * 
   * @param code - Error code to check
   * @returns True if blocking
   */
  isBlockingError(code: ErrorCode): boolean {
    return isBlockingError(code)
  }

  /**
   * Create a new error with proper configuration
   * 
   * @param code - Error code
   * @param details - Optional context details
   * @param customMessage - Optional custom message
   * @returns Configured PartPrinterError
   */
  createError(
    code: ErrorCode,
    details?: Record<string, any>,
    customMessage?: string
  ): PartPrinterError {
    return createError(code, details, customMessage)
  }

  /**
   * Get error history
   * 
   * @param limit - Optional limit on number of errors to return
   * @returns Array of recent errors
   */
  getErrorHistory(limit?: number): PartPrinterError[] {
    if (limit) {
      return this.errorHistory.slice(-limit)
    }
    return [...this.errorHistory]
  }

  /**
   * Get blocking errors from history
   * 
   * @returns Array of blocking errors
   */
  getBlockingErrors(): PartPrinterError[] {
    return this.errorHistory.filter(
      (error) => error.severity === ErrorSeverity.BLOCKING
    )
  }

  /**
   * Get warning errors from history
   * 
   * @returns Array of warning errors
   */
  getWarningErrors(): PartPrinterError[] {
    return this.errorHistory.filter(
      (error) => error.severity === ErrorSeverity.WARNING
    )
  }

  /**
   * Clear error history
   */
  clearHistory(): void {
    this.errorHistory = []
  }

  /**
   * Get errors by code
   * 
   * @param code - Error code to filter by
   * @returns Array of errors with the given code
   */
  getErrorsByCode(code: ErrorCode): PartPrinterError[] {
    return this.errorHistory.filter((error) => error.code === code)
  }

  /**
   * Check if a specific error has occurred
   * 
   * @param code - Error code to check
   * @returns True if error has occurred
   */
  hasError(code: ErrorCode): boolean {
    return this.errorHistory.some((error) => error.code === code)
  }

  /**
   * Get error statistics
   * 
   * @returns Statistics about errors
   */
  getErrorStats(): {
    total: number
    blocking: number
    warning: number
    info: number
    byCodes: Record<ErrorCode, number>
  } {
    const stats = {
      total: this.errorHistory.length,
      blocking: 0,
      warning: 0,
      info: 0,
      byCodes: {} as Record<ErrorCode, number>,
    }

    this.errorHistory.forEach((error) => {
      // Count by severity
      switch (error.severity) {
        case ErrorSeverity.BLOCKING:
          stats.blocking++
          break
        case ErrorSeverity.WARNING:
          stats.warning++
          break
        case ErrorSeverity.INFO:
          stats.info++
          break
      }

      // Count by code
      stats.byCodes[error.code] = (stats.byCodes[error.code] || 0) + 1
    })

    return stats
  }

  /**
   * Format error details for display
   * 
   * @param error - Error to format
   * @returns Formatted details object
   */
  formatErrorDetails(error: PartPrinterError): {
    title: string
    message: string
    severity: string
    details?: string
    timestamp: string
  } {
    return {
      title: `Error ${error.code}`,
      message: error.message,
      severity: error.severity.toUpperCase(),
      details: error.details ? JSON.stringify(error.details, null, 2) : undefined,
      timestamp: error.timestamp?.toLocaleString() || new Date().toLocaleString(),
    }
  }

  /**
   * Export errors to CSV format (for missing parts, etc.)
   * 
   * @param errors - Errors to export
   * @param additionalFields - Additional fields to include
   * @returns CSV string
   */
  exportErrorsToCsv(
    errors: PartPrinterError[],
    additionalFields?: string[]
  ): string {
    const headers = [
      'Timestamp',
      'Code',
      'Severity',
      'Message',
      ...(additionalFields || []),
    ]

    const rows = errors.map((error) => {
      const row = [
        error.timestamp?.toISOString() || '',
        error.code,
        error.severity,
        error.message,
      ]

      // Add additional fields from details
      if (additionalFields && error.details) {
        additionalFields.forEach((field) => {
          row.push(error.details?.[field] || '')
        })
      }

      return row
    })

    return [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n')
  }

  // Private helper methods

  private addToHistory(error: PartPrinterError): void {
    this.errorHistory.push(error)
    
    // Maintain max history size
    if (this.errorHistory.length > this.maxHistorySize) {
      this.errorHistory.shift()
    }
  }

  private getLogPrefix(severity: ErrorSeverity): string {
    switch (severity) {
      case ErrorSeverity.BLOCKING:
        return '🛑 [BLOCKING]'
      case ErrorSeverity.WARNING:
        return '⚠️ [WARNING]'
      case ErrorSeverity.INFO:
        return 'ℹ️ [INFO]'
      default:
        return '[UNKNOWN]'
    }
  }
}

// Singleton instance
let errorServiceInstance: ErrorService | null = null

/**
 * Get the singleton ErrorService instance
 * 
 * @returns ErrorService instance
 */
export function getErrorService(): ErrorService {
  if (!errorServiceInstance) {
    errorServiceInstance = new ErrorService()
  }
  return errorServiceInstance
}

/**
 * Reset the singleton instance (useful for testing)
 */
export function resetErrorService(): void {
  errorServiceInstance = null
}

// Export default instance
export default getErrorService()
