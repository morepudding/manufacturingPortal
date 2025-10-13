/**
 * Client IFS Cloud OData API avec authentification OAuth2
 * 
 * Fonctionnalités:
 * - Authentification OAuth2 (Client Credentials Flow)
 * - Cache du token avec expiration automatique
 * - Requêtes GET vers l'API OData IFS
 * - Gestion des erreurs
 * 
 * Variables d'environnement requises:
 * - IFS_CLIENT_ID
 * - IFS_CLIENT_SECRET
 * - IFS_TOKEN_URL
 * - IFS_BASE_URL
 * - IFS_SCOPE
 */

import type { IFSClientConfig, IFSToken } from '@/shared/types/ifs'

/**
 * Client pour l'API IFS Cloud avec gestion OAuth2
 */
class IFSClient {
  private config: IFSClientConfig
  private token: string | null = null
  private tokenExpiry: number | null = null

  constructor(config: IFSClientConfig) {
    this.config = config
  }

  /**
   * Obtenir un token OAuth2 valide (avec cache)
   * 
   * Le token est mis en cache et renouvelé automatiquement avant expiration.
   * Marge de sécurité: 60 secondes avant expiration.
   */
  private async getAccessToken(): Promise<string> {
    // Vérifier si le token en cache est encore valide (marge de 60 secondes)
    if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry - 60000) {
      console.log('🔑 Using cached OAuth2 token')
      return this.token
    }

    console.log('🔑 Requesting new OAuth2 token from IFS...')

