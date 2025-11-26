/**
 * Azure APIM Mock Handlers - MSW (Mock Service Worker)
 * 
 * Mock les endpoints Azure APIM pour les tests d'intégration:
 * 1. Azure AD OAuth2 Token (Client Credentials Flow)
 * 2. IFS Cloud OData API via Azure APIM
 * 
 * ⚠️ Utilise de VRAIES structures de données capturées depuis IFS
 * 
 * @see tests/boat-configuration/integration/fixtures/
 * @see scripts/investigate-ifs-data.ts
 */

import { http, HttpResponse } from 'msw'
import {
  ALL_SHOP_ORDERS,
  filterShopOrdersByOrderNo,
  ALL_DOP_HEADERS,
  filterDopHeadersByDopId,
  ALL_CUSTOMER_ORDER_LINES,
  filterCustomerOrderLinesByOrderNo,
  filterCustomerOrderLinesByHullNumber,
  ALL_CUSTOMER_ORDER_HEADERS,
  getCustomerOrderHeaderByOrderNo,
  ALL_PRINTERS,
  ALL_LANGUAGES,
  PRINT_LAYOUT_BOAT_CONFIG,
  PRINT_JOB_EXAMPLE,
  PDF_BASE64_EXAMPLE
} from '../fixtures'

/**
 * Azure AD OAuth2 Configuration
 * ⚠️ Doit matcher .env.test pour que MSW intercepte correctement
 */
const AZURE_AD_TOKEN_URL = 'https://test.ifs.cloud/auth/token'
const AZURE_APIM_BASE_URL = 'https://test.ifs.cloud/projection/v1'

/**
 * Mock OAuth2 Access Token
 */
const MOCK_ACCESS_TOKEN = 'mock_azure_ad_access_token_12345'

/**
 * Handler 1: Azure AD OAuth2 Token Endpoint
 * POST /auth/token
 */
const azureAdTokenHandler = http.post(AZURE_AD_TOKEN_URL, async ({ request }) => {
  const body = await request.text()
  const params = new URLSearchParams(body)

  const grantType = params.get('grant_type')
  const clientId = params.get('client_id')
  const clientSecret = params.get('client_secret')
  const scope = params.get('scope')

  // Validation
  if (grantType !== 'client_credentials') {
    return HttpResponse.json(
      { error: 'unsupported_grant_type' },
      { status: 400 }
    )
  }

  if (!clientId || !clientSecret) {
    return HttpResponse.json(
      { error: 'invalid_client' },
      { status: 401 }
    )
  }

  // Success: Return Access Token
  return HttpResponse.json({
    token_type: 'Bearer',
    expires_in: 3600,
    ext_expires_in: 3600,
    access_token: MOCK_ACCESS_TOKEN
  })
})

/**
 * Handler 2: Shop Orders Search
 * GET /ShopOrderHandling.svc/ShopOrds
 */
const shopOrdersHandler = http.get(
  `${AZURE_APIM_BASE_URL}/ShopOrderHandling.svc/ShopOrds`,
  ({ request }) => {
    const url = new URL(request.url)
    const filter = url.searchParams.get('$filter')

    // Vérifier Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.includes(MOCK_ACCESS_TOKEN)) {
      return HttpResponse.json(
        { statusCode: 401, message: 'Invalid JWT.' },
        { status: 401 }
      )
    }

    // Parser le filtre OData "contains(OrderNo,'...')"
    const containsMatch = filter?.match(/contains\(OrderNo,'([^']+)'\)/)
    if (!containsMatch) {
      return HttpResponse.json(
        {
          '@odata.context': `${AZURE_APIM_BASE_URL}/ShopOrderHandling.svc/$metadata#ShopOrds`,
          value: ALL_SHOP_ORDERS
        },
        { status: 200 }
      )
    }

    const orderNo = containsMatch[1]
    const filtered = filterShopOrdersByOrderNo(orderNo)

    return HttpResponse.json(
      {
        '@odata.context': `${AZURE_APIM_BASE_URL}/ShopOrderHandling.svc/$metadata#ShopOrds`,
        value: filtered
      },
      { status: 200 }
    )
  }
)

