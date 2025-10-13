# 🗺️ Roadmap - Part Printer

**Version** : 1.0  
**Status** : 📋 Planning  
**Dernière mise à jour** : 13 octobre 2025

---

## 📋 Vue d'ensemble

Le **Part Printer** (Wood Part Printer / IFS Label Printer) est un outil permettant d'imprimer des étiquettes pour les pièces en bois de production. Il gère les débits classiques et les redébits avec des filtres avancés.

### Objectifs principaux

1. **Filtrer** les Shop Orders par Site, Ligne de production, Date, etc.
2. **Extraire** les données des pièces (Raw Material, Varnish Code, Generic Code, etc.)
3. **Générer** des étiquettes A4 paysage avec code-barres
4. **Imprimer** par groupes (Raw Material / Varnish Code)

---

## 🎯 Phases de développement

### Phase 1 : Architecture & Fondations ⏳ 2 semaines

**Objectif** : Mettre en place l'architecture commune du Manufacturing Portal et les services de base

#### 1.1 Refonte Architecture Manufacturing Portal

- [ ] Restructurer `/src/app` avec organisation par outil
- [ ] Créer structure `/shared` pour composants communs
- [ ] Migrer Boat Config vers nouvelle structure
- [ ] Documentation architecture multi-outils

**Livrables** :
- ✅ Nouvelle structure de dossiers
- ✅ Guide de migration
- ✅ Documentation architecture

#### 1.2 Services IFS de base

- [ ] Service Sites (GET sites/contracts)
- [ ] Service Production Lines (GET production lines par site)
- [ ] Service Shop Orders avec filtres avancés
- [ ] Service Master Parts (attributs)
- [ ] Service Ranges (table Range par site)

**API Endpoints** :
```
GET /api/sites
GET /api/production-lines?site={site}
GET /api/shop-orders/filter (avec tous les filtres Part Printer)
GET /api/master-parts/{partNo}
GET /api/ranges?site={site}&date={date}
```

**Livrables** :
- ✅ 5 services TypeScript
- ✅ 5 API Routes
- ✅ Tests unitaires
- ✅ Documentation API

#### 1.3 Types & Interfaces

- [ ] Interface `IFSSite`
- [ ] Interface `IFSProductionLine`
- [ ] Interface `IFSShopOrderExtended` (avec OP10, Block ID, etc.)
- [ ] Interface `IFSMasterPart` (avec attributs)
- [ ] Interface `IFSRange`
- [ ] Interface `PartLabel` (données étiquette)

**Livrables** :
- ✅ Types dans `/src/core/types/ifs/part-printer.ts`
- ✅ Documentation types

---

### Phase 2 : Filtres & Recherche ⏳ 2 semaines

**Objectif** : Implémenter l'interface de filtrage et la recherche des Shop Orders

#### 2.1 Interface de filtrage

**Composants UI** :
- [ ] `SiteSelector` - Dropdown sites IFS (LOV Contracts)
- [ ] `ProductionLineSelector` - Dropdown lignes de production (filtrée par site)
- [ ] `DatePicker` - Sélecteur date de début (Start Date)
- [ ] `BlockDateToggle` - Toggle Debit classique / Redébit
- [ ] `OP10BlockIDFilter` - Filtre "EMPTY" / "No condition"
- [ ] `FilterPanel` - Panel regroupant tous les filtres

**API Endpoints** :
```
GET /api/sites
  → Response: [{ Contract: "BDR", Name: "Site BDR", ... }]

GET /api/production-lines?site=BDR
  → Response: [{ LineId: "L1", Name: "Line 1", Site: "BDR", ... }]

POST /api/shop-orders/filter
  Body: {
    site: "BDR",
    productionLine?: "L1",
    startDate: "2025-10-13",
    blockDate: true,      // true = débit classique, false = redébit
    op10BlockId?: "EMPTY" // "EMPTY" | "NO_CONDITION" | null
  }
  → Response: { shopOrders: [...], count: 25 }
```

**Livrables** :
- ✅ 5 composants UI avec Storybook
- ✅ 3 API Routes
- ✅ Tests E2E filtrage
- ✅ Documentation UX

#### 2.2 Recherche Shop Orders avec filtres

**Service** : `shop-order-filter-service.ts`

**Logique de filtrage** :

| Mode | Block Date | OP10 Block ID | Start Date |
|------|------------|---------------|------------|
| **Débit classique** | YES (true) | Strictement vide (EMPTY) | = Date sélectionnée |
| **Redébit** | NO (false) | No condition | <= Today |

