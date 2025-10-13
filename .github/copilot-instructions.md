# 🤖 Copilot Instructions - Manufacturing Portal

## 📋 Vue d'ensemble du projet

Le **Manufacturing Portal** est un ensemble d'outils Next.js destiné à la production Bénéteau. Le premier outil implémenté est le **Boat Configuration Editor** qui permet aux opérateurs de production de gérer les ordres de fabrication (Shop Orders) et d'imprimer les documents de configuration.

### Objectifs principaux (Boat Configuration Editor)

1. **Rechercher** un Shop Order dans IFS Cloud
2. **Récupérer** automatiquement le Serial Number associé via le DOP Header
3. **Sélectionner** une imprimante et une langue
4. **Imprimer** le document de configuration MA_FO_CR_1419

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

### Architecture en couches

```
┌─────────────────────────────────────────┐
│  UI Layer - React Components           │
│  (shadcn/ui, Radix UI, Tailwind)      │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│  API Layer - Next.js API Routes        │
│  (TypeScript, Server Components)       │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│  Data Layer - IFS Cloud OData API      │
│  (OAuth2, ShopOrderHandling.svc, etc)  │
└─────────────────────────────────────────┘
```

---

## 📁 Structure du projet

```
ManufacturingPortal/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API Routes
│   │   │   ├── auth/            # NextAuth configuration
│   │   │   ├── shop-orders/     # Shop Order endpoints
│   │   │   ├── printers/        # Printer management
│   │   │   └── languages/       # Language selection
│   │   ├── boat-configuration/  # Main feature page
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   │
│   ├── components/              # UI Components
│   │   ├── atoms/              # Basic components (Button, Input, etc)
│   │   ├── molecules/          # Composed components
│   │   ├── organisms/          # Complex components (DataTable, Header)
│   │   └── template/           # Page templates
│   │
│   ├── lib/                    # Business logic & utilities
│   │   ├── ifs-client.ts      # IFS OAuth2 client
│   │   ├── shop-order-service.ts
│   │   ├── serial-number-service.ts
│   │   └── dop-service.ts
│   │
│   ├── contexts/               # React contexts (auth, etc)
│   └── core/                   # Core types & constants
│       └── types/
│
├── docs/                       # Documentation complète
│   ├── doc/                   # Documentation détaillée
│   │   ├── PHASE1_COMPLETE.md
│   │   ├── api/               # Documentation API
│   │   ├── discoveries/       # Découvertes techniques
│   │   └── workflows/         # Spécifications fonctionnelles
│   └── documentation/         # Documentation architecture
│
├── scripts/                   # Utilitaires & tests
│   └── testConnection.ts     # Test connexion DB
│
├── public/                    # Assets statiques
├── .storybook/               # Configuration Storybook
└── package.json              # Dependencies & scripts
```

---

## 🔐 Configuration & Environnement

### Variables d'environnement (.env.local)

```bash
# Configuration IFS Cloud (OAuth2)
IFS_BASE_URL=https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1
IFS_CLIENT_ID=AIS_IFS_MA_AST
IFS_CLIENT_SECRET=ifiW7xzKNmj3a1fpEukFIImPFztb51R9
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

## 🎯 Workflow principal (4 étapes)

### Phase 1 : Shop Order → Serial Number ✅ COMPLÈTE

```
1. 📝 Saisie des clés Shop Order
   ├─> Order No (ex: "563", "97277")
   ├─> Release No (ex: "*" pour tous)
   └─> Sequence No (ex: "*" pour tous)

2. 🔍 Recherche via API IFS
   └─> POST /api/shop-orders/search

3. 🔄 Traitement backend
   ├─> Recherche Shop Order (OData contains filter)
   ├─> Extraction DOP ID ("54 - 1035" → "54")
   └─> Récupération Serial Number via DOP

4. ✅ Affichage & Confirmation
   ├─> Serial Number trouvé
   ├─> DOP Header ID
   └─> Confirmation utilisateur (Yes/No)
