/**
 * Composant PrintModeSelector
 * 
 * Step 7 - Sélection du mode d'impression
 * 
 * Permet de choisir entre 3 modes:
 * 1. Listing only - Générer le PDF listing uniquement
 * 2. Labels only - Imprimer les étiquettes uniquement (via IFS)
 * 3. Listing + Labels - Les deux
 * 
 * @example
 * ```tsx
 * <PrintModeSelector 
 *   value={printMode}
 *   onChange={setPrintMode}
 *   disabled={loading}
 * />
 * ```
 */

'use client'

import type { PrintMode } from '@/tools/part-printer/types'
import { FileText, Tag, ListChecks } from 'lucide-react'

interface PrintModeSelectorProps {
  value: PrintMode
  onChange: (mode: PrintMode) => void
  disabled?: boolean
}

export function PrintModeSelector({ value, onChange, disabled }: PrintModeSelectorProps) {
  const modes: { value: PrintMode; label: string; description: string; icon: React.ReactNode }[] = [
    {
      value: 'listing-only',
      label: 'Listing Only',
      description: 'Generate PDF listing for local printing',
      icon: <FileText className="w-5 h-5" />
    },
    {
      value: 'labels-only',
      label: 'Labels Only',
      description: 'Print labels directly to IFS printer',
      icon: <Tag className="w-5 h-5" />
    },
    {
      value: 'listing-and-labels',
      label: 'Listing + Labels',
      description: 'Generate listing PDF and print labels',
      icon: <ListChecks className="w-5 h-5" />
    }
  ]

  return (
    <div className="space-y-3">
      {modes.map((mode) => (
        <label
          key={mode.value}
          className={`
            flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-50 hover:border-amber-300'}
            ${value === mode.value 
              ? 'border-amber-500 bg-amber-50 shadow-md' 
              : 'border-gray-200 bg-white'
            }
          `}
        >
          <input
            type="radio"
            name="printMode"
            value={mode.value}
            checked={value === mode.value}
            onChange={(e) => onChange(e.target.value as PrintMode)}
            disabled={disabled}
            className="mt-1 w-4 h-4 text-amber-600 focus:ring-amber-500"
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className={`${value === mode.value ? 'text-amber-600' : 'text-gray-500'}`}>
                {mode.icon}
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {mode.label}
              </span>
            </div>
            <p className="text-xs text-gray-600">
              {mode.description}
            </p>
          </div>

          {/* Badge "Selected" */}
          {value === mode.value && (
            <span className="px-2 py-1 bg-amber-600 text-white text-xs font-bold rounded-full">
              Selected
            </span>
          )}
        </label>
      ))}
    </div>
  )
}
