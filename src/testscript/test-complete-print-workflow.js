#!/usr/bin/env node
/**
 * Script de test du workflow complet d'impression IFS
 * 
 * Teste les 4 étapes :
 * 1. GET Customer Order + ETag
 * 2. POST PrintResultKey → ResultKey
 * 3. POST PrintDialogInit
 * 4. POST ReportPrintRequest
 */

const https = require('https');

const IFS_BASE_URL = 'beneteau-group-ast.ifs.cloud';
const IFS_CLIENT_ID = process.env.IFS_CLIENT_ID || 'AIS_IFS_MA_AST';
const IFS_CLIENT_SECRET = process.env.IFS_CLIENT_SECRET;

// Configuration du test
const TEST_CONFIG = {
  orderNo: 'C1000038587',
  reportId: 'CUSTOMER_ORDER_CONF_REP', // ✅ Validé
  printerId: 'PDF_PRINTER', // Génère un PDF sans impression physique
  languageCode: 'fr',
  copies: 1
};

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
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: JSON.parse(data)
          });
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

// ÉTAPE 1 : Récupérer Customer Order + ETag
async function step1_getCustomerOrder(accessToken, orderNo) {
  console.log('\n' + '='.repeat(80));
  console.log('📥 ÉTAPE 1 : GET Customer Order + ETag');
  console.log('='.repeat(80));
  
  try {
    const response = await ifsGet(
      accessToken,
      `/CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')`
    );
    
    const etag = response.body['@odata.etag'];
    console.log(`✅ Customer Order: ${response.body.OrderNo}`);
    console.log(`✅ ETag: ${etag}`);
    
    return { order: response.body, etag };
  } catch (error) {
    console.log(`❌ ERREUR: ${error.message}`);
    throw error;
  }
}

// ÉTAPE 2 : PrintResultKey
async function step2_printResultKey(accessToken, orderNo, etag, reportId) {
  console.log('\n' + '='.repeat(80));
  console.log('🖨️  ÉTAPE 2 : POST PrintResultKey');
  console.log('='.repeat(80));
  console.log(`   ReportId: ${reportId}`);
  
  try {
    const response = await ifsPost(
      accessToken,
      `/CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey`,
      { ReportId: reportId },
      etag
    );

    if (response.statusCode === 200 || response.statusCode === 201) {
      const resultKey = response.body?.value;
      console.log(`✅ SUCCESS - ResultKey: ${resultKey}`);
      return resultKey;
    } else {
      console.log(`❌ ERREUR ${response.statusCode}:`);
      console.log(JSON.stringify(response.body, null, 2));
      throw new Error(`PrintResultKey failed: ${response.statusCode}`);
    }
  } catch (error) {
    console.log(`❌ ERREUR: ${error.message}`);
    throw error;
  }
}

// ÉTAPE 3 : PrintDialogInit
async function step3_printDialogInit(accessToken, resultKey) {
  console.log('\n' + '='.repeat(80));
  console.log('🔧 ÉTAPE 3 : POST PrintDialogInit');
  console.log('='.repeat(80));
  console.log(`   ResultKey: ${resultKey}`);
  
  try {
    const response = await ifsPost(
      accessToken,
      '/PrintDialog.svc/PrintDialogInit',
      {
        ResultKey: parseInt(resultKey)
      }
    );

    console.log(`📊 Status: ${response.statusCode}`);
    
    if (response.statusCode === 200 || response.statusCode === 201 || response.statusCode === 204) {
      console.log(`✅ PrintDialog initialisé`);
      if (response.body) {
        console.log(`📄 Response:`, JSON.stringify(response.body, null, 2));
      }
      return response.body;
    } else {
      console.log(`⚠️  Status ${response.statusCode}:`);
      console.log(JSON.stringify(response.body, null, 2));
      return null;
    }
  } catch (error) {
    console.log(`❌ ERREUR: ${error.message}`);
    throw error;
  }
}

