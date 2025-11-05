/**
 * Test FINAL avec Shop Orders FR017 VALIDES
 * Fournis par l'utilisateur
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

interface AzurePrintPayload {
  Printer: string
  PrintModel: string
  Selection: string
}

interface AzurePrintResponse {
  Message?: string
  Success?: boolean
  JobId?: string
  error?: string
}

async function getAzureToken(): Promise<string> {
  console.log('🔐 Authentification Azure...')
  
  const params = new URLSearchParams({
    client_id: process.env.AZURE_PRINT_CLIENT_ID!,
    client_secret: process.env.AZURE_PRINT_CLIENT_SECRET!,
    scope: process.env.AZURE_PRINT_OAUTH_SCOPE!,
    grant_type: 'client_credentials',
  })

  const response = await fetch(process.env.AZURE_PRINT_OAUTH_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })

  const data = await response.json()
  
  if (!response.ok) {
    throw new Error(`OAuth failed: ${JSON.stringify(data)}`)
  }

  console.log('✅ Token obtenu\n')
  return data.access_token
}

async function testAzurePrintWithValidShopOrders(token: string) {
  console.log('╔════════════════════════════════════════════════════════════╗')
  console.log('║   🧪 TEST AVEC SHOP ORDERS FR017 VALIDES                  ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  // Shop Orders fournis par l'utilisateur
  const shopOrders = [
    { OrderNo: '495642', Contract: 'FR017', State: 'Released' },
    { OrderNo: '495643', Contract: 'FR017', State: 'Released' },
    { OrderNo: '495708', Contract: 'FR017', State: 'Released' },
  ]

  console.log('📋 Shop Orders à imprimer:')
  shopOrders.forEach((so, idx) => {
    console.log(`   ${idx + 1}. ORDER_NO=${so.OrderNo} (${so.Contract} - ${so.State})`)
  })

  // Générer le Selection string avec wildcards *
  const selectionString = shopOrders
    .map(so => `ORDER_NO=${so.OrderNo}^RELEASE_NO=*^SEQUENCE_NO=*^`)
    .join(';') + ';'

  console.log('\n📤 Selection string généré:')
  console.log(selectionString)

  // Payload complet
  const payload: AzurePrintPayload = {
    Printer: 'PRTBX105_P',
    PrintModel: 'BEN_MA_FO_CR_184.rdl',
    Selection: selectionString
  }

  console.log('\n📦 Payload complet:')
  console.log(JSON.stringify(payload, null, 2))

  console.log('\n⏳ Envoi requête à Azure Print API (timeout 120s)...\n')

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 120000)

  try {
    const response = await fetch(process.env.AZURE_PRINT_API_URL!, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.AZURE_PRINT_SUBSCRIPTION_KEY!,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    console.log('📊 Response Status:', response.status, response.statusText)
    
    const contentType = response.headers.get('content-type')
    console.log('📄 Content-Type:', contentType || 'N/A')

    let data: AzurePrintResponse

    if (contentType?.includes('application/json')) {
      data = await response.json()
      console.log('\n📄 Response Body (JSON):')
      console.log(JSON.stringify(data, null, 2))
    } else {
      const text = await response.text()
      console.log('\n📄 Response Body (Text):')
      console.log(text || '(vide)')
      data = { Message: text }
    }

    console.log('\n' + '═'.repeat(60))

    if (response.ok) {
      console.log('✅ ✅ ✅ SUCCESS!')
      console.log('═'.repeat(60))
      console.log('')
      console.log('🎉 L\'API Azure Print fonctionne avec les Shop Orders FR017!')
      console.log('')
      console.log('📌 Détails:')
      console.log(`   → Shop Orders: ${shopOrders.length} (FR017)`)
      console.log(`   → Layout IFS: ${payload.PrintModel}`)
      console.log(`   → Imprimante: ${payload.Printer}`)
      console.log(`   → Format Selection: wildcards * pour RELEASE_NO et SEQUENCE_NO`)
      console.log('')
      console.log('✅ Prochaine étape: Intégrer dans Part Printer!')
      
      return { success: true, data }
    } else {
      console.log('❌ ÉCHEC')
      console.log('═'.repeat(60))
      console.log('')
      console.log(`⚠️  Status HTTP: ${response.status}`)
      console.log(`⚠️  Message: ${data.Message || data.error || 'Unknown error'}`)
      console.log('')
      console.log('💡 Causes possibles:')
      console.log('   - Shop Orders invalides en DEV')
      console.log('   - Layout BEN_MA_FO_CR_184.rdl non déployé')
      console.log('   - Imprimante PRTBX105_P non configurée')
      console.log('   - Format Selection incorrect')
      
      return { success: false, error: data }
    }

  } catch (error: any) {
    clearTimeout(timeoutId)
    
    console.log('❌ ERREUR RÉSEAU')
    console.log('═'.repeat(60))
    
    if (error.name === 'AbortError') {
      console.log('')
      console.log('⏱️  Timeout après 120 secondes')
      console.log('')
      console.log('💡 L\'API prend trop de temps à répondre.')
      console.log('   Possible que IFS génère les étiquettes en arrière-plan.')
    } else {
      console.log('')
      console.log(`❌ Erreur: ${error.message}`)
    }
    
    throw error
  }
}

async function main() {
  console.clear()
  console.log('╔════════════════════════════════════════════════════════════╗')
  console.log('║   Azure Print API - Test Final FR017                      ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const startTime = Date.now()

  try {
    // 1. Authentification
    const token = await getAzureToken()

    // 2. Test avec Shop Orders valides
    const result = await testAzurePrintWithValidShopOrders(token)

    const duration = ((Date.now() - startTime) / 1000).toFixed(2)

    console.log('')
    console.log('╔════════════════════════════════════════════════════════════╗')
    console.log('║   ✅ TEST TERMINÉ                                          ║')
    console.log(`║   Durée: ${duration}s                                          ║`)
    console.log('╚════════════════════════════════════════════════════════════╝')

    if (result.success) {
      console.log('')
      console.log('✅ L\'API est opérationnelle !')
      console.log('   Tu peux maintenant intégrer dans Part Printer.')
      process.exit(0)
    } else {
      console.log('')
      console.log('⚠️  L\'API a répondu mais avec une erreur.')
      console.log('   Contacte le créateur avec les détails ci-dessus.')
      process.exit(1)
    }

  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2)

    console.log('')
    console.log('╔════════════════════════════════════════════════════════════╗')
    console.log('║   ❌ TEST ÉCHOUÉ                                           ║')
    console.log(`║   Durée: ${duration}s                                          ║`)
    console.log('╚════════════════════════════════════════════════════════════╝')

    console.error('')
    console.error('❌ Erreur fatale:', error)
    
    process.exit(1)
  }
}

main()
