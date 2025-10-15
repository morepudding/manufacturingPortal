# 🤖 Copilot Instructions - Manufacturing Portal

## 📋 Vue d'ensemble du projet

Le **Manufacturing Portal** est une plateforme Next.js hébergeant **plusieurs outils de production** pour Bénéteau. Architecture modulaire conçue pour supporter **7+ outils** avec des composants et services partagés.

### Outils disponibles

| Outil | Status | Description |
|-------|--------|-------------|
| **Boat Configuration Editor** | ✅ Production | Gestion des ordres de fabrication et impression des documents de configuration |
| **Part Printer** | ✅ Phase 1 Complète (100%) | Impression des étiquettes pour les pièces en bois |
| **Outil 3+** | 📋 Planifié | 5+ outils supplémentaires prévus |

### Objectifs principaux

1. **Centraliser** tous les outils de production dans une seule plateforme
2. **Standardiser** l'expérience utilisateur avec des composants communs
3. **Optimiser** le développement avec une architecture partagée
4. **Simplifier** la maintenance avec une structure modulaire

---

## 🏗️ Architecture technique

### Stack technologique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| **Framework** | Next.js | 15.2.1 |
| **Runtime** | React | 19.0.0 |
| **Language** | TypeScript | 5.8.2 |
| **UI Components** | shadcn/ui + Radix UI | Latest |
| **Styling** | Tailwind CSS | 4.1.7 |
| **API Backend** | Next.js API Routes | 15.2.1 |
| **Authentication** | NextAuth.js | 4.24.11 |
| **Database** | MS SQL Server | 11.0.1 |
| **IFS Integration** | Custom OAuth2 Client | - |
| **Package Manager** | pnpm | - |
| **Testing** | Vitest | Latest |

### Architecture en couches

```
┌─────────────────────────────────────────────────────────┐
│  UI Layer - React Components                           │
│  (shadcn/ui, Radix UI, Tailwind)                      │
│  📍 Localisation: src/app/(tools)/[tool]/components   │
│                   src/shared/components                │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│  API Layer - Next.js API Routes                        │
│  (TypeScript, Server Components)                       │
│  📍 Localisation: src/app/api/[tool]/                 │
│                   src/app/api/shared/                  │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│  Business Logic Layer - Services                       │
│  (Tool-specific services)                              │
│  📍 Localisation: src/tools/[tool]/services/          │
│                   src/shared/services/                 │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────┐
│  Data Layer - IFS Cloud OData API                      │
│  (OAuth2, ShopOrderHandling.svc, etc)                  │
│  📍 Client: src/shared/services/ifs-client.ts         │
└─────────────────────────────────────────────────────────┘
```

### Principes architecturaux

1. **Séparation des préoccupations**
   - `shared/` : Code partagé entre tous les outils
   - `tools/` : Code spécifique à chaque outil (isolé)
   - `core/` : Infrastructure commune (auth, config, logger)

2. **Modularité**
   - Chaque outil est autonome
   - Les dépendances communes sont centralisées dans `/shared`
   - Les outils ne se connaissent pas entre eux

3. **Scalabilité**
   - Architecture prête pour 10+ outils
   - Ajout d'un nouvel outil = copier un template + implémenter la logique métier
   - Pas de régression sur les outils existants

---

## 📁 Structure du projet

### Architecture v2 (Actuelle - Modulaire)