**Requête OData** :
```typescript
// Exemple débit classique
$filter: "
  Contract eq 'BDR' 
  and State eq 'Released'
  and ScheduledStartDate eq datetime'2025-10-13T00:00:00Z'
  and BlockDate eq true
"

// + Filtrage côté code pour OP10 Block ID vide
```

**Livrables** :
- ✅ Service de filtrage
- ✅ Tests avec données réelles
- ✅ Documentation filtres

---

### Phase 3 : Extraction des Données ⏳ 2 semaines

**Objectif** : Récupérer toutes les données nécessaires pour les étiquettes

#### 3.1 Extraction Operation No 10

**Service** : `operation-service.ts`

**API Endpoint** :
```
GET /api/operations?orderNo={orderNo}&releaseNo={releaseNo}&sequenceNo={sequenceNo}&operationNo=10
  → Response: {
      OperationNo: 10,
      BlockId: "B25",
      MaterialLines: [
        { MaterialPartNo: "OAK_RAW_001", ... }
      ]
    }
```

**Données extraites** :
- `Block ID` de l'opération 10
- `Raw Material` (Part code de la première ligne de composant liée à OP10)

**Livrables** :
- ✅ Service Operations
- ✅ API Route
- ✅ Tests

#### 3.2 Extraction Master Part Attributs

**Service** : `master-part-attributes-service.ts`

**API Endpoint** :
```
GET /api/master-parts/{partNo}/attributes
  → Response: {
      PartNo: "PART_001",
      GenericCode: "GEN_CODE_001",
      LengthSetup: "2850",
      VarnishCode: "VARN_A",
      EngineeringPartRev: "Rev_02"
    }
```

**Attributs IFS à récupérer** :
- `GENERIC CODE`
- `LENGTH SETUP`
- `VARNISH CODE`
- `Engineering Part Revision` (dernière révision active)

**Livrables** :
- ✅ Service Master Part
- ✅ API Route
- ✅ Tests

#### 3.3 Extraction Range ID

**Service** : `range-service.ts`

**API Endpoint** :
```
GET /api/ranges?site=BDR&date=2025-10-13
  → Response: {
      RangeId: "285 A",
      Site: "BDR",
      StartDate: "2025-10-13",
      EndDate: "2025-10-27"
    }
```

**Logique** :
- Table IFS `Range` filtrée par :
  - `Site` = site sélectionné
  - `date` BETWEEN `StartDate` AND `EndDate`

**Livrables** :
- ✅ Service Range
- ✅ API Route
- ✅ Tests

#### 3.4 Consolidation des données

**Service** : `part-label-service.ts`

**Fonction principale** :
```typescript
async function generatePartLabels(
  shopOrders: IFSShopOrder[],
  site: string
): Promise<PartLabel[]>
```

**Structure `PartLabel`** :
```typescript
interface PartLabel {
  // Shop Order
  orderNo: string
  releaseNo: string
  sequenceNo: string
  partNo: string
  startDate: string
  
  // Operation 10
  rawMaterial: string
  blockId: string
  
  // Master Part
  genericCode: string
  lengthSetup: string
  varnishCode: string
  engineeringPartRev: string
  
  // Range
  rangeId: string
  
  // Barcode
  barcode: string // Generated from genericCode + engineeringPartRev
}
```

**Livrables** :
- ✅ Service de consolidation
- ✅ Tests E2E
- ✅ Documentation

---

### Phase 4 : Génération Étiquettes & Impression ⏳ 3 semaines

**Objectif** : Générer les PDF d'étiquettes et gérer l'impression

#### 4.1 Générateur de code-barres

**Service** : `barcode-service.ts`

**Librairie** : `bwip-js` ou `jsbarcode`

**API Endpoint** :
```
POST /api/barcode/generate
  Body: { text: "GEN_CODE_001_Rev_02", format: "CODE128" }
  → Response: { 
      barcode: "data:image/png;base64,..." 
    }
```

**Livrables** :
- ✅ Service Barcode
- ✅ API Route
- ✅ Tests

#### 4.2 Génération PDF Étiquettes

**Service** : `label-pdf-service.ts`

**Librairie** : `@react-pdf/renderer` ou `pdfkit`

**Spécifications** :
- **Format** : A4 paysage (297mm x 210mm)
- **Pagination** : 1 page par couple (Raw Material / Varnish Code)
- **Tri** : Par ordre décroissant de Length Setup
- **Contenu par étiquette** :
  - Varnish Code
  - Shop Order (OrderNo + ReleaseNo + SequenceNo)
  - Raw Material
  - Index (?)
  - Generic Part No + Revision
  - Length Setup
  - Range (ex: "285 A")
  - Barcode
  - OP10 Block ID

