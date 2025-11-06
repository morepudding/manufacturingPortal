/**
 * Test rapide Customer Order Service
 */

const https = require('https');

const IFS_CONFIG = {
  hostname: 'beneteau-group-ast.ifs.cloud',
  realm: 'beneast1',
  clientId: '***REMOVED***',
  clientSecret: '***REMOVED***'
};

function getAccessToken() {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: IFS_CONFIG.clientId,
      client_secret: IFS_CONFIG.clientSecret,
      scope: 'openid microprofile-jwt'
    }).toString();
    
    const options = {
      hostname: IFS_CONFIG.hostname,
      port: 443,
      path: `/auth/realms/${IFS_CONFIG.realm}/protocol/openid-connect/token`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve(JSON.parse(body).access_token);
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function testCustomerOrderLine() {
  console.log('🔍 Testing Customer Order Line retrieval...\n');
  
  const token = await getAccessToken();
  console.log('✅ Token obtained\n');

  return new Promise((resolve, reject) => {
    // Construire le path comme dans test-customer-order.js
    const filter = "CHullNumber eq 'LG5MA0114'";
    const select = 'OrderNo,LineNo,PartNo,CHullNumber,CustomerNo';
    const basePath = '/main/ifsapplications/projection/v1';
    const endpoint = `/CustomerOrderHandling.svc/CustomerOrderLineSet?$filter=${encodeURIComponent(filter)}&$select=${select}&$top=1`;
    
    console.log('📡 Making request to IFS...');
    console.log(`   Path: ${endpoint.substring(0, 80)}...\n`);
    
    const options = {
      hostname: IFS_CONFIG.hostname,
      port: 443,
      path: `${basePath}${endpoint}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      timeout: 15000 // 15 secondes timeout
    };

    const req = https.get(options, (res) => {
      console.log(`📊 Response status: ${res.statusCode}\n`);
      
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
        process.stdout.write('.');
      });
      
      res.on('end', () => {
        console.log('\n');
        try {
          const data = JSON.parse(body);
          
          if (data.error) {
            console.log('❌ API Error:', JSON.stringify(data.error, null, 2));
            resolve(false);
            return;
          }
          
          if (data.value && data.value.length > 0) {
            const line = data.value[0];
            console.log('✅ Customer Order Line found:');
            console.log(`   Order No:     ${line.OrderNo}`);
            console.log(`   Line No:      ${line.LineNo}`);
            console.log(`   Part No:      ${line.PartNo}`);
            console.log(`   CHullNumber:  ${line.CHullNumber}`);
            console.log(`   Customer:     ${line.CustomerNo}\n`);
            resolve(true);
          } else {
            console.log('⚠️  No Customer Order Line found\n');
            console.log('Response:', JSON.stringify(data, null, 2).substring(0, 500));
            resolve(false);
          }
        } catch (error) {
          console.log('❌ Parse error:', error.message);
          console.log('Response body:', body.substring(0, 500));
          resolve(false);
        }
      });
    });

    req.on('error', (error) => {
      console.log('❌ Request error:', error.message);
      resolve(false);
    });

    req.on('timeout', () => {
      console.log('❌ Request timeout (15s)');
      req.destroy();
      resolve(false);
    });
  });
}

(async () => {
  try {
    const success = await testCustomerOrderLine();
    console.log(success ? '✅ Test passed' : '❌ Test failed');
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
