/**
 * Script pour lister TOUS les layouts disponibles dans IFS Cloud
 * pour le Report ID : CUSTOMER_ORDER_CONF_REP
 */

// Charger les variables d'environnement
import { config } from 'dotenv'
config({ path: '.env.local' })

import { getIFSClient } from '../src/shared/services/ifs-client'

const TEST_ORDER = 'C1000059242'
const REPORT_ID = 'CUSTOMER_ORDER_CONF_REP'

async function listAllLayouts() {
  console.log('╔══════════════════════════════════════════════════════════╗')
  console.log('║   📋 Liste de TOUS les Layouts IFS Cloud                ║')
  console.log('╚══════════════════════════════════════════════════════════╝\n')

  const client = getIFSClient()

  try {
    // Générer un ResultKey pour interroger les layouts
    console.log('📥 Récupération Customer Order...')
    const orderResponse = await client.get<any>(
      `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${TEST_ORDER}')`
    )
    const etag = orderResponse['@odata.etag']

    console.log('🔑 Génération ResultKey...')
    const resultKeyResponse = await client.post<{ value: string }>(
      `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${TEST_ORDER}')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey`,
      { ReportId: REPORT_ID },
      { 'If-Match': etag }
    )
    const resultKey = parseInt(resultKeyResponse.value)
    console.log(`✅ ResultKey : ${resultKey}\n`)

    // Récupérer les informations du Print Dialog
    console.log('📋 Initialisation Print Dialog...')
    const dialogResponse = await client.post<any>(
      'PrintDialog.svc/PrintDialogInit',
      { ResultKey: resultKey }
    )

    console.log('✅ Informations Report :')
    console.log(`   Report ID : ${dialogResponse.ReportId}`)
    console.log(`   Report Title : ${dialogResponse.ReportTitle}`)
    console.log(`   Layout par défaut IFS : ${dialogResponse.LayoutName}`)
    console.log('')

    // Tenter de récupérer la liste des layouts depuis PrintDialog
    console.log('🔍 Recherche de tous les layouts disponibles...\n')

    // Méthode 1 : Interroger les metadata OData de PrintDialog
    console.log('📊 Méthode 1 : Metadata PrintDialog.svc')
    try {
      const metadata = await client.getRaw('PrintDialog.svc/$metadata')
      const metadataText = new TextDecoder().decode(metadata)
      
      // Chercher les EntitySets dans les metadata
      const entitySetMatches = metadataText.match(/<EntitySet[^>]*Name="[^"]*Layout[^"]*"[^>]*>/gi)
      
      if (entitySetMatches && entitySetMatches.length > 0) {
        console.log('✅ EntitySets trouvés avec "Layout" :')
        entitySetMatches.forEach((match, i) => {
          console.log(`   ${i + 1}. ${match}`)
        })
      } else {
        console.log('⚠️  Aucun EntitySet "Layout" trouvé dans les metadata')
      }
    } catch (error: any) {
      console.log(`❌ Erreur metadata : ${error.message}`)
    }

    console.log('')

    // Méthode 2 : Essayer des endpoints possibles
    console.log('📊 Méthode 2 : Endpoints possibles')
    
    const possibleEndpoints = [
      'PrintDialog.svc/ReportLayoutSet',
      'PrintDialog.svc/LayoutSet',
      'PrintDialog.svc/PrintLayoutSet',
      'PrintDialog.svc/ReportDefinitionSet',
      'ReportLayoutDefinition.svc/ReportLayoutDefinitionSet',
      'ReportDefinition.svc/ReportDefinitionSet',
    ]

    for (const endpoint of possibleEndpoints) {
      try {
        console.log(`\n🔍 Test : ${endpoint}`)
        const response = await client.get<any>(endpoint, { $top: '5' })
        
        if (response.value && response.value.length > 0) {
          console.log(`   ✅ Endpoint accessible ! ${response.value.length} résultat(s)`)
          
          // Afficher le premier résultat pour voir la structure
          console.log(`   📋 Exemple de données :`)
          const firstItem = response.value[0]
          Object.keys(firstItem).slice(0, 10).forEach(key => {
            console.log(`      ${key}: ${JSON.stringify(firstItem[key])}`)
          })
        } else {
          console.log(`   ⚠️  Endpoint accessible mais vide`)
        }
      } catch (error: any) {
        console.log(`   ❌ Endpoint inaccessible`)
      }
    }

    console.log('\n╔══════════════════════════════════════════════════════════╗')
    console.log('║   📊 Résumé                                              ║')
    console.log('╚══════════════════════════════════════════════════════════╝\n')

    console.log('🎯 Layout par défaut IFS (FONCTIONNE) :')
    console.log(`   → ${dialogResponse.LayoutName}`)
    console.log('')
    console.log('❌ Layout souhaité (ÉCHOUE - MISSINGOWNER) :')
    console.log('   → BEN_Boat_configuration_for_production.rdl')
    console.log('')
    console.log('💡 Actions recommandées :')
    console.log('   1. Envoyer l\'email à Thomas (voir template dans le terminal)')
    console.log('   2. Demander à configurer le "Layout Type Owner"')
    console.log('   3. Vérifier que le layout existe dans IFS Cloud')
    console.log('   4. En attendant, possibilité d\'utiliser : ' + dialogResponse.LayoutName)
    console.log('')

  } catch (error: any) {
    console.error('\n❌ Erreur globale :', error.message)
  }
}

// Exécuter
listAllLayouts()
  .then(() => {
    console.log('\n✅ Script terminé')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Erreur fatale :', error)
    process.exit(1)
  })
