/**
 * TEST 14 : Test rapide d'une seule pièce - 1000014690G136
 */

const IFS_BASE_URL = 'https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1';
const IFS_CLIENT_ID = '***REMOVED***';
const IFS_CLIENT_SECRET = '***REMOVED***';
const IFS_TOKEN_URL = 'https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token';

async function getToken() {
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

  const data = await response.json() as any;
  return data.access_token;
}

async function main() {
  console.log('🔍 TEST 14 : Pièce 1000014690G136 (AN29-13-00)\n');
  
  console.log('⏳ Authentification...');
  const token = await getToken();
  console.log('✅ Token obtenu\n');
  
  const partNo = '1000014690G136';
  
  console.log(`📦 Test de ${partNo}...\n`);
  
  // Step 1: Get references
  console.log('⏳ Récupération PartCatalogReferenceArray...');
  const refUrl = `${IFS_BASE_URL}/PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray`;
  const refResponse = await fetch(refUrl, {
    headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
  });
  
  console.log('✅ Réponse reçue');
  
  if (!refResponse.ok) {
    console.log(`❌ Erreur references: ${refResponse.status}`);
    return;
  }
  
  console.log('⏳ Parsing JSON...');
  const refData = await refResponse.json() as any;
  console.log('✅ JSON parsé');
  if (!refData.value || refData.value.length === 0) {
    console.log('❌ Pas de références');
    return;
  }
  
  const ref = refData.value.find((r: any) => r.TechnicalSpecNo != null);
  if (!ref) {
    console.log('❌ Pas de TechnicalSpecNo');
    return;
  }
  
  // Step 2: Get technical specs
  console.log('⏳ Récupération TechnicalSpecBothArray...');
  const keyRef = encodeURIComponent(ref.KeyRef);
  const techUrl = `${IFS_BASE_URL}/PartHandling.svc/PartCatalogSet(PartNo='${partNo}')/PartCatalogReferenceArray(LuName='${ref.LuName}',KeyRef='${keyRef}',TechnicalSpecNo=${ref.TechnicalSpecNo})/TechnicalSpecBothArray`;
  const techResponse = await fetch(techUrl, {
    headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
  });
  
  console.log('✅ Réponse tech specs reçue');
  
  if (!techResponse.ok) {
    console.log(`❌ Erreur tech specs: ${techResponse.status}`);
    return;
  }
  
  const techData = await techResponse.json() as any;
  
  console.log(`✅ ${techData.value.length} attributs trouvés\n`);
  console.log('='.repeat(80));
  
  let genericCode = null;
  let lengthSetup = null;
  let varnishCode = null;
  
  for (const attr of techData.value) {
    const name = attr.Attribute || attr.AttrId || 'UNKNOWN';
    const value = attr.AttrValue || attr.ValueText || attr.AttrValueNumeric || 'N/A';
    
    console.log(`   ${name.padEnd(35)} : ${value}`);
    
    if (name === 'GENERIC CODE' || name === 'GENERIC_CODE') {
      if (value && value !== 'N/A') genericCode = value;
    }
    if (name === 'LENGTH SETUP' || name === 'LENGTH_SETUP') {
      if (value && value !== 'N/A') lengthSetup = value;
    }
    if (name === 'VARNISH CODE' || name === 'VARNISH_CODE') {
      if (value && value !== 'N/A') varnishCode = value;
    }
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('🎯 ATTRIBUTS PART PRINTER:');
  console.log('='.repeat(80));
  console.log(`   GENERIC CODE : ${genericCode || '❌ VIDE'}`);
  console.log(`   LENGTH SETUP : ${lengthSetup || '❌ VIDE'}`);
  console.log(`   VARNISH CODE : ${varnishCode || '❌ VIDE'}`);
  console.log('='.repeat(80));
  
  const count = [genericCode, lengthSetup, varnishCode].filter(x => x !== null).length;
  
  if (count === 3) {
    console.log('\n🎉 SUCCESS ! LES 3 ATTRIBUTS TROUVÉS !\n');
  } else {
    console.log(`\n⚠️  ${count}/3 attributs trouvés\n`);
  }
}

main().catch(console.error);