/**
 * Handler 3: DOP Headers (Serial Numbers)
 * GET /DopHeaderHandling.svc/Reference_DopHeadSerialReserv
 */
const dopHeadersHandler = http.get(
  `${AZURE_APIM_BASE_URL}/DopHeaderHandling.svc/Reference_DopHeadSerialReserv`,
  ({ request }) => {
    const url = new URL(request.url)
    const filter = url.searchParams.get('$filter')

    // Vérifier Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.includes(MOCK_ACCESS_TOKEN)) {
      return HttpResponse.json(
        { statusCode: 401, message: 'Invalid JWT.' },
        { status: 401 }
      )
    }

    // Parser le filtre OData "contains(DopId,'...')"
    const containsMatch = filter?.match(/contains\(DopId,'([^']+)'\)/)
    if (!containsMatch) {
      return HttpResponse.json(
        {
          '@odata.context': `${AZURE_APIM_BASE_URL}/DopHeaderHandling.svc/$metadata#Reference_DopHeadSerialReserv`,
          value: ALL_DOP_HEADERS
        },
        { status: 200 }
      )
    }

    const dopId = containsMatch[1]
    const filtered = filterDopHeadersByDopId(dopId)

    return HttpResponse.json(
      {
        '@odata.context': `${AZURE_APIM_BASE_URL}/DopHeaderHandling.svc/$metadata#Reference_DopHeadSerialReserv`,
        value: filtered
      },
      { status: 200 }
    )
  }
)

/**
 * Handler 4: Customer Order Lines
 * GET /CustomerOrderHandling.svc/CustomerOrderLineSet
 */
const customerOrderLinesHandler = http.get(
  `${AZURE_APIM_BASE_URL}/CustomerOrderHandling.svc/CustomerOrderLineSet`,
  ({ request }) => {
    const url = new URL(request.url)
    const filter = url.searchParams.get('$filter')

    // Vérifier Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.includes(MOCK_ACCESS_TOKEN)) {
      return HttpResponse.json(
        { statusCode: 401, message: 'Invalid JWT.' },
        { status: 401 }
      )
    }

    // Parser le filtre OData "CHullNumber eq '...' and Contract eq 'FR05A'"
    const hullMatch = filter?.match(/CHullNumber eq '([^']+)'/)
    const contractMatch = filter?.match(/Contract eq '([^']+)'/)

    if (!hullMatch) {
      return HttpResponse.json(
        {
          '@odata.context': `${AZURE_APIM_BASE_URL}/CustomerOrderHandling.svc/$metadata#CustomerOrderLineSet`,
          value: ALL_CUSTOMER_ORDER_LINES
        },
        { status: 200 }
      )
    }

    const hullNumber = hullMatch[1]
    const contract = contractMatch ? contractMatch[1] : 'FR05A'
    const filtered = filterCustomerOrderLinesByHullNumber(hullNumber, contract)

    return HttpResponse.json(
      {
        '@odata.context': `${AZURE_APIM_BASE_URL}/CustomerOrderHandling.svc/$metadata#CustomerOrderLineSet`,
        value: filtered
      },
      { status: 200 }
    )
  }
)

/**
 * Handler 5: Customer Order Headers
 * GET /CustomerOrderHandling.svc/CustomerOrderSet
 */
const customerOrderHeadersHandler = http.get(
  `${AZURE_APIM_BASE_URL}/CustomerOrderHandling.svc/CustomerOrderSet`,
  ({ request }) => {
    const url = new URL(request.url)
    const filter = url.searchParams.get('$filter')

    // Vérifier Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.includes(MOCK_ACCESS_TOKEN)) {
      return HttpResponse.json(
        { statusCode: 401, message: 'Invalid JWT.' },
        { status: 401 }
      )
    }

    // Parser le filtre OData "OrderNo eq '...'"
    const orderNoMatch = filter?.match(/OrderNo eq '([^']+)'/)
    if (!orderNoMatch) {
      return HttpResponse.json(
        {
          '@odata.context': `${AZURE_APIM_BASE_URL}/CustomerOrderHandling.svc/$metadata#CustomerOrderSet`,
          value: ALL_CUSTOMER_ORDER_HEADERS
        },
        { status: 200 }
      )
    }

    const orderNo = orderNoMatch[1]
    const header = getCustomerOrderHeaderByOrderNo(orderNo)

    return HttpResponse.json(
      {
        '@odata.context': `${AZURE_APIM_BASE_URL}/CustomerOrderHandling.svc/$metadata#CustomerOrderSet`,
        value: header ? [header] : []
      },
      { status: 200 }
    )
  }
)

