/**
 * Service de gestion des langues IFS Cloud
 * 
 * Récupère la liste des langues disponibles pour l'impression des documents
 * 
 * @module language-service
 */

import { getIFSClient } from './ifs-client'
import { IFSODataResponse, IFSLanguage } from '@/shared/types/ifs'

/**
 * Récupère la liste des langues disponibles depuis IFS Cloud
 * 
 * @returns Promise<IFSLanguage[]> - Liste des langues
 * @throws Error si la requête échoue
 * 
 * @example
 * const languages = await getLanguages()
 * // [
 * //   { LanguageCode: "fr", LanguageName: "Français", ... },
 * //   { LanguageCode: "en", LanguageName: "English", ... }
 * // ]
 */
export async function getLanguages(): Promise<IFSLanguage[]> {
  console.log('🌐 Fetching languages from IFS Cloud...')
  
  try {
    const client = getIFSClient()
    
    // Requête vers PrintDialog.svc/LanguageCodeSet pour obtenir la liste des langues
    const response = await client.get<IFSODataResponse<IFSLanguage>>(
      'PrintDialog.svc/LanguageCodeSet',
      {
        $select: 'LangCode,Description',
        $top: '50',
      }
    )
    
    console.log(`✅ Found ${response.value.length} language(s)`)
    
    return response.value
  } catch (error) {
    console.error('❌ Error fetching languages:', error)
    throw new Error('Failed to fetch languages from IFS Cloud')
  }
}

/**
 * Récupère une langue spécifique par son code
 * 
 * @param languageCode - Code de la langue (ex: "fr", "en")
 * @returns Promise<IFSLanguage | null> - Langue trouvée ou null
 * 
 * @example
 * const language = await getLanguageByCode("fr")
 */
export async function getLanguageByCode(languageCode: string): Promise<IFSLanguage | null> {
  console.log(`🌐 Fetching language: ${languageCode}`)
  
  try {
    const languages = await getLanguages()
    const language = languages.find(l => l.LangCode === languageCode)
    
    if (language) {
      console.log(`✅ Language found: ${language.LangCode} - ${language.Description}`)
    } else {
      console.log(`❌ Language not found: ${languageCode}`)
    }
    
    return language || null
  } catch (error) {
    console.error('❌ Error fetching language by code:', error)
    return null
  }
}
