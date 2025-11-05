'use client'

/**
 * Part Printer - Error Dialog Component
 * 
 * Modal dialog for displaying blocking errors.
 * Forces user to acknowledge the error before proceeding.
 */

import React from 'react'
import { Button } from '@/shared/components/atoms/Button'
import { PartPrinterError } from '@/tools/part-printer/types/error'

interface ErrorDialogProps {
  /** The error to display */
  error: PartPrinterError | null
  
  /** Whether dialog is open */
  open: boolean
  
  /** Callback when user closes dialog */
  onClose: () => void
  
  /** Optional action button text */
  actionText?: string
  
  /** Show technical details */
  showDetails?: boolean
}

export function ErrorDialog({
  error,
  open,
  onClose,
  actionText = 'OK',
  showDetails = false,
}: ErrorDialogProps) {
  if (!error || !open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold text-lg">
            <span className="text-2xl">🛑</span>
            <span>Error {error.code}</span>
          </div>
          
          {/* Main error message */}
          <div className="text-base text-gray-900 dark:text-gray-100 font-medium">
            {error.message}
          </div>
        </div>

        {/* Details section */}
        {error.details && Object.keys(error.details).length > 0 && (
          <div className="space-y-2">
            <div className="font-semibold text-sm text-gray-600 dark:text-gray-400">
              Details:
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm space-y-1">
              {Object.entries(error.details).map(([key, value]) => (
                <div key={key} className="flex gap-2">
                  <span className="font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical details (collapsed by default) */}
        {showDetails && (
          <details className="text-xs">
            <summary className="cursor-pointer font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              Technical Details
            </summary>
            <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-3 rounded-md overflow-x-auto">
              {JSON.stringify(error, null, 2)}
            </pre>
          </details>
        )}

        {/* Timestamp */}
        {error.timestamp && (
          <div className="text-xs text-gray-500 dark:text-gray-500">
            {error.timestamp.toLocaleString()}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-4">
          <Button onClick={onClose} variant="default">
            {actionText}
          </Button>
        </div>
      </div>
    </div>
  )
}
