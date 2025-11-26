/**
 * Script de test DÉTAILLÉ pour CompanySiteSet avec debug
 */

async function testWithDebug() {
  console.log('🔍 Test CompanySiteHandling.svc/CompanySiteSet (DEBUG)')
  console.log('=' .repeat(60))
  
  const clientId = process.env.IFS_CLIENT_ID!
  const clientSecret = process.env.IFS_CLIENT_SECRET!
  const tokenUrl = process.env.IFS_TOKEN_URL!
  const baseUrl = process.env.IFS_BASE_URL!
  const scope = process.env.IFS_SCOPE!
  
  console.log('\n📋 Configuration:')
  console.log(`   Base URL: ${baseUrl}`)
  console.log(`   Client ID: ${clientId}`)
  console.log(`   Scope: ${scope}`)
  
  // 1. Obtenir le token
  console.log('\n🔑 Étape 1: Obtention du token...')
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: scope,
  })
  
  const tokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })
  
  const tokenData = await tokenResponse.json()
  if (!tokenResponse.ok) {
    console.error('❌ Erreur token:', tokenData)
    process.exit(1)
  }
  
  const token = tokenData.access_token
  console.log(`✅ Token obtenu (${token.substring(0, 30)}...)`)
  
  // 2. Requête IFS
  console.log('\n📡 Étape 2: Requête IFS CompanySiteSet...')
  
  const endpoint = 'CompanySiteHandling.svc/CompanySiteSet'
  const fullUrl = `${baseUrl}/${endpoint}`
  
  console.log(`   URL complète: ${fullUrl}`)
  
  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    })
    
    console.log(`\n📊 Réponse HTTP: ${response.status} ${response.statusText}`)
    
    const responseText = await response.text()
    console.log(`\n📄 Body (premiers 500 chars):`)
    console.log(responseText.substring(0, 500))
    
    if (!response.ok) {
      console.error('\n❌ Erreur HTTP')
      process.exit(1)
    }
    
    // Parser JSON
    const data = JSON.parse(responseText)
    
    console.log(`\n✅ Succès! ${data.value?.length || 0} sites trouvés`)
    
    if (data.value && data.value.length > 0) {
      console.log(`\n📋 Premiers sites:`)
      data.value.slice(0, 5).forEach((site: any) => {
        console.log(`   - ${site.Contract}: ${site.Description || site.Company || 'N/A'}`)
      })
    }
    
  } catch (error: any) {
    console.error('\n❌ Erreur:', error.message)
    process.exit(1)
  }
}

testWithDebug()