```
ManufacturingPortal/
├── src/
│   ├── app/
│   │   ├── (home)/                      # Home page et layout principal
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── (tools)/                     # 🔧 Routes des outils (isolées)
│   │   │   ├── boat-configuration/      # Outil 1
│   │   │   │   ├── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   └── components/          # Composants spécifiques
│   │   │   │       ├── ShopOrderSearch.tsx
│   │   │   │       ├── SerialNumberDisplay.tsx
│   │   │   │       └── PrintDialog.tsx
│   │   │   │
│   │   │   └── part-printer/            # Outil 2
│   │   │       ├── page.tsx
│   │   │       ├── layout.tsx
│   │   │       └── components/
│   │   │           ├── FilterPanel.tsx
│   │   │           ├── ShopOrderTable.tsx
│   │   │           └── LabelPreview.tsx
│   │   │
│   │   └── api/                         # API Routes organisées par domaine
│   │       ├── shared/                  # APIs partagées (auth, health, etc.)
│   │       │   ├── health/
│   │       │   ├── printers/
│   │       │   └── languages/
│   │       │
│   │       ├── boat-configuration/      # APIs spécifiques Boat Config
│   │       │   ├── shop-orders/
│   │       │   ├── serial-numbers/
│   │       │   ├── customer-orders/
│   │       │   └── print/
│   │       │
│   │       └── part-printer/            # APIs spécifiques Part Printer
│   │           ├── sites/
│   │           ├── production-lines/
│   │           ├── operations/
│   │           ├── master-parts/
│   │           └── labels/
│   │
│   ├── shared/                          # ✅ Code partagé entre tous les outils
│   │   ├── components/                  # Composants UI réutilisables
│   │   │   ├── atoms/                  # Button, Input, Select, etc.
│   │   │   ├── molecules/              # InputWithLabel, SearchBar, etc.
│   │   │   └── organisms/              # DataTable, Header, etc.
│   │   │
│   │   ├── services/                    # Services IFS partagés
│   │   │   ├── ifs-client.ts           # Client OAuth2 IFS (⭐ central)
│   │   │   ├── printer-service.ts      # Service imprimantes (partagé)
│   │   │   ├── language-service.ts     # Service langues (partagé)
│   │   │   └── base-service.ts         # Service de base abstrait
│   │   │
│   │   ├── hooks/                       # Custom hooks partagés
│   │   │   ├── useIFSData.ts
│   │   │   ├── usePagination.ts
│   │   │   └── useDebounce.ts
│   │   │
│   │   ├── types/                       # Types TypeScript partagés
│   │   │   ├── ifs/
│   │   │   │   ├── common.ts           # Types IFS communs
│   │   │   │   ├── printer.ts
│   │   │   │   └── language.ts
│   │   │   └── api.ts                  # Types API responses
│   │   │
│   │   └── utils/                       # Utilitaires partagés
│   │       ├── date.ts
│   │       ├── string.ts
│   │       └── validation.ts
│   │
│   ├── tools/                           # ✅ Services spécifiques par outil
│   │   ├── boat-configuration/
│   │   │   ├── services/
│   │   │   │   ├── shop-order-service.ts
│   │   │   │   ├── serial-number-service.ts
│   │   │   │   ├── dop-service.ts
│   │   │   │   ├── customer-order-service.ts
│   │   │   │   └── print-service.ts
│   │   │   │
│   │   │   └── types/
│   │   │       ├── shop-order.ts
│   │   │       ├── serial-number.ts
│   │   │       └── customer-order.ts
│   │   │
│   │   └── part-printer/
│   │       ├── services/
│   │       │   ├── site-service.ts
│   │       │   ├── production-line-service.ts
│   │       │   ├── shop-order-filter-service.ts
│   │       │   ├── operation-service.ts
│   │       │   ├── master-part-service.ts
│   │       │   ├── range-service.ts
│   │       │   ├── part-label-service.ts
│   │       │   ├── barcode-service.ts
│   │       │   └── label-print-service.ts
│   │       │
│   │       └── types/
│   │           ├── site.ts
│   │           ├── production-line.ts
│   │           ├── operation.ts
│   │           └── part-label.ts
│   │
│   ├── core/                            # Infrastructure commune
│   │   ├── config/
│   │   │   ├── ifs.ts                  # Configuration IFS
│   │   │   └── azure-ad.ts             # Configuration Azure AD
│   │   │
│   │   └── lib/
│   │       └── logger.ts               # Logger centralisé
│   │
│   └── contexts/                        # React contexts
│       └── auth.tsx                     # Contexte authentification
│
├── docs/                                # 📚 Documentation complète
│   ├── EXECUTIVE_SUMMARY.md            # Résumé exécutif global
│   ├── README.md                       # Index documentation
│   │
│   ├── architecture/                   # Documentation architecture
│   │   ├── MULTI_TOOL_ARCHITECTURE.md # Architecture multi-outils (⭐)
│   │   ├── MIGRATION_PLAN.md          # Plan de migration v2
│   │   ├── MIGRATION_SUMMARY.md       # Résumé migration
│   │   └── MIGRATION_TRACKING.md      # Suivi migration
│   │
│   ├── tools/                          # Documentation par outil
│   │   ├── boat-configuration-editor/
│   │   │   ├── README.md              # Vue d'ensemble
│   │   │   ├── specifications/        # Specs fonctionnelles
│   │   │   ├── implementation/        # Guides techniques
│   │   │   └── user-guide/            # Guide utilisateur
│   │   │
│   │   └── part-printer/
│   │       ├── README.md              # Vue d'ensemble
│   │       ├── ROADMAP.md             # Plan 7 phases (13 semaines)
│   │       ├── api/                   # Documentation API
│   │       ├── specifications/        # Specs fonctionnelles
│   │       └── implementation/        # Guides techniques
│   │
│   ├── api/                            # Documentation APIs IFS
│   │   ├── shop-order/
│   │   ├── dop-header/
│   │   ├── serial-number/
│   │   ├── customer-order/
│   │   └── print-dialog/
│   │
│   └── archive/                        # Anciennes docs (v1)
│
├── scripts/                            # Utilitaires & tests
│   └── testConnection.ts              # Test connexion DB
│
├── public/                             # Assets statiques
├── .storybook/                         # Configuration Storybook
└── package.json                        # Dependencies & scripts
```