```

### Phase 2 : Sélection Imprimante & Langue (À IMPLÉMENTER)

```
1. 📋 Récupération listes
   ├─> GET /api/printers
   └─> GET /api/languages

2. 👤 Sélection utilisateur
   ├─> Dropdown imprimantes
   └─> Dropdown langues

3. ✅ Validation choix
```

### Phase 3 : Impression (À IMPLÉMENTER)

```
1. 🖨️ Envoi job d'impression
   └─> POST /api/print
       ├─> serialNumber
       ├─> dopHeaderId
       ├─> printer
       └─> language

2. ✅ Confirmation impression
   └─> Option "New Print"
```

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
import { getIFSClient } from '@/lib/ifs-client'

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

### 2. Filtres OData

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

### 3. Parsing DOP ID composite

```typescript
// IFS retourne souvent des DOP IDs composés
// Exemple: "54 - 1035" → On veut "54"

import { extractMainDopId } from '@/lib/dop-service'

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
| **Phase 1 Complete** | `docs/doc/PHASE1_COMPLETE.md` | Implémentation Shop Order → Serial |
| **Spécification Fonctionnelle** | `docs/doc/workflows/SPECIFICATION_FONCTIONNELLE.md` | Spec complète du workflow |
| **Architecture** | `docs/documentation/01-architecture.md` | Architecture technique |
| **Modules** | `docs/documentation/02-modules.md` | Structure du code |
| **Flux de données** | `docs/documentation/03-flux-donnees.md` | Diagrammes & interactions |
| **Déploiement** | `docs/documentation/04-deployment.md` | Guide installation |

### APIs IFS documentées

- `docs/doc/api/OdataShoporder.md` - API Shop Orders
- `docs/doc/api/serialnumber.md` - API Serial Numbers
- `docs/doc/api/DocOData.md` - Documentation générale OData

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

### Phase 2 : Sélection Imprimante & Langue

- [ ] Créer `GET /api/printers`
- [ ] Créer `GET /api/languages`
- [ ] Interface de sélection (dropdowns)
- [ ] Validation des choix
- [ ] Transition vers Phase 3

### Phase 3 : Impression

- [ ] Créer `POST /api/print`
- [ ] Intégration PrintDialog.svc (IFS)
- [ ] Confirmation d'impression
- [ ] Message de succès
- [ ] Option "New Print"

### Améliorations futures

- [ ] Historique des impressions
- [ ] Recherche avancée (filtres multiples)
- [ ] Export des données
- [ ] Notifications en temps réel
- [ ] Mode hors-ligne

---

## 💡 Tips pour Copilot

### Quand je demande de créer un composant

- ✅ Utilise shadcn/ui si disponible
- ✅ Respecte l'architecture Atomic Design
- ✅ Ajoute TypeScript strict
- ✅ Inclue la gestion d'erreurs
- ✅ Pense accessibilité (ARIA)

### Quand je demande une API Route

- ✅ Valide TOUS les paramètres
- ✅ Gère les cas d'erreur (400, 404, 500)
- ✅ Retourne JSON standardisé
- ✅ Ajoute des logs avec emojis
- ✅ Documente avec JSDoc

### Quand je demande un service

- ✅ Type TOUT (params, return, errors)
- ✅ Gère les erreurs avec try/catch
- ✅ Utilise `getIFSClient()` pour IFS
- ✅ Ajoute des logs de débogage
- ✅ Exporte les types

### Quand je parle d'IFS

- ✅ Utilise les services validés (ShopOrderHandling, DopHeaderHandling)
- ✅ Filtre avec `contains()` pas `eq`
- ✅ Parse les DOP IDs composés
- ✅ Limite le `$select` aux champs validés
- ✅ Gère le cache du token OAuth2

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

**Version** : 1.0.0  
**Dernière mise à jour** : 13 octobre 2025  
**Status Phase 1** : ✅ Complète et validée
