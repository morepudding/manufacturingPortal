# 🎨 Refonte UX/UI Part Printer - Interface Simple et Rapide

**Date**: 27 octobre 2025  
**Version**: 2.0 - SIMPLIFIÉ ⚡  
**Statut**: 📋 Planification  
**Philosophie**: **TOUT SUR UNE PAGE - RAPIDE - ESPACE - CLARTÉ**

---

## 📋 Table des matières

1. [Philosophie](#philosophie)
2. [Interface cible](#interface-cible)
3. [Composants simples](#composants)
4. [Étapes de développement](#étapes)
5. [Design minimaliste](#design)

---

## 🎯 Philosophie {#philosophie}

### ❌ Ce qu'on NE veut PAS

- ❌ Stepper complexe avec navigation entre étapes
- ❌ Sidebar qui prend de la place inutilement
- ❌ Workflow avec back/forward entre pages
- ❌ Informations dupliquées partout
- ❌ Clics multiples pour arriver au résultat

### ✅ Ce qu'on VEUT

- ✅ **Tout sur UNE SEULE page** - scroll vertical simple
- ✅ **Filtres compacts** en haut - rapides à remplir
- ✅ **Résultats spacieux** en dessous - sélection immédiate
- ✅ **2 gros boutons** en bas - Aperçu / Imprimer
- ✅ **Beaucoup d'espace** - respiration visuelle
- ✅ **Grandes tailles** - facile avec gants
- ✅ **Workflow ultra-rapide** : Filtrer → Sélectionner → Imprimer (3 actions)

**Objectif temps** : De la recherche à l'impression en **moins de 15 secondes** ⚡

---

## 🖥️ Interface cible {#interface-cible}

### Layout simple - FORMULAIRE CENTRÉ

```
┌────────────────────────────────────────────────────────────┐
│  Header (navigation globale)                               │
├────────────────────────────────────────────────────────────┤
│                                                            │
│                    Part Printer                            │
│  ══════════════════════════════════════════                │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  1. REQUIRED SELECTIONS                              │ │
│  │                                                      │ │
│  │  Site (Contract) *                                   │ │
│  │  [LOV Contracts...                              ▼]   │ │
│  │                                                      │ │
│  │  Production Date *                                   │ │
│  │  [📅 YYYY-MM-DD                                  ]   │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  2. OPTIONAL FILTERS                                 │ │
│  │                                                      │ │
│  │  Production Line                                     │ │
│  │  [LOV Lines...                                  ▼]   │ │
│  │                                                      │ │
│  │  Block ID                                            │ │
│  │  [                                              ]    │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  3. ADVANCED OPTIONS                                 │ │
│  │                                                      │ │
│  │  ( ) Block Date          ( ) Sent To Cutting System  │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  4. PRINT TYPE                                       │ │
│  │                                                      │ │
│  │  (•) List Only           ( ) List + Labels           │ │
│  │                                                      │ │
│  │  Printer Selection *                                 │ │
│  │  [LOV Printers IFS...                           ▼]   │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│              [Cancel]    [Generate / Print]                │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  � PREVIEW (optionnel, collapsible)                 │ │
│  │                                                      │ │
│  │  ▼ 15 Shop Orders found                              │ │
│  │  ─────────────────────────────────────────────       │ │
│  │  463215  AN28-13-00  BDR-001  30 pcs                │ │
│  │  463216  AN28-13-01  BDR-002  25 pcs                │ │
│  │  ...                                                 │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Principe : FORMULAIRE EN 4 SECTIONS + Preview optionnel

**Focus principal = le formulaire**, pas les résultats

1. **Required Selections** (obligatoire)
   - Site (Contract) → LOV
   - Production Date → Date picker

2. **Optional Filters** (optionnel)
   - Production Line → LOV
   - Block ID → Text input

3. **Advanced Options** (radio buttons)
   - Block Date (Off par défaut)
   - Sent To Cutting System (Off par défaut)

4. **Print Type** (radio buttons)
   - List Only (sélectionné par défaut)
   - List + Labels
   - Printer Selection (LOV, required si List + Labels)

5. **Preview** (optionnel, collapsible/masqué)
   - Affichage simple des Shop Orders trouvés
   - Peut être masqué par défaut
   - Click pour expand

---

## 🧩 Composants simples {#composants}

### UN SEUL composant principal : FormulairePrincipal

**Fichier** : `src/app/(tools)/part-printer/page.tsx` (tout dans la page)

**Objectif** : Formulaire en 4 sections claires

```tsx
<div className="min-h-screen bg-gradient-to-br from-amber-950 via-orange-900 to-gray-900">
  <div className="container mx-auto px-6 py-12 max-w-3xl">
    
    {/* Titre */}
    <h1 className="text-4xl font-bold text-white mb-12 text-center">
      Part Printer
    </h1>

    {/* SECTION 1: REQUIRED SELECTIONS */}
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 mb-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="text-amber-400">1.</span>
        REQUIRED SELECTIONS
      </h2>

      <div className="space-y-6">
        {/* Site (Contract) */}
        <div>
          <Label className="text-base mb-3 block text-gray-300">
            Site (Contract) <span className="text-red-400">*</span>
          </Label>
          <Select 
            className="h-16 text-lg bg-gray-900/50 border-gray-600"
            value={site}
            onChange={(e) => setSite(e.target.value)}
          >
            <option value="">LOV Contracts...</option>
            {contracts.map(c => (
              <option key={c.Contract} value={c.Contract}>
                {c.ContractDesc}
              </option>
            ))}
          </Select>
        </div>

        {/* Production Date */}
        <div>
          <Label className="text-base mb-3 block text-gray-300">
            Production Date <span className="text-red-400">*</span>
          </Label>
          <Input 
            type="date"
            className="h-16 text-lg bg-gray-900/50 border-gray-600"
            value={productionDate}
            onChange={(e) => setProductionDate(e.target.value)}
          />
        </div>
      </div>
    </div>

    {/* SECTION 2: OPTIONAL FILTERS */}
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 mb-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="text-amber-400">2.</span>
        OPTIONAL FILTERS
      </h2>

      <div className="space-y-6">
        {/* Production Line */}
        <div>
          <Label className="text-base mb-3 block text-gray-300">
            Production Line
          </Label>
          <Select 
            className="h-16 text-lg bg-gray-900/50 border-gray-600"
            value={productionLine}
            onChange={(e) => setProductionLine(e.target.value)}
            disabled={!site}
          >
            <option value="">LOV Lines...</option>
            {lines.map(l => (
              <option key={l.LineId} value={l.LineId}>
                {l.LineDesc}
              </option>
            ))}
          </Select>
        </div>

        {/* Block ID */}
        <div>
          <Label className="text-base mb-3 block text-gray-300">
            Block ID
          </Label>
          <Input 
            type="text"
            className="h-16 text-lg bg-gray-900/50 border-gray-600"
            placeholder="Enter Block ID (optional)"
            value={blockId}
            onChange={(e) => setBlockId(e.target.value)}
          />
        </div>
      </div>
    </div>

    {/* SECTION 3: ADVANCED OPTIONS */}
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 mb-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="text-amber-400">3.</span>
        ADVANCED OPTIONS
      </h2>

      <div className="flex gap-8">
        {/* Block Date */}
        <label className="flex items-center gap-3 cursor-pointer flex-1">
          <input
            type="radio"
            name="advancedOption"
            value="blockDate"
            checked={advancedOption === 'blockDate'}
            onChange={(e) => setAdvancedOption(e.target.value)}
            className="w-6 h-6 text-amber-600"
          />
          <span className="text-lg text-gray-300">Block Date</span>
        </label>

        {/* Sent To Cutting System */}
        <label className="flex items-center gap-3 cursor-pointer flex-1">
          <input
            type="radio"
            name="advancedOption"
            value="sentToCutting"
            checked={advancedOption === 'sentToCutting'}
            onChange={(e) => setAdvancedOption(e.target.value)}
            className="w-6 h-6 text-amber-600"
          />
          <span className="text-lg text-gray-300">Sent To Cutting System</span>
        </label>
      </div>
    </div>

    {/* SECTION 4: PRINT TYPE */}
    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 mb-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="text-amber-400">4.</span>
        PRINT TYPE
      </h2>

      <div className="space-y-6">
        {/* Radio buttons Print Type */}
        <div className="flex gap-8">
          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <input
              type="radio"
              name="printType"
              value="listOnly"
              checked={printType === 'listOnly'}
              onChange={(e) => setPrintType(e.target.value)}
              className="w-6 h-6 text-amber-600"
            />
            <span className="text-lg text-gray-300">List Only</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <input
              type="radio"
              name="printType"
              value="listAndLabels"
              checked={printType === 'listAndLabels'}
              onChange={(e) => setPrintType(e.target.value)}
              className="w-6 h-6 text-amber-600"
            />
            <span className="text-lg text-gray-300">List + Labels</span>
          </label>
        </div>

        {/* Printer Selection (affiché si List + Labels) */}
        {printType === 'listAndLabels' && (
          <div>
            <Label className="text-base mb-3 block text-gray-300">
              Printer Selection <span className="text-red-400">*</span>
            </Label>
            <Select 
              className="h-16 text-lg bg-gray-900/50 border-gray-600"
              value={printer}
              onChange={(e) => setPrinter(e.target.value)}
            >
              <option value="">LOV Printers IFS...</option>
              {printers.map(p => (
                <option key={p.PrinterId} value={p.PrinterId}>
                  {p.Description}
                </option>
              ))}
            </Select>
          </div>
        )}
      </div>
    </div>

    {/* BOUTONS D'ACTION */}
    <div className="flex gap-6 mb-8">
      <Button
        variant="outline"
        className="flex-1 h-20 text-xl border-2 border-gray-600 text-gray-300"
        onClick={handleCancel}
      >
        Cancel
      </Button>

      <Button
        className="flex-1 h-20 text-xl bg-amber-600 hover:bg-amber-500"
        onClick={handleGeneratePrint}
        disabled={!site || !productionDate || (printType === 'listAndLabels' && !printer) || loading}
      >
        {loading ? (
          <Loader2 className="w-8 h-8 animate-spin mr-3" />
        ) : (
          <Printer className="w-8 h-8 mr-3" />
        )}
        Generate / Print
      </Button>
    </div>

    {/* PREVIEW (optionnel, collapsible) */}
    {shopOrders.length > 0 && (
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="text-lg font-semibold text-white flex items-center gap-3">
            <FileText className="w-6 h-6 text-amber-400" />
            Preview
            <span className="text-sm text-gray-400">
              ({shopOrders.length} Shop Orders found)
            </span>
          </h3>
          <ChevronDown 
            className={`w-6 h-6 text-gray-400 transition-transform ${
              showPreview ? 'rotate-180' : ''
            }`}
          />
        </button>

        {showPreview && (
          <div className="space-y-2">
            {shopOrders.map(order => (
              <div 
                key={order.id}
                className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg text-sm"
              >
                <span className="font-semibold text-white">{order.OrderNo}</span>
                <span className="text-gray-300">{order.PartNo}</span>
                <span className="text-gray-400">{order.BlockId}</span>
                <span className="text-amber-400 ml-auto">{order.Qty} pcs</span>
              </div>
            ))}
          </div>
        )}
      </div>
    )}

  </div>
</div>
```

**Caractéristiques** :
- ✅ Tout dans `page.tsx` (pas de composants séparés)
- ✅ 4 sections bien délimitées avec numéros
- ✅ Inputs grandes tailles `h-16`
- ✅ Radio buttons natifs HTML (simples et rapides)
- ✅ Printer Selection conditionnelle (si List + Labels)
- ✅ Preview collapsible (optionnel, masqué par défaut)
- ✅ Boutons Cancel / Generate XXL `h-20`

---

## 📋 Étapes de développement {#étapes}

### Phase UNIQUE : Formulaire en 4 sections (2-3 heures)

**Objectif** : Créer le formulaire centré dans `page.tsx`

#### Étape 1 : Structure des 4 sections (1h)

- [ ] Créer layout de base dans `page.tsx`
- [ ] Section 1: Required Selections (Site + Date)
- [ ] Section 2: Optional Filters (Line + Block ID)
- [ ] Section 3: Advanced Options (2 radio buttons)
- [ ] Section 4: Print Type (2 radio buttons + Printer LOV)

#### Étape 2 : Intégration APIs (30min-1h)

- [ ] Charger LOV Contracts (Site)
- [ ] Charger LOV Production Lines (filtré par Site)
- [ ] Charger LOV Printers
- [ ] Gérer états de chargement

#### Étape 3 : Logique d'impression (30min)

- [ ] Validation formulaire (champs requis)
- [ ] Appel API Generate/Print
- [ ] Gestion succès/erreurs
- [ ] Bouton Cancel (reset formulaire)

#### Étape 4 : Preview optionnel (30min - optionnel)

- [ ] Section collapsible en bas
- [ ] Afficher liste Shop Orders trouvés
- [ ] Toggle expand/collapse

**Total : 2-3 heures** (sans preview optionnel : 1h30-2h)

---

## 🎨 Design minimaliste {#design}

### Palette (Ambiance bois - conservée)

| Usage | Couleur | Classe Tailwind |
|-------|---------|-----------------|
| **Primary** | Amber | `amber-600` |
| **Hover** | Amber clair | `amber-500` |
| **Background** | Gray très sombre | `gray-900` |
| **Card** | Gray transparent | `gray-800/50` |
| **Input BG** | Gray dark transparent | `gray-900/50` |
| **Border** | Gray | `gray-600` |
| **Text Primary** | White | `white` / `gray-100` |
| **Text Secondary** | Gray clair | `gray-300` |
| **Text Muted** | Gray moyen | `gray-400` / `gray-500` |

### Tailles GRANDES (gants)

| Élément | Hauteur | Classe | Justification |
|---------|---------|--------|---------------|
| **Input/Select** | 64px | `h-16` | Facile manipulation gants |
| **Button CTA** | 96px | `h-24` | Très visible, gros clic |
| **Checkbox** | 28px | `w-7 h-7` | Clickable avec gants |
| **Card résultat** | Auto | `p-5` | Respiration, pas serré |
| **Label petit** | - | `text-sm` | Compact mais lisible |
| **Label standard** | - | `text-base` / `text-lg` | Corps de texte |
| **Titre** | - | `text-2xl` / `text-3xl` | Hiérarchie claire |

### Spacing GÉNÉREUX

```tsx
// Entre sections principales
className="space-y-8"     // 32px

// Entre cards résultats
className="space-y-3"     // 12px

// Padding cards
className="p-6"           // 24px (sections)
className="p-5"           // 20px (cards)

// Gap flexbox
className="gap-6"         // 24px (sections)
className="gap-4"         // 16px (filtres)
```

### Principes

1. **Pas de sidebar** → gaspillage d'espace
2. **Pas de stepper** → pas de workflow complexe
3. **1 couleur accent** → amber uniquement
4. **Beaucoup de gris** → focus sur les actions
5. **Espacement généreux** → confort visuel

### Composants shadcn/ui

```tsx
import { Button } from '@/shared/components/atoms/Button'
import { Input } from '@/shared/components/atoms/Input'
import { Label } from '@/shared/components/atoms/Label'
import { Select } from '@/shared/components/atoms/Select'
import { Checkbox } from '@/shared/components/atoms/Checkbox'

// Icônes
import { 
  Search, Printer, Eye, Package, 
  Loader2, CheckCircle 
} from 'lucide-react'
```

---

## ✅ Checklist

### Fichier principal

- [ ] `src/app/(tools)/part-printer/page.tsx` (tout-en-un)

### Structure formulaire

- [ ] Section 1: Required Selections (Site + Date)
- [ ] Section 2: Optional Filters (Line + Block ID)  
- [ ] Section 3: Advanced Options (Block Date / Sent To Cutting)
- [ ] Section 4: Print Type (List Only / List + Labels + Printer)
- [ ] Boutons Cancel / Generate Print

### APIs à appeler

- [ ] GET `/api/shared/contracts` → LOV Site
- [ ] GET `/api/part-printer/production-lines?site=XXX` → LOV Lines
- [ ] GET `/api/shared/printers` → LOV Printers
- [ ] POST `/api/part-printer/generate-print` → Génération + Impression

### Tests

- [ ] Site requis → Validation OK
- [ ] Date requise → Validation OK
- [ ] List + Labels → Printer requis
- [ ] List Only → Printer pas requis
- [ ] Cancel → Reset formulaire
- [ ] Generate → Appel API + succès/erreur
- [ ] Preview optionnel → Collapsible fonctionne

---

## 🎯 Résultat attendu

### Workflow utilisateur cible

**Scénario réel** :
1. ⏱️ **10 secondes** → Remplir formulaire (4 sections)
   - Site : sélectionner dans LOV
   - Date : choisir dans calendrier
   - (Optionnel) Line, Block ID
   - (Optionnel) Advanced options
   - Print Type : List Only ou List + Labels
   - (Si Labels) Sélectionner imprimante

2. ⏱️ **1 seconde** → Cliquer "Generate / Print"

3. ⏱️ **2-3 secondes** → API génère + imprime

**Total : ~13 secondes** ⚡

### Avant (actuel - complexe)

```
❌ Filtres + résultats + sélection + aperçu + impression
❌ Workflow en plusieurs étapes
❌ Sélection manuelle de chaque Shop Order
❌ Boutons multiples, navigation complexe
❌ Trop de clics pour arriver à l'impression
```

### Après (simplifié - FORMULAIRE)

```
✅ Formulaire en 4 sections claires et numérotées
✅ Tout sur une page (scroll simple)
✅ Résultats optionnels (preview collapsible)
✅ 1 bouton "Generate / Print" fait tout
✅ Workflow : Remplir → Imprimer (2 actions)
✅ Rapide : < 15 secondes
```

### Différence clé

| Aspect | Ancien (complexe) | Nouveau (formulaire) |
|--------|-------------------|----------------------|
| **Focus** | Résultats (Shop Orders) | Formulaire (critères) |
| **Sélection** | Manuelle (checkboxes) | Automatique (critères) |
| **Actions** | Multiples (rechercher, sélectionner, imprimer) | Unique (Generate / Print) |
| **Preview** | Obligatoire (tableau principal) | Optionnel (collapsible) |
| **Workflow** | 5 étapes | 1 formulaire |

---

## 📝 Notes finales

### Philosophie = FORMULAIRE SIMPLE

L'utilisateur veut **remplir des critères et imprimer** :
- ⚡ Pas de sélection manuelle de Shop Orders
- ⚡ Les critères déterminent automatiquement ce qui sera imprimé
- ⚡ Interface **formulaire classique** : remplir → valider
- ⚡ Grandes tailles = **facile avec gants**

### Design Pattern

**FORMULAIRE WIZARD EN 4 ÉTAPES VISUELLES**

Mais tout sur la même page (pas de navigation) :
1. Section numérotée "1. REQUIRED SELECTIONS"
2. Section numérotée "2. OPTIONAL FILTERS"
3. Section numérotée "3. ADVANCED OPTIONS"
4. Section numérotée "4. PRINT TYPE"

→ Guidage visuel clair sans complexité

### Inspirations

- ✅ **Formulaires administratifs** : sections numérotées, champs requis *
- ✅ **Interfaces industrielles** : grandes tailles, peu de clics
- ✅ **Print dialogs classiques** : options → print direct

### Key Points

| Aspect | Choix | Raison |
|--------|-------|--------|
| **Layout** | Formulaire centré (max-w-3xl) | Focus sur les critères |
| **Sections** | 4 blocs numérotés | Guidage progressif |
| **Résultats** | Optionnel (collapsible) | Pas le focus principal |
| **Actions** | 2 boutons (Cancel / Generate) | Simple et clair |
| **Radio buttons** | Natifs HTML | Rapides et accessibles |
| **Validation** | Champs requis * | Visible et explicite |

### Workflow Mental

**Utilisateur arrive sur la page** :
1. "Je dois remplir quoi ?" → 4 sections numérotées
2. "Qu'est-ce qui est obligatoire ?" → Astérisques rouges *
3. "Comment j'imprime ?" → Gros bouton "Generate / Print" en bas
4. "C'est fait !" → Confirmation + Preview optionnel

**Total : expérience linéaire et prévisible** ✅

---

**Document créé par** : GitHub Copilot  
**Date** : 27 octobre 2025  
**Version** : 3.0 - FORMULAIRE CENTRÉ 📝  
**Statut** : 📋 Prêt pour développement  
**Temps estimé** : 2-3 heures
