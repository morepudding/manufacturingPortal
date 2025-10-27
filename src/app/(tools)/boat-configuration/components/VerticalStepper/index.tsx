'use client'

import { CheckCircle, Circle } from 'lucide-react'
import { cn } from '@/shared/utils/utils'

interface StepperStep {
  id: number
  label: string
  completed: boolean
  active: boolean
}

interface VerticalStepperProps {
  steps: StepperStep[]
}

export function VerticalStepper({ steps }: VerticalStepperProps) {
  return (
    <div className="w-24 bg-gray-900/50 border-r border-gray-800/50 backdrop-blur-sm fixed left-0 top-[88px] bottom-0 z-30">
      <div className="py-8 px-2 space-y-12">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            {/* Ligne de connexion */}
            {index < steps.length - 1 && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gray-700" />
            )}

            {/* Icône étape */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 relative',
                  step.active && 'bg-blue-600 text-white shadow-lg shadow-blue-600/50 scale-110',
                  step.completed && !step.active && 'bg-green-600/20 text-green-400 border-2 border-green-600',
                  !step.active && !step.completed && 'bg-gray-800 text-gray-500 border-2 border-gray-700'
                )}
              >
                {step.completed ? (
                  <CheckCircle className="w-6 h-6" strokeWidth={2.5} />
                ) : step.active ? (
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                ) : (
                  <span className="text-base font-bold">{step.id}</span>
                )}
              </div>

              {/* Label étape */}
              <span
                className={cn(
                  'text-[11px] font-medium text-center leading-tight transition-colors w-full',
                  step.active && 'text-blue-300 font-semibold',
                  step.completed && !step.active && 'text-green-400',
                  !step.active && !step.completed && 'text-gray-600'
                )}
              >
                {step.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
