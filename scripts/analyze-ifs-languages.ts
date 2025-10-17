/**
 * Script d'analyse des langues IFS Cloud
 * 
 * Explore les langues disponibles et leurs propriétés pour l'impression
 * 
 * Usage: npx tsx scripts/analyze-ifs-languages.ts
 */

import { getIFSClient } from '../src/shared/services/ifs-client'

interface IFSLanguage {
  LangCode: string
  Description: string
  Status?: string
  LangCodeRfc3066?: string
  Installed?: boolean
  EnabledForLogin?: boolean
  // Autres propriétés potentielles
  [key: string]: any
}

interface IFSODataResponse<T> {
  '@odata.context': string
  value: T[]
}

async function analyzeLanguages() {
  console.log('🌐 === ANALYSE DES LANGUES IFS CLOUD ===\n')
  
  try {
    const client = getIFSClient()
    
    // 1. Récupération de toutes les langues disponibles
    console.log('📋 1. Récupération de toutes les langues disponibles...\n')
    
    const response = await client.get<IFSODataResponse<IFSLanguage>>(
      'PrintDialog.svc/LanguageCodeSet',
      {
        $top: '100',
      }
    )
    
    console.log(`✅ Trouvé ${response.value.length} langue(s)\n`)
    console.log('=' .repeat(120))
    
    // 2. Affichage détaillé de chaque langue
    console.log('\n📊 2. Détails de chaque langue:\n')
    
    response.value.forEach((lang, index) => {
      console.log(`\n${index + 1}. ${lang.LangCode} - ${lang.Description}`)
      console.log('-'.repeat(100))
      
      // Afficher toutes les propriétés
      Object.keys(lang).forEach(key => {
        if (key !== 'LangCode' && key !== 'Description') {
          console.log(`   ${key}: ${JSON.stringify(lang[key])}`)
        }
      })
    })
    
    // 3. Statistiques
    console.log('\n\n📈 3. Statistiques:\n')
    console.log(`   Total de langues: ${response.value.length}`)
    
    const installed = response.value.filter(l => l.Installed === true).length
    const enabledForLogin = response.value.filter(l => l.EnabledForLogin === true).length
    
    console.log(`   Langues installées: ${installed}`)
    console.log(`   Langues activées pour login: ${enabledForLogin}`)
    
    // 4. Codes de langues disponibles
    console.log('\n\n📝 4. Codes de langues disponibles (pour impression):\n')
    const langCodes = response.value.map(l => l.LangCode).sort()
    console.log(`   [${langCodes.map(c => `"${c}"`).join(', ')}]`)
    
    // 5. Mapping RFC 3066 (si disponible)
    console.log('\n\n🌍 5. Mapping RFC 3066 (codes standards internationaux):\n')
    response.value.forEach(lang => {
      if (lang.LangCodeRfc3066) {
        console.log(`   ${lang.LangCode} → ${lang.LangCodeRfc3066} (${lang.Description})`)
      }
    })
    
    // 6. Test d'une requête avec filtre
    console.log('\n\n🔍 6. Test de récupération d\'une langue spécifique (fr):\n')
    
    const frResponse = await client.get<IFSODataResponse<IFSLanguage>>(
      'PrintDialog.svc/LanguageCodeSet',
      {
        $filter: "LangCode eq 'fr'",
      }
    )
    
    if (frResponse.value.length > 0) {
      console.log('   ✅ Langue française trouvée:')
      console.log(`   Code: ${frResponse.value[0].LangCode}`)
      console.log(`   Description: ${frResponse.value[0].Description}`)
      console.log(`   RFC 3066: ${frResponse.value[0].LangCodeRfc3066}`)
      console.log(`   Installée: ${frResponse.value[0].Installed}`)
      console.log(`   Login activé: ${frResponse.value[0].EnabledForLogin}`)
    } else {
      console.log('   ❌ Langue française non trouvée')
    }
    
    // 7. Vérification des langues utilisées dans le code
    console.log('\n\n✅ 7. Vérification des langues utilisées dans le code:\n')
    
    const usedLanguages = ['fr', 'en', 'da', 'it', 'pl', 'pt']
    console.log(`   Langues documentées: ${usedLanguages.join(', ')}`)
    
    const availableInIFS = usedLanguages.filter(code => 
      response.value.some(l => l.LangCode === code)
    )
    
    const missingInIFS = usedLanguages.filter(code => 
      !response.value.some(l => l.LangCode === code)
    )
    
    console.log(`\n   ✅ Disponibles dans IFS: ${availableInIFS.join(', ')}`)
    if (missingInIFS.length > 0) {
      console.log(`   ❌ Manquantes dans IFS: ${missingInIFS.join(', ')}`)
    }
    
    // 8. Recherche d'autres endpoints de langue
    console.log('\n\n🔍 8. Recherche d\'autres endpoints liés aux langues...\n')
    
    try {
      // Test IsoLanguage (codes ISO)
      const isoResponse = await client.get<IFSODataResponse<any>>(
        'PrintDialog.svc/IsoLanguageSet',
        { $top: '10' }
      )
      console.log(`   ✅ IsoLanguageSet trouvé: ${isoResponse.value.length} entrées`)
      console.log(`   Exemple: ${JSON.stringify(isoResponse.value[0], null, 2)}`)
    } catch (error: any) {
      console.log(`   ❌ IsoLanguageSet non disponible: ${error.message}`)
    }
    
    // 9. Recommandations
    console.log('\n\n💡 9. RECOMMANDATIONS:\n')
    console.log('   1. Utiliser LanguageCode dans les requêtes d\'impression IFS')
    console.log('   2. Valider que le code langue existe avant l\'envoi')
    console.log('   3. Prévoir une langue par défaut (fr) en fallback')
    console.log('   4. Mapper les codes RFC 3066 pour l\'internationalisation frontend')
    console.log('   5. Documenter les langues supportées par le layout (BEN_Boat_configuration_for_production.rdl)')
    
    console.log('\n\n✅ === ANALYSE TERMINÉE ===\n')
    
  } catch (error: any) {
    console.error('❌ Erreur lors de l\'analyse:', error.message)
    if (error.response) {
      console.error('   Response:', error.response.data)
    }
    process.exit(1)
  }
}

// Exécution
analyzeLanguages()
