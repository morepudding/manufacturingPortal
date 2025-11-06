/**
 * Recherche de Shop Orders valides pour FR018 et FR01
 * 
 * Usage: npx tsx scripts/find-shop-orders-fr.ts
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

interface OAuthTokenResponse {
  access_token: string
  expires_in: number
}

interface ShopOrder {
  OrderNo: string
  ReleaseNo: string
  SequenceNo: string
  Contract: string
  PartNo?: string
  ObjState?: string
}

async function getIFSToken(): Promise<string> {
  const params = new URLSearchParams({
    client_id: process.env.IFS_CLIENT_ID!,
    client_secret: process.env.IFS_CLIENT_SECRET!,
    scope: process.env.IFS_SCOPE || 'openid',
    grant_type: 'client_credentials',
  })

  const response = await fetch(process.env.IFS_TOKEN_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })

  const data: OAuthTokenResponse = await response.json()
  return data.access_token
}

async function searchShopOrders(token: string, site: string): Promise<ShopOrder[]> {
  // Essayer plusieurs formats de filtre
  const filters = [
    `Contract eq '${site}'`,
    `contains(Contract,'${site}')`,
    `startswith(Contract,'${site}')`
  ]
  
  for (const filter of filters) {
    try {
      const url = `${process.env.IFS_BASE_URL}/ShopOrderHandling.svc/ShopOrds?$filter=${encodeURIComponent(filter)}&$top=20&$select=OrderNo,ReleaseNo,SequenceNo,Contract,PartNo,ObjState`
      
      console.log(`   Essai filtre: ${filter}`)
      
      const response = await fetch(url, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        console.log(`   ✅ Filtre fonctionnel ! (${data.value?.length || 0} résultats)\n`)
        return data.value || []
      } else {
        console.log(`   ❌ ${response.status}`)
      }
    } catch (error) {
      console.log(`   ❌ Erreur: ${error}`)
    }
  }
  
  throw new Error(`Aucun filtre ne fonctionne pour ${site}`)
}

function generateSelectionString(shopOrders: ShopOrder[]): string {
  return shopOrders
    .map(so => `ORDER_NO=${so.OrderNo}^RELEASE_NO=${so.ReleaseNo}^SEQUENCE_NO=${so.SequenceNo}^`)
    .join(';') + ';'
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗')
  console.log('║   🔍 Recherche Shop Orders FR018 / FR01                   ║')
  console.log('╚════════════════════════════════════════════════════════════╝\n')

  try {
    console.log('🔐 Authentification IFS...')
    const token = await getIFSToken()
    console.log('✅ Token obtenu\n')

    const sites = ['FR018', 'FR01']

    for (const site of sites) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log(`📍 Site: ${site}`)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

      const shopOrders = await searchShopOrders(token, site)

      if (shopOrders.length === 0) {
        console.log(`❌ Aucun Shop Order trouvé pour ${site}\n`)
        continue
      }

      console.log(`✅ ${shopOrders.length} Shop Orders trouvés\n`)

      // Afficher les premiers
      console.log('📋 Premiers Shop Orders:')
      shopOrders.slice(0, 5).forEach((so, idx) => {
        console.log(`   ${idx + 1}. ORDER_NO=${so.OrderNo} RELEASE_NO=${so.ReleaseNo} SEQUENCE_NO=${so.SequenceNo}`)
        console.log(`      Part: ${so.PartNo || 'N/A'} | State: ${so.ObjState || 'N/A'}`)
      })

      // Générer le string Selection pour 3 premiers
      console.log('\n📤 Selection string (3 premiers):')
      const selectionString = generateSelectionString(shopOrders.slice(0, 3))
      console.log(selectionString)

      // Payload complet pour Azure Print
      console.log('\n📦 Payload pour Azure Print API:')
      console.log(JSON.stringify({
        Printer: 'PRTBX105_P',  // À adapter
        PrintModel: 'BEN_MA_FO_CR_184.rdl',
        Selection: selectionString
      }, null, 2))
      console.log()
    }

    console.log('╔════════════════════════════════════════════════════════════╗')
    console.log('║   ✅ Recherche terminée                                    ║')
    console.log('╚════════════════════════════════════════════════════════════╝')

  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  }
}

main()
