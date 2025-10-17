#!/usr/bin/env tsx
/**
 * Script pour lister TOUS les Reports et Layouts disponibles dans IFS Cloud AST
 * 
 * Objectifs:
 * 1. Trouver tous les Reports disponibles (pas que CUSTOMER_ORDER_CONF_REP)
 * 2. Expliquer la différence Report vs Layout
 * 3. Chercher le layout BEN_Boat_configuration_for_production.rdl
 */

import { config } from 'dotenv'
import { resolve } from 'path'

// Charger les variables d'environnement depuis .env.local
config({ path: resolve(process.cwd(), '.env.local') })

interface OAuthTokenResponse {
  access_token: string
  expires_in: number
  token_type: string
}

interface LogicalReport {
  ReportId: string
  Description?: string
  Module?: string
  ReportDefinition?: string
  Layouts?: string[]
}

interface ReportLayout {
  LayoutName: string
  ReportId?: string
  Description?: string
  LayoutType?: string
}

interface PrintJob {
  ResultKey: number
  LayoutName?: string
  ReportId?: string
  ReportTitle?: string
}

/**
 * Récupérer le token OAuth2
 */
async function getAccessToken(): Promise<string> {
  const tokenUrl = process.env.IFS_TOKEN_URL
  const clientId = process.env.IFS_CLIENT_ID
  const clientSecret = process.env.IFS_CLIENT_SECRET
  const scope = process.env.IFS_SCOPE

  if (!tokenUrl || !clientId || !clientSecret) {
    throw new Error('❌ Variables IFS manquantes dans .env.local')
  }

  console.log('🔐 Récupération token OAuth2...')
  
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: scope || 'openid',
    }),
  })

  if (!response.ok) {
    throw new Error(`❌ Erreur OAuth2: ${response.status} ${response.statusText}`)
  }

  const data: OAuthTokenResponse = await response.json()
  console.log('✅ Token obtenu\n')
  return data.access_token
}

/**
 * Explorer les endpoints pour trouver les Reports
 */
