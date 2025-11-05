# 🏗️ Architecture Multi-Outils - Manufacturing Portal

**Version** : 2.0  
**Status** : 🔄 En cours de migration  
**Dernière mise à jour** : 13 octobre 2025

---

## 📋 Vue d'ensemble

Le **Manufacturing Portal** est une plateforme Next.js hébergeant **plusieurs outils de production** pour Bénéteau. L'architecture doit être **modulaire, scalable et maintenable** pour supporter facilement l'ajout de nouveaux outils.

### Outils actuels et prévus

| Outil | Status | Description |
|-------|--------|-------------|
| **Boat Configuration Editor** | ✅ Production | Gestion des ordres de fabrication et impression des documents de configuration |
| **Part Printer** | 🚧 En développement | Impression des étiquettes pour les pièces en bois |
| **Tool 3** | 📋 Planifié | À définir |
| **Tool 4** | 📋 Planifié | À définir |
| **Tool 5+** | 📋 Planifié | 7+ outils prévus au total |

---

## 🎯 Principes architecturaux

### 1. Séparation des préoccupations

- **Shared** : Composants, services et types partagés entre tous les outils
- **Tools** : Code spécifique à chaque outil (isolé)
- **Core** : Infrastructure commune (auth, API client, etc.)

### 2. Modularité

- Chaque outil est **autonome** et peut être développé/déployé indépendamment
- Les dépendances communes sont **centralisées** dans `/shared`
- Les outils ne se connaissent pas entre eux

### 3. Scalabilité

- Architecture prête pour **10+ outils**
- Ajout d'un nouvel outil = **copier un template** et implémenter la logique métier
- Pas de régression sur les outils existants

### 4. Maintenabilité

- **Documentation obligatoire** pour chaque outil
- **Tests unitaires et E2E** pour chaque fonctionnalité
- **TypeScript strict** sur tout le codebase

---

## 📁 Structure de fichiers

### Architecture actuelle (v1 - À migrer)

```
src/
├── app/
│   ├── boat-configuration/          # ❌ Pas de structure claire
│   ├── api/
│   │   ├── shop-orders/
│   │   ├── printers/
│   │   └── ...
│   └── page.tsx
├── components/                       # ❌ Tous les composants mélangés
├── lib/                             # ❌ Tous les services mélangés
└── core/
```

### Architecture cible (v2 - Nouvelle structure)

```
src/
├── app/
│   ├── (home)/                      # Home page et layout principal
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── (tools)/                     # Groupe de routes pour tous les outils
│   │   ├── boat-configuration/      # ✅ Outil 1 isolé
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── components/          # Composants spécifiques à cet outil
│   │   │       ├── ShopOrderSearch.tsx
│   │   │       ├── SerialNumberDisplay.tsx
│   │   │       └── PrintDialog.tsx
│   │   │
│   │   └── part-printer/            # ✅ Outil 2 isolé
│   │       ├── page.tsx
│   │       ├── layout.tsx
│   │       └── components/
│   │           ├── FilterPanel.tsx
│   │           ├── ShopOrderTable.tsx
│   │           └── LabelPreview.tsx
│   │
│   └── api/                         # API Routes organisées par domaine
│       ├── shared/                  # APIs partagées (auth, health, etc.)
│       │   ├── health/
│       │   └── auth/
│       │
│       ├── boat-configuration/      # APIs spécifiques Boat Config
│       │   ├── shop-orders/
│       │   ├── serial-numbers/
│       │   ├── customer-orders/
│       │   └── print/
│       │
│       └── part-printer/            # APIs spécifiques Part Printer
│           ├── sites/
│           ├── production-lines/
│           ├── operations/
│           ├── master-parts/
│           ├── ranges/
│           └── labels/
│
├── shared/                          # ✅ Code partagé entre tous les outils
│   ├── components/                  # Composants UI réutilisables
│   │   ├── atoms/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   └── ...
│   │   ├── molecules/
│   │   │   ├── InputWithLabel.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── ...
│   │   └── organisms/
│   │       ├── DataTable.tsx
│   │       ├── Header.tsx
│   │       └── ...
│   │
│   ├── services/                    # Services IFS partagés
│   │   ├── ifs-client.ts           # Client OAuth2 IFS
│   │   ├── printer-service.ts      # Service imprimantes (partagé)
│   │   ├── language-service.ts     # Service langues (partagé)
│   │   └── base-service.ts         # Service de base abstrait
│   │
│   ├── hooks/                       # Custom hooks partagés
│   │   ├── useIFSData.ts
│   │   ├── usePagination.ts
│   │   └── useDebounce.ts
│   │
│   ├── types/                       # Types TypeScript partagés
│   │   ├── ifs/
│   │   │   ├── common.ts           # Types IFS communs
│   │   │   ├── printer.ts
│   │   │   └── language.ts
│   │   └── api.ts                  # Types API responses
│   │
│   └── utils/                       # Utilitaires partagés
│       ├── date.ts
│       ├── string.ts
│       └── validation.ts
│
├── tools/                           # ✅ Services spécifiques par outil
│   ├── boat-configuration/
│   │   ├── services/
│   │   │   ├── shop-order-service.ts
│   │   │   ├── serial-number-service.ts
│   │   │   ├── dop-service.ts
│   │   │   ├── customer-order-service.ts
│   │   │   └── print-service.ts
│   │   │
│   │   └── types/
│   │       ├── shop-order.ts
│   │       ├── serial-number.ts
│   │       └── customer-order.ts
│   │
│   └── part-printer/
│       ├── services/
│       │   ├── site-service.ts
│       │   ├── production-line-service.ts
│       │   ├── shop-order-filter-service.ts
│       │   ├── operation-service.ts
│       │   ├── master-part-service.ts
│       │   ├── range-service.ts
│       │   ├── part-label-service.ts
│       │   ├── barcode-service.ts
│       │   └── label-print-service.ts
│       │
│       └── types/
│           ├── site.ts
│           ├── production-line.ts
│           ├── operation.ts
│           ├── master-part.ts
│           ├── range.ts
│           └── part-label.ts
│
├── core/                            # Infrastructure commune
│   ├── config/
│   │   ├── ifs.ts                  # Configuration IFS
│   │   └── azure-ad.ts             # Configuration Azure AD
│   │
│   └── lib/
│       └── logger.ts               # Logger centralisé
│
└── contexts/                        # React contexts
    └── auth.tsx                    # Contexte authentification
```

