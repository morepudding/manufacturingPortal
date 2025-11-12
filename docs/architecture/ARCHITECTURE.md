# 🏗️ Architecture - Manufacturing Portal

**Version** : 2.0  
**Status** : ✅ Architecture v2 Active  
**Dernière mise à jour** : 12 novembre 2025

---

## 📋 Vue d'ensemble

Le Manufacturing Portal est une **plateforme Next.js modulaire** hébergeant plusieurs outils de production Bénéteau. L'architecture est conçue pour supporter facilement l'ajout de nouveaux outils (scalabilité 10+ outils).

### Outils actuels

| Outil | Status | Description |
|-------|--------|-------------|
| **Boat Configuration Editor** | ✅ Production | Impression documents configuration |
| **Part Printer** | 🚧 En développement | Impression étiquettes pièces |
| **Outil 3+** | 📋 Planifié | 5+ outils supplémentaires prévus |

---

## 🎯 Principes architecturaux

### 1. Séparation des préoccupations

```
/shared    → Code partagé entre TOUS les outils
/tools     → Code spécifique par outil (isolé)
/core      → Infrastructure commune (auth, config)
```

### 2. Modularité

- Chaque outil est **autonome**
- Pas de dépendances entre outils
- Dépendances communes centralisées dans `/shared`

### 3. Scalabilité

- Ajout d'un outil = copier template + implémenter logique métier
- Pas de régression sur outils existants
- Architecture testée pour 10+ outils

---

## 📁 Structure du projet

```
src/
├── app/
│   ├── (home)/                      # Home page
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── (tools)/                     # Routes des outils (isolées)
│   │   ├── boat-configuration/
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── components/          # Composants spécifiques
│   │   │
│   │   └── part-printer/
│   │       ├── page.tsx
│   │       ├── layout.tsx
│   │       └── components/
│   │
│   └── api/                         # API Routes par domaine
│       ├── shared/                  # APIs partagées
│       │   ├── health/
│       │   ├── printers/
│       │   └── languages/
│       │
│       ├── boat-configuration/      # APIs Boat Config
│       │   ├── shop-orders/
│       │   ├── serial-numbers/
│       │   └── print/
│       │
│       └── part-printer/            # APIs Part Printer
│           ├── sites/
│           ├── production-lines/
│           └── labels/
│
├── shared/                          # Code partagé
│   ├── components/
│   │   ├── atoms/                  # Button, Input, Select
│   │   ├── molecules/              # InputWithLabel, SearchBar
│   │   └── organisms/              # DataTable, Header
│   │
│   ├── services/
│   │   ├── ifs-client.ts           # Client OAuth2 IFS (⭐ central)
│   │   ├── printer-service.ts
│   │   └── language-service.ts
│   │
│   ├── hooks/                       # Custom hooks partagés
│   ├── types/                       # Types TypeScript partagés
│   └── utils/                       # Utilitaires partagés
│
├── tools/                           # Services par outil
│   ├── boat-configuration/
│   │   ├── services/
│   │   │   ├── shop-order-service.ts
│   │   │   ├── serial-number-service.ts
│   │   │   └── print-service.ts
│   │   └── types/
│   │
│   └── part-printer/
│       ├── services/
│       │   ├── site-service.ts
│       │   ├── operation-service.ts
│       │   └── label-print-service.ts
│       └── types/
│
├── core/                            # Infrastructure commune
│   ├── config/
│   │   ├── ifs.ts
│   │   └── azure-ad.ts
│   └── lib/
│       └── logger.ts
│
└── contexts/
    └── auth.tsx
```

---

## 🔀 Flux de données

### Architecture en couches

```
┌─────────────────────────────────────────┐
│  UI Layer - React Components           │
│  (shadcn/ui, Tailwind)                 │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│  API Layer - Next.js API Routes        │
│  (TypeScript, Server Components)       │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│  Business Logic - Tool Services        │
│  (tools/[tool]/services/)              │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│  Shared Services - IFS Client          │
│  (shared/services/ifs-client.ts)       │
└──────────────────┬──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│  IFS Cloud OData API                   │
│  (OAuth2, OData v4)                    │
└─────────────────────────────────────────┘
```

### Exemple : Boat Configuration

```
User clicks "Search"
    ↓
ShopOrderSearch.tsx (UI component)
    ↓
POST /api/boat-configuration/shop-orders/search
    ↓
shop-order-service.ts (business logic)
    ↓
ifs-client.ts (shared service)
    ↓
IFS ShopOrderHandling.svc
```

---

## 🧩 Composants partagés

### Design System (Atomic Design)

#### Atoms (Composants de base)

```typescript
// shared/components/atoms/Button.tsx
import { Button } from '@/shared/components/atoms'

<Button variant="primary" size="md">
  Search
</Button>
```

#### Molecules (Compositions)

```typescript
// shared/components/molecules/SearchBar.tsx
import { SearchBar } from '@/shared/components/molecules'

<SearchBar 
  placeholder="Enter Order No" 
  onSearch={handleSearch}
/>
```

#### Organisms (Composants complexes)

```typescript
// shared/components/organisms/DataTable.tsx
import { DataTable } from '@/shared/components/organisms'

<DataTable
  data={shopOrders}
  columns={columns}
  onSelect={handleSelect}
  pagination
/>
```

**Réutilisé dans :**
- Boat Config : Table des Shop Orders
- Part Printer : Table des Shop Orders avec filtres

---

## 🔧 Services partagés

### IFS Client (OAuth2)

