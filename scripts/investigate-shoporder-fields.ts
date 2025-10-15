/**
 * Script d'investigation - Champs disponibles dans ShopOrderHandling.svc/ShopOrds
 * 
 * Objectif: Découvrir les VRAIS noms de champs IFS pour les dates et autres métadonnées
 * 
 * Utilisation:
 * npx tsx scripts/investigate-shoporder-fields.ts
 */

import 'dotenv/config'

const IFS_BASE_URL = process.env.IFS_BASE_URL || 'https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1'
const IFS_CLIENT_ID = process.env.IFS_CLIENT_ID || '***REMOVED***'
const IFS_CLIENT_SECRET = process.env.IFS_CLIENT_SECRET || '***REMOVED***'
const IFS_TOKEN_URL = process.env.IFS_TOKEN_URL || 'https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token'

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
 * Récupérer un Shop Order réel pour voir TOUS ses champs
 */
async function investigateShopOrderFields(token: string) {
  console.log('═══════════════════════════════════════════════════════')
  console.log('🔍 INVESTIGATION: ShopOrderHandling.svc/ShopOrds')
  console.log('═══════════════════════════════════════════════════════\n')

  // Stratégie: Récupérer UN Shop Order SANS $select pour voir TOUS les champs
  const url = `${IFS_BASE_URL}/ShopOrderHandling.svc/ShopOrds?$top=1`

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
    console.log('⚠️ Aucun Shop Order trouvé')
    return
  }

  const shopOrder = data.value[0]

  console.log('✅ Shop Order récupéré!\n')
  console.log('═══════════════════════════════════════════════════════')
  console.log('📊 TOUS LES CHAMPS DISPONIBLES:')
  console.log('═══════════════════════════════════════════════════════\n')

  // Lister TOUS les champs avec leurs valeurs
  const fields = Object.keys(shopOrder).sort()

  console.log(`Total de ${fields.length} champs:\n`)

  // Regrouper par catégorie
  const dateFields: string[] = []
  const statusFields: string[] = []
  const idFields: string[] = []
  const otherFields: string[] = []

  fields.forEach(field => {
    const value = shopOrder[field]
    const valueStr = value === null ? 'null' : typeof value === 'object' ? JSON.stringify(value) : value

    // Catégorisation
    if (field.toLowerCase().includes('date') || field.toLowerCase().includes('time')) {
      dateFields.push(field)
    } else if (field.toLowerCase().includes('state') || field.toLowerCase().includes('status')) {
      statusFields.push(field)
    } else if (field.toLowerCase().includes('no') || field.toLowerCase().includes('id')) {
      idFields.push(field)
    } else {
      otherFields.push(field)
    }

    console.log(`  ${field}: ${valueStr}`)
  })

  // Résumé par catégorie
  console.log('\n═══════════════════════════════════════════════════════')
  console.log('📊 CHAMPS PAR CATÉGORIE:')
  console.log('═══════════════════════════════════════════════════════\n')

  if (dateFields.length > 0) {
    console.log(`📅 DATES (${dateFields.length} champs):`)
    dateFields.forEach(field => {
      console.log(`  - ${field}: ${shopOrder[field]}`)
    })
    console.log()
  }

  if (statusFields.length > 0) {
    console.log(`🔄 STATUS/STATE (${statusFields.length} champs):`)
    statusFields.forEach(field => {
      console.log(`  - ${field}: ${shopOrder[field]}`)
    })
    console.log()
  }

  if (idFields.length > 0) {
    console.log(`🔑 IDs/NUMBERS (${idFields.length} champs):`)
    idFields.forEach(field => {
      console.log(`  - ${field}: ${shopOrder[field]}`)
    })
    console.log()
  }

  console.log(`📦 AUTRES (${otherFields.length} champs):`)
  otherFields.forEach(field => {
    console.log(`  - ${field}: ${shopOrder[field]}`)
  })

  // Recommandations
  console.log('\n═══════════════════════════════════════════════════════')
  console.log('💡 RECOMMANDATIONS POUR PART PRINTER:')
  console.log('═══════════════════════════════════════════════════════\n')

  console.log('Pour filtrer par date de début:')
  const scheduledFields = dateFields.filter(f => 
    f.toLowerCase().includes('sched') || 
    f.toLowerCase().includes('plan') ||
    f.toLowerCase().includes('start')
  )
  if (scheduledFields.length > 0) {
    console.log('✅ Champs candidats trouvés:')
    scheduledFields.forEach(field => {
      console.log(`  → ${field}: ${shopOrder[field]}`)
    })
  } else {
    console.log('❌ Aucun champ évident pour la date de début')
    console.log('📋 Tous les champs de date disponibles:')
    dateFields.forEach(field => {
      console.log(`  - ${field}`)
    })
  }

  console.log('\nPour filtrer par statut Released:')
  if (statusFields.length > 0) {
    console.log('✅ Champs status trouvés:')
    statusFields.forEach(field => {
      console.log(`  → ${field}: ${shopOrder[field]}`)
    })
  }

  console.log('\nPour filtrer par BlockDate:')
  const blockFields = fields.filter(f => f.toLowerCase().includes('block'))
  if (blockFields.length > 0) {
    console.log('✅ Champs block trouvés:')
    blockFields.forEach(field => {
      console.log(`  → ${field}: ${shopOrder[field]}`)
    })
  } else {
    console.log('❌ Aucun champ "block" trouvé')
  }

  console.log('\n═══════════════════════════════════════════════════════\n')
}

/**
 * Main
 */
async function main() {
  try {
    const token = await getToken()
    await investigateShopOrderFields(token)

    console.log('✅ Investigation terminée avec succès!')
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

main()
