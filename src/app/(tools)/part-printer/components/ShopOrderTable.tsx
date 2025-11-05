/**
 * ShopOrderTable Component
 * 
 * Phase 5 - Table avec sélection multiple
 * 
 * Affiche les Shop Orders filtrés avec:
 * - Checkboxes pour sélection multiple
 * - Tri par colonne
 * - États visuels (hover, sélection)
 * - Responsive design
 */

'use client'

import { useState } from 'react'
import { Checkbox } from '@/shared/components/atoms/Chekbox'
import type { IFSShopOrderExtended } from '@/tools/part-printer/types'

interface ShopOrderTableProps {
  shopOrders: IFSShopOrderExtended[]
  selectedOrders: Set<string>
  onSelectionChange: (orderId: string, checked: boolean) => void
  onSelectAll: (checked: boolean) => void
  loading?: boolean
}

type SortField = 'orderNo' | 'partNo' | 'startDate' | 'blockDate'
type SortDirection = 'asc' | 'desc'

export function ShopOrderTable({
  shopOrders,
  selectedOrders,
  onSelectionChange,
  onSelectAll,
  loading = false,
}: ShopOrderTableProps) {
  const [sortField, setSortField] = useState<SortField>('orderNo')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [searchQuery, setSearchQuery] = useState('')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Filtrer par recherche
  const filteredOrders = shopOrders.filter((order) => {
    if (!searchQuery) return true
    
    const query = searchQuery.toLowerCase()
    const orderNo = `${order.OrderNo}-${order.ReleaseNo}-${order.SequenceNo}`.toLowerCase()
    const partNo = order.PartNo.toLowerCase()
    const startDate = order.RevisedStartDate || ''
    
    return (
      orderNo.includes(query) ||
      partNo.includes(query) ||
      startDate.includes(query)
    )
  })

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let comparison = 0

    switch (sortField) {
      case 'orderNo':
        comparison = a.OrderNo.localeCompare(b.OrderNo)
        break
      case 'partNo':
        comparison = a.PartNo.localeCompare(b.PartNo)
        break
      case 'startDate':
        comparison = new Date(a.RevisedStartDate).getTime() - new Date(b.RevisedStartDate).getTime()
        break
      case 'blockDate':
        comparison = (a.CBlockDates === b.CBlockDates) ? 0 : a.CBlockDates ? -1 : 1
        break
    }

    return sortDirection === 'asc' ? comparison : -comparison
  })

  const allSelected = shopOrders.length > 0 && selectedOrders.size === shopOrders.length
  const someSelected = selectedOrders.size > 0 && selectedOrders.size < shopOrders.length

  const SortIcon = ({ active, direction }: { active: boolean; direction: SortDirection }) => {
    if (!active) {
      return <span className="text-gray-400">↕</span>
    }
    return <span className="text-amber-400">{direction === 'asc' ? '↑' : '↓'}</span>
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-700/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-white">
              📋 Résultats
            </h2>
            <p className="text-amber-300 text-sm mt-1">
              {filteredOrders.length} Shop Order{filteredOrders.length > 1 ? 's' : ''} trouvé{filteredOrders.length > 1 ? 's' : ''}
              {searchQuery && filteredOrders.length !== shopOrders.length && (
                <span className="text-gray-400"> (sur {shopOrders.length} total)</span>
              )}
            </p>
          </div>
          {selectedOrders.size > 0 && (
            <div className="bg-amber-900/50 border border-amber-700/50 rounded-lg px-4 py-2">
              <p className="text-amber-200 font-medium">
                {selectedOrders.size} sélectionné{selectedOrders.size > 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>

        {/* Barre de recherche */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Rechercher par Shop Order, Part No ou Date..."
            className="w-full px-4 py-2 pl-10 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900/50 border-b border-gray-700/50">
            <tr>
              {/* Checkbox Select All */}
              <th className="px-6 py-4 text-left">
                <Checkbox
                  id="select-all"
                  checked={allSelected}
                  onCheckedChange={onSelectAll}
                  disabled={loading}
                />
              </th>

              {/* Shop Order */}
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('orderNo')}
                  className="flex items-center gap-2 text-sm font-medium text-amber-200 hover:text-amber-100 transition-colors"
                >
                  Shop Order
                  <SortIcon active={sortField === 'orderNo'} direction={sortDirection} />
                </button>
              </th>

              {/* Part No */}
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('partNo')}
                  className="flex items-center gap-2 text-sm font-medium text-amber-200 hover:text-amber-100 transition-colors"
                >
                  Part No
                  <SortIcon active={sortField === 'partNo'} direction={sortDirection} />
                </button>
              </th>

              {/* Start Date */}
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('startDate')}
                  className="flex items-center gap-2 text-sm font-medium text-amber-200 hover:text-amber-100 transition-colors"
                >
                  Start Date
                  <SortIcon active={sortField === 'startDate'} direction={sortDirection} />
                </button>
              </th>

              {/* Block Date */}
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => handleSort('blockDate')}
                  className="flex items-center gap-2 text-sm font-medium text-amber-200 hover:text-amber-100 transition-colors"
                >
                  Block Date
                  <SortIcon active={sortField === 'blockDate'} direction={sortDirection} />
                </button>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700/30">
            {sortedOrders.map((order) => {
              const orderId = `${order.OrderNo}-${order.ReleaseNo}-${order.SequenceNo}`
              const isSelected = selectedOrders.has(orderId)

              return (
                <tr
                  key={orderId}
                  className={`
                    transition-colors
                    ${isSelected 
                      ? 'bg-amber-900/30 hover:bg-amber-900/40' 
                      : 'hover:bg-gray-700/30'
                    }
                  `}
                >
                  {/* Checkbox */}
                  <td className="px-6 py-4">
                    <Checkbox
                      id={`select-${orderId}`}
                      checked={isSelected}
                      onCheckedChange={(checked) => onSelectionChange(orderId, checked as boolean)}
                      disabled={loading}
                    />
                  </td>

                  {/* Shop Order */}
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">
                      {order.OrderNo}-{order.ReleaseNo}-{order.SequenceNo}
                    </span>
                  </td>

                  {/* Part No */}
                  <td className="px-6 py-4">
                    <span className="text-amber-100 font-mono text-sm">
                      {order.PartNo}
                    </span>
                  </td>

                  {/* Start Date */}
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm">
                      {(() => {
                        try {
                          const date = new Date(order.RevisedStartDate)
                          return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString('fr-FR')
                        } catch {
                          return 'N/A'
                        }
                      })()}
                    </span>
                  </td>

                  {/* Block Date */}
                  <td className="px-6 py-4">
                    {order.CBlockDates ? (
                      <span className="inline-flex items-center gap-1 text-emerald-300 text-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        Oui
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-gray-400 text-sm">
                        <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                        Non
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer avec stats */}
      <div className="px-6 py-4 border-t border-gray-700/50 bg-gray-900/30">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div>
            Affichage de {shopOrders.length} résultat{shopOrders.length > 1 ? 's' : ''}
          </div>
          {selectedOrders.size > 0 && (
            <div className="text-amber-300">
              {selectedOrders.size} / {shopOrders.length} sélectionné{selectedOrders.size > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
