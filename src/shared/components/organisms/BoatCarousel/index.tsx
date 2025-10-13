/**
 * BoatCarousel Component v4
 * 
 * Carousel automatique affichant les bateaux Bénéteau
 * - Format carré (aspect-square) pour meilleur rendu
 * - Taille max-w-sm (24rem / 384px) pour masquer la basse résolution
 * - Auto-scroll avec transitions fluides
 * - Filtres CSS pour améliorer le rendu
 */

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const BOAT_IMAGES = [
  '/boatcarousel/téléchargement.jpg',
  '/boatcarousel/téléchargement (1).jpg',
  '/boatcarousel/téléchargement (2).jpg',
  '/boatcarousel/téléchargement (3).jpg',
  '/boatcarousel/téléchargement (4).jpg',
  '/boatcarousel/téléchargement (5).jpg',
  '/boatcarousel/téléchargement (6).jpg',
  '/boatcarousel/téléchargement (7).jpg',
]

export function BoatCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-scroll toutes les 4 secondes
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BOAT_IMAGES.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + BOAT_IMAGES.length) % BOAT_IMAGES.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BOAT_IMAGES.length)
  }

  return (
    <div 
      className="relative w-full aspect-square overflow-hidden bg-gray-900 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Images - avec quality optimisée et filtres anti-pixelisation */}
      <div className="relative w-full h-full">
        {BOAT_IMAGES.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative w-full h-full backdrop-blur-[0.5px]">
              <Image
                src={image}
                alt={`Bénéteau Boat ${index + 1}`}
                fill
                sizes="384px"
                quality={100}
                className="object-cover object-center scale-[1.03]"
                priority={index === 0}
                unoptimized={true}
                style={{
                  filter: 'contrast(1.12) saturate(1.25) brightness(1.08)',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Overlay gradient sobre */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Navigation buttons - Plus sobres */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-900/60 hover:bg-gray-800/80 backdrop-blur-sm text-white p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 border border-gray-700/50"
        aria-label="Previous boat"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900/60 hover:bg-gray-800/80 backdrop-blur-sm text-white p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 border border-gray-700/50"
        aria-label="Next boat"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators - Plus discrets */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {BOAT_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-6'
                : 'bg-white/40 hover:bg-white/60 w-1'
            }`}
            aria-label={`Go to boat ${index + 1}`}
          />
        ))}
      </div>

      {/* Pause indicator - Plus discret */}
      {isPaused && (
        <div className="absolute top-3 right-3 bg-gray-900/40 backdrop-blur-sm text-gray-300 px-2 py-0.5 rounded-md text-xs border border-gray-700/50">
          ⏸
        </div>
      )}
    </div>
  )
}
