/**
 * Azure Print Service
 * 
 * Service de gestion de l'impression via l'API Azure Print.
 * Gère l'authentification OAuth2, le cache de token, et l'envoi des jobs d'impression.
 * 
 * @module azure-print-service
 */

import axios, { AxiosError } from 'axios'

// =====================================================
// TYPES & INTERFACES
// =====================================================

/**
 * Configuration OAuth2 pour l'API Azure Print
 */
interface AzurePrintOAuthConfig {
  clientId: string
  clientSecret: string
  tenantId: string
  scope: string
}

/**
 * Réponse du serveur OAuth2 Azure
 */
interface AzurePrintOAuthResponse {
  access_token: string
  token_type: string
  expires_in: number // En secondes (ex: 3599 = 1h)
}

/**
 * Payload pour l'API Azure Print
 */
interface AzurePrintPayload {
  Printer: string // Ex: "PRTBX105_P"
  PrintModel: string // Ex: "BEN_MA_FO_CR_184.rdl"
  Selection: string // Ex: "ORDER_NO=495642^RELEASE_NO=*^SEQUENCE_NO=*^;"
}

/**
 * Shop Order à imprimer (format interne)
 */
export interface ShopOrderToPrint {
  orderNo: string
  releaseNo?: string // Default: "*"
  sequenceNo?: string // Default: "*"
}

/**
 * Réponse de l'API Azure Print
 */
export interface AzurePrintResponse {
  Message: string
  StatusCode?: number
}

/**
 * Options pour l'impression
 */
export interface PrintOptions {
  printer: string // Ex: "PRTBX105_P"
  printModel?: string // Default: "BEN_MA_FO_CR_184.rdl"
  retryAttempts?: number // Default: 3
  retryDelayMs?: number // Default: 1000 (1s)
}

// =====================================================
// CACHE DU TOKEN OAUTH2
// =====================================================

interface TokenCache {
  token: string
  expiresAt: number // Timestamp en ms
}

let tokenCache: TokenCache | null = null

/**
 * Vérifie si le token en cache est encore valide
 * Marge de sécurité: 5 minutes avant expiration
 */
function isTokenValid(): boolean {
  if (!tokenCache) return false
  
  const now = Date.now()
  const marginMs = 5 * 60 * 1000 // 5 minutes de marge
  
  return tokenCache.expiresAt - marginMs > now
}

/**
 * Stocke le token en cache avec son temps d'expiration
 */
function cacheToken(token: string, expiresIn: number): void {
  const now = Date.now()
  tokenCache = {
    token,
    expiresAt: now + (expiresIn * 1000) // Convertir secondes → ms
  }
}

/**
 * Récupère le token du cache s'il est valide
 */
function getCachedToken(): string | null {
  return isTokenValid() ? tokenCache!.token : null
}

// =====================================================
// AUTHENTIFICATION OAUTH2
// =====================================================

/**
 * Obtient un token OAuth2 pour l'API Azure Print.
 * Utilise le cache si le token est encore valide (marge de 5 min).
 * 
 * @returns Token d'accès valide
 * @throws Error si l'authentification échoue
 */
async function getAccessToken(): Promise<string> {
  // 1. Vérifier le cache
  const cachedToken = getCachedToken()
  if (cachedToken) {
    console.log('🔑 Token OAuth2 récupéré du cache')
    return cachedToken
  }

  console.log('🔑 Récupération d\'un nouveau token OAuth2...')

  // 2. Récupérer la config depuis les variables d'environnement
  const config: AzurePrintOAuthConfig = {
    clientId: process.env.AZURE_PRINT_CLIENT_ID!,
    clientSecret: process.env.AZURE_PRINT_CLIENT_SECRET!,
    tenantId: process.env.AZURE_PRINT_TENANT_ID!,
    scope: process.env.AZURE_PRINT_SCOPE || 'https://management.azure.com/.default'
  }

  // 3. Valider la config
  if (!config.clientId || !config.clientSecret || !config.tenantId) {
    throw new Error('Configuration Azure Print OAuth2 incomplète dans .env.local')
  }

  // 4. Préparer la requête OAuth2
  const tokenUrl = `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`
  const params = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    scope: config.scope,
    grant_type: 'client_credentials'
  })

  try {
    // 5. Envoyer la requête
    const response = await axios.post<AzurePrintOAuthResponse>(
      tokenUrl,
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 30000 // 30s timeout
      }
    )

    // 6. Extraire et cacher le token
    const { access_token, expires_in } = response.data
    cacheToken(access_token, expires_in)

    console.log(`✅ Token OAuth2 obtenu (valide ${expires_in}s, cache ${Math.floor(expires_in / 60)}min)`)
    return access_token

  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      console.error('❌ Erreur OAuth2:', axiosError.response?.data || axiosError.message)
      throw new Error(`Authentification Azure Print échouée: ${axiosError.message}`)
    }
    throw error
  }
}

// =====================================================
// GÉNÉRATION DE LA CHAÎNE SELECTION
// =====================================================

