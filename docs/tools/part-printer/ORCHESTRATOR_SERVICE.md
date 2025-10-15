# 🎯 Service Orchestrateur Part Printer

**Fichier** : `src/tools/part-printer/services/orchestrator-service.ts`  
**Date de création** : 15 octobre 2025  
**Status** : ✅ Opérationnel

---

## 📋 Vue d'ensemble

Le **Service Orchestrateur** est le **point d'entrée unique** pour le workflow complet du Part Printer. Il coordonne tous les services backend pour transformer des filtres Shop Order en étiquettes PDF imprimées.

### Responsabilités

1. **Coordination** : Orchestre l'appel de tous les services dans le bon ordre
2. **Consolidation** : Agrège les données de multiples sources IFS en étiquettes complètes
3. **Gestion d'erreurs** : Capture et reporte les erreurs par Shop Order
4. **Workflow complet** : Offre des fonctions de haut niveau pour l'UI

---

## 🏗️ Architecture

### Pattern : Service Facade

```
┌─────────────────────────────────────────────────────────────┐
│                  ORCHESTRATOR SERVICE                        │
│                  (Service Facade Pattern)                    │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Coordonne
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ Shop Order   │   │ Material     │   │ Operation    │
│ Filter       │   │ Line         │   │ Service      │
│ Service      │   │ Service      │   │ Service      │
└──────────────┘   └──────────────┘   └──────────────┘
        │                   │                   │
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ Master Part  │   │ Barcode      │   │ Label PDF    │
│ Service      │   │ Service      │   │ Service      │
└──────────────┘   └──────────────┘   └──────────────┘
        │                   │                   │
        │                   │                   │
        └───────────────────┴───────────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │ Label Print  │
                    │ Service      │
                    └──────────────┘
```

---

## 🔧 Fonctions principales

### 1. `generatePartLabels(options)` 🎯 PRINCIPALE

Génère toutes les étiquettes Part Printer à partir de filtres.

**Workflow** :
```
1. Filtrer Shop Orders → shop-order-filter-service
2. Pour chaque Shop Order:
   a. Extraire Raw Material → material-line-service
   b. Extraire OP10 Block ID → operation-service
   c. Extraire attributs Master Part → master-part-service
   d. Calculer Range ID (mock temporaire)
   e. Générer barcode → barcode-service (optionnel)
3. Retourner PartLabel[] consolidées
```

**Signature** :
```typescript
async function generatePartLabels(
  options: GenerateLabelsOptions
): Promise<GenerateLabelsResult>
```

**Exemple** :
```typescript
const result = await generatePartLabels({
  filters: {
    site: "FR017",
    productionLine: "MASSIF",
    startDate: "2024-10-01",
    blockDate: true,
    op10BlockId: "EMPTY"
  },
  generateBarcodes: true
})

console.log(`${result.count} étiquettes générées en ${result.duration}ms`)
console.log(`${result.errors} erreurs`)

// Accéder aux étiquettes
result.labels.forEach(label => {
  console.log(`${label.orderNo}: ${label.rawMaterial} - ${label.varnishCode}`)
})
```

---

### 2. `executeCompleteWorkflow(options)` 🚀 WORKFLOW COMPLET

Exécute le workflow complet : filtres → étiquettes → PDF → impression.

**Workflow** :
```
1. Générer les étiquettes (via generatePartLabels)
2. Générer le PDF (optionnel) → label-pdf-service
3. Imprimer le PDF (optionnel) → label-print-service
```

**Signature** :
```typescript
async function executeCompleteWorkflow(
  options: CompleteWorkflowOptions
): Promise<CompleteWorkflowResult>
```

**Exemple** :
```typescript
const result = await executeCompleteWorkflow({
  filters: {
    site: "FR017",
    startDate: "2024-10-01",
    blockDate: true,
    op10BlockId: "EMPTY"
  },
  printOptions: {
    printerId: "PRTBX101",
    site: "FR017",
    copies: 1,
    mode: "dev" // Mode DEV = téléchargement uniquement
  },
  generatePDF: true,
  printPDF: true
})

console.log(`${result.labels.count} étiquettes`)
console.log(`${result.pdf.pageCount} pages PDF`)
console.log(`Impression: ${result.print.message}`)
```

---

### 3. `groupLabelsByRawMaterialAndVarnish(labels)` 📊 GROUPEMENT

Groupe les étiquettes par (Raw Material, Varnish Code) pour la génération PDF.

**Logique** :
- Clé de groupement : `${rawMaterial}|${varnishCode}`
- Tri interne : Length Setup décroissant
- 1 page PDF par groupe

**Exemple** :
```typescript
const labels = [
  { rawMaterial: "D8588H", varnishCode: "RCTV1210", lengthSetup: "2500" },
  { rawMaterial: "D8588H", varnishCode: "RCTV1210", lengthSetup: "1904" },
  { rawMaterial: "D8590A", varnishCode: "RCTV1210", lengthSetup: "3000" }
]

const groups = groupLabelsByRawMaterialAndVarnish(labels)

// Résultat: 2 groupes
// Groupe 1: D8588H|RCTV1210 → 2 étiquettes [2500, 1904]
// Groupe 2: D8590A|RCTV1210 → 1 étiquette [3000]
```

---

## 📊 Types & Interfaces

### `PartLabel` - Étiquette consolidée complète

```typescript
interface PartLabel {
  // Shop Order
  orderNo: string
  releaseNo: string
  sequenceNo: string
  partNo: string
  partDescription: string
  startDate: string
  contract: string
  productionLine: string | null
  
  // Raw Material (OP10 Material Line)
  rawMaterial: string
  rawMaterialDescription: string
  
  // Operation 10
  blockId: string | null
  
  // Master Part Attributes
  genericCode: string
  lengthSetup: string
  varnishCode: string
  engineeringPartRev: string
  
  // Range
  rangeId: string
  
  // Barcode
  barcode: string
  barcodeDataUrl: string
}
```

### `GenerateLabelsOptions` - Options de génération

```typescript
interface GenerateLabelsOptions {
  filters: ShopOrderFilterParams
  generateBarcodes?: boolean    // Défaut: true
  mockRangeId?: string          // Défaut: calculé automatiquement
}
```

### `GenerateLabelsResult` - Résultat de génération

```typescript
interface GenerateLabelsResult {
  labels: PartLabel[]
  count: number
  shopOrdersProcessed: number
  errors: number
  errorDetails: Array<{
    orderNo: string
    error: string
  }>
  duration: number  // en ms
}
```

### `CompleteWorkflowOptions` - Options workflow complet

```typescript
interface CompleteWorkflowOptions extends GenerateLabelsOptions {
  printOptions: PrintLabelsOptions
  generatePDF?: boolean    // Défaut: true
  printPDF?: boolean       // Défaut: true
}
```

### `CompleteWorkflowResult` - Résultat workflow complet

```typescript
interface CompleteWorkflowResult {
  labels: GenerateLabelsResult
  pdf?: PDFGenerationResult
  print?: PrintLabelsResult
  totalDuration: number  // en ms
}
```

---

## 🔄 Gestion des erreurs

### Stratégie : Fail-soft

L'orchestrateur continue le traitement même si **certains** Shop Orders échouent.

**Exemple** :
```
Shop Order 454853: ✅ Étiquette créée
Shop Order 454854: ❌ Erreur: Raw Material non trouvé
Shop Order 454855: ✅ Étiquette créée
Shop Order 454856: ❌ Erreur: Attributs Master Part non trouvés

Résultat: 2 étiquettes générées, 2 erreurs
```

**Accès aux erreurs** :
```typescript
const result = await generatePartLabels(options)

if (result.errors > 0) {
  console.log(`⚠️ ${result.errors} erreurs détectées`)
  
  result.errorDetails.forEach(err => {
    console.error(`❌ ${err.orderNo}: ${err.error}`)
  })
}
```

---

## 🧪 Tests

### Script de test

**Fichier** : `scripts/test-orchestrator-workflow.ts`

**Tests couverts** :
1. **Test 1** : Génération d'étiquettes uniquement (sans PDF)
2. **Test 2** : Workflow complet (étiquettes + PDF + impression DEV)
3. **Test 3** : Mode REDÉBIT

**Exécution** :
```bash
npx tsx scripts/test-orchestrator-workflow.ts
```

**Résultat attendu** :
```
✅ Test 1 (Génération): 25 étiquettes
✅ Test 2 (Workflow complet): 25 étiquettes, PDF 5 pages
✅ Test 3 (REDÉBIT): 15 étiquettes
🎉 TOUS LES TESTS TERMINÉS AVEC SUCCÈS !
```

---

## 📈 Performance

### Mesures de performance

