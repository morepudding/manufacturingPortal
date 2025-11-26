# 📊 SonarQube Issues - Manufacturing Portal

> **Dernière mise à jour**: 26 novembre 2025  
> **Projet**: `morepudding_manufacturingPortal`  
> **Branche**: `feature/architecture-v2`  
> ⚠️ *Les fichiers de tests sont exclus de ce rapport*

---

## 📈 Vue d'ensemble

| Criticité Réelle | Nombre | Effort estimé | Description |
|------------------|--------|---------------|-------------|
| 🔴 **CRITIQUE** | 1 | 30 min | Sécurité - Secret exposé |
| 🟠 **HIGH** | 3 | 8 min | Bugs potentiels |
| 🟡 **MEDIUM** | 54 | 214 min | Maintenabilité |
| ⚪ **LOW** | 82 | 549 min | Bonnes pratiques |
| **Total** | **140** | **~13h 20min** | |

---

## 🔴 CRITIQUE - Sécurité (1 issue)

⚠️ **À traiter immédiatement** - Secret potentiellement exposé

| Fichier | Ligne | Message | Effort |
|---------|-------|---------|--------|
| \`docker-compose.yml\` | L8 | Make sure this SQL Server password gets revoked, changed, and removed from the code | 30min |

**Action requise**: Utiliser des variables d'environnement ou Docker secrets au lieu d'un mot de passe en dur.

---

## 🟠 HIGH - Bugs Potentiels (3 issues)

Ces issues peuvent causer des comportements inattendus en runtime.

| Fichier | Ligne | Message | Effort | Rule |
|---------|-------|---------|--------|------|
| \`src/shared/components/organisms/DataTable/index.tsx\` | L50 | Unexpected empty object pattern | 5min | S3799 |
| \`src/shared/components/atoms/Table/index.tsx\` | L11 | Add a valid header row to this \`<table>\` | 2min | S5256 |
| \`src/app/globals.css\` | L2 | Unexpected unknown at-rule \`@config\` | 1min | S4662 |

---

## 🟡 MEDIUM - Maintenabilité (54 issues)

Issues affectant la lisibilité et la maintenabilité du code.

### 🔢 Préférer \`Number.parseInt/parseFloat\` (15 issues)

Utiliser les méthodes de l'objet \`Number\` plutôt que les fonctions globales.

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort |
|---------|--------|--------|
| \`src/tools/part-printer/services/label-pdf-service-table.ts\` | L123, L124, L186 | 6min |
| \`src/tools/part-printer/services/orchestrator-service.ts\` | L532, L533 | 4min |
| \`src/tools/part-printer/services/part-label-service.ts\` | L215, L216 | 4min |
| \`src/tools/part-printer/services/shop-order-filter-service.ts\` | L244 | 2min |
| \`src/shared/components/organisms/DynamicBreadcrumb/index.tsx\` | L87, L91, L95, L99, L103 | 10min |
| \`src/tools/boat-configuration/services/print-service.ts\` | L105, L106 | 4min |

</details>

**Fix rapide**: \`parseInt(x)\` → \`Number.parseInt(x, 10)\`

---

### ❓ Ternaires imbriqués à éviter (7 issues)

Les ternaires imbriqués réduisent la lisibilité.

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Ligne | Effort |
|---------|-------|--------|
| \`src/app/(tools)/part-printer/components/ProductionLineSelector.tsx\` | L105, L107 | 10min |
| \`src/app/(tools)/part-printer/components/ShopOrderTable.tsx\` | L63 | 5min |
| \`src/app/(tools)/part-printer/components/SiteSelector.tsx\` | L83 | 5min |
| \`src/shared/components/molecules/ButtonsList/index.tsx\` | L30 | 5min |
| \`src/shared/components/molecules/LanguageSelector/index.tsx\` | L78 | 5min |
| \`src/app/(tools)/boat-configuration/page.tsx\` | L451 | 5min |

</details>

**Fix**: Remplacer par des \`if/else\` ou extraire dans une fonction.

---

### 📐 Espacement JSX ambigu (6 issues)

Espaces entre accolades et texte pouvant causer des problèmes de rendu.

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort |
|---------|--------|--------|
| \`src/app/(tools)/part-printer/components/FilterPanel.tsx\` | L165 | 5min |
| \`src/app/(tools)/part-printer/components/PrintDialog.tsx\` | L190 | 5min |
| \`src/app/(tools)/part-printer/components/ShopOrderTable.tsx\` | L239, L244 | 10min |
| \`src/app/(tools)/boat-configuration/components/PrintExecution/index.tsx\` | L173, L188 | 10min |

</details>

---

### 📁 Préférer \`node:\` prefix pour imports Node.js (6 issues)

Utiliser le préfixe \`node:\` pour les imports Node.js natifs.

<details>
<summary>Voir les fichiers concernés</summary>

| Fichier | Lignes | Effort |
|---------|--------|--------|
| \`src/shared/components/organisms/DataTable/index.tsx\` | L32 | 5min |
| \`src/shared/components/molecules/ButtonLink/index.tsx\` | L2 | 5min |
| \`src/shared/components/molecules/ButtonWithIcon/index.tsx\` | L2 | 5min |
| \`vitest.config.mts\` | L4 | 5min |
| \`eslint.config.mjs\` | L1, L2 | 10min |

</details>

**Fix**: \`import path from 'path'\` → \`import path from 'node:path'\`

---

### 🗑️ Assignations inutiles - Dead Store (3 issues)

Variables assignées mais jamais utilisées.

| Fichier | Ligne | Effort |
|---------|-------|--------|
| \`src/app/(tools)/part-printer/components/ShopOrderTable.tsx\` | L71 | 1min |
| \`src/tools/part-printer/services/label-print-service.ts\` | L207 | 1min |
| \`src/tools/part-printer/services/orchestrator-service.ts\` | L530 | 1min |

---

### ♿ ARIA Roles - Accessibilité (3 issues)

Utiliser des éléments HTML natifs plutôt que des rôles ARIA.

| Fichier | Lignes | Effort |
|---------|--------|--------|
| \`src/shared/components/atoms/Breadcrumb/index.tsx\` | L65, L81, L96 | 15min |

---

### ⛓️ Optional Chaining manquant (2 issues)

Utiliser \`?.\` pour les accès potentiellement nulls.

| Fichier | Ligne | Effort |
|---------|-------|--------|
| \`src/shared/components/organisms/EditTable/index.tsx\` | L274 | 5min |
| \`src/shared/components/molecules/PrinterSearch/index.tsx\` | L50 | 5min |

---

### 🗑️ Préférer \`element.remove()\` (2 issues)

Utiliser la méthode moderne \`remove()\` au lieu de \`parentNode.removeChild()\`.

| Fichier | Ligne | Effort |
|---------|-------|--------|
| \`src/app/(tools)/part-printer/page.tsx\` | L191 | 2min |
| \`src/app/(tools)/boat-configuration/components/PrintExecution/index.tsx\` | L91 | 2min |

---

### 🏷️ Propriétés CSS inconnues (2 issues)

| Fichier | Ligne | Effort |
|---------|-------|--------|
| \`src/app/page.tsx\` | L281 | 10min |

---

### Autres issues MEDIUM (11 issues)

| Type | Fichier | Ligne | Effort |
|------|---------|-------|--------|
| Form Label non associé | \`src/app/(tools)/part-printer/components/FilterPanel.tsx\` | L120 | 5min |
| Composant défini dans parent | \`src/app/(tools)/part-printer/components/ShopOrderTable.tsx\` | L73 | 5min |
| Boolean method parameter | \`src/app/(tools)/part-printer/page.tsx\` | L80 | 15min |
| Readonly member | \`src/shared/services/ifs-client.ts\` | L24 | 2min |
| Interactive element | \`src/shared/components/organisms/BoatCarousel/index.tsx\` | L55 | 5min |
| Array index as key | \`src/shared/components/organisms/BoatCarousel/index.tsx\` | L116 | 5min |
| Code commenté | \`src/shared/components/organisms/DataTable/mock.ts\` | L55 | 5min |
| Heading sans contenu | \`src/shared/components/atoms/Card/index.tsx\` | L35 | 5min |

---

## ⚪ LOW - Bonnes Pratiques (82 issues)

Ces issues sont des améliorations mineures. Effort total: ~9h.

<details>
<summary>Voir le résumé</summary>

La plupart sont des issues de style ou de bonnes pratiques qui n'affectent pas le fonctionnement:
- Cognitive complexity (fonctions complexes mais fonctionnelles)
- Préférences de style de code
- Suggestions d'optimisation mineures

</details>

---

## 🎯 Plan d'action recommandé

### Priorité 1 - CRITIQUE (immédiat)

- [ ] **docker-compose.yml**: Remplacer le mot de passe SQL en dur par une variable d'environnement

\`\`\`yaml
# ❌ Avant
SA_PASSWORD: "M5-sq1_s8v"

# ✅ Après  
SA_PASSWORD: \${SQL_SA_PASSWORD}
\`\`\`

### Priorité 2 - HIGH (cette semaine)

- [ ] **DataTable**: Corriger le pattern objet vide
- [ ] **Table**: Ajouter un header valide
- [ ] **globals.css**: Vérifier la directive \`@config\` (Tailwind v4?)

### Priorité 3 - Quick Wins MEDIUM (~30min)

Ces corrections sont mécaniques et rapides:

- [ ] \`parseInt()\` → \`Number.parseInt(x, 10)\` (15 occurrences)
- [ ] Ajouter prefix \`node:\` aux imports (6 occurrences)
- [ ] \`parentNode.removeChild(el)\` → \`el.remove()\` (2 occurrences)

### Priorité 4 - Refactoring MEDIUM (si temps disponible)

- [ ] Simplifier les ternaires imbriqués
- [ ] Améliorer l'accessibilité (ARIA roles)
- [ ] Supprimer le code commenté

---

## 📊 Progression

| Date | CRITIQUE | HIGH | MEDIUM | LOW | Total | Actions |
|------|----------|------|--------|-----|-------|---------|
| 26/11 (initial) | - | 6 | 79 | - | 85 | Rapport initial |
| 26/11 (après fix) | **1** | **3** | **54** | 82 | 140 | 7 HIGH→fixés, reclassification, tests exclus |

---

## 🔗 Liens utiles

- [📊 SonarCloud Dashboard](https://sonarcloud.io/project/overview?id=morepudding_manufacturingPortal)
- [🐛 Toutes les issues](https://sonarcloud.io/project/issues?id=morepudding_manufacturingPortal)
- [📈 Mesures de code](https://sonarcloud.io/component_measures?id=morepudding_manufacturingPortal)
