/**
 * Part Printer - Error Handling System
 * 
 * Centralized error management for Part Printer tool.
 * Provides type-safe error handling with blocking and warning severities.
 * 
 * @module part-printer/types/error
 */

/**
 * Error severity levels
 * - blocking: Stops the process, user must fix the issue
 * - warning: Continues with degraded functionality or default values
 * - info: Informational message, no impact on process
 */
export enum ErrorSeverity {
  BLOCKING = 'blocking',
  WARNING = 'warning',
  INFO = 'info',
}

/**
 * Action to take when error occurs
 * - stop: Stop processing immediately
 * - continue: Continue with warning/default value
 * - default: Use default value and continue
 */
export enum ErrorAction {
  STOP = 'stop',
  CONTINUE = 'continue',
  DEFAULT = 'default',
}

/**
 * Part Printer Error Codes
 * 
 * Format: PP_[E|W][XXX]
 * - E = Error (blocking)
 * - W = Warning (continue)
 * - XXX = Sequential number
 */
export enum ErrorCode {
  // 🛑 BLOCKING ERRORS
  
  /** No sites (contracts) could be retrieved from IFS */
  NO_SITES = 'PP_E001',
  
  /** No shop orders found matching the selected filters */
  NO_SHOP_ORDERS = 'PP_E002',
  
  /** Raw Material not found for a shop order operation */
  NO_RAW_MATERIAL = 'PP_E003',
  
  /** Generic Code attribute missing for a part */
  NO_GENERIC_CODE = 'PP_E004',
  
  /** Length Setup attribute missing for a part */
  NO_LENGTH_SETUP = 'PP_E005',
  
  /** Azure Print API failed to print labels */
  AZURE_PRINT_FAILED = 'PP_E006',
  
  // ⚠️ WARNING ERRORS (Continue with degradation)
  
  /** No ranges found for the selected site */
  NO_RANGES = 'PP_W001',
  
  /** No production lines found for the selected site */
  NO_PRODUCTION_LINES = 'PP_W002',
  
  /** No logical printers found (forces list-only mode) */
  NO_PRINTERS = 'PP_W003',
  
  /** Varnish Code attribute missing (uses default "N/A") */
  NO_VARNISH_CODE = 'PP_W004',
}

/**
 * Part Printer Error Details
 */
export interface PartPrinterError {
  /** Error code (e.g., PP_E001) */
  code: ErrorCode
  
  /** Severity level */
  severity: ErrorSeverity
  
  /** Human-readable error message */
  message: string
  
  /** Additional context (orderNo, partNo, filters, etc.) */
  details?: Record<string, any>
  
  /** Action to take */
  action: ErrorAction
  
  /** Timestamp when error occurred */
  timestamp?: Date
  
  /** Stack trace (for debugging) */
  stack?: string
}

/**
 * Error message templates
 * Maps error codes to user-friendly messages
 */
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  // Blocking errors
  [ErrorCode.NO_SITES]: 
    'No Site data could be retrieved. Unable to load available sites from IFS. Please contact support.',
  
  [ErrorCode.NO_SHOP_ORDERS]: 
    'No Shop Orders found. No shop orders match the selected filters. Please adjust your criteria and try again.',
  
  [ErrorCode.NO_RAW_MATERIAL]: 
    'Missing Raw Material data. No raw material information found for shop order {orderNo}. This is required for label generation.',
  
  [ErrorCode.NO_GENERIC_CODE]: 
    'Missing Generic Code. This attribute is mandatory for label generation. Please configure it in IFS.',
  
  [ErrorCode.NO_LENGTH_SETUP]: 
    'Missing Length Setup. This attribute is mandatory for label sorting. Please configure it in IFS.',
  
  [ErrorCode.AZURE_PRINT_FAILED]: 
    'Azure Print API failed. Unable to print labels to IFS. Error: {error}',
  
  // Warning errors
  [ErrorCode.NO_RANGES]: 
    'No Range data available for this site. The application will continue without Range filtering.',
  
  [ErrorCode.NO_PRODUCTION_LINES]: 
    'No Production Line data could be retrieved. No production lines found for the selected site. You can continue without this filter.',
  
  [ErrorCode.NO_PRINTERS]: 
    'No logical printers could be retrieved. Printer selection unavailable. Only list generation will be possible.',
  
  [ErrorCode.NO_VARNISH_CODE]: 
    'No Varnish Code found for the part. Default value "N/A" will be used.',
}

/**
 * Error configuration mapping
 * Defines severity and action for each error code
 */
export const ERROR_CONFIG: Record<ErrorCode, { severity: ErrorSeverity; action: ErrorAction }> = {
  // Blocking errors
  [ErrorCode.NO_SITES]: { 
    severity: ErrorSeverity.BLOCKING, 
    action: ErrorAction.STOP 
  },
  [ErrorCode.NO_SHOP_ORDERS]: { 
    severity: ErrorSeverity.BLOCKING, 
    action: ErrorAction.STOP 
  },
  [ErrorCode.NO_RAW_MATERIAL]: { 
    severity: ErrorSeverity.BLOCKING, 
    action: ErrorAction.STOP 
  },
  [ErrorCode.NO_GENERIC_CODE]: { 
    severity: ErrorSeverity.BLOCKING, 
    action: ErrorAction.STOP 
  },
  [ErrorCode.NO_LENGTH_SETUP]: { 
    severity: ErrorSeverity.BLOCKING, 
    action: ErrorAction.STOP 
  },
  [ErrorCode.AZURE_PRINT_FAILED]: { 
    severity: ErrorSeverity.BLOCKING, 
    action: ErrorAction.STOP 
  },
  
  // Warning errors
  [ErrorCode.NO_RANGES]: { 
    severity: ErrorSeverity.WARNING, 
    action: ErrorAction.CONTINUE 
  },
  [ErrorCode.NO_PRODUCTION_LINES]: { 
    severity: ErrorSeverity.WARNING, 
    action: ErrorAction.CONTINUE 
  },
  [ErrorCode.NO_PRINTERS]: { 
    severity: ErrorSeverity.WARNING, 
    action: ErrorAction.CONTINUE 
  },
  [ErrorCode.NO_VARNISH_CODE]: { 
    severity: ErrorSeverity.WARNING, 
    action: ErrorAction.DEFAULT 
  },
}

/**
 * Helper to check if an error is blocking
 */
export function isBlockingError(code: ErrorCode): boolean {
  return ERROR_CONFIG[code].severity === ErrorSeverity.BLOCKING
}

/**
 * Helper to check if processing should stop
 */
export function shouldStopProcessing(code: ErrorCode): boolean {
  return ERROR_CONFIG[code].action === ErrorAction.STOP
}

/**
 * Create a Part Printer Error
 */
export function createError(
  code: ErrorCode,
  details?: Record<string, any>,
  customMessage?: string
): PartPrinterError {
  const config = ERROR_CONFIG[code]
  
  return {
    code,
    severity: config.severity,
    message: customMessage || ERROR_MESSAGES[code],
    details,
    action: config.action,
    timestamp: new Date(),
  }
}

/**
 * Type guard to check if value is a PartPrinterError
 */
export function isPartPrinterError(value: unknown): value is PartPrinterError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'code' in value &&
    'severity' in value &&
    'message' in value &&
    'action' in value
  )
}
