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
import { ErrorDialog } from './ErrorDialog'
import type { IFSSite } from '@/tools/part-printer/types'
import type { PartPrinterError } from '@/tools/part-printer/types/error'

interface SiteSelectorProps {
  value?: string
  onChange: (site: string) => void
  disabled?: boolean
}

export function SiteSelector({ value, onChange, disabled }: SiteSelectorProps) {
  const [sites, setSites] = useState<IFSSite[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<PartPrinterError | null>(null)
  const [showErrorDialog, setShowErrorDialog] = useState(false)

  // Chargement des sites au montage du composant
  useEffect(() => {
    async function loadSites() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/part-printer/sites')
        const json = await response.json()

        // ❌ PP_E001: No Sites (BLOQUANT)
        if (!response.ok || !json.success) {
          // L'API retourne l'erreur structurée PP_E001
          if (json.error) {
            setError(json.error as PartPrinterError)
            setShowErrorDialog(true)
          } else {
            throw new Error(json.message || 'Failed to fetch sites')
          }
          return
        }

        // Vérifier si des sites sont présents
        if (!json.data || json.data.length === 0) {
          // Créer erreur PP_E001 manuellement si l'API n'a pas renvoyé l'erreur
          const noSitesError: PartPrinterError = {
            code: 'PP_E001' as any,
            severity: 'blocking' as any,
            message: 'No Site data could be retrieved. Unable to load available sites from IFS. Please contact support.',
            action: 'stop' as any,
            timestamp: new Date(),
          }
          setError(noSitesError)
          setShowErrorDialog(true)
          return
        }

        setSites(json.data || [])
      } catch (err) {
        console.error('❌ [SiteSelector] Error loading sites:', err)
        
        // Erreur technique générique (erreur réseau, etc.)
        const technicalError: PartPrinterError = {
          code: 'PP_E001' as any,
          severity: 'blocking' as any,
          message: 'Technical error while loading sites. Please check your connection and try again.',
          action: 'stop' as any,
          details: {
            technical: err instanceof Error ? err.message : 'Unknown error',
          },
          timestamp: new Date(),
        }
        setError(technicalError)
        setShowErrorDialog(true)
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
        disabled={disabled || loading || !!error}
      >
        <SelectTrigger id="site-selector" className="w-full">
          <SelectValue 
            placeholder={
              loading 
                ? "Chargement des sites..." 
                : error 
                ? "❌ Erreur - Sites indisponibles" 
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

      {/* Affichage du message d'erreur sous le champ */}
      {error && (
        <p className="text-sm text-red-500">
          ⚠️ {error.message}
        </p>
      )}

      {!loading && sites.length === 0 && !error && (
        <p className="text-sm text-yellow-600">
          Aucun site disponible
        </p>
      )}

      {/* ErrorDialog pour erreurs bloquantes (PP_E001) */}
      <ErrorDialog
        error={error}
        open={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        actionText="Fermer"
        showDetails={false}
      />
    </div>
  )
}