**Template** :
```
┌─────────────────────────────────────────────────────┐
│ Varnish: VARN_A                Range: 285 A         │
│ Shop Order: 97277-1-10        Block: B25            │
│ Raw Material: OAK_RAW_001                           │
│ ───────────────────────────────────────────────     │
│ Generic: GEN_CODE_001 (Rev_02)                      │
│ Length: 2850 mm                                     │
│                                                     │
│        |||||||||||||||||||||||||||||||              │
│        GEN_CODE_001_Rev_02                          │
└─────────────────────────────────────────────────────┘
```

**API Endpoint** :
```
POST /api/labels/generate-pdf
  Body: { 
    labels: PartLabel[],
    groupBy: "rawMaterial_varnishCode" // Grouping strategy
  }
  → Response: {
      pdfUrl: "https://.../labels-12345.pdf",
      pages: 5
    }
```

**Livrables** :
- ✅ Service PDF
- ✅ Template PDF
- ✅ API Route
- ✅ Tests

#### 4.3 Impression

**Service** : `label-print-service.ts`

**Workflow** :
1. Sélection imprimante (dropdown)
2. Aperçu PDF
3. Confirmation impression
4. Envoi à l'imprimante IFS
5. Message de succès

**API Endpoint** :
```
POST /api/labels/print
  Body: {
    pdfUrl: "https://.../labels-12345.pdf",
    printer: "PRTBX101",
    site: "BDR"
  }
  → Response: {
      success: true,
      printJobId: "PRINT_12345"
    }
```

**Livrables** :
- ✅ Service Impression
- ✅ API Route
- ✅ Tests

---

### Phase 5 : Interface Utilisateur ⏳ 2 semaines

**Objectif** : Interface complète et intuitive

#### 5.1 Page principale

**Route** : `/part-printer`

**Layout** :
```
┌─────────────────────────────────────────────────────┐
│  🏷️ Part Printer - IFS Label Printer              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📊 FILTRES                                         │
│  ┌─────────────────────────────────────────────┐  │
│  │ Site: [BDR ▼]                               │  │
│  │ Production Line: [Line 1 ▼] (optional)     │  │
│  │ Start Date: [📅 13/10/2025]                 │  │
│  │ Mode: ⚪ Débit classique  ⚪ Redébit        │  │
│  │ OP10 Block ID: [EMPTY ▼]                   │  │
│  │                           [🔍 Rechercher]   │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  📋 RÉSULTATS (25 Shop Orders)                     │
│  ┌─────────────────────────────────────────────┐  │
│  │ ☑ 97277-1-10  │ PART_001  │ 2850mm │ B25  │  │
│  │ ☑ 97278-1-10  │ PART_002  │ 2700mm │ B25  │  │
│  │ ☐ 97279-1-10  │ PART_003  │ 2600mm │ B26  │  │
│  │ ...                                         │  │
│  └─────────────────────────────────────────────┘  │
│                                                     │
│  [📄 Aperçu (12 sélectionnés)]  [🖨️ Imprimer]    │
└─────────────────────────────────────────────────────┘
```

**Composants** :
- [ ] `PartPrinterPage` - Page principale
- [ ] `FilterPanel` - Panel de filtres
- [ ] `ShopOrderTable` - Table avec sélection multiple
- [ ] `LabelPreviewDialog` - Aperçu PDF
- [ ] `PrintDialog` - Dialogue impression

**Livrables** :
- ✅ 5 composants
- ✅ Storybook
- ✅ Tests E2E
- ✅ Documentation UX

#### 5.2 Feedback utilisateur

- [ ] Loading states (skeleton)
- [ ] Messages d'erreur explicites
- [ ] Confirmation d'impression
- [ ] Option "New Print"
- [ ] Toast notifications

**Livrables** :
- ✅ Composants feedback
- ✅ Tests UX

---

### Phase 6 : Tests & Validation ⏳ 1 semaine

**Objectif** : Validation complète avec données réelles

#### 6.1 Tests unitaires

- [ ] Tous les services (90% coverage)
- [ ] Tous les composants
- [ ] API Routes

#### 6.2 Tests E2E

- [ ] Filtrage débit classique
- [ ] Filtrage redébit
- [ ] Génération étiquettes
- [ ] Impression

#### 6.3 Tests utilisateurs

- [ ] Tests avec opérateurs production
- [ ] Validation workflows
- [ ] Ajustements UX

**Livrables** :
- ✅ Coverage report > 80%
- ✅ Tests E2E complets
- ✅ Feedback utilisateurs documenté

---

### Phase 7 : Déploiement & Documentation ⏳ 1 semaine