---

## 🔐 Configuration & Environnement

### Variables d'environnement (.env.local)

```bash
# Configuration IFS Cloud (OAuth2)
IFS_BASE_URL=https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1
IFS_CLIENT_ID=***REMOVED***
IFS_CLIENT_SECRET=***REMOVED***
IFS_TOKEN_URL=https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token
IFS_SCOPE=openid microprofile-jwt

# Configuration Azure AD (NextAuth)
AZURE_AD_CLIENT_ID=your_client_id
AZURE_AD_CLIENT_SECRET=your_client_secret
AZURE_AD_TENANT_ID=your_tenant_id

# Configuration Database (SQL Server local)
DATABASE_USER=sa
DATABASE_PASSWORD=M5-sq1_s8v
DATABASE_HOST=localhost
DATABASE_PORT=1433
DATABASE_NAME=testApp
AZURE_SQL_AUTHENTICATIONTYPE=default
```

### Services IFS Cloud utilisés

| Service | Endpoint | Usage |
|---------|----------|-------|
| **ShopOrderHandling** | `/ShopOrderHandling.svc/ShopOrds` | Recherche des Shop Orders |
| **DopHeaderHandling** | `/DopHeaderHandling.svc/Reference_DopHeadSerialReserv` | Récupération des Serial Numbers |
| **PrintDialog** | `/PrintDialog.svc/*` | Gestion imprimantes et langues |
| **OAuth2 Token** | `/auth/realms/beneast1/protocol/openid-connect/token` | Authentification |

---

## 🎯 Workflow Boat Configuration Editor (4 étapes)

### Phase 1 : Shop Order → Serial Number ✅ COMPLÈTE

```
1. 📝 Saisie des clés Shop Order
   ├─> Order No (ex: "563", "97277")
   ├─> Release No (ex: "*" pour tous)
   └─> Sequence No (ex: "*" pour tous)

2. 🔍 Recherche via API IFS
   └─> POST /api/boat-configuration/shop-orders/search

3. 🔄 Traitement backend
   ├─> Recherche Shop Order (OData contains filter)
   ├─> Extraction DOP ID ("54 - 1035" → "54")
   └─> Récupération Serial Number via DOP

4. ✅ Affichage & Confirmation
   ├─> Serial Number trouvé
   ├─> DOP Header ID
   └─> Confirmation utilisateur (Yes/No)
```

