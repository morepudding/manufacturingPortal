# 🎨 Composants UI - Part Printer

**Phase 2** - Interface de filtrage  
**Status** : ✅ 100% Implémenté  
**Dernière mise à jour** : 14 octobre 2025

---

## 📋 Vue d'ensemble

Ce dossier contient tous les composants UI spécifiques au **Part Printer**. Les composants suivent le pattern Atomic Design et sont construits avec shadcn/ui + Radix UI.

---

## 🧩 Composants

### SiteSelector.tsx

**Type** : Molecule  
**Rôle** : Dropdown pour sélectionner un site IFS (Contract)

**Props** :
```typescript
interface SiteSelectorProps {
  value?: string
  onChange: (site: string) => void
  disabled?: boolean
}
```

**Fonctionnalités** :
- ✅ Chargement automatique des sites depuis `/api/shared/sites`
- ✅ Loading state avec spinner
- ✅ Error state avec message
- ✅ Empty state si aucun site
- ✅ Label avec indicateur "required"

**Utilisation** :
```tsx
<SiteSelector
  value={selectedSite}
  onChange={setSite}
/>
```

---

### ProductionLineSelector.tsx

**Type** : Molecule  
**Rôle** : Dropdown pour sélectionner une ligne de production (filtrée par site)

**Props** :
```typescript
interface ProductionLineSelectorProps {
  site?: string
  value?: string
  onChange: (line: string) => void
  disabled?: boolean
}
```

**Fonctionnalités** :
- ✅ Chargement automatique des lignes depuis `/api/part-printer/production-lines?site={site}`
- ✅ Rechargement quand le site change
- ✅ Reset automatique de la valeur quand le site change
- ✅ Désactivé si aucun site sélectionné
- ✅ Loading/Error/Empty states
- ✅ Label avec indicateur "optional"

**Utilisation** :
```tsx
<ProductionLineSelector
  site={selectedSite}
  value={selectedLine}
  onChange={setLine}
/>
```

---

### BlockDateToggle.tsx

**Type** : Molecule  
**Rôle** : Toggle (radio buttons) pour choisir entre Débit classique et Redébit

**Props** :
```typescript
interface BlockDateToggleProps {
  value: boolean
  onChange: (blockDate: boolean) => void
  disabled?: boolean
}
```

**Fonctionnalités** :
- ✅ Radio buttons stylisés
- ✅ Labels explicites
- ✅ Message d'aide contextuel
- ✅ Label avec indicateur "required"

**Logique** :
- `value = true` → Débit classique (BlockDate = true, Date exacte)
- `value = false` → Redébit (BlockDate = false, Date <= Today)

**Utilisation** :
```tsx
<BlockDateToggle
  value={blockDate}
  onChange={setBlockDate}
/>
```

---

### OP10BlockIDFilter.tsx

**Type** : Molecule  
**Rôle** : Dropdown pour filtrer par OP10 Block ID

**Props** :
```typescript
interface OP10BlockIDFilterProps {
  value?: 'EMPTY' | 'NO_CONDITION'
  onChange: (value: 'EMPTY' | 'NO_CONDITION' | undefined) => void
  disabled?: boolean
}
```

**Fonctionnalités** :
- ✅ 3 options : Pas de filtre / EMPTY / NO_CONDITION
- ✅ Message d'aide contextuel
- ✅ Label avec indicateur "optional"

**Logique** :
- `EMPTY` → Filtre les Shop Orders avec OP10 Block ID vide uniquement
- `NO_CONDITION` → Pas de filtrage sur OP10 Block ID
- `undefined` → Aucun filtrage supplémentaire

**Utilisation** :
```tsx
<OP10BlockIDFilter
  value={op10BlockId}
  onChange={setOP10BlockId}
/>
```

---

### FilterPanel.tsx

**Type** : Organism  
**Rôle** : Container regroupant tous les filtres avec validation et actions

**Props** :
```typescript
interface FilterPanelProps {
  onSearch: (params: ShopOrderFilterParams) => void
  loading?: boolean
}
```

**Fonctionnalités** :
- ✅ Regroupe les 5 composants de filtrage
- ✅ Validation côté client
- ✅ Gestion des erreurs de validation
- ✅ Bouton "Rechercher" avec loading state
- ✅ Bouton "Réinitialiser"
- ✅ Résumé visuel des filtres actifs
- ✅ Layout responsive (grid 2 colonnes sur desktop)

