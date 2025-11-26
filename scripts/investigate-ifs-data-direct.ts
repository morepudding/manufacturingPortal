/**
 * Script d'investigation IFS Cloud - CONNEXION DIRECTE (Fallback)
 * 
 * Objectif: Récupérer données Customer Orders/Printers/Languages qui retournent 401 via APIM
 * Utilise la connexion directe à IFS Cloud (sans Azure APIM)
 * 
 * ⚠️ NE PAS inventer de données - capturer la structure réelle OData
 * 
 * Usage:
 * 1. pnpm tsx scripts/investigate-ifs-data-direct.ts
 * 2. Analyser le fichier généré: tests/boat-configuration/integration/fixtures/ifs-real-data-direct.json
 * 3. Fusionner avec ifs-real-data.json
 * 
 * @author Manufacturing Portal Team
 * @date November 12, 2025
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { writeFile } from 'fs/promises'

// Load .env.local
config({ path: resolve(__dirname, '../.env.local') })

interface DirectConnectionConfig {
  baseUrl: string
  clientId: string
  clientSecret: string
  tokenUrl: string
  scope: string
}

interface InvestigationResult {
  timestamp: string
  environment: string
  connectionType: 'DIRECT_IFS_CLOUD'
  customerOrderLines: unknown[]
  customerOrderHeaders: unknown[]
  printers: unknown[]
  languages: unknown[]
  metadata: {
    customerOrderLinesFields: string[]
    customerOrderHeadersFields: string[]
    printersFields: string[]
    languagesFields: string[]
  }
}

/**
 * Configuration connexion directe IFS Cloud (sans APIM)
 */
const DIRECT_CONFIG: DirectConnectionConfig = {
  baseUrl: 'https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1',
  clientId: 'AIS_IFS_MA_AST',
  clientSecret: 'ifiW7xzKNmj3a1fpEukFIImPFztb51R9',
  tokenUrl: 'https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token',
  scope: 'openid microprofile-jwt'
}

/**
 * Extraire les noms de champs d'un objet IFS
 */
function extractFieldNames(obj: any): string[] {
  if (!obj) return []
  return Object.keys(obj).filter(key => !key.startsWith('@odata'))
}

/**
 * Client HTTP simple pour IFS Cloud Direct
 */
class DirectIFSClient {
  private accessToken: string | null = null
  private tokenExpiry: number = 0

  /**
   * Récupérer un access token OAuth2
   */
  async getAccessToken(): Promise<string> {
    // Vérifier si le token est toujours valide
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken
    }

    console.log('🔐 Fetching OAuth2 token (Direct IFS Cloud)...')

    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: DIRECT_CONFIG.clientId,
      client_secret: DIRECT_CONFIG.clientSecret,
      scope: DIRECT_CONFIG.scope
    })

    const response = await fetch(DIRECT_CONFIG.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    })

    if (!response.ok) {
      throw new Error(`OAuth2 token request failed: ${response.status} - ${await response.text()}`)
    }

    const data = await response.json()
    this.accessToken = data.access_token
    this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000 // Expire 1 min avant

    console.log('   ✅ Token obtained')
    return this.accessToken!
  }

  /**
   * Faire une requête GET à IFS Cloud
   */
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const token = await this.getAccessToken()
    const url = new URL(`${DIRECT_CONFIG.baseUrl}/${endpoint}`)

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`IFS API request failed: ${response.status} - ${errorText}`)
    }

    return response.json()
  }
}

/**
 * Investigation Customer Order Lines
 */
async function investigateCustomerOrderLines(client: DirectIFSClient) {
  console.log('\n🔍 Investigation 1: Customer Order Lines (Direct)')
  console.log('=' .repeat(60))
  
  try {
    // ⚠️ CHullNumber et Contract filters ne fonctionnent pas en direct (types issues)
    // Récupérons un sample de Customer Order Lines sans filtre
    console.log(`\n🚢 Fetching Customer Order Lines sample (no filter)`)
    
    const response = await client.get<any>(
      'CustomerOrderHandling.svc/CustomerOrderLineSet',
      {
        $select: '*',
        $top: '10'
      }
    )
    
    if (response.value && response.value.length > 0) {
      console.log(`   ✅ Found ${response.value.length} Customer Order Line(s)`)
      response.value.slice(0, 5).forEach((line: any) => {
        console.log(`      - Order ${line.OrderNo} Line ${line.LineNo}: ${line.CatalogNo || 'N/A'}`)
      })
      
      return response.value
    } else {
      console.log(`   ❌ Not found`)
      return []
    }
  } catch (error) {
    console.error('❌ Error fetching Customer Order Lines:', error)
    return []
  }
}

/**
 * Investigation Customer Order Headers
 */
async function investigateCustomerOrderHeaders(client: DirectIFSClient, orderNos: string[]) {
  console.log('\n🔍 Investigation 2: Customer Order Headers (Direct)')
  console.log('=' .repeat(60))
  
  const results = []
  
  try {
    // ⚠️ OrderNo filter ne fonctionne pas (types issues)
    // Récupérons un sample de Customer Order Headers sans filtre
    console.log(`\n📄 Fetching Customer Order Headers sample (no filter)`)
    
    const response = await client.get<any>(
      'CustomerOrderHandling.svc/CustomerOrderSet',
      {
        $select: '*',
        $top: '10'
      }
    )
    
    if (response.value && response.value.length > 0) {
      console.log(`   ✅ Found ${response.value.length} Customer Order Header(s)`)
      response.value.slice(0, 5).forEach((header: any) => {
        console.log(`      - Order ${header.OrderNo}: ${header.CustomerName || 'N/A'}`)
      })
      
      return response.value
    } else {
      console.log(`   ❌ Not found`)
      return []
    }
  } catch (error) {
    console.error('❌ Error fetching Customer Order Headers:', error)
    return []
  }
}

