/**
 * PrinterSearch Component
 * 
 * Composant de recherche d'imprimante avec autocomplétion
 * Permet de filtrer rapidement parmi une longue liste d'imprimantes
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { Input } from '@/shared/components/atoms/Input'
import { Label } from '@/shared/components/atoms/Label'

interface Printer {
  PrinterId: string
  Description: string
}

interface PrinterSearchProps {
  printers: Printer[]
  value: string
  onChange: (printerId: string) => void
  loading?: boolean
  required?: boolean
}

export function PrinterSearch({ 
  printers, 
  value, 
  onChange, 
  loading = false,
  required = false 
}: PrinterSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [filteredPrinters, setFilteredPrinters] = useState<Printer[]>(printers)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Trouver l'imprimante sélectionnée pour afficher son nom
  const selectedPrinter = printers.find(p => p.PrinterId === value)

  // Filtrer les imprimantes en temps réel
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredPrinters(printers)
    } else {
      const term = searchTerm.toLowerCase()
      const filtered = printers.filter(p => 
        p.PrinterId.toLowerCase().includes(term) ||
        (p.Description && p.Description.toLowerCase().includes(term))
      )
      setFilteredPrinters(filtered)
    }
  }, [searchTerm, printers])

  // Fermer le dropdown si on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectPrinter = (printer: Printer) => {
    onChange(printer.PrinterId)
    setSearchTerm('')
    setShowDropdown(false)
  }

  const handleClear = () => {
    onChange('')
    setSearchTerm('')
    setShowDropdown(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Label htmlFor="printer-search">
        Printer {required && <span className="text-red-500">*</span>}
      </Label>
      
      {loading ? (
        <div className="text-sm text-gray-500 py-2">Loading printers...</div>
      ) : (
        <div>
          {/* Affichage de l'imprimante sélectionnée */}
          {selectedPrinter ? (
            <div className="mb-2 flex items-center justify-between bg-blue-50 border border-blue-200 rounded-md p-3">
              <div>
                <div className="font-semibold text-blue-900">{selectedPrinter.PrinterId}</div>
                {selectedPrinter.Description && (
                  <div className="text-sm text-blue-700">{selectedPrinter.Description}</div>
                )}
              </div>
              <button
                type="button"
                onClick={handleClear}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Change
              </button>
            </div>
          ) : (
            <>
              {/* Champ de recherche */}
              <Input
                id="printer-search"
                type="text"
                placeholder="Search by ID or description... (e.g. 'HP', 'Office', '01')"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setShowDropdown(true)
                }}
                onFocus={() => setShowDropdown(true)}
                className="w-full"
              />

              {/* Dropdown de résultats */}
              {showDropdown && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-64 overflow-y-auto">
                  {filteredPrinters.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      No printers found for "{searchTerm}"
                    </div>
                  ) : (
                    <>
                      <div className="px-4 py-2 text-xs text-gray-500 bg-gray-50 border-b sticky top-0">
                        {filteredPrinters.length} printer{filteredPrinters.length > 1 ? 's' : ''} found
                      </div>
                      {filteredPrinters.map((printer) => (
                        <button
                          key={printer.PrinterId}
                          type="button"
                          onClick={() => handleSelectPrinter(printer)}
                          className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                          <div className="font-medium text-gray-900">{printer.PrinterId}</div>
                          {printer.Description && (
                            <div className="text-sm text-gray-600 mt-1">{printer.Description}</div>
                          )}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              )}
            </>
          )}

          {/* Indication du nombre total d'imprimantes */}
          {!selectedPrinter && !showDropdown && (
            <div className="text-xs text-gray-500 mt-1">
              {printers.length} printers available
            </div>
          )}
        </div>
      )}
    </div>
  )
}