---

## 🔀 Flux de données

### Principe général

```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERFACE                       │
│                   (Tool-specific)                       │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│               TOOL-SPECIFIC SERVICES                    │
│         (tools/[tool-name]/services/)                   │
│                                                         │
│  - Business logic specific to the tool                  │
│  - Data transformation                                  │
│  - Orchestration                                        │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│               SHARED SERVICES                           │
│            (shared/services/)                           │
│                                                         │
│  - IFS Client (OAuth2)                                  │
│  - Common utilities                                     │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  IFS CLOUD API                          │
│                  (OData v4)                             │
└─────────────────────────────────────────────────────────┘
```

### Exemple : Boat Configuration

```
User clicks "Search"
    ↓
ShopOrderSearch.tsx (component)
    ↓
POST /api/boat-configuration/shop-orders/search (API Route)
    ↓
shop-order-service.ts (tool-specific service)
    ↓
ifs-client.ts (shared service)
    ↓
IFS ShopOrderHandling.svc (IFS API)
```

### Exemple : Part Printer

```
User selects filters
    ↓
FilterPanel.tsx (component)
    ↓
POST /api/part-printer/shop-orders/filter (API Route)
    ↓
shop-order-filter-service.ts (tool-specific service)
    ↓
ifs-client.ts (shared service)
    ↓
IFS ShopOrderHandling.svc (IFS API)
```

---

## 🧩 Composants partagés

### Design System (Atomic Design)

#### Atoms (Composants de base)

```typescript
// shared/components/atoms/Button.tsx
export const Button = ({ variant, size, children, ...props }) => { ... }

// shared/components/atoms/Input.tsx
export const Input = ({ type, label, error, ...props }) => { ... }

// shared/components/atoms/Select.tsx
export const Select = ({ options, value, onChange, ...props }) => { ... }
```

**Utilisation** :
```typescript
// Dans n'importe quel outil
import { Button, Input, Select } from '@/shared/components/atoms'
```

#### Molecules (Compositions)

```typescript
// shared/components/molecules/SearchBar.tsx
export const SearchBar = ({ onSearch, placeholder }) => {
  return (
    <div className="flex gap-2">
      <Input placeholder={placeholder} />
      <Button onClick={onSearch}>Search</Button>
    </div>
  )
}
```

#### Organisms (Composants complexes)

```typescript
// shared/components/organisms/DataTable.tsx
export const DataTable = <T>({ 
  data, 
  columns, 
  onSelect,
  pagination 
}) => { ... }
```

**Réutilisé dans** :
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

  async getToken(): Promise<string> {
    // Gère le cache et le renouvellement du token
  }

  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    // GET request avec authentification
  }

  async post<T>(path: string, body: any): Promise<T> {
    // POST request avec authentification
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
    return client.get<Printer[]>('PrintDialog.svc/Printers')
  }
}
```

**Partagé entre** :
- Boat Config (impression documents)
- Part Printer (impression étiquettes)
- Futurs outils d'impression

---

## 🔀 Migration plan

### Étape 1 : Créer la nouvelle structure (1 jour)

```bash
# Créer les nouveaux dossiers
mkdir -p src/shared/{components,services,hooks,types,utils}
mkdir -p src/tools/{boat-configuration,part-printer}
mkdir -p src/app/\(tools\)/{boat-configuration,part-printer}
mkdir -p src/app/api/{shared,boat-configuration,part-printer}
```

### Étape 2 : Migrer les composants partagés (2 jours)

```bash
# Déplacer les composants UI génériques
mv src/components/atoms src/shared/components/
mv src/components/molecules src/shared/components/
mv src/components/organisms src/shared/components/
```

**Mettre à jour les imports** :
```typescript
// Avant
import { Button } from '@/components/atoms/Button'

