#!/usr/bin/env node
/**
 * Script de recherche approfondie des ReportIds Customer Order
 * Et test avec un ReportId valide AST
 */

const https = require('https');

const IFS_BASE_URL = 'beneteau-group-ast.ifs.cloud';
const IFS_CLIENT_ID = process.env.IFS_CLIENT_ID || '***REMOVED***';
const IFS_CLIENT_SECRET = process.env.IFS_CLIENT_SECRET;

async function getAccessToken() {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: IFS_CLIENT_ID,
      client_secret: IFS_CLIENT_SECRET,
      scope: 'openid microprofile-jwt'
    }).toString();

    const options = {
      hostname: IFS_BASE_URL,
      port: 443,
      path: '/auth/realms/beneast1/protocol/openid-connect/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data).access_token);
        } else {
          reject(new Error(`Token error: ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function ifsGet(accessToken, path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: IFS_BASE_URL,
      port: 443,
      path: `/main/ifsapplications/projection/v1${path}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`GET error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function ifsPost(accessToken, path, body, etag = null) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(body);
    
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      'Accept': 'application/json'
    };

    if (etag) {
      headers['If-Match'] = etag;
    }

    const options = {
      hostname: IFS_BASE_URL,
      port: 443,
      path: `/main/ifsapplications/projection/v1${path}`,
      method: 'POST',
      headers: headers
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data ? JSON.parse(data) : null
        });
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function searchCustomerOrderReports(accessToken) {
  console.log('\n' + '='.repeat(80));
  console.log('🔍 RECHERCHE APPROFONDIE DES REPORTIDS CUSTOMER ORDER');
  console.log('='.repeat(80));

  const searches = [
    { filter: "contains(ReportId,'CUSTOMER')", label: "ReportId contient CUSTOMER" },
    { filter: "contains(ReportId,'ORDER')", label: "ReportId contient ORDER" },
    { filter: "contains(LayoutName,'Customer')", label: "LayoutName contient Customer" },
    { filter: "contains(LayoutName,'Order')", label: "LayoutName contient Order" },
  ];

  const allReportIds = new Set();

  for (const search of searches) {
    try {
      console.log(`\n📋 ${search.label}...`);
      const result = await ifsGet(
        accessToken, 
        `/PrintDialog.svc/ReportLayoutDefinitionSet?$filter=${search.filter}&$top=20`
      );
      
      if (result.value && result.value.length > 0) {
        console.log(`   ✅ Trouvé ${result.value.length} layouts`);
        result.value.forEach(layout => {
          allReportIds.add(layout.ReportId);
          console.log(`      - ${layout.ReportId} (${layout.LayoutName})`);
        });
      }
    } catch (error) {
      console.log(`   ⚠️  Erreur: ${error.message}`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`📊 TOTAL: ${allReportIds.size} ReportIds uniques trouvés`);
  console.log('='.repeat(80));
  
  return Array.from(allReportIds);
}

async function testPrintResultKey(accessToken, orderNo, reportId) {
  console.log('\n' + '='.repeat(80));
  console.log(`🧪 TEST PRINTRESULTKEY: ${reportId}`);
  console.log('='.repeat(80));

  try {
    // 1. Récupérer le Customer Order avec ETag
    console.log(`\n📥 GET CustomerOrderSet(OrderNo='${orderNo}')...`);
    const orderResponse = await ifsGet(
      accessToken,
      `/CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')`
    );
    
    const etag = orderResponse['@odata.etag'];
    console.log(`   ✅ ETag: ${etag}`);

    // 2. Appeler PrintResultKey
    console.log(`\n🖨️  POST PrintResultKey avec ReportId="${reportId}"...`);
    const printResponse = await ifsPost(
      accessToken,
      `/CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey`,
      { ReportId: reportId },
      etag
    );

    console.log(`   📊 Status: ${printResponse.statusCode}`);
    
    if (printResponse.statusCode === 200 || printResponse.statusCode === 201) {
      console.log(`   ✅ SUCCESS!`);
      console.log(`   📄 ResultKey: ${printResponse.body?.value || 'N/A'}`);
      return {
        success: true,
        resultKey: printResponse.body?.value,
        reportId: reportId
      };
    } else {
      console.log(`   ❌ ERREUR: ${printResponse.statusCode}`);
      console.log(`   📤 ${JSON.stringify(printResponse.body)}`);
      return {
        success: false,
        error: printResponse.body,
        reportId: reportId
      };
    }

  } catch (error) {
    console.log(`   ❌ ERREUR: ${error.message}`);
    return {
      success: false,
      error: error.message,
      reportId: reportId
    };
  }
}

