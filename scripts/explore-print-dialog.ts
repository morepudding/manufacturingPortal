/**
 * Script d'exploration de l'API PrintDialog IFS Cloud
 * 
 * Teste différents endpoints pour trouver où sont stockés les Reports
 * 
 * Usage: npx tsx scripts/explore-print-dialog.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'

// Charger .env.local
config({ path: resolve(process.cwd(), '.env.local') })

/**
 * Récupérer un token OAuth2 IFS
 */
async function getIFSToken(): Promise<string> {
  const tokenUrl = process.env.IFS_TOKEN_URL!
  const clientId = process.env.IFS_CLIENT_ID!
  const clientSecret = process.env.IFS_CLIENT_SECRET!
  const scope = process.env.IFS_SCOPE!

  console.log('🔐 Récupération token OAuth2 IFS...')

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: scope,
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to get token: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  console.log('✅ Token récupéré\n')
  return data.access_token
}

/**
 * Tester un endpoint
 */
async function testEndpoint(token: string, endpoint: string, description: string) {
  const baseUrl = process.env.IFS_BASE_URL!
  const url = `${baseUrl}/${endpoint}`

  console.log(`🔍 Test: ${description}`)
  console.log(`   URL: ${endpoint}`)

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.json()
      console.log(`   ✅ Status: ${response.status}`)
      
      if (data.value && Array.isArray(data.value)) {
        console.log(`   📊 Résultats: ${data.value.length} éléments`)
        if (data.value.length > 0) {
          console.log(`   🔑 Propriétés: ${Object.keys(data.value[0]).join(', ')}`)
          console.log(`   📄 Premier élément:`)
          console.log(JSON.stringify(data.value[0], null, 2).split('\n').map(line => `      ${line}`).join('\n'))
        }
      } else {
        console.log(`   📊 Type réponse: ${typeof data}`)
      }
      
      return { success: true, data }
    } else {
      const errorText = await response.text()
      console.log(`   ❌ Status: ${response.status} ${response.statusText}`)
      console.log(`   Error: ${errorText.substring(0, 200)}`)
      return { success: false, error: errorText }
    }
  } catch (error) {
    console.log(`   ❌ Erreur: ${error instanceof Error ? error.message : 'Unknown error'}`)
    return { success: false, error }
  } finally {
    console.log('')
  }
}

/**
 * Main
 */
async function main() {
  try {
    console.log('🚀 Exploration de l\'API PrintDialog IFS Cloud AST\n')
    console.log(`Base URL: ${process.env.IFS_BASE_URL}\n`)
    console.log('═══════════════════════════════════════════════════════════\n')

    const token = await getIFSToken()

    const endpoints = [
      {
        endpoint: 'PrintDialog.svc',
        description: 'Métadonnées du service PrintDialog'
      },
      {
        endpoint: 'PrintDialog.svc/$metadata',
        description: 'Schéma XML complet du service'
      },
      {
        endpoint: 'PrintDialog.svc/LogicalPrinterSet?$top=10',
        description: 'Liste des imprimantes (10 premières)'
      },
      {
        endpoint: 'PrintDialog.svc/PdfArchiveSet?$top=5',
        description: 'Archives PDF récentes (5 premières)'
      },
      {
        endpoint: 'CustomerOrderHandling.svc/CustomerOrderSet?$top=1',
        description: 'Test Customer Order (1 seul)'
      }
    ]

    console.log('TESTS DES ENDPOINTS\n')
    console.log('═══════════════════════════════════════════════════════════\n')

    for (const { endpoint, description } of endpoints) {
      await testEndpoint(token, endpoint, description)
    }

    console.log('═══════════════════════════════════════════════════════════')
    console.log('✅ Exploration terminée')
    console.log('═══════════════════════════════════════════════════════════\n')

    console.log('💡 RECOMMANDATION:')
    console.log('   Les Reports sont associés aux entités (Customer Order, Shop Order, etc.)')
    console.log('   Pas de LogicalReportSet global disponible.')
    console.log('')
    console.log('   Pour tester MA_FO_CR_1419:')
    console.log('   1. Utiliser une Customer Order test')
    console.log('   2. POST PrintResultKey avec ReportId: "MA_FO_CR_1419"')
    console.log('   3. Vérifier si IFS accepte ce Report ID\n')

  } catch (error) {
    console.error('\n❌ Erreur:', error)
    process.exit(1)
  }
}

main()
