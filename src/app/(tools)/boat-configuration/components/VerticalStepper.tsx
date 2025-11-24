/**
 * VerticalStepper Component
 * Stepper vertical sur le côté gauche avec indicateurs visuels
 */

'use client'

import { CheckCircle, Circle } from 'lucide-react'
import { cn } from '@/shared/utils/utils'

type Step = 'entry' | 'confirmation' | 'print'

interface StepperStep {
  id: number
  label: string
  step: Step
  completed: boolean
  active: boolean
}

interface VerticalStepperProps {
  steps: StepperStep[]
}

export function VerticalStepper({ steps }: VerticalStepperProps) {
  return (
    <div className="w-28 bg-gray-900/80 border-r border-gray-700/50 backdrop-blur-xl fixed left-0 top-0 bottom-0 z-40 shadow-xl">
      <div className="pt-32 pb-10 px-4 space-y-10">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            {/* Ligne de connexion */}
            {index < steps.length - 1 && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-gray-700" />
            )}

            {/* Icône étape */}
            <div className="flex flex-col items-center gap-3">
              <div
                className={cn(
                  'w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2',
                  step.active && 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/50 scale-110',
                  step.completed && !step.active && 'bg-green-600/20 text-green-400 border-green-600',
                  !step.active && !step.completed && 'bg-gray-800 text-gray-500 border-gray-700'
                )}
              >
                {step.completed ? (
                  <CheckCircle className="w-7 h-7" />
                ) : step.active ? (
                  <Circle className="w-7 h-7 fill-current" />
                ) : (
                  <span className="text-lg font-bold">{step.id}</span>
                )}
              </div>

              {/* Label étape */}
              <span
                className={cn(
                  'text-xs font-medium text-center leading-tight transition-colors max-w-[90px]',
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
