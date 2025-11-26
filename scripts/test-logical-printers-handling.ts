/**
 * Script de test : LogicalPrintersHandling.svc/LogicalPrinterSet
 * 
 * Objectif: Tester l'endpoint LogicalPrintersHandling (pas PrintDialog)
 * avec les bons noms de champs (PrinterId au lieu de LogicalPrinter)
 * 
 * Usage: npx tsx scripts/test-logical-printers-handling.ts
 */

// Configuration IFS Direct (ancien système)
const IFS_CONFIG = {
  baseUrl: 'https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1',
  clientId: 'AIS_IFS_MA_AST',
  clientSecret: 'ifiW7xzKNmj3a1fpEukFIImPFztb51R9',
  tokenUrl: 'https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token',
  scope: 'openid microprofile-jwt'
}

interface IFSTokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

interface IFSPrinter {
  PrinterId: string          // ✅ Nom correct du champ
  Description: string
  [key: string]: any
}

interface IFSODataResponse {
  '@odata.context': string
  value: IFSPrinter[]
}

/**
 * Étape 1 : Obtenir le token OAuth2 IFS
 */
async function getIFSToken(): Promise<string> {
  console.log('🔐 [1/3] Obtention du token OAuth2 IFS...')
  console.log(`   Token URL: ${IFS_CONFIG.tokenUrl}`)
  console.log(`   Client ID: ${IFS_CONFIG.clientId}`)

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: IFS_CONFIG.clientId,
    client_secret: IFS_CONFIG.clientSecret,
    scope: IFS_CONFIG.scope
  })

  try {
    const response = await fetch(IFS_CONFIG.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body.toString()
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Token request failed: ${response.status} - ${errorText}`)
    }

    const data = await response.json() as IFSTokenResponse
    console.log(`   ✅ Token obtenu (expire dans ${data.expires_in}s)`)
    console.log(`   Token type: ${data.token_type}`)
    console.log(`   Token preview: ${data.access_token.substring(0, 50)}...`)
    
    return data.access_token
  } catch (error) {
    console.error('   ❌ Erreur obtention token:', error)
    throw error
  }
}

/**
 * Étape 2 : Interroger l'endpoint LogicalPrintersHandling
 */
async function getLogicalPrinters(accessToken: string): Promise<IFSPrinter[]> {
  console.log('\n🖨️  [2/3] Récupération LogicalPrintersHandling.svc/LogicalPrinterSet...')
  
  const endpoint = `${IFS_CONFIG.baseUrl}/LogicalPrintersHandling.svc/LogicalPrinterSet`
  console.log(`   Endpoint: ${endpoint}`)

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API request failed: ${response.status} - ${errorText}`)
    }

    const data = await response.json() as IFSODataResponse
    console.log(`   ✅ ${data.value.length} imprimantes trouvées`)
    
    return data.value
  } catch (error) {
    console.error('   ❌ Erreur récupération imprimantes:', error)
    throw error
  }
}

/**
 * Étape 3 : Afficher les détails des imprimantes
 */
function displayPrinters(printers: IFSPrinter[]): void {
  console.log('\n📊 [3/3] Détails des imprimantes IFS:')
  console.log('=' .repeat(100))

  if (printers.length === 0) {
    console.log('⚠️  Aucune imprimante trouvée')
    return
  }

  // Afficher le premier objet complet pour voir tous les champs disponibles
  console.log('\n🔍 Structure du premier objet (tous les champs):')
  console.log(JSON.stringify(printers[0], null, 2))

  // Afficher les 20 premières imprimantes
  console.log('\n📋 Liste des 20 premières imprimantes:')
  console.log('-'.repeat(100))
  console.log('N° | PrinterId      | Description')
  console.log('-'.repeat(100))

  printers.slice(0, 20).forEach((printer, index) => {
    const printerId = printer.PrinterId || 'N/A'
    const description = printer.Description || 'N/A'
    
    console.log(
      `${(index + 1).toString().padEnd(2)} | ` +
      `${printerId.padEnd(14)} | ` +
      `${description}`
    )
  })

  console.log('-'.repeat(100))

  // Si d'autres champs existent, les lister
  const allKeys = new Set<string>()
  printers.forEach(printer => {
    Object.keys(printer).forEach(key => {
      if (!key.startsWith('@')) {
        allKeys.add(key)
      }
    })
  })

  console.log('\n🔑 Tous les champs disponibles:')
  Array.from(allKeys).sort().forEach(key => {
    // Compter combien d'imprimantes ont ce champ non-null
    const nonNullCount = printers.filter(p => p[key] != null).length
    console.log(`   - ${key.padEnd(20)} (${nonNullCount}/${printers.length} non-null)`)
  })

  // Statistiques
  console.log('\n📈 Statistiques:')
  console.log(`   Total imprimantes: ${printers.length}`)
  console.log(`   Champs uniques: ${allKeys.size}`)
  
  // Exemples de PrinterId
  console.log('\n🏷️  Exemples de PrinterId:')
  printers.slice(0, 10).forEach(p => {
    console.log(`   - ${p.PrinterId}`)
  })
}

/**
 * Point d'entrée principal
 */
async function main() {
  console.log('🚀 Test LogicalPrintersHandling.svc/LogicalPrinterSet - IFS Cloud Direct\n')
  console.log('Configuration:')
  console.log(`   Base URL: ${IFS_CONFIG.baseUrl}`)
  console.log(`   Client ID: ${IFS_CONFIG.clientId}`)
  console.log(`   Scope: ${IFS_CONFIG.scope}\n`)

  try {
    // Étape 1 : Authentification
    const token = await getIFSToken()

    // Étape 2 : Récupération des imprimantes
    const printers = await getLogicalPrinters(token)

    // Étape 3 : Affichage
    displayPrinters(printers)

    console.log('\n✅ Test terminé avec succès!')

  } catch (error) {
    console.error('\n❌ Test échoué:', error)
    process.exit(1)
  }
}

// Exécution
main()
