'use client'

/**
 * Part Printer - Error Summary Component
 * 
 * Displays a summary list of all errors encountered during a process.
 * Useful for showing validation results or missing attributes.
 */

import React from 'react'
import { PartPrinterError, ErrorSeverity } from '@/tools/part-printer/types/error'
import { Button } from '@/shared/components/atoms/Button'

interface ErrorSummaryProps {
  /** List of errors to display */
  errors: PartPrinterError[]
  
  /** Title of the summary */
  title?: string
  
  /** Optional action button text */
  actionText?: string
  
  /** Optional action button callback */
  onAction?: () => void
  
  /** Show export CSV button */
  showExport?: boolean
  
  /** CSV export callback */
  onExport?: () => void
}

export function ErrorSummary({
  errors,
  title = 'Errors Encountered',
  actionText,
  onAction,
  showExport = false,
  onExport,
}: ErrorSummaryProps) {
  if (errors.length === 0) return null

  // Group errors by severity
  const blockingErrors = errors.filter(e => e.severity === ErrorSeverity.BLOCKING)
  const warningErrors = errors.filter(e => e.severity === ErrorSeverity.WARNING)
  const infoErrors = errors.filter(e => e.severity === ErrorSeverity.INFO)

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          {showExport && onExport && (
            <Button
              onClick={onExport}
              variant="outline"
              size="sm"
            >
              📥 Export CSV
            </Button>
          )}
          {actionText && onAction && (
            <Button
              onClick={onAction}
              variant="default"
              size="sm"
            >
              {actionText}
            </Button>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-gray-600 dark:text-gray-400">Total:</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {errors.length}
          </span>
        </div>
        {blockingErrors.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-red-600 dark:text-red-400">🛑 Blocking:</span>
            <span className="font-semibold text-red-600 dark:text-red-400">
              {blockingErrors.length}
            </span>
          </div>
        )}
        {warningErrors.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-yellow-600 dark:text-yellow-400">⚠️ Warnings:</span>
            <span className="font-semibold text-yellow-600 dark:text-yellow-400">
              {warningErrors.length}
            </span>
          </div>
        )}
      </div>

      {/* Error lists */}
      <div className="space-y-4">
        {/* Blocking Errors */}
        {blockingErrors.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-red-600 dark:text-red-400 text-sm">
              🛑 Blocking Errors
            </h4>
            <div className="space-y-2">
              {blockingErrors.map((error, index) => (
                <ErrorItem key={`blocking-${index}`} error={error} />
              ))}
            </div>
          </div>
        )}

        {/* Warning Errors */}
        {warningErrors.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-yellow-600 dark:text-yellow-400 text-sm">
              ⚠️ Warnings
            </h4>
            <div className="space-y-2">
              {warningErrors.map((error, index) => (
                <ErrorItem key={`warning-${index}`} error={error} />
              ))}
            </div>
          </div>
        )}

        {/* Info Errors */}
        {infoErrors.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-blue-600 dark:text-blue-400 text-sm">
              ℹ️ Information
            </h4>
            <div className="space-y-2">
              {infoErrors.map((error, index) => (
                <ErrorItem key={`info-${index}`} error={error} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Individual error item component
 */
function ErrorItem({ error }: { error: PartPrinterError }) {
  const [expanded, setExpanded] = React.useState(false)

  const bgColor = {
    [ErrorSeverity.BLOCKING]: 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800',
    [ErrorSeverity.WARNING]: 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800',
    [ErrorSeverity.INFO]: 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800',
  }

  const textColor = {
    [ErrorSeverity.BLOCKING]: 'text-red-900 dark:text-red-100',
    [ErrorSeverity.WARNING]: 'text-yellow-900 dark:text-yellow-100',
    [ErrorSeverity.INFO]: 'text-blue-900 dark:text-blue-100',
  }

  return (
    <div className={`border rounded-md p-3 space-y-2 ${bgColor[error.severity]}`}>
      {/* Error code and message */}
      <div className="flex items-start justify-between gap-2">
        <div className={`text-sm space-y-1 flex-1 ${textColor[error.severity]}`}>
          <div className="font-semibold">{error.code}</div>
          <div>{error.message}</div>
        </div>
        
        {/* Expand button if details exist */}
        {error.details && Object.keys(error.details).length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            {expanded ? '▼' : '▶'}
          </button>
        )}
      </div>

      {/* Details (expandable) */}
      {expanded && error.details && (
        <div className="text-xs space-y-1 pl-4 border-l-2 border-gray-300 dark:border-gray-600">
          {Object.entries(error.details).map(([key, value]) => (
            <div key={key} className="text-gray-700 dark:text-gray-300">
              <span className="font-medium capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </span>{' '}
              <span>{String(value)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Timestamp */}
      {error.timestamp && (
        <div className="text-xs text-gray-500 dark:text-gray-500">
          {error.timestamp.toLocaleString()}
        </div>
      )}
    </div>
  )
}
