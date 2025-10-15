/**
 * 🧪 TEST 2 - Inventory Part Handling - Données Réelles
 * 
 * Objectif: Valider InventoryPartHandling.svc avec données réelles
 * - Récupérer une pièce par PartNo
 * - Vérifier les attributs GENERIC_CODE, LENGTH_SETUP, VARNISH_CODE
 * - Tester l'expansion ManufPartAttributeRef
 * 
 * Date: 14 octobre 2025
 */

// =============================================================================
// Configuration IFS
// =============================================================================

const IFS_CONFIG = {
  baseUrl: 'https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1',
  tokenUrl: 'https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token',
  clientId: '***REMOVED***',
  clientSecret: '***REMOVED***',
  scope: 'openid microprofile-jwt'
}

// =============================================================================
// Types
// =============================================================================

interface IFSManufPartAttribute {
  AttributeCode: string
  AttributeValue: string
  AttributeDescription?: string
}

interface IFSInventoryPart {
  PartNo: string
  Contract: string
  Description?: string
  UnitMeas?: string
  EngAttribute?: string
  TypeCode?: string
  PartStatus?: string
  ManufPartAttributeRef?: IFSManufPartAttribute[]
}

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
    console.log('🔑 Utilisation token en cache')
    return cachedToken
  }

  console.log('🔑 Récupération nouveau token OAuth2...')
  
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: IFS_CONFIG.clientId,
    client_secret: IFS_CONFIG.clientSecret,
    scope: IFS_CONFIG.scope
  })

  try {
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
    tokenExpiry = now + (expiresIn - 300) * 1000 // -5 min de marge

    console.log('✅ Token obtenu (expire dans', expiresIn, 'secondes)')
    return cachedToken!
  } catch (error: any) {
    console.error('❌ Erreur OAuth2:', error.message)
    throw error
  }
}

// =============================================================================
// Client IFS
// =============================================================================

async function ifsGet<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const token = await getAccessToken()
  const url = `${IFS_CONFIG.baseUrl}/${endpoint}`
  
  const queryString = new URLSearchParams(params).toString()
  const fullUrl = queryString ? `${url}?${queryString}` : url

  console.log('📡 GET', fullUrl)

  try {
    const response = await fetch(fullUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }

    return await response.json() as T
  } catch (error: any) {
    console.error('❌ Erreur IFS:', error.message)
    throw error
  }
}

// =============================================================================
// Tests
// =============================================================================

async function testInventoryPartBasic(contract: string, partNo: string) {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 2.1 - Récupération Pièce Basique')
  console.log('='.repeat(80))
  console.log(`📦 Contract: ${contract}`)
  console.log(`🔧 PartNo: ${partNo}`)
  console.log()

  try {
    const response = await ifsGet<IFSODataResponse<IFSInventoryPart>>(
      'InventoryPartHandling.svc/InventoryPartSet',
      {
        $filter: `Contract eq '${contract}' and PartNo eq '${partNo}'`,
        $select: 'PartNo,Contract,Description,UnitMeas,EngAttribute,TypeCode,PartStatus'
      }
    )

    if (response.value.length === 0) {
      console.log('⚠️  Aucune pièce trouvée')
      return null
    }

    const part = response.value[0]
    console.log('✅ Pièce trouvée:')
    console.log(JSON.stringify(part, null, 2))
    
    return part
  } catch (error) {
    console.error('❌ Test échoué')
    return null
  }
}

async function testInventoryPartWithAttributes(contract: string, partNo: string) {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 2.2 - Récupération Pièce avec Attributs ($expand)')
  console.log('='.repeat(80))
  console.log(`📦 Contract: ${contract}`)
  console.log(`🔧 PartNo: ${partNo}`)
  console.log()

  try {
    const response = await ifsGet<IFSODataResponse<IFSInventoryPart>>(
      'InventoryPartHandling.svc/InventoryPartSet',
      {
        $filter: `Contract eq '${contract}' and PartNo eq '${partNo}'`,
        $expand: 'ManufPartAttributeRef',
        $select: 'PartNo,Contract,Description,UnitMeas,EngAttribute'
      }
    )

    if (response.value.length === 0) {
      console.log('⚠️  Aucune pièce trouvée')
      return null
    }

    const part = response.value[0]
    console.log('✅ Pièce trouvée avec attributs:')
    console.log(JSON.stringify(part, null, 2))
    
    // Vérifier les attributs critiques
    if (part.ManufPartAttributeRef && part.ManufPartAttributeRef.length > 0) {
      console.log('\n📋 Attributs de fabrication:')
      part.ManufPartAttributeRef.forEach(attr => {
        console.log(`  - ${attr.AttributeCode}: ${attr.AttributeValue}`)
      })
      
      // Chercher les attributs Part Printer
      const genericCode = part.ManufPartAttributeRef.find(
        a => a.AttributeCode === 'GENERIC_CODE' || a.AttributeCode === 'GENERIC CODE'
      )
      const lengthSetup = part.ManufPartAttributeRef.find(
        a => a.AttributeCode === 'LENGTH_SETUP' || a.AttributeCode === 'LENGTH SETUP'
      )
      const varnishCode = part.ManufPartAttributeRef.find(
        a => a.AttributeCode === 'VARNISH_CODE' || a.AttributeCode === 'VARNISH CODE'
      )
      
      console.log('\n🎯 Attributs Part Printer:')
      console.log('  GENERIC CODE:', genericCode?.AttributeValue || '❌ NON TROUVÉ')
      console.log('  LENGTH SETUP:', lengthSetup?.AttributeValue || '❌ NON TROUVÉ')
      console.log('  VARNISH CODE:', varnishCode?.AttributeValue || '❌ NON TROUVÉ')
    } else {
      console.log('⚠️  Aucun attribut de fabrication trouvé')
    }
    
    return part
  } catch (error) {
    console.error('❌ Test échoué')
    return null
  }
}

