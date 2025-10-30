'use client'

/**
 * Part Printer - Warning Toast Component
 * 
 * Toast notification for displaying warning messages.
 * Non-blocking, auto-dismisses after a few seconds.
 */

import React, { useEffect } from 'react'
import { PartPrinterError } from '@/tools/part-printer/types/error'

interface WarningToastProps {
  /** The warning error to display */
  error: PartPrinterError | null
  
  /** Whether toast is visible */
  visible: boolean
  
  /** Callback when toast is dismissed */
  onDismiss: () => void
  
  /** Auto-dismiss duration in ms (default: 5000) */
  duration?: number
}

export function WarningToast({
  error,
  visible,
  onDismiss,
  duration = 5000,
}: WarningToastProps) {
  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        onDismiss()
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [visible, duration, onDismiss])

  if (!error || !visible) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 rounded-r-lg shadow-lg max-w-md p-4 space-y-2">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <div className="font-semibold text-yellow-800 dark:text-yellow-200 text-sm">
              Warning {error.code}
            </div>
          </div>
          
          {/* Close button */}
          <button
            onClick={onDismiss}
            className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200 transition-colors"
            aria-label="Dismiss"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Message */}
        <div className="text-sm text-yellow-800 dark:text-yellow-100 ml-7">
          {error.message}
        </div>

        {/* Details (if any) */}
        {error.details && Object.keys(error.details).length > 0 && (
          <div className="ml-7 text-xs text-yellow-700 dark:text-yellow-300 space-y-1">
            {Object.entries(error.details).map(([key, value]) => (
              <div key={key}>
                <span className="font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </span>{' '}
                <span>{String(value)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Progress bar */}
        {duration > 0 && (
          <div className="h-1 bg-yellow-200 dark:bg-yellow-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 dark:bg-yellow-600 animate-shrink-width"
              style={{
                animationDuration: `${duration}ms`,
                animationTimingFunction: 'linear',
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

// Add this to your global CSS for the progress bar animation
// @keyframes shrink-width {
//   from { width: 100%; }
//   to { width: 0%; }
// }
