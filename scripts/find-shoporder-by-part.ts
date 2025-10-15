/**
 * Script de recherche - Trouver Shop Order par Part Number
 * 
 * Objectif: Retrouver le Shop Order de la pièce 1000014690G136
 *           et analyser ses champs (Objstate, CBlockDates, RevisedStartDate, etc.)
 * 
 * Utilisation:
 * npx tsx scripts/find-shoporder-by-part.ts
 */

import 'dotenv/config'

const IFS_BASE_URL = process.env.IFS_BASE_URL || 'https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1'
const IFS_CLIENT_ID = process.env.IFS_CLIENT_ID || '***REMOVED***'
const IFS_CLIENT_SECRET = process.env.IFS_CLIENT_SECRET || '***REMOVED***'
const IFS_TOKEN_URL = process.env.IFS_TOKEN_URL || 'https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token'

const TARGET_PART = '1000014690G136'

interface TokenResponse {
  access_token: string
  expires_in: number
  token_type: string
}

/**
 * Obtenir un token OAuth2 depuis IFS
 */
async function getToken(): Promise<string> {
  console.log('🔑 Requesting OAuth2 token...')

  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: IFS_CLIENT_ID,
    client_secret: IFS_CLIENT_SECRET,
    scope: 'openid microprofile-jwt',
  })

  const response = await fetch(IFS_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Failed to get token: ${response.status} - ${error}`)
  }

  const data = (await response.json()) as TokenResponse
  console.log('✅ Token obtained\n')
  
  return data.access_token
}

/**
 * Rechercher Shop Orders par Part Number
 */
async function findShopOrdersByPart(token: string, partNo: string) {
  console.log('═══════════════════════════════════════════════════════')
  console.log(`🔍 RECHERCHE: Shop Orders pour Part ${partNo}`)
  console.log('═══════════════════════════════════════════════════════\n')

  // Stratégie: Utiliser contains() car eq pose problème
  const url = `${IFS_BASE_URL}/ShopOrderHandling.svc/ShopOrds?$filter=contains(PartNo,'${partNo}')&$select=OrderNo,ReleaseNo,SequenceNo,Contract,PartNo,PartDescription,Objstate,RevisedStartDate,CBlockDates,ProductionLine,DateEntered,NeedDate,QtyComplete,QtyOnOrder&$top=50`

  console.log(`📡 Requête: ${url}\n`)

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.text()
    console.error(`❌ Error: ${response.status}`)
    console.error(error)
    return
  }

  const data = await response.json()

  if (!data.value || data.value.length === 0) {
    console.log(`⚠️ Aucun Shop Order trouvé pour Part ${partNo}`)
    return
  }

  console.log(`✅ ${data.value.length} Shop Order(s) trouvé(s)!\n`)

  console.log('═══════════════════════════════════════════════════════')
  console.log('📊 DÉTAILS DES SHOP ORDERS:')
  console.log('═══════════════════════════════════════════════════════\n')

  data.value.forEach((order: any, index: number) => {
    console.log(`\n🔹 Shop Order #${index + 1}: ${order.OrderNo}-${order.ReleaseNo}-${order.SequenceNo}`)
    console.log('─────────────────────────────────────────────────────')
    
    // Clés
    console.log(`📋 Clés:`)
    console.log(`   OrderNo:        ${order.OrderNo}`)
    console.log(`   ReleaseNo:      ${order.ReleaseNo}`)
    console.log(`   SequenceNo:     ${order.SequenceNo}`)
    
    // Infos générales
    console.log(`\n📦 Informations:`)
    console.log(`   Contract:       ${order.Contract}`)
    console.log(`   PartNo:         ${order.PartNo}`)
    console.log(`   Description:    ${order.PartDescription || 'N/A'}`)
    console.log(`   ProductionLine: ${order.ProductionLine || 'N/A'}`)
    
    // Status
    console.log(`\n🔄 Status:`)
    console.log(`   Objstate:       ${order.Objstate}`)
    console.log(`   QtyComplete:    ${order.QtyComplete || 0}`)
    console.log(`   QtyOnOrder:     ${order.QtyOnOrder || 0}`)
    
    // Dates
    console.log(`\n📅 Dates:`)
    console.log(`   DateEntered:       ${order.DateEntered || 'N/A'}`)
    console.log(`   RevisedStartDate:  ${order.RevisedStartDate || 'N/A'}`)
    console.log(`   NeedDate:          ${order.NeedDate || 'N/A'}`)
    
    // Filtres Part Printer
    console.log(`\n🎯 Critères Part Printer:`)
    console.log(`   CBlockDates:    ${order.CBlockDates} ${order.CBlockDates ? '✅ (Débit classique)' : '❌ (Redébit)'}`)
    console.log(`   Objstate:       ${order.Objstate} ${order.Objstate === 'Released' ? '✅' : '❌'}`)
    
    // Date au format comparable
    if (order.RevisedStartDate) {
      const startDate = new Date(order.RevisedStartDate).toISOString().split('T')[0]
      console.log(`   Date (format):  ${startDate}`)
    }
  })

  // Résumé par critères
  console.log('\n\n═══════════════════════════════════════════════════════')
  console.log('📊 RÉSUMÉ PAR CRITÈRES:')
  console.log('═══════════════════════════════════════════════════════\n')

  const released = data.value.filter((o: any) => o.Objstate === 'Released')
  const blockDatesTrue = data.value.filter((o: any) => o.CBlockDates === true)
  const blockDatesFalse = data.value.filter((o: any) => o.CBlockDates === false)

  console.log(`Total:                ${data.value.length} Shop Orders`)
  console.log(`Objstate='Released':  ${released.length} Shop Orders`)
  console.log(`CBlockDates=true:     ${blockDatesTrue.length} Shop Orders (Débit classique)`)
  console.log(`CBlockDates=false:    ${blockDatesFalse.length} Shop Orders (Redébit)`)

  // Groupement par état
  console.log('\n📊 Par état (Objstate):')
  const byState = data.value.reduce((acc: any, order: any) => {
    acc[order.Objstate] = (acc[order.Objstate] || 0) + 1
    return acc
  }, {})
  Object.entries(byState).forEach(([state, count]) => {
    console.log(`   ${state}: ${count}`)
  })

  // Groupement par site
  console.log('\n📊 Par site (Contract):')
  const byContract = data.value.reduce((acc: any, order: any) => {
    acc[order.Contract] = (acc[order.Contract] || 0) + 1
    return acc
  }, {})
  Object.entries(byContract).forEach(([contract, count]) => {
    console.log(`   ${contract}: ${count}`)
  })

  // Recommandations
  console.log('\n═══════════════════════════════════════════════════════')
  console.log('💡 RECOMMANDATIONS:')
  console.log('═══════════════════════════════════════════════════════\n')

  if (released.length > 0) {
    console.log('✅ Shop Orders avec Objstate="Released" trouvés:')
    released.slice(0, 3).forEach((order: any) => {
      const startDate = order.RevisedStartDate ? new Date(order.RevisedStartDate).toISOString().split('T')[0] : 'N/A'
      console.log(`   → ${order.OrderNo}-${order.ReleaseNo}-${order.SequenceNo} (${order.Contract}, ${startDate}, CBlockDates=${order.CBlockDates})`)
    })
  } else {
    console.log('❌ Aucun Shop Order avec Objstate="Released"')
    console.log('\nÉtats disponibles:')
    Object.keys(byState).forEach(state => {
      console.log(`   - ${state}`)
    })
  }

  console.log('\n═══════════════════════════════════════════════════════\n')
}

/**
 * Main
 */
async function main() {
  try {
    const token = await getToken()
    await findShopOrdersByPart(token, TARGET_PART)

    console.log('✅ Recherche terminée avec succès!')
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

main()
