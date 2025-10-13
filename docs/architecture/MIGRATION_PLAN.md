# 🔄 Plan de Migration - Architecture v2.0

**Date de début** : 14 octobre 2025  
**Date de fin estimée** : 11 novembre 2025  
**Durée totale** : 4 semaines

---

## 📋 Vue d'ensemble

Ce document détaille le plan de migration de l'architecture actuelle (v1) vers la nouvelle architecture multi-outils (v2). La migration doit être effectuée **sans régression** sur l'outil Boat Configuration existant.

### Objectifs

1. ✅ Restructurer le code pour supporter plusieurs outils
2. ✅ Isoler le code spécifique de Boat Configuration
3. ✅ Créer une base solide pour Part Printer et futurs outils
4. ✅ Maintenir la fonctionnalité existante
5. ✅ Améliorer la maintenabilité

---

## 📅 Planning détaillé

### Semaine 1 (14-20 Oct) : Préparation & Shared Components

#### ✅ Jour 1 (Lundi 14) : Setup initial - COMPLÉTÉ

**Tâches** :
- [x] Créer branche `feature/architecture-v2`
- [x] Créer nouvelle structure de dossiers
- [x] Mettre à jour `tsconfig.json` avec les paths
- [x] Créer fichier de migration tracking

**Commandes** :
```bash
# Créer la branche
git checkout -b feature/architecture-v2

# Créer structure
mkdir -p src/shared/{components,services,hooks,types,utils}
mkdir -p src/shared/components/{atoms,molecules,organisms}
mkdir -p src/tools/{boat-configuration,part-printer}
mkdir -p src/app/\(tools\)/{boat-configuration,part-printer}
mkdir -p src/app/api/{shared,boat-configuration,part-printer}

# Créer README.md dans chaque dossier
touch src/shared/README.md
touch src/tools/README.md
touch src/app/\(tools\)/README.md
```

**Livrables** :
- ✅ Structure de dossiers créée
- ✅ tsconfig.json mis à jour
- ✅ Documentation initialisée

#### Jour 2 (Mardi 15) : Migration Atoms

**Tâches** :
- [ ] Migrer tous les composants `/src/components/atoms` → `/src/shared/components/atoms`
- [ ] Mettre à jour les imports dans les composants atoms
- [ ] Tester chaque composant isolément

**Composants à migrer** :
```bash
# Liste des composants
src/components/atoms/
├── Button.tsx → src/shared/components/atoms/Button.tsx
├── Input.tsx → src/shared/components/atoms/Input.tsx
├── Label.tsx → src/shared/components/atoms/Label.tsx
├── Select.tsx → src/shared/components/atoms/Select.tsx
├── Table.tsx → src/shared/components/atoms/Table.tsx
├── Card.tsx → src/shared/components/atoms/Card.tsx
└── ... (tous les atoms)
```

**Script de migration** :
```bash
# Copier (pas déplacer encore, pour éviter la casse)
cp -r src/components/atoms/* src/shared/components/atoms/

# Mettre à jour les imports automatiquement
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i "s|@/components/atoms|@/shared/components/atoms|g"
```

**Tests** :
```bash
pnpm run test src/shared/components/atoms
pnpm run build # Vérifier qu'il n'y a pas d'erreurs
```

**Livrables** :
- ✅ Tous les atoms migrés
- ✅ Tests passent
- ✅ Pas d'erreurs de compilation

#### Jour 3 (Mercredi 16) : Migration Molecules

**Tâches** :
- [ ] Migrer `/src/components/molecules` → `/src/shared/components/molecules`
- [ ] Mettre à jour les imports
- [ ] Tester les composants

**Composants à migrer** :
```bash
src/components/molecules/
├── InputWithLabel.tsx
├── SearchBar.tsx
├── Dialog.tsx
└── ... (tous les molecules)
```

**Script** :
```bash
cp -r src/components/molecules/* src/shared/components/molecules/
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i "s|@/components/molecules|@/shared/components/molecules|g"
```

**Tests** :
```bash
pnpm run test src/shared/components/molecules
pnpm run build
```

**Livrables** :
- ✅ Tous les molecules migrés
- ✅ Tests passent

#### Jour 4 (Jeudi 17) : Migration Organisms

**Tâches** :
- [ ] Migrer `/src/components/organisms` → `/src/shared/components/organisms`
- [ ] Identifier les composants spécifiques à Boat Config (à ne pas migrer)
- [ ] Mettre à jour les imports
- [ ] Tester les composants

