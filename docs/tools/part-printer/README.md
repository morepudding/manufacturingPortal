# 🏷️ Part Printer (Wood Part Printer)

**Version** : 0.3  
**Status** : ✅ Phase 3 EN COURS - **Extraction données IFS** 🚀  
**Dernière mise à jour** : 15 octobre 2025

> 🎉 **DISCOVERIES UPDATE** : Tous les éléments Part Printer sont disponibles dans IFS !
> 
> ✅ **RAW MATERIAL** : Trouvé via navigation `ShopOrds/MaterialArray` (OP10 Material Line)  
> ✅ **ATTRIBUTS MASTER PART** : 3 attributs validés (Generic Code, Length Setup, Varnish Code)  
> ✅ **OP10 BLOCK ID** : Service opérationnel (`OperationBlockHandling`)  
> ✅ **WORKFLOW COMPLET** : Service orchestrateur créé  
> 
> **Services créés** :
> - `orchestrator-service.ts` - Coordination complète du workflow
> - `material-line-service.ts` - Extraction Raw Material depuis MaterialArray
> - `master-part-service.ts` - Attributs Master Part (TEST 15 validé)
> - `operation-service.ts` - OP10 Block ID
> - `barcode-service.ts`, `label-pdf-service.ts`, `label-print-service.ts`
> 
> (voir [DISCOVERIES_AND_NEXT_STEPS.md](DISCOVERIES_AND_NEXT_STEPS.md))

---

## 📋 Vue d'ensemble

Le **Part Printer** (aussi appelé IFS Label Printer ou Wood Part Printer) est un outil web qui permet aux opérateurs de production Bénéteau d'imprimer des étiquettes pour les pièces en bois. Il supporte les débits classiques et les redébits avec des filtres avancés.

### Objectif

Automatiser l'impression d'étiquettes pour les pièces en bois en :
1. Filtrant les Shop Orders par Site, Ligne de production, Date, etc.
2. Extrayant les données des pièces (Raw Material, Varnish Code, etc.)
3. Générant des étiquettes A4 paysage avec code-barres
4. Imprimant par groupes (Raw Material / Varnish Code)

---

## 🎯 Fonctionnalités

### � Services implémentés

| Service | Description | Status |
|---------|-------------|--------|
| **orchestrator-service.ts** | Coordination workflow complet (filtres → étiquettes → PDF → impression) | ✅ NOUVEAU |
| **shop-order-filter-service.ts** | Filtrage Shop Orders avec critères Part Printer | ✅ Opérationnel |
| **material-line-service.ts** | Extraction Raw Material via MaterialArray navigation | ✅ NOUVEAU |
| **operation-service.ts** | Récupération OP10 Block ID | ✅ Opérationnel |
| **master-part-service.ts** | Attributs Master Part (Generic, Length, Varnish) | ✅ Opérationnel (TEST 15) |
| **barcode-service.ts** | Génération code-barres CODE128 | ✅ Opérationnel |
| **label-pdf-service.ts** | Génération PDF A4 paysage | ✅ Opérationnel |
| **label-print-service.ts** | Impression (mode dev/prod) | ✅ Opérationnel |
| **site-service.ts** | Liste des sites IFS | ✅ Opérationnel |
| **production-line-service.ts** | Liste lignes de production | ✅ Opérationnel |
| **range-service.ts** | Table Range (mock - endpoint IFS non trouvé) | ⚠️ Mock |

### �🚧 À implémenter (Phase 4-7)

