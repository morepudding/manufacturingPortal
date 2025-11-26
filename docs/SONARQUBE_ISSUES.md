# 📊 SonarQube Issues - Manufacturing Portal

> **Dernière mise à jour**: 26 novembre 2025  
> **Projet**: `morepudding_manufacturingPortal`  
> **Branche**: `feature/architecture-v2`

---

## 📈 Vue d'ensemble

| Sévérité | Nombre | Effort estimé |
|----------|--------|---------------|
| 🔴 **HIGH** | 11 | 125 min |
| 🟠 **MEDIUM** | 134 | 578 min |
| **Total** | **145** | **703 min** (~11h) |

---

## 🔴 Issues HIGH (11 issues)

Ces issues doivent être traitées en priorité car elles impactent significativement la maintenabilité du code.


### 🧠 Cognitive Complexity - Fonctions trop complexes (5 issues)

| Fichier | Ligne | Effort |
|---------|-------|--------|
| [test-helpers.ts](tests/boat-configuration/e2e/helpers/test-helpers.ts) | L33 | 7min |
| [print-service.ts](src/tools/boat-configuration/services/print-service.ts) | L69 | 12min |
| [shop-order-service.ts](src/tools/boat-configuration/services/shop-order-service.ts) | L51 | 8min |
| [page.tsx](src/app/(tools)/boat-configuration/page.tsx) | L105 | 11min |
| [route.ts](src/app/api/boat-configuration/customer-orders/route.ts) | L31 | 9min |

### 🧠 Cognitive Complexity - Fonctions trop complexes (4 issues)

| Fichier | Ligne | Effort |
|---------|-------|--------|
| [explore-pdf-download-methods.js](src/testscript/explore-pdf-download-methods.js) | L93 | 20min |
| [template.js](src/testscript/template.js) | L96 | 9min |
| [test-customer-order.js](src/testscript/test-customer-order.js) | L110 | 13min |
| [validate-complete-workflow.js](src/testscript/validate-complete-workflow.js) | L217 | 6min |

### 🔤 String Sort - Fonction de comparaison manquante (1 issues)

| Fichier | Ligne | Effort |
|---------|-------|--------|
| [site-service.ts](src/tools/part-printer/services/site-service.ts) | L53 | 10min |

### 📦 Nested Functions - Fonctions imbriquées trop profondes (1 issues)

| Fichier | Ligne | Effort |
|---------|-------|--------|
| [index.tsx](src/shared/components/organisms/EditTable/index.tsx) | L284 | 20min |

---

## 🟠 Issues MEDIUM (134 issues)

Ces issues sont des améliorations recommandées pour la qualité du code.


### 📁 Node Protocol - Préférer `node:` prefix pour les imports (25 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `eslint.config.mjs` | L1, L2 | 10min |
| `explore-pdf-download-methods.js` | L7, L8 | 10min |
| `explore-print-endpoints.js` | L9 | 5min |
| `final-print-workflow.js` | L16, L17 | 10min |
| `quick-test-customer-order.js` | L5 | 5min |
| `search-and-test-reportids.js` | L7 | 5min |
| `template.js` | L5, L6 | 10min |
| `test-complete-print-workflow.js` | L12 | 5min |
| `test-customer-order-by-orderno.js` | L5 | 5min |
| `test-customer-order-optimized.js` | L8 | 5min |
| `test-customer-order-search-strategies.js` | L5 | 5min |
| `test-customer-order-service.js` | L12, L13 | 10min |
| `test-customer-order.js` | L6, L7 | 10min |
| `test-print-api.js` | L14, L15 | 10min |
| `test-print-resultkey.js` | L11 | 5min |
| `test-shoporder-customer-fields.js` | L6 | 5min |
| `validate-complete-workflow.js` | L7, L8 | 10min |

</details>

### ⛓️ Optional Chain - Utiliser optional chaining `?.` (19 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `index.tsx` | L50 | 5min |
| `index.tsx` | L238 | 5min |
| `apim-handlers.ts` | L93, L137, L181, L228, L269, L295, L321, L373, L416, L455, L492, L536, L563, L581, L598, L615, L632 | 85min |

</details>

### 🔢 Number Methods - Préférer `Number.parseInt/parseFloat` (17 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `index.tsx` | L87, L91, L95, L99, L103 | 10min |
| `print-service.ts` | L105, L106 | 4min |
| `label-pdf-service-table.ts` | L123, L124, L186 | 6min |
| `orchestrator-service.ts` | L532, L533 | 4min |
| `part-label-service.ts` | L215, L216 | 4min |
| `shop-order-filter-service.ts` | L244 | 2min |
| `print.test.ts` | L377 | 2min |
| `apim-handlers.ts` | L504 | 2min |

</details>

### ⏳ Top-level Await - Préférer top-level await (16 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `explore-pdf-download-methods.js` | L243 | 5min |
| `explore-print-endpoints.js` | L327 | 5min |
| `final-print-workflow.js` | L423 | 5min |
| `quick-test-customer-order.js` | L131 | 5min |
| `search-and-test-reportids.js` | L331 | 5min |
| `template.js` | L96 | 5min |
| `test-complete-print-workflow.js` | L371 | 5min |
| `test-customer-order-by-orderno.js` | L130 | 5min |
| `test-customer-order-optimized.js` | L209 | 5min |
| `test-customer-order-search-strategies.js` | L204 | 5min |
| `test-customer-order-service.js` | L309 | 5min |
| `test-customer-order.js` | L110 | 5min |
| `test-print-api.js` | L155 | 5min |
| `test-print-resultkey.js` | L206 | 5min |
| `test-shoporder-customer-fields.js` | L213 | 5min |
| `validate-complete-workflow.js` | L336 | 5min |

