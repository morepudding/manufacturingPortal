/**
 * TEST 13 : Recherche inversée - Trouver des pièces avec LES 3 ATTRIBUTS
 * 
 * Stratégie:
 * 1. Scanner des InventoryParts au hasard
 * 2. Pour chaque part, vérifier si elle a PartCatalog
 * 3. Checker si elle a GENERIC CODE + LENGTH SETUP + VARNISH CODE
 * 4. S'arrêter dès qu'on trouve 5 pièces complètes
 */

const IFS_BASE_URL = 'https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1';
const IFS_CLIENT_ID = process.env.IFS_CLIENT_ID || '';
const IFS_CLIENT_SECRET = process.env.IFS_CLIENT_SECRET || '';
const IFS_TOKEN_URL = 'https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token';

let token: string | null = null;

async function getToken(): Promise<string> {
  if (token) return token;

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', IFS_CLIENT_ID);
  params.append('client_secret', IFS_CLIENT_SECRET);
  params.append('scope', 'openid microprofile-jwt');

  const response = await fetch(IFS_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });

  if (!response.ok) {
    throw new Error(`Token failed: ${response.status}`);
  }

  const data = await response.json() as any;
  token = data.access_token;
  return token;
}

async function ifsGet<T>(endpoint: string): Promise<T> {
  const authToken = await getToken();
  const url = `${IFS_BASE_URL}/${endpoint}`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return await response.json() as T;
}

interface PartAttributes {
  genericCode: string | null;
  lengthSetup: string | null;
  varnishCode: string | null;
  allAttributes: { name: string; value: any }[];
}

async function checkPartAttributes(partNo: string): Promise<PartAttributes | null> {
  try {
    // Step 1: Get PartCatalogReferenceArray
    const references = await ifsGet<any>(
      `PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray`
    );
    
    if (!references.value || references.value.length === 0) {
      return null;
    }

    // Find reference with TechnicalSpecNo
    const ref = references.value.find((r: any) => r.TechnicalSpecNo != null);
    if (!ref) {
      return null;
    }

    // Step 2: Get TechnicalSpecBothArray
    const keyRef = encodeURIComponent(ref.KeyRef);
    const technicalSpecs = await ifsGet<any>(
      `PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray(LuName='${ref.LuName}',KeyRef='${keyRef}',TechnicalSpecNo=${ref.TechnicalSpecNo})/TechnicalSpecBothArray`
    );
    
    if (!technicalSpecs.value || technicalSpecs.value.length === 0) {
      return null;
    }

    // Parse attributes
    const result: PartAttributes = {
      genericCode: null,
      lengthSetup: null,
      varnishCode: null,
      allAttributes: []
    };

    for (const attr of technicalSpecs.value) {
      const attrName = attr.Attribute || attr.AttrId || 'UNKNOWN';
      const attrValue = attr.AttrValue || attr.ValueText || attr.AttrValueNumeric;
      
      result.allAttributes.push({ name: attrName, value: attrValue });

      // Check for Part Printer attributes
      if ((attrName === 'GENERIC CODE' || attrName === 'GENERIC_CODE') && attrValue && attrValue !== 'N/A') {
        result.genericCode = String(attrValue);
      }
      if ((attrName === 'LENGTH SETUP' || attrName === 'LENGTH_SETUP') && attrValue && attrValue !== 'N/A') {
        result.lengthSetup = String(attrValue);
      }
      if ((attrName === 'VARNISH CODE' || attrName === 'VARNISH_CODE') && attrValue && attrValue !== 'N/A') {
        result.varnishCode = String(attrValue);
      }
    }

    return result;

  } catch (error: any) {
    return null;
  }
}

async function scanInventoryParts(site: string, maxToScan: number = 1000): Promise<string[]> {
  console.log(`\n📋 Récupération de ${maxToScan} parts du site ${site}...`);
  
  try {
    const response = await ifsGet<any>(
      `InventoryPartHandling.svc/InventoryPartSet?$filter=Contract eq '${site}'&$top=${maxToScan}&$select=PartNo`
    );
    
    const parts = response.value.map((p: any) => p.PartNo);
    console.log(`✅ ${parts.length} parts récupérées\n`);
    return parts;
  } catch (error) {
    console.error(`❌ Erreur récupération parts: ${error}`);
    return [];
  }
}

