#!/usr/bin/env node
/**
 * Test script pour l'endpoint PrintResultKey
 * 
 * Ce script teste le workflow d'impression IFS :
 * 1. Récupère un Customer Order avec son ETag
 * 2. Appelle l'action PrintResultKey
 * 3. Affiche le ResultKey retourné
 */

const https = require('https');

// Configuration IFS
const IFS_BASE_URL = 'beneteau-group-ast.ifs.cloud';
const IFS_CLIENT_ID = process.env.IFS_CLIENT_ID || 'AIS_IFS_MA_AST';
const IFS_CLIENT_SECRET = process.env.IFS_CLIENT_SECRET;
const IFS_TOKEN_URL = '/auth/realms/beneast1/protocol/openid-connect/token';

// Test avec un Customer Order connu
const TEST_ORDER_NO = 'C1000038587';
const TEST_REPORT_ID = 'MA_FO_CR_1419'; // À confirmer

/**
 * Récupère un access token OAuth2
 */
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
      path: IFS_TOKEN_URL,
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
          const parsed = JSON.parse(data);
          resolve(parsed.access_token);
        } else {
          reject(new Error(`Token error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

/**
 * Récupère un Customer Order avec son ETag
 */
async function getCustomerOrder(accessToken, orderNo) {
  return new Promise((resolve, reject) => {
    const path = `/main/ifsapplications/projection/v1/CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')`;
    
    const options = {
      hostname: IFS_BASE_URL,
      port: 443,
      path: path,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json'
      }
    };

    console.log(`📥 GET ${path}`);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const etag = res.headers['etag'];
          const order = JSON.parse(data);
          console.log(`✅ Customer Order récupéré, ETag: ${etag}`);
          resolve({ order, etag });
        } else {
          reject(new Error(`GET error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Appelle l'action PrintResultKey
 */
async function callPrintResultKey(accessToken, orderNo, etag, reportId) {
  return new Promise((resolve, reject) => {
    const path = `/main/ifsapplications/projection/v1/CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey`;
    
    const requestBody = JSON.stringify({ ReportId: reportId });
    
    const options = {
      hostname: IFS_BASE_URL,
      port: 443,
      path: path,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'If-Match': etag,
        'Content-Length': Buffer.byteLength(requestBody)
      }
    };

    console.log(`🖨️  POST ${path}`);
    console.log(`📋 Body: ${requestBody}`);
    console.log(`🏷️  If-Match: ${etag}`);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log(`📊 Status: ${res.statusCode}`);
        console.log(`📤 Response: ${data}`);
        
        if (res.statusCode === 200) {
          try {
            const result = JSON.parse(data);
            resolve(result);
          } catch (e) {
            resolve(data); // Si ce n'est pas du JSON
          }
        } else {
          reject(new Error(`PrintResultKey error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(requestBody);
    req.end();
  });
}

/**
 * Main test
 */
async function main() {
  try {
    console.log('🚀 Test de l\'endpoint PrintResultKey\n');
    console.log('📌 Configuration:');
    console.log(`   - Order No: ${TEST_ORDER_NO}`);
    console.log(`   - Report ID: ${TEST_REPORT_ID}\n`);

    // Étape 1 : Récupérer le token
    console.log('🔑 Étape 1 : Récupération du token OAuth2...');
    const accessToken = await getAccessToken();
    console.log('✅ Token obtenu\n');

    // Étape 2 : Récupérer le Customer Order avec ETag
    console.log('📦 Étape 2 : Récupération du Customer Order...');
    const { order, etag } = await getCustomerOrder(accessToken, TEST_ORDER_NO);
    console.log(`   - Order No: ${order.OrderNo}`);
    console.log(`   - Customer: ${order.CustomerNo}`);
    console.log(`   - ETag: ${etag}\n`);

    // Étape 3 : Appeler PrintResultKey
    console.log('🖨️  Étape 3 : Appel de PrintResultKey...');
    const result = await callPrintResultKey(accessToken, TEST_ORDER_NO, etag, TEST_REPORT_ID);
    
    console.log('\n✅ SUCCESS!');
    console.log('📊 Résultat:');
    console.log(JSON.stringify(result, null, 2));

    if (result.value) {
      console.log(`\n🎯 ResultKey obtenu: ${result.value}`);
      console.log('\n💡 Prochaine étape: Utiliser ce ResultKey avec PrintDialog.svc');
    }

  } catch (error) {
    console.error('\n❌ ERREUR:', error.message);
    process.exit(1);
  }
}

// Vérification des variables d'environnement
if (!IFS_CLIENT_SECRET) {
  console.error('❌ ERREUR: Variable IFS_CLIENT_SECRET non définie');
  console.error('   Définir avec: export IFS_CLIENT_SECRET="..."');
  process.exit(1);
}

main();
