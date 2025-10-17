/**
 * Composant BlockFilters
 * 
 * Implémentation SFD stricte avec 2 checkboxes indépendantes :
 * 1. Block Date (CBlockDates filter)
 * 2. OP10 Block ID empty (BlockId filter)
 * 
 * ⚠️ Note AST : Le filtre Block ID n'est pas disponible sur l'environnement AST.
 * L'option est implémentée pour future-proof mais sera ignorée sur AST.
 * 
 * @example
 * ```tsx
 * <BlockFilters
 *   blockDate={true}
 *   onBlockDateChange={setBlockDate}
 *   blockIdEmpty={true}
 *   onBlockIdEmptyChange={setBlockIdEmpty}
 *   disabled={false}
 * />
 * ```
 */

'use client'

import { Checkbox } from '@/shared/components/atoms/Chekbox'
import { Info } from 'lucide-react'

interface BlockFiltersProps {
  blockDate: boolean
  onBlockDateChange: (value: boolean) => void
  blockIdEmpty: boolean
  onBlockIdEmptyChange: (value: boolean) => void
  disabled?: boolean
  environment?: 'AST' | 'PRODUCTION' // Pour afficher le warning AST
}

export function BlockFilters({
  blockDate,
  onBlockDateChange,
  blockIdEmpty,
  onBlockIdEmptyChange,
  disabled = false,
  environment = 'AST', // Default AST pour le moment
}: BlockFiltersProps) {
  
  // Déterminer le mode actif selon les combinaisons
  const getActiveMode = () => {
    if (blockDate && blockIdEmpty) return 'Débit classique'
    if (!blockDate && !blockIdEmpty) return 'Redébit'
    if (blockDate && !blockIdEmpty) return 'Débit avec pièces bloquées'
    if (!blockDate && blockIdEmpty) return 'Toutes dates (non bloquées)'
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
            className="text-sm font-medium text-gray-900 cursor-pointer flex items-center gap-2"
          >
            Block Date (CBlockDates)
            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
              Recommandé
            </span>
          </label>
          <p className="text-xs text-gray-600 mt-1">
            {blockDate 
              ? '✅ Filtre actif : Recherche uniquement les Shop Orders avec CBlockDates = true (Débit classique)'
              : '⚪ Filtre désactivé : Accepte tous les Shop Orders (CBlockDates = true ou false)'
            }
          </p>
        </div>
      </div>

      {/* OP10 Block ID Empty Checkbox */}
      <div className="flex items-start gap-3 p-3 border border-gray-200 rounded-md hover:border-blue-300 transition-colors">
        <Checkbox
          id="blockIdEmpty"
          checked={blockIdEmpty}
          onCheckedChange={onBlockIdEmptyChange}
          disabled={disabled}
          className="mt-0.5"
        />
        <div className="flex-1">
          <label
            htmlFor="blockIdEmpty"
            className="text-sm font-medium text-gray-900 cursor-pointer flex items-center gap-2"
          >
            OP10 Block ID empty
            {environment === 'AST' && (
              <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded">
                ⚠️ Non disponible (AST)
              </span>
            )}
          </label>
          <p className="text-xs text-gray-600 mt-1">
            {blockIdEmpty 
              ? '✅ Filtre actif : Recherche uniquement les pièces avec Block ID vide (non bloquées)'
              : '⚪ Filtre désactivé : Accepte toutes les pièces (Block ID vide ou non)'
            }
          </p>
        </div>
      </div>

      {/* Warning AST si Block ID activé */}
      {blockIdEmpty && environment === 'AST' && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-md">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-medium mb-1">⚠️ Limitation environnement AST</p>
            <p className="text-xs">
              Le filtre <strong>OP10 Block ID</strong> n'est pas disponible sur l'environnement AST actuel. 
              Cette option sera <strong>ignorée</strong> lors de la recherche. 
              Le code est prêt pour un environnement de production qui supporte ce filtre.
            </p>
          </div>
        </div>
      )}

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
            onBlockIdEmptyChange(true)
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
            onBlockIdEmptyChange(false)
          }}
          disabled={disabled}
          className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          🔸 Redébit
        </button>
        <button
          type="button"
          onClick={() => {
            onBlockDateChange(false)
            onBlockIdEmptyChange(false)
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