/**
 * Handler 6: Printers List
 * GET /PrintDialog.svc/LogicalPrinters
 */
const printersHandler = http.get(
  `${AZURE_APIM_BASE_URL}/PrintDialog.svc/LogicalPrinters`,
  ({ request }) => {
    // Vérifier Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.includes(MOCK_ACCESS_TOKEN)) {
      return HttpResponse.json(
        { statusCode: 401, message: 'Invalid JWT.' },
        { status: 401 }
      )
    }

    return HttpResponse.json(
      {
        '@odata.context': `${AZURE_APIM_BASE_URL}/PrintDialog.svc/$metadata#LogicalPrinters`,
        value: ALL_PRINTERS
      },
      { status: 200 }
    )
  }
)

/**
 * Handler 7: Languages List
 * GET /PrintDialog.svc/LanguageCodes
 */
const languagesHandler = http.get(
  `${AZURE_APIM_BASE_URL}/PrintDialog.svc/LanguageCodes`,
  ({ request }) => {
    // Vérifier Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.includes(MOCK_ACCESS_TOKEN)) {
      return HttpResponse.json(
        { statusCode: 401, message: 'Invalid JWT.' },
        { status: 401 }
      )
    }

    return HttpResponse.json(
      {
        '@odata.context': `${AZURE_APIM_BASE_URL}/PrintDialog.svc/$metadata#LanguageCodes`,
        value: ALL_LANGUAGES
      },
      { status: 200 }
    )
  }
)

/**
 * Handler 8: Get Customer Order (avec ETag)
 * GET /CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='...')
 */
const getCustomerOrderHandler = http.get(
  `${AZURE_APIM_BASE_URL}/CustomerOrderHandling.svc/CustomerOrderSet*`,
  ({ request }) => {
    // Vérifier Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.includes(MOCK_ACCESS_TOKEN)) {
      return HttpResponse.json(
        { statusCode: 401, message: 'Invalid JWT.' },
        { status: 401 }
      )
    }

    // Parser l'OrderNo depuis l'URL
    const url = new URL(request.url)
    const orderNoMatch = url.pathname.match(/OrderNo='([^']+)'/)
    
    if (!orderNoMatch) {
      return HttpResponse.json(
        { error: 'OrderNo not found in URL' },
        { status: 400 }
      )
    }

    const orderNo = orderNoMatch[1]

    // Vérifier si Customer Order existe
    const header = getCustomerOrderHeaderByOrderNo(orderNo)
    if (!header) {
      return HttpResponse.json(
        { error: { code: 'ITEM_NOT_EXIST', message: 'Customer Order not found' } },
        { status: 404 }
      )
    }

    // Retourner Customer Order avec ETag
    return HttpResponse.json(
      {
        '@odata.context': `${AZURE_APIM_BASE_URL}/CustomerOrderHandling.svc/$metadata#CustomerOrderSet/$entity`,
        '@odata.etag': 'W/"mock-etag-12345"',
        OrderNo: header.OrderNo,
        Contract: header.Contract,
        CustomerNo: header.CustomerNo,
      },
      { status: 200 }
    )
  }
)

/**
 * Handler 9: Print Result Key
 * POST /CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='...')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey
 */