### Phase 2 : Sélection Imprimante & Langue ✅ COMPLÈTE

```
1. 📋 Récupération listes
   ├─> GET /api/shared/printers
   └─> GET /api/shared/languages

2. 👤 Sélection utilisateur
   ├─> Dropdown imprimantes
   └─> Dropdown langues

3. ✅ Validation choix
```

### Phase 3 : Impression ✅ COMPLÈTE

```
1. 🖨️ Envoi job d'impression
   └─> POST /api/boat-configuration/print
       ├─> serialNumber
       ├─> dopHeaderId
       ├─> printer
       └─> language

2. ✅ Confirmation impression
   └─> Option "New Print"
```

---

## 🏷️ Workflow Part Printer (Phase 1 COMPLÈTE ✅)

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

3. EXTRACTION DONNÉES (Pour chaque Shop Order)
   ├─> GET /api/part-printer/operations (OP10)
   │   → Block ID + Raw Material
   ├─> GET /api/part-printer/master-parts/:partNo/attributes ✅ 100% VALIDÉ
   │   → Generic Code (ValueText), Length Setup (ValueNo), Varnish Code (ValueText)
   │   → ⚠️ CRITIQUE: Utiliser $filter pour chaque attribut (AN29-13-00 = 50+ attrs)
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

### Roadmap Part Printer (7 phases - 13 semaines)

| Phase | Description | Durée | Status |
|-------|-------------|-------|--------|
| **Phase 1** | Architecture & Fondations | 2 semaines | ✅ 100% (3/3 attributs) |
| **Phase 2** | Filtres & Recherche | 2 semaines | 📋 Planifié |
| **Phase 3** | Extraction des Données | 2 semaines | 📋 Planifié |
| **Phase 4** | Génération & Impression | 3 semaines | 📋 Planifié |
| **Phase 5** | Interface Utilisateur | 2 semaines | 📋 Planifié |
| **Phase 6** | Tests & Validation | 1 semaine | 📋 Planifié |
| **Phase 7** | Déploiement | 1 semaine | 📋 Planifié |

**Documentation complète** : [Part Printer Roadmap](../docs/tools/part-printer/ROADMAP.md)

---

## 💻 Conventions de code

### TypeScript

- ✅ **Toujours typer** les paramètres et retours de fonction
- ✅ Utiliser des **interfaces** pour les types IFS (dans `src/core/types/`)
- ✅ Préférer `async/await` à `.then()`
- ✅ Gérer les erreurs avec `try/catch`

### Composants React

- ✅ Préférer les **Server Components** par défaut
- ✅ Ajouter `'use client'` uniquement si nécessaire (hooks, events)
- ✅ Utiliser **shadcn/ui** pour les composants UI
- ✅ Structure Atomic Design (atoms → molecules → organisms)

### API Routes

- ✅ Validation des paramètres **obligatoire**
- ✅ Retours JSON standardisés : `{ success, data, error }`
- ✅ Codes HTTP appropriés (200, 400, 404, 500)
- ✅ Logs clairs avec emojis : `🔍`, `✅`, `❌`, `📊`

### Naming

```typescript
// ✅ Bon
async function searchShopOrder(params: ShopOrderSearchParams)
const serialNumberService = new SerialNumberService()
interface IFSShopOrder { OrderNo: string; ... }

// ❌ Mauvais
async function search(p: any)
const service = new Service()
interface ShopOrder { order_no: string; ... }
```

---

## 🔧 Services IFS - Patterns

### 1. Client OAuth2 (ifs-client.ts)

```typescript
import { getIFSClient } from '@/shared/services/ifs-client'

// Le client gère automatiquement :
// - Récupération du token OAuth2
// - Cache du token avec expiration
// - Renouvellement automatique
const client = getIFSClient()

// Utilisation
const response = await client.get<IFSODataResponse<T>>(
  'ServiceName.svc/EntitySet',
  {
    $filter: "contains(Field,'value')",
    $select: 'Field1,Field2',
    $top: '10'
  }
)
```

