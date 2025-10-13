/**
 * Script de test pour le service Customer Order
 * 
 * Tests :
 * 1. getCustomerOrderLineBySerial('LG5MA0114')
 * 2. getCustomerOrderHeader('C1000038587')
 * 3. getCustomerOrderInfo('LG5MA0114')
 * 4. validateCustomerOrderSerial('LG5MA0114')
 * 5. getCustomerOrderLinesByPart('LG5MA')
 */

const https = require('https');
const fs = require('fs');

// Configuration IFS
const IFS_CONFIG = {
  hostname: 'beneteau-group-ast.ifs.cloud',
  realm: 'beneast1',
  clientId: 'AIS_IFS_MA_AST',
  clientSecret: 'ifiW7xzKNmj3a1fpEukFIImPFztb51R9'
};

// Fonction pour obtenir le token OAuth2
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
        try {
          const json = JSON.parse(body);
          resolve(json.access_token);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Fonction pour faire des requêtes OData
async function makeRequest(path) {
  try {
    const token = await getAccessToken();

    return new Promise((resolve, reject) => {
      const options = {
        hostname: IFS_CONFIG.hostname,
        port: 443,
        path: `/main/ifsapplications/projection/v1${path}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      };

      https.get(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(body);
            resolve(json);
          } catch (e) {
            resolve({ 
              error: true, 
              statusCode: res.statusCode, 
              body: body.substring(0, 1000) 
            });
          }
        });
      }).on('error', reject);
    });
  } catch (error) {
    return { error: true, message: error.message };
  }
}

// Fonction d'encodage URL
function encodeODataFilter(filter) {
  return encodeURIComponent(filter);
}

// ============================================================================
// Test Functions
// ============================================================================

async function testGetCustomerOrderLineBySerial(serialNumber) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`TEST 1: Get Customer Order Line by Serial Number`);
  console.log(`${'='.repeat(80)}\n`);
  console.log(`Serial Number: ${serialNumber}\n`);

  const filter = `CHullNumber eq '${serialNumber}'`;
  const select = 'OrderNo,LineNo,RelNo,LineItemNo,PartNo,CatalogNo,CatalogDesc,CHullNumber,BoatHullNumber,CustomerNo,ConfigurationId,Objstate,BuyQtyDue,DopConnection,SupplyCode,Contract';
  
  const path = `/CustomerOrderHandling.svc/CustomerOrderLineSet?$filter=${encodeODataFilter(filter)}&$select=${select}&$top=1`;

  const result = await makeRequest(path);

  if (result.error) {
    console.log(`❌ Error: ${result.body || result.message}\n`);
    return null;
  }

  if (!result.value || result.value.length === 0) {
    console.log(`⚠️  No Customer Order Line found\n`);
    return null;
  }

  const line = result.value[0];
  console.log(`✅ Customer Order Line found:\n`);
  console.log(`   Order No:          ${line.OrderNo}`);
  console.log(`   Line No:           ${line.LineNo}`);
  console.log(`   Part No:           ${line.PartNo}`);
  console.log(`   Description:       ${line.CatalogDesc || 'N/A'}`);
  console.log(`   CHull Number:      ${line.CHullNumber}`);
  console.log(`   Customer No:       ${line.CustomerNo}`);
  console.log(`   Configuration ID:  ${line.ConfigurationId}`);
  console.log(`   Status:            ${line.Objstate}`);
  console.log(`   Quantity:          ${line.BuyQtyDue}`);
  console.log(`   DOP Connection:    ${line.DopConnection}`);
  console.log(`   Supply Code:       ${line.SupplyCode}`);
  console.log(`   Contract:          ${line.Contract}\n`);

  return line;
}

async function testGetCustomerOrderHeader(orderNo) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`TEST 2: Get Customer Order Header`);
  console.log(`${'='.repeat(80)}\n`);
  console.log(`Order No: ${orderNo}\n`);

  const filter = `OrderNo eq '${orderNo}'`;
  const select = 'OrderNo,CustomerNo,CustomerName,Objstate,DateEntered,Contract,Company,CurrencyCode,WantedDeliveryDate,CustomerPoNo,InternalPoNo';
  
  const path = `/CustomerOrderHandling.svc/CustomerOrderSet?$filter=${encodeODataFilter(filter)}&$select=${select}&$top=1`;

  const result = await makeRequest(path);

  if (result.error) {
    console.log(`❌ Error: ${result.body || result.message}\n`);
    return null;
  }

  if (!result.value || result.value.length === 0) {
    console.log(`⚠️  No Customer Order Header found\n`);
    return null;
  }

  const header = result.value[0];
  console.log(`✅ Customer Order Header found:\n`);
  console.log(`   Order No:          ${header.OrderNo}`);
  console.log(`   Customer No:       ${header.CustomerNo}`);
  console.log(`   Customer Name:     ${header.CustomerName || 'N/A'}`);
  console.log(`   Status:            ${header.Objstate}`);
  console.log(`   Date Entered:      ${header.DateEntered}`);
  console.log(`   Contract:          ${header.Contract}`);
  console.log(`   Company:           ${header.Company}`);
  console.log(`   Currency:          ${header.CurrencyCode}`);
  console.log(`   Wanted Delivery:   ${header.WantedDeliveryDate}`);
  console.log(`   Customer PO:       ${header.CustomerPoNo || 'N/A'}`);
  console.log(`   Internal PO:       ${header.InternalPoNo || 'N/A'}\n`);

  return header;
}

async function testGetCustomerOrderInfo(serialNumber) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`TEST 3: Get Complete Customer Order Info`);
  console.log(`${'='.repeat(80)}\n`);
  console.log(`Serial Number: ${serialNumber}\n`);

  // Étape 1 : Get Line
  const line = await testGetCustomerOrderLineBySerial(serialNumber);
  
  if (!line) {
    console.log(`❌ Cannot continue without Customer Order Line\n`);
    return null;
  }

  // Étape 2 : Get Header
  const header = await testGetCustomerOrderHeader(line.OrderNo);

  // Étape 3 : Consolidate
  console.log(`\n${'─'.repeat(80)}`);
  console.log(`📊 Consolidated Customer Order Info:\n`);

  const info = {
    orderNo: line.OrderNo,
    lineNo: line.LineNo,
    partNo: line.PartNo,
    catalogDesc: line.CatalogDesc || 'N/A',
    chullNumber: line.CHullNumber,
    customerNo: line.CustomerNo,
    customerName: header?.CustomerName,
    configurationId: line.ConfigurationId,
    status: line.Objstate,
    quantity: line.BuyQtyDue,
    contract: line.Contract,
    customerPoNo: header?.CustomerPoNo,
    internalPoNo: header?.InternalPoNo
  };

  console.log(JSON.stringify(info, null, 2));
  console.log('');

  return info;
}

async function testValidateCustomerOrderSerial(serialNumber) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`TEST 4: Validate Customer Order Serial Number`);
  console.log(`${'='.repeat(80)}\n`);
  console.log(`Serial Number: ${serialNumber}\n`);

  const info = await testGetCustomerOrderInfo(serialNumber);

  const validation = {
    found: info !== null,
    serialNumberMatch: info ? info.chullNumber === serialNumber : false,
    customerOrder: info,
    error: info ? undefined : 'No Customer Order found'
  };

  console.log(`\n${'─'.repeat(80)}`);
  console.log(`✅ Validation Result:\n`);
  console.log(`   Found:              ${validation.found ? '✅ Yes' : '❌ No'}`);
  console.log(`   Serial Match:       ${validation.serialNumberMatch ? '✅ Yes' : '❌ No'}`);
  
  if (validation.customerOrder) {
    console.log(`   Customer Order:     ${validation.customerOrder.orderNo}`);
    console.log(`   CHull Number:       ${validation.customerOrder.chullNumber}`);
    console.log(`   Match Details:      ${validation.customerOrder.chullNumber} === ${serialNumber}`);
  }
  
  if (validation.error) {
    console.log(`   Error:              ${validation.error}`);
  }
  
  console.log('');

  return validation;
}

async function testGetCustomerOrderLinesByPart(partNo, limit = 5) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`TEST 5: Get Customer Order Lines by Part Number`);
  console.log(`${'='.repeat(80)}\n`);
  console.log(`Part No: ${partNo}`);
  console.log(`Limit: ${limit}\n`);

  const filter = `PartNo eq '${partNo}'`;
  const select = 'OrderNo,LineNo,PartNo,CatalogDesc,CHullNumber,CustomerNo,ConfigurationId,Objstate,BuyQtyDue';
  
  const path = `/CustomerOrderHandling.svc/CustomerOrderLineSet?$filter=${encodeODataFilter(filter)}&$select=${select}&$top=${limit}&$orderby=OrderNo desc`;

  const result = await makeRequest(path);

  if (result.error) {
    console.log(`❌ Error: ${result.body || result.message}\n`);
    return [];
  }

  const lines = result.value || [];
  console.log(`✅ Found ${lines.length} Customer Order Lines:\n`);

  lines.forEach((line, index) => {
    console.log(`   ${index + 1}. Order ${line.OrderNo} - Line ${line.LineNo}`);
    console.log(`      Part:        ${line.PartNo}`);
    console.log(`      CHull:       ${line.CHullNumber || 'N/A'}`);
    console.log(`      Customer:    ${line.CustomerNo}`);
    console.log(`      Status:      ${line.Objstate}`);
    console.log(`      Qty:         ${line.BuyQtyDue}`);
    console.log('');
  });

  return lines;
}

// ============================================================================
// Main Execution
// ============================================================================

(async () => {
  console.log('\n🧪 CUSTOMER ORDER SERVICE - TEST SUITE\n');
  console.log('═'.repeat(80) + '\n');

  const results = {
    timestamp: new Date().toISOString(),
    tests: []
  };

  try {
    // Test 1: Get Customer Order Line by Serial
    const test1Result = await testGetCustomerOrderLineBySerial('LG5MA0114');
    results.tests.push({
      name: 'getCustomerOrderLineBySerial',
      success: test1Result !== null,
      result: test1Result
    });

    // Test 2: Get Customer Order Header
    if (test1Result) {
      const test2Result = await testGetCustomerOrderHeader(test1Result.OrderNo);
      results.tests.push({
        name: 'getCustomerOrderHeader',
        success: test2Result !== null,
        result: test2Result
      });
    }

    // Test 3: Get Complete Customer Order Info
    const test3Result = await testGetCustomerOrderInfo('LG5MA0114');
    results.tests.push({
      name: 'getCustomerOrderInfo',
      success: test3Result !== null,
      result: test3Result
    });

    // Test 4: Validate Customer Order Serial
    const test4Result = await testValidateCustomerOrderSerial('LG5MA0114');
    results.tests.push({
      name: 'validateCustomerOrderSerial',
      success: test4Result.found && test4Result.serialNumberMatch,
      result: test4Result
    });

    // Test 5: Get Customer Order Lines by Part
    const test5Result = await testGetCustomerOrderLinesByPart('LG5MA', 5);
    results.tests.push({
      name: 'getCustomerOrderLinesByPart',
      success: test5Result.length > 0,
      result: { count: test5Result.length, lines: test5Result }
    });

    // Sauvegarder les résultats
    const timestamp = Date.now();
    const jsonFile = `customer-order-service-test-${timestamp}.json`;
    fs.writeFileSync(jsonFile, JSON.stringify(results, null, 2));

    // Résumé
    console.log('\n' + '═'.repeat(80));
    console.log('📊 TEST SUMMARY');
    console.log('═'.repeat(80) + '\n');

    const successCount = results.tests.filter(t => t.success).length;
    const totalCount = results.tests.length;

    results.tests.forEach(test => {
      const icon = test.success ? '✅' : '❌';
      console.log(`   ${icon} ${test.name}`);
    });

    console.log(`\n   Total: ${successCount}/${totalCount} tests passed`);
    console.log(`\n💾 Results saved to: ${jsonFile}\n`);

    if (successCount === totalCount) {
      console.log('✅ All tests passed!\n');
      process.exit(0);
    } else {
      console.log('⚠️  Some tests failed\n');
      process.exit(1);
    }

  } catch (error) {
    console.error('\n❌ Test suite error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
})();
