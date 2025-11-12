Excellent ! Laisse-moi t'expliquer le plan d'intégration optimal :

## 🎯 Plan d'intégration Azure Print API dans Part Printer

### Architecture proposée (3 couches)

```
┌─────────────────────────────────────────────────────────┐
│  1. SERVICE LAYER                                       │
│  src/shared/services/azure-print-service.ts             │
│  - Gestion OAuth2 (avec cache token 1h)                │
│  - Fonction printLabels(shopOrders, printer, layout)   │
│  - Retry logic (3 tentatives)                          │
│  - Génération du Selection string                      │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│  2. API ROUTE                                           │
│  src/app/api/part-printer/labels/print/route.ts        │
│  - Validation des paramètres                           │
│  - Appel au service azure-print                        │
│  - Gestion d'erreurs (PP_E006: PRINT_FAILED)          │
│  - Logging                                              │
└────────────────┬────────────────────────────────────────┘
                 │
┌────────────────▼────────────────────────────────────────┐
│  3. UI INTEGRATION                                      │
│  src/app/(tools)/part-printer/page.tsx                 │
│  - Appel API après génération PDF (optionnel)          │
│  - Toast success/error                                  │
│  - État loading pendant impression                      │
└─────────────────────────────────────────────────────────┘
```

---

## 📝 Détails d'implémentation

### 1️⃣ Service Azure Print (`azure-print-service.ts`)

**Pourquoi en shared ?** → Peut être réutilisé par d'autres outils

```typescript
// src/shared/services/azure-print-service.ts

interface AzurePrintConfig {
  clientId: string
  clientSecret: string
  oauthUrl: string
  apiUrl: string
  subscriptionKey: string
}

interface ShopOrderForPrint {
  orderNo: string
  releaseNo?: string  // Défaut: *
  sequenceNo?: string // Défaut: *
}

// Cache token en mémoire (1h)
let tokenCache: { token: string; expiresAt: number } | null = null

async function getAccessToken(): Promise<string> {
  // Check cache
  if (tokenCache && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token
  }
  
  // Fetch new token
  const token = await fetchOAuth2Token(...)
  
  // Cache 55min (token valid 1h)
  tokenCache = {
    token,
    expiresAt: Date.now() + (55 * 60 * 1000)
  }
  
  return token
}

// Fonction principale
export async function printLabels(
  shopOrders: ShopOrderForPrint[],
  printer: string,
  layout: string = 'BEN_MA_FO_CR_184.rdl'
): Promise<{ success: boolean; message?: string }> {
  
  // 1. Générer Selection string
  const selection = shopOrders
    .map(so => `ORDER_NO=${so.orderNo}^RELEASE_NO=${so.releaseNo || '*'}^SEQUENCE_NO=${so.sequenceNo || '*'}^`)
    .join(';') + ';'
  
  // 2. Obtenir token
  const token = await getAccessToken()
  
  // 3. Appel API avec retry
  return await retryWithBackoff(async () => {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey
      },
      body: JSON.stringify({
        Printer: printer,
        PrintModel: layout,
        Selection: selection
      })
    })
    
    if (!response.ok) {
      throw new Error(`Print failed: ${response.status}`)
    }
    
    return { success: true, message: 'Labels sent to printer' }
  }, { maxRetries: 3, baseDelay: 1000 })
}
```

**Avantages** :
- ✅ Token caché (évite appels OAuth2 répétés)
- ✅ Retry automatique (résilience)
- ✅ Simple à utiliser : `printLabels(orders, printer)`
- ✅ Réutilisable par d'autres outils

---

### 2️⃣ API Route (`/api/part-printer/labels/print/route.ts`)

**Rôle** : Validation + orchestration

