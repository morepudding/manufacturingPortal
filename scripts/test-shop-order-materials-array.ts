/**
 * 🎯 TEST SHOP ORDER MATERIAL ARRAY
 * 
 * Test de la navigation OData MaterialArray pour récupérer les matériaux d'un Shop Order
 * 
 * DÉCOUVERTE : ShopOrds/MaterialArray contient TOUS les matériaux avec OperationNo !
 * 
 * Cas de test : Shop Order 454853
 * Expected Results:
 * - LineItemNo=1 (OP10): D8588H (profil bois) - Raw Material ✅
 * - LineItemNo=2 (OP40): 95605J (vernis)
 * - LineItemNo=3 (OP40): 148177 (catalyseur)
 * - LineItemNo=4 (OP40): 955999 (diluant)
 */

import 'dotenv/config'

const IFS_BASE_URL = process.env.IFS_BASE_URL || 'https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1'
const IFS_CLIENT_ID = process.env.IFS_CLIENT_ID || '***REMOVED***'
const IFS_CLIENT_SECRET = process.env.IFS_CLIENT_SECRET || '***REMOVED***'
const IFS_TOKEN_URL = process.env.IFS_TOKEN_URL || 'https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token'

interface OAuthTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

interface ShopMaterialAlloc {
  LineItemNo: number
  PartNo: string
  OperationNo: number
  QtyPerAssembly: number
  QtyRequired: number
  StructureLineNo: number
  DateRequired: string
  PartNoRef?: {
    Description: string
    UnitMeas: string
  }
}

interface ODataResponse {
  value: ShopMaterialAlloc[]
}

async function getAccessToken(): Promise<string> {
  console.log('🔐 Récupération du token OAuth2...')
  
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: IFS_CLIENT_ID,
    client_secret: IFS_CLIENT_SECRET,
    scope: 'openid microprofile-jwt'
  })

  const response = await fetch(IFS_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  })

  if (!response.ok) {
    throw new Error(`Token request failed: ${response.status}`)
  }

  const data = await response.json() as OAuthTokenResponse
  console.log('✅ Token obtenu\n')
  return data.access_token
}

async function testMaterialArrayNavigation() {
  console.log('=' .repeat(80))
  console.log('🧪 TEST: ShopOrds MaterialArray Navigation')
  console.log('=' .repeat(80))
  console.log()

  const token = await getAccessToken()

  const orderNo = '454853'
  const releaseNo = '*'
  const sequenceNo = '*'

  console.log(`📦 Shop Order: ${orderNo}`)
  console.log(`📋 Release No: ${releaseNo}`)
  console.log(`🔢 Sequence No: ${sequenceNo}`)
  console.log()

  // Test 1: Récupération de tous les matériaux
  console.log('━'.repeat(80))
  console.log('📝 TEST 1: Récupération de tous les matériaux')
  console.log('━'.repeat(80))

  const url = `${IFS_BASE_URL}/ShopOrderHandling.svc/ShopOrds(OrderNo='${orderNo}',ReleaseNo='${releaseNo}',SequenceNo='${sequenceNo}')/MaterialArray`
  
  const params = {
    $select: 'LineItemNo,PartNo,OperationNo,QtyPerAssembly,QtyRequired,StructureLineNo,DateRequired',
    $expand: 'PartNoRef($select=Description,UnitMeas)',
    $orderby: 'OperationNo,LineItemNo'
  }

  console.log(`\n🌐 URL: ${url}`)
  console.log(`📊 Params:`, params)
  console.log()

  try {
    const queryParams = new URLSearchParams(params as Record<string, string>)
    const response = await fetch(`${url}?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`)
    }

    const data = await response.json() as ODataResponse

    console.log(`✅ Requête réussie (${response.status})`)
    console.log(`📦 Nombre de matériaux: ${data.value.length}`)
    console.log()

    // Affichage des résultats groupés par opération
    const materialsByOp = data.value.reduce((acc: Record<string, ShopMaterialAlloc[]>, mat: ShopMaterialAlloc) => {
      const opNo = mat.OperationNo.toString()
      if (!acc[opNo]) acc[opNo] = []
      acc[opNo].push(mat)
      return acc
    }, {})

    Object.keys(materialsByOp).sort().forEach(opNo => {
      console.log(`\n🔧 Opération ${opNo}:`)
      console.log('-'.repeat(80))
      
      materialsByOp[opNo].forEach((mat: ShopMaterialAlloc, index: number) => {
        console.log(`\n  ${index + 1}. LineItemNo: ${mat.LineItemNo}`)
        console.log(`     📦 PartNo: ${mat.PartNo}`)
        console.log(`     📝 Description: ${mat.PartNoRef?.Description || 'N/A'}`)
        console.log(`     📏 Quantité: ${mat.QtyPerAssembly} ${mat.PartNoRef?.UnitMeas || ''}`)
        console.log(`     🔢 Structure Line: ${mat.StructureLineNo}`)
        console.log(`     📅 Date Required: ${new Date(mat.DateRequired).toLocaleDateString()}`)
      })
    })

    // Test 2: Filtrage par OperationNo=10 (OP10)
    console.log('\n\n━'.repeat(80))
    console.log('📝 TEST 2: Filtrage par OperationNo=10 (Raw Material)')
    console.log('━'.repeat(80))

    const url2 = `${IFS_BASE_URL}/ShopOrderHandling.svc/ShopOrds(OrderNo='${orderNo}',ReleaseNo='${releaseNo}',SequenceNo='${sequenceNo}')/MaterialArray`
    
    const params2 = {
      $filter: 'OperationNo eq 10',
      $select: 'LineItemNo,PartNo,OperationNo,QtyPerAssembly,QtyRequired,StructureLineNo',
      $expand: 'PartNoRef($select=Description,UnitMeas)'
    }

    console.log(`\n🌐 URL: ${url2}`)
    console.log(`📊 Filter: OperationNo eq 10`)
    console.log()

    const queryParams2 = new URLSearchParams(params2 as Record<string, string>)
    const response2 = await fetch(`${url2}?${queryParams2}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })

    if (!response2.ok) {
      throw new Error(`Request failed: ${response2.status}`)
    }

    const data2 = await response2.json() as ODataResponse

    console.log(`✅ Requête réussie (${response2.status})`)
    console.log(`📦 Nombre de matériaux OP10: ${data2.value.length}`)
    
    if (data2.value.length > 0) {
      const rawMaterial = data2.value[0]
      console.log()
      console.log('🎯 RAW MATERIAL (OP10):')
      console.log('-'.repeat(80))
      console.log(`  📦 PartNo: ${rawMaterial.PartNo}`)
      console.log(`  📝 Description: ${rawMaterial.PartNoRef?.Description || 'N/A'}`)
      console.log(`  📏 Quantité: ${rawMaterial.QtyPerAssembly} ${rawMaterial.PartNoRef?.UnitMeas || ''}`)
      console.log(`  🔢 Structure Line: ${rawMaterial.StructureLineNo}`)
      console.log()
      console.log(`✅ VALIDATION: Raw Material trouvé pour Part Printer !`)
    }

  } catch (error: any) {
    console.error(`❌ Erreur lors de la requête`)
    if (error.response) {
      console.error(`   Status: ${error.response.status}`)
      console.error(`   Message:`, error.response.data)
    } else {
      console.error(`   ${error.message}`)
    }
  }

  console.log()
  console.log('=' .repeat(80))
  console.log('🏁 FIN DES TESTS')
  console.log('=' .repeat(80))
}

// Exécution
testMaterialArrayNavigation().catch(console.error)
