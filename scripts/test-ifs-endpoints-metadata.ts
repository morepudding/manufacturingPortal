/**
 * Test 1 - Vérification Métadonnées IFS Endpoints
 * 
 * Teste la connectivité et valide les métadonnées des 4 services IFS
 * nécessaires pour Part Printer.
 * 
 * Usage:
 *   npx tsx scripts/test-ifs-endpoints-metadata.ts
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
import { getIFSClient } from '../src/shared/services/ifs-client'

// Charger .env.local
const envPath = path.resolve(__dirname, '../.env.local')
console.log(`📁 Chargement variables d'environnement depuis: ${envPath}`)
dotenv.config({ path: envPath })

// Vérifier les variables requises
const requiredVars = ['IFS_CLIENT_ID', 'IFS_CLIENT_SECRET', 'IFS_TOKEN_URL', 'IFS_BASE_URL', 'IFS_SCOPE']
const missingVars = requiredVars.filter(v => !process.env[v])

if (missingVars.length > 0) {
  console.error(`\n❌ Variables d'environnement manquantes dans .env.local:`)
  missingVars.forEach(v => console.error(`   - ${v}`))
  console.error(`\nVérifiez que .env.local existe et contient toutes les variables IFS.\n`)
  process.exit(1)
}

console.log(`✅ Variables IFS chargées\n`)

interface TestResult {
  service: string
  endpoint: string
  status: 'success' | 'error'
  message: string
  details?: any
}

const results: TestResult[] = []

async function testMetadata(serviceName: string, serviceEndpoint: string): Promise<TestResult> {
  console.log(`\n📍 Test ${serviceName}`)
  console.log(`   Endpoint: ${serviceEndpoint}/$metadata`)
  
  try {
    const client = getIFSClient()
    
    // Appel métadonnées
    const response = await client.get(`${serviceEndpoint}/$metadata`) as any
    
    // OData v4 retourne JSON, pas XML
    const isValid = typeof response === 'object' && 
                    response !== null &&
                    (response.$Version === '4.01' || response.$Version === '4.0')
    
    if (isValid) {
      // Compter les types/entités
      const namespaces = Object.keys(response).filter(k => k.startsWith('IfsApp.'))
      const firstNamespace = namespaces[0]
      const types = firstNamespace ? Object.keys(response[firstNamespace]) : []
      
      console.log(`   ✅ Métadonnées OK (OData ${response.$Version})`)
      console.log(`   📊 Namespace: ${firstNamespace}`)
      console.log(`   📊 Types trouvés: ${types.length}`)
      
      return {
        service: serviceName,
        endpoint: serviceEndpoint,
        status: 'success',
        message: `✅ Métadonnées valides (OData ${response.$Version}, ${types.length} types)`,
        details: { version: response.$Version, namespace: firstNamespace, typeCount: types.length }
      }
    } else {
      console.log(`   ❌ Métadonnées invalides`)
      console.log(`   Réponse: ${JSON.stringify(response).substring(0, 200)}...`)
      
      return {
        service: serviceName,
        endpoint: serviceEndpoint,
        status: 'error',
        message: '❌ Métadonnées invalides',
        details: { response: JSON.stringify(response).substring(0, 500) }
      }
    }
    
  } catch (error: any) {
    console.log(`   ❌ Erreur: ${error.message}`)
    
    return {
      service: serviceName,
      endpoint: serviceEndpoint,
      status: 'error',
      message: `❌ Erreur: ${error.message}`,
      details: { error: error.toString() }
    }
  }
}

async function runTests() {
  console.log('==========================================')
  console.log('TEST 1 - Vérification Métadonnées IFS')
  console.log('==========================================')
  
  // Test 1.1 - SitesHandling
  results.push(await testMetadata(
    '1.1 - SitesHandling',
    'SitesHandling.svc'
  ))
  
  // Test 1.2 - ProductionLineHandling
  results.push(await testMetadata(
    '1.2 - ProductionLineHandling',
    'ProductionLineHandling.svc'
  ))
  
    // Test 1.3 : InventoryPartHandling.svc (Inventory Parts - alternative à PartService)
  const result3 = await testMetadata(
    'InventoryPartHandling',
    'InventoryPartHandling.svc'
  )
  results.push(result3)

  // Test 1.4 : EngineeringPartRevisionsHandling.svc
  
  // Test 1.4 - EngineeringPartRevisionsHandling
  results.push(await testMetadata(
    '1.4 - EngineeringPartRevisionsHandling',
    'EngineeringPartRevisionsHandling.svc'
  ))
  
  // Résumé
  console.log('\n==========================================')
  console.log('RÉSUMÉ TEST 1')
  console.log('==========================================\n')
  
  const successCount = results.filter(r => r.status === 'success').length
  const errorCount = results.filter(r => r.status === 'error').length
  
  results.forEach(result => {
    console.log(`${result.status === 'success' ? '✅' : '❌'} ${result.service}`)
    console.log(`   ${result.message}`)
  })
  
  console.log(`\n📊 Résultats: ${successCount}/${results.length} réussis`)
  
  if (errorCount > 0) {
    console.log(`\n⚠️  ${errorCount} erreur(s) détectée(s)`)
    console.log('\n🔍 Détails des erreurs:')
    results
      .filter(r => r.status === 'error')
      .forEach(result => {
        console.log(`\n❌ ${result.service}`)
        console.log(`   Endpoint: ${result.endpoint}`)
        console.log(`   Détails: ${JSON.stringify(result.details, null, 2)}`)
      })
  }
  
  console.log('\n==========================================')
  console.log(successCount === results.length ? '✅ TEST 1 RÉUSSI' : '❌ TEST 1 ÉCHOUÉ')
  console.log('==========================================\n')
  
  // Exit code
  process.exit(errorCount > 0 ? 1 : 0)
}

// Exécution
runTests().catch(error => {
  console.error('\n💥 Erreur fatale:', error)
  process.exit(1)
})