async function main() {
  console.log('🔍 TEST 13 : Recherche inversée - Pièces avec 3 attributs Part Printer\n');
  console.log('='.repeat(80));
  console.log('🎯 Objectif: Trouver des pièces avec GENERIC CODE + LENGTH SETUP + VARNISH CODE');
  console.log('='.repeat(80));

  console.log('\n🔐 Authentification...');
  await getToken();
  console.log('✅ Token obtenu');

  // Scan multiple sites
  const sites = ['BDR', 'IT001', 'PRTBX'];
  const partsToCheck: string[] = [];

  for (const site of sites) {
    const siteParts = await scanInventoryParts(site, 500);
    partsToCheck.push(...siteParts);
  }

  console.log(`\n📊 Total parts à scanner: ${partsToCheck.length}`);
  console.log('='.repeat(80));

  const stats = {
    scanned: 0,
    withCatalog: 0,
    with1Attr: 0,
    with2Attrs: 0,
    with3Attrs: 0,
    errors: 0
  };

  const completePartsFound: Array<{
    partNo: string;
    genericCode: string;
    lengthSetup: string;
    varnishCode: string;
    totalAttrs: number;
  }> = [];

  const TARGET_COMPLETE_PARTS = 10;

  // Scan parts
  for (let i = 0; i < partsToCheck.length; i++) {
    const partNo = partsToCheck[i];
    stats.scanned++;

    if (stats.scanned % 50 === 0) {
      process.stdout.write(`\r[${stats.scanned}/${partsToCheck.length}] Scannées: ${stats.scanned} | Catalog: ${stats.withCatalog} | Complètes: ${stats.with3Attrs}`);
    }

    const attrs = await checkPartAttributes(partNo);

    if (!attrs) {
      stats.errors++;
      continue;
    }

    stats.withCatalog++;

    const attrCount = [attrs.genericCode, attrs.lengthSetup, attrs.varnishCode].filter(x => x !== null).length;
    
    if (attrCount === 1) stats.with1Attr++;
    if (attrCount === 2) stats.with2Attrs++;
    if (attrCount === 3) {
      stats.with3Attrs++;
      
      completePartsFound.push({
        partNo,
        genericCode: attrs.genericCode!,
        lengthSetup: attrs.lengthSetup!,
        varnishCode: attrs.varnishCode!,
        totalAttrs: attrs.allAttributes.length
      });

      console.log(`\n🎉 TROUVÉ #${stats.with3Attrs}: ${partNo}`);
      console.log(`   ├─ GENERIC CODE : ${attrs.genericCode}`);
      console.log(`   ├─ LENGTH SETUP : ${attrs.lengthSetup}`);
      console.log(`   └─ VARNISH CODE : ${attrs.varnishCode}`);

      if (stats.with3Attrs >= TARGET_COMPLETE_PARTS) {
        console.log(`\n✅ Objectif atteint: ${TARGET_COMPLETE_PARTS} pièces complètes trouvées!`);
        break;
      }
    }
  }

  // Final results
  console.log('\n\n' + '='.repeat(80));
  console.log('📊 RÉSULTATS FINAUX');
  console.log('='.repeat(80));
  console.log(`Parts scannées        : ${stats.scanned}`);
  console.log(`Parts avec catalog    : ${stats.withCatalog}`);
  console.log(`Parts avec 1 attribut : ${stats.with1Attr}`);
  console.log(`Parts avec 2 attributs: ${stats.with2Attrs}`);
  console.log(`Parts avec 3 attributs: ${stats.with3Attrs} 🎯`);
  console.log(`Erreurs               : ${stats.errors}`);

  if (completePartsFound.length > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('🎉 PIÈCES COMPLÈTES TROUVÉES');
    console.log('='.repeat(80));

    for (const part of completePartsFound) {
      console.log(`\n📦 ${part.partNo}`);
      console.log(`   Total attributs : ${part.totalAttrs}`);
      console.log(`   ├─ GENERIC CODE : ${part.genericCode}`);
      console.log(`   ├─ LENGTH SETUP : ${part.lengthSetup}`);
      console.log(`   └─ VARNISH CODE : ${part.varnishCode}`);
    }

    console.log('\n' + '='.repeat(80));
    console.log('✅ SOLUTION VALIDÉE - Les 3 attributs existent dans IFS AST !');
    console.log('='.repeat(80));
  } else {
    console.log('\n❌ AUCUNE PIÈCE COMPLÈTE TROUVÉE');
    console.log('⚠️  LENGTH SETUP peut ne pas être configuré dans AST');
  }

  console.log('\n');
}

main().catch(e => {
  console.error('💥 Erreur fatale:', e);
  process.exit(1);
});