**Composants partagés** :
```bash
src/components/organisms/
├── DataTable.tsx → SHARED (utilisé par plusieurs outils)
├── Header.tsx → SHARED (header commun)
└── BoatCarousel.tsx → SHARED (home page)
```

**Composants spécifiques Boat Config** (à déplacer vers tools/) :
```bash
src/components/organisms/
├── ShopOrderSearchForm.tsx → tools/boat-configuration/
└── SerialNumberDisplay.tsx → tools/boat-configuration/
```

**Livrables** :
- ✅ Organisms partagés migrés
- ✅ Organisms spécifiques identifiés

#### Jour 5 (Vendredi 18) : Migration Services Partagés

**Tâches** :
- [ ] Migrer `ifs-client.ts` → `shared/services/`
- [ ] Migrer `printer-service.ts` → `shared/services/`
- [ ] Migrer `language-service.ts` → `shared/services/`
- [ ] Mettre à jour les imports
- [ ] Tester les services

**Script** :
```bash
# Copier les services partagés
cp src/lib/ifs-client.ts src/shared/services/
cp src/lib/printer-service.ts src/shared/services/
cp src/lib/language-service.ts src/shared/services/

# Mettre à jour les imports
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i "s|@/lib/ifs-client|@/shared/services/ifs-client|g"
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i "s|@/lib/printer-service|@/shared/services/printer-service|g"
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i "s|@/lib/language-service|@/shared/services/language-service|g"
```

**Tests** :
```bash
pnpm run test src/shared/services
```

**Livrables** :
- ✅ 3 services partagés migrés
- ✅ Tests passent

---

### Semaine 2 (21-27 Oct) : Migration Boat Configuration

#### Jour 6 (Lundi 21) : Créer structure Boat Configuration

**Tâches** :
- [ ] Créer structure complète dans `tools/boat-configuration/`
- [ ] Créer structure dans `app/(tools)/boat-configuration/`
- [ ] Créer documentation

**Structure** :
```bash
mkdir -p src/tools/boat-configuration/{services,types}
mkdir -p src/app/\(tools\)/boat-configuration/components
mkdir -p src/app/api/boat-configuration
```

**Livrables** :
- ✅ Structure créée
- ✅ README.md dans chaque dossier

#### Jour 7 (Mardi 22) : Migrer Services Boat Config

**Tâches** :
- [ ] Migrer tous les services spécifiques Boat Config
- [ ] Mettre à jour les imports
- [ ] Tester les services

**Services à migrer** :
```bash
src/lib/shop-order-service.ts → src/tools/boat-configuration/services/
src/lib/serial-number-service.ts → src/tools/boat-configuration/services/
src/lib/dop-service.ts → src/tools/boat-configuration/services/
src/lib/customer-order-service.ts → src/tools/boat-configuration/services/
src/lib/print-service.ts → src/tools/boat-configuration/services/
```

**Script** :
```bash
# Copier les services
cp src/lib/shop-order-service.ts src/tools/boat-configuration/services/
cp src/lib/serial-number-service.ts src/tools/boat-configuration/services/
cp src/lib/dop-service.ts src/tools/boat-configuration/services/
cp src/lib/customer-order-service.ts src/tools/boat-configuration/services/
cp src/lib/print-service.ts src/tools/boat-configuration/services/

# Mettre à jour imports dans les services
find src/tools/boat-configuration/services -name "*.ts" | xargs sed -i "s|@/lib/ifs-client|@/shared/services/ifs-client|g"
```

**Livrables** :
- ✅ 5 services migrés
- ✅ Tests passent

#### Jour 8 (Mercredi 23) : Migrer Types Boat Config

**Tâches** :
- [ ] Créer types spécifiques dans `tools/boat-configuration/types/`
- [ ] Séparer les types IFS communs (vers `shared/types/ifs/`)
- [ ] Mettre à jour les imports

**Types à créer** :
```typescript
// src/tools/boat-configuration/types/shop-order.ts
export interface ShopOrder {
  OrderNo: string
  ReleaseNo: string
  SequenceNo: string
  DopId: string
  // ...
}

// src/tools/boat-configuration/types/serial-number.ts
export interface SerialNumber {
  SerialNo: string
  DopHeaderId: string
  // ...
}

// src/tools/boat-configuration/types/customer-order.ts
export interface CustomerOrder {
  OrderNo: string
  SerialNo: string
  // ...
}
```

**Livrables** :
- ✅ Types créés et documentés
- ✅ Imports mis à jour

#### Jour 9 (Jeudi 24) : Migrer Composants Boat Config

**Tâches** :
- [ ] Identifier composants spécifiques à Boat Config
- [ ] Migrer vers `app/(tools)/boat-configuration/components/`
- [ ] Mettre à jour les imports
- [ ] Tester les composants