| Fonctionnalité | Description | Priorité | Status |
|----------------|-------------|----------|--------|
| **Filtrage Shop Orders** | Filtres avancés (Site, Line, Date, Block Date, OP10 Block ID) | 🔴 P0 | ✅ FAIT |
| **Extraction Raw Material** | Material Lines OP10 via MaterialArray navigation | 🔴 P0 | ✅ FAIT |
| **Extraction attributs Master Part** | Generic Code, Length Setup, Varnish Code (TEST 15) | 🔴 P0 | ✅ FAIT |
| **Extraction OP10 Block ID** | Via OperationBlockHandling | 🔴 P0 | ✅ FAIT |
| **Service orchestrateur** | Workflow complet filtres → étiquettes → PDF → impression | 🔴 P0 | ✅ FAIT |
| **Génération code-barres** | CODE128 basé sur Generic Code + Revision | 🔴 P0 | ✅ FAIT |
| **Génération PDF étiquettes** | A4 paysage, groupé par Raw Material/Varnish | 🟡 P1 | ✅ FAIT (à tester E2E) |
| **Impression** | Envoi à imprimante IFS (mode dev/prod) | 🟡 P1 | ✅ FAIT (à tester E2E) |
| **Interface UI** | Filtres + Table + Preview + Print Dialog | 🟡 P1 | 📋 Phase 5 |
| **Aperçu PDF** | Visualisation avant impression | 🟡 P1 | 📋 Phase 5 |
| **Gestion Range** | Trouver endpoint IFS ou créer table custom | 🟡 P1 | ⚠️ Mock actif |
| **Historique** | Historique des impressions | 🟢 P2 | 📋 Phase 6 |

---

## 📖 Documentation

### Architecture & Services

- [**ORCHESTRATOR_SERVICE.md**](ORCHESTRATOR_SERVICE.md) - 🎯 Service orchestrateur (workflow complet)
- [**ROADMAP.md**](ROADMAP.md) - Plan de développement complet (7 phases, 13 semaines)
- [**DISCOVERIES_AND_NEXT_STEPS.md**](DISCOVERIES_AND_NEXT_STEPS.md) - Découvertes IFS & prochaines étapes

### Spécifications

- [**specifications.md**](specifications/specifications.md) - Spécification fonctionnelle complète

### API

- [**ENDPOINTS.md**](api/ENDPOINTS.md) - Documentation complète des 10 endpoints API (à mettre à jour)
- [**API IFS Documentation**](../../api/) - Documentation des services IFS utilisés

### Implémentation

- [**Implementation guides**](implementation/) - Guides techniques (à créer)

---

## 🔄 Workflow

### Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                    WORKFLOW PART PRINTER                         │
│                 (Service Orchestrateur - IMPLÉMENTÉ)             │
└─────────────────────────────────────────────────────────────────┘

1. SÉLECTION FILTRES
   ├─> Site: "FR017" (LOV IFS Contracts)
   ├─> Production Line: "MASSIF" (optional)
   ├─> Start Date: "2025-10-15"
   ├─> Mode: Débit classique / Redébit
   └─> OP10 Block ID: EMPTY / No condition

2. RECHERCHE SHOP ORDERS
   └─> filterShopOrders(filters) - shop-order-filter-service.ts
       → Liste des Shop Orders filtrés (IFS: ShopOrderHandling.svc/ShopOrds)

3. EXTRACTION DONNÉES (Pour chaque Shop Order)
   ├─> getRawMaterial() - material-line-service.ts ✅ NOUVEAU
   │   → Raw Material OP10 (IFS: ShopOrds/MaterialArray navigation)
   │   → Ex: D8588H "GENERIQUE PROFIL 2647 ALPI CHENE SABLE BROSSE"
   │
   ├─> getOperation10Data() - operation-service.ts ✅ OPÉRATIONNEL
   │   → Block ID (IFS: OperationBlockHandling.svc)
   │   → Note: peut être null (valeur valide)
   │
   ├─> getMasterPartAttributes() - master-part-service.ts ✅ TEST 15 VALIDÉ
   │   → Generic Code (ValueText)
   │   → Length Setup (ValueNo) 
   │   → Varnish Code (ValueText)
   │   → Engineering Revision (avec fallback)
   │   → (IFS: 2-step navigation PartCatalogReferenceArray → TechnicalSpecBothArray)
   │
   ├─> getRangeId() - range-service.ts ⚠️ MOCK
   │   → Range ID (endpoint IFS non trouvé - calcul local)
   │
   └─> generateBarcode() - barcode-service.ts ✅ OPÉRATIONNEL
       → Code-barres CODE128

4. CONSOLIDATION
   └─> orchestrator-service.generatePartLabels() ✅ NOUVEAU
       → Toutes les données dans PartLabel[]