### 2. Services spécifiques par outil

```typescript
// ❌ Mauvais - Importer entre outils
import { shopOrderService } from '@/tools/boat-configuration/services/shop-order-service'
// depuis part-printer

// ✅ Bon - Importer son propre code
import { shopOrderService } from './services/shop-order-service'
// depuis boat-configuration

// ✅ Bon - Utiliser les services partagés
import { getIFSClient } from '@/shared/services/ifs-client'
import { printerService } from '@/shared/services/printer-service'
```

### 3. Filtres OData

```typescript
// ✅ Utiliser contains() pour éviter les erreurs de type
$filter: "contains(OrderNo,'97277')"

// ❌ Éviter eq avec les strings (problèmes de compatibilité)
$filter: "OrderNo eq '97277'"  // ⚠️ Peut échouer

// ✅ Filtrage exact côté code après récupération
const exactMatch = response.value.find(item => 
  item.OrderNo === searchValue.trim()
)
```

### 4. Parsing DOP ID composite

```typescript
// IFS retourne souvent des DOP IDs composés
// Exemple: "54 - 1035" → On veut "54"

import { extractMainDopId } from '@/tools/boat-configuration/services/dop-service'

const mainDopId = extractMainDopId("54 - 1035")  // → "54"
```

---

## 🧪 Tests & Validation

### Scripts disponibles

```bash
# Développement
pnpm run dev              # Démarrer le serveur (localhost:3000)
pnpm run build            # Build production
pnpm run start            # Démarrer en mode production

# Tests
pnpm run test             # Lancer les tests unitaires
pnpm run coverage         # Coverage report

# Database
pnpm run db:connect       # Tester la connexion DB

# Storybook
pnpm run storybook        # UI components showcase
pnpm run build-storybook  # Build Storybook

# Linting
pnpm run lint             # ESLint + TypeScript check
pnpm run lint:fix         # Fix automatique
```

### Cas de test validés (Phase 1)

| Order No | Serial Number | DOP Header ID | Status |
|----------|---------------|---------------|--------|
| 563 | JY6MB0019 | 34 - 1014 | ✅ |
| 949 | LX6MA0116 | 48 - 10102 | ✅ |
| 97277 | LG5MA0114 | 95 - 10088 | ✅ |
| 1043 | LX6MA0115 | 54 - 1035 | ✅ |

---

## 🚨 Problèmes connus & Solutions

### 1. Filtre OData `eq` vs `contains`

❌ **Problème** : `OrderNo eq '1043'` retourne erreur "types not compatible"

✅ **Solution** : Utiliser `contains(OrderNo,'1043')` + filtrage exact côté code

### 2. DOP ID composite non géré

❌ **Problème** : Shop Order retourne `"54 - 1035"`, Serial Number service cherche avec ID complet

✅ **Solution** : Parser avec `extractMainDopId()` → `"54"`

### 3. Base URL avec service en double

❌ **Problème** : URL devient `.../ShopOrderHandling.svc/ShopOrderHandling.svc/ShopOrds`

✅ **Solution** : Base URL sans `.svc` : `https://.../projection/v1`

### 4. Champs OData incompatibles

❌ **Problème** : Certains champs causent des erreurs OData

✅ **Solution** : Limiter `$select` aux champs validés uniquement

---

## 📚 Documentation de référence

### Documents principaux

| Document | Chemin | Description |
|----------|--------|-------------|
| **Executive Summary** | `docs/EXECUTIVE_SUMMARY.md` | Résumé exécutif global (Part Printer + Architecture v2) |
| **Architecture Multi-Outils** | `docs/architecture/MULTI_TOOL_ARCHITECTURE.md` | Architecture complète du portal (⭐) |
| **Migration Plan** | `docs/architecture/MIGRATION_PLAN.md` | Plan de migration vers v2 (4 semaines) |