**Composants spécifiques** :
```bash
# À identifier et migrer
src/components/organisms/ShopOrderSearchForm.tsx
src/components/organisms/SerialNumberDisplay.tsx
# etc.
```

**Livrables** :
- ✅ Composants spécifiques migrés
- ✅ Tests passent

#### Jour 10 (Vendredi 25) : Migrer API Routes Boat Config

**Tâches** :
- [ ] Réorganiser API routes vers `api/boat-configuration/`
- [ ] Séparer APIs partagées vers `api/shared/`
- [ ] Mettre à jour les imports
- [ ] Tester les endpoints

**Migration** :
```bash
# API Routes spécifiques Boat Config
mv src/app/api/shop-orders src/app/api/boat-configuration/
mv src/app/api/serial-numbers src/app/api/boat-configuration/
mv src/app/api/customer-orders src/app/api/boat-configuration/
mv src/app/api/print src/app/api/boat-configuration/

# API Routes partagées
mkdir -p src/app/api/shared
mv src/app/api/printers src/app/api/shared/
mv src/app/api/languages src/app/api/shared/
```

**Mettre à jour les endpoints dans le frontend** :
```typescript
// Avant
POST /api/shop-orders/search

// Après
POST /api/boat-configuration/shop-orders/search
```

**Livrables** :
- ✅ API Routes réorganisées
- ✅ Endpoints fonctionnels
- ✅ Tests passent

---

### Semaine 3 (28 Oct - 3 Nov) : Migrer Pages & Cleanup

#### Jour 11 (Lundi 28) : Migrer Page Boat Configuration

**Tâches** :
- [ ] Créer `/app/(tools)/boat-configuration/page.tsx`
- [ ] Créer `/app/(tools)/boat-configuration/layout.tsx`
- [ ] Migrer la logique de `/app/boat-configuration/`
- [ ] Mettre à jour les imports
- [ ] Tester la page complète

**Structure** :
```bash
src/app/(tools)/boat-configuration/
├── layout.tsx
├── page.tsx
└── components/
    ├── ShopOrderSearch.tsx
    ├── SerialNumberDisplay.tsx
    └── PrintDialog.tsx
```

**Livrables** :
- ✅ Page migrée et fonctionnelle
- ✅ Route `/boat-configuration` fonctionne

#### Jour 12 (Mardi 29) : Mettre à jour Home Page

**Tâches** :
- [ ] Mettre à jour `/app/page.tsx` avec nouveaux paths
- [ ] Vérifier que les liens fonctionnent
- [ ] Tester la navigation

**Changements** :
```tsx
// Avant
<Link href="/boat-configuration">

// Après (même chemin, mais nouvelle structure)
<Link href="/boat-configuration">
```

**Livrables** :
- ✅ Home page mise à jour
- ✅ Navigation fonctionnelle

#### Jour 13 (Mercredi 30) : Cleanup ancien code

**Tâches** :
- [ ] Supprimer ancien dossier `/src/components/` (vidé)
- [ ] Supprimer ancien dossier `/src/lib/` (services migrés)
- [ ] Supprimer ancien `/app/boat-configuration/` (migré)
- [ ] Vérifier qu'aucun import cassé

**Vérifications** :
```bash
# Rechercher les imports cassés
grep -r "@/components/atoms" src/
grep -r "@/components/molecules" src/
grep -r "@/components/organisms" src/
grep -r "@/lib/" src/

# Si rien trouvé, supprimer
rm -rf src/components
rm -rf src/lib
rm -rf src/app/boat-configuration
```

**Livrables** :
- ✅ Code ancien supprimé
- ✅ Pas d'imports cassés

#### Jour 14 (Jeudi 31) : Tests complets

**Tâches** :
- [ ] Lancer tous les tests unitaires
- [ ] Lancer tests E2E
- [ ] Tester manuellement Boat Config
- [ ] Vérifier le build production

**Commandes** :
```bash
# Tests unitaires
pnpm run test

# Coverage
pnpm run coverage

# Build production
pnpm run build

# Démarrer en prod localement
pnpm run start
```

**Cas de test Boat Config** :
- [ ] Recherche Shop Order 97277 → Serial LG5MA0114
- [ ] Recherche Shop Order 563 → Serial JY6MB0019
- [ ] Recherche Shop Order 949 → Serial LX6MA0116
- [ ] Recherche Shop Order 1043 → Serial LX6MA0115
- [ ] Sélection imprimante et langue
- [ ] Impression PDF

