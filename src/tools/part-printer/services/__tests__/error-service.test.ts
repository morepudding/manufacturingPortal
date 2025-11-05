/**
 * Part Printer - Error Service Tests
 * 
 * Unit tests for the error handling service
 */

import { describe, it, expect, beforeEach } from 'vitest'
import {
  ErrorService,
  getErrorService,
  resetErrorService,
} from '../error-service'
import {
  ErrorCode,
  ErrorSeverity,
  ErrorAction,
  createError,
} from '../../types/error'

describe('ErrorService', () => {
  let errorService: ErrorService

  beforeEach(() => {
    // Reset singleton before each test
    resetErrorService()
    errorService = getErrorService()
  })

  describe('createError', () => {
    it('should create a blocking error with correct config', () => {
      const error = errorService.createError(ErrorCode.NO_SITES)
      
      expect(error.code).toBe(ErrorCode.NO_SITES)
      expect(error.severity).toBe(ErrorSeverity.BLOCKING)
      expect(error.action).toBe(ErrorAction.STOP)
      expect(error.message).toBeTruthy()
      expect(error.timestamp).toBeInstanceOf(Date)
    })

    it('should create a warning error with correct config', () => {
      const error = errorService.createError(ErrorCode.NO_RANGES)
      
      expect(error.code).toBe(ErrorCode.NO_RANGES)
      expect(error.severity).toBe(ErrorSeverity.WARNING)
      expect(error.action).toBe(ErrorAction.CONTINUE)
    })

    it('should include details when provided', () => {
      const details = { site: 'BDR', date: '2025-10-30' }
      const error = errorService.createError(ErrorCode.NO_SHOP_ORDERS, details)
      
      expect(error.details).toEqual(details)
    })

    it('should use custom message when provided', () => {
      const customMessage = 'Custom error message'
      const error = errorService.createError(
        ErrorCode.NO_SITES,
        undefined,
        customMessage
      )
      
      expect(error.message).toBe(customMessage)
    })
  })

  describe('handleError', () => {
    it('should return true for blocking errors', () => {
      const error = createError(ErrorCode.NO_SITES)
      const shouldStop = errorService.handleError(error)
      
      expect(shouldStop).toBe(true)
    })

    it('should return false for warning errors', () => {
      const error = createError(ErrorCode.NO_RANGES)
      const shouldStop = errorService.handleError(error)
      
      expect(shouldStop).toBe(false)
    })

    it('should add error to history', () => {
      const error = createError(ErrorCode.NO_SITES)
      errorService.handleError(error)
      
      const history = errorService.getErrorHistory()
      expect(history).toHaveLength(1)
      expect(history[0]).toEqual(error)
    })
  })

  describe('getErrorMessage', () => {
    it('should return predefined message for error code', () => {
      const message = errorService.getErrorMessage(ErrorCode.NO_SITES)
      
      expect(message).toBeTruthy()
      expect(message).toContain('Site')
    })

    it('should inject details into message', () => {
      const details = { orderNo: '12345' }
      const message = errorService.getErrorMessage(
        ErrorCode.NO_RAW_MATERIAL,
        details
      )
      
      expect(message).toContain('12345')
    })
  })

  describe('shouldStopProcessing', () => {
    it('should return true for blocking errors', () => {
      const error = createError(ErrorCode.NO_SITES)
      
      expect(errorService.shouldStopProcessing(error)).toBe(true)
    })

    it('should return false for warnings', () => {
      const error = createError(ErrorCode.NO_PRINTERS)
      
      expect(errorService.shouldStopProcessing(error)).toBe(false)
    })
  })

  describe('isBlockingError', () => {
    it('should return true for blocking error codes', () => {
      expect(errorService.isBlockingError(ErrorCode.NO_SITES)).toBe(true)
      expect(errorService.isBlockingError(ErrorCode.NO_SHOP_ORDERS)).toBe(true)
      expect(errorService.isBlockingError(ErrorCode.NO_GENERIC_CODE)).toBe(true)
    })

    it('should return false for warning error codes', () => {
      expect(errorService.isBlockingError(ErrorCode.NO_RANGES)).toBe(false)
      expect(errorService.isBlockingError(ErrorCode.NO_PRINTERS)).toBe(false)
    })
  })

  describe('error history', () => {
    it('should track error history', () => {
      const error1 = createError(ErrorCode.NO_SITES)
      const error2 = createError(ErrorCode.NO_RANGES)
      
      errorService.handleError(error1)
      errorService.handleError(error2)
      
      const history = errorService.getErrorHistory()
      expect(history).toHaveLength(2)
    })

    it('should limit history size to maxHistorySize', () => {
      // Add more than max (100) errors
      for (let i = 0; i < 150; i++) {
        const error = createError(ErrorCode.NO_SITES)
        errorService.handleError(error)
      }
      
      const history = errorService.getErrorHistory()
      expect(history.length).toBeLessThanOrEqual(100)
    })

    it('should get limited history', () => {
      for (let i = 0; i < 10; i++) {
        errorService.handleError(createError(ErrorCode.NO_SITES))
      }
      
      const history = errorService.getErrorHistory(5)
      expect(history).toHaveLength(5)
    })

    it('should clear history', () => {
      errorService.handleError(createError(ErrorCode.NO_SITES))
      expect(errorService.getErrorHistory()).toHaveLength(1)
      
      errorService.clearHistory()
      expect(errorService.getErrorHistory()).toHaveLength(0)
    })
  })

  describe('getBlockingErrors', () => {
    it('should return only blocking errors', () => {
      errorService.handleError(createError(ErrorCode.NO_SITES))
      errorService.handleError(createError(ErrorCode.NO_RANGES))
      errorService.handleError(createError(ErrorCode.NO_SHOP_ORDERS))
      
      const blockingErrors = errorService.getBlockingErrors()
      expect(blockingErrors).toHaveLength(2)
      expect(blockingErrors.every(e => e.severity === ErrorSeverity.BLOCKING)).toBe(true)
    })
  })

  describe('getWarningErrors', () => {
    it('should return only warning errors', () => {
      errorService.handleError(createError(ErrorCode.NO_SITES))
      errorService.handleError(createError(ErrorCode.NO_RANGES))
      errorService.handleError(createError(ErrorCode.NO_PRINTERS))
      
      const warningErrors = errorService.getWarningErrors()
      expect(warningErrors).toHaveLength(2)
      expect(warningErrors.every(e => e.severity === ErrorSeverity.WARNING)).toBe(true)
    })
  })

  describe('getErrorsByCode', () => {
    it('should filter errors by code', () => {
      errorService.handleError(createError(ErrorCode.NO_SITES))
      errorService.handleError(createError(ErrorCode.NO_SITES))
      errorService.handleError(createError(ErrorCode.NO_RANGES))
      
      const siteErrors = errorService.getErrorsByCode(ErrorCode.NO_SITES)
      expect(siteErrors).toHaveLength(2)
      expect(siteErrors.every(e => e.code === ErrorCode.NO_SITES)).toBe(true)
    })
  })

  describe('hasError', () => {
    it('should return true if error occurred', () => {
      errorService.handleError(createError(ErrorCode.NO_SITES))
      
      expect(errorService.hasError(ErrorCode.NO_SITES)).toBe(true)
    })

    it('should return false if error did not occur', () => {
      expect(errorService.hasError(ErrorCode.NO_SITES)).toBe(false)
    })
  })

  describe('getErrorStats', () => {
    it('should return correct statistics', () => {
      errorService.handleError(createError(ErrorCode.NO_SITES))
      errorService.handleError(createError(ErrorCode.NO_SHOP_ORDERS))
      errorService.handleError(createError(ErrorCode.NO_RANGES))
      errorService.handleError(createError(ErrorCode.NO_PRINTERS))
      
      const stats = errorService.getErrorStats()
      
      expect(stats.total).toBe(4)
      expect(stats.blocking).toBe(2)
      expect(stats.warning).toBe(2)
      expect(stats.byCodes[ErrorCode.NO_SITES]).toBe(1)
      expect(stats.byCodes[ErrorCode.NO_RANGES]).toBe(1)
    })
  })

  describe('formatErrorDetails', () => {
    it('should format error for display', () => {
      const error = createError(ErrorCode.NO_SITES, { site: 'BDR' })
      const formatted = errorService.formatErrorDetails(error)
      
      expect(formatted.title).toContain(ErrorCode.NO_SITES)
      expect(formatted.message).toBe(error.message)
      expect(formatted.severity).toBe('BLOCKING')
      expect(formatted.details).toBeTruthy()
      expect(formatted.timestamp).toBeTruthy()
    })
  })

  describe('exportErrorsToCsv', () => {
    it('should export errors to CSV format', () => {
      const errors = [
        createError(ErrorCode.NO_SITES, { site: 'BDR' }),
        createError(ErrorCode.NO_RANGES, { site: 'BDR' }),
      ]
      
      const csv = errorService.exportErrorsToCsv(errors, ['site'])
      
      expect(csv).toContain('Timestamp,Code,Severity,Message,site')
      expect(csv).toContain(ErrorCode.NO_SITES)
      expect(csv).toContain(ErrorCode.NO_RANGES)
      expect(csv).toContain('BDR')
    })

    it('should handle errors without additional fields', () => {
      const errors = [createError(ErrorCode.NO_SITES)]
      
      const csv = errorService.exportErrorsToCsv(errors)
      
      expect(csv).toContain('Timestamp,Code,Severity,Message')
      expect(csv.split('\n')).toHaveLength(2) // header + 1 row
    })
  })

  describe('singleton pattern', () => {
    it('should return same instance', () => {
      const instance1 = getErrorService()
      const instance2 = getErrorService()
      
      expect(instance1).toBe(instance2)
    })

    it('should share state across instances', () => {
      const instance1 = getErrorService()
      instance1.handleError(createError(ErrorCode.NO_SITES))
      
      const instance2 = getErrorService()
      expect(instance2.getErrorHistory()).toHaveLength(1)
    })

    it('should reset instance', () => {
      const instance1 = getErrorService()
      instance1.handleError(createError(ErrorCode.NO_SITES))
      
      resetErrorService()
      
      const instance2 = getErrorService()
      expect(instance2.getErrorHistory()).toHaveLength(0)
    })
  })
})
