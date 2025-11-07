/**
 * 🔍 DEBUG : Exploration des Layouts et leurs Printing Solutions (Owners)
 * 
 * Ce script explore PrintDialog.svc pour comprendre :
 * - Quels layouts sont disponibles
 * - Quels "layout type owners" (printing solutions) sont définis
 * - Comment spécifier correctement le layout pour éviter l'erreur MISSINGOWNER
 */

import { getIFSClient } from '../src/shared/services/ifs-client'

async function debugLayoutOwner() {
  const client = getIFSClient()

  console.log('🔍 DEBUG Layout Type Owner (Printing Solution)')
  console.log('=' .repeat(70))
  console.log('')

  // TEST 1 : Explorer PrintLayoutTypeSet (définition des types de layouts)
  console.log('📊 TEST 1: Exploration PrintLayoutTypeSet')
  console.log('-'.repeat(70))
  try {
    const response1 = await client.get<any>(
      'PrintDialog.svc/PrintLayoutTypeSet',
      {
        $select: 'LayoutType,Description,Owner',
        $top: '20'
      }
    )

    console.log(`✅ Résultats trouvés: ${response1.value?.length || 0}`)
    
    if (response1.value && response1.value.length > 0) {
      console.log('\n🎨 Layout Types disponibles:')
      response1.value.forEach((type: any, idx: number) => {
        console.log(`\n   ${idx + 1}. Layout Type: ${type.LayoutType}`)
        console.log(`      Description: ${type.Description || 'N/A'}`)
        console.log(`      Owner: ${type.Owner || 'N/A'}`)
      })
    }
  } catch (error) {
    console.error('❌ Erreur TEST 1:', error instanceof Error ? error.message : error)
  }

  console.log('\n')

  // TEST 2 : Explorer ReportDefinitionSet pour CUSTOMER_ORDER_CONF_REP
  console.log('📊 TEST 2: Exploration ReportDefinitionSet')
  console.log('-'.repeat(70))
  try {
    const response2 = await client.get<any>(
      'PrintDialog.svc/ReportDefinitionSet',
      {
        $filter: "contains(ReportId,'CUSTOMER_ORDER')",
        $select: 'ReportId,ReportTitle,LayoutName,LayoutType',
        $top: '10'
      }
    )

    console.log(`✅ Résultats trouvés: ${response2.value?.length || 0}`)
    
    if (response2.value && response2.value.length > 0) {
      console.log('\n📄 Reports Customer Order disponibles:')
      response2.value.forEach((report: any, idx: number) => {
        console.log(`\n   ${idx + 1}. Report ID: ${report.ReportId}`)
        console.log(`      Title: ${report.ReportTitle || 'N/A'}`)
        console.log(`      Layout Name: ${report.LayoutName || 'N/A'}`)
        console.log(`      Layout Type: ${report.LayoutType || 'N/A'}`)
      })
    }
  } catch (error) {
    console.error('❌ Erreur TEST 2:', error instanceof Error ? error.message : error)
  }

  console.log('\n')

  // TEST 3 : Explorer le layout spécifique BEN_Boat_configuration_for_production.rdl
  console.log('📊 TEST 3: Exploration Layout BEN_Boat_configuration_for_production.rdl')
  console.log('-'.repeat(70))
  try {
    const layoutName = 'BEN_Boat_configuration_for_production.rdl'
    const response3 = await client.get<any>(
      'PrintDialog.svc/ReportLayoutDefinitionSet',
      {
        $filter: `contains(LayoutName,'${layoutName}')`,
        $select: 'ReportId,LayoutName,LayoutType,Description',
        $top: '5'
      }
    )

    console.log(`✅ Résultats trouvés: ${response3.value?.length || 0}`)
    
    if (response3.value && response3.value.length > 0) {
      console.log(`\n📄 Layout "${layoutName}":`)
      response3.value.forEach((layout: any, idx: number) => {
        console.log(`\n   ${idx + 1}. Report ID: ${layout.ReportId}`)
        console.log(`      Layout Name: ${layout.LayoutName}`)
        console.log(`      Layout Type: ${layout.LayoutType || 'N/A'}`)
        console.log(`      Description: ${layout.Description || 'N/A'}`)
      })
    } else {
      console.log(`⚠️  Layout "${layoutName}" non trouvé`)
      console.log(`   💡 Essayons sans l'extension .rdl...`)

      // Retry sans .rdl
      const layoutNameNoExt = layoutName.replace('.rdl', '')
      const response3b = await client.get<any>(
        'PrintDialog.svc/ReportLayoutDefinitionSet',
        {
          $filter: `contains(LayoutName,'${layoutNameNoExt}')`,
          $select: 'ReportId,LayoutName,LayoutType,Description',
          $top: '5'
        }
      )

      if (response3b.value && response3b.value.length > 0) {
        console.log(`\n📄 Layout "${layoutNameNoExt}":`)
        response3b.value.forEach((layout: any, idx: number) => {
          console.log(`\n   ${idx + 1}. Report ID: ${layout.ReportId}`)
          console.log(`      Layout Name: ${layout.LayoutName}`)
          console.log(`      Layout Type: ${layout.LayoutType || 'N/A'}`)
          console.log(`      Description: ${layout.Description || 'N/A'}`)
        })
      }
    }
  } catch (error) {
    console.error('❌ Erreur TEST 3:', error instanceof Error ? error.message : error)
  }

  console.log('\n')

  // TEST 4 : Lister TOUS les layouts disponibles pour CUSTOMER_ORDER_CONF_REP
  console.log('📊 TEST 4: Tous les layouts pour CUSTOMER_ORDER_CONF_REP')
  console.log('-'.repeat(70))
  try {
    const response4 = await client.get<any>(
      'PrintDialog.svc/ReportLayoutDefinitionSet',
      {
        $filter: "ReportId eq 'CUSTOMER_ORDER_CONF_REP'",
        $select: 'ReportId,LayoutName,LayoutType,Description',
        $top: '20'
      }
    )

    console.log(`✅ Résultats trouvés: ${response4.value?.length || 0}`)
    
    if (response4.value && response4.value.length > 0) {
      console.log('\n📄 Layouts disponibles pour CUSTOMER_ORDER_CONF_REP:')
      response4.value.forEach((layout: any, idx: number) => {
        console.log(`\n   ${idx + 1}. Layout Name: ${layout.LayoutName}`)
        console.log(`      Layout Type: ${layout.LayoutType || '⚠️ UNDEFINED (cause du problème?)'}`)
        console.log(`      Description: ${layout.Description || 'N/A'}`)
      })

      console.log('\n💡 RECOMMANDATION:')
      const validLayouts = response4.value.filter((l: any) => l.LayoutType)
      if (validLayouts.length > 0) {
        console.log('   Utilisez un de ces layouts avec LayoutType défini:')
        validLayouts.forEach((l: any) => {
          console.log(`   - ${l.LayoutName} (Type: ${l.LayoutType})`)
        })
      }
    }
  } catch (error) {
    console.error('❌ Erreur TEST 4:', error instanceof Error ? error.message : error)
  }

  console.log('\n')

  // TEST 5 : Explorer PrintLayoutOwnerSet
  console.log('📊 TEST 5: Exploration PrintLayoutOwnerSet')
  console.log('-'.repeat(70))
  try {
    const response5 = await client.get<any>(
      'PrintDialog.svc/PrintLayoutOwnerSet',
      {
        $select: 'Owner,Description',
        $top: '20'
      }
    )

    console.log(`✅ Résultats trouvés: ${response5.value?.length || 0}`)
    
    if (response5.value && response5.value.length > 0) {
      console.log('\n🎨 Printing Solutions (Owners) disponibles:')
      response5.value.forEach((owner: any, idx: number) => {
        console.log(`   ${idx + 1}. Owner: ${owner.Owner}`)
        console.log(`      Description: ${owner.Description || 'N/A'}`)
      })
    }
  } catch (error) {
    console.error('❌ Erreur TEST 5:', error instanceof Error ? error.message : error)
  }

  console.log('\n' + '='.repeat(70))
  console.log('✅ Analyse terminée')
  console.log('')
  console.log('💡 CONCLUSIONS ATTENDUES :')
  console.log('   1. Identifier le LayoutType correct pour votre layout')
  console.log('   2. Vérifier que ce LayoutType a un Owner défini')
  console.log('   3. Utiliser un layout avec LayoutType valide dans ReportPrintRequest')
}

// Exécuter le script
debugLayoutOwner().catch(console.error)
