/**
 * TEST 12 : Test avec les part numbers fournis par l'utilisateur
 * Version simplifiée - copie exacte de la logique du test 8
 */

const IFS_BASE_URL = 'https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1';
const IFS_CLIENT_ID = 'AIS_IFS_MA_AST';
const IFS_CLIENT_SECRET = 'ifiW7xzKNmj3a1fpEukFIImPFztb51R9';
const IFS_TOKEN_URL = 'https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token';

let token: string | null = null;

// Liste des part numbers fournis par l'utilisateur
const userParts = [
  '1000009132',
  '1000009132G136',
  '1000010313',
  '1000010313G136',
  '1000011065',
  '1000011065G136',
  '1000011068',
  '1000011068G136',
  '1000011070',
  '1000011070G136',
  '1000011076',
  '1000011076G136',
  '1000011086',
  '1000011086G136',
  '1000011918',
  '1000011918G116',
  '1000012242',
  '1000012242G136',
  '1000012244',
  '1000012244G136',
  '1000013121',
  '1000013121G127',
  '1000013280',
  '1000013280G136',
  '1000013292',
  '1000013292G136',
  '1000013297',
  '1000013297G136',
  '1000013301',
  '1000013301G136',
  '1000013303',
  '1000013303G136',
  '1000013309',
  '1000013309G136',
  '1000014640',
  '1000014640G128'
];

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
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }

  return await response.json() as T;
}

interface PartResult {
  partNo: string;
  status: 'SUCCESS' | 'NOT_FOUND' | 'NO_REF' | 'NO_TECH' | 'ERROR';
  attributeCount: number;
  attributes: string[];
  partPrinterAttrs: {
    genericCode: string | null;
    lengthSetup: string | null;
    varnishCode: string | null;
  };
  error?: string;
}

async function testPart(partNo: string): Promise<PartResult> {
  const result: PartResult = {
    partNo,
    status: 'ERROR',
    attributeCount: 0,
    attributes: [],
    partPrinterAttrs: {
      genericCode: null,
      lengthSetup: null,
      varnishCode: null
    }
  };

  try {
    // Étape 1: Get PartCatalogReferenceArray
    const references = await ifsGet<any>(
      `PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray`
    );
    
    if (!references.value || references.value.length === 0) {
      result.status = 'NO_REF';
      return result;
    }

    // Trouver une référence avec TechnicalSpecNo
    const ref = references.value.find((r: any) => r.TechnicalSpecNo != null);
    
    if (!ref) {
      result.status = 'NO_TECH';
      return result;
    }

    // Étape 2: Get TechnicalSpecBothArray
    const keyRef = encodeURIComponent(ref.KeyRef);
    const technicalSpecs = await ifsGet<any>(
      `PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray(LuName='${ref.LuName}',KeyRef='${keyRef}',TechnicalSpecNo=${ref.TechnicalSpecNo})/TechnicalSpecBothArray`
    );
    
    if (!technicalSpecs.value || technicalSpecs.value.length === 0) {
      result.status = 'NO_TECH';
      return result;
    }

    result.status = 'SUCCESS';
    result.attributeCount = technicalSpecs.value.length;

    // Analyser les attributs
    for (const attr of technicalSpecs.value) {
      const attrName = attr.Attribute || attr.AttrId || 'UNKNOWN';
      const attrValue = attr.AttrValue || attr.ValueText || attr.AttrValueNumeric;
      
      result.attributes.push(attrName);

      // Chercher les attributs Part Printer
      if (attrName === 'GENERIC CODE' || attrName === 'GENERIC_CODE') {
        if (attrValue && attrValue !== 'N/A') {
          result.partPrinterAttrs.genericCode = String(attrValue);
        }
      }
      if (attrName === 'LENGTH SETUP' || attrName === 'LENGTH_SETUP') {
        if (attrValue && attrValue !== 'N/A') {
          result.partPrinterAttrs.lengthSetup = String(attrValue);
        }
      }
      if (attrName === 'VARNISH CODE' || attrName === 'VARNISH_CODE') {
        if (attrValue && attrValue !== 'N/A') {
          result.partPrinterAttrs.varnishCode = String(attrValue);
        }
      }
    }

    return result;

  } catch (error: any) {
    const msg = error.message || String(error);
    
    if (msg.includes('404')) {
      result.status = 'NOT_FOUND';
    } else {
      result.status = 'ERROR';
      result.error = msg.substring(0, 100);
    }
    
    return result;
  }
}

