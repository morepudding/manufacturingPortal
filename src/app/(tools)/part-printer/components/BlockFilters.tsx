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
import { CheckCircle, Scissors, Calendar } from 'lucide-react'

interface BlockFiltersProps {
  // Block Date
  blockDateEnabled: boolean
  onBlockDateEnabledChange: (value: boolean) => void
  blockDateValue: boolean
  onBlockDateValueChange: (value: boolean) => void

  // Sent to Cutting
  sentToCuttingEnabled: boolean
  onSentToCuttingEnabledChange: (value: boolean) => void
  sentToCuttingValue: boolean
  onSentToCuttingValueChange: (value: boolean) => void

  // Block ID
  operationBlockIdFilter: 'all' | 'empty' | 'not-empty' | string
  onOperationBlockIdFilterChange: (value: 'all' | 'empty' | 'not-empty') => void
  specificBlockId: string
  onSpecificBlockIdChange: (value: string) => void

  disabled?: boolean
}

export function BlockFilters({
  blockDateEnabled,
  onBlockDateEnabledChange,
  blockDateValue,
  onBlockDateValueChange,
  
  sentToCuttingEnabled,
  onSentToCuttingEnabledChange,
  sentToCuttingValue,
  onSentToCuttingValueChange,

  operationBlockIdFilter,
  onOperationBlockIdFilterChange,
  specificBlockId,
  onSpecificBlockIdChange,
  
  disabled = false,
}: BlockFiltersProps) {
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-medium text-gray-700">
          Filtres avancés
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 1. Block Date Filter */}
        <div className={`p-3 border rounded-md transition-colors ${blockDateEnabled ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <label htmlFor="blockDateEnabled" className="text-sm font-medium text-gray-900 cursor-pointer">
                Block Date
              </label>
            </div>
            <Checkbox
              id="blockDateEnabled"
              checked={blockDateEnabled}
              onCheckedChange={onBlockDateEnabledChange}
              disabled={disabled}
            />
          </div>
          
          {blockDateEnabled && (
            <div className="mt-2 pl-6">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="blockDateValue"
                    checked={blockDateValue === true}
                    onChange={() => onBlockDateValueChange(true)}
                    disabled={disabled}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  TRUE
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="blockDateValue"
                    checked={blockDateValue === false}
                    onChange={() => onBlockDateValueChange(false)}
                    disabled={disabled}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  FALSE
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Filtre sur le champ <code>CBlockDates</code>
              </p>
            </div>
          )}
        </div>

        {/* 2. Sent to Cutting System Filter */}
        <div className={`p-3 border rounded-md transition-colors ${sentToCuttingEnabled ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4 text-gray-500" />
              <label htmlFor="sentToCuttingEnabled" className="text-sm font-medium text-gray-900 cursor-pointer">
                Sent to Cutting
              </label>
            </div>
            <Checkbox
              id="sentToCuttingEnabled"
              checked={sentToCuttingEnabled}
              onCheckedChange={onSentToCuttingEnabledChange}
              disabled={disabled}
            />
          </div>
          
          {sentToCuttingEnabled && (
            <div className="mt-2 pl-6">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="sentToCuttingValue"
                    checked={sentToCuttingValue === true}
                    onChange={() => onSentToCuttingValueChange(true)}
                    disabled={disabled}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  TRUE
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="sentToCuttingValue"
                    checked={sentToCuttingValue === false}
                    onChange={() => onSentToCuttingValueChange(false)}
                    disabled={disabled}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  FALSE
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Filtre sur le champ <code>SentToCuttingSystem</code>
              </p>
            </div>
          )}
        </div>

        {/* 3. OP10 Block ID Filter */}
        <div className="md:col-span-2 p-3 border border-gray-200 rounded-md hover:border-blue-300 transition-colors">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-2" />
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-900 mb-2 block">
                OP10 Block ID
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Input Spécifique */}
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Valeur spécifique (ex: B89)</label>
                  <input
                    type="text"
                    value={specificBlockId}
                    onChange={(e) => onSpecificBlockIdChange(e.target.value)}
                    placeholder="Entrer un Block ID..."
                    disabled={disabled}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  />
                </div>

                {/* Dropdown Presets (désactivé si spécifique rempli) */}
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">Ou filtre générique</label>
                  <select
                    value={specificBlockId ? 'specific' : operationBlockIdFilter as string}
                    onChange={(e) => {
                      if (e.target.value !== 'specific') {
                        onOperationBlockIdFilterChange(e.target.value as 'all' | 'empty' | 'not-empty')
                        onSpecificBlockIdChange('') // Clear specific if preset selected
                      }
                    }}
                    disabled={disabled || !!specificBlockId}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${specificBlockId ? 'bg-gray-100 text-gray-400' : ''}`}
                  >
                    <option value="all">Tous (Block ID vide ou non)</option>
                    <option value="empty">Vide uniquement (non bloquées)</option>
                    <option value="not-empty">Non vide uniquement (bloquées)</option>
                    {specificBlockId && <option value="specific">Spécifique : {specificBlockId}</option>}
                  </select>
                </div>
              </div>
              
              <p className="text-xs text-gray-600 mt-2">
                {specificBlockId 
                  ? `✅ Filtre sur le Block ID exact "${specificBlockId}" (Date et Ligne deviennent optionnels)`
                  : 'Remplissez un Block ID spécifique pour rendre la Date et la Ligne optionnelles.'
                }
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
