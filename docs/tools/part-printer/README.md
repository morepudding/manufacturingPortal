# 🏷️ Part Printer (Wood Part Printer)

**Version** : 0.1  
**Status** : 🚧 En développement  
**Dernière mise à jour** : 13 octobre 2025

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

### 🚧 À implémenter (Phase 1-7)

| Fonctionnalité | Description | Priorité |
|----------------|-------------|----------|
| **Filtrage Shop Orders** | Filtres avancés (Site, Line, Date, Block Date, OP10 Block ID) | 🔴 P0 |
| **Extraction données** | Raw Material, Varnish Code, Generic Code, Length, etc. | 🔴 P0 |
| **Génération code-barres** | CODE128 basé sur Generic Code + Revision | 🔴 P0 |
| **Génération PDF étiquettes** | A4 paysage, groupé par Raw Material/Varnish | 🟡 P1 |
| **Impression** | Envoi à imprimante IFS | 🟡 P1 |
| **Aperçu PDF** | Visualisation avant impression | 🟡 P1 |
| **Historique** | Historique des impressions | 🟢 P2 |

---

## 📖 Documentation

### Roadmap & Planning

- [**ROADMAP.md**](ROADMAP.md) - Plan de développement complet (7 phases, 13 semaines)

### Spécifications

- [**specifications.md**](specifications/specifications.md) - Spécification fonctionnelle complète

### API

- [**ENDPOINTS.md**](api/ENDPOINTS.md) - Documentation complète des 10 endpoints API

### Implémentation

- [**Implementation guides**](implementation/) - Guides techniques (à créer)

---

## 🔄 Workflow

### Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                    WORKFLOW PART PRINTER                         │
└─────────────────────────────────────────────────────────────────┘

1. SÉLECTION FILTRES
   ├─> Site: "BDR" (LOV IFS Contracts)
   ├─> Production Line: "Line 1" (optional)
   ├─> Start Date: "2025-10-13"
   ├─> Mode: Débit classique / Redébit
   └─> OP10 Block ID: EMPTY / No condition

2. RECHERCHE SHOP ORDERS
   └─> POST /api/part-printer/shop-orders/filter
       → Liste des Shop Orders filtrés

3. EXTRACTION DONNÉES
   Pour chaque Shop Order:
   ├─> GET /api/part-printer/operations (OP10)
   │   → Block ID + Raw Material
   ├─> GET /api/part-printer/master-parts/:partNo/attributes
   │   → Generic Code, Length Setup, Varnish Code, Eng Part Rev
   ├─> GET /api/part-printer/ranges
   │   → Range ID
   └─> POST /api/part-printer/barcode/generate
       → Code-barres

4. CONSOLIDATION
   └─> POST /api/part-printer/labels/consolidate
       → Toutes les données dans des PartLabel[]

5. GÉNÉRATION PDF
   ├─> Groupement par (Raw Material / Varnish Code)
   ├─> Tri par Length Setup décroissant
   └─> POST /api/part-printer/labels/generate-pdf
       → PDF A4 paysage multi-pages

6. IMPRESSION
   └─> POST /api/part-printer/labels/print
       ├─> Sélection imprimante
       └─> Envoi job d'impression
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

### Services Backend

```
src/tools/part-printer/services/
├── site-service.ts                     # Service Sites IFS
├── production-line-service.ts          # Service Lignes de production
├── shop-order-filter-service.ts        # Service Shop Orders avec filtres
├── operation-service.ts                # Service Operations (OP10)
├── master-part-service.ts              # Service Master Parts
├── range-service.ts                    # Service Ranges
├── part-label-service.ts               # Service consolidation labels
├── barcode-service.ts                  # Service génération code-barres
└── label-print-service.ts              # Service impression
```

### API Routes