async function testReferenceManufPartAttribute(partNo: string) {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 2.3 - Reference_ManufPartAttribute (Alternative)')
  console.log('='.repeat(80))
  console.log(`🔧 PartNo: ${partNo}`)
  console.log()

  try {
    // Essayer d'accéder directement aux attributs
    const response = await ifsGet<IFSODataResponse<IFSManufPartAttribute>>(
      'InventoryPartHandling.svc/Reference_ManufPartAttribute',
      {
        $filter: `PartNo eq '${partNo}'`
      }
    )

    console.log('✅ Attributs trouvés:')
    console.log(JSON.stringify(response.value, null, 2))
    
    return response.value
  } catch (error) {
    console.error('❌ Test échoué (endpoint peut ne pas être accessible directement)')
    return null
  }
}

async function testInventoryPartList(contract: string) {
  console.log('\n' + '='.repeat(80))
  console.log('🧪 TEST 2.4 - Liste des Pièces (pour trouver PartNo valides)')
  console.log('='.repeat(80))
  console.log(`📦 Contract: ${contract}`)
  console.log()

  try {
    const response = await ifsGet<IFSODataResponse<IFSInventoryPart>>(
      'InventoryPartHandling.svc/InventoryPartSet',
      {
        $filter: `Contract eq '${contract}'`,
        $select: 'PartNo,Description,TypeCode,PartStatus',
        $top: '10'
      }
    )

    console.log(`✅ ${response.value.length} pièces trouvées (top 10):`)
    response.value.forEach((part, i) => {
      console.log(`  ${i + 1}. ${part.PartNo} - ${part.Description || 'N/A'} (${part.TypeCode || 'N/A'})`)
    })
    
    return response.value
  } catch (error) {
    console.error('❌ Test échoué')
    return null
  }
}

// =============================================================================
// Main
// =============================================================================

async function main() {
  console.log('🚀 TEST 2 - InventoryPartHandling - Données Réelles\n')
  
  const testPartNos = [
    { contract: 'BDR', partNo: 'LG5MA0XD02' },  // PartNo du Shop Order 1043
    { contract: 'BDR', partNo: 'LG5MA0114' },   // Serial Number du Shop Order 97277
    { contract: 'BDR', partNo: 'LX6MA0115' },   // Serial Number du Shop Order 1043
  ]

  // Test 2.4 - Lister les pièces disponibles
  console.log('📊 Étape 1: Lister les pièces pour trouver des PartNo valides\n')
  const partsList = await testInventoryPartList('BDR')
  
  if (partsList && partsList.length > 0) {
    console.log('\n💡 Pièces à tester:', partsList.slice(0, 3).map(p => p.PartNo).join(', '))
    
    // Utiliser les premiers PartNo trouvés
    for (const part of partsList.slice(0, 2)) {
      await testInventoryPartBasic('BDR', part.PartNo)
      await testInventoryPartWithAttributes('BDR', part.PartNo)
    }
  } else {
    // Tester avec les PartNo prédéfinis
    console.log('\n💡 Utilisation des PartNo prédéfinis\n')
    
    for (const test of testPartNos) {
      await testInventoryPartBasic(test.contract, test.partNo)
      await testInventoryPartWithAttributes(test.contract, test.partNo)
    }
  }
  
  // Test alternatif
  if (partsList && partsList.length > 0) {
    await testReferenceManufPartAttribute(partsList[0].PartNo)
  }

  console.log('\n' + '='.repeat(80))
  console.log('✅ TEST 2 TERMINÉ')
  console.log('='.repeat(80))
  console.log('\n📊 Résumé:')
  console.log('  - Test 2.1: Récupération basique')
  console.log('  - Test 2.2: Récupération avec attributs ($expand)')
  console.log('  - Test 2.3: Alternative Reference_ManufPartAttribute')
  console.log('  - Test 2.4: Liste des pièces disponibles')
  console.log('\n📝 Vérifier si GENERIC_CODE, LENGTH_SETUP, VARNISH_CODE sont présents')
}

// Exécution
main().catch(error => {
  console.error('💥 Erreur fatale:', error)
  process.exit(1)
})
