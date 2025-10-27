/**
 * ContextualHeader Component
 * Header compact qui affiche l'étape actuelle et les infos contextuelles
 */

'use client'

import { FileText, Hash, Building2 } from 'lucide-react'

type Step = 'entry' | 'confirmation' | 'customer-order' | 'selection' | 'print'

interface ContextualHeaderProps {
  currentStep: Step
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
  serialNumber,
  contract,
}: ContextualHeaderProps) {
  const getStepLabel = (step: Step): string => {
    const labels = {
      entry: 'Entry',
      confirmation: 'Confirmation',
      'customer-order': 'Customer Order',
      selection: 'Selection',
      print: 'Print',
    }
    return labels[step]
  }

  const getStepNumber = (step: Step): number => {
    const numbers = {
      entry: 1,
      confirmation: 2,
      'customer-order': 3,
      selection: 4,
      print: 5,
    }
    return numbers[step]
  }

  return (
    <div className="bg-gradient-to-r from-blue-950/95 to-cyan-950/95 border-b border-gray-700/50 backdrop-blur-xl sticky top-16 z-50 shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Badge étape compact */}
          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-600/50 rounded-lg text-blue-300 font-medium text-sm">
              <span className="text-blue-400 font-bold">Étape {getStepNumber(currentStep)}/5</span>
              <span className="text-gray-400">•</span>
              <span>{getStepLabel(currentStep)}</span>
            </span>
          </div>

          {/* Infos contextuelles compactes */}
          <div className="flex items-center gap-4 text-sm flex-wrap">
            {orderNo && (
              <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-lg">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-gray-400">Order:</span>
                <span className="text-white font-medium">{orderNo}</span>
              </div>
            )}

            {serialNumber && (
              <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-lg">
                <Hash className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-gray-400">Serial:</span>
                <span className="text-white font-medium">{serialNumber}</span>
              </div>
            )}

            {contract && (
              <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-lg">
                <Building2 className="w-3.5 h-3.5 text-green-400" />
                <span className="text-gray-400">Site:</span>
                <span className="text-white font-medium">{contract}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
