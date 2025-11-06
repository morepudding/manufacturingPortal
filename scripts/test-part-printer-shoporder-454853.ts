#!/usr/bin/env tsx
/**
 * Script de test Part Printer - Shop Order 463215
 * Pièce: C000001026112G110 (TRAVERSE)
 * 
 * Ce script teste l'extraction complète des données nécessaires
 * pour générer une étiquette Part Printer.
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// Charger .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

import { getIFSClient } from '../src/shared/services/ifs-client';

interface ShopOrder {
  OrderNo: string;
  ReleaseNo: string;
  SequenceNo: string;
  Contract: string;
  PartNo: string;
  PartDescription: string;
  Objstate: string;
  RevisedStartDate: string;
  CBlockDates: boolean;
  ProductionLine: string;
  EngChgLevel: string;
}

interface Operation {
  OrderNo: string;
  ReleaseNo: string;
  SequenceNo: string;
  OperationNo: number;
  OperationBlockId?: string;
  WorkCenterNo?: string;
}

interface Material {
  OrderNo: string;
  ReleaseNo: string;
  SequenceNo: string;
  LineItemNo: number;
  PartNo: string;
  PartDescription?: string;
  OpNo?: number;
}

interface PartAttribute {
  PartNo: string;
  AttributeId: string;
  ValueText?: string;
  ValueNo?: number;
}

/**
 * Calculer le Range ID basé sur la date et le mode (débit/redébit)
 * 
 * Logique métier :
 * - Range = Quantième (jour de l'année) + Lettre
 * - Lettre : "R" si redébit (CBlockDates = false), sinon "A"
 * 
 * @param dateString - Date au format ISO (RevisedStartDate du Shop Order)
 * @param isRecutting - true si redébit (CBlockDates = false)
 * @returns Range ID (ex: "274 A" ou "274 R")
 */
function calculateRangeId(dateString: string, isRecutting: boolean): string {
  const date = new Date(dateString);
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  // Lettre du Range :
  // - "R" = Redébit (CBlockDates = false)
  // - "A" = Débit classique (CBlockDates = true)
  const letter = isRecutting ? 'R' : 'A';
  
  // Format: "DDD X" (ex: "274 A" ou "274 R")
  return `${dayOfYear} ${letter}`;
}