**Livrables** :
- ✅ Tous les tests passent
- ✅ Coverage > 80%
- ✅ Build réussit
- ✅ Boat Config fonctionne parfaitement

#### Jour 15 (Vendredi 1er) : Documentation

**Tâches** :
- [ ] Mettre à jour README principal
- [ ] Mettre à jour documentation Boat Config
- [ ] Créer guide de migration pour les devs
- [ ] Mettre à jour `.github/copilot-instructions.md`

**Documents à créer/mettre à jour** :
- [ ] `/README.md` - Vue d'ensemble du projet
- [ ] `/docs/architecture/MULTI_TOOL_ARCHITECTURE.md` - Architecture détaillée
- [ ] `/docs/architecture/MIGRATION_GUIDE.md` - Guide de migration
- [ ] `/docs/tools/boat-configuration/README.md` - Mise à jour avec nouvelle structure
- [ ] `/.github/copilot-instructions.md` - Mise à jour instructions Copilot

**Livrables** :
- ✅ Documentation complète et à jour

---

### Semaine 4 (4-10 Nov) : Review, Validation & Merge

#### Jour 16-17 (Lundi 4 - Mardi 5) : Code Review

**Tâches** :
- [ ] Auto-review complet
- [ ] Vérifier les conventions de code
- [ ] Vérifier la qualité des tests
- [ ] Vérifier la documentation

**Checklist Code Review** :
- [ ] TypeScript strict mode respecté
- [ ] Pas de `any` types
- [ ] JSDoc sur toutes les fonctions publiques
- [ ] Tests pour tous les services
- [ ] Tests pour tous les composants
- [ ] Imports organisés
- [ ] Pas de code commenté/mort
- [ ] Logs appropriés

**Livrables** :
- ✅ Code review checklist complétée
- ✅ Corrections effectuées

#### Jour 18 (Mercredi 6) : Validation utilisateurs

**Tâches** :
- [ ] Déployer sur environnement AST
- [ ] Tests avec utilisateurs finaux
- [ ] Collecter feedback
- [ ] Faire ajustements si nécessaire

**Test avec utilisateurs** :
- [ ] Opérateur 1 : Workflow complet Boat Config
- [ ] Opérateur 2 : Workflow complet Boat Config
- [ ] Supervisor : Vérification données

**Livrables** :
- ✅ Application testée par utilisateurs
- ✅ Feedback documenté
- ✅ Ajustements effectués

#### Jour 19 (Jeudi 7) : Préparation Merge

**Tâches** :
- [ ] Rebaser sur `main`
- [ ] Résoudre les conflits
- [ ] Lancer tous les tests
- [ ] Build final

**Commandes** :
```bash
# Rebaser
git checkout main
git pull origin main
git checkout feature/architecture-v2
git rebase main

# Résoudre conflits si nécessaire

# Tests finaux
pnpm run lint
pnpm run test
pnpm run build
```

**Livrables** :
- ✅ Branche à jour avec main
- ✅ Pas de conflits
- ✅ Tous les tests passent

#### Jour 20 (Vendredi 8) : Merge & Déploiement

**Tâches** :
- [ ] Créer Pull Request
- [ ] Review finale
- [ ] Merger dans `main`
- [ ] Déployer en production
- [ ] Monitoring post-déploiement

**Pull Request** :
```markdown
# Migration Architecture v2.0

## Description
Migration de l'architecture vers une structure multi-outils scalable.

## Changements principaux
- ✅ Restructuration complète du code
- ✅ Séparation shared/tools
- ✅ Migration Boat Configuration
- ✅ Documentation complète
- ✅ Tests 100% fonctionnels

## Tests
- ✅ Tous les tests unitaires passent (Coverage: 85%)
- ✅ Tests E2E passent
- ✅ Build production réussit
- ✅ Validé par utilisateurs

## Breaking Changes
Aucun - Migration transparente pour les utilisateurs

## Documentation
- ✅ Architecture documentée
- ✅ Guide de migration créé
- ✅ README mis à jour
```

**Déploiement** :
```bash
# Déployer
git checkout main
git pull origin main
pnpm run build
# Deploy to production (Azure, etc.)

# Monitoring
# Vérifier les logs
# Vérifier les metrics
# Vérifier que tout fonctionne
```

**Livrables** :
- ✅ PR mergée
- ✅ Déployé en production
- ✅ Monitoring actif
- ✅ Aucune régression

---

## 🔍 Checkpoints de validation

### Checkpoint 1 (Fin Semaine 1)

