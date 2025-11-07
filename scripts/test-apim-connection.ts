/**
 * Script de test de connexion Azure APIM vers IFS Cloud
 * 
 * Tests:
 * 1. Authentification OAuth2 Azure AD
 * 2. Requête simple Shop Orders via APIM
 * 3. Validation de la réponse OData
 */

// Charger les variables d'environnement
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../.env.local') })

import { getIFSClient } from '@/shared/services/ifs-client'
import type { IFSODataResponse } from '@/shared/types/ifs'

interface IFSShopOrder {
  OrderNo: string
  ReleaseNo: string
  SequenceNo: string
  DopId: string
  PartNo?: string
  Contract?: string
  ObjState?: string
}

async function testAPIMConnection() {
  console.log('🚀 Test de connexion Azure APIM vers IFS Cloud\n')
  console.log('=' .repeat(60))

  try {
    // 1. Initialiser le client
    console.log('\n📦 1. Initialisation du client IFS (APIM)...')
    const client = getIFSClient()
    console.log('✅ Client IFS initialisé')

    // 2. Test d'authentification OAuth2
    console.log('\n🔑 2. Test authentification Azure AD OAuth2...')
    console.log(`   Token URL: ${process.env.IFS_TOKEN_URL}`)
    console.log(`   Scope: ${process.env.IFS_SCOPE}`)
    console.log(`   Client ID: ${process.env.IFS_CLIENT_ID}`)
    
    // 3. Test requête Shop Orders (cas simple)
    console.log('\n🔍 3. Test requête Shop Orders via APIM...')
    console.log(`   Base URL: ${process.env.IFS_BASE_URL}`)
    console.log(`   Endpoint: ShopOrderHandling.svc/ShopOrds`)
    console.log(`   Filter: contains(OrderNo,'97277')`)
    
    const response = await client.get<IFSODataResponse<IFSShopOrder>>(
      'ShopOrderHandling.svc/ShopOrds',
      {
        $filter: "contains(OrderNo,'97277')",
        $select: 'OrderNo,ReleaseNo,SequenceNo,DopId,PartNo,Contract',
        $top: '5'
      }
    )

    // 4. Validation de la réponse
    console.log('\n📊 4. Validation de la réponse...')
    
    if (!response || typeof response !== 'object') {
      throw new Error('Réponse invalide: pas un objet JSON')
    }

    if (!('value' in response)) {
      throw new Error('Réponse invalide: propriété "value" manquante')
    }

    const shopOrders = response.value
    console.log(`✅ Réponse OData valide`)
    console.log(`   Nombre de résultats: ${shopOrders.length}`)

    if (shopOrders.length > 0) {
      console.log('\n📋 Premiers résultats:')
      shopOrders.slice(0, 3).forEach((order, index) => {
        console.log(`   ${index + 1}. Order ${order.OrderNo}-${order.ReleaseNo}-${order.SequenceNo}`)
        console.log(`      - DOP ID: ${order.DopId}`)
        console.log(`      - Part No: ${order.PartNo || 'N/A'}`)
        console.log(`      - Contract: ${order.Contract || 'N/A'}`)
      })
    }

    // 5. Résumé
    console.log('\n' + '='.repeat(60))
    console.log('✅ TEST RÉUSSI - Connexion APIM fonctionnelle!')
    console.log('='.repeat(60))
    console.log('\n📊 Résumé:')
    console.log(`   ✓ Authentification OAuth2 Azure AD`)
    console.log(`   ✓ Connexion via Azure APIM`)
    console.log(`   ✓ Requête OData IFS`)
    console.log(`   ✓ Réponse JSON valide`)
    console.log(`   ✓ ${shopOrders.length} Shop Order(s) trouvé(s)`)
    
  } catch (error) {
    console.error('\n' + '='.repeat(60))
    console.error('❌ TEST ÉCHOUÉ')
    console.error('='.repeat(60))
    
    if (error instanceof Error) {
      console.error(`\n🔴 Erreur: ${error.message}`)
      
      if (error.message.includes('OAuth2')) {
        console.error('\n💡 Suggestions:')
        console.error('   - Vérifier IFS_CLIENT_ID et IFS_CLIENT_SECRET')
        console.error('   - Vérifier IFS_TOKEN_URL')
        console.error('   - Vérifier IFS_SCOPE (api://api.IFS.dev/.default)')
      } else if (error.message.includes('API request failed')) {
        console.error('\n💡 Suggestions:')
        console.error('   - Vérifier IFS_BASE_URL (APIM endpoint)')
        console.error('   - Vérifier que l\'endpoint existe dans l\'APIM')
        console.error('   - Vérifier les droits du client Azure AD')
      }
    } else {
      console.error('\n🔴 Erreur inconnue:', error)
    }
    
    process.exit(1)
  }
}

// Exécution
testAPIMConnection()
