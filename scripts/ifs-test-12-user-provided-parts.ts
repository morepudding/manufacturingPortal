/**
 * TEST 12 : Test avec les part numbers fournis par l'utilisateur
 * 
 * L'utilisateur a fourni une liste de 36 part numbers qui devraient avoir
 * les attributs Part Printer (GENERIC CODE, LENGTH SETUP, VARNISH CODE)
 * 
 * Utilise la MÊME logique que test 8 qui fonctionne
 */

const IFS_BASE_URL = 'https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1';
const IFS_CLIENT_ID = '***REMOVED***';
const IFS_CLIENT_SECRET = '***REMOVED***';
const IFS_TOKEN_URL = 'https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token';

let cachedToken: string | null = null;

// Liste des part numbers fournis par l'utilisateur
const userProvidedParts = [
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

interface IFSToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface TechnicalAttribute {
  AttrId: string;
  AttrValue: string | null;
  AttrValueNumeric: number | null;
  TechnicalAttribStdRef?: {
    AttribName: string;
    AttribType: string;
  };
}

interface PartCatalogReference {
  LuName: string;
  KeyRef: string;
  TechnicalSpecNo: number;
  TechnicalSpecBothArray: TechnicalAttribute[];
}

interface PartCatalogItem {
  PartNo: string;
  Contract: string;
  Description: string;
  PartCatalogReferenceArray?: PartCatalogReference[];
}

async function getIFSToken(): Promise<string> {
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
    throw new Error(`Failed to get token: ${response.status}`);
  }

  const data = await response.json() as IFSToken;
  return data.access_token;
}