// ÉTAPE 4 : ReportPrintRequest
async function step4_reportPrintRequest(accessToken, printDialogData, printerId, languageCode, copies) {
  console.log('\n' + '='.repeat(80));
  console.log('🖨️  ÉTAPE 4 : POST ReportPrintRequest');
  console.log('='.repeat(80));
  console.log(`   ResultKey: ${printDialogData.ResultKey}`);
  console.log(`   LayoutName: ${printDialogData.LayoutName}`);
  console.log(`   PrinterId: ${printerId}`);
  console.log(`   LanguageCode: ${languageCode}`);
  console.log(`   Copies: ${copies}`);
  
  try {
    const response = await ifsPost(
      accessToken,
      '/PrintDialog.svc/ReportPrintRequest',
      {
        ResultKey: printDialogData.ResultKey,
        LayoutName: printDialogData.LayoutName,
        LanguageCode: languageCode,
        LogicalPrinter: printerId,
        Copies: copies
      }
    );

    console.log(`📊 Status: ${response.statusCode}`);
    
    if (response.statusCode === 200 || response.statusCode === 201 || response.statusCode === 204) {
      console.log(`✅ Impression envoyée!`);
      if (response.body) {
        console.log(`📄 Response:`, JSON.stringify(response.body, null, 2));
      }
      return true;
    } else {
      console.log(`⚠️  Status ${response.statusCode}:`);
      console.log(JSON.stringify(response.body, null, 2));
      return false;
    }
  } catch (error) {
    console.log(`❌ ERREUR: ${error.message}`);
    throw error;
  }
}

// BONUS : Vérifier le PDF dans l'archive
async function bonus_checkPdfArchive(accessToken, resultKey) {
  console.log('\n' + '='.repeat(80));
  console.log('📄 BONUS : Vérification PDF Archive');
  console.log('='.repeat(80));
  
  try {
    const response = await ifsGet(
      accessToken,
      `/PrintDialog.svc/PdfArchiveSet?$filter=ResultKey eq '${resultKey}'&$top=1`
    );

    if (response.body.value && response.body.value.length > 0) {
      console.log(`✅ PDF trouvé dans l'archive!`);
      console.log(JSON.stringify(response.body.value[0], null, 2));
      return response.body.value[0];
    } else {
      console.log(`⚠️  PDF pas encore dans l'archive (peut prendre quelques secondes)`);
      return null;
    }
  } catch (error) {
    console.log(`⚠️  Erreur: ${error.message}`);
    return null;
  }
}

async function main() {
  try {
    console.log('🚀 TEST WORKFLOW COMPLET D\'IMPRESSION IFS');
    console.log('='.repeat(80));
    console.log('\n📋 Configuration du test:');
    console.log(`   Order No: ${TEST_CONFIG.orderNo}`);
    console.log(`   Report ID: ${TEST_CONFIG.reportId}`);
    console.log(`   Printer: ${TEST_CONFIG.printerId}`);
    console.log(`   Language: ${TEST_CONFIG.languageCode}`);
    console.log(`   Copies: ${TEST_CONFIG.copies}`);

    // Token OAuth2
    console.log('\n🔑 Authentification OAuth2...');
    const accessToken = await getAccessToken();
    console.log('✅ Token obtenu');

    // ÉTAPE 1
    const { order, etag } = await step1_getCustomerOrder(
      accessToken, 
      TEST_CONFIG.orderNo
    );

    // ÉTAPE 2
    const resultKey = await step2_printResultKey(
      accessToken,
      TEST_CONFIG.orderNo,
      etag,
      TEST_CONFIG.reportId
    );

    // ÉTAPE 3
    const printDialogData = await step3_printDialogInit(
      accessToken,
      resultKey
    );

    if (!printDialogData) {
      throw new Error('PrintDialogInit failed - cannot continue');
    }

    // ÉTAPE 4
    await step4_reportPrintRequest(
      accessToken,
      printDialogData,
      TEST_CONFIG.printerId,
      TEST_CONFIG.languageCode,
      TEST_CONFIG.copies
    );

    // BONUS : Vérifier l'archive
    await new Promise(resolve => setTimeout(resolve, 2000)); // Attendre 2s
    await bonus_checkPdfArchive(accessToken, resultKey);

    // RÉSUMÉ
    console.log('\n' + '='.repeat(80));
    console.log('🎉 WORKFLOW COMPLET TERMINÉ');
    console.log('='.repeat(80));
    console.log('\n✅ Toutes les étapes ont été exécutées');
    console.log(`📄 ResultKey: ${resultKey}`);
    console.log(`🖨️  Printer: ${TEST_CONFIG.printerId}`);
    console.log(`🌍 Language: ${TEST_CONFIG.languageCode}`);
    console.log('\n💡 Le PDF devrait être disponible dans IFS PDF Archive');

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
