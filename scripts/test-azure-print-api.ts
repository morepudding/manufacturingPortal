/**
 * Test Azure Print API
 * 
 * Script pour tester la connexion à l'API d'impression Azure Bénéteau ERP Boat
 * 
 * Usage:
 *   npx tsx scripts/test-azure-print-api.ts
 */

interface OAuthTokenResponse {
  token_type: string
  expires_in: number
  access_token: string
}

interface PrintResponse {
  success?: boolean
  jobId?: string
  message?: string
  error?: string
  code?: string
  timestamp?: string
}

/**
 * Étape 1 : Obtenir un access token OAuth2
 */
async function getAccessToken(): Promise<string> {
  console.log('🔐 Requesting OAuth2 access token...')
  
  const clientId = process.env.AZURE_PRINT_CLIENT_ID
  const clientSecret = process.env.AZURE_PRINT_CLIENT_SECRET
  const oauthUrl = process.env.AZURE_PRINT_OAUTH_URL
  const scope = process.env.AZURE_PRINT_OAUTH_SCOPE

  if (!clientId || !clientSecret || !oauthUrl || !scope) {
    throw new Error('❌ Missing required environment variables. Check .env.local')
  }

  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: scope,
    grant_type: 'client_credentials',
  })

  console.log(`   OAuth URL: ${oauthUrl}`)
  console.log(`   Client ID: ${clientId.substring(0, 8)}...`)
  console.log(`   Scope: ${scope}`)

  try {
    const response = await fetch(oauthUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    const data = await response.json() as OAuthTokenResponse

    if (!response.ok) {
      console.error('❌ OAuth request failed:', JSON.stringify(data, null, 2))
      throw new Error(`OAuth failed with status ${response.status}`)
    }

    console.log(`✅ Access token obtained (expires in ${data.expires_in}s)`)
    console.log(`   Token preview: ${data.access_token.substring(0, 50)}...`)
    
    return data.access_token
  } catch (error) {
    console.error('❌ Failed to get access token:', error)
    throw error
  }
}

/**
 * Étape 2 : Tester l'API Print avec un PDF minimal
 */
async function testPrintAPI(accessToken: string): Promise<PrintResponse> {
  console.log('\n🖨️ Testing Print API...')
  
  const apiUrl = process.env.AZURE_PRINT_API_URL
  const subscriptionKey = process.env.AZURE_PRINT_SUBSCRIPTION_KEY

  if (!apiUrl || !subscriptionKey) {
    throw new Error('❌ Missing AZURE_PRINT_API_URL or AZURE_PRINT_SUBSCRIPTION_KEY')
  }

  // PDF minimal valide (une page vide)
  const minimalPdf = Buffer.from([
    0x25, 0x50, 0x44, 0x46, 0x2D, 0x31, 0x2E, 0x34, 0x0A, 0x25, 0xE2, 0xE3,
    0xCF, 0xD3, 0x0A, 0x33, 0x20, 0x30, 0x20, 0x6F, 0x62, 0x6A, 0x0A, 0x3C,
    0x3C, 0x2F, 0x54, 0x79, 0x70, 0x65, 0x2F, 0x50, 0x61, 0x67, 0x65, 0x2F,
    0x50, 0x61, 0x72, 0x65, 0x6E, 0x74, 0x20, 0x32, 0x20, 0x30, 0x20, 0x52,
    0x2F, 0x43, 0x6F, 0x6E, 0x74, 0x65, 0x6E, 0x74, 0x73, 0x20, 0x34, 0x20,
    0x30, 0x20, 0x52, 0x3E, 0x3E, 0x0A, 0x65, 0x6E, 0x64, 0x6F, 0x62, 0x6A
  ]).toString('base64')

  const requestBody = {
    printerName: 'PRTBX105_P',
    documentName: 'test-azure-api.pdf',
    documentBase64: minimalPdf,
    copies: 1,
    metadata: {
      testMode: true,
      timestamp: new Date().toISOString(),
      source: 'test-azure-print-api.ts'
    }
  }

  console.log(`   API URL: ${apiUrl}`)
  console.log(`   Printer: ${requestBody.printerName}`)
  console.log(`   Document: ${requestBody.documentName}`)
  console.log(`   PDF Size: ${minimalPdf.length} bytes (base64)`)

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json() as PrintResponse

    console.log(`\n📊 Response Status: ${response.status} ${response.statusText}`)
    console.log('📄 Response Body:')
    console.log(JSON.stringify(data, null, 2))

    if (response.ok) {
      console.log('\n✅ Print API is accessible and responding!')
      if (data.jobId) {
        console.log(`   Job ID: ${data.jobId}`)
      }
    } else {
      console.log('\n⚠️ Print API returned an error')
      if (data.error) {
        console.log(`   Error: ${data.error}`)
      }
      if (data.code) {
        console.log(`   Code: ${data.code}`)
      }
    }

    return data
  } catch (error) {
    console.error('❌ Failed to call Print API:', error)
    throw error
  }
}

