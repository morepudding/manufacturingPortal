#!/usr/bin/env tsx
/**
 * Script pour trouver un bon Shop Order de test pour Part Printer
 * 
 * Critères :
 * - Site: FR017
 * - Production Line: MASSIF
 * - Objstate: Released
 * - CBlockDates: false (redébit)
 * - Avec matériaux (MaterialHistorys)
 * - Avec attributs Master Part (Generic Code, Length Setup, Varnish Code)
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// Charger .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

import { getIFSClient } from '../src/shared/services/ifs-client';

async function findGoodTestShopOrder() {
  console.log('🔍 Recherche d\'un bon Shop Order de test pour Part Printer...\n');

  const client = getIFSClient();

  try {
    // 1. Rechercher des Shop Orders récents sur FR017/MASSIF
    console.log('📋 Étape 1: Récupération Shop Orders FR017/MASSIF...');
    
    const shopOrdersResponse = await client.get<{ value: any[] }>(
      'ShopOrderHandling.svc/ShopOrds',
      {
        $filter: "Contract eq 'FR017' and ProductionLine eq 'MASSIF' and CBlockDates eq false",
        $select: 'OrderNo,ReleaseNo,SequenceNo,PartNo,PartDescription,RevisedStartDate,CBlockDates,Objstate',
        $orderby: 'RevisedStartDate desc',
        $top: '50'
      }
    );

    if (!shopOrdersResponse.value || shopOrdersResponse.value.length === 0) {
      console.log('❌ Aucun Shop Order trouvé');
      return;
    }

    console.log(`✅ ${shopOrdersResponse.value.length} Shop Orders trouvés\n`);
    
    // Filtrer côté code pour Released uniquement
    const releasedOrders = shopOrdersResponse.value.filter((so: any) => so.Objstate === 'Released');
    console.log(`✅ ${releasedOrders.length} Shop Orders Released\n`);
    console.log('🔍 Test de chaque Shop Order pour trouver un candidat complet...\n');

    // 2. Tester chaque Shop Order
    for (const shopOrder of releasedOrders.slice(0, 10)) { // Tester les 10 premiers
      console.log('─'.repeat(80));
      console.log(`\n🧪 Test Shop Order ${shopOrder.OrderNo}`);
      console.log(`   Part: ${shopOrder.PartNo} (${shopOrder.PartDescription || 'N/A'})`);
      console.log(`   Date: ${shopOrder.RevisedStartDate}`);

      let hasOP10 = false;
      let hasMaterial = false;
      let hasAttributes = false;

      // Test 1: Vérifier OP10
      try {
        const op10Response = await client.get<{ value: any[] }>(
          'OperationBlockHandling.svc/Reference_ShopOrderOperation',
          {
            $filter: `OrderNo eq '${shopOrder.OrderNo}' and OperationNo eq 10`,
            $select: 'OperationNo,OperationBlockId',
            $top: '1'
          }
        );

        if (op10Response.value && op10Response.value.length > 0) {
          hasOP10 = true;
          console.log(`   ✅ OP10 existe (Block ID: ${op10Response.value[0].OperationBlockId || '(vide)'})`);
        } else {
          console.log(`   ❌ OP10 non trouvé`);
          continue; // Passer au suivant
        }
      } catch (error) {
        console.log(`   ❌ Erreur OP10`);
        continue;
      }

      // Test 2: Vérifier MaterialHistorys
      try {
        const materialResponse = await client.get<{ value: any[] }>(
          'ManufacturingMaterialHistoryHandling.svc/MaterialHistorys',
          {
            $filter: `OrderRef1 eq '${shopOrder.OrderNo}' and OperationNo eq 10`,
            $select: 'PartNo',
            $top: '1'
          }
        );

        if (materialResponse.value && materialResponse.value.length > 0) {
          hasMaterial = true;
          console.log(`   ✅ Raw Material: ${materialResponse.value[0].PartNo}`);
        } else {
          console.log(`   ⚠️  Pas de matériau (MaterialHistorys vide)`);
        }
      } catch (error) {
        console.log(`   ❌ Erreur MaterialHistorys`);
      }

      // Test 3: Vérifier attributs Master Part
      try {
        // Essayer avec PartHandling.svc comme dans ifs-test-14-single-part.ts
        const refResponse = await client.get<{ value: any[] }>(
          `PartHandling.svc/PartCatalogSet(PartNo='${shopOrder.PartNo}')/PartCatalogReferenceArray`,
          {}
        );

        if (refResponse.value && refResponse.value.length > 0) {
          const ref = refResponse.value.find((r: any) => r.TechnicalSpecNo != null);
          
          if (ref) {
            const keyRef = encodeURIComponent(ref.KeyRef);
            const techResponse = await client.get<{ value: any[] }>(
              `PartHandling.svc/PartCatalogSet(PartNo='${shopOrder.PartNo}')/PartCatalogReferenceArray(LuName='${ref.LuName}',KeyRef='${keyRef}',TechnicalSpecNo=${ref.TechnicalSpecNo})/TechnicalSpecBothArray`,
              {}
            );

            if (techResponse.value && techResponse.value.length > 0) {
              hasAttributes = true;
              
              // Chercher les 3 attributs clés
              const attrs = techResponse.value;
              const genericCode = attrs.find((a: any) => 
                (a.Attribute || a.AttrId || '').toUpperCase().includes('GENERIC')
              );
              const lengthSetup = attrs.find((a: any) => 
                (a.Attribute || a.AttrId || '').toUpperCase().includes('LENGTH')
              );
              const varnishCode = attrs.find((a: any) => 
                (a.Attribute || a.AttrId || '').toUpperCase().includes('VARNISH')
              );

              console.log(`   ✅ ${techResponse.value.length} attributs trouvés`);
              if (genericCode) console.log(`      • Generic Code: ${genericCode.AttrValue || genericCode.ValueText || 'N/A'}`);
              if (lengthSetup) console.log(`      • Length Setup: ${lengthSetup.AttrValue || lengthSetup.AttrValueNumeric || lengthSetup.ValueNo || 'N/A'}`);
              if (varnishCode) console.log(`      • Varnish Code: ${varnishCode.AttrValue || varnishCode.ValueText || 'N/A'}`);
            }
          }
        }
      } catch (error) {
        console.log(`   ⚠️  Erreur attributs (possible pour cette pièce)`);
      }

      // Résultat
      const score = (hasOP10 ? 1 : 0) + (hasMaterial ? 1 : 0) + (hasAttributes ? 1 : 0);
      console.log(`\n   📊 Score: ${score}/3`);

      if (score === 3) {
        console.log('\n🎯 ═══════════════════════════════════════════════════════');
        console.log('✅ BON CANDIDAT TROUVÉ !');
        console.log('═══════════════════════════════════════════════════════\n');
        console.log('📋 Utilisez ces paramètres dans Part Printer:');
        console.log(`   Site:              FR017`);
        console.log(`   Production Line:   MASSIF`);
        console.log(`   Start Date:        ${new Date(shopOrder.RevisedStartDate).toISOString().split('T')[0]}`);
        console.log(`   Mode:              Redébit (blockDate: false)`);
        console.log('\n📋 Ou testez avec le script:');
        console.log(`   npx tsx scripts/test-part-printer-shoporder-454853.ts`);
        console.log(`   (Modifiez le OrderNo à la ligne ~70 avec: '${shopOrder.OrderNo}')\n`);
        return; // Arrêter la recherche
      } else if (score === 2) {
        console.log(`   ⚠️  Candidat partiel (manque ${score === 2 ? 'attributs ou matériaux' : 'éléments'})`);
      }

      console.log(); // Ligne vide entre chaque test
    }

    console.log('\n⚠️  Aucun Shop Order complet trouvé dans les 10 premiers résultats');
    console.log('💡 Suggestions:');
    console.log('   1. Augmenter le $top dans la recherche initiale');
    console.log('   2. Chercher sur une période plus large');
    console.log('   3. Utiliser un Shop Order connu avec données complètes');

  } catch (error) {
    console.error('❌ Erreur:', error);
    if (error instanceof Error) {
      console.error('   Message:', error.message);
    }
  }
}

// Exécution
findGoodTestShopOrder();