5. GÉNÉRATION PDF
   ├─> Groupement par (Raw Material / Varnish Code)
   ├─> Tri par Length Setup décroissant
   └─> label-pdf-service.generateLabelsPDF() ✅ OPÉRATIONNEL
       → PDF A4 paysage multi-pages

6. IMPRESSION
   └─> label-print-service.printLabels() ✅ OPÉRATIONNEL
       ├─> Mode DEV: Téléchargement PDF
       └─> Mode PROD: Envoi à imprimante IFS

7. WORKFLOW COMPLET
   └─> orchestrator-service.executeCompleteWorkflow() ✅ NOUVEAU
       → Exécute les étapes 1-6 automatiquement
```

---

## 🏗️ Architecture Technique

### Stack

| Composant | Technologie |
|-----------|-------------|
| **Frontend** | React 19 + Next.js 15 |
| **UI Components** | shadcn/ui + Radix UI |
| **Styling** | Tailwind CSS 4 |
| **API** | Next.js API Routes |
| **IFS Integration** | OAuth2 + OData v4 |
| **Barcode** | bwip-js ou jsbarcode |
| **PDF Generation** | @react-pdf/renderer ou pdfkit |

### Services Backend (✅ Tous créés)

```
src/tools/part-printer/services/
├── orchestrator-service.ts             # ✅ NOUVEAU - Coordination workflow complet
├── shop-order-filter-service.ts        # ✅ Service Shop Orders avec filtres
├── material-line-service.ts            # ✅ NOUVEAU - Service Raw Material (MaterialArray)
├── operation-service.ts                # ✅ Service Operations (OP10 Block ID)
├── master-part-service.ts              # ✅ Service Master Parts (attributs TEST 15)
├── range-service.ts                    # ⚠️ Service Ranges (mock - endpoint IFS non trouvé)
├── barcode-service.ts                  # ✅ Service génération code-barres CODE128
├── label-pdf-service.ts                # ✅ Service génération PDF A4 paysage
├── label-print-service.ts              # ✅ Service impression (mode dev/prod)
├── site-service.ts                     # ✅ Service Sites IFS
└── production-line-service.ts          # ✅ Service Lignes de production
```

### API Routes (📋 À créer en Phase 5)

```
src/app/api/part-printer/
├── sites/route.ts                      # GET /api/part-printer/sites
├── production-lines/route.ts           # GET /api/part-printer/production-lines
├── shop-orders/
│   └── filter/route.ts                 # POST /api/part-printer/shop-orders/filter
├── workflow/
│   └── complete/route.ts               # POST /api/part-printer/workflow/complete (NEW)
└── labels/
    ├── generate/route.ts               # POST /api/part-printer/labels/generate (NEW)
    └── print/route.ts                  # POST /api/part-printer/labels/print