```typescript
// src/app/api/part-printer/labels/print/route.ts

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validation
    if (!body.shopOrders || !Array.isArray(body.shopOrders)) {
      return NextResponse.json(
        { success: false, error: 'Missing shopOrders' },
        { status: 400 }
      )
    }
    
    if (!body.printer) {
      return NextResponse.json(
        { success: false, error: 'Missing printer' },
        { status: 400 }
      )
    }
    
    // Log
    console.log(`🖨️ Print request: ${body.shopOrders.length} orders → ${body.printer}`)
    
    // Appel service
    const result = await printLabels(
      body.shopOrders,
      body.printer,
      body.layout // optionnel
    )
    
    if (result.success) {
      console.log(`✅ Print success: ${body.shopOrders.length} labels`)
      return NextResponse.json({
        success: true,
        message: result.message,
        orderCount: body.shopOrders.length
      })
    }
    
  } catch (error) {
    console.error('❌ Print error:', error)
    
    // Gestion erreur PP_E006
    const printError = ErrorService.createError('PP_E006', {
      context: 'Azure Print API',
      details: error.message
    })
    
    return NextResponse.json(
      {
        success: false,
        error: printError
      },
      { status: 500 }
    )
  }
}
```

**Avantages** :
- ✅ Validation stricte
- ✅ Intégration avec système d'erreurs Part Printer
- ✅ Logging clair
- ✅ API REST standard

---

### 3️⃣ UI Integration (`page.tsx`)

**Modification minimale** du workflow existant

```typescript
// src/app/(tools)/part-printer/page.tsx

// État existant
const [selectedPrinter, setSelectedPrinter] = useState<string>('')
const [printMode, setPrintMode] = useState<PrintMode>('listing-only')
const [isPrinting, setIsPrinting] = useState(false)

// Fonction modifiée
const handleGenerateAndPrint = async () => {
  setIsPrinting(true)
  
  try {
    // 1. Générer le PDF (existant)
    if (printMode !== 'labels-only') {
      await generateListingPDF(filteredShopOrders)
      toast.success('Listing generated!')
    }
    
    // 2. Envoyer à l'imprimante IFS (NOUVEAU)
    if (printMode !== 'listing-only' && selectedPrinter) {
      console.log('🖨️ Sending labels to IFS printer...')
      
      const response = await fetch('/api/part-printer/labels/print', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopOrders: filteredShopOrders.map(so => ({
            orderNo: so.orderNo,
            releaseNo: '*',
            sequenceNo: '*'
          })),
          printer: selectedPrinter,
          layout: 'BEN_MA_FO_CR_184.rdl'
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        toast.success(`✅ ${result.orderCount} labels sent to ${selectedPrinter}!`)
      } else {
        toast.error(`❌ Print failed: ${result.error?.message}`)
      }
    }
    
  } catch (error) {
    toast.error('❌ Error during print')
    console.error(error)
  } finally {
    setIsPrinting(false)
  }
}
```

**Avantages** :
- ✅ Changement minimal dans le code existant
- ✅ Pas de génération PDF custom (IFS le fait)
- ✅ Feedback utilisateur clair
- ✅ Gestion d'erreurs intégrée

---

## 🎯 Ordre d'implémentation optimal

1. **Service d'abord** → Logique réutilisable et testable
2. **API Route ensuite** → Orchestration et validation
3. **UI en dernier** → Integration simple quand le backend est prêt

**Temps estimé** : 1-2h pour les 3 couches

---

## ✅ Pourquoi cette approche est efficace ?

| Aspect | Bénéfice |
|--------|----------|
| **Séparation des responsabilités** | Service = logique, API = validation, UI = présentation |
| **Testabilité** | Chaque couche testable indépendamment |
| **Réutilisabilité** | Service partagé utilisable par d'autres outils |
| **Maintenabilité** | Changement API Azure ? Modifier seulement le service |
| **Performance** | Token caché = moins d'appels OAuth2 |
| **Résilience** | Retry automatique en cas d'échec temporaire |

---
Il faut aussi ajouter le fait que lorsque on sélectionne en option de print 
Listing Only
Generate PDF listing for local printing 

Le bouton d'impression soit bleu avec "DOWLOAND PDF" c'est le cas c'est super 

par contre si les options sont : 
Labels Only
Print labels directly to IFS printer
OU

Listing + Labels
Generate listing PDF and print labels

faut que le bouton soit soit print + download pdf ou juste print selon l'option choisi 