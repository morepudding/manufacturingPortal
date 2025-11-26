/**
 * Test de l'obtention du token Azure AD
 */

async function testAzureToken() {
  console.log('🔑 Test obtention token Azure AD')
  console.log('=' .repeat(60))
  
  const clientId = process.env.IFS_CLIENT_ID
  const clientSecret = process.env.IFS_CLIENT_SECRET
  const tokenUrl = process.env.IFS_TOKEN_URL
  const scope = process.env.IFS_SCOPE
  
  console.log('\n📋 Configuration:')
  console.log(`   Client ID: ${clientId}`)
  console.log(`   Token URL: ${tokenUrl}`)
  console.log(`   Scope: ${scope}`)
  
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId!,
    client_secret: clientSecret!,
    scope: scope!,
  })
  
  try {
    console.log('\n📡 Requête token...')
    const response = await fetch(tokenUrl!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      console.error('\n❌ Erreur:', response.status)
      console.error(JSON.stringify(data, null, 2))
      process.exit(1)
    }
    
    console.log(`\n✅ Token obtenu!`)
    console.log(`   Type: ${data.token_type}`)
    console.log(`   Expires in: ${data.expires_in}s`)
    console.log(`   Token (premiers 50 chars): ${data.access_token.substring(0, 50)}...`)
    
    // Décoder le JWT (payload)
    const payload = data.access_token.split('.')[1]
    const decoded = JSON.parse(Buffer.from(payload, 'base64').toString())
    
    console.log(`\n📊 JWT Payload:`)
    console.log(`   Audience: ${decoded.aud}`)
    console.log(`   Issuer: ${decoded.iss}`)
    console.log(`   Subject: ${decoded.sub}`)
    console.log(`   App ID: ${decoded.appid}`)
    console.log(`   Roles: ${decoded.roles?.join(', ') || 'N/A'}`)
    console.log(`   Scopes: ${decoded.scp || 'N/A'}`)
    
  } catch (error: any) {
    console.error('\n❌ Erreur:', error.message)
    process.exit(1)
  }
}

testAzureToken()