### Documentation par outil

#### Boat Configuration Editor

| Document | Chemin | Description |
|----------|--------|-------------|
| **README** | `docs/tools/boat-configuration-editor/README.md` | Vue d'ensemble de l'outil |
| **Specifications** | `docs/tools/boat-configuration-editor/specifications/` | Spécifications fonctionnelles |
| **Implementation** | `docs/tools/boat-configuration-editor/implementation/` | Guides techniques |

#### Part Printer

| Document | Chemin | Description |
|----------|--------|-------------|
| **README** | `docs/tools/part-printer/README.md` | Vue d'ensemble de l'outil |
| **Roadmap** | `docs/tools/part-printer/ROADMAP.md` | Plan de développement (7 phases, 13 semaines) |
| **API Endpoints** | `docs/tools/part-printer/api/ENDPOINTS.md` | Documentation complète des 10 endpoints |
| **Specifications** | `docs/tools/part-printer/specifications/` | Spécifications fonctionnelles |

### APIs IFS documentées

| API | Chemin | Description |
|-----|--------|-------------|
| **Shop Orders** | `docs/api/shop-order/` | ShopOrderHandling.svc |
| **DOP Headers** | `docs/api/dop-header/` | DopHeaderHandling.svc |
| **Serial Numbers** | `docs/api/serial-number/` | Récupération Serial Numbers |
| **Customer Orders** | `docs/api/customer-order/` | CustomerOrderHandling.svc |
| **Print Dialog** | `docs/api/print-dialog/` | PrintDialog.svc |

---

## 🎨 UI Components (shadcn/ui)

### Composants disponibles

```typescript
// Atoms
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Label } from '@/components/atoms/Label'
import { Select } from '@/components/atoms/Select'
import { Table } from '@/components/atoms/Table'

// Molecules
import { InputWithLabel } from '@/components/molecules/InputWithLabel'
import { ButtonWithIcon } from '@/components/molecules/ButtonWithIcon'
import { Dialog } from '@/components/molecules/Dialog'

// Organisms
import { DataTable } from '@/components/organisms/DataTable'
import { Header } from '@/components/organisms/Header'
```

### Thème et styles

- ✅ Tailwind CSS 4.1.7 avec configuration personnalisée
- ✅ Dark mode supporté via `next-themes`
- ✅ Variables CSS dans `globals.css`
- ✅ Components Radix UI pour l'accessibilité

---

## 🔄 Workflow de développement

### Pour ajouter une nouvelle fonctionnalité

1. **Créer le service** (`src/lib/`)
   - Logique métier
   - Typage TypeScript
   - Gestion d'erreurs

2. **Créer l'API Route** (`src/app/api/`)
   - Validation des entrées
   - Appel au service
   - Formatage de la réponse

3. **Créer/Modifier le composant UI** (`src/components/`)
   - Interface utilisateur
   - Gestion d'état (useState, SWR)
   - Appel API

4. **Tester**
   - Tests unitaires (`vitest`)
   - Tests manuels
   - Validation avec données réelles IFS

5. **Documenter**
   - JSDoc dans le code
   - Mise à jour README si nécessaire
   - Ajout dans Storybook si component UI

---

## 🚀 Prochaines étapes (Roadmap)

### Phase actuelle : Architecture v2 - Phase 1 (Semaine 1)

- [x] ✅ **Documentation créée** (Executive Summary, Architecture, Roadmap)
- [ ] 🔄 **Migration architecture v2** (en cours)
   - Créer structure de dossiers `/shared` et `/tools`
   - Migrer composants shared (atoms, molecules, organisms)
   - Migrer services shared (ifs-client, printer, language)

### Court terme (2-4 semaines)

- [ ] **Finaliser migration architecture v2**
   - Migration Boat Config vers nouvelle structure
   - Cleanup ancien code
   - Tests complets de non-régression
   - Review & Merge

- [ ] **Démarrer Part Printer Phase 1**
   - Services IFS de base
   - Types & Interfaces
   - Configuration endpoints