// Après
import { Button } from '@/shared/components/atoms/Button'
```

### Étape 3 : Migrer les services partagés (2 jours)

```bash
# IFS Client et services communs
mv src/lib/ifs-client.ts src/shared/services/
mv src/lib/printer-service.ts src/shared/services/
mv src/lib/language-service.ts src/shared/services/
```

### Étape 4 : Isoler Boat Configuration (3 jours)

```bash
# Services spécifiques Boat Config
mkdir -p src/tools/boat-configuration/{services,types}
mv src/lib/shop-order-service.ts src/tools/boat-configuration/services/
mv src/lib/serial-number-service.ts src/tools/boat-configuration/services/
mv src/lib/dop-service.ts src/tools/boat-configuration/services/
mv src/lib/customer-order-service.ts src/tools/boat-configuration/services/
mv src/lib/print-service.ts src/tools/boat-configuration/services/

# Composants spécifiques Boat Config
mkdir -p src/app/\(tools\)/boat-configuration/components
# Identifier et déplacer les composants spécifiques
```

### Étape 5 : Mettre à jour les API Routes (2 jours)

```bash
# Réorganiser les API Routes
mkdir -p src/app/api/boat-configuration
mv src/app/api/shop-orders src/app/api/boat-configuration/
mv src/app/api/serial-numbers src/app/api/boat-configuration/
mv src/app/api/customer-orders src/app/api/boat-configuration/
mv src/app/api/print src/app/api/boat-configuration/

# APIs partagées
mkdir -p src/app/api/shared
mv src/app/api/printers src/app/api/shared/
mv src/app/api/languages src/app/api/shared/
```

### Étape 6 : Mettre à jour tsconfig.json (1 jour)

```json
{
  "compilerOptions": {
    "paths": {
      "@/shared/*": ["./src/shared/*"],
      "@/tools/*": ["./src/tools/*"],
      "@/core/*": ["./src/core/*"],
      "@/app/*": ["./src/app/*"]
    }
  }
}
```

### Étape 7 : Tests et validation (2 jours)

- [ ] Lancer tous les tests
- [ ] Vérifier que Boat Config fonctionne toujours
- [ ] Valider que les imports sont corrects
- [ ] Mettre à jour la documentation

**Total migration** : ~12 jours (2 semaines)

---

## 📝 Template pour un nouveau tool

### Checklist création d'un nouveau tool

```markdown
## Nouveau Tool : [Tool Name]

### 1. Structure
- [ ] Créer `/src/app/(tools)/[tool-name]/`
- [ ] Créer `/src/tools/[tool-name]/services/`
- [ ] Créer `/src/tools/[tool-name]/types/`
- [ ] Créer `/src/app/api/[tool-name]/`
- [ ] Créer `/docs/tools/[tool-name]/`

