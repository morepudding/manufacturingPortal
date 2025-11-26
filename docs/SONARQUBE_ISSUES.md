# 📊 SonarQube Issues - Manufacturing Portal

> **Dernière mise à jour**: 26 novembre 2025  
> **Projet**: `morepudding_manufacturingPortal`  
> **Branche**: `feature/architecture-v2`  
> ⚠️ *Les fichiers de tests sont exclus de ce rapport*

---

## 📈 Vue d'ensemble

| Sévérité | Nombre | Effort estimé |
|----------|--------|---------------|
| 🔴 **HIGH** | 6 | 70 min |
| 🟠 **MEDIUM** | 79 | 321 min |
| **Total** | **85** | **391 min** (~6h 31min) |

---

## 🔴 Issues HIGH (6 issues)

Ces issues doivent être traitées en priorité car elles impactent significativement la maintenabilité du code.


### 🧠 Cognitive Complexity - Fonctions trop complexes (4 issues)

| Fichier | Ligne | Message | Effort |
|---------|-------|---------|--------|
| `src/tools/boat-configuration/services/print-service.ts` | L69 | Refactor this function to reduce its Cognitive Complexity fr... | 12min |
| `src/tools/boat-configuration/services/shop-order-service.ts` | L51 | Refactor this function to reduce its Cognitive Complexity fr... | 8min |
| `src/app/(tools)/boat-configuration/page.tsx` | L105 | Refactor this function to reduce its Cognitive Complexity fr... | 11min |
| `src/app/api/boat-configuration/customer-orders/route.ts` | L31 | Refactor this function to reduce its Cognitive Complexity fr... | 9min |

### �� String Sort - Fonction de comparaison manquante (1 issues)

| Fichier | Ligne | Message | Effort |
|---------|-------|---------|--------|
| `src/tools/part-printer/services/site-service.ts` | L53 | Provide a compare function that depends on "String.localeCom... | 10min |

### 📦 Nested Functions - Fonctions imbriquées trop profondes (1 issues)

| Fichier | Ligne | Message | Effort |
|---------|-------|---------|--------|
| `src/shared/components/organisms/EditTable/index.tsx` | L284 | Refactor this code to not nest functions more than 4 levels ... | 20min |

---

## 🟠 Issues MEDIUM (79 issues)

Ces issues sont des améliorations recommandées pour la qualité du code.


### ⛓️ Optional Chain - Utiliser optional chaining `?.` (19 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/shared/components/molecules/PrinterSearch/index.tsx` | L50 | 5min |
| `src/shared/components/organisms/EditTable/index.tsx` | L238 | 5min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | L93, L137, L181, L228, L269, L295, L321, L373, L416, L455, L492, L536, L563, L581, L598, L615, L632 | 85min |

</details>

### 🔢 Number Methods - Préférer `Number.parseInt/parseFloat` (16 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/shared/components/organisms/DynamicBreadcrumb/index.tsx` | L87, L91, L95, L99, L103 | 10min |
| `src/tools/boat-configuration/services/print-service.ts` | L105, L106 | 4min |
| `src/tools/part-printer/services/label-pdf-service-table.ts` | L123, L124, L186 | 6min |
| `src/tools/part-printer/services/orchestrator-service.ts` | L532, L533 | 4min |
| `src/tools/part-printer/services/part-label-service.ts` | L215, L216 | 4min |
| `src/tools/part-printer/services/shop-order-filter-service.ts` | L244 | 2min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | L504 | 2min |

</details>

### ❓ Nested Ternary - Opérateurs ternaires imbriqués (7 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/app/(tools)/boat-configuration/page.tsx` | L415 | 5min |
| `src/app/(tools)/part-printer/components/ProductionLineSelector.tsx` | L105, L107 | 10min |
| `src/app/(tools)/part-printer/components/ShopOrderTable.tsx` | L63 | 5min |
| `src/app/(tools)/part-printer/components/SiteSelector.tsx` | L83 | 5min |
| `src/shared/components/molecules/ButtonsList/index.tsx` | L30 | 5min |
| `src/shared/components/molecules/LanguageSelector/index.tsx` | L78 | 5min |

</details>

### 📐 JSX Spacing - Espacement ambigu dans JSX (6 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/app/(tools)/boat-configuration/components/PrintExecution/index.tsx` | L173, L188 | 10min |
| `src/app/(tools)/part-printer/components/FilterPanel.tsx` | L165 | 5min |
| `src/app/(tools)/part-printer/components/PrintDialog.tsx` | L190 | 5min |
| `src/app/(tools)/part-printer/components/ShopOrderTable.tsx` | L239, L244 | 10min |

</details>