/**
 * Étape 3 : Tester avec requête OPTIONS (CORS check)
 */
async function testCORS(): Promise<void> {
  console.log('\n🌐 Testing CORS (OPTIONS request)...')
  
  const apiUrl = process.env.AZURE_PRINT_API_URL
  
  if (!apiUrl) {
    throw new Error('❌ Missing AZURE_PRINT_API_URL')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'OPTIONS',
    })

    console.log(`   Status: ${response.status}`)
    console.log(`   CORS Headers:`)
    console.log(`     Access-Control-Allow-Origin: ${response.headers.get('Access-Control-Allow-Origin') || 'NOT SET'}`)
    console.log(`     Access-Control-Allow-Methods: ${response.headers.get('Access-Control-Allow-Methods') || 'NOT SET'}`)
    console.log(`     Access-Control-Allow-Headers: ${response.headers.get('Access-Control-Allow-Headers') || 'NOT SET'}`)

    if (response.ok || response.status === 204) {
      console.log('✅ CORS appears to be configured')
    } else {
      console.log('⚠️ CORS might not be configured properly')
    }
  } catch (error) {
    console.error('❌ CORS test failed:', error)
  }
}

/**
 * Main function
 */
async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗')
  console.log('║   Azure Print API - Connection Test                       ║')
  console.log('║   Bénéteau ERP Boat - Manufacturing Portal                ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  const startTime = Date.now()

  try {
    // Vérifier les variables d'environnement
    console.log('📋 Checking environment variables...')
    const requiredVars = [
      'AZURE_PRINT_CLIENT_ID',
      'AZURE_PRINT_CLIENT_SECRET',
      'AZURE_PRINT_OAUTH_URL',
      'AZURE_PRINT_API_URL',
      'AZURE_PRINT_OAUTH_SCOPE',
      'AZURE_PRINT_SUBSCRIPTION_KEY',
    ]

    const missing = requiredVars.filter(v => !process.env[v])
    
    if (missing.length > 0) {
      console.error('❌ Missing environment variables:')
      missing.forEach(v => console.error(`   - ${v}`))
      console.error('\n💡 Add them to .env.local file')
      process.exit(1)
    }
    
    console.log(`✅ All ${requiredVars.length} required variables are set\n`)

    // Test 1: OAuth2
    console.log('═══════════════════════════════════════════════════════════')
    console.log('TEST 1: OAuth2 Authentication')
    console.log('═══════════════════════════════════════════════════════════')
    const token = await getAccessToken()

    // Test 2: Print API
    console.log('\n═══════════════════════════════════════════════════════════')
    console.log('TEST 2: Print API Call')
    console.log('═══════════════════════════════════════════════════════════')
    const printResult = await testPrintAPI(token)

    // Test 3: CORS
    console.log('\n═══════════════════════════════════════════════════════════')
    console.log('TEST 3: CORS Configuration')
    console.log('═══════════════════════════════════════════════════════════')
    await testCORS()

    const duration = ((Date.now() - startTime) / 1000).toFixed(2)

    console.log('\n╔════════════════════════════════════════════════════════════╗')
    console.log('║   🎉 ALL TESTS COMPLETED                                   ║')
    console.log(`║   Duration: ${duration}s                                         ║`)
    console.log('╚════════════════════════════════════════════════════════════╝')

    if (printResult.success) {
      console.log('\n✅ Azure Print API is fully operational!')
      console.log('   You can proceed with integration in Part Printer.')
    } else {
      console.log('\n⚠️ Azure Print API responded but with an error.')
      console.log('   Check the response details above.')
    }

  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2)
    
    console.log('\n╔════════════════════════════════════════════════════════════╗')
    console.log('║   ❌ TESTS FAILED                                          ║')
    console.log(`║   Duration: ${duration}s                                         ║`)
    console.log('╚════════════════════════════════════════════════════════════╝')
    
    console.error('\n❌ Test suite failed:')
    console.error(error)
    
    console.log('\n💡 Troubleshooting:')
    console.log('   1. Check .env.local has all required variables')
    console.log('   2. Verify Client ID and Secret are correct')
    console.log('   3. Ensure network can reach Azure endpoints')
    console.log('   4. Check Subscription Key is valid')
    
    process.exit(1)
  }
}

// Run the test
main()
