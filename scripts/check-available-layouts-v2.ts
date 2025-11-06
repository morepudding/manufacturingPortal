/**
 * Script pour vérifier les layouts disponibles dans IFS Cloud
 * et identifier pourquoi BEN_Boat_configuration_for_production.rdl échoue
 */

// Charger les variables d'environnement
import { config } from 'dotenv'
config({ path: '.env.local' })

import { getIFSClient } from '../src/shared/services/ifs-client'

const TEST_ORDER = 'C1000059242' // Votre Customer Order
const REPORT_ID = 'CUSTOMER_ORDER_CONF_REP'

async function checkLayouts() {
  console.log('╔══════════════════════════════════════════════════════════╗')
  console.log('║   🔍 Vérification Layouts IFS Cloud                     ║')
  console.log('╚══════════════════════════════════════════════════════════╝\n')

  const client = getIFSClient()

  try {
    // ÉTAPE 1 : Récupérer le Customer Order + ETag
    console.log('📥 Étape 1 : Récupération Customer Order')
    const orderResponse = await client.get<any>(
      `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${TEST_ORDER}')`
    )
    const etag = orderResponse['@odata.etag']
    console.log(`✅ Order : ${TEST_ORDER}`)
    console.log(`✅ ETag : ${etag}\n`)

    // ÉTAPE 2 : Générer ResultKey
    console.log('🔑 Étape 2 : Génération ResultKey')
    const resultKeyResponse = await client.post<{ value: string }>(
      `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${TEST_ORDER}')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey`,
      { ReportId: REPORT_ID },
      { 'If-Match': etag }
    )
    const resultKey = parseInt(resultKeyResponse.value)
    console.log(`✅ ResultKey : ${resultKey}\n`)

    // ÉTAPE 3 : PrintDialogInit (récupère le layout par défaut)
    console.log('📋 Étape 3 : Initialisation PrintDialog')
    const dialogResponse = await client.post<any>(
      'PrintDialog.svc/PrintDialogInit',
      { ResultKey: resultKey }
    )

    console.log('✅ Informations du Print Dialog :')
    console.log(`   - Report Title : ${dialogResponse.ReportTitle}`)
    console.log(`   - Layout Name (défaut IFS) : ${dialogResponse.LayoutName}`)
    console.log(`   - Report ID : ${dialogResponse.ReportId}`)
    console.log(`   - Language Code : ${dialogResponse.LanguageCode}`)
    console.log(`   - Logical Printer : ${dialogResponse.LogicalPrinter}`)
    console.log('')

    // ÉTAPE 4 : Tester les 2 layouts
    const layoutsToTest = [
      { name: dialogResponse.LayoutName, description: 'Layout par défaut IFS' },
      { name: 'BEN_Boat_configuration_for_production.rdl', description: 'Layout custom souhaité' }
    ]

    console.log('╔══════════════════════════════════════════════════════════╗')
    console.log('║   🧪 Test des Layouts                                   ║')
    console.log('╚══════════════════════════════════════════════════════════╝\n')

    for (const layout of layoutsToTest) {
      console.log(`\n🧪 Test du layout : ${layout.name}`)
      console.log(`   Description : ${layout.description}`)

      try {
        // Tenter d'imprimer avec ce layout
        await client.post(
          'PrintDialog.svc/ReportPrintRequest',
          {
            ResultKey: resultKey,
            LayoutName: layout.name,
            LanguageCode: 'fr',
            LogicalPrinter: 'PDF_PRINTER',
            Copies: 1
          }
        )

        console.log(`   ✅ SUCCESS - Le layout fonctionne !`)
        console.log(`   📄 Layout : ${layout.name}`)

        // Attendre un peu pour voir si le PDF se génère
        console.log(`   ⏳ Attente génération PDF (5 secondes)...`)
        await new Promise(resolve => setTimeout(resolve, 5000))

        // Vérifier si le PDF existe
        const pdfArchive = await client.get<any>(
          `PrintDialog.svc/PdfArchiveSet?$filter=ResultKey eq ${resultKey}`
        )

        if (pdfArchive.value && pdfArchive.value.length > 0) {
          const pdf = pdfArchive.value[0]
          console.log(`   ✅ PDF généré :`)
          console.log(`      - FileName : ${pdf.FileName}`)
          console.log(`      - Size : ${(pdf.PdfSize / 1024).toFixed(2)} KB`)
          console.log(`      - Layout : ${pdf.LayoutName}`)
        } else {
          console.log(`   ⚠️  Aucun PDF trouvé (peut prendre plus de temps)`)
        }

      } catch (error: any) {
        console.log(`   ❌ ERREUR avec ce layout`)
        
        if (error.message.includes('MISSINGOWNER')) {
          console.log(`   🚨 Problème : Layout sans "owner" (solution d'impression)`)
          console.log(`   💡 Solution : Configurer le layout dans IFS Cloud`)
        } else if (error.message.includes('not found')) {
          console.log(`   🚨 Problème : Layout introuvable dans IFS`)
          console.log(`   💡 Solution : Vérifier le nom ou créer le layout`)
        } else {
          console.log(`   🚨 Erreur : ${error.message}`)
        }
      }

      // Pause entre les tests
      await new Promise(resolve => setTimeout(resolve, 2000))
    }

    console.log('\n╔══════════════════════════════════════════════════════════╗')
    console.log('║   📊 Résumé                                              ║')
    console.log('╚══════════════════════════════════════════════════════════╝\n')

    console.log('✅ Layout par défaut IFS : ' + dialogResponse.LayoutName)
    console.log('❓ Layout custom souhaité : BEN_Boat_configuration_for_production.rdl')
    console.log('')
    console.log('💡 Recommandations :')
    console.log('   1. Si le layout custom échoue avec MISSINGOWNER :')
    console.log('      → Contacter IFS pour configurer le "layout owner"')
    console.log('')
    console.log('   2. Si le layout custom est introuvable :')
    console.log('      → Vérifier le nom exact dans IFS Cloud')
    console.log('      → Ou utiliser le layout par défaut IFS')
    console.log('')
    console.log('   3. En attendant la configuration IFS :')
    console.log('      → Utiliser temporairement le layout par défaut')
    console.log('')

  } catch (error) {
    console.error('\n❌ Erreur globale :', error)
  }
}

// Exécuter le script
checkLayouts()
  .then(() => {
    console.log('\n✅ Script terminé')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Erreur fatale :', error)
    process.exit(1)
  })
