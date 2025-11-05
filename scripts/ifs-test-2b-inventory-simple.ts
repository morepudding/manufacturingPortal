/**
 * 🧪 TEST 2B - Inventory Part Handling - Test Simple
 * 
 * Objectif: Tester sans filtrage Contract pour comprendre la structure
 * 
 * Date: 14 octobre 2025
 */

// =============================================================================
// Configuration IFS
// =============================================================================

const IFS_CONFIG = {
  baseUrl: 'https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1',
  tokenUrl: 'https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token',
  clientId: 'AIS_IFS_MA_AST',
  clientSecret: 'ifiW7xzKNmj3a1fpEukFIImPFztb51R9',
  scope: 'openid microprofile-jwt'
}

// =============================================================================
// Types
// =============================================================================

interface IFSODataResponse<T> {
  '@odata.context': string
  '@odata.count'?: number
  value: T[]
}

// =============================================================================
// Client OAuth2
// =============================================================================

let cachedToken: string | null = null
let tokenExpiry: number = 0

async function getAccessToken(): Promise<string> {
  const now = Date.now()
  
  if (cachedToken && now < tokenExpiry) {
    return cachedToken
  }

  console.log('🔑 Récupération token OAuth2...')
  
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: IFS_CONFIG.clientId,
    client_secret: IFS_CONFIG.clientSecret,
    scope: IFS_CONFIG.scope
  })

  const response = await fetch(IFS_CONFIG.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  const data = await response.json()
  cachedToken = data.access_token
  const expiresIn = data.expires_in || 3600
  tokenExpiry = now + (expiresIn - 300) * 1000

  console.log('✅ Token obtenu\n')
  return cachedToken!
}

// =============================================================================
// Client IFS
// =============================================================================

async function ifsGet<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const token = await getAccessToken()
  const url = `${IFS_CONFIG.baseUrl}/${endpoint}`
  
  const queryString = new URLSearchParams(params).toString()
  const fullUrl = queryString ? `${url}?${queryString}` : url

  console.log('📡 GET', endpoint)
  if (Object.keys(params).length > 0) {
    console.log('📋 Params:', params)
  }

  const response = await fetch(fullUrl, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ Erreur:', errorText)
    throw new Error(`HTTP ${response.status}`)
  }

  return await response.json() as T
}

// =============================================================================
// Tests
// =============================================================================

async function test1_SimpleList() {
  console.log('='.repeat(80))
  console.log('🧪 TEST 1 - Liste simple (sans filtre)')
  console.log('='.repeat(80))
  console.log()

  try {
    const response = await ifsGet<IFSODataResponse<any>>(
      'InventoryPartHandling.svc/InventoryPartSet',
      { $top: '5' }
    )

    console.log('✅ Succès! Nombre de résultats:', response.value.length)
    console.log('\n📊 Première pièce (structure complète):')
    console.log(JSON.stringify(response.value[0], null, 2))
    
    console.log('\n📋 Liste des 5 pièces:')
    response.value.forEach((part: any, i: number) => {
      console.log(`  ${i + 1}. ${part.PartNo || 'N/A'} - ${part.Description || 'N/A'}`)
    })
    
    return response.value
  } catch (error) {
    console.error('❌ Test échoué')
    throw error
  }
}

async function test2_FilterByPartNo(partNo: string) {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 2 - Filtrage par PartNo (sans Contract)')
  console.log('='.repeat(80))
  console.log(`🔧 PartNo: ${partNo}`)
  console.log()

  try {
    const response = await ifsGet<IFSODataResponse<any>>(
      'InventoryPartHandling.svc/InventoryPartSet',
      {
        $filter: `PartNo eq '${partNo}'`
      }
    )

    console.log('✅ Succès! Nombre de résultats:', response.value.length)
    if (response.value.length > 0) {
      console.log('\n📊 Pièce trouvée:')
      console.log(JSON.stringify(response.value[0], null, 2))
    } else {
      console.log('⚠️  Aucune pièce trouvée')
    }
    
    return response.value
  } catch (error) {
    console.error('❌ Test échoué')
    throw error
  }
}

async function test3_WithExpand(partNo: string) {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 3 - Avec $expand (ManufPartAttributeRef)')
  console.log('='.repeat(80))
  console.log(`🔧 PartNo: ${partNo}`)
  console.log()

  try {
    const response = await ifsGet<IFSODataResponse<any>>(
      'InventoryPartHandling.svc/InventoryPartSet',
      {
        $filter: `PartNo eq '${partNo}'`,
        $expand: 'ManufPartAttributeRef'
      }
    )

    console.log('✅ Succès! Nombre de résultats:', response.value.length)
    if (response.value.length > 0) {
      const part = response.value[0]
      console.log('\n📊 Pièce avec attributs:')
      console.log(JSON.stringify(part, null, 2))
      
      if (part.ManufPartAttributeRef) {
        console.log('\n🏷️  Attributs trouvés:')
        part.ManufPartAttributeRef.forEach((attr: any) => {
          console.log(`  - ${attr.AttributeCode}: ${attr.AttributeValue}`)
        })
      } else {
        console.log('\n⚠️  Pas d\'attributs ManufPartAttributeRef')
      }
    }
    
    return response.value
  } catch (error) {
    console.error('❌ Test échoué')
    throw error
  }
}

async function test4_ContainsFilter(partNoPattern: string) {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 4 - Filtrage avec contains()')
  console.log('='.repeat(80))
  console.log(`🔍 Pattern: ${partNoPattern}`)
  console.log()

  try {
    const response = await ifsGet<IFSODataResponse<any>>(
      'InventoryPartHandling.svc/InventoryPartSet',
      {
        $filter: `contains(PartNo,'${partNoPattern}')`,
        $top: '10'
      }
    )

    console.log('✅ Succès! Nombre de résultats:', response.value.length)
    console.log('\n📋 Pièces trouvées:')
    response.value.forEach((part: any, i: number) => {
      console.log(`  ${i + 1}. ${part.PartNo} - ${part.Description || 'N/A'}`)
    })
    
    return response.value
  } catch (error) {
    console.error('❌ Test échoué')
    throw error
  }
}

// =============================================================================
// Main
// =============================================================================

async function main() {
  console.log('🚀 TEST 2B - InventoryPartHandling - Tests Simples\n')
  
  try {
    // Test 1: Liste simple
    const parts = await test1_SimpleList()
    
    if (parts && parts.length > 0) {
      const firstPartNo = parts[0].PartNo
      
      // Test 2: Filtrage par PartNo
      await test2_FilterByPartNo(firstPartNo)
      
      // Test 3: Avec expand
      await test3_WithExpand(firstPartNo)
    }
    
    // Test 4: Contains (chercher des pièces LG5*)
    await test4_ContainsFilter('LG5')
    
    console.log('\n' + '='.repeat(80))
    console.log('✅ TOUS LES TESTS TERMINÉS')
    console.log('='.repeat(80))
    
  } catch (error: any) {
    console.error('\n💥 Erreur fatale:', error.message)
    process.exit(1)
  }
}

main()
