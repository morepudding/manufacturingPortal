# 🏷️ Part Printer - Services

Services métier spécifiques à l'outil Part Printer.

## 📁 Structure

```
services/
├── site-service.ts               ✅ Endpoint mis à jour (CompanySiteHandling.svc/CompanySiteSet)
├── production-line-service.ts    ⚠️ TODO: Mettre à jour endpoint IFS
├── shop-order-filter-service.ts  🚧 À créer
├── master-part-service.ts        🚧 À créer
├── range-service.ts              🚧 À créer
├── operation-service.ts          🚧 À créer (Phase 3)
├── part-label-service.ts         🚧 À créer (Phase 3)
├── barcode-service.ts            🚧 À créer (Phase 4)
└── label-print-service.ts        🚧 À créer (Phase 4)
```

## 🎯 Phase 1 - Services de base

### 1. site-service.ts ✅ COMPLÉTÉ

**Status**: ✅ Endpoint mis à jour avec CompanySiteHandling.svc/CompanySiteSet (configuré dans Azure APIM)

**Fonctions**:
- `getSites()` - Liste tous les sites/contracts
- `getSiteByContract(contract)` - Récupère un site spécifique

**Endpoint IFS**: `CompanySiteHandling.svc/CompanySiteSet`
- Champs: Contract, Description, Company, Country
- 9 sites disponibles (env AST): FR018, FR05A, FR001, FR019, etc.
- Configuré dans Azure APIM par Thomas

### 2. production-line-service.ts ✅ TEMPLATE CRÉÉ

**Status**: Template créé, à compléter avec vrais endpoints IFS

**Fonctions**:
- `getProductionLinesBySite(site)` - Lignes par site
- `getAllProductionLines()` - Toutes les lignes

**TODO**:
- [ ] Trouver le bon endpoint IFS (ProductionLineHandling.svc ?)
- [ ] Vérifier les champs disponibles
- [ ] Tester avec données réelles

### 3. shop-order-filter-service.ts 🚧 À CRÉER

**Status**: À créer (peut réutiliser/adapter shop-order-service de Boat Config)

**Fonctions**:
- `filterShopOrders(params)` - Filtrage avancé avec:
  - Site (required)
  - Production Line (optional)
  - Start Date (required)
  - Block Date (boolean)
  - OP10 Block ID (EMPTY | NO_CONDITION)

**Logique métier**:

| Mode | Block Date | OP10 Block ID | Start Date |
|------|------------|---------------|------------|
| Débit classique | true | EMPTY (vide) | = startDate |
| Redébit | false | NO_CONDITION | <= today |

**TODO**:
- [ ] Analyser shop-order-service.ts de Boat Config
- [ ] Adapter pour filtres Part Printer
- [ ] Implémenter logique Block Date
- [ ] Implémenter filtrage OP10 Block ID
- [ ] Tests avec données réelles

### 4. master-part-service.ts 🚧 À CRÉER

**Status**: À créer

**Fonctions**:
- `getMasterPartAttributes(partNo)` - Récupère attributs:
  - GENERIC CODE
  - LENGTH SETUP
  - VARNISH CODE
  - Engineering Part Revision (dernière active)

**TODO**:
- [ ] Trouver endpoint IFS (MasterPartHandling.svc ?)
- [ ] Identifier comment récupérer les attributs custom
- [ ] Gérer Engineering Part Revision (dernière active)
- [ ] Tests

### 5. range-service.ts 🚧 À CRÉER

**Status**: À créer

**Fonctions**:
- `getRangeByDate(site, date)` - Récupère Range ID:
  - Filtre par Site
  - Filtre par date BETWEEN StartDate AND EndDate

**TODO**:
- [ ] Trouver endpoint IFS (RangeHandling.svc ?)
- [ ] Vérifier structure table Range
- [ ] Implémenter logique date range
- [ ] Tests

## 🔗 Dépendances

Tous les services utilisent:
- `@/shared/services/ifs-client` - Client OAuth2 IFS
- Types depuis `../types/index.ts`

## 📝 Conventions

### Imports

```typescript
import { getIFSClient } from '@/shared/services/ifs-client'
import type { IFSODataResponse } from '@/shared/types/ifs'
import type { MonType } from '../types'
```

### Logs

```typescript
console.log('🔍 [Service Name] Message...')  // Recherche
console.log('✅ [Service Name] Succès...')   // Succès
console.error('❌ [Service Name] Erreur...') // Erreur
console.log('⚠️ [Service Name] Warning...')  // Warning
```

### Gestion d'erreurs

```typescript
try {
  // Logic
} catch (error) {
  console.error('❌ [Service] Error:', error)
  throw new Error('Failed to ...')
}
```

## 🧪 Tests

Pour chaque service:
- Créer `[service-name].test.ts`
- Coverage > 80%
- Tests avec données mockées ET réelles (si possible)

## 📚 Ressources

- [Boat Config shop-order-service.ts](/src/tools/boat-configuration/services/shop-order-service.ts) - Référence
- [IFS Client](/src/shared/services/ifs-client.ts) - Client OAuth2
- [Types Part Printer](/src/tools/part-printer/types/index.ts) - Types TypeScript