| Métrique | Valeur estimée |
|----------|----------------|
| **Filtrage Shop Orders** | ~500ms pour 100 Shop Orders |
| **Extraction données (1 Shop Order)** | ~2s (3 requêtes IFS parallèles) |
| **Génération barcodes** | ~50ms par barcode |
| **Génération PDF** | ~300ms pour 50 étiquettes |
| **Total (50 Shop Orders)** | ~100s (1min40s) |

### Optimisations possibles

1. **Parallélisation** : Traiter plusieurs Shop Orders en parallèle
2. **Cache** : Cacher les attributs Master Part déjà récupérés
3. **Pagination** : Traiter par lots de 10-20 Shop Orders
4. **Queue** : Utiliser une queue pour traitement asynchrone (>100 Shop Orders)

---

## 🚀 Utilisation dans l'API

### Endpoint API à créer (Phase 5)

**POST** `/api/part-printer/workflow/complete`

**Body** :
```json
{
  "filters": {
    "site": "FR017",
    "productionLine": "MASSIF",
    "startDate": "2024-10-01",
    "blockDate": true,
    "op10BlockId": "EMPTY"
  },
  "printOptions": {
    "printerId": "PRTBX101",
    "site": "FR017",
    "copies": 1,
    "mode": "dev"
  },
  "generatePDF": true,
  "printPDF": true
}
```

**Response** :
```json
{
  "success": true,
  "data": {
    "labels": {
      "count": 25,
      "shopOrdersProcessed": 25,
      "errors": 0,
      "duration": 50000
    },
    "pdf": {
      "pageCount": 5,
      "size": 204800
    },
    "print": {
      "success": true,
      "mode": "dev",
      "message": "PDF downloaded successfully",
      "downloadUrl": "/downloads/part-labels-20251015-123456.pdf"
    },
    "totalDuration": 51000
  }
}
```

**Implémentation** :
```typescript
// src/app/api/part-printer/workflow/complete/route.ts
import { executeCompleteWorkflow } from '@/tools/part-printer/services/orchestrator-service'

export async function POST(request: Request) {
  try {
    const options = await request.json()
    const result = await executeCompleteWorkflow(options)
    
    return Response.json({
      success: true,
      data: result
    })
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
```

---

## 🔗 Services dépendants

| Service | Fonction | Fichier |
|---------|----------|---------|
| **Shop Order Filter** | `filterShopOrders()` | `shop-order-filter-service.ts` |
| **Material Line** | `getRawMaterial()` | `material-line-service.ts` |
| **Operation** | `getOperation10Data()` | `operation-service.ts` |
| **Master Part** | `getMasterPartAttributes()` | `master-part-service.ts` |
| **Barcode** | `generateBarcode()` | `barcode-service.ts` |
| **Label PDF** | `generateLabelsPDF()` | `label-pdf-service.ts` |
| **Label Print** | `printLabels()` | `label-print-service.ts` |

**Documentation** : Voir chaque service pour les détails d'implémentation.

---

## 📝 Notes de développement

### Données mockées temporaires

1. **Range ID** : Calculé localement (endpoint IFS non trouvé)
   ```typescript
   function calculateMockRangeId(dateString: string): string {
     const dayOfYear = Math.floor(...)
     return `${dayOfYear} A` // Ex: "288 A"
   }
   ```

2. **Engineering Revision** : Fallback "N/A" si endpoint 404
   ```typescript
   engineeringPartRev: attributes.engineeringPartRev || 'N/A'
   ```

### Actions requises

1. ✅ **Range** : Clarifier si endpoint IFS existe ou créer table custom
2. ✅ **Engineering Revision** : Trouver endpoint correct ou accepter fallback
3. 📋 **Tests E2E** : Valider avec données réelles IFS en production
4. 📋 **UI** : Créer interface pour appeler l'orchestrateur (Phase 5)

---

## 🎯 Prochaines étapes

### Phase 4 (en cours)

- [ ] Tests E2E avec Shop Orders réels
- [ ] Validation des données consolidées
- [ ] Mesure de performance réelle

### Phase 5 (Interface UI)

- [ ] Créer page `/part-printer`
- [ ] Panel de filtres
- [ ] Table Shop Orders avec sélection multiple
- [ ] Aperçu PDF
- [ ] Dialog d'impression

---

**Créé par** : GitHub Copilot  
**Date** : 15 octobre 2025  
**Status** : ✅ Service opérationnel - En attente de tests E2E