async function getPartWithAttributes(
  token: string, 
  partNo: string
): Promise<{ 
  part: PartCatalogItem | null; 
  attributes: TechnicalAttribute[];
  error?: string 
}> {
  try {
    // Étape 1: Récupérer PartCatalogReferenceArray
    const refUrl = `${IFS_BASE_URL}/PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray`;
    
    const refResponse = await fetch(refUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!refResponse.ok) {
      if (refResponse.status === 404) {
        return { part: null, attributes: [], error: '404_NOT_FOUND' };
      }
      return { part: null, attributes: [], error: `HTTP_${refResponse.status}` };
    }

    const refData = await refResponse.json() as { value: PartCatalogReference[] };
    
    if (!refData.value || refData.value.length === 0) {
      return { part: null, attributes: [], error: 'NO_REFERENCES' };
    }

    // Étape 2: Pour la première référence, récupérer TechnicalSpecBothArray
    const firstRef = refData.value[0];
    const keyRef = firstRef.KeyRef.replace(/'/g, "''"); // Escape quotes
    
    const techUrl = `${IFS_BASE_URL}/PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray(LuName='${firstRef.LuName}',KeyRef='${keyRef}',TechnicalSpecNo=${firstRef.TechnicalSpecNo})/TechnicalSpecBothArray`;
    const techQuery = '$expand=TechnicalAttribStdRef';
    
    const techResponse = await fetch(`${techUrl}?${techQuery}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!techResponse.ok) {
      return { part: null, attributes: [], error: `TECH_HTTP_${techResponse.status}` };
    }

    const techData = await techResponse.json() as { value: TechnicalAttribute[] };
    
    return { 
      part: { PartNo: partNo, Contract: '', Description: '' },
      attributes: techData.value || []
    };
  } catch (error: any) {
    return { part: null, attributes: [], error: error.message };
  }
}

function analyzePartAttributes(attributes: TechnicalAttribute[]): {
  hasStructure: boolean;
  hasValues: boolean;
  attributeList: { name: string; value: string | number | null }[];
  partPrinterAttributes: {
    genericCode: string | null;
    lengthSetup: string | null;
    varnishCode: string | null;
  };
} {
  const result = {
    hasStructure: attributes.length > 0,
    hasValues: false,
    attributeList: [] as { name: string; value: string | number | null }[],
    partPrinterAttributes: {
      genericCode: null as string | null,
      lengthSetup: null as string | null,
      varnishCode: null as string | null
    }
  };

  for (const attr of attributes) {
    const attrName = attr.TechnicalAttribStdRef?.AttribName || attr.AttrId;
    const attrValue = attr.AttrValue || attr.AttrValueNumeric;

    result.attributeList.push({
      name: attrName,
      value: attrValue
    });

    // Chercher les attributs Part Printer
    if (attrName === 'GENERIC CODE' && attrValue) {
      result.partPrinterAttributes.genericCode = String(attrValue);
      result.hasValues = true;
    }
    if (attrName === 'LENGTH SETUP' && attrValue) {
      result.partPrinterAttributes.lengthSetup = String(attrValue);
      result.hasValues = true;
    }
    if (attrName === 'VARNISH CODE' && attrValue) {
      result.partPrinterAttributes.varnishCode = String(attrValue);
      result.hasValues = true;
    }
  }

  return result;
}

async function main() {
  console.log('🔍 TEST 12 : Scan des part numbers fournis par utilisateur\n');
  console.log('='.repeat(80));
  console.log(`📋 Nombre de parts à tester : ${userProvidedParts.length}`);
  console.log('='.repeat(80));

  // Authentification
  console.log('\n🔐 Authentification IFS...');
  const token = await getIFSToken();
  console.log('✅ Token obtenu\n');

  // Résultats
  const results = {
    total: userProvidedParts.length,
    notFound: 0,
    found: 0,
    withStructure: 0,
    withPartPrinterAttributes: 0,
    errors: 0,
    partsWithValues: [] as {
      partNo: string;
      description: string;
      genericCode: string | null;
      lengthSetup: string | null;
      varnishCode: string | null;
      totalAttributes: number;
    }[]
  };

  // Tester chaque part
  for (let i = 0; i < userProvidedParts.length; i++) {
    const partNo = userProvidedParts[i];
    const progress = `[${i + 1}/${userProvidedParts.length}]`;

    process.stdout.write(`${progress} Test ${partNo}... `);

    const { part, attributes, error } = await getPartWithAttributes(token, partNo);

    if (error) {
      if (error === '404_NOT_FOUND') {
        console.log('❌ NOT FOUND');
        results.notFound++;
      } else if (error === 'NO_REFERENCES') {
        console.log('⚠️ Aucune référence');
        results.found++;
      } else {
        console.log(`❌ ERROR: ${error}`);
        results.errors++;
      }
      continue;
    }

    if (!part) {
      console.log('❌ NO DATA');
      results.errors++;
      continue;
    }

    results.found++;

    const analysis = analyzePartAttributes(attributes);

    if (!analysis.hasStructure) {
      console.log('⚠️ Aucun attribut');
      continue;
    }

    results.withStructure++;

    const { genericCode, lengthSetup, varnishCode } = analysis.partPrinterAttributes;
    const hasAnyValue = genericCode || lengthSetup || varnishCode;

    if (hasAnyValue) {
      results.withPartPrinterAttributes++;
      results.partsWithValues.push({
        partNo: part.PartNo,
        description: part.Description,
        genericCode,
        lengthSetup,
        varnishCode,
        totalAttributes: analysis.attributeList.length
      });

      console.log(`✅ VALEURS TROUVÉES !`);
      console.log(`   └─ Generic: ${genericCode || 'N/A'} | Length: ${lengthSetup || 'N/A'} | Varnish: ${varnishCode || 'N/A'}`);
    } else {
      console.log(`⚠️ Structure OK (${analysis.attributeList.length} attr) mais valeurs vides`);
    }
  }

  // Résumé final
  console.log('\n' + '='.repeat(80));
  console.log('📊 RÉSULTATS FINAUX');
  console.log('='.repeat(80));
  console.log(`Total parts testées      : ${results.total}`);
  console.log(`Parts trouvées dans IFS  : ${results.found}`);
  console.log(`Parts NOT FOUND          : ${results.notFound}`);
  console.log(`Parts avec erreur        : ${results.errors}`);
  console.log(`Parts avec structure     : ${results.withStructure}`);
  console.log(`Parts avec valeurs PP    : ${results.withPartPrinterAttributes}`);

  if (results.partsWithValues.length > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('🎉 PIÈCES AVEC ATTRIBUTS PART PRINTER');
    console.log('='.repeat(80));

    for (const part of results.partsWithValues) {
      console.log(`\n📦 ${part.partNo} - ${part.description}`);
      console.log(`   Total attributs : ${part.totalAttributes}`);
      console.log(`   ├─ GENERIC CODE  : ${part.genericCode || '❌ VIDE'}`);
      console.log(`   ├─ LENGTH SETUP  : ${part.lengthSetup || '❌ VIDE'}`);
      console.log(`   └─ VARNISH CODE  : ${part.varnishCode || '❌ VIDE'}`);
    }
  } else {
    console.log('\n❌ AUCUNE PIÈCE AVEC VALEURS TROUVÉE');
  }

  console.log('\n' + '='.repeat(80));
}

main().catch(console.error);