### 2. Documentation
- [ ] README.md (vue d'ensemble)
- [ ] ROADMAP.md (phases de développement)
- [ ] specifications/ (specs fonctionnelles)
- [ ] implementation/ (guides techniques)

### 3. Page principale
- [ ] page.tsx
- [ ] layout.tsx
- [ ] components/ (composants spécifiques)

### 4. Services
- [ ] [service-name]-service.ts
- [ ] Tests unitaires
- [ ] Documentation JSDoc

### 5. API Routes
- [ ] Créer les endpoints nécessaires
- [ ] Validation des paramètres
- [ ] Gestion d'erreurs
- [ ] Tests

### 6. Types TypeScript
- [ ] Interfaces IFS
- [ ] Types API
- [ ] Types métier

### 7. Tests
- [ ] Tests unitaires (services)
- [ ] Tests composants
- [ ] Tests E2E
- [ ] Coverage > 80%

### 8. Intégration
- [ ] Ajouter dans home page
- [ ] Créer l'icône
- [ ] Mettre à jour la navigation
- [ ] Mettre à jour README principal
```

### Template fichier structure

```typescript
// src/tools/[tool-name]/services/example-service.ts

import { getIFSClient } from '@/shared/services/ifs-client'
import type { ExampleType } from '../types/example'

/**
 * Service for managing [description]
 */
export class ExampleService {
  private client = getIFSClient()

  /**
   * Get [description]
   * @param params - Query parameters
   * @returns Promise with data
   */
  async getExample(params: { id: string }): Promise<ExampleType> {
    try {
      const response = await this.client.get<ExampleType>(
        'ServiceName.svc/EntitySet',
        {
          $filter: `Id eq '${params.id}'`
        }
      )
      return response
    } catch (error) {
      console.error('❌ Error fetching example:', error)
      throw error
    }
  }
}

// Singleton export
export const exampleService = new ExampleService()
```

---

## 🧪 Tests

### Structure des tests

```
src/
├── shared/
│   ├── components/
│   │   └── atoms/
│   │       ├── Button.tsx
│   │       └── Button.test.tsx      # ✅ Test à côté du composant
│   └── services/
│       ├── ifs-client.ts
│       └── ifs-client.test.ts       # ✅ Test à côté du service
│
└── tools/
    └── boat-configuration/
        └── services/
            ├── shop-order-service.ts
            └── shop-order-service.test.ts
```

### Commandes de test

```bash
# Tous les tests
pnpm run test

# Tests d'un outil spécifique
pnpm run test src/tools/boat-configuration

# Tests des composants partagés
pnpm run test src/shared/components

# Coverage
pnpm run coverage
```

---

## 📚 Documentation

### Structure documentation

```
docs/
├── README.md                        # Vue d'ensemble du projet
├── architecture/
│   ├── MULTI_TOOL_ARCHITECTURE.md  # Ce document
│   ├── API_DESIGN.md               # Principes API
│   └── TESTING_STRATEGY.md         # Stratégie de tests
│
├── api/                            # Documentation APIs IFS
│   ├── shop-order/
│   ├── dop-header/
│   └── ...
│
└── tools/                          # Documentation par outil
    ├── boat-configuration/
    │   ├── README.md
    │   ├── ROADMAP.md
    │   ├── specifications/
    │   ├── implementation/
    │   └── user-guide/
    │
    └── part-printer/
        ├── README.md
        ├── ROADMAP.md
        ├── specifications/
        ├── implementation/
        └── user-guide/
```

---

## 🔒 Sécurité

### Authentification

- **Azure AD** via NextAuth.js pour tous les outils
- Session partagée entre tous les outils
- Pas de ré-authentification nécessaire

### Autorisation

- Roles utilisateurs (à implémenter) :
  - `operator` : Accès outils de production
  - `supervisor` : Accès + historique
  - `admin` : Accès complet

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

| Environnement | URL | Usage |
|---------------|-----|-------|
| **DEV** | http://localhost:3000 | Développement local |
| **AST** | https://portal-ast.beneteau.com | Test avec IFS AST |
| **PROD** | https://portal.beneteau.com | Production |

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy Manufacturing Portal

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm run lint
      - run: pnpm run test
      - run: pnpm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Azure
        run: |
          # Deploy commands
```

---

## 📊 Monitoring

### Métriques par outil

```typescript
// Exemple : Tracking usage
analytics.track('tool_used', {
  toolName: 'boat-configuration',
  action: 'print_document',
  timestamp: new Date()
})
```

### Logs

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

// Usage
logger.info('boat-configuration', 'Shop Order search initiated')
logger.error('part-printer', 'Failed to generate labels', error)
```

---

## 🎯 Checklist Migration

### Phase 1 : Préparation (Semaine 1)

- [ ] Créer nouvelle structure de dossiers
- [ ] Mettre à jour tsconfig.json avec paths
- [ ] Créer documentation architecture
- [ ] Communiquer le plan à l'équipe

### Phase 2 : Migration Shared (Semaine 2)

- [ ] Migrer composants atoms
- [ ] Migrer composants molecules
- [ ] Migrer composants organisms
- [ ] Migrer ifs-client
- [ ] Migrer services partagés (printer, language)
- [ ] Mettre à jour tous les imports
- [ ] Tests de non-régression

### Phase 3 : Migration Boat Config (Semaine 3)

- [ ] Créer structure tools/boat-configuration
- [ ] Migrer services spécifiques
- [ ] Migrer types spécifiques
- [ ] Créer composants spécifiques
- [ ] Réorganiser API routes
- [ ] Tests complets

### Phase 4 : Validation (Semaine 4)

- [ ] Tests E2E complets
- [ ] Validation avec utilisateurs
- [ ] Documentation à jour
- [ ] Code review
- [ ] Merge et déploiement

---

## 📞 Support

### Questions architecture

- Consulter ce document
- Vérifier la documentation du tool spécifique
- Ouvrir une issue GitHub avec label `architecture`

### Ajout d'un nouveau tool

- Suivre le template ci-dessus
- Consulter les exemples existants (Boat Config, Part Printer)
- Code review obligatoire avant merge

---

**Maintenu par** : Équipe Manufacturing Portal  
**Version** : 2.0  
**Dernière mise à jour** : 13 octobre 2025