async function main() {
  console.log('🔍 TEST 12 : Scan des part numbers fournis par utilisateur\n');
  console.log('='.repeat(80));
  console.log(`📋 Nombre de parts : ${userParts.length}`);
  console.log('='.repeat(80));

  console.log('\n🔐 Authentification...');
  await getToken();
  console.log('✅ Token obtenu\n');

  const stats = {
    total: userParts.length,
    success: 0,
    notFound: 0,
    noRef: 0,
    noTech: 0,
    errors: 0,
    withPartPrinter: 0
  };

  const partsWithValues: PartResult[] = [];

  // Tester chaque part
  for (let i = 0; i < userParts.length; i++) {
    const partNo = userParts[i];
    const progress = `[${i + 1}/${userParts.length}]`;

    process.stdout.write(`${progress} ${partNo}... `);

    const result = await testPart(partNo);

    switch (result.status) {
      case 'SUCCESS':
        stats.success++;
        const hasValues = result.partPrinterAttrs.genericCode || 
                         result.partPrinterAttrs.lengthSetup || 
                         result.partPrinterAttrs.varnishCode;
        
        if (hasValues) {
          stats.withPartPrinter++;
          partsWithValues.push(result);
          console.log(`✅ ${result.attributeCount} attrs - PP TROUVÉ !`);
        } else {
          console.log(`⚪ ${result.attributeCount} attrs (pas PP)`);
        }
        break;
      
      case 'NOT_FOUND':
        stats.notFound++;
        console.log('❌ NOT FOUND');
        break;
      
      case 'NO_REF':
        stats.noRef++;
        console.log('⚠️  Pas de référence');
        break;
      
      case 'NO_TECH':
        stats.noTech++;
        console.log('⚠️  Pas de tech specs');
        break;
      
      case 'ERROR':
        stats.errors++;
        console.log(`❌ ERROR: ${result.error || 'unknown'}`);
        break;
    }
  }

  // Résultats
  console.log('\n' + '='.repeat(80));
  console.log('📊 RÉSULTATS FINAUX');
  console.log('='.repeat(80));
  console.log(`Total testées         : ${stats.total}`);
  console.log(`✅ Succès             : ${stats.success}`);
  console.log(`❌ Not found          : ${stats.notFound}`);
  console.log(`⚠️  Pas de référence  : ${stats.noRef}`);
  console.log(`⚠️  Pas de tech specs : ${stats.noTech}`);
  console.log(`❌ Erreurs            : ${stats.errors}`);
  console.log(`🎯 Avec PP attributes : ${stats.withPartPrinter}`);

  if (partsWithValues.length > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('🎉 PIÈCES AVEC ATTRIBUTS PART PRINTER');
    console.log('='.repeat(80));

    for (const part of partsWithValues) {
      console.log(`\n📦 ${part.partNo}`);
      console.log(`   Total attributs : ${part.attributeCount}`);
      console.log(`   ├─ GENERIC CODE : ${part.partPrinterAttrs.genericCode || '❌ VIDE'}`);
      console.log(`   ├─ LENGTH SETUP : ${part.partPrinterAttrs.lengthSetup || '❌ VIDE'}`);
      console.log(`   └─ VARNISH CODE : ${part.partPrinterAttrs.varnishCode || '❌ VIDE'}`);
      
      if (part.attributes.length <= 30) {
        console.log(`   Tous: ${part.attributes.join(', ')}`);
      }
    }
  } else {
    console.log('\n❌ AUCUNE PIÈCE AVEC ATTRIBUTS PART PRINTER TROUVÉE');
  }

  console.log('\n' + '='.repeat(80));
}

main().catch(e => {
  console.error('💥 Erreur fatale:', e);
  process.exit(1);
});
