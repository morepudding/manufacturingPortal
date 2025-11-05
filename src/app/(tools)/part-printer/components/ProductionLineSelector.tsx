/**
 * Composant ProductionLineSelector
 * 
 * Phase 2.1 - Interface de filtrage
 * 
 * Dropdown pour sélectionner une ligne de production (filtrée par site)
 * 
 * @example
 * ```tsx
 * <ProductionLineSelector
 *   site="BDR"
 *   value={selectedLine}
 *   onChange={setLine}
 * />
 * ```
 */

'use client'

import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/Select'
import { Label } from '@/shared/components/atoms/Label'
import type { IFSProductionLine } from '@/tools/part-printer/types'

interface ProductionLineSelectorProps {
  site?: string
  value?: string
  onChange: (line: string) => void
  disabled?: boolean
}

export function ProductionLineSelector({ 
  site, 
  value, 
  onChange, 
  disabled 
}: ProductionLineSelectorProps) {
  const [lines, setLines] = useState<IFSProductionLine[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Rechargement des lignes quand le site change
  useEffect(() => {
    if (!site) {
      setLines([])
      setError(null)
      return
    }

    async function loadLines() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/part-printer/production-lines?site=${encodeURIComponent(site)}`)
        const json = await response.json()

        if (!response.ok || !json.success) {
          throw new Error(json.message || 'Failed to fetch production lines')
        }

        setLines(json.data.productionLines || [])
      } catch (err) {
        console.error('Error loading production lines:', err)
        setError(err instanceof Error ? err.message : 'Failed to load production lines')
      } finally {
        setLoading(false)
      }
    }

    loadLines()
  }, [site])

  // Reset de la valeur quand le site change
  useEffect(() => {
    if (value && site) {
      onChange('')
    }
  }, [site])

  const isDisabled = disabled || loading || !site

  return (
    <div className="space-y-2">
      <Label htmlFor="production-line-selector">
        Ligne de production <span className="text-gray-400">(optionnel)</span>
      </Label>
      
      <Select
        value={value}
        onValueChange={onChange}
        disabled={isDisabled}
      >
        <SelectTrigger id="production-line-selector" className="w-full">
          <SelectValue 
            placeholder={
              !site
                ? "Sélectionnez d'abord un site"
                : loading 
                ? "Chargement des lignes..." 
                : error 
                ? "Erreur de chargement" 
                : "Toutes les lignes"
            } 
          />
        </SelectTrigger>
        
        <SelectContent>
          {lines.map((line) => (
            <SelectItem key={line.LineId} value={line.LineId}>
              {line.LineId} - {line.Name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <p className="text-sm text-red-500">
          ⚠️ {error}
        </p>
      )}

      {!loading && site && lines.length === 0 && !error && (
        <p className="text-sm text-gray-500">
          Aucune ligne de production pour ce site
        </p>
      )}
    </div>
  )
}
