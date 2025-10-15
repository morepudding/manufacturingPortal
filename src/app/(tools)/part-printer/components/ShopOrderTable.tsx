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

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedOrders = [...shopOrders].sort((a, b) => {
    let comparison = 0

    switch (sortField) {
      case 'orderNo':
        comparison = a.OrderNo.localeCompare(b.OrderNo)
        break
      case 'partNo':
        comparison = a.PartNo.localeCompare(b.PartNo)
        break
      case 'startDate':
        comparison = new Date(a.ScheduledStartDate).getTime() - new Date(b.ScheduledStartDate).getTime()
        break
      case 'blockDate':
        comparison = (a.BlockDate === b.BlockDate) ? 0 : a.BlockDate ? -1 : 1
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              📋 Résultats
            </h2>
            <p className="text-amber-300 text-sm mt-1">
              {shopOrders.length} Shop Order{shopOrders.length > 1 ? 's' : ''} trouvé{shopOrders.length > 1 ? 's' : ''}
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

              {/* Part Description */}
              <th className="px-6 py-4 text-left text-sm font-medium text-amber-200">
                Description
              </th>

              {/* State */}
              <th className="px-6 py-4 text-left text-sm font-medium text-amber-200">
                State
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

                  {/* Part Description */}
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm">
                      {order.PartRevision || '-'}
                    </span>
                  </td>

                  {/* State */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 border border-green-700/50 text-green-200">
                      {order.State}
                    </span>
                  </td>

                  {/* Start Date */}
                  <td className="px-6 py-4">
                    <span className="text-gray-300 text-sm">
                      {new Date(order.ScheduledStartDate).toLocaleDateString('fr-FR')}
                    </span>
                  </td>

                  {/* Block Date */}
                  <td className="px-6 py-4">
                    {order.BlockDate ? (
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