async function getLanguageCodes(accessToken) {
  console.log('\n' + '='.repeat(80));
  console.log('🌍 RÉCUPÉRATION DES LANGUAGE CODES');
  console.log('='.repeat(80));

  try {
    // Essayer différentes approches pour obtenir les codes
    const approaches = [
      { path: '/PrintDialog.svc/LanguageCodeSet', label: 'Standard' },
      { path: '/PrintDialog.svc/LanguageCodeSet?$select=Code,Description', label: 'Avec $select' },
      { path: '/PrintDialog.svc/ApplicationLanguageSet', label: 'ApplicationLanguageSet' },
    ];

    for (const approach of approaches) {
      try {
        console.log(`\n📋 Tentative: ${approach.label}`);
        const result = await ifsGet(accessToken, approach.path);
        
        if (result.value && result.value.length > 0) {
          console.log(`   ✅ Trouvé ${result.value.length} langues:`);
          result.value.slice(0, 3).forEach(lang => {
            console.log(`      ${JSON.stringify(lang, null, 2)}`);
          });
          return result.value;
        }
      } catch (error) {
        console.log(`   ⚠️  ${error.message}`);
      }
    }
  } catch (error) {
    console.log(`\n⚠️  Erreur globale: ${error.message}`);
  }
  
  return [];
}

async function main() {
  try {
    console.log('🚀 RECHERCHE & TEST REPORTIDS CUSTOMER ORDER (AST)');
    console.log('='.repeat(80));

    const accessToken = await getAccessToken();
    console.log('✅ Token OAuth2 obtenu\n');

    // 1. Chercher tous les ReportIds Customer Order
    const reportIds = await searchCustomerOrderReports(accessToken);

    // 2. Récupérer les codes langue
    await getLanguageCodes(accessToken);

    // 3. Tester les ReportIds les plus pertinents
    const testOrder = 'C1000038587';
    const reportIdsToTest = [
      'CUSTOMER_ORDER_DELIV_NOTE_REP',
      'CUST_ORDER_LOAD_LIST_REP',
      'CUSTOMER_ORDER_CONF_REP',
    ];

    console.log('\n' + '='.repeat(80));
    console.log('🧪 PHASE DE TEST DES REPORTIDS');
    console.log('='.repeat(80));

    const results = [];
    for (const reportId of reportIdsToTest) {
      if (reportIds.includes(reportId) || true) { // Test quand même
        const result = await testPrintResultKey(accessToken, testOrder, reportId);
        results.push(result);
        
        if (result.success) {
          console.log('\n🎉 SUCCÈS! ReportId valide trouvé!');
          break; // On s'arrête au premier succès
        }
        
        // Attendre un peu entre les tests
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Résumé
    console.log('\n' + '='.repeat(80));
    console.log('📊 RÉSUMÉ DES TESTS');
    console.log('='.repeat(80));
    
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    console.log(`\n✅ Succès: ${successful.length}`);
    successful.forEach(r => {
      console.log(`   - ${r.reportId} → ResultKey: ${r.resultKey}`);
    });
    
    console.log(`\n❌ Échecs: ${failed.length}`);
    failed.forEach(r => {
      console.log(`   - ${r.reportId}`);
    });

    if (successful.length > 0) {
      console.log('\n💡 RECOMMANDATION:');
      console.log(`   Utiliser ReportId="${successful[0].reportId}" pour les tests AST`);
      console.log(`   ResultKey obtenu: ${successful[0].resultKey}`);
    }

  } catch (error) {
    console.error('\n❌ ERREUR GLOBALE:', error.message);
    process.exit(1);
  }
}

if (!IFS_CLIENT_SECRET) {
  console.error('❌ ERREUR: Variable IFS_CLIENT_SECRET non définie');
  process.exit(1);
}

main();
