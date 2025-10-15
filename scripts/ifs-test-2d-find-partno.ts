/**
 * 🧪 TEST 2D - Trouver les PartNo réels via Shop Orders
 * 
 * Objectif: Récupérer des Shop Orders BDR pour avoir des PartNo valides
 * 
 * Date: 14 octobre 2025
 */

const IFS_CONFIG = {
  baseUrl: 'https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1',
  tokenUrl: 'https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token',
  clientId: '***REMOVED***',
  clientSecret: '***REMOVED***',
  scope: 'openid microprofile-jwt'
}

let cachedToken: string | null = null

async function getAccessToken(): Promise<string> {
  if (cachedToken) return cachedToken

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

  const data = await response.json()
  cachedToken = data.access_token
  return cachedToken!
}

async function ifsGet<T>(endpoint: string): Promise<T> {
  const token = await getAccessToken()
  const url = `${IFS_CONFIG.baseUrl}/${endpoint}`

  console.log('📡', endpoint.substring(0, 80))

  const response = await fetch(url, {
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
}

async function main() {
  console.log('🚀 TEST 2D - Trouver PartNo via Shop Orders BDR\n')
  
  try {
    // Récupérer quelques Shop Orders du site BDR
    console.log('🔍 Recherche Shop Orders BDR...\n')
    const shopOrders = await ifsGet<any>(
      'ShopOrderHandling.svc/ShopOrds?$filter=contains(Contract,%27BDR%27)&$select=OrderNo,ReleaseNo,SequenceNo,PartNo,Contract&$top=10'
    )
    
    console.log(`✅ ${shopOrders.value.length} Shop Orders trouvés\n`)
    
    const partNos = new Set<string>()
    
    shopOrders.value.forEach((so: any, i: number) => {
      console.log(`${i + 1}. OrderNo=${so.OrderNo}, PartNo=${so.PartNo}, Contract=${so.Contract}`)
      if (so.PartNo) partNos.add(so.PartNo)
    })
    
    console.log(`\n📋 ${partNos.size} PartNo uniques trouvés:`)
    const partNoArray = Array.from(partNos)
    partNoArray.forEach((pn, i) => console.log(`  ${i + 1}. ${pn}`))
    
    // Tester l'accès aux InventoryPart avec ces PartNo
    console.log('\n' + '='.repeat(80))
    console.log('🧪 Test accès InventoryPart avec les PartNo trouvés')
    console.log('='.repeat(80))
    
    for (const partNo of partNoArray.slice(0, 3)) {
      console.log(`\n📦 Test PartNo: ${partNo} (Contract: BDR)`)
      
      try {
        const part = await ifsGet<any>(
          `InventoryPartHandling.svc/InventoryPartSet(Contract='BDR',PartNo='${partNo}')`
        )
        
        console.log('✅ Pièce trouvée!')
        console.log('  Description:', part.Description || 'N/A')
        console.log('  TypeCode:', part.TypeCode || 'N/A')
        console.log('  PartStatus:', part.PartStatus || 'N/A')
        
        // Explorer les champs disponibles qui pourraient contenir des attributs
        console.log('\n  🔍 Champs personnalisés trouvés:')
        const customFields = Object.keys(part).filter(k => 
          k.startsWith('C') || k.includes('Attribute') || k.includes('Eng')
        )
        customFields.forEach(field => {
          if (part[field]) {
            console.log(`    ${field}: ${part[field]}`)
          }
        })
        
      } catch (error) {
        console.log('❌ Erreur:', (error as Error).message.substring(0, 100))
      }
    }
    
    // Explorer les endpoints Reference pour les attributs
    console.log('\n' + '='.repeat(80))
    console.log('🧪 Test Reference_ManufPartAttribute')
    console.log('='.repeat(80))
    
    try {
      const attrs = await ifsGet<any>(
        'InventoryPartHandling.svc/Reference_ManufPartAttribute?$top=5'
      )
      
      console.log('✅ Attributs trouvés:', attrs.value.length)
      attrs.value.forEach((attr: any, i: number) => {
        console.log(`\n${i + 1}. ${JSON.stringify(attr, null, 2)}`)
      })
    } catch (error) {
      console.log('❌ Erreur Reference_ManufPartAttribute:', (error as Error).message.substring(0, 100))
    }
    
  } catch (error) {
    console.error('💥 Erreur:', error)
  }
}

main()