const printResultKeyHandler = http.post(
  `${AZURE_APIM_BASE_URL}/CustomerOrderHandling.svc/CustomerOrderSet*`,
  async ({ request }) => {
    // Vérifier Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.includes(MOCK_ACCESS_TOKEN)) {
      return HttpResponse.json(
        { statusCode: 401, message: 'Invalid JWT.' },
        { status: 401 }
      )
    }

    // Vérifier If-Match header (ETag)
    const ifMatch = request.headers.get('If-Match')
    if (!ifMatch) {
      return HttpResponse.json(
        { error: 'Missing If-Match header' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const reportId = (body as { ReportId?: string }).ReportId

    if (!reportId) {
      return HttpResponse.json(
        { error: 'Missing ReportId' },
        { status: 400 }
      )
    }

    // Retourner ResultKey (entier sous forme de string)
    return HttpResponse.json(
      { value: '123456' },
      { status: 200 }
    )
  }
)

/**
 * Handler 10: Print Dialog Init
 * POST /PrintDialog.svc/PrintDialogInit
 */
const printDialogInitHandler = http.post(
  `${AZURE_APIM_BASE_URL}/PrintDialog.svc/PrintDialogInit`,
  async ({ request }) => {
    // Vérifier Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.includes(MOCK_ACCESS_TOKEN)) {
      return HttpResponse.json(
        { statusCode: 401, message: 'Invalid JWT.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const resultKey = (body as { ResultKey?: number }).ResultKey

    if (!resultKey) {
      return HttpResponse.json(
        { error: 'Missing ResultKey' },
        { status: 400 }
      )
    }

    return HttpResponse.json(
      {
        ResultKey: resultKey,
        ReportTitle: 'Proforma Invoice',
        LayoutName: 'BEN_Boat_configuration_for_production.rdl',
        LangCode: 'fr',
        Copies: 1,
      },
      { status: 200 }
    )
  }
)

/**
 * Handler 11: Report Print Request
 * POST /PrintDialog.svc/ReportPrintRequest
 */
const reportPrintRequestHandler = http.post(
  `${AZURE_APIM_BASE_URL}/PrintDialog.svc/ReportPrintRequest`,
  async ({ request }) => {
    // Vérifier Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.includes(MOCK_ACCESS_TOKEN)) {
      return HttpResponse.json(
        { statusCode: 401, message: 'Invalid JWT.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { ResultKey, LayoutName, LanguageCode, LogicalPrinter, Copies } = body as {
      ResultKey?: number
      LayoutName?: string
      LanguageCode?: string
      LogicalPrinter?: string
      Copies?: number
    }

    if (!ResultKey || !LayoutName || !LanguageCode || !LogicalPrinter) {
      return HttpResponse.json(
        { error: 'Missing required print parameters' },
        { status: 400 }
      )
    }

    // Impression réussie (pas de réponse body attendue)
    return new HttpResponse(null, { status: 204 })
  }
)

/**
 * Handler 12: PDF Archive (polling)
 * GET /PrintDialog.svc/PdfArchiveSet?$filter=ResultKey eq 123456
 */
const pdfArchiveHandler = http.get(
  `${AZURE_APIM_BASE_URL}/PrintDialog.svc/PdfArchiveSet`,
  ({ request }) => {
    // Vérifier Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.includes(MOCK_ACCESS_TOKEN)) {
      return HttpResponse.json(
        { statusCode: 401, message: 'Invalid JWT.' },
        { status: 401 }
      )
    }

    const url = new URL(request.url)
    const filter = url.searchParams.get('$filter')
    
    // Parser ResultKey depuis le filtre
    const resultKeyMatch = filter?.match(/ResultKey eq (\d+)/)
    const resultKey = resultKeyMatch ? parseInt(resultKeyMatch[1]) : 0

    // Simuler PDF prêt immédiatement
    return HttpResponse.json(
      {
        '@odata.context': `${AZURE_APIM_BASE_URL}/PrintDialog.svc/$metadata#PdfArchiveSet`,
        value: [
          {
            ResultKey: resultKey,
            Id: 'pdf-archive-id-12345',
            FileName: `ProformaInvoice_C1000000933_${resultKey}.pdf`,
            PdfSize: 524288, // 512 KB
            LayoutName: 'BEN_Boat_configuration_for_production.rdl',
            LangCode: 'fr',
            Created: new Date().toISOString(),
          }
        ]
      },
      { status: 200 }
    )
  }
)

/**
 * Handler 13: Download PDF
 * GET /PrintDialog.svc/PdfArchiveSet(ResultKey=123456,Id='...')/Pdf
 */
const downloadPdfHandler = http.get(
  `${AZURE_APIM_BASE_URL}/PrintDialog.svc/PdfArchiveSet*`,
  ({ request }) => {
    // Vérifier Authorization header
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.includes(MOCK_ACCESS_TOKEN)) {
      return HttpResponse.json(
        { statusCode: 401, message: 'Invalid JWT.' },
        { status: 401 }
      )
    }

    // Retourner un mock PDF (base64 décodé)
    const mockPdfBuffer = Buffer.from(PDF_BASE64_EXAMPLE, 'base64')
    
    return HttpResponse.arrayBuffer(mockPdfBuffer.buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': mockPdfBuffer.length.toString(),
      }
    })
  }
)

/**
 * DEPRECATED HANDLERS (ancienne API - gardés pour référence)
 */
const printLayoutSearchHandler = http.post(
  `${AZURE_APIM_BASE_URL}/PrintDialog.svc/LayoutSearchArray`,
  ({ request }) => {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.includes(MOCK_ACCESS_TOKEN)) {
      return HttpResponse.json(
        { statusCode: 401, message: 'Invalid JWT.' },
        { status: 401 }
      )
    }

    return HttpResponse.json({
      ResultKey: PRINT_LAYOUT_BOAT_CONFIG.ResultKey,
      LayoutName: PRINT_LAYOUT_BOAT_CONFIG.LayoutName
    })
  }
)

