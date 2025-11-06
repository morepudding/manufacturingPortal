/**
 * Script de test du Report MA_FO_CR_1419
 * 
 * Teste si le Report existe en essayant de générer un PrintResultKey
 * 
 * Usage: npx tsx scripts/test-report-ma-fo-cr-1419.ts
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
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.IFS_CLIENT_ID!,
      client_secret: process.env.IFS_CLIENT_SECRET!,
      scope: process.env.IFS_SCOPE!,
    }),
  })

  const data = await response.json()
  return data.access_token
}

/**
 * Tester un Report ID sur une Customer Order
 */
async function testReport(token: string, orderNo: string, reportId: string) {
  const baseUrl = process.env.IFS_BASE_URL!
  
  console.log(`\n🧪 Test du Report: ${reportId}`)
  console.log(`   Customer Order: ${orderNo}`)
  console.log(`   ─────────────────────────────────────────────────────────`)

  try {
    // 1. GET Customer Order + ETag
    console.log(`   1️⃣  GET Customer Order...`)
    const getUrl = `${baseUrl}/CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')`
    const getResponse = await fetch(getUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    })

    if (!getResponse.ok) {
      console.log(`   ❌ Customer Order non trouvé (${getResponse.status})`)
      return { success: false, error: 'Order not found' }
    }

    const orderData = await getResponse.json()
    const etag = orderData['@odata.etag']
    console.log(`   ✅ Order trouvé, ETag récupéré`)

    // 2. POST PrintResultKey
    console.log(`   2️⃣  POST PrintResultKey...`)
    const printKeyUrl = `${baseUrl}/CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey`
    
    const printKeyResponse = await fetch(printKeyUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'If-Match': etag,
      },
      body: JSON.stringify({
        ReportId: reportId
      }),
    })

    if (printKeyResponse.ok) {
      const resultData = await printKeyResponse.json()
      const resultKey = resultData.value
      console.log(`   ✅ SUCCESS - ResultKey: ${resultKey}`)
      
      // 3. POST PrintDialogInit pour récupérer le Layout
      console.log(`   3️⃣  POST PrintDialogInit...`)
      const dialogUrl = `${baseUrl}/PrintDialog.svc/PrintDialogInit`
      const dialogResponse = await fetch(dialogUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ResultKey: parseInt(resultKey)
        }),
      })

      if (dialogResponse.ok) {
        const dialogData = await dialogResponse.json()
        console.log(`   ✅ Layout récupéré: ${dialogData.LayoutName}`)
        console.log(`   📋 Report Title: ${dialogData.ReportTitle}`)
        
        return {
          success: true,
          resultKey,
          layout: dialogData.LayoutName,
          title: dialogData.ReportTitle,
        }
      } else {
        console.log(`   ⚠️  PrintDialogInit échoué (${dialogResponse.status})`)
        return {
          success: true,
          resultKey,
          layout: 'Unknown',
        }
      }
    } else {
      const errorText = await printKeyResponse.text()
      console.log(`   ❌ FAILED - Status: ${printKeyResponse.status}`)
      console.log(`   Error: ${errorText.substring(0, 300)}`)
      
      return {
        success: false,
        error: errorText,
        status: printKeyResponse.status,
      }
    }
  } catch (error) {
    console.log(`   ❌ Exception: ${error instanceof Error ? error.message : 'Unknown'}`)
    return { success: false, error }
  }
}

/**
 * Main
 */
async function main() {
  console.log('═══════════════════════════════════════════════════════════')
  console.log('🎯 TEST DES REPORTS IFS CLOUD AST')
  console.log('═══════════════════════════════════════════════════════════')

  const token = await getIFSToken()
  console.log('✅ Token OAuth2 récupéré\n')

  // Customer Order de test (récupérée dans l'exploration)
  const testOrder = 'C1000038587' // Order connue fonctionnelle

  const reports = [
    {
      id: 'CUSTOMER_ORDER_CONF_REP',
      description: 'Report IFS standard (✅ validé en DEV)'
    },
    {
      id: 'MA_FO_CR_1419',
      description: 'Report custom Bénéteau (⏳ à valider)'
    },
    {
      id: 'CUSTOMER_ORDER_PRINT_REP',
      description: 'Report IFS alternatif'
    },
  ]

  const results: any[] = []

  for (const report of reports) {
    console.log(`\n📋 ${report.description}`)
    const result = await testReport(token, testOrder, report.id)
    results.push({
      reportId: report.id,
      description: report.description,
      ...result,
    })
  }

  // Résumé
  console.log('\n\n═══════════════════════════════════════════════════════════')
  console.log('📊 RÉSUMÉ DES TESTS')
  console.log('═══════════════════════════════════════════════════════════\n')

  console.log('| Report ID                    | Status | Layout                                    |')
  console.log('|------------------------------|--------|-------------------------------------------|')
  
  for (const result of results) {
    const status = result.success ? '✅ OK  ' : '❌ FAIL'
    const layout = result.layout || 'N/A'
    const reportId = result.reportId.padEnd(28)
    const layoutDisplay = layout.substring(0, 40)
    console.log(`| ${reportId} | ${status} | ${layoutDisplay} |`)
  }

  console.log('\n')

  // Recommandations
  console.log('💡 RECOMMANDATIONS')
  console.log('───────────────────────────────────────────────────────────\n')

  const mafoReport = results.find(r => r.reportId === 'MA_FO_CR_1419')
  
  if (mafoReport?.success) {
    console.log('✅ Report MA_FO_CR_1419 TROUVÉ en AST !')
    console.log(`   Layout: ${mafoReport.layout}`)
    console.log(`   Titre: ${mafoReport.title || 'N/A'}`)
    console.log('')
    console.log('   ✅ Ce Report peut être utilisé en PROD')
    console.log('   ✅ Modifier le code pour utiliser MA_FO_CR_1419 au lieu de CUSTOMER_ORDER_CONF_REP')
  } else {
    console.log('❌ Report MA_FO_CR_1419 NON TROUVÉ en AST')
    console.log('')
    console.log('   Actions requises:')
    console.log('   1. Vérifier avec l\'équipe IFS si ce Report existe en PROD')
    console.log('   2. Si oui, demander création en AST pour tests')
    console.log('   3. Si non, utiliser CUSTOMER_ORDER_CONF_REP en attendant')
    console.log('   4. Planifier la création du Report custom Bénéteau')
  }

  console.log('\n═══════════════════════════════════════════════════════════')
  console.log('✅ Tests terminés')
  console.log('═══════════════════════════════════════════════════════════\n')

  // Sauvegarder les résultats
  const fs = await import('fs')
  const outputPath = './scripts/report-test-results.json'
  fs.writeFileSync(outputPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    environment: 'AST',
    testOrder,
    results,
  }, null, 2))
  console.log(`💾 Résultats sauvegardés: ${outputPath}\n`)
}

main().catch(console.error)
