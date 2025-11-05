'use client'

import { FileText, Package, Hash, Building2 } from 'lucide-react'

interface ContextualHeaderProps {
  currentStep: number
  orderNo?: string
  releaseNo?: string
  sequenceNo?: string
  serialNumber?: string
  partNo?: string
  contract?: string
}

export function ContextualHeader({
  currentStep,
  orderNo,
  releaseNo,
  sequenceNo,
  serialNumber,
  partNo,
  contract,
}: ContextualHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          {/* Titre et badge étape */}
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Boat Configuration Editor</h1>
              <p className="text-sm text-cyan-300">Gestion des ordres de fabrication</p>
            </div>
            <div className="bg-blue-600/30 border border-blue-600/50 text-blue-200 text-sm font-semibold px-4 py-1.5 rounded-full">
              Étape {currentStep}/5
            </div>
          </div>

          {/* Infos contextuelles */}
          {(orderNo || serialNumber || partNo || contract) && (
            <div className="flex items-center gap-6 text-sm flex-wrap">
              {orderNo && (
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400">Order:</span>
                  <span className="text-white font-medium">{orderNo}</span>
                </div>
              )}

              {serialNumber && serialNumber !== 'N/A' && (
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-indigo-400" />
                  <span className="text-gray-400">Serial:</span>
                  <span className="text-white font-bold">{serialNumber}</span>
                </div>
              )}

              {partNo && (
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-400">Part:</span>
                  <span className="text-white font-medium truncate max-w-[200px]" title={partNo}>
                    {partNo}
                  </span>
                </div>
              )}

              {contract && (
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-green-400" />
                  <span className="text-gray-400">Site:</span>
                  <span className="text-white font-medium">{contract}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