const printLayoutOwnerHandler = http.post(
  `${AZURE_APIM_BASE_URL}/PrintDialog.svc/GetLayoutOwner`,
  ({ request }) => {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.includes(MOCK_ACCESS_TOKEN)) {
      return HttpResponse.json(
        { statusCode: 401, message: 'Invalid JWT.' },
        { status: 401 }
      )
    }

    return HttpResponse.json({
      ReportId: PRINT_LAYOUT_BOAT_CONFIG.ReportId
    })
  }
)

const startPrintJobHandler = http.post(
  `${AZURE_APIM_BASE_URL}/PrintDialog.svc/StartPrintJob`,
  ({ request }) => {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.includes(MOCK_ACCESS_TOKEN)) {
      return HttpResponse.json(
        { statusCode: 401, message: 'Invalid JWT.' },
        { status: 401 }
      )
    }

    return HttpResponse.json({
      InstanceAttr: PRINT_JOB_EXAMPLE.InstanceAttr
    })
  }
)

const getPrintJobIdHandler = http.post(
  `${AZURE_APIM_BASE_URL}/PrintDialog.svc/GetPrintJobId`,
  ({ request }) => {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.includes(MOCK_ACCESS_TOKEN)) {
      return HttpResponse.json(
        { statusCode: 401, message: 'Invalid JWT.' },
        { status: 401 }
      )
    }

    return HttpResponse.json({
      PrintJobId: PRINT_JOB_EXAMPLE.PrintJobId
    })
  }
)

const pollPdfResultHandler = http.get(
  `${AZURE_APIM_BASE_URL}/PrintDialog.svc/PrintJobs(:printJobId)/GetPdfResult`,
  ({ request }) => {
    const authHeader = request.headers.get('Authorization')
    if (!authHeader || !authHeader.includes(MOCK_ACCESS_TOKEN)) {
      return HttpResponse.json(
        { statusCode: 401, message: 'Invalid JWT.' },
        { status: 401 }
      )
    }

    return HttpResponse.json({
      value: PDF_BASE64_EXAMPLE
    })
  }
)

/**
 * Export tous les handlers
 */
export const apimHandlers = [
  azureAdTokenHandler,
  shopOrdersHandler,
  dopHeadersHandler,
  customerOrderLinesHandler,
  customerOrderHeadersHandler,
  printersHandler,
  languagesHandler,
  // Nouvelle API Print (utilisée par l'API route actuelle)
  getCustomerOrderHandler,
  printResultKeyHandler,
  printDialogInitHandler,
  reportPrintRequestHandler,
  pdfArchiveHandler,
  downloadPdfHandler,
  // Ancienne API Print (deprecated - gardée pour référence)
  printLayoutSearchHandler,
  printLayoutOwnerHandler,
  startPrintJobHandler,
  getPrintJobIdHandler,
  pollPdfResultHandler
]