/**
 * Génère la chaîne Selection pour l'API Azure Print.
 * 
 * Format: ORDER_NO=XXX^RELEASE_NO=Y^SEQUENCE_NO=Z^;ORDER_NO=AAA^RELEASE_NO=B^SEQUENCE_NO=C^;
 * 
 * Wildcards: Si releaseNo ou sequenceNo sont omis, utilise "*"
 * 
 * @param shopOrders Liste des Shop Orders à imprimer
 * @returns Chaîne Selection formatée
 * 
 * @example
 * generateSelectionString([
 *   { orderNo: "495642" },
 *   { orderNo: "495643", releaseNo: "1", sequenceNo: "10" }
 * ])
 * // → "ORDER_NO=495642^RELEASE_NO=*^SEQUENCE_NO=*^;ORDER_NO=495643^RELEASE_NO=1^SEQUENCE_NO=10^;"
 */
export function generateSelectionString(shopOrders: ShopOrderToPrint[]): string {
  return shopOrders
    .map(order => {
      const releaseNo = order.releaseNo || '*'
      const sequenceNo = order.sequenceNo || '*'
      return `ORDER_NO=${order.orderNo}^RELEASE_NO=${releaseNo}^SEQUENCE_NO=${sequenceNo}^;`
    })
    .join('')
}

// =====================================================
// IMPRESSION DES ÉTIQUETTES
// =====================================================

/**
 * Envoie un job d'impression à l'API Azure Print.
 * Avec retry logic (3 tentatives par défaut, backoff exponentiel).
 * 
 * @param shopOrders Liste des Shop Orders à imprimer
 * @param options Options d'impression (imprimante, layout, retry)
 * @returns Réponse de l'API Azure Print
 * @throws Error si l'impression échoue après toutes les tentatives
 * 
 * @example
 * const result = await printLabels(
 *   [{ orderNo: "495642" }, { orderNo: "495643" }],
 *   { printer: "PRTBX105_P" }
 * )
 * console.log(result.Message) // "Success"
 */
export async function printLabels(
  shopOrders: ShopOrderToPrint[],
  options: PrintOptions
): Promise<AzurePrintResponse> {
  // 1. Validation des paramètres
  if (!shopOrders || shopOrders.length === 0) {
    throw new Error('Au moins un Shop Order est requis')
  }

  if (!options.printer) {
    throw new Error('Le paramètre printer est requis')
  }

  // 2. Configuration
  const apiUrl = process.env.AZURE_PRINT_API_URL!
  const subscriptionKey = process.env.AZURE_PRINT_SUBSCRIPTION_KEY!
  const printModel = options.printModel || 'BEN_MA_FO_CR_184.rdl'
  const maxRetries = options.retryAttempts || 3
  const baseDelay = options.retryDelayMs || 1000

  if (!apiUrl || !subscriptionKey) {
    throw new Error('Configuration Azure Print API incomplète dans .env.local')
  }

  // 3. Générer le payload
  const selectionString = generateSelectionString(shopOrders)
  const payload: AzurePrintPayload = {
    Printer: options.printer,
    PrintModel: printModel,
    Selection: selectionString
  }

  console.log(`🖨️  Impression de ${shopOrders.length} Shop Order(s) sur ${options.printer}...`)
  console.log(`📋 Selection: ${selectionString}`)

  // 4. Retry logic avec backoff exponentiel
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Obtenir un token valide
      const token = await getAccessToken()

      // Envoyer la requête d'impression
      console.log(`🔄 Tentative ${attempt}/${maxRetries}...`)
      const startTime = Date.now()

      const response = await axios.post<AzurePrintResponse>(
        apiUrl,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey
          },
          timeout: 120000 // 120s timeout (IFS génère les labels)
        }
      )

      const duration = ((Date.now() - startTime) / 1000).toFixed(2)
      console.log(`✅ Impression réussie en ${duration}s`)
      console.log(`📨 Réponse: ${response.data.Message}`)

      return response.data

    } catch (error) {
      lastError = error as Error

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<AzurePrintResponse>
        const status = axiosError.response?.status
        const message = axiosError.response?.data?.Message || axiosError.message

        console.error(`❌ Tentative ${attempt}/${maxRetries} échouée: ${status} - ${message}`)

        // Ne pas retry sur certaines erreurs (400, 404 = erreurs client)
        if (status === 400 || status === 404) {
          throw new Error(`Erreur API Azure Print (${status}): ${message}`)
        }

        // Retry sur les erreurs serveur (500, 502, 503, timeout)
        if (attempt < maxRetries) {
          const delay = baseDelay * Math.pow(2, attempt - 1) // Backoff exponentiel
          console.log(`⏳ Nouvelle tentative dans ${delay}ms...`)
          await new Promise(resolve => setTimeout(resolve, delay))
          continue
        }
      }

      // Dernière tentative échouée
      throw new Error(`Impression échouée après ${maxRetries} tentatives: ${lastError.message}`)
    }
  }

  // Fallback (ne devrait jamais arriver)
  throw new Error('Erreur inconnue lors de l\'impression')
}

// =====================================================
// EXPORTS
// =====================================================

export const azurePrintService = {
  printLabels,
  generateSelectionString
}
