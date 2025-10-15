/**
 * Composant SiteSelector
 * 
 * Phase 2.1 - Interface de filtrage
 * 
 * Dropdown pour sélectionner un site/contract IFS
 * 
 * @example
 * ```tsx
 * <SiteSelector
 *   value={selectedSite}
 *   onChange={setSite}
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
import type { IFSSite } from '@/tools/part-printer/types'

interface SiteSelectorProps {
  value?: string
  onChange: (site: string) => void
  disabled?: boolean
}

export function SiteSelector({ value, onChange, disabled }: SiteSelectorProps) {
  const [sites, setSites] = useState<IFSSite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Chargement des sites au montage du composant
  useEffect(() => {
    async function loadSites() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/shared/sites')
        const json = await response.json()

        if (!response.ok || !json.success) {
          throw new Error(json.message || 'Failed to fetch sites')
        }

        setSites(json.data.sites || [])
      } catch (err) {
        console.error('Error loading sites:', err)
        setError(err instanceof Error ? err.message : 'Failed to load sites')
      } finally {
        setLoading(false)
      }
    }

    loadSites()
  }, [])

  return (
    <div className="space-y-2">
      <Label htmlFor="site-selector">
        Site <span className="text-red-500">*</span>
      </Label>
      
      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled || loading}
      >
        <SelectTrigger id="site-selector" className="w-full">
          <SelectValue 
            placeholder={
              loading 
                ? "Chargement des sites..." 
                : error 
                ? "Erreur de chargement" 
                : "Sélectionnez un site"
            } 
          />
        </SelectTrigger>
        
        <SelectContent>
          {sites.map((site) => (
            <SelectItem key={site.Contract} value={site.Contract}>
              {site.Contract} - {site.Name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <p className="text-sm text-red-500">
          ⚠️ {error}
        </p>
      )}

      {!loading && sites.length === 0 && !error && (
        <p className="text-sm text-yellow-600">
          Aucun site disponible
        </p>
      )}
    </div>
  )
}