async function testShopOrder454853() {
  console.log('🚀 Test Part Printer - Shop Order 463215');
  console.log('📦 Pièce attendue: C000001026112G110 (TRAVERSE)\n');

  const client = getIFSClient();

  try {
    // =====================================================
    // ÉTAPE 1 : Récupérer le Shop Order 463215
    // =====================================================
    console.log('📋 ÉTAPE 1 : Récupération du Shop Order 463215...');
    
    const shopOrderResponse = await client.get<{ value: ShopOrder[] }>(
      'ShopOrderHandling.svc/ShopOrds',
      {
        $filter: "OrderNo eq '463215' and ReleaseNo eq '*' and SequenceNo eq '*'",
        $select: 'OrderNo,ReleaseNo,SequenceNo,Contract,PartNo,PartDescription,Objstate,RevisedStartDate,CBlockDates,ProductionLine,EngChgLevel'
      }
    );

    if (!shopOrderResponse.value || shopOrderResponse.value.length === 0) {
      console.error('❌ Shop Order 463215 introuvable !');
      return;
    }

    const shopOrder = shopOrderResponse.value[0];
    console.log('✅ Shop Order trouvé:');
    console.log(`   OrderNo: ${shopOrder.OrderNo}`);
    console.log(`   PartNo: ${shopOrder.PartNo}`);
    console.log(`   Description: ${shopOrder.PartDescription}`);
    console.log(`   Site (Contract): ${shopOrder.Contract}`);
    console.log(`   Production Line: ${shopOrder.ProductionLine}`);
    console.log(`   Start Date: ${shopOrder.RevisedStartDate}`);
    console.log(`   CBlockDates: ${shopOrder.CBlockDates}`);
    console.log(`   Engineering Rev: ${shopOrder.EngChgLevel}`);
    console.log(`   État (Objstate): ${shopOrder.Objstate}\n`);

    // =====================================================
    // ÉTAPE 2 : Récupérer l'opération OP10
    // =====================================================
    console.log('⚙️  ÉTAPE 2 : Récupération opération OP10...');
    
    const operationsResponse = await client.get<{ value: Operation[] }>(
      'OperationBlockHandling.svc/Reference_ShopOrderOperation',
      {
        $filter: `OrderNo eq '${shopOrder.OrderNo}' and ReleaseNo eq '${shopOrder.ReleaseNo}' and SequenceNo eq '${shopOrder.SequenceNo}'`,
        $select: 'OrderNo,ReleaseNo,SequenceNo,OperationNo,OperationBlockId,WorkCenterNo'
      }
    );

    let op10: Operation | undefined;
    if (operationsResponse.value && operationsResponse.value.length > 0) {
      const operations = operationsResponse.value;
      op10 = operations.find((op: Operation) => op.OperationNo === 10);
      
      if (op10) {
        console.log('✅ Opération OP10 trouvée:');
        console.log(`   Operation No: ${op10.OperationNo}`);
        console.log(`   Block ID: ${op10.OperationBlockId || '(vide)'}`);
        console.log(`   Work Center: ${op10.WorkCenterNo || '(non disponible)'}\n`);
      } else {
        console.warn('⚠️  Opération OP10 non trouvée. Recherche de l\'opération avec le plus petit numéro...');
        const sortedOps = operations.sort((a: Operation, b: Operation) => a.OperationNo - b.OperationNo);
        if (sortedOps.length > 0) {
          op10 = sortedOps[0];
          console.log(`✅ Opération ${op10!.OperationNo} trouvée (plus petit numéro):`);
          console.log(`   Block ID: ${op10!.OperationBlockId || '(vide)'}`);
          console.log(`   Work Center: ${op10!.WorkCenterNo || '(non disponible)'}\n`);
        }
      }
    }

    // =====================================================
    // ÉTAPE 3 : Récupérer le Raw Material (Material History)
    // =====================================================
    console.log('🪵 ÉTAPE 3 : Récupération Raw Material (via MaterialHistorys)...');
    
    const materialsResponse = await client.get<{ value: any[] }>(
      'ManufacturingMaterialHistoryHandling.svc/MaterialHistorys',
      {
        $filter: `OrderRef1 eq '${shopOrder.OrderNo}' and OperationNo eq 10`,
        $select: 'OrderRef1,PartNo,PartDescription,OperationNo,OrderType,MaterialHistoryAction,InventoryQty,InventoryUom',
        $top: '10'
      }
    );

    let rawMaterial: Material | undefined;
    if (materialsResponse.value && materialsResponse.value.length > 0) {
      const materials = materialsResponse.value;
      
      console.log(`✅ ${materials.length} matériau(x) trouvé(s) pour OP10`);
      console.log('\n📋 Liste des matériaux:');
      materials.forEach((mat: any, idx: number) => {
        console.log(`   ${idx + 1}. PartNo: ${mat.PartNo} | Description: ${mat.PartDescription || 'N/A'} | Qty: ${mat.InventoryQty} ${mat.InventoryUom}`);
      });
      
      // Prendre le premier matériau comme Raw Material
      rawMaterial = {
        OrderNo: shopOrder.OrderNo,
        ReleaseNo: shopOrder.ReleaseNo,
        SequenceNo: shopOrder.SequenceNo,
        LineItemNo: 0,
        PartNo: materials[0].PartNo,
        PartDescription: materials[0].PartDescription
      };
      
      console.log(`\n✅ Raw Material sélectionné: ${rawMaterial.PartNo} (${rawMaterial.PartDescription || 'N/A'})\n`);
    } else {
      console.warn('⚠️  Aucun matériau trouvé pour OP10\n');
    }

    // =====================================================
    // ÉTAPE 4 : Récupérer les attributs Master Part
    // =====================================================
    console.log('🏷️  ÉTAPE 4 : Récupération attributs Master Part...');
    console.log(`   Interrogation API pour: ${shopOrder.PartNo}\n`);

    const attributesToFind = [
      { id: 'GENERIC CODE', name: 'Generic Code' },
      { id: 'LENGTH SETUP', name: 'Length Setup' },
      { id: 'VARNISH CODE', name: 'Varnish Code' }
    ];

    const attributes: { [key: string]: string | number | null } = {};

    // Utiliser PartHandling.svc comme dans le script find-good-test-shoporder.ts
    try {
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
            console.log(`   ✅ ${techResponse.value.length} attributs trouvés\n`);
            
            // Chercher les 3 attributs clés
            for (const attr of attributesToFind) {
              const foundAttr = techResponse.value.find((a: any) => 
                (a.Attribute || a.AttrId || '').toUpperCase().includes(attr.id.split(' ')[0])
              );
              
              if (foundAttr) {
                const value = foundAttr.AttrValue || foundAttr.ValueText || foundAttr.AttrValueNumeric || foundAttr.ValueNo || null;
                attributes[attr.name] = value;
                console.log(`   ✅ ${attr.name}: ${value}`);
              } else {
                attributes[attr.name] = null;
                console.log(`   ⚠️  ${attr.name}: Non trouvé`);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(`   ❌ Erreur lors de la récupération des attributs:`, error);
      attributesToFind.forEach(attr => {
        attributes[attr.name] = null;
      });
    }

    console.log();

    // =====================================================
    // ÉTAPE 5 : Calculer le Range ID
    // =====================================================
    console.log('📍 ÉTAPE 5 : Calcul du Range ID...');
    
    // Logique : Quantième + Lettre
    // - "R" si Redébit (CBlockDates = false)
    // - "A" si Débit classique (CBlockDates = true)
    const isRecutting = !shopOrder.CBlockDates; // false = Redébit → "R"
    const rangeId = calculateRangeId(shopOrder.RevisedStartDate, isRecutting);
    
    console.log(`   ✅ Range ID calculé: ${rangeId}`);
    console.log(`   Mode: ${isRecutting ? 'Redébit (R)' : 'Débit classique (A)'}`);
    console.log(`   Date source: ${shopOrder.RevisedStartDate}\n`);

    // =====================================================
    // RÉSUMÉ FINAL
    // =====================================================
    console.log('═══════════════════════════════════════════════════════');
    console.log('📊 RÉSUMÉ - DONNÉES POUR ÉTIQUETTE PART PRINTER');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('🏷️  INFORMATIONS ÉTIQUETTE:');
    console.log(`   Shop Order:        ${shopOrder.OrderNo}-${shopOrder.ReleaseNo}-${shopOrder.SequenceNo}`);
    console.log(`   Part No:           ${shopOrder.PartNo}`);
    console.log(`   Raw Material:      ${rawMaterial?.PartNo || 'N/A ⚠️'}`);
    console.log(`   Block ID (OP10):   ${op10?.OperationBlockId || '(vide)'}`);
    console.log(`   Generic Code:      ${attributes['Generic Code'] || 'N/A ⚠️'}`);
    console.log(`   Length Setup:      ${attributes['Length Setup'] || 'N/A ⚠️'}`);
    console.log(`   Varnish Code:      ${attributes['Varnish Code'] || 'N/A ⚠️'}`);
    console.log(`   Engineering Rev:   ${shopOrder.EngChgLevel}`);
    console.log(`   Range ID:          ${rangeId} ✅\n`);

    console.log('📋 PARAMÈTRES INTERFACE PART PRINTER:');
    console.log(`   Site:              ${shopOrder.Contract}`);
    console.log(`   Production Line:   ${shopOrder.ProductionLine}`);
    console.log(`   Start Date:        ${new Date(shopOrder.RevisedStartDate).toISOString().split('T')[0]}`);
    console.log(`   Mode:              ${shopOrder.CBlockDates ? 'Débit classique' : 'Redébit'}`);
    console.log(`   OP10 Block ID:     ${op10?.OperationBlockId ? 'Filtrer sur valeur spécifique' : 'EMPTY (strictement vide)'}\n`);

    // Score final
    const totalFields = 11;
    const foundFields = [
      shopOrder.OrderNo,
      shopOrder.PartNo,
      rawMaterial?.PartNo,
      op10?.OperationBlockId !== undefined,
      attributes['Generic Code'],
      attributes['Length Setup'],
      attributes['Varnish Code'],
      shopOrder.EngChgLevel,
      rangeId,
      op10?.WorkCenterNo,
      shopOrder.Contract
    ].filter(v => v !== null && v !== undefined).length;

    console.log(`📊 SCORE: ${foundFields}/${totalFields} éléments trouvés (${Math.round(foundFields / totalFields * 100)}%)\n`);

    console.log('✅ Test terminé avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
    if (error instanceof Error) {
      console.error('   Message:', error.message);
      console.error('   Stack:', error.stack);
    }
  }
}

// Exécution
testShopOrder454853();