### 🗑️ Dead Store - Assignations inutiles (5 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/app/(tools)/part-printer/components/ShopOrderTable.tsx` | L71 | 1min |
| `src/tools/part-printer/services/label-print-service.ts` | L207 | 1min |
| `src/tools/part-printer/services/orchestrator-service.ts` | L530 | 1min |
| `tests/boat-configuration/integration/mocks/apim-handlers.ts` | L55, L463 | 2min |

</details>

### 📁 Node Protocol - Préférer `node:` prefix pour les imports (4 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/shared/components/molecules/ButtonLink/index.tsx` | L2 | 5min |
| `src/shared/components/molecules/ButtonWithIcon/index.tsx` | L2 | 5min |
| `src/shared/components/organisms/DataTable/index.tsx` | L32 | 5min |
| `vitest.config.mts` | L4 | 5min |

</details>

### ♿ ARIA Roles - Utiliser éléments natifs HTML (3 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/shared/components/atoms/Breadcrumb/index.tsx` | L65, L81, L96 | 15min |

</details>

### 🗑️ Remove Method - Préférer `element.remove()` (2 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/app/(tools)/boat-configuration/components/PrintExecution/index.tsx` | L91 | 2min |
| `src/app/(tools)/part-printer/page.tsx` | L191 | 2min |

</details>

### 📁 Node Protocol - Préférer `node:` prefix pour les imports (2 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `eslint.config.mjs` | L1, L2 | 10min |

</details>

### 🏷️ Unknown Property - Propriété CSS inconnue (2 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/app/page.tsx` | L281, L281 | 10min |

</details>

### 🏷️ Form Label - Label non associé à un contrôle (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/app/(tools)/part-printer/components/FilterPanel.tsx` | L120 | 5min |

</details>

### 🔄 Component Definition - Définir composants hors parent (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/app/(tools)/part-printer/components/ShopOrderTable.tsx` | L73 | 5min |

</details>

### 🔀 Boolean Method - Éviter paramètre boolean pour action (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/app/(tools)/part-printer/page.tsx` | L80 | 15min |

</details>

### 🔒 Readonly Member - Marquer comme readonly (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/shared/services/ifs-client.ts` | L24 | 2min |

</details>

### ♿ Interactive Elements - Éléments interactifs non-natifs (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/shared/components/organisms/BoatCarousel/index.tsx` | L55 | 5min |

</details>

### 🔑 Array Index Keys - Ne pas utiliser index comme key (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/shared/components/organisms/BoatCarousel/index.tsx` | L116 | 5min |

</details>

### 📭 Empty Pattern - Pattern objet vide inattendu (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/shared/components/organisms/DataTable/index.tsx` | L50 | 5min |

</details>

### 💬 Commented Code - Code commenté à supprimer (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/shared/components/organisms/DataTable/mock.ts` | L55 | 5min |

</details>

### 🔄 Map vs ForEach - Utiliser forEach si pas de retour (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/shared/components/organisms/EditTable/index.tsx` | L284 | 5min |

</details>

### ♿ Heading Content - En-têtes sans contenu accessible (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/shared/components/atoms/Card/index.tsx` | L35 | 5min |

</details>

### 📊 Table Header - Table sans en-tête valide (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/shared/components/atoms/Table/index.tsx` | L11 | 2min |

</details>

### 🔄 Redundant Assignment - Assignation redondante (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/app/api/boat-configuration/customer-orders/route.ts` | L95 | 5min |

</details>

### ⚙️ Unknown At-Rule - Règle CSS inconnue (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `src/app/globals.css` | L2 | 1min |

</details>

---

## 🎯 Plan d'action recommandé

### Priorité 1 - Issues HIGH (≈70 min)

1. **Réduire la Cognitive Complexity** des fonctions trop complexes
   - Extraire des sous-fonctions
   - Simplifier les conditions imbriquées
   - Utiliser early returns

2. **Corriger les fonctions imbriquées** trop profondes
   - Refactoriser en composants séparés

### Priorité 2 - Quick Wins MEDIUM

Ces corrections sont rapides et améliorent la cohérence du code :

- [ ] Remplacer `parseInt` → `Number.parseInt`
- [ ] Remplacer `parseFloat` → `Number.parseFloat`
- [ ] Utiliser optional chaining `?.`
- [ ] Préfixer imports Node.js avec `node:`

---

## 🔗 Liens utiles

- [📊 SonarCloud Dashboard](https://sonarcloud.io/project/overview?id=morepudding_manufacturingPortal)
- [🐛 Toutes les issues](https://sonarcloud.io/project/issues?id=morepudding_manufacturingPortal)
- [📈 Mesures de code](https://sonarcloud.io/component_measures?id=morepudding_manufacturingPortal)
