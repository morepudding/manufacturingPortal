/**
 * Composant BlockFilters
 * 
 * ✅ MISE À JOUR (17 oct 2025) : Implémentation conforme SFD
 * 1. Block Date (CBlockDates filter) - Checkbox
 * 2. OP10 Block ID - Select avec 3 options (all/empty/not-empty)
 * 
 * Suite à l'analyse du 17 oct 2025, nous avons confirmé que OperationBlockId
 * est disponible sur FR017 (B89, B92). Le filtre est désormais actif.
 * 
 * @example
 * ```tsx
 * <BlockFilters
 *   blockDate={true}
 *   onBlockDateChange={setBlockDate}
 *   operationBlockIdFilter="all"
 *   onOperationBlockIdFilterChange={setOperationBlockIdFilter}
 *   disabled={false}
 * />
 * ```
 */

'use client'

import { Checkbox } from '@/shared/components/atoms/Chekbox'
import { CheckCircle } from 'lucide-react'

interface BlockFiltersProps {
  blockDate: boolean
  onBlockDateChange: (value: boolean) => void
  operationBlockIdFilter: 'all' | 'empty' | 'not-empty'
  onOperationBlockIdFilterChange: (value: 'all' | 'empty' | 'not-empty') => void
  disabled?: boolean
}

export function BlockFilters({
  blockDate,
  onBlockDateChange,
  operationBlockIdFilter,
  onOperationBlockIdFilterChange,
  disabled = false,
}: BlockFiltersProps) {
  
  // Déterminer le mode actif selon les combinaisons
  const getActiveMode = () => {
    const hasEmptyFilter = operationBlockIdFilter === 'empty'
    const hasNotEmptyFilter = operationBlockIdFilter === 'not-empty'
    
    if (blockDate && hasEmptyFilter) return 'Débit classique'
    if (!blockDate && !hasEmptyFilter && !hasNotEmptyFilter) return 'Redébit'
    if (blockDate && hasNotEmptyFilter) return 'Débit avec pièces bloquées'
    if (!blockDate && hasEmptyFilter) return 'Toutes dates (non bloquées)'
    return 'Personnalisé'
  }

  const activeMode = getActiveMode()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium text-gray-700">
          Filtres de blocage
        </span>
      </div>

      {/* Block Date Checkbox */}
      <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-md hover:border-blue-300 transition-colors">
        <Checkbox
          id="blockDate"
          checked={blockDate}
          onCheckedChange={onBlockDateChange}
          disabled={disabled}
          className="mt-0.5"
        />
        <div className="flex-1">
          <label
            htmlFor="blockDate"
            className="text-sm font-medium text-gray-900 cursor-pointer"
          >
            Block Date (CBlockDates)
          </label>
          <p className="text-xs text-gray-600 mt-1">
            {blockDate 
              ? '✅ Filtre actif : Recherche uniquement les Shop Orders avec CBlockDates = true (Débit classique)'
              : '⚪ Filtre désactivé : Accepte tous les Shop Orders (CBlockDates = true ou false)'
            }
          </p>
        </div>
      </div>

      {/* OP10 Block ID Select - ✅ RÉACTIVÉ (17 oct 2025) */}
      <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-md hover:border-blue-300 transition-colors">
        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-2" />
        <div className="flex-1">
          <label
            htmlFor="operationBlockIdFilter"
            className="text-sm font-medium text-gray-900 mb-2 block"
          >
            OP10 Block ID
          </label>
          
          <select
            id="operationBlockIdFilter"
            value={operationBlockIdFilter}
            onChange={(e) => onOperationBlockIdFilterChange(e.target.value as 'all' | 'empty' | 'not-empty')}
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="all">Tous (Block ID vide ou non)</option>
            <option value="empty">Vide uniquement (non bloquées)</option>
            <option value="not-empty">Non vide uniquement (bloquées)</option>
          </select>
          
          <p className="text-xs text-gray-600 mt-2">
            {operationBlockIdFilter === 'all' && 
              '⚪ Accepte toutes les pièces (Block ID vide ou non)'
            }
            {operationBlockIdFilter === 'empty' && 
              '✅ Recherche uniquement les pièces avec Block ID vide (non bloquées)'
            }
            {operationBlockIdFilter === 'not-empty' && 
              '🔒 Recherche uniquement les pièces avec Block ID (ex: B89, B92)'
            }
          </p>
        </div>
      </div>

      {/* Mode actif (indicateur visuel) */}
      <div className="p-3 bg-gray-50 border border-gray-200 rounded-md">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            Mode détecté :
          </span>
          <span className={`text-sm font-semibold ${
            activeMode === 'Débit classique' ? 'text-green-600' :
            activeMode === 'Redébit' ? 'text-blue-600' :
            'text-gray-600'
          }`}>
            {activeMode}
          </span>
        </div>
        
        {/* Explication du mode */}
        <div className="mt-2 text-xs text-gray-600">
          {activeMode === 'Débit classique' && (
            <p>🔹 Production normale : pièces neuves, non bloquées, date exacte</p>
          )}
          {activeMode === 'Redébit' && (
            <p>🔸 Re-découpe : toutes pièces (même bloquées), toutes dates</p>
          )}
          {activeMode === 'Débit avec pièces bloquées' && (
            <p>⚠️ Date exacte mais accepte les pièces bloquées</p>
          )}
          {activeMode === 'Toutes dates (non bloquées)' && (
            <p>📊 Toutes dates mais uniquement pièces non bloquées</p>
          )}
        </div>
      </div>

      {/* Raccourcis rapides */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            onBlockDateChange(true)
            onOperationBlockIdFilterChange('empty')
          }}
          disabled={disabled}
          className="text-xs px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          🔹 Débit classique
        </button>
        <button
          type="button"
          onClick={() => {
            onBlockDateChange(false)
            onOperationBlockIdFilterChange('all')
          }}
          disabled={disabled}
          className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          🔸 Redébit
        </button>
        <button
          type="button"
          onClick={() => {
            onBlockDateChange(true)
            onOperationBlockIdFilterChange('all')
          }}
          disabled={disabled}
          className="text-xs px-3 py-1.5 bg-gray-50 text-gray-700 border border-gray-200 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          🔄 Réinitialiser
        </button>
      </div>
    </div>
  )
}
