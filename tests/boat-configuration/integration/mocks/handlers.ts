import { http, HttpResponse } from 'msw'

/**
 * MSW Handlers - Mock des APIs IFS
 * 
 * Ces handlers interceptent les appels aux services IFS
 * et retournent des réponses mockées pour les tests.
 */

const IFS_BASE_URL = process.env.IFS_BASE_URL || 'https://beneteau-group-ast.ifs.cloud'

export const handlers = [
  // Mock: ShopOrderHandling.svc/ShopOrds
  http.get(`${IFS_BASE_URL}/main/ifsapplications/projection/v1/ShopOrderHandling.svc/ShopOrds`, ({ request }) => {
    const url = new URL(request.url)
    const filter = url.searchParams.get('$filter')
    
    // Exemple: Shop Order 563 avec DOP
    if (filter?.includes('563')) {
      return HttpResponse.json({
        value: [
          {
            OrderNo: '563',
            ReleaseNo: '*',
            SequenceNo: '*',
            DopId: '34 - 1014',
            PartNo: 'LG5XA',
            PartDescription: 'Hull Assembly',
            Contract: 'FR05A',
          }
        ]
      })
    }
    
    // Exemple: Shop Order non trouvé
    return HttpResponse.json({ value: [] })
  }),

  // Mock: DopHeaderHandling.svc/Reference_DopHeadSerialReserv
  http.get(`${IFS_BASE_URL}/main/ifsapplications/projection/v1/DopHeaderHandling.svc/Reference_DopHeadSerialReserv`, ({ request }) => {
    const url = new URL(request.url)
    const filter = url.searchParams.get('$filter')
    
    // Exemple: DOP 34 → Serial Number JY6MB0019
    if (filter?.includes('34')) {
      return HttpResponse.json({
        value: [
          {
            DopId: '34',
            SerialNo: 'JY6MB0019',
            PartNo: 'LG5XA',
          }
        ]
      })
    }
    
    // Pas de Serial Number
    return HttpResponse.json({ value: [] })
  }),

  // Mock: Print Dialog
  http.post(`${IFS_BASE_URL}/main/ifsapplications/projection/v1/PrintDialog.svc/Print`, async () => {
    return HttpResponse.json({
      success: true,
      printJobId: 'PJ-TEST-001',
      timestamp: new Date().toISOString(),
    })
  }),
]
