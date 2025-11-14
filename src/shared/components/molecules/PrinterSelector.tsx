/**
 * Composant PrinterSelector (Shared)
 * 
 * Sélecteur d'imprimante IFS réutilisable
 * Récupère la liste des imprimantes via /api/shared/printers
 * 
 * Utilisé par :
 * - Part Printer (Step 7 - Labels printing)
 * - Futurs outils nécessitant une sélection d'imprimante
 * 
 * @example
 * ```tsx
 * <PrinterSelector 
 *   value={printerId}
 *   onChange={setPrinterId}
 *   disabled={loading}
 *   required
 * />
 * ```
 */

'use client'

import { useState, useEffect } from 'react'
import { Printer, Loader2, AlertCircle } from 'lucide-react'
import { Label } from '@/shared/components/atoms/Label'

interface IFSPrinter {
  PrinterId: string        // ✅ Nom correct du champ IFS
  Description: string
}

interface PrinterSelectorProps {
  value: string
  onChange: (printerId: string) => void
  disabled?: boolean
  required?: boolean
  label?: string
  className?: string
}

export function PrinterSelector({ 
  value, 
  onChange, 
  disabled = false,
  required = false,
  label = 'Printer',
  className = ''
}: PrinterSelectorProps) {
  const [printers, setPrinters] = useState<IFSPrinter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPrinters()
  }, [])

  const fetchPrinters = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/shared/printers')

      if (!response.ok) {
        throw new Error('Failed to fetch printers')
      }

      const data = await response.json()
      
      if (data.success && data.printers) {
        setPrinters(data.printers)
        
        // Sélectionner automatiquement la première imprimante si aucune n'est sélectionnée
        if (data.printers.length > 0 && !value) {
          onChange(data.printers[0].PrinterId)
        }
      }
    } catch (err) {
      console.error('❌ [PrinterSelector] Error fetching printers:', err)
      setError(err instanceof Error ? err.message : 'Failed to load printers')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className={`space-y-2 ${className}`}>
        <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Printer className="w-4 h-4" />
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-300 rounded-md">
          <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
          <span className="text-sm text-gray-600">Loading printers...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`space-y-2 ${className}`}>
        <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Printer className="w-4 h-4" />
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <div className="flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-300 rounded-md">
          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-800">Error loading printers</p>
            <p className="text-xs text-red-600 mt-1">{error}</p>
            <button
              onClick={fetchPrinters}
              className="text-xs text-red-700 underline hover:text-red-900 mt-2"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <Printer className="w-4 h-4" />
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="">Select a printer...</option>
        {printers.map((printer) => (
          <option key={printer.PrinterId} value={printer.PrinterId}>
            {printer.PrinterId}
            {printer.Description && ` - ${printer.Description}`}
          </option>
        ))}
      </select>
      
      {printers.length > 0 && (
        <p className="text-xs text-gray-500">
          {printers.length} printer{printers.length > 1 ? 's' : ''} available
        </p>
      )}
    </div>
  )
}
