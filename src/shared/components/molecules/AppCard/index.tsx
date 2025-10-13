/**
 * AppCard Component
 * 
 * Carte cliquable pour afficher les applications du Manufacturing Portal
 * Design moderne avec hover effects et icônes
 */

'use client'

import Image from 'next/image'
import Link from 'next/link'

interface AppCardProps {
  title: string
  description: string
  icon: string
  href: string
  available?: boolean
  comingSoon?: boolean
}

export function AppCard({ 
  title, 
  description, 
  icon, 
  href, 
  available = true,
  comingSoon = false 
}: AppCardProps) {
  const card = (
    <div
      className={`
        relative group overflow-hidden rounded-2xl border-2 transition-all duration-500
        ${available 
          ? 'border-gray-200 hover:border-blue-500 hover:shadow-2xl hover:scale-105 cursor-pointer' 
          : 'border-gray-200 opacity-60 cursor-not-allowed'
        }
        bg-white
      `}
    >
      {/* Coming Soon Badge */}
      {comingSoon && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold">
            Coming Soon
          </span>
        </div>
      )}

      {/* Icon Container */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-8 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/50 to-indigo-100/50 animate-pulse" />
        </div>

        <div className="relative w-32 h-32 transition-all duration-500 group-hover:scale-125 group-hover:rotate-6">
          <Image
            src={icon}
            alt={title}
            fill
            className="object-contain drop-shadow-lg"
          />
        </div>

        {/* Sparkle effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
          <div className="absolute bottom-8 left-8 w-3 h-3 bg-blue-400 rounded-full animate-bounce" />
          <div className="absolute top-1/2 right-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
        </div>

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition-all duration-500" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>

        {/* Action indicator */}
        {available && !comingSoon && (
          <div className="mt-4 flex items-center text-blue-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Open Application</span>
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>

      {/* Border animation on hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-2xl transition-all duration-300" />
    </div>
  )

  // Si disponible, wrapper dans un Link
  if (available && !comingSoon) {
    return (
      <Link href={href} className="block">
        {card}
      </Link>
    )
  }

  // Sinon, juste la carte
  return card
}