```typescript
// shared/services/ifs-client.ts
export class IFSClient {
  private token: string | null = null
  private tokenExpiry: number = 0

  // Gère automatiquement :
  // - Récupération token OAuth2
  // - Cache avec expiration
  // - Renouvellement automatique
  
  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    const token = await this.getToken()
    const url = `${IFS_BASE_URL}/${path}?${new URLSearchParams(params)}`
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    
    return response.json()
  }
}

export const getIFSClient = () => new IFSClient()
```

**Utilisé par tous les outils** pour communiquer avec IFS.

### Printer Service

```typescript
// shared/services/printer-service.ts
export class PrinterService {
  async getPrinters(): Promise<Printer[]> {
    const client = getIFSClient()
    return client.get('PrintDialog.svc/LogicalPrinterSet')
  }
}
```

**Partagé entre :**
- Boat Config (impression documents)
- Part Printer (impression étiquettes)

---

## 📝 Template nouveau tool

### Checklist création

```markdown
## Nouveau Tool : [Tool Name]

### Structure
- [ ] /src/app/(tools)/[tool-name]/
- [ ] /src/tools/[tool-name]/services/
- [ ] /src/tools/[tool-name]/types/
- [ ] /src/app/api/[tool-name]/
- [ ] /docs/[tool-name].md

### Code
- [ ] page.tsx + layout.tsx
- [ ] Services spécifiques
- [ ] Types TypeScript
- [ ] API Routes
- [ ] Tests (coverage > 80%)

### Documentation
- [ ] README complet
- [ ] Spécifications fonctionnelles
- [ ] Guide utilisateur
- [ ] Mise à jour docs/README.md
```

### Template service

```typescript
// src/tools/[tool-name]/services/example-service.ts
import { getIFSClient } from '@/shared/services/ifs-client'
import type { ExampleType } from '../types/example'

export class ExampleService {
  private client = getIFSClient()

  async getExample(params: { id: string }): Promise<ExampleType> {
    try {
      return await this.client.get<ExampleType>(
        'ServiceName.svc/EntitySet',
        { $filter: `Id eq '${params.id}'` }
      )
    } catch (error) {
      console.error('❌ Error fetching example:', error)
      throw error
    }
  }
}

export const exampleService = new ExampleService()
```

---

## 🧪 Tests

### Structure

```
src/
├── shared/
│   ├── components/
│   │   └── atoms/
│   │       ├── Button.tsx
│   │       └── Button.test.tsx      # ✅ Test à côté du composant
│   └── services/
│       ├── ifs-client.ts
│       └── ifs-client.test.ts
│
└── tools/
    └── boat-configuration/
        └── services/
            ├── shop-order-service.ts
            └── shop-order-service.test.ts
```

### Commandes

```bash
pnpm run test                        # Tous les tests
pnpm run test src/tools/boat-config  # Tests d'un outil
pnpm run test src/shared/components  # Tests composants
pnpm run coverage                    # Coverage report
```

---

## 🔒 Sécurité

### Authentification

- **Azure AD** via NextAuth.js
- Session partagée entre tous les outils
- Pas de ré-authentification nécessaire

### Variables d'environnement

```bash
# Shared (tous les outils)
IFS_BASE_URL=...
IFS_CLIENT_ID=...
IFS_CLIENT_SECRET=...
AZURE_AD_CLIENT_ID=...
AZURE_AD_CLIENT_SECRET=...

# Tool-specific (si nécessaire)
BOAT_CONFIG_REPORT_ID=...
PART_PRINTER_LABEL_TEMPLATE=...
```

---

## 🚀 Déploiement

### Environnements

| Environnement | URL | IFS |
|---------------|-----|-----|
| **DEV** | localhost:3000 | AST |
| **PROD** | portal.beneteau.com | Production |

### CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy Portal

on:
  push:
    branches: [main]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm run lint
      - run: pnpm run test
      - run: pnpm run build
      - name: Deploy
        run: # Deploy commands
```

---

## 📊 Monitoring

### Logs centralisés

```typescript
// shared/utils/logger.ts
export const logger = {
  info: (tool: string, message: string) => {
    console.log(`[${tool}] ℹ️ ${message}`)
  },
  error: (tool: string, message: string, error?: Error) => {
    console.error(`[${tool}] ❌ ${message}`, error)
  }
}

// Usage dans un outil
logger.info('boat-configuration', 'Shop Order search initiated')
logger.error('part-printer', 'Failed to generate labels', error)
```

### Métriques

```typescript
// Exemple : Tracking usage
analytics.track('tool_used', {
  toolName: 'boat-configuration',
  action: 'print_document',
  timestamp: new Date()
})
```

---

## 🏗️ Stack technique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| **Framework** | Next.js | 15.2.1 |
| **Runtime** | React | 19.0.0 |
| **Language** | TypeScript | 5.8.2 |
| **UI** | shadcn/ui + Radix UI | Latest |
| **Styling** | Tailwind CSS | 4.1.7 |
| **API** | Next.js API Routes | - |
| **Auth** | NextAuth.js + Azure AD | 4.24.11 |
| **Database** | MS SQL Server | 11.0.1 |
| **IFS** | OAuth2 + OData v4 | - |
| **Package Manager** | pnpm | - |
| **Testing** | Vitest | Latest |

---

## 📞 Support

### Documentation

- [Quick Start](../QUICK_START.md) - Installation rapide
- [Boat Configuration](../boat-configuration-editor.md) - Guide complet
- [Part Printer](../part-printer.md) - Guide complet
- [IFS Endpoints](../IFS_ENDPOINTS.md) - APIs IFS

### Contacts

- **Dev Team** : Équipe Manufacturing Portal
- **IFS Admin** : Thomas (permissions)
- **IT Support** : IT Bénéteau

---

**Maintenu par** : Équipe Manufacturing Portal  
**Version** : 2.0