    // Préparer les paramètres de la requête OAuth2
    const params = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      scope: this.config.scope,
    })

    try {
      // Requête OAuth2
      const response = await fetch(this.config.tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`OAuth2 token request failed: ${response.status} - ${errorText}`)
      }

      const data: IFSToken = await response.json()

      // Mettre en cache le token
      this.token = data.access_token
      this.tokenExpiry = Date.now() + data.expires_in * 1000

      console.log(`✅ OAuth2 token obtained (expires in ${data.expires_in}s)`)

      return this.token
    } catch (error) {
      console.error('❌ Failed to get OAuth2 token:', error)
      throw new Error(`OAuth2 authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Effectuer une requête GET vers l'API OData IFS
   * 
   * @param endpoint - Endpoint relatif (ex: 'ShopOrderHandling.svc/ShopOrds')
   * @param params - Paramètres OData (ex: { $filter, $select, $top })
   * @returns Réponse JSON typée
   * 
   * @example
   * ```typescript
   * const response = await client.get<IFSODataResponse<IFSShopOrder>>(
   *   'ShopOrderHandling.svc/ShopOrds',
   *   {
   *     $filter: "contains(OrderNo,'97277')",
   *     $select: 'OrderNo,ReleaseNo,DopId',
   *     $top: '10'
   *   }
   * )
   * ```
   */
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    return this.request<T>('GET', endpoint, params)
  }

  /**
   * Effectuer une requête POST vers l'API OData IFS
   * 
   * @param endpoint - Endpoint relatif (ex: 'PrintDialog.svc/PrintDialogInit')
   * @param body - Corps de la requête (sera converti en JSON)
   * @param headers - Headers additionnels (ex: If-Match pour ETag)
   * @returns Réponse JSON typée
   * 
   * @example
   * ```typescript
   * const response = await client.post<IFSPrintResultKeyResponse>(
   *   'CustomerOrderHandling.svc/CustomerOrderSet(...)/CustomerOrder_PrintResultKey',
   *   { ReportId: 'CUSTOMER_ORDER_CONF_REP' },
   *   { 'If-Match': etag }
   * )
   * ```
   */
  async post<T>(endpoint: string, body?: unknown, headers?: Record<string, string>): Promise<T> {
    return this.request<T>('POST', endpoint, undefined, body, headers)
  }

  /**
   * Effectuer une requête GET avec réponse binaire (ArrayBuffer)
   * 
   * @param endpoint - Endpoint relatif
   * @param params - Paramètres OData
   * @param headers - Headers additionnels (ex: Accept: application/octet-stream)
   * @returns Données binaires (ArrayBuffer)
   * 
   * @example
   * ```typescript
   * const pdfBuffer = await client.getRaw(
   *   'PrintDialog.svc/PdfArchiveSet(...)/Pdf',
   *   undefined,
   *   { 'Accept': 'application/octet-stream' }
   * )
   * ```
   */
  async getRaw(endpoint: string, params?: Record<string, string>, headers?: Record<string, string>): Promise<ArrayBuffer> {
    return this.request<ArrayBuffer>('GET', endpoint, params, undefined, headers, true)
  }

  /**
   * Effectuer une requête HTTP vers l'API IFS (méthode interne)
   * 
   * @param method - Méthode HTTP (GET, POST)
   * @param endpoint - Endpoint relatif
   * @param params - Paramètres OData (pour GET)
   * @param body - Corps de la requête (pour POST)
   * @param additionalHeaders - Headers additionnels
   * @param binary - Si true, retourne ArrayBuffer au lieu de JSON
   * @returns Réponse typée (JSON ou ArrayBuffer)
   */
  private async request<T>(
    method: 'GET' | 'POST',
    endpoint: string,
    params?: Record<string, string>,
    body?: unknown,
    additionalHeaders?: Record<string, string>,
    binary: boolean = false
  ): Promise<T> {
    // Obtenir un token valide
    const token = await this.getAccessToken()

    // Construire l'URL complète
    let url = `${this.config.baseUrl}/${endpoint}`
    
    // Ajouter les paramètres OData manuellement pour éviter le sur-encodage
    if (params) {
      const queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&')
      url = `${url}?${queryString}`
    }

    console.log(`🔍 IFS API ${method}: ${url}`)

    try {
      // Préparer les headers
      const headers: Record<string, string> = {
        'Authorization': `Bearer ${token}`,
        'Accept': binary ? 'application/octet-stream' : 'application/json',
        ...additionalHeaders,
      }

      // Ajouter Content-Type pour POST avec body
      if (method === 'POST' && body) {
        headers['Content-Type'] = 'application/json'
      }

      // Requête HTTP
      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`IFS API request failed: ${response.status} - ${errorText}`)
      }

      // Traiter la réponse
      if (binary) {
        const arrayBuffer = await response.arrayBuffer()
        console.log(`✅ IFS API binary response received (${arrayBuffer.byteLength} bytes)`)
        return arrayBuffer as T
      } else {
        // Si 204 No Content, retourner un objet vide
        if (response.status === 204) {
          console.log(`✅ IFS API response: 204 No Content`)
          return {} as T
        }
        
        const data = await response.json()
        console.log(`✅ IFS API response received`)
        return data as T
      }
    } catch (error) {
      console.error('❌ IFS API request failed:', error)
      throw new Error(`IFS API request failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}

// ===== Singleton Instance =====

let ifsClientInstance: IFSClient | null = null

/**
 * Obtenir l'instance singleton du client IFS
 * 
 * Configuration automatique depuis les variables d'environnement.
 * 
 * @returns Instance du client IFS configuré
 * @throws Error si les variables d'environnement sont manquantes
 */
export function getIFSClient(): IFSClient {
  if (!ifsClientInstance) {
    // Vérifier que toutes les variables d'environnement sont présentes
    const clientId = process.env.IFS_CLIENT_ID
    const clientSecret = process.env.IFS_CLIENT_SECRET
    const tokenUrl = process.env.IFS_TOKEN_URL
    const baseUrl = process.env.IFS_BASE_URL
    const scope = process.env.IFS_SCOPE

    if (!clientId || !clientSecret || !tokenUrl || !baseUrl || !scope) {
      throw new Error(
        'Missing IFS configuration. Required environment variables: ' +
        'IFS_CLIENT_ID, IFS_CLIENT_SECRET, IFS_TOKEN_URL, IFS_BASE_URL, IFS_SCOPE'
      )
    }

    // Créer l'instance du client
    ifsClientInstance = new IFSClient({
      clientId,
      clientSecret,
      tokenUrl,
      baseUrl,
      scope,
    })

    console.log('🚀 IFS Client initialized')
  }

  return ifsClientInstance
}

/**
 * Réinitialiser le client IFS (utile pour les tests)
 */
export function resetIFSClient(): void {
  ifsClientInstance = null
}
