/**
 * Test Azure Print API avec le FORMAT CORRECT
 * 
 * Format fourni par le créateur:
 * {
 *   "Printer": "PRTBX109 - MAFOPR183",
 *   "PrintModel": "BEN_MA_FO_CR_184.rdl",
 *   "Selection": "ORDER_NO=2259^RELEASE_NO=*^SEQUENCE_NO=*^;..."
 * }
 */

interface OAuthTokenResponse {
  token_type: string
  expires_in: number
  access_token: string
}

interface AzurePrintResponse {
  Message?: string
  Success?: boolean
  JobId?: string
  error?: string
}

/**
 * Obtenir le token OAuth2
 */
async function getAccessToken(): Promise<string> {
  console.log('🔐 Requesting OAuth2 token...')
  
  const params = new URLSearchParams({
    client_id: process.env.AZURE_PRINT_CLIENT_ID!,
    client_secret: process.env.AZURE_PRINT_CLIENT_SECRET!,
    scope: process.env.AZURE_PRINT_OAUTH_SCOPE!,
    grant_type: 'client_credentials',
  })

  const response = await fetch(process.env.AZURE_PRINT_OAUTH_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })

  const data = await response.json() as OAuthTokenResponse
  
  if (!response.ok) {
    throw new Error(`OAuth failed: ${JSON.stringify(data)}`)
  }

  console.log('✅ Token obtained\n')
  return data.access_token
}

/**
 * Tester l'API avec le format correct
 */
async function testCorrectFormat(token: string) {
  console.log('╔════════════════════════════════════════════════════════════╗')
  console.log('║   🧪 TEST AVEC LE FORMAT CORRECT                          ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  // Payload au format CORRECT fourni par le créateur
  // Utiliser des Shop Orders connus (de Boat Configuration)
  const payload = {
    Printer: 'PRTBX105_P',
    PrintModel: 'BEN_MA_FO_CR_184.rdl',
    Selection: 'ORDER_NO=563^RELEASE_NO=1^SEQUENCE_NO=10^;ORDER_NO=949^RELEASE_NO=1^SEQUENCE_NO=10^;ORDER_NO=1043^RELEASE_NO=1^SEQUENCE_NO=10^;'
  }

  console.log('📤 Request Payload:')
  console.log(JSON.stringify(payload, null, 2))
  console.log()

  try {
    console.log('⏳ Sending request (timeout 120s - patience !)...\n')
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 120000) // 120s timeout (2 minutes)

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
    console.log('📄 Content-Type:', contentType)

    let data: AzurePrintResponse
    
    if (contentType?.includes('application/json')) {
      data = await response.json()
      console.log('\n📄 Response Body (JSON):')
      console.log(JSON.stringify(data, null, 2))
    } else {
      const text = await response.text()
      console.log('\n📄 Response Body (Text):')
      console.log(text)
      data = { Message: text }
    }

    if (response.ok) {
      console.log('\n✅ SUCCESS!')
      console.log('   → L\'API a accepté le format avec PrintModel')
      console.log('   → IFS va utiliser le layout BEN_MA_FO_CR_184.rdl')
      console.log('   → Les étiquettes seront générées par IFS')
    } else {
      console.log('\n❌ FAILED')
      console.log('   → Vérifier le format ou les données')
    }

    return data

  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.log('❌ Request TIMEOUT (120s)')
      console.log('   → L\'API prend vraiment trop de temps à répondre')
      console.log('   → Possible que IFS génère les étiquettes en arrière-plan')
      console.log('   → Ou que les Shop Orders n\'existent pas')
    } else {
      console.log('❌ Request FAILED')
      console.log('   Error:', error.message)
    }
    throw error
  }
}

/**
 * Analyser le format Selection
 */
function analyzeSelectionFormat() {
  console.log('\n╔════════════════════════════════════════════════════════════╗')
  console.log('║   📋 ANALYSE DU FORMAT SELECTION                          ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const exampleSelection = 'ORDER_NO=2259^RELEASE_NO=*^SEQUENCE_NO=*^;ORDER_NO=2525^RELEASE_NO=*^SEQUENCE_NO=*^;ORDER_NO=1689^RELEASE_NO=*^SEQUENCE_NO=*^;'

  console.log('📝 Format découvert:')
  console.log('   → Séparateur entre Shop Orders: ";"')
  console.log('   → Séparateur entre champs: "^"')
  console.log('   → Format par Shop Order: ORDER_NO=XXX^RELEASE_NO=*^SEQUENCE_NO=*^')
  console.log('   → Wildcard: "*" pour RELEASE_NO et SEQUENCE_NO')
  console.log()

  console.log('🔍 Parsing exemple:')
  const orders = exampleSelection.split(';').filter(s => s.trim())
  orders.forEach((order, idx) => {
    const fields = order.split('^').reduce((acc, field) => {
      const [key, value] = field.split('=')
      if (key && value) acc[key] = value
      return acc
    }, {} as Record<string, string>)
    
    console.log(`   Shop Order ${idx + 1}:`)
    console.log(`      ORDER_NO: ${fields.ORDER_NO}`)
    console.log(`      RELEASE_NO: ${fields.RELEASE_NO}`)
    console.log(`      SEQUENCE_NO: ${fields.SEQUENCE_NO}`)
  })

  console.log()
  console.log('💡 Pour Part Printer:')
  console.log('   → Collecter tous les Shop Orders filtrés')
  console.log('   → Générer le string Selection au format ci-dessus')
  console.log('   → Envoyer à l\'API Azure Print')
  console.log('   → IFS utilise le layout BEN_MA_FO_CR_184.rdl')
  console.log('   → IFS génère et imprime les étiquettes')
}

/**
 * Générer un Selection string depuis des Shop Orders
 */
function generateSelectionString(shopOrders: Array<{orderNo: string, releaseNo: string, sequenceNo: string}>): string {
  return shopOrders
    .map(order => `ORDER_NO=${order.orderNo}^RELEASE_NO=${order.releaseNo}^SEQUENCE_NO=${order.sequenceNo}^`)
    .join(';') + ';'
}

/**
 * Main
 */
async function main() {
  console.clear()
  console.log('╔════════════════════════════════════════════════════════════╗')
  console.log('║   Azure Print API - Test Format Correct                   ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  try {
    // 1. Analyser le format Selection
    analyzeSelectionFormat()

    // 2. Tester avec OAuth2 + Format correct
    const token = await getAccessToken()
    const result = await testCorrectFormat(token)

    // 3. Exemple de génération
    console.log('\n╔════════════════════════════════════════════════════════════╗')
    console.log('║   💻 EXEMPLE D\'UTILISATION                                ║')
    console.log('╚════════════════════════════════════════════════════════════╝\n')

    const exampleOrders = [
      { orderNo: '2259', releaseNo: '*', sequenceNo: '*' },
      { orderNo: '2525', releaseNo: '*', sequenceNo: '*' },
      { orderNo: '1689', releaseNo: '*', sequenceNo: '*' },
    ]

    const selectionString = generateSelectionString(exampleOrders)
    console.log('📝 Shop Orders:')
    console.log(JSON.stringify(exampleOrders, null, 2))
    console.log()
    console.log('📤 Selection string généré:')
    console.log(selectionString)

    console.log('\n✅ Tests terminés!')

  } catch (error) {
    console.error('\n❌ Test failed:', error)
    process.exit(1)
  }
}

main()
