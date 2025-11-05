/**
 * Test : Recherche Customer Order par Serial Number avec différentes approches
 */

const https = require('https');

// Configuration IFS
const IFS_BASE_URL = 'beneteau-group-ast.ifs.cloud';
const IFS_CLIENT_ID = 'AIS_IFS_MA_AST';
const IFS_CLIENT_SECRET = 'ifiW7xzKNmj3a1fpEukFIImPFztb51R9';
const IFS_TOKEN_URL = '/auth/realms/beneast1/protocol/openid-connect/token';

// Serial Number à tester
const SERIAL_NUMBER = 'LG5MA0114';

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
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data).access_token);
        } else {
          reject(new Error(`Token failed: ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

/**
 * Fait une requête HTTPS avec timeout configurable
 */
function makeRequest(token, path, timeoutMs = 30000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const options = {
      hostname: IFS_BASE_URL,
      path: `/main/ifsapplications/projection/v1${path}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      timeout: timeoutMs
    };

    console.log(`📡 Request: ${path}`);
    console.log(`⏱️  Timeout: ${timeoutMs}ms`);

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const duration = Date.now() - startTime;
        console.log(`✅ Response: ${res.statusCode} (${duration}ms)\n`);
        
        if (res.statusCode === 200) {
          resolve({ data: JSON.parse(data), duration });
        } else {
          reject(new Error(`Failed: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (error) => {
      const duration = Date.now() - startTime;
      console.error(`❌ Error after ${duration}ms: ${error.message}\n`);
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      const duration = Date.now() - startTime;
      console.error(`❌ Timeout after ${duration}ms\n`);
      reject(new Error(`Timeout (${timeoutMs}ms)`));
    });

    req.end();
  });
}

/**
 * Test principal
 */
async function testCustomerOrderSearch() {
  console.log('🔍 Testing Customer Order search by Serial Number...\n');
  console.log(`📋 Serial Number: ${SERIAL_NUMBER}\n`);

  try {
    console.log('🔐 Getting access token...');
    const token = await getAccessToken();
    console.log('✅ Token obtained\n');

    // Test 1 : CHullNumber avec timeout 30s
    console.log('=== Test 1: CHullNumber filter (30s timeout) ===');
    try {
      const filter1 = `CHullNumber eq '${SERIAL_NUMBER}'`;
      const result1 = await makeRequest(
        token,
        `/CustomerOrderHandling.svc/CustomerOrderLineSet?$filter=${encodeURIComponent(filter1)}&$top=1`,
        30000
      );
      
      if (result1.data.value && result1.data.value.length > 0) {
        console.log('✅ Found with CHullNumber!');
        console.log(`   Duration: ${result1.duration}ms`);
        console.log('   Customer Order:', result1.data.value[0].OrderNo);
      } else {
        console.log('❌ Not found');
      }
    } catch (error) {
      console.log(`❌ Test 1 failed: ${error.message}`);
    }

    // Test 2 : contains() avec CHullNumber
    console.log('\n=== Test 2: contains(CHullNumber) ===');
    try {
      const filter2 = `contains(CHullNumber,'${SERIAL_NUMBER}')`;
      const result2 = await makeRequest(
        token,
        `/CustomerOrderHandling.svc/CustomerOrderLineSet?$filter=${encodeURIComponent(filter2)}&$top=5`,
        30000
      );
      
      if (result2.data.value && result2.data.value.length > 0) {
        console.log('✅ Found with contains()!');
        console.log(`   Duration: ${result2.duration}ms`);
        console.log(`   Results: ${result2.data.value.length}`);
        result2.data.value.forEach(item => {
          console.log(`   - ${item.OrderNo} / ${item.CHullNumber}`);
        });
      } else {
        console.log('❌ Not found');
      }
    } catch (error) {
      console.log(`❌ Test 2 failed: ${error.message}`);
    }

    // Test 3 : Recherche par PartNo + Serial pattern
    console.log('\n=== Test 3: PartNo filter (alternative) ===');
    try {
      const partNo = SERIAL_NUMBER.substring(0, 5); // "LG5MA"
      const filter3 = `PartNo eq '${partNo}'`;
      const result3 = await makeRequest(
        token,
        `/CustomerOrderHandling.svc/CustomerOrderLineSet?$filter=${encodeURIComponent(filter3)}&$top=10`,
        15000
      );
      
      if (result3.data.value && result3.data.value.length > 0) {
        console.log(`✅ Found ${result3.data.value.length} lines with PartNo: ${partNo}`);
        console.log(`   Duration: ${result3.duration}ms`);
        
        // Chercher la correspondance exacte
        const match = result3.data.value.find(item => item.CHullNumber === SERIAL_NUMBER);
        if (match) {
          console.log(`   🎯 Exact match found: ${match.OrderNo} - Line ${match.LineNo}`);
        }
      } else {
        console.log('❌ Not found');
      }
    } catch (error) {
      console.log(`❌ Test 3 failed: ${error.message}`);
    }

    console.log('\n\n✅ All tests complete!');
    return true;
  } catch (error) {
    console.error(`\n❌ Fatal error: ${error.message}`);
    return false;
  }
}

// Exécuter le test
testCustomerOrderSearch()
  .then(success => process.exit(success ? 0 : 1))
  .catch(error => {
    console.error('Fatal:', error);
    process.exit(1);
  });
