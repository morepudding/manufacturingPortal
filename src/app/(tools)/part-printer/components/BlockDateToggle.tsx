/**
 * Composant BlockDateToggle
 * 
 * Phase 2.1 - Interface de filtrage
 * 
 * Toggle pour choisir entre Débit classique et Redébit
 * 
 * @example
 * ```tsx
 * <BlockDateToggle
 *   value={blockDate}
 *   onChange={setBlockDate}
 * />
 * ```
 */

'use client'

import { Label } from '@/shared/components/atoms/Label'

interface BlockDateToggleProps {
  value: boolean
  onChange: (blockDate: boolean) => void
  disabled?: boolean
}

export function BlockDateToggle({ value, onChange, disabled }: BlockDateToggleProps) {
  return (
    <div className="space-y-2">
      <Label>
        Mode <span className="text-red-500">*</span>
      </Label>
      
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="blockDate"
            checked={value === true}
            onChange={() => onChange(true)}
            disabled={disabled}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm">Débit classique</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="blockDate"
            checked={value === false}
            onChange={() => onChange(false)}
            disabled={disabled}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm">Redébit</span>
        </label>
      </div>

      <p className="text-xs text-gray-500">
        {value 
          ? "🔹 Débit classique : Recherche Shop Orders avec date exacte (CBlockDates = true)" 
          : "🔸 Redébit : Recherche Shop Orders avec date ≤ sélectionnée (CBlockDates = false)"}
      </p>
      
      {!value && (
        <p className="text-xs text-amber-600 font-medium mt-1">
          💡 Pour tester le Shop Order 463215, utilisez le mode <strong>Redébit</strong>
        </p>
      )}
    </div>
  )
}