</details>

### ❓ Nested Ternary - Opérateurs ternaires imbriqués (11 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `page.tsx` | L415 | 5min |
| `ProductionLineSelector.tsx` | L105, L107 | 10min |
| `ShopOrderTable.tsx` | L63 | 5min |
| `SiteSelector.tsx` | L83 | 5min |
| `index.tsx` | L30 | 5min |
| `index.tsx` | L78 | 5min |
| `test-helpers.ts` | L61, L63, L102, L104 | 20min |

</details>

### 🗑️ Dead Store - Assignations inutiles (6 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `ShopOrderTable.tsx` | L71 | 1min |
| `label-print-service.ts` | L207 | 1min |
| `orchestrator-service.ts` | L530 | 1min |
| `test-helpers.ts` | L34 | 1min |
| `apim-handlers.ts` | L55, L463 | 2min |

</details>

### 📁 Node Protocol - Préférer `node:` prefix pour les imports (6 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `index.tsx` | L2 | 5min |
| `index.tsx` | L2 | 5min |
| `index.tsx` | L32 | 5min |
| `test-helpers.ts` | L124, L125 | 10min |
| `vitest.config.mts` | L4 | 5min |

</details>

### 📐 JSX Spacing - Espacement ambigu dans JSX (6 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `index.tsx` | L173, L188 | 10min |
| `FilterPanel.tsx` | L165 | 5min |
| `PrintDialog.tsx` | L190 | 5min |
| `ShopOrderTable.tsx` | L239, L244 | 10min |

</details>

### ♿ ARIA Roles - Utiliser éléments natifs HTML (3 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `index.tsx` | L65, L81, L96 | 15min |

</details>

### 🗑️ Dead Store - Assignations inutiles (3 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `explore-print-endpoints.js` | L224 | 1min |
| `final-print-workflow.js` | L353 | 1min |
| `test-complete-print-workflow.js` | L314 | 1min |

</details>

### 🔢 Number Methods - Préférer `Number.parseInt/parseFloat` (3 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `final-print-workflow.js` | L189 | 2min |
| `test-complete-print-workflow.js` | L205 | 2min |
| `validate-complete-workflow.js` | L195 | 2min |

</details>

### 🗑️ Remove Method - Préférer `element.remove()` (2 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `index.tsx` | L91 | 2min |
| `page.tsx` | L191 | 2min |

</details>

### 🏷️ Unknown Property - Propriété CSS inconnue (2 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `page.tsx` | L281, L281 | 10min |

</details>

### 📝 Nested Templates - Templates littéraux imbriqués (2 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `validate-complete-workflow.js` | L245, L310 | 20min |

</details>

### 🏷️ Form Label - Label non associé à un contrôle (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `FilterPanel.tsx` | L120 | 5min |

</details>

### 🔄 Component Definition - Définir composants hors parent (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `ShopOrderTable.tsx` | L73 | 5min |

</details>

### 🔀 Boolean Method - Éviter paramètre boolean pour action (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `page.tsx` | L80 | 15min |

</details>

### 🔒 Readonly Member - Marquer comme readonly (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `ifs-client.ts` | L24 | 2min |

</details>

### ♿ Interactive Elements - Éléments interactifs non-natifs (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `index.tsx` | L55 | 5min |

</details>

### 🔑 Array Index Keys - Ne pas utiliser index comme key (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `index.tsx` | L116 | 5min |

</details>

### 📭 Empty Pattern - Pattern objet vide inattendu (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `index.tsx` | L50 | 5min |

</details>

### 💬 Commented Code - Code commenté à supprimer (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `mock.ts` | L55 | 5min |

</details>

### 🔄 Map vs ForEach - Utiliser forEach si pas de retour (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `index.tsx` | L284 | 5min |

</details>

### ♿ Heading Content - En-têtes sans contenu accessible (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `index.tsx` | L35 | 5min |

</details>

### 📊 Table Header - Table sans en-tête valide (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `index.tsx` | L11 | 2min |

</details>

### 🔄 Redundant Assignment - Assignation redondante (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `route.ts` | L95 | 5min |

</details>

### ⚙️ Unknown At-Rule - Règle CSS inconnue (1 issues)

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort total |
|---------|--------|-------------|
| `globals.css` | L2 | 1min |

</details>

---

## 🎯 Plan d'action recommandé

### Priorité 1 - Issues HIGH (≈125 min)

1. **Réduire la Cognitive Complexity** des fonctions trop complexes
   - Extraire des sous-fonctions
   - Simplifier les conditions imbriquées
   - Utiliser early returns

2. **Corriger les fonctions imbriquées** trop profondes
   - Refactoriser en composants séparés

### Priorité 2 - Quick Wins MEDIUM

Ces corrections sont rapides et améliorent la cohérence du code :

- [ ] Remplacer `parseInt` → `Number.parseInt` (~20 occurrences)
- [ ] Remplacer `parseFloat` → `Number.parseFloat`
- [ ] Utiliser optional chaining `?.` (~19 occurrences)
- [ ] Préfixer imports Node.js avec `node:` (~31 occurrences)

### Fichiers à exclure de l'analyse

Certains fichiers (scripts de test, etc.) peuvent être exclus :
- `src/testscript/` - Scripts de test temporaires
- `tests/` - Fichiers de tests (déjà partiellement exclus)

---

## 🔗 Liens utiles

- [📊 SonarCloud Dashboard](https://sonarcloud.io/project/overview?id=morepudding_manufacturingPortal)
- [🐛 Toutes les issues](https://sonarcloud.io/project/issues?id=morepudding_manufacturingPortal)
- [📈 Mesures de code](https://sonarcloud.io/component_measures?id=morepudding_manufacturingPortal)