```

**Note** : Les routes API seront créées en Phase 5 pour exposer les services au frontend.

---

## 📊 API IFS Utilisées & Validées

| Service | Endpoint | Usage | Status |
|---------|----------|-------|--------|
| **ContractHandling** | `/ContractHandling.svc/Contracts` | Liste des sites | ✅ Validé |
| **ProductionLineHandling** | `/ProductionLineHandling.svc/ProductionLines` | Lignes de production | ✅ Validé |
| **ShopOrderHandling** | `/ShopOrderHandling.svc/ShopOrds` | Recherche Shop Orders (Released) | ✅ Validé |
| **MaterialArray Navigation** | `/ShopOrds(...)/MaterialArray` | 🎉 Raw Material OP10 | ✅ **NOUVEAU** |
| **OperationBlockHandling** | `/OperationBlockHandling.svc/Reference_ShopOrderOperation` | OP10 Block ID | ✅ Validé |
| **PartCatalogReferenceArray** | `/PartHandling.svc/PartCatalogSet(...)/PartCatalogReferenceArray` | TechnicalSpecNo | ✅ TEST 15 |
| **TechnicalSpecBothArray** | `/.../TechnicalSpecBothArray` | Attributs Master Part | ✅ TEST 15 |
| **PrintDialog** | `/PrintDialog.svc/*` | Gestion impression | ✅ Shared |
| **RangeHandling** | `/RangeHandling.svc/Ranges` | Table Range | ⚠️ 404 (mock) |
| **EngineeringPartRevision** | `/EngineeringPartRevisionHandling.svc/...` | Révision Engineering Part | ⚠️ 404 (fallback) |

**Documentation API complète** : [Voir api/](../../api/)

**Découvertes majeures** :
- ✅ **MaterialArray** : Navigation OData depuis ShopOrds (pas d'endpoint séparé)
- ✅ **TechnicalSpecBothArray** : Requiert navigation 2-step via PartCatalogReferenceArray
- ⚠️ **RangeHandling** : Endpoint IFS non trouvé → Mock temporaire basé sur date
- ⚠️ **EngineeringPartRevision** : 404 → Fallback "N/A"

---

## 📄 Structure des données

### PartLabel (données consolidées)

```typescript
interface PartLabel {
  // Shop Order
  orderNo: string               // "454853"
  releaseNo: string             // "*"
  sequenceNo: string            // "*"
  partNo: string                // "1000014690G136"
  partDescription: string       // "PART DESCRIPTION"
  startDate: string             // ISO date
  contract: string              // "FR017"
  productionLine: string | null // "MASSIF" ou null
  
  // Raw Material (OP10 Material Line) ✅ NOUVEAU
  rawMaterial: string           // "D8588H" (depuis MaterialArray)
  rawMaterialDescription: string // "GENERIQUE PROFIL 2647..."
  
  // Operation 10
  blockId: string | null        // "B25" ou null (valeur valide)
  
  // Master Part Attributes (TEST 15) ✅ VALIDÉ
  genericCode: string           // "1000014690" (ValueText)
  lengthSetup: string           // "1904" mm (ValueNo)
  varnishCode: string           // "RCTV1210" (ValueText)
  engineeringPartRev: string    // "Rev_02" ou "N/A" (fallback)
  
  // Range ⚠️ MOCK
  rangeId: string               // "288 A" (calculé localement)
  
  // Barcode ✅ VALIDÉ
  barcode: string               // "1000014690_Rev_02"
  barcodeDataUrl: string        // Base64 image CODE128
}
```

### Filtres Shop Order

```typescript
interface ShopOrderFilters {
  site: string                  // Required: "BDR", "PRTBX", etc.
  productionLine?: string       // Optional: "L1", "L2", etc.
  startDate: string             // Required: ISO date
  blockDate: boolean            // true = débit, false = redébit
  op10BlockId?: "EMPTY" | "NO_CONDITION"
}
```

**Business Rules** :

| Mode | Block Date | OP10 Block ID | Start Date Filter |
|------|------------|---------------|-------------------|
| **Débit classique** | `true` | `EMPTY` (strictement vide) | `= startDate` |
| **Redébit** | `false` | `NO_CONDITION` | `<= today` |

---

## 🎨 Interface Utilisateur

### Page principale : `/part-printer`

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

### Composants UI

```
src/app/(tools)/part-printer/components/
├── FilterPanel.tsx              # Panel de filtrage
├── ShopOrderTable.tsx           # Table avec sélection multiple
├── LabelPreviewDialog.tsx       # Aperçu PDF
└── PrintDialog.tsx              # Dialogue impression
```

---

## 🧪 Tests

### Cas de test

| Site | Start Date | Mode | OP10 Block ID | Shop Orders attendus |
|------|------------|------|---------------|----------------------|
| BDR | 2025-10-13 | Débit classique | EMPTY | 10+ |
| BDR | 2025-10-13 | Redébit | NO_CONDITION | 5+ |
| PRTBX | 2025-10-14 | Débit classique | EMPTY | 8+ |

### Environnements

- **DEV (AST)** : https://beneteau-group-ast.ifs.cloud
- **PROD** : TBD

---

## 📅 Planning

| Phase | Description | Durée | Dates estimées | Status |
|-------|-------------|-------|----------------|--------|
| **Phase 1** | Architecture & Fondations | 2 semaines | 14/10 - 27/10 | ✅ 100% |
| **Phase 2** | Filtres & Recherche | 2 semaines | 28/10 - 10/11 | 📋 Planifié |
| **Phase 3** | Extraction des Données | 2 semaines | 11/11 - 24/11 | 📋 Planifié |
| **Phase 4** | Génération & Impression | 3 semaines | 25/11 - 15/12 | 📋 Planifié |
| **Phase 5** | Interface Utilisateur | 2 semaines | 16/12 - 29/12 | 📋 Planifié |
| **Phase 6** | Tests & Validation | 1 semaine | 30/12 - 05/01 | 📋 Planifié |
| **Phase 7** | Déploiement | 1 semaine | 06/01 - 12/01 | 📋 Planifié |

**Total** : ~13 semaines (~3 mois)

**Livraison estimée** : Mi-janvier 2026

Voir [ROADMAP.md](ROADMAP.md) pour le détail complet.

---

## 🚀 Installation & Déploiement

### Prérequis

- Node.js 18+
- pnpm 8+
- Accès IFS Cloud (AST ou PROD)
- Azure AD App Registration

### Configuration

```bash
# .env.local (hérite de la config partagée)
IFS_BASE_URL=https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1
IFS_CLIENT_ID=AIS_IFS_MA_AST
IFS_CLIENT_SECRET=***
IFS_TOKEN_URL=https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token

AZURE_AD_CLIENT_ID=***
AZURE_AD_CLIENT_SECRET=***
AZURE_AD_TENANT_ID=***

# Spécifique Part Printer (si nécessaire)
PART_PRINTER_LABEL_TEMPLATE=default
```

### Démarrage

```bash
# Installation (si première fois)
pnpm install

# Développement
pnpm run dev

# Accéder à l'outil
http://localhost:3000/part-printer
```

---

## � Problèmes connus & Solutions

### 1. ✅ Raw Material - MaterialArray Navigation

**✅ RÉSOLU** : Les Material Lines sont dans une **navigation OData** depuis `ShopOrds`, pas dans un endpoint séparé.

**Solution validée** :
```typescript
// Navigation correcte
GET /ShopOrderHandling.svc/ShopOrds(OrderNo='454853',ReleaseNo='*',SequenceNo='*')/MaterialArray

// Filtrer OP10 côté code (le $filter n'est pas supporté)
const op10Materials = response.value.filter(mat => mat.OperationNo === 10)
const rawMaterial = op10Materials[0] // Premier matériau OP10
```

**Documentation** : `/docs/api/shop-order-materials/README.md`  
**Implémentation** : `material-line-service.ts`  
**Status** : ✅ Opérationnel

---

### 2. ✅ Performance queries TechnicalSpecBothArray

**Problème** : Parts avec Technical Class `AN29-13-00` ont 50+ attributs techniques.  
Sans filtrage, les requêtes `TechnicalSpecBothArray` **timeout** (>20 secondes).

**✅ SOLUTION VALIDÉE (TEST 15)** : Utiliser `$filter` pour chaque attribut :
```typescript
// Pattern requis pour éviter les timeouts
TechnicalSpecBothArray?$filter=Attribute eq 'GENERIC CODE'
TechnicalSpecBothArray?$filter=Attribute eq 'LENGTH SETUP'
TechnicalSpecBothArray?$filter=Attribute eq 'VARNISH CODE'
```

**Navigation 2-step** :
1. Récupérer `TechnicalSpecNo` depuis `PartCatalogReferenceArray`
2. Utiliser chemin complet avec clés composites

**Status** : ✅ Résolu - Pattern validé avec part 1000014690G136

---

### 3. ✅ OP10 Block ID peut être null

**Découverte** : Le champ `OperationBlockId` peut être **null** (valeur valide et fréquente pour OP10).

**Solution** : Type `blockId: string | null` dans les interfaces, gestion des cas null dans le PDF.

**Status** : ✅ Résolu - Géré dans operation-service.ts

---

### 4. ⚠️ Table Range IFS non trouvée

**Problème** : Service IFS `RangeHandling.svc` retourne 404 (endpoint n'existe pas).

**Hypothèses** :
1. Table custom Bénéteau (pas dans IFS standard)
2. Stockée dans base de données locale SQL Server

**Solution temporaire** : Mock basé sur la date (calcul du quantième)
```typescript
function calculateMockRangeId(dateString: string): string {
  const dayOfYear = ... // Calcul du quantième
  return `${dayOfYear} A` // Format: "288 A"
}
```

**Action requise** : Vérifier avec équipe IFS ou créer table custom  
**Status** : ⚠️ Mock actif - À résoudre

---

### 5. ⚠️ Engineering Part Revision non trouvée

**Problème** : Endpoint `EngineeringPartRevisionHandling.svc` retourne 404.

**Solution** : Fallback "N/A" dans master-part-service.ts
```typescript
try {
  const revision = await getEngineeringPartRevision(partNo)
} catch {
  engineeringPartRev = 'N/A' // Fallback
}
```

**Action requise** : Trouver endpoint correct ou accepter fallback  
**Status** : ⚠️ Fallback actif

---

### 6. ✅ Filtrage OData hybride requis

**Problème** : Certains champs Shop Order ne supportent pas le `$filter` OData.

**Solution** : Filtrage hybride (OData + local)
- OData : `Contract`, `ProductionLine`
- Local : `CBlockDates`, `Objstate`, `RevisedStartDate`

**Status** : ✅ Implémenté dans shop-order-filter-service.ts

---

## 📝 Changelog

### v0.3 - 2025-10-15 🚀 SERVICE ORCHESTRATEUR

- ✅ **SERVICE ORCHESTRATEUR CRÉÉ** : `orchestrator-service.ts`
  - `generatePartLabels()` : Workflow complet filtres → étiquettes
  - `executeCompleteWorkflow()` : Workflow complet + PDF + impression
  - Coordination de tous les services existants
- ✅ **MATERIAL LINES TROUVÉES** : Navigation `ShopOrds/MaterialArray`
  - Service `material-line-service.ts` créé
  - Fonction `getRawMaterial()` opérationnelle
  - Test validé avec Shop Order 454853 (4 matériaux trouvés)
  - Documentation complète : `/docs/api/shop-order-materials/README.md`
- ✅ **TOUS LES SERVICES BACKEND CRÉÉS** :
  - shop-order-filter, material-line, operation, master-part
  - barcode, label-pdf, label-print, site, production-line
  - range (mock temporaire)
- 📋 **PROCHAINE ÉTAPE** : Phase 4 - Tests E2E + Phase 5 - Interface UI

### v0.2 - 2025-10-14 🎉 ATTRIBUTS VALIDÉS

- ✅ **TEST 14 BREAKTHROUGH** - LES 3 ATTRIBUTS EXISTENT À 100% !
  - **GENERIC CODE** = "1000014690" (IFS ValueText)
  - **LENGTH SETUP** = 1.904 (IFS ValueNo) 
  - **VARNISH CODE** = "RCTV1210" (IFS ValueText)
- ✅ Part complète validée : `1000014690G136` (Technical Class AN29-13-00)
- ✅ Solution performance : Pattern `$filter` requis pour AN29-13-00 (50+ attributs)
- ✅ **Phase 1 : 100% COMPLÈTE**

### v0.1 - 2025-10-13 📄 DOCUMENTATION INITIALE

- 🚧 Documentation initiale
- 🚧 Roadmap créée
- 🚧 Spécifications API documentées

---

## 🤝 Contribution

### Convention de code

- TypeScript strict mode
- ESLint + Prettier
- Tests unitaires obligatoires
- Documentation JSDoc
- Suivre l'architecture multi-outils (voir `/docs/architecture/`)

### Pull Request

1. Créer une branche feature
2. Implémenter + Tests
3. Update documentation
4. Submit PR avec description

---

## 🔗 Liens utiles

- [Boat Configuration Editor](../boat-configuration/) - Outil similaire (référence)
- [Multi-Tool Architecture](../../architecture/MULTI_TOOL_ARCHITECTURE.md) - Architecture commune
- [API Documentation](../../api/) - Documentation APIs IFS

---

**Maintenu par** : Équipe Manufacturing Portal  
**Contact** : [À définir]