async function exploreReportEndpoints(token: string) {
  const baseUrl = process.env.IFS_BASE_URL
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📊 EXPLORATION DES ENDPOINTS REPORTS')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  // 1. Essayer LogicalReportSet (peu probable mais on tente)
  console.log('1️⃣ Test: LogicalReportSet')
  try {
    const response = await fetch(
      `${baseUrl}/PrintDialog.svc/LogicalReportSet`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      }
    )
    
    if (response.ok) {
      const data = await response.json()
      console.log(`✅ SUCCESS! Trouvé ${data.value?.length || 0} reports`)
      console.log(JSON.stringify(data, null, 2))
      return data.value
    } else {
      console.log(`❌ Échec: ${response.status} - ${response.statusText}`)
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error}`)
  }

  // 2. Essayer ReportDefinitionSet
  console.log('\n2️⃣ Test: ReportDefinitionSet')
  try {
    const response = await fetch(
      `${baseUrl}/PrintDialog.svc/ReportDefinitionSet`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      }
    )
    
    if (response.ok) {
      const data = await response.json()
      console.log(`✅ SUCCESS! Trouvé ${data.value?.length || 0} definitions`)
      console.log(JSON.stringify(data, null, 2))
      return data.value
    } else {
      console.log(`❌ Échec: ${response.status} - ${response.statusText}`)
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error}`)
  }

  // 3. Essayer ArchivePrintJobSet (pour voir les reports utilisés récemment)
  console.log('\n3️⃣ Test: ArchivePrintJobSet (reports récents)')
  try {
    const response = await fetch(
      `${baseUrl}/PrintDialog.svc/ArchivePrintJobSet?$top=50`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      }
    )
    
    if (response.ok) {
      const data = await response.json()
      console.log(`✅ SUCCESS! Trouvé ${data.value?.length || 0} print jobs archivés`)
      
      // Extraire les Report IDs uniques
      const reportIds = new Set<string>()
      const layoutNames = new Set<string>()
      
      data.value?.forEach((job: PrintJob) => {
        if (job.ReportId) reportIds.add(job.ReportId)
        if (job.LayoutName) layoutNames.add(job.LayoutName)
      })
      
      console.log('\n📋 Reports utilisés récemment:')
      reportIds.forEach(id => console.log(`   - ${id}`))
      
      console.log('\n📄 Layouts utilisés récemment:')
      layoutNames.forEach(name => console.log(`   - ${name}`))
      
      return Array.from(reportIds)
    } else {
      console.log(`❌ Échec: ${response.status} - ${response.statusText}`)
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error}`)
  }

  return null
}

/**
 * Explorer les layouts disponibles
 */
async function exploreLayoutEndpoints(token: string) {
  const baseUrl = process.env.IFS_BASE_URL
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📄 EXPLORATION DES LAYOUTS')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  // 1. Essayer ReportLayoutSet
  console.log('1️⃣ Test: ReportLayoutSet')
  try {
    const response = await fetch(
      `${baseUrl}/PrintDialog.svc/ReportLayoutSet`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      }
    )
    
    if (response.ok) {
      const data = await response.json()
      console.log(`✅ SUCCESS! Trouvé ${data.value?.length || 0} layouts`)
      console.log(JSON.stringify(data, null, 2))
      return data.value
    } else {
      console.log(`❌ Échec: ${response.status} - ${response.statusText}`)
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error}`)
  }

  // 2. Essayer ReportLayoutDefinitionSet
  console.log('\n2️⃣ Test: ReportLayoutDefinitionSet')
  try {
    const response = await fetch(
      `${baseUrl}/PrintDialog.svc/ReportLayoutDefinitionSet`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      }
    )
    
    if (response.ok) {
      const data = await response.json()
      console.log(`✅ SUCCESS! Trouvé ${data.value?.length || 0} layout definitions`)
      console.log(JSON.stringify(data, null, 2))
      return data.value
    } else {
      console.log(`❌ Échec: ${response.status} - ${response.statusText}`)
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error}`)
  }

  // 3. Chercher le layout spécifique demandé
  console.log('\n3️⃣ Recherche: BEN_Boat_configuration_for_production.rdl')
  const searchTerm = 'BEN_Boat_configuration_for_production.rdl'
  
  try {
    // Essayer avec $filter
    const response = await fetch(
      `${baseUrl}/PrintDialog.svc/ReportLayoutSet?$filter=contains(LayoutName,'${searchTerm}')`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      }
    )
    
    if (response.ok) {
      const data = await response.json()
      if (data.value?.length > 0) {
        console.log(`✅ TROUVÉ! Layout existe:`)
        console.log(JSON.stringify(data.value, null, 2))
      } else {
        console.log('❌ Layout NOT FOUND')
      }
    } else {
      console.log(`❌ Échec recherche: ${response.status}`)
    }
  } catch (error) {
    console.log(`❌ Erreur: ${error}`)
  }

  return null
}

/**
 * Tester des Reports Customer Order connus
 */
async function testKnownReports(token: string) {
  const baseUrl = process.env.IFS_BASE_URL
  const testOrderNo = 'C1000038587' // Order de test validé
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('🧪 TEST DES REPORTS CUSTOMER ORDER CONNUS')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  const reportsToTest = [
    'CUSTOMER_ORDER_CONF_REP', // ✅ Validé précédemment
    'CUSTOMER_ORDER_PRINT_REP',
    'CUSTOMER_ORDER_REP',
    'CUSTOMER_ORDER_PICKING_LIST',
    'CUSTOMER_ORDER_DELIVERY_NOTE',
    'CUSTOMER_ORDER_INVOICE',
    'SHOP_ORDER_PRINT_REP',
    'SHOP_ORDER_TRAVELER',
    'MA_FO_CR_1419', // Le fameux Report manquant
  ]

  const results: Array<{report: string, success: boolean, layout?: string, error?: string}> = []

  // 1. Récupérer l'Order
  console.log(`📦 Récupération Customer Order ${testOrderNo}...\n`)
  const orderResponse = await fetch(
    `${baseUrl}/CustomerOrderHandling.svc/CustomerOrders('${testOrderNo}')`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    }
  )

  if (!orderResponse.ok) {
    console.log('❌ Impossible de récupérer le Customer Order')
    return results
  }

  const orderData = await orderResponse.json()
  const etag = orderResponse.headers.get('etag')

  console.log(`✅ Order récupéré (ETag: ${etag?.substring(0, 20)}...)\n`)

  // 2. Tester chaque Report
  for (const reportId of reportsToTest) {
    console.log(`\n🧪 Test Report: ${reportId}`)
    console.log('─'.repeat(60))
    
    try {
      const response = await fetch(
        `${baseUrl}/CustomerOrderHandling.svc/CustomerOrders('${testOrderNo}')/PrintResultKey`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'If-Match': etag || '*',
          },
          body: JSON.stringify({
            ReportId: reportId,
          }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        console.log(`✅ SUCCESS`)
        console.log(`   ResultKey: ${data.ResultKey}`)
        console.log(`   Layout: ${data.LayoutName || 'N/A'}`)
        console.log(`   Title: ${data.ReportTitle || 'N/A'}`)
        
        results.push({
          report: reportId,
          success: true,
          layout: data.LayoutName,
        })
      } else {
        const errorText = await response.text()
        console.log(`❌ FAILED (${response.status})`)
        console.log(`   Error: ${errorText.substring(0, 200)}...`)
        
        results.push({
          report: reportId,
          success: false,
          error: `${response.status}: ${errorText.substring(0, 100)}`,
        })
      }
    } catch (error) {
      console.log(`❌ EXCEPTION: ${error}`)
      results.push({
        report: reportId,
        success: false,
        error: String(error),
      })
    }
  }

  return results
}

/**
 * Fonction principale
 */
async function main() {
  try {
    console.clear()
    console.log('╔════════════════════════════════════════════════════════════╗')
    console.log('║  🔍 EXPLORATION COMPLÈTE: REPORTS & LAYOUTS IFS CLOUD     ║')
    console.log('╚════════════════════════════════════════════════════════════╝\n')
    
    // 1. Authentification
    const token = await getAccessToken()
    
    // 2. Explorer les endpoints Reports
    await exploreReportEndpoints(token)
    
    // 3. Explorer les endpoints Layouts
    await exploreLayoutEndpoints(token)
    
    // 4. Tester les Reports Customer Order connus
    const reportResults = await testKnownReports(token)
    
    // 5. Synthèse finale
    console.log('\n\n╔════════════════════════════════════════════════════════════╗')
    console.log('║  📊 SYNTHÈSE FINALE                                        ║')
    console.log('╚════════════════════════════════════════════════════════════╝\n')
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🔍 DIFFÉRENCE REPORT vs LAYOUT')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('📋 REPORT (Report ID):')
    console.log('   - Définit QUOI imprimer (données source)')
    console.log('   - Exemple: CUSTOMER_ORDER_CONF_REP')
    console.log('   - Lié à une entité IFS (CustomerOrder, ShopOrder, etc.)')
    console.log('   - Contient la logique métier (queries SQL, filtres)')
    console.log('')
    console.log('📄 LAYOUT (Layout Name):')
    console.log('   - Définit COMMENT afficher (mise en page)')
    console.log('   - Exemple: BEN_Inventory-BAT.rdl')
    console.log('   - Fichier .rdl (SSRS Report Definition)')
    console.log('   - Contient le design visuel (polices, colonnes, logos)')
    console.log('')
    console.log('🔗 RELATION:')
    console.log('   - 1 Report peut avoir PLUSIEURS Layouts')
    console.log('   - Le même Report peut s\'afficher en A4 portrait, paysage, etc.')
    console.log('   - Layout choisi au moment de l\'impression')
    console.log('')
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('✅ REPORTS DISPONIBLES & VALIDÉS')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    const successfulReports = reportResults.filter(r => r.success)
    const failedReports = reportResults.filter(r => !r.success)
    
    successfulReports.forEach(r => {
      console.log(`✅ ${r.report}`)
      console.log(`   └─ Layout: ${r.layout || 'N/A'}`)
    })
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('❌ REPORTS NON DISPONIBLES')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    failedReports.forEach(r => {
      console.log(`❌ ${r.report}`)
      console.log(`   └─ ${r.error}`)
    })
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('🎯 RECOMMANDATIONS')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    
    console.log('1. Layout BEN_Boat_configuration_for_production.rdl:')
    console.log('   → Status à déterminer après exploration')
    console.log('')
    console.log('2. Report MA_FO_CR_1419:')
    console.log('   → ❌ N\'existe PAS en AST')
    console.log('   → À vérifier en PROD ou à créer')
    console.log('')
    console.log('3. Alternative court terme:')
    console.log('   → Utiliser CUSTOMER_ORDER_CONF_REP (validé ✅)')
    console.log('   → Créer Layout custom BEN_Boat_configuration_for_production.rdl')
    console.log('   → Associer au Report existant')
    console.log('')

    // Sauvegarder les résultats
    const fs = await import('fs/promises')
    await fs.writeFile(
      './scripts/reports-layouts-exploration.json',
      JSON.stringify({
        timestamp: new Date().toISOString(),
        reports: reportResults,
        summary: {
          total: reportResults.length,
          success: successfulReports.length,
          failed: failedReports.length,
        },
      }, null, 2)
    )
    
    console.log('💾 Résultats sauvegardés: ./scripts/reports-layouts-exploration.json')
    
  } catch (error) {
    console.error('💥 Erreur:', error)
    process.exit(1)
  }
}

main()
