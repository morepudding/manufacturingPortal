/**
 * Script de test pour TechnicalSpecBothArray
 * 
 * Test des 4 options de navigation OData pour récupérer les attributs
 * d'une Master Part (VARNISH CODE, LENGTH SETUP, etc.)
 * 
 * Pièce de test : 1000014690G136 (pièce réelle avec attributs)
 */

import { getIFSClient } from '../src/shared/services/ifs-client'

const TEST_PART_NO = '1000014690G136' // Pièce confirmée avec les 3 attributs

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
  console.log('🧪 TEST TECHNICAL SPEC BOTH ARRAY - Navigation OData\n')
  console.log(`📦 Pièce de test : ${TEST_PART_NO}\n`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  const client = getIFSClient()

  // ============================================================================
  // TEST A : Navigation directe (sans PartCatalogReferenceArray)
  // ============================================================================
  console.log('📡 Test A : Navigation directe\n')
  console.log(`GET /PartHandling.svc/PartCatalogSet(PartNo='${TEST_PART_NO}')/TechnicalSpecBothArray\n`)

  try {
    const responseA = await client.get(
      `PartHandling.svc/PartCatalogSet(PartNo='${TEST_PART_NO}')/TechnicalSpecBothArray`,
      {
        $filter: "Attribute eq 'VARNISH CODE'",
        $select: 'Attribute,ValueText'
      }
    )

    console.log('✅ Test A : SUCCÈS !\n')
    console.log('📊 Résultat:')
    console.log(JSON.stringify(responseA, null, 2))
    console.log('')
  } catch (error: any) {
    console.log('❌ Test A : ÉCHEC\n')
    console.log(`Erreur: ${error.message}\n`)
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  // ============================================================================
  // TEST B : Expansion + filtrage
  // ============================================================================
  console.log('📡 Test B : Expansion + filtrage\n')
  console.log(`GET /PartHandling.svc/PartCatalogSet(PartNo='${TEST_PART_NO}')?$expand=TechnicalSpecBothArray(...)\n`)

  try {
    const responseB = await client.get(
      `PartHandling.svc/PartCatalogSet(PartNo='${TEST_PART_NO}')`,
      {
        $expand: "TechnicalSpecBothArray($filter=Attribute eq 'VARNISH CODE';$select=Attribute,ValueText)"
      }
    )

    console.log('✅ Test B : SUCCÈS !\n')
    console.log('📊 Résultat:')
    console.log(JSON.stringify(responseB, null, 2))
    console.log('')
  } catch (error: any) {
    console.log('❌ Test B : ÉCHEC\n')
    console.log(`Erreur: ${error.message}\n`)
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  // ============================================================================
  // TEST C : Collection globale
  // ============================================================================
  console.log('📡 Test C : Collection globale\n')
  console.log(`GET /PartHandling.svc/TechnicalSpecBothArray?$filter=PartNo eq '${TEST_PART_NO}' and Attribute eq 'VARNISH CODE'\n`)

  try {
    const responseC = await client.get(
      'PartHandling.svc/TechnicalSpecBothArray',
      {
        $filter: `PartNo eq '${TEST_PART_NO}' and Attribute eq 'VARNISH CODE'`,
        $select: 'PartNo,Attribute,ValueText'
      }
    )

    console.log('✅ Test C : SUCCÈS !\n')
    console.log('📊 Résultat:')
    console.log(JSON.stringify(responseC, null, 2))
    console.log('')
  } catch (error: any) {
    console.log('❌ Test C : ÉCHEC\n')
    console.log(`Erreur: ${error.message}\n`)
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  // ============================================================================
  // TEST D : Alternative - InventoryPartCharacteristicsHandling
  // ============================================================================
  console.log('📡 Test D : Alternative - InventoryPartCharacteristicsHandling\n')
  console.log(`GET /InventoryPartCharacteristicsHandling.svc/InventoryPartCharacteristics?$filter=PartNo eq '${TEST_PART_NO}'\n`)

  try {
    const responseD = await client.get(
      'InventoryPartCharacteristicsHandling.svc/InventoryPartCharacteristics',
      {
        $filter: `PartNo eq '${TEST_PART_NO}'`,
        $select: 'PartNo,CharacteristicCode,CharacteristicValue'
      }
    )

    console.log('✅ Test D : SUCCÈS !\n')
    console.log('📊 Résultat:')
    console.log(JSON.stringify(responseD, null, 2))
    console.log('')
  } catch (error: any) {
    console.log('❌ Test D : ÉCHEC\n')
    console.log(`Erreur: ${error.message}\n`)
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  // ============================================================================
  // TEST BONUS : Récupérer TOUS les attributs de la pièce (sans filtre)
  // ============================================================================
  console.log('📡 Test BONUS : Tous les attributs de la pièce (Test A sans filtre)\n')
  console.log(`GET /PartHandling.svc/PartCatalogSet(PartNo='${TEST_PART_NO}')/TechnicalSpecBothArray\n`)

  try {
    const responseBonus: any = await client.get(
      `PartHandling.svc/PartCatalogSet(PartNo='${TEST_PART_NO}')/TechnicalSpecBothArray`,
      {
        $select: 'Attribute,ValueText,ValueNo'
      }
    )

    console.log('✅ Test BONUS : SUCCÈS !\n')
    console.log('📊 Tous les attributs disponibles:')
    
    if (responseBonus.value && Array.isArray(responseBonus.value)) {
      console.log(`   Nombre d'attributs : ${responseBonus.value.length}\n`)
      
      // Afficher les 10 premiers attributs
      responseBonus.value.slice(0, 10).forEach((attr: any, i: number) => {
        console.log(`   ${i + 1}. ${attr.Attribute}: ${attr.ValueText || attr.ValueNo || '(vide)'}`)
      })
      
      if (responseBonus.value.length > 10) {
        console.log(`   ... et ${responseBonus.value.length - 10} autres attributs`)
      }
      
      console.log('')
      
      // Rechercher les 3 attributs critiques
      const varnishCode = responseBonus.value.find((a: any) => a.Attribute === 'VARNISH CODE')
      const lengthSetup = responseBonus.value.find((a: any) => a.Attribute === 'LENGTH SETUP')
      const genericCode = responseBonus.value.find((a: any) => a.Attribute === 'GENERIC CODE')
      
      console.log('🎯 Attributs critiques Part Printer:')
      console.log(`   ✅ VARNISH CODE : ${varnishCode ? varnishCode.ValueText || '(vide)' : '❌ NON TROUVÉ'}`)
      console.log(`   ✅ LENGTH SETUP  : ${lengthSetup ? lengthSetup.ValueNo || '(vide)' : '❌ NON TROUVÉ'}`)
      console.log(`   ✅ GENERIC CODE  : ${genericCode ? genericCode.ValueText || '(vide)' : '❌ NON TROUVÉ'}`)
      console.log('')
    }
  } catch (error: any) {
    console.log('❌ Test BONUS : ÉCHEC\n')
    console.log(`Erreur: ${error.message}\n`)
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
  console.log('🎯 RÉSUMÉ DES TESTS\n')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
}

main()