```
src/app/api/part-printer/
├── sites/route.ts                      # GET /api/part-printer/sites
├── production-lines/route.ts           # GET /api/part-printer/production-lines
├── shop-orders/
│   └── filter/route.ts                 # POST /api/part-printer/shop-orders/filter
├── operations/route.ts                 # GET /api/part-printer/operations
├── master-parts/
│   └── [partNo]/
│       └── attributes/route.ts         # GET /api/part-printer/master-parts/:partNo/attributes
├── ranges/route.ts                     # GET /api/part-printer/ranges
├── labels/
│   ├── consolidate/route.ts            # POST /api/part-printer/labels/consolidate
│   ├── generate-pdf/route.ts           # POST /api/part-printer/labels/generate-pdf
│   └── print/route.ts                  # POST /api/part-printer/labels/print
└── barcode/
    └── generate/route.ts               # POST /api/part-printer/barcode/generate
```

**Total** : 10 endpoints API

---

## 📊 API IFS Utilisées

| Service | Endpoint | Usage |
|---------|----------|-------|
| **ContractHandling** | `/ContractHandling.svc/Contracts` | Liste des sites |
| **ProductionLineHandling** | `/ProductionLineHandling.svc/ProductionLines` | Lignes de production |
| **ShopOrderHandling** | `/ShopOrderHandling.svc/ShopOrds` | Recherche Shop Orders (Released) |
| **OperationHandling** | `/OperationHandling.svc/Operations` | Données OP10 (Block ID, Raw Material) |
| **MasterPartHandling** | `/MasterPartHandling.svc/MasterParts` | Attributs Master Part |
| **RangeHandling** | `/RangeHandling.svc/Ranges` | Table Range (Range ID) |
| **PrintDialog** | `/PrintDialog.svc/*` | Gestion impression |

Documentation API : [Voir api/ENDPOINTS.md](api/ENDPOINTS.md)

---

## 📄 Structure des données

### PartLabel (données consolidées)

```typescript
interface PartLabel {
  // Shop Order
  orderNo: string               // "97277"
  releaseNo: string             // "1"
  sequenceNo: string            // "10"
  partNo: string                // "PART_001"
  startDate: string             // ISO date
  
  // Operation 10
  rawMaterial: string           // "OAK_RAW_001"
  blockId: string               // "B25"
  
  // Master Part
  genericCode: string           // "GEN_CODE_001"
  lengthSetup: string           // "2850" (mm)
  varnishCode: string           // "VARN_A"
  engineeringPartRev: string    // "Rev_02"
  
  // Range
  rangeId: string               // "285 A"
  
  // Barcode
  barcode: string               // Base64 image
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

| Phase | Description | Durée | Dates estimées |
|-------|-------------|-------|----------------|
| **Phase 1** | Architecture & Fondations | 2 semaines | 14/10 - 27/10 |
| **Phase 2** | Filtres & Recherche | 2 semaines | 28/10 - 10/11 |
| **Phase 3** | Extraction des Données | 2 semaines | 11/11 - 24/11 |
| **Phase 4** | Génération & Impression | 3 semaines | 25/11 - 15/12 |
| **Phase 5** | Interface Utilisateur | 2 semaines | 16/12 - 29/12 |
| **Phase 6** | Tests & Validation | 1 semaine | 30/12 - 05/01 |
| **Phase 7** | Déploiement | 1 semaine | 06/01 - 12/01 |

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
IFS_CLIENT_ID=***REMOVED***
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

## 🐛 Problèmes connus

### 1. Table Range IFS

**Problème** : Service IFS pour Range à confirmer (peut être custom table)

**Solution** : À valider avec équipe IFS

### 2. Attributs Master Part

**Problème** : Noms exacts des attributs IFS à confirmer (`GENERIC CODE`, `LENGTH SETUP`, etc.)

**Solution** : Exploration IFS à faire en Phase 3

### 3. Format étiquettes

**Problème** : Template exact des étiquettes à finaliser avec utilisateurs

**Solution** : Mock-ups et validation utilisateurs en Phase 5

---

## 📝 Changelog

### v0.1 - 2025-10-13

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
