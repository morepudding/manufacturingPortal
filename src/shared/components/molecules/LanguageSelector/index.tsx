/**
 * LanguageSelector Component
 * 
 * Composant de sélection de langue avec drapeaux visuels
 * Affiche les drapeaux des pays pour une sélection plus intuitive
 */

'use client'

import { Label } from '@/shared/components/atoms/Label'
import Image from 'next/image'

interface Language {
  LangCode: string
  Description: string
}

interface LanguageSelectorProps {
  languages: Language[]
  value: string
  onChange: (langCode: string) => void
  loading?: boolean
  required?: boolean
}

// Mapping des codes de langue vers les drapeaux
const FLAG_MAP: Record<string, string> = {
  'en': '/drapeau/etats-unis.png',
  'EN': '/drapeau/etats-unis.png',
  'fr': '/drapeau/france.png',
  'FR': '/drapeau/france.png',
  'it': '/drapeau/italie.png',
  'IT': '/drapeau/italie.png',
  'pl': '/drapeau/pologne.png',
  'PL': '/drapeau/pologne.png',
  'pt': '/drapeau/portugal.png',
  'PT': '/drapeau/portugal.png',
  'da': '/drapeau/danois.png',
  'DA': '/drapeau/danois.png',
}

// Noms complets des langues pour améliorer l'UX
const LANGUAGE_NAMES: Record<string, string> = {
  'en': 'English',
  'EN': 'English',
  'fr': 'Français',
  'FR': 'Français',
  'it': 'Italiano',
  'IT': 'Italiano',
  'pl': 'Polski',
  'PL': 'Polski',
  'pt': 'Português',
  'PT': 'Português',
  'da': 'Dansk',
  'DA': 'Dansk',
}

export function LanguageSelector({ 
  languages, 
  value, 
  onChange, 
  loading = false,
  required = false 
}: LanguageSelectorProps) {
  const selectedLanguage = languages.find(l => l.LangCode === value)

  // Filtrer pour afficher uniquement les langues avec drapeaux disponibles
  const availableLanguages = languages.filter(lang => FLAG_MAP[lang.LangCode])

  return (
    <div>
      <Label htmlFor="language">
        Language {required && <span className="text-red-500">*</span>}
      </Label>

      {loading ? (
        <div className="text-sm text-gray-500 py-2">Loading languages...</div>
      ) : availableLanguages.length === 0 ? (
        <div className="text-sm text-red-500">No languages available</div>
      ) : (
        <div>
          {/* Affichage de la langue sélectionnée */}
          {selectedLanguage ? (
            <div className="mb-3 flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-md p-3">
              {FLAG_MAP[selectedLanguage.LangCode] && (
                <Image
                  src={FLAG_MAP[selectedLanguage.LangCode]}
                  alt={LANGUAGE_NAMES[selectedLanguage.LangCode] || selectedLanguage.LangCode}
                  width={32}
                  height={24}
                  className="rounded shadow-sm border border-gray-300"
                />
              )}
              <div className="flex-1">
                <div className="font-semibold text-blue-900">
                  {LANGUAGE_NAMES[selectedLanguage.LangCode] || selectedLanguage.LangCode}
                </div>
                {selectedLanguage.Description && (
                  <div className="text-sm text-blue-700">{selectedLanguage.Description}</div>
                )}
              </div>
              <button
                type="button"
                onClick={() => onChange('')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Change
              </button>
            </div>
          ) : (
            <>
              {/* Grille de sélection avec drapeaux */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {availableLanguages.map((language) => (
                  <button
                    key={language.LangCode}
                    type="button"
                    onClick={() => onChange(language.LangCode)}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg border-2 transition-all
                      ${value === language.LangCode 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }
                    `}
                  >
                    {FLAG_MAP[language.LangCode] && (
                      <Image
                        src={FLAG_MAP[language.LangCode]}
                        alt={LANGUAGE_NAMES[language.LangCode] || language.LangCode}
                        width={40}
                        height={30}
                        className="rounded shadow-sm border border-gray-300"
                      />
                    )}
                    <div className="text-left flex-1">
                      <div className="font-medium text-gray-900">
                        {LANGUAGE_NAMES[language.LangCode] || language.LangCode}
                      </div>
                      <div className="text-xs text-gray-500">{language.LangCode}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Fallback: dropdown classique pour les langues sans drapeau */}
              {languages.length > availableLanguages.length && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900">
                    Show other languages ({languages.length - availableLanguages.length} more)
                  </summary>
                  <select
                    id="language-fallback"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Select a language --</option>
                    {languages
                      .filter(lang => !FLAG_MAP[lang.LangCode])
                      .map((language) => (
                        <option key={language.LangCode} value={language.LangCode}>
                          {language.LangCode}
                          {language.Description ? ` - ${language.Description}` : ''}
                        </option>
                      ))}
                  </select>
                </details>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
