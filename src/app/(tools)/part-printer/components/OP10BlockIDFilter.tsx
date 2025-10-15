/**
 * Composant OP10BlockIDFilter
 * 
 * Phase 2.1 - Interface de filtrage
 * 
 * Filtre pour l'OP10 Block ID (EMPTY / No condition)
 * 
 * @example
 * ```tsx
 * <OP10BlockIDFilter
 *   value={op10BlockId}
 *   onChange={setOP10BlockId}
 * />
 * ```
 */

'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/atoms/Select'
import { Label } from '@/shared/components/atoms/Label'

interface OP10BlockIDFilterProps {
  value?: 'EMPTY' | 'NO_CONDITION'
  onChange: (value: 'EMPTY' | 'NO_CONDITION' | undefined) => void
  disabled?: boolean
}

export function OP10BlockIDFilter({ value, onChange, disabled }: OP10BlockIDFilterProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="op10-block-id-filter">
        Filtre OP10 Block ID <span className="text-gray-400">(optionnel)</span>
      </Label>
      
      <Select
        value={value || 'NONE'}
        onValueChange={(val) => {
          if (val === 'NONE') {
            onChange(undefined)
          } else {
            onChange(val as 'EMPTY' | 'NO_CONDITION')
          }
        }}
        disabled={disabled}
      >
        <SelectTrigger id="op10-block-id-filter" className="w-full">
          <SelectValue placeholder="Pas de filtre" />
        </SelectTrigger>
        
        <SelectContent>
          <SelectItem value="NONE">
            Pas de filtre
          </SelectItem>
          <SelectItem value="EMPTY">
            EMPTY (Block ID vide uniquement)
          </SelectItem>
          <SelectItem value="NO_CONDITION">
            NO_CONDITION (tous les Block ID)
          </SelectItem>
        </SelectContent>
      </Select>

      <p className="text-xs text-gray-500">
        {value === 'EMPTY' && "Filtre les Shop Orders avec OP10 Block ID vide"}
        {value === 'NO_CONDITION' && "Pas de filtrage sur OP10 Block ID"}
        {!value && "Aucun filtrage supplémentaire"}
      </p>
    </div>
  )
}
