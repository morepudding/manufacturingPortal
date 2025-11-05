/**
 * ShopOrderSummary Component
 * 
 * Affiche un résumé compact des Shop Orders avec:
 * - Nombre total de Shop Orders
 * - Liste des parts avec quantités
 * - Bouton pour déplier/replier la table complète
 */

'use client'

import { useState } from 'react'
import { ShopOrderTable } from './ShopOrderTable'
import type { IFSShopOrderExtended } from '@/tools/part-printer/types'

interface ShopOrderSummaryProps {
  shopOrders: IFSShopOrderExtended[]
  selectedOrders: Set<string>
  onSelectionChange: (orderId: string, checked: boolean) => void
  onSelectAll: (checked: boolean) => void
  loading?: boolean
}

interface PartSummary {
  partNo: string
  count: number
  shopOrders: string[] // Liste des Shop Orders pour ce part
}

export function ShopOrderSummary({
  shopOrders,
  selectedOrders,
  onSelectionChange,
  onSelectAll,
  loading = false,
}: ShopOrderSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Calculer le résumé des parts
  const partSummaries = shopOrders.reduce((acc, order) => {
    const partNo = order.PartNo
    const shopOrderId = `${order.OrderNo}-${order.ReleaseNo}-${order.SequenceNo}`
    
    if (!acc[partNo]) {
      acc[partNo] = {
        partNo,
        count: 0,
        shopOrders: [],
      }
    }
    
    acc[partNo].count++
    acc[partNo].shopOrders.push(shopOrderId)
    
    return acc
  }, {} as Record<string, PartSummary>)

  const partSummaryArray = Object.values(partSummaries).sort((a, b) => b.count - a.count)
  const totalShopOrders = shopOrders.length
  const totalParts = partSummaryArray.length

  return (
    <div className="space-y-4">
      {/* Résumé Compact */}
      <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                📋 Résumé
              </h2>
              <p className="text-amber-300 text-sm mt-1">
                {totalShopOrders} Shop Order{totalShopOrders > 1 ? 's' : ''} • {totalParts} Part{totalParts > 1 ? 's' : ''} différent{totalParts > 1 ? 's' : ''}
              </p>
            </div>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-lg transition-all flex items-center gap-2"
            >
              {isExpanded ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Masquer les détails
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Voir les détails
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stats rapides */}
        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Total Shop Orders</div>
            <div className="text-2xl font-bold text-white">{totalShopOrders}</div>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Parts différents</div>
            <div className="text-2xl font-bold text-amber-400">{totalParts}</div>
          </div>
          
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Sélectionnés</div>
            <div className="text-2xl font-bold text-emerald-400">{selectedOrders.size}</div>
          </div>
        </div>

        {/* Liste des parts avec quantités */}
        <div className="px-6 py-4 border-t border-gray-700/50">
          <h3 className="text-sm font-medium text-amber-200 mb-3">Parts à imprimer :</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
            {partSummaryArray.map((part) => (
              <div 
                key={part.partNo} 
                className="bg-gray-900/50 rounded-lg p-3 flex items-center justify-between hover:bg-gray-900/70 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-white font-mono text-sm truncate" title={part.partNo}>
                    {part.partNo}
                  </div>
                  <div className="text-gray-400 text-xs mt-1">
                    {part.shopOrders.length} étiquette{part.shopOrders.length > 1 ? 's' : ''}
                  </div>
                </div>
                <div className="ml-3 px-3 py-1 bg-amber-900/50 rounded-full">
                  <span className="text-amber-300 font-bold text-sm">×{part.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table détaillée (collapsible) */}
      {isExpanded && (
        <div className="animate-in fade-in slide-in-from-top duration-300">
          <ShopOrderTable
            shopOrders={shopOrders}
            selectedOrders={selectedOrders}
            onSelectionChange={onSelectionChange}
            onSelectAll={onSelectAll}
            loading={loading}
          />
        </div>
      )}
    </div>
  )
}
