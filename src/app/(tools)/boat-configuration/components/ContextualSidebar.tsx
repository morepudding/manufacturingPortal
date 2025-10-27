/**
 * ContextualSidebar Component
 * Sidebar droite qui affiche les infos contextuelles au fur et à mesure
 */

'use client'

import { FileText, Hash, Package, Building2, User } from 'lucide-react'

interface ContextualSidebarProps {
  orderNo?: string
  releaseNo?: string
  sequenceNo?: string
  serialNumber?: string
  partNo?: string
  partDescription?: string
  contract?: string
  customerOrderNo?: string
}

export function ContextualSidebar({
  orderNo,
  releaseNo,
  sequenceNo,
  serialNumber,
  partNo,
  partDescription,
  contract,
  customerOrderNo,
}: ContextualSidebarProps) {
  // Si aucune donnée, afficher des placeholders
  const hasData = orderNo || serialNumber || partNo || contract || customerOrderNo

  return (
    <div className="w-80 bg-gray-900/80 border-l border-gray-700/50 backdrop-blur-xl fixed right-0 top-0 bottom-0 z-40 shadow-xl overflow-y-auto">
      <div className="pt-24 p-6 space-y-6">
        {/* Titre */}
        <div className="border-b border-gray-700/50 pb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            Récapitulatif
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {hasData ? 'Informations de la configuration' : 'En attente des données...'}
          </p>
        </div>

        {/* Shop Order Info */}
        {orderNo && (
          <div className="space-y-3">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Shop Order
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">Order No</div>
                <div className="text-base font-bold text-white">{orderNo}</div>
              </div>
              {releaseNo && (
                <div>
                  <div className="text-xs text-gray-500 mb-1">Release No</div>
                  <div className="text-sm font-medium text-gray-300">{releaseNo}</div>
                </div>
              )}
              {sequenceNo && (
                <div>
                  <div className="text-xs text-gray-500 mb-1">Sequence No</div>
                  <div className="text-sm font-medium text-gray-300">{sequenceNo}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Serial Number */}
        {serialNumber && (
          <div className="space-y-3">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Serial Number
            </div>
            <div className="bg-cyan-900/20 border border-cyan-600/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Hash className="w-6 h-6 text-cyan-400" />
                <div className="text-xl font-bold text-cyan-100">{serialNumber}</div>
              </div>
            </div>
          </div>
        )}

        {/* Part Info */}
        {partNo && (
          <div className="space-y-3">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Part Information
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
              <div>
                <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                  <Package className="w-3 h-3" />
                  Part No
                </div>
                <div className="text-sm font-bold text-white">{partNo}</div>
              </div>
              {partDescription && (
                <div>
                  <div className="text-xs text-gray-500 mb-1">Description</div>
                  <div className="text-xs text-gray-300 leading-relaxed">{partDescription}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contract / Site */}
        {contract && (
          <div className="space-y-3">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Site
            </div>
            <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-green-400" />
                <div className="text-lg font-bold text-green-100">{contract}</div>
              </div>
            </div>
          </div>
        )}

        {/* Customer Order */}
        {customerOrderNo && (
          <div className="space-y-3">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Customer Order
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-purple-400" />
                <div className="text-sm font-bold text-white">{customerOrderNo}</div>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder si pas de données */}
        {!hasData && (
          <div className="space-y-4 pt-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-800/30 rounded-lg p-4 animate-pulse">
                <div className="h-3 bg-gray-700/50 rounded w-1/3 mb-3"></div>
                <div className="h-6 bg-gray-700/50 rounded"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
