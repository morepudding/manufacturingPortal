/**
 * Test pour vérifier les champs CustomerOrderNo et CustomerLineNo
 * retournés par l'API Shop Order
 */

const https = require('https');

// Configuration IFS
const IFS_BASE_URL = 'beneteau-group-ast.ifs.cloud';
const IFS_CLIENT_ID = '***REMOVED***';
const IFS_CLIENT_SECRET = '***REMOVED***';
const IFS_TOKEN_URL = '/auth/realms/beneast1/protocol/openid-connect/token';

// Shop Order à tester
const SHOP_ORDER_NO = '97277';

/**
 * Récupère un token d'accès OAuth2
 */
function getAccessToken() {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: IFS_CLIENT_ID,
      client_secret: IFS_CLIENT_SECRET,
      scope: 'openid'
    }).toString();

    const options = {
      hostname: IFS_BASE_URL,
      path: IFS_TOKEN_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          const tokenData = JSON.parse(data);
          resolve(tokenData.access_token);
        } else {
          reject(new Error(`Token request failed: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Fait une requête HTTPS vers l'API IFS
 */
function makeRequest(token, path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: IFS_BASE_URL,
      path: `/main/ifsapplications/projection/v1${path}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      timeout: 15000
    };

    console.log(`📡 Request: ${options.path}`);

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`📊 Response status: ${res.statusCode}\n`);
        
        if (res.statusCode === 200) {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (error) {
            reject(new Error(`Failed to parse JSON: ${error.message}`));
          }
        } else {
          reject(new Error(`Request failed: ${res.statusCode} ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error(`\n❌ Request error: ${error.message}`);
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout (15s)'));
    });

    req.end();
  });
}

/**
 * Test principal
 */
async function testShopOrderCustomerFields() {
  console.log('🔍 Testing Shop Order Customer Order fields...\n');
  console.log(`📋 Shop Order: ${SHOP_ORDER_NO}\n`);

  try {
    // Étape 1 : Obtenir le token
    console.log('🔐 Getting access token...');
    const token = await getAccessToken();
    console.log('✅ Token obtained\n');

    // Étape 2 : Récupérer le Shop Order avec TOUS les champs
    console.log('📦 Fetching Shop Order with ALL fields...');
    const filter = `contains(OrderNo,'${SHOP_ORDER_NO}')`;
    
    // Requête 1 : Avec les champs Customer
    console.log('\n=== Test 1: With CustomerOrderNo + CustomerLineNo ===');
    const response1 = await makeRequest(
      token,
      `/ShopOrderHandling.svc/ShopOrds?$filter=${encodeURIComponent(filter)}&$select=OrderNo,ReleaseNo,SequenceNo,DopId,PartNo,CustomerOrderNo,CustomerLineNo&$top=5`
    );

    if (response1.value && response1.value.length > 0) {
      const shopOrder = response1.value.find(so => so.OrderNo === SHOP_ORDER_NO);
      
      if (shopOrder) {
        console.log('✅ Shop Order found\n');
        console.log('📊 Fields returned:');
        console.log(JSON.stringify(shopOrder, null, 2));
        console.log('\n🔍 Analysis:');
        console.log(`   OrderNo: ${shopOrder.OrderNo}`);
        console.log(`   CustomerOrderNo: ${shopOrder.CustomerOrderNo || '❌ NULL or MISSING'}`);
        console.log(`   CustomerLineNo: ${shopOrder.CustomerLineNo || '❌ NULL or MISSING'}`);
        console.log(`   DopId: ${shopOrder.DopId}`);
      }
    }

    // Requête 2 : Sans les champs (pour comparaison)
    console.log('\n\n=== Test 2: Without Customer fields (baseline) ===');
    const response2 = await makeRequest(
      token,
      `/ShopOrderHandling.svc/ShopOrds?$filter=${encodeURIComponent(filter)}&$select=OrderNo,ReleaseNo,SequenceNo,DopId,PartNo&$top=5`
    );

    if (response2.value && response2.value.length > 0) {
      const shopOrder = response2.value.find(so => so.OrderNo === SHOP_ORDER_NO);
      
      if (shopOrder) {
        console.log('✅ Shop Order found\n');
        console.log('📊 Fields returned:');
        console.log(JSON.stringify(shopOrder, null, 2));
      }
    }

    // Requête 3 : Tous les champs possibles
    console.log('\n\n=== Test 3: Trying more Customer-related fields ===');
    const response3 = await makeRequest(
      token,
      `/ShopOrderHandling.svc/ShopOrds?$filter=${encodeURIComponent(filter)}&$select=OrderNo,CustomerOrderNo,CustomerLineNo,CustomerRelNo,CustomerLineItemNo,CustomerNo&$top=5`
    );

    if (response3.value && response3.value.length > 0) {
      const shopOrder = response3.value.find(so => so.OrderNo === SHOP_ORDER_NO);
      
      if (shopOrder) {
        console.log('✅ Shop Order found\n');
        console.log('📊 All Customer-related fields:');
        console.log(JSON.stringify(shopOrder, null, 2));
        
        console.log('\n🎯 Summary:');
        console.log(`   CustomerOrderNo: ${shopOrder.CustomerOrderNo || '❌ NULL'}`);
        console.log(`   CustomerLineNo: ${shopOrder.CustomerLineNo || '❌ NULL'}`);
        console.log(`   CustomerRelNo: ${shopOrder.CustomerRelNo || '❌ NULL'}`);
        console.log(`   CustomerLineItemNo: ${shopOrder.CustomerLineItemNo || '❌ NULL'}`);
        console.log(`   CustomerNo: ${shopOrder.CustomerNo || '❌ NULL'}`);
      }
    }

    console.log('\n\n✅ Test complete!');
    return true;
  } catch (error) {
    console.error(`\n❌ Test failed: ${error.message}`);
    return false;
  }
}

// Exécuter le test
testShopOrderCustomerFields()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