**Critères de validation** :
- [ ] Structure de dossiers complète
- [ ] Composants shared migrés (atoms, molecules, organisms)
- [ ] Services shared migrés (ifs-client, printer, language)
- [ ] Imports mis à jour
- [ ] Tests passent
- [ ] Build réussit

**Go/No-Go** : Si tous les critères sont remplis → Passer à Semaine 2

### Checkpoint 2 (Fin Semaine 2)

**Critères de validation** :
- [ ] Structure Boat Configuration créée
- [ ] Services Boat Config migrés
- [ ] Types créés
- [ ] Composants spécifiques migrés
- [ ] API Routes réorganisées
- [ ] Tests passent
- [ ] Endpoints fonctionnels

**Go/No-Go** : Si tous les critères sont remplis → Passer à Semaine 3

### Checkpoint 3 (Fin Semaine 3)

**Critères de validation** :
- [ ] Page Boat Config migrée
- [ ] Home page mise à jour
- [ ] Ancien code supprimé
- [ ] Tests complets passent
- [ ] Coverage > 80%
- [ ] Build production réussit
- [ ] Boat Config fonctionne parfaitement (tests manuels)
- [ ] Documentation à jour

**Go/No-Go** : Si tous les critères sont remplis → Passer à Semaine 4 (Review & Merge)

### Checkpoint Final (Jour 20)

**Critères de validation** :
- [ ] Code review complétée
- [ ] Validation utilisateurs OK
- [ ] Branche rebasée sur main
- [ ] Tous les tests passent
- [ ] Build final réussit
- [ ] PR approuvée
- [ ] Déploiement réussi
- [ ] Monitoring OK

**Go/No-Go** : Si tous les critères sont remplis → Migration COMPLÈTE ✅

---

## 🚨 Risques et Mitigations

### Risque 1 : Régression sur Boat Config

**Probabilité** : Moyenne  
**Impact** : Élevé

**Mitigation** :
- Tests automatisés complets
- Tests manuels après chaque checkpoint
- Validation utilisateurs avant merge
- Rollback plan prêt

### Risque 2 : Imports cassés

**Probabilité** : Élevée  
**Impact** : Moyen

**Mitigation** :
- Utiliser des scripts automatiques pour update imports
- Vérifier avec grep avant de supprimer ancien code
- TypeScript strict mode attrape les erreurs
- Build réguliers pendant migration

### Risque 3 : Tests insuffisants

**Probabilité** : Faible  
**Impact** : Élevé

**Mitigation** :
- Coverage obligatoire > 80%
- Tests E2E pour workflows complets
- Tests manuels par utilisateurs
- Monitoring post-déploiement

### Risque 4 : Documentation obsolète

**Probabilité** : Moyenne  
**Impact** : Moyen

**Mitigation** :
- Mettre à jour doc au fur et à mesure
- Review documentation dans Semaine 4
- Checklist documentation dans PR

---

## 📊 Métriques de succès

### Techniques

- [ ] **Coverage** : > 80%
- [ ] **Build time** : < 3 minutes
- [ ] **Linting** : 0 erreurs
- [ ] **TypeScript** : 0 erreurs
- [ ] **Tests** : 100% passent

### Qualité

- [ ] **Pas de régression** sur Boat Config
- [ ] **Documentation complète** (100%)
- [ ] **Code review** approuvée
- [ ] **Validation utilisateurs** positive

### Performances

- [ ] **Page load** : < 2 secondes
- [ ] **API response** : < 1 seconde (95th percentile)
- [ ] **Pas de memory leaks**

---

## 🎯 Checklist finale

### Avant le Merge

- [ ] Tous les tests unitaires passent
- [ ] Tous les tests E2E passent
- [ ] Coverage > 80%
- [ ] Build production réussit
- [ ] Linting 0 erreurs
- [ ] TypeScript 0 erreurs
- [ ] Documentation complète
- [ ] Code review approuvée
- [ ] Validation utilisateurs OK
- [ ] Branche rebasée sur main
- [ ] Pas de conflits

### Après le Merge

- [ ] Déployé en production
- [ ] Monitoring actif
- [ ] Logs vérifiés
- [ ] Pas d'erreurs remontées
- [ ] Utilisateurs informés
- [ ] Changelog mis à jour
- [ ] Tag git créé (v2.0.0)

---

## 📞 Contacts & Support

**Questions techniques** : Ouvrir une issue GitHub avec label `migration`

**Blockers** : Escalader immédiatement à l'équipe

**Feedback** : Utiliser Slack channel #manufacturing-portal

---

**Créé par** : Équipe Manufacturing Portal  
**Date** : 13 octobre 2025  
**Version** : 1.0
