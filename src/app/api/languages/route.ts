/**
 * API Route: GET /api/languages
 * 
 * Récupère la liste des langues disponibles depuis IFS Cloud
 * 
 * @returns {IFSLanguage[]} Liste des langues
 * @returns {error} Message d'erreur en cas d'échec
 */

import { NextResponse } from 'next/server'
import { getLanguages } from '@/lib/language-service'

export async function GET() {
  console.log('🔍 API Request: GET /api/languages')
  
  try {
    // Récupération de la liste des langues
    const languages = await getLanguages()
    
    console.log(`✅ Successfully fetched ${languages.length} language(s)`)
    
    return NextResponse.json({
      success: true,
      data: languages,
      count: languages.length,
    })
  } catch (error) {
    console.error('❌ API Error: Failed to fetch languages', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch languages',
      },
      { status: 500 }
    )
  }
}
