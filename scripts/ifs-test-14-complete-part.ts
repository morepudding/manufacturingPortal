/**
 * TEST 14 : Test de la pièce 1000014690G136 (devrait avoir les 3 attributs)
 */

const partToTest = '1000014690G136';

async function main() {
  console.log(`\n🔍 TEST 14 : ${partToTest}\n`);
  
  // Token
  const tokenRes = await fetch('https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: 'AIS_IFS_MA_AST',
      client_secret: 'ifiW7xzKNmj3a1fpEukFIImPFztb51R9',
      scope: 'openid microprofile-jwt'
    })
  });
  const token = (await tokenRes.json() as any).access_token;

  // References
  const refRes = await fetch(
    `https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1/PartHandling.svc/PartCatalogSet(PartNo='${partToTest}')/PartCatalogReferenceArray`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const refs = (await refRes.json() as any).value;
  const ref = refs.find((r: any) => r.TechnicalSpecNo);

  // Tech specs
  const keyRef = encodeURIComponent(ref.KeyRef);
  const techRes = await fetch(
    `https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1/PartHandling.svc/PartCatalogSet(PartNo='${partToTest}')/PartCatalogReferenceArray(LuName='${ref.LuName}',KeyRef='${keyRef}',TechnicalSpecNo=${ref.TechnicalSpecNo})/TechnicalSpecBothArray`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const attrs = (await techRes.json() as any).value;

  console.log(`📦 ${partToTest} - ${attrs.length} attributs\n`);

  let generic = null, length = null, varnish = null, techClass = null;

  for (const a of attrs) {
    const name = a.Attribute || a.AttrId;
    const val = a.AttrValue || a.ValueText || a.AttrValueNumeric || 'N/A';
    
    if (name.includes('GENERIC')) generic = val;
    if (name.includes('LENGTH')) length = val;
    if (name.includes('VARNISH')) varnish = val;
    if (name.includes('TECHNICAL') || name.includes('Technical')) techClass = val;
  }

  console.log('🎯 RÉSULTAT:');
  console.log(`   GENERIC CODE    : ${generic || '❌'}`);
  console.log(`   LENGTH SETUP    : ${length || '❌'}`);
  console.log(`   VARNISH CODE    : ${varnish || '❌'}`);
  console.log(`   Technical class : ${techClass || '❌'}`);

  const count = [generic, length, varnish].filter(x => x && x !== 'N/A').length;
  console.log(`\n${count === 3 ? '🎉 COMPLET' : '⚠️  PARTIEL'} : ${count}/3 attributs\n`);
}

main().catch(console.error);