### Moyen terme (1-3 mois)

- [ ] **Part Printer Phases 2-7** (13 semaines)
   - Phase 2 : Filtres & Recherche
   - Phase 3 : Extraction données
   - Phase 4 : Génération étiquettes & Impression
   - Phase 5 : Interface utilisateur
   - Phase 6 : Tests & Validation
   - Phase 7 : Déploiement

- [ ] **Livraison Part Printer** (Mi-janvier 2026)

### Long terme (3+ mois)

- [ ] **Nouveaux outils** (5+ outils supplémentaires)
- [ ] **Améliorations transverses**
   - Historique des opérations
   - Export des données
   - Notifications en temps réel
   - Mode hors-ligne

---

## 💡 Tips pour Copilot

### Quand je demande de créer un composant

- ✅ Utilise shadcn/ui si disponible
- ✅ Respecte l'architecture Atomic Design (atoms → molecules → organisms)
- ✅ Place dans `/shared/components` si réutilisable, sinon dans `/app/(tools)/[tool]/components`
- ✅ Ajoute TypeScript strict
- ✅ Inclue la gestion d'erreurs
- ✅ Pense accessibilité (ARIA)

### Quand je demande une API Route

- ✅ Place dans `/app/api/shared` si partagé, sinon dans `/app/api/[tool]`
- ✅ Valide TOUS les paramètres
- ✅ Gère les cas d'erreur (400, 404, 500)
- ✅ Retourne JSON standardisé
- ✅ Ajoute des logs avec emojis
- ✅ Documente avec JSDoc

### Quand je demande un service

- ✅ Place dans `/shared/services` si partagé, sinon dans `/tools/[tool]/services`
- ✅ Type TOUT (params, return, errors)
- ✅ Gère les erreurs avec try/catch
- ✅ Utilise `getIFSClient()` pour IFS
- ✅ Ajoute des logs de débogage
- ✅ Exporte les types

### Quand je parle d'IFS

- ✅ Utilise les services validés (ShopOrderHandling, DopHeaderHandling, etc.)
- ✅ Filtre avec `contains()` pas `eq`
- ✅ Parse les DOP IDs composés
- ✅ Limite le `$select` aux champs validés
- ✅ Gère le cache du token OAuth2
- ✅ **CRITIQUE Part Printer** : Utilise `$filter` pour TechnicalSpecBothArray sur parts AN29-13-00 (évite timeouts)

### Quand je travaille sur un outil spécifique

- ✅ **Boat Configuration** : Code dans `/tools/boat-configuration` et `/app/(tools)/boat-configuration`
- ✅ **Part Printer** : Code dans `/tools/part-printer` et `/app/(tools)/part-printer`
- ❌ **Jamais** : Importer du code d'un outil dans un autre outil
- ✅ **Toujours** : Utiliser `/shared` pour le code commun

---

## 📞 Contacts & Ressources

### Environnements IFS

- **DEV (AST)** : https://beneteau-group-ast.ifs.cloud
- **OAuth2** : `/auth/realms/beneast1/protocol/openid-connect/token`
- **OData API** : `/main/ifsapplications/projection/v1`

### Composants Bénéteau

- **Boilerplate** : Basé sur le template Next.js standard Bénéteau
- **Authentification** : Azure AD via NextAuth.js
- **Database** : MS SQL Server (local Docker)

---

## ✅ Checklist avant commit

- [ ] `pnpm run lint` passe sans erreur
- [ ] `pnpm run build` réussit
- [ ] Tests unitaires passent
- [ ] Types TypeScript complets
- [ ] Pas de `console.log` inutiles (sauf logs métier)
- [ ] Documentation à jour
- [ ] Variables sensibles dans `.env.local` (pas committed)

---

**Version** : 1.1.0  
**Dernière mise à jour** : 14 octobre 2025  
**Status Phase 1 Part Printer** : ✅ 100% Complète - Les 3 attributs validés !