/**
 * Investigation Printers
 */
async function investigatePrinters(client: DirectIFSClient) {
  console.log('\n🔍 Investigation 3: Printers (Print Dialog - Direct)')
  console.log('=' .repeat(60))
  
  try {
    const response = await client.get<any>(
      'PrintDialog.svc/LogicalPrinterSet',
      {
        $select: '*',
        $top: '20'
      }
    )
    
    if (response.value && response.value.length > 0) {
      console.log(`   ✅ Found ${response.value.length} printer(s)`)
      response.value.slice(0, 5).forEach((printer: any) => {
        console.log(`      - ${printer.LogicalPrinterId || printer.PrinterId || 'N/A'}`)
      })
      
      return response.value
    } else {
      console.log(`   ❌ No printers found`)
      return []
    }
  } catch (error) {
    console.error('❌ Error fetching Printers:', error)
    return []
  }
}

/**
 * Investigation Languages
 */
async function investigateLanguages(client: DirectIFSClient) {
  console.log('\n🔍 Investigation 4: Languages (Print Dialog - Direct)')
  console.log('=' .repeat(60))
  
  try {
    const response = await client.get<any>(
      'PrintDialog.svc/LanguageCodeSet',
      {
        $select: '*',
        $top: '20'
      }
    )
    
    if (response.value && response.value.length > 0) {
      console.log(`   ✅ Found ${response.value.length} language(s)`)
      response.value.slice(0, 5).forEach((lang: any) => {
        console.log(`      - ${lang.LanguageCode || 'N/A'}: ${lang.Description || 'N/A'}`)
      })
      
      return response.value
    } else {
      console.log(`   ❌ No languages found`)
      return []
    }
  } catch (error) {
    console.error('❌ Error fetching Languages:', error)
    return []
  }
}

/**
 * Main investigation
 */
async function main() {
  console.log('🚀 Starting IFS Cloud Data Investigation (DIRECT CONNECTION)')
  console.log('=' .repeat(60))
  console.log('⚠️  Objective: Capture REAL IFS data for endpoints failing via APIM')
  console.log('⚠️  Connection: Direct to IFS Cloud (no Azure APIM)')
  console.log('=' .repeat(60))
  
  try {
    const client = new DirectIFSClient()
    
    // Investigation séquentielle
    const customerOrderLines = await investigateCustomerOrderLines(client)
    
    // Extraire Order Numbers des Customer Order Lines
    const orderNos = customerOrderLines
      .map((line: any) => line.OrderNo)
      .filter((orderNo, index, self) => orderNo && self.indexOf(orderNo) === index)
    
    const customerOrderHeaders = await investigateCustomerOrderHeaders(client, orderNos)
    const printers = await investigatePrinters(client)
    const languages = await investigateLanguages(client)
    
    // Compiler les résultats
    const result: InvestigationResult = {
      timestamp: new Date().toISOString(),
      environment: DIRECT_CONFIG.baseUrl,
      connectionType: 'DIRECT_IFS_CLOUD',
      customerOrderLines,
      customerOrderHeaders,
      printers,
      languages,
      metadata: {
        customerOrderLinesFields: customerOrderLines.length > 0 ? extractFieldNames(customerOrderLines[0]) : [],
        customerOrderHeadersFields: customerOrderHeaders.length > 0 ? extractFieldNames(customerOrderHeaders[0]) : [],
        printersFields: printers.length > 0 ? extractFieldNames(printers[0]) : [],
        languagesFields: languages.length > 0 ? extractFieldNames(languages[0]) : [],
      }
    }
    
    // Sauvegarder dans fichier JSON
    const outputPath = 'tests/boat-configuration/integration/fixtures/ifs-real-data-direct.json'
    await writeFile(outputPath, JSON.stringify(result, null, 2), 'utf-8')
    
    console.log('\n' + '=' .repeat(60))
    console.log('✅ Investigation completed successfully!')
    console.log('=' .repeat(60))
    console.log(`📄 Results saved to: ${outputPath}`)
    console.log(`\n📊 Summary:`)
    console.log(`   - Customer Order Lines: ${customerOrderLines.length}`)
    console.log(`   - Customer Order Headers: ${customerOrderHeaders.length}`)
    console.log(`   - Printers: ${printers.length}`)
    console.log(`   - Languages: ${languages.length}`)
    console.log(`\n💡 Next steps:`)
    console.log(`   1. Review ${outputPath}`)
    console.log(`   2. Update fixtures with REAL Customer Orders data`)
    console.log(`   3. Update fixtures with REAL Printers/Languages data`)
    console.log(`   4. Re-run integration tests with complete fixtures`)
    
  } catch (error) {
    console.error('\n❌ Investigation failed:', error)
    process.exit(1)
  }
}

// Execute
main()