**États gérés** :
- `site` (string, required)
- `productionLine` (string, optional)
- `startDate` (string ISO 8601, required)
- `blockDate` (boolean, required)
- `op10BlockId` ('EMPTY' | 'NO_CONDITION' | undefined, optional)
- `errors` (Record<string, string>)

**Validation** :
- Site non vide
- Date non vide
- Format date YYYY-MM-DD

**Utilisation** :
```tsx
<FilterPanel
  onSearch={(params) => {
    console.log('Recherche avec:', params)
    // Appel API /api/part-printer/shop-orders/filter
  }}
  loading={isSearching}
/>
```

---

## 🎨 Design System

### Composants Atom utilisés

Tous les composants utilisent les atoms de `/shared/components/atoms/` :

- `Select` (shadcn/ui) - Dropdowns
- `Label` (shadcn/ui) - Labels de formulaire
- `Button` (shadcn/ui) - Boutons d'action

### Couleurs

| Usage | Classe Tailwind | Hex |
|-------|-----------------|-----|
| Required indicator | `text-red-500` | #EF4444 |
| Optional indicator | `text-gray-400` | #9CA3AF |
| Error message | `text-red-500` | #EF4444 |
| Help text | `text-gray-500` | #6B7280 |
| Active filters bg | `bg-blue-50` | #EFF6FF |
| Active filters text | `text-blue-900` | #1E3A8A |

### Spacing

- Gap entre composants : `gap-6` (1.5rem)
- Padding card : `p-6` (1.5rem)
- Margin bottom labels : `mb-2` (0.5rem)

---

## 🔄 Flux de données

```
┌─────────────────────────────────────────────────────────┐
│  FilterPanel (Organism)                                 │
│  ┌───────────────────────────────────────────────────┐ │
│  │  SiteSelector (Molecule)                          │ │
│  │  └─> Appel API: GET /api/shared/sites            │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  ProductionLineSelector (Molecule)                │ │
│  │  └─> Appel API: GET /api/part-printer/           │ │
│  │      production-lines?site={site}                 │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  BlockDateToggle (Molecule)                       │ │
│  │  └─> État local (boolean)                         │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  OP10BlockIDFilter (Molecule)                     │ │
│  │  └─> État local (string | undefined)              │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  [🔍 Rechercher] → onSearch(params)                    │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│  Parent Component (page.tsx)                            │
│  └─> Appel API: POST /api/part-printer/shop-orders/    │
│      filter                                             │
│  └─> Affichage résultats dans tableau                  │
└─────────────────────────────────────────────────────────┘
```

---

## 🧪 Tests

### Tests unitaires (TODO)

Chaque composant devrait avoir des tests pour :

**SiteSelector** :
- [ ] Render avec loading state
- [ ] Render avec error state
- [ ] Render avec liste de sites
- [ ] onChange déclenché lors de la sélection
- [ ] Disabled state

**ProductionLineSelector** :
- [ ] Render avec site non sélectionné (disabled)
- [ ] Render avec loading state
- [ ] Render avec error state
- [ ] Render avec liste de lignes
- [ ] Reset de la valeur quand site change
- [ ] onChange déclenché lors de la sélection

**BlockDateToggle** :
- [ ] Render avec value=true (Débit classique)
- [ ] Render avec value=false (Redébit)
- [ ] onChange déclenché lors du toggle
- [ ] Disabled state

**OP10BlockIDFilter** :
- [ ] Render avec value=undefined (Pas de filtre)
- [ ] Render avec value='EMPTY'
- [ ] Render avec value='NO_CONDITION'
- [ ] onChange déclenché lors de la sélection
- [ ] Disabled state

**FilterPanel** :
- [ ] Render avec tous les composants
- [ ] Validation site requis
- [ ] Validation date requise
- [ ] Validation format date
- [ ] onSearch déclenché avec paramètres corrects
- [ ] Reset réinitialise tous les champs
- [ ] Résumé filtres actifs affiché

---

## 📚 Références

### Documentation

- Types : `/src/tools/part-printer/types/index.ts`
- API Endpoints : `/docs/tools/part-printer/api/ENDPOINTS_PHASE2.md` (TODO)
- Roadmap : `/docs/tools/part-printer/ROADMAP.md`

### Dépendances

- shadcn/ui Select : `/shared/components/atoms/Select/`
- shadcn/ui Label : `/shared/components/atoms/Label/`
- shadcn/ui Button : `/shared/components/atoms/Button/`

---

**Maintenu par** : Équipe Manufacturing Portal  
**Version** : 1.0  
**Dernière mise à jour** : 14 octobre 2025