**Objectif** : Mise en production

#### 7.1 Documentation

- [ ] User Guide complet
- [ ] Guide opérateur
- [ ] Documentation API
- [ ] Guide maintenance

#### 7.2 Déploiement

- [ ] Configuration environnements (DEV, PROD)
- [ ] CI/CD pipeline
- [ ] Monitoring
- [ ] Logs

**Livrables** :
- ✅ Documentation complète
- ✅ Application en production
- ✅ Monitoring actif

---

## 📊 API Endpoints - Récapitulatif

### Sites & Production Lines

```
GET /api/sites
  Query: -
  Response: Site[]

GET /api/production-lines
  Query: { site: string }
  Response: ProductionLine[]
```

### Shop Orders

```
POST /api/shop-orders/filter
  Body: {
    site: string
    productionLine?: string
    startDate: string
    blockDate: boolean
    op10BlockId?: "EMPTY" | "NO_CONDITION"
  }
  Response: {
    shopOrders: ShopOrder[]
    count: number
  }
```

### Operations

```
GET /api/operations
  Query: {
    orderNo: string
    releaseNo: string
    sequenceNo: string
    operationNo: number
  }
  Response: Operation
```

### Master Parts

```
GET /api/master-parts/{partNo}/attributes
  Path: partNo
  Response: {
    partNo: string
    genericCode: string
    lengthSetup: string
    varnishCode: string
    engineeringPartRev: string
  }
```

### Ranges

```
GET /api/ranges
  Query: {
    site: string
    date: string
  }
  Response: Range
```

### Labels

```
POST /api/labels/generate-pdf
  Body: {
    labels: PartLabel[]
    groupBy: string
  }
  Response: {
    pdfUrl: string
    pages: number
  }

POST /api/labels/print
  Body: {
    pdfUrl: string
    printer: string
    site: string
  }
  Response: {
    success: boolean
    printJobId: string
  }
```

### Barcode

```
POST /api/barcode/generate
  Body: {
    text: string
    format: string
  }
  Response: {
    barcode: string (base64)
  }
```

---

## 📅 Planning

| Phase | Durée | Dates estimées |
|-------|-------|----------------|
| **Phase 1** - Architecture & Fondations | 2 semaines | 14/10 - 27/10 |
| **Phase 2** - Filtres & Recherche | 2 semaines | 28/10 - 10/11 |
| **Phase 3** - Extraction des Données | 2 semaines | 11/11 - 24/11 |
| **Phase 4** - Génération & Impression | 3 semaines | 25/11 - 15/12 |
| **Phase 5** - Interface Utilisateur | 2 semaines | 16/12 - 29/12 |
| **Phase 6** - Tests & Validation | 1 semaine | 30/12 - 05/01 |
| **Phase 7** - Déploiement | 1 semaine | 06/01 - 12/01 |

**Total** : ~13 semaines (~3 mois)

**Livraison estimée** : Mi-janvier 2026

---

## 🎯 Priorisation

### 🔴 Critique (P0)

- Architecture multi-outils
- Filtrage Shop Orders
- Extraction données
- Génération étiquettes de base

### 🟡 Important (P1)

- Génération PDF complète
- Impression IFS
- Interface utilisateur complète

### 🟢 Nice to have (P2)

- Historique impressions
- Export données
- Mode hors-ligne

---

## 🚀 Quick Wins

**Pour démarrer rapidement** :

1. **Réutiliser Boat Config** :
   - Services IFS (ifs-client, shop-order-service)
   - Composants UI (Button, Input, Select, DataTable)
   - API Routes structure

2. **Services IFS existants** :
   - Printer service
   - Language service
   - Print service (à adapter)

3. **Documentation** :
   - Structure déjà en place
   - Templates disponibles

---

## 📝 Notes

### Différences avec Boat Config

| Aspect | Boat Config | Part Printer |
|--------|-------------|--------------|
| **Filtrage** | Simple (3 clés) | Avancé (7+ filtres) |
| **Données** | Serial Number unique | Multiples parts |
| **Impression** | 1 document PDF | Multiples étiquettes |
| **Groupement** | - | Par Raw Material / Varnish |
| **Barcode** | - | Oui (CODE128) |

### Dépendances IFS

- ShopOrderHandling.svc (Released orders)
- OperationHandling.svc (OP10 data)
- MasterPartHandling.svc (attributes)
- RangeHandling.svc (range table)
- PrintDialog.svc (printers)

---

**Maintenu par** : Équipe Manufacturing Portal  
**Version** : 1.0  
**Dernière mise à jour** : 13 octobre 2025
