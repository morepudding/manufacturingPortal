/**
 * Liste les premiers Shop Orders disponibles (sans filtre)
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

async function main() {
  // Token IFS
  const params = new URLSearchParams({
    client_id: process.env.IFS_CLIENT_ID!,
    client_secret: process.env.IFS_CLIENT_SECRET!,
    scope: process.env.IFS_SCOPE || 'openid',
    grant_type: 'client_credentials',
  })

  const tokenResponse = await fetch(process.env.IFS_TOKEN_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })

  const tokenData = await tokenResponse.json()
  const token = tokenData.access_token

  console.log('🔍 Récupération des 20 premiers Shop Orders (sans filtre)...\n')

  const response = await fetch(
    `${process.env.IFS_BASE_URL}/ShopOrderHandling.svc/ShopOrds?$top=20&$select=OrderNo,ReleaseNo,SequenceNo,Contract,PartNo,ObjState`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    }
  )

  if (!response.ok) {
    console.log('❌ Erreur:', response.status, response.statusText)
    process.exit(1)
  }

  const data = await response.json()
  console.log('✅ Résultats:', data.value?.length || 0, '\n')

  if (data.value && data.value.length > 0) {
    console.log('📋 Shop Orders trouvés:\n')
    data.value.forEach((so: any, idx: number) => {
      console.log(`${idx + 1}. Site: ${so.Contract} | ORDER_NO=${so.OrderNo} RELEASE_NO=${so.ReleaseNo} SEQUENCE_NO=${so.SequenceNo}`)
      console.log(`   Part: ${so.PartNo || 'N/A'} | State: ${so.ObjState || 'N/A'}\n`)
    })

    // Sites disponibles
    const sites = [...new Set(data.value.map((so: any) => so.Contract))]
    console.log('\n🏢 Sites disponibles dans ces résultats:')
    sites.forEach((site: string) => console.log(`   - ${site}`))

    // Générer Selection pour les 3 premiers FR*
    const frOrders = data.value.filter((so: any) => so.Contract.startsWith('FR'))
    if (frOrders.length > 0) {
      console.log('\n📤 Selection string pour les 3 premiers FR*:')
      const selection = frOrders.slice(0, 3)
        .map((so: any) => `ORDER_NO=${so.OrderNo}^RELEASE_NO=${so.ReleaseNo}^SEQUENCE_NO=${so.SequenceNo}^`)
        .join(';') + ';'
      console.log(selection)
    }
  }
}

main()
