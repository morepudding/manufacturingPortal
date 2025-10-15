/**
 * Composant FilterPanel
 * 
 * Phase 2.1 - Interface de filtrage
 * 
 * Panel regroupant tous les filtres Part Printer
 * 
 * @example
 * ```tsx
 * <FilterPanel onSearch={handleSearch} />
 * ```
 */

'use client'

import { useState } from 'react'
import { SiteSelector } from './SiteSelector'
import { ProductionLineSelector } from './ProductionLineSelector'
import { BlockDateToggle } from './BlockDateToggle'
import { OP10BlockIDFilter } from './OP10BlockIDFilter'
import { Button } from '@/shared/components/atoms/Button'
import type { ShopOrderFilterParams } from '@/tools/part-printer/types'

interface FilterPanelProps {
  onSearch: (params: ShopOrderFilterParams) => void
  loading?: boolean
}

export function FilterPanel({ onSearch, loading }: FilterPanelProps) {
  const [site, setSite] = useState('')
  const [productionLine, setProductionLine] = useState('')
  const [startDate, setStartDate] = useState('')
  const [blockDate, setBlockDate] = useState(true)
  const [op10BlockId, setOP10BlockId] = useState<'EMPTY' | 'NO_CONDITION' | undefined>()

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Validation côté client
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!site || site.trim() === '') {
      newErrors.site = 'Le site est requis'
    }

    if (!startDate || startDate.trim() === '') {
      newErrors.startDate = 'La date est requise'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSearch = () => {
    if (!validate()) {
      return
    }

    const params: ShopOrderFilterParams = {
      site,
      startDate,
      blockDate,
    }

    if (productionLine) {
      params.productionLine = productionLine
    }

    if (op10BlockId) {
      params.op10BlockId = op10BlockId
    }

    console.log('🔍 [FilterPanel] Recherche avec paramètres:', params)
    onSearch(params)
  }

  const handleReset = () => {
    setSite('')
    setProductionLine('')
    setStartDate('')
    setBlockDate(true)
    setOP10BlockId(undefined)
    setErrors({})
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">📊</span>
        <h2 className="text-xl font-semibold">Filtres de recherche</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Site */}
        <div>
          <SiteSelector
            value={site}
            onChange={setSite}
            disabled={loading}
          />
          {errors.site && (
            <p className="text-sm text-red-500 mt-1">
              {errors.site}
            </p>
          )}
        </div>

        {/* Production Line */}
        <div>
          <ProductionLineSelector
            site={site}
            value={productionLine}
            onChange={setProductionLine}
            disabled={loading}
          />
        </div>

        {/* Date de début */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Date de début <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {errors.startDate && (
            <p className="text-sm text-red-500 mt-1">
              {errors.startDate}
            </p>
          )}
        </div>

        {/* Mode (Débit/Redébit) */}
        <div>
          <BlockDateToggle
            value={blockDate}
            onChange={setBlockDate}
            disabled={loading}
          />
        </div>

        {/* OP10 Block ID Filter */}
        <div className="md:col-span-2">
          <OP10BlockIDFilter
            value={op10BlockId}
            onChange={setOP10BlockId}
            disabled={loading}
          />
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex gap-4 mt-6 pt-6 border-t border-gray-200">
        <Button
          onClick={handleSearch}
          disabled={loading}
          className="flex-1 md:flex-none"
        >
          {loading ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Recherche en cours...
            </>
          ) : (
            <>
              🔍 Rechercher
            </>
          )}
        </Button>

        <Button
          onClick={handleReset}
          variant="outline"
          disabled={loading}
          className="flex-1 md:flex-none"
        >
          🔄 Réinitialiser
        </Button>
      </div>

      {/* Résumé des filtres actifs */}
      {site && startDate && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-sm font-medium text-blue-900 mb-1">
            Filtres actifs :
          </p>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Site : <strong>{site}</strong></li>
            {productionLine && <li>• Ligne : <strong>{productionLine}</strong></li>}
            <li>• Date : <strong>{startDate}</strong></li>
            <li>• Mode : <strong>{blockDate ? 'Débit classique' : 'Redébit'}</strong></li>
            {op10BlockId && <li>• OP10 Block ID : <strong>{op10BlockId}</strong></li>}
          </ul>
        </div>
      )}
    </div>
  )
}
