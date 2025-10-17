/**
 * Manufacturing Portal - Home Page v4
 * 
 * Design futuriste et professionnel avec :
 * - Particules flottantes animées
 * - Animations d'entrée séquentielles
 * - Parallax sur les orbes
 * - Micro-interactions (vibration, scale, etc)
 * - Sobriété et professionnalisme
 */

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BoatCarousel } from '@/shared/components/organisms/BoatCarousel'

type Language = 'fr' | 'en'

// Particules flottantes
interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

const TRANSLATIONS = {
  fr: {
    hero: {
      title: 'Outils de Production',
      subtitle: 'Sélectionnez votre application',
    },
    apps: {
      boat: {
        title: 'Boat Configuration Editor',
        description: 'Gestion des ordres de fabrication et impression des documents de configuration.',
        action: 'Accéder',
      },
      part: {
        title: 'Part Printer',
        description: 'Impression des étiquettes pour les pièces en bois.',
        action: 'Accéder',
      },
    },
    carousel: {
      title: 'Nos Bateaux Bénéteau',
    },
  },
  en: {
    hero: {
      title: 'Production Tools',
      subtitle: 'Select your application',
    },
    apps: {
      boat: {
        title: 'Boat Configuration Editor',
        description: 'Manage manufacturing orders and print configuration documents.',
        action: 'Access',
      },
      part: {
        title: 'Part Printer',
        description: 'Print labels for wood parts.',
        action: 'Access',
      },
    },
    carousel: {
      title: 'Our Bénéteau Boats',
    },
  },
}

export default function Home() {
  const [lang, setLang] = useState<Language>('en')  // Défaut: anglais
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const t = TRANSLATIONS[lang]

  // Générer particules flottantes au montage
  useEffect(() => {
    const generatedParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }))
    setParticles(generatedParticles)
  }, [])

  // Parallax effect sur le mouvement de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 overflow-hidden">
      {/* Language Switcher - Plus sobre */}
      <div className="fixed top-24 right-6 z-50 flex gap-2">
        <button
          onClick={() => setLang('fr')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 active:scale-95 ${
            lang === 'fr'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 backdrop-blur-sm border border-gray-700'
          }`}
        >
          🇫🇷 FR
        </button>
        <button
          onClick={() => setLang('en')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 active:scale-95 ${
            lang === 'en'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 backdrop-blur-sm border border-gray-700'
          }`}
        >
          🇬🇧 EN
        </button>
      </div>

      <main className="relative pt-20 pb-16 px-4">
        {/* Animated Background avec Parallax */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl transition-transform duration-1000 ease-out"
            style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
          />
          <div 
            className="absolute top-1/2 -right-48 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl transition-transform duration-1000 ease-out"
            style={{ transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)` }}
          />
          <div 
            className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl transition-transform duration-1000 ease-out"
            style={{ transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)` }}
          />
        </div>

        {/* Particules flottantes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-blue-400/20"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animation: `float ${particle.duration}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Hero - Animation d'entrée séquentielle */}
        <section className="relative max-w-7xl mx-auto mb-16">
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight animate-in fade-in slide-in-from-top duration-700">
              {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-light animate-in fade-in slide-in-from-top duration-700 delay-150">
              {t.hero.subtitle}
            </p>
          </div>
        </section>

        {/* Applications */}
        <section className="relative max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Boat Config - Animation entrée décalée */}
            <Link href="/boat-configuration" className="animate-in fade-in slide-in-from-bottom duration-700 delay-200">
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-600/30 hover:border-blue-600/50 cursor-pointer active:scale-[0.98] h-full flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/10 group-hover:to-indigo-600/10 transition-all duration-300" />
                
                <div className="relative mb-6 flex justify-center">
                  <div className="relative w-32 h-32 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2">
                    <Image
                      src="/app/BoatConfigurationEditor.png"
                      alt="Boat Configuration Editor"
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>

                <div className="relative space-y-3">
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                    {t.apps.boat.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {t.apps.boat.description}
                  </p>

                  <div className="pt-4">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium shadow-lg group-hover:shadow-blue-600/50 transition-all duration-200 active:scale-95">
                      <span>{t.apps.boat.action}</span>
                      <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Part Printer - Animation entrée décalée */}
            <Link href="/part-printer" className="animate-in fade-in slide-in-from-bottom duration-700 delay-300">
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-600/30 hover:border-amber-600/50 cursor-pointer active:scale-[0.98] h-full flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/0 to-orange-600/0 group-hover:from-amber-600/10 group-hover:to-orange-600/10 transition-all duration-300" />
                
                <div className="relative mb-6 flex justify-center">
                  <div className="relative w-32 h-32 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2">
                    <Image
                      src="/app/WoodPartPrinter.png"
                      alt="Part Printer"
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>

                <div className="relative space-y-3">
                  <h3 className="text-xl font-semibold text-white group-hover:text-amber-300 transition-colors duration-300">
                    {t.apps.part.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {t.apps.part.description}
                  </p>

                  <div className="pt-4">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium shadow-lg group-hover:shadow-amber-600/50 transition-all duration-200 active:scale-95">
                      <span>{t.apps.part.action}</span>
                      <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Placeholder - Animation entrée décalée */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/20 to-gray-900/20 backdrop-blur-xl border border-dashed border-gray-700/50 p-8 flex flex-col items-center justify-center h-full animate-in fade-in slide-in-from-bottom duration-700 delay-400">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-gray-800/30 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-500">{lang === 'fr' ? 'Plus à venir' : 'More Coming'}</h3>
                <p className="text-gray-600 text-sm">{lang === 'fr' ? 'Nouveaux outils en développement' : 'New tools in development'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Carousel - Compact et sobre */}
        <section className="relative max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-500">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-300">
            {t.carousel.title}
          </h2>
          <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-gray-800 max-w-sm mx-auto">
            <BoatCarousel />
          </div>
        </section>
      </main>

      {/* Animations CSS personnalisées */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
      `}</style>
    </div>
  )
}
