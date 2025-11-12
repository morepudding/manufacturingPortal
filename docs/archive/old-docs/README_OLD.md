# 📚 Manufacturing Portal - Documentation

**Dernière mise à jour** : 6 novembre 2025  
**Version** : 2.1

Bienvenue dans la documentation du **Manufacturing Portal** Bénéteau, une suite d'outils Next.js pour la gestion de la production.

---

## 🆕 NOUVEAU - Documentation Endpoints IFS (6 nov 2025)

**📡 Pour Thomas - Validation des permissions IFS requise :**

| Document | Description | À lire |
|----------|-------------|--------|
| [**IFS_ENDPOINTS_SUMMARY.md**](./IFS_ENDPOINTS_SUMMARY.md) | Résumé des 11 services IFS utilisés + permissions | ⭐ **START HERE** |
| [**IFS_ENDPOINTS_HTTP_VERBS.md**](./IFS_ENDPOINTS_HTTP_VERBS.md) | Liste des 26 endpoints avec verbes HTTP (GET/POST) | 🔧 **Simple & Quick** |
| [**IFS_ENDPOINTS_TABLE.md**](./IFS_ENDPOINTS_TABLE.md) | Tableau des 26 endpoints + checklist validation | 📋 Détails |
| [**IFS_ENDPOINTS_USED.md**](./IFS_ENDPOINTS_USED.md) | Documentation technique complète (OData params) | 👨‍💻 Dev only |

**Résumé rapide :**
- ✅ 11 services IFS utilisés (26 endpoints)
- ✅ 22 GET + 3 POST + 1 GET binary
- ✅ Code nettoyé (3 fichiers obsolètes supprimés)
- ✅ Aucun endpoint inutilisé
- ⚠️ Validation permissions client `***REMOVED***` requise

---

---

## 🎯 Vue d'ensemble

## 📋 Vue d'ensemble

Le Manufacturing Portal est une plateforme web qui regroupe plusieurs outils destinés aux opérateurs de production Bénéteau. Chaque outil est conçu pour simplifier et automatiser des tâches spécifiques liées à la fabrication de bateaux.

Bienvenue dans la documentation du **Manufacturing Portal**, l'ensemble d'outils Next.js destiné à la production Bénéteau.

### Stack Technique

### Outils disponibles

- **Framework** : Next.js 15.2.1 + React 19

| Outil | Status | Description |- **Backend** : Next.js API Routes + IFS Cloud OData API

|-------|--------|-------------|- **Authentication** : NextAuth.js (Azure AD)

| [Boat Configuration Editor](#boat-configuration-editor) | ✅ Production | Gestion des ordres de fabrication et impression de configurations |- **UI** : shadcn/ui + Radix UI + Tailwind CSS

| [Part Printer](#part-printer) | 🚧 En développement | Impression d'étiquettes de pièces |- **Database** : MS SQL Server

- **Package Manager** : pnpm

---

---

## 🗂️ Structure de la Documentation

## 🛠️ Outils Disponibles

```

docs/### 1. Boat Configuration Editor ✅ Actif

├── README.md                       # Ce fichier

├── DOCUMENTATION_INVENTORY.md      # Inventaire complet**Description** : Outil de recherche et d'impression de configurations de bateaux via Shop Orders et Customer Orders.

│

├── api/                           # 📡 Documentation API IFS Cloud**Fonctionnalités** :

│   ├── customer-order/            # Customer Order Handling API- 🔍 Recherche de Shop Orders

│   ├── shop-order/                # Shop Order Handling API- 📋 Récupération automatique du Serial Number

│   ├── print-dialog/              # Print Dialog API- 📄 Validation Customer Order

│   ├── serial-number/             # Serial Number Handling API- 🖨️ Impression de documents de configuration (MA_FO_CR_1419)

│   ├── dop-header/                # DOP Header Handling API- 📥 Téléchargement PDF

│   └── discoveries/               # Découvertes techniques

│**Documentation** :

├── tools/                         # 🔧 Documentation des outils- [Spécifications →](./tools/boat-configuration-editor/specifications/)

│   ├── boat-configuration-editor/ # Boat Configuration Editor- [Guide d'implémentation →](./tools/boat-configuration-editor/implementation/)

│   └── part-printer/              # Part Printer- [Guide utilisateur →](./tools/boat-configuration-editor/user-guide/)

│

├── architecture/                  # 🏗️ Architecture globale---

│   ├── 01-overview.md            # Vue d'ensemble

│   ├── 02-tech-stack.md          # Stack technique### 2. Part Printer 🚧 En développement

│   └── 03-deployment.md          # Déploiement

│**Description** : Outil d'impression d'étiquettes et de documents pour les pièces de production.

├── assets/                        # 📁 Ressources

│   └── images/                   # Images et captures d'écran**Statut** : En cours de spécification

│

└── archive/                       # 📦 Archives**Documentation** :

    ├── phases/                    # Historique des phases- [Spécifications →](./tools/part-printer/specifications/)

    └── investigations/            # Investigations techniques

```---



---## 📖 Documentation par catégorie



## 📡 Documentation API### Architecture & Développement



### Services IFS Cloud- [Architecture globale](./architecture/) - Vue d'ensemble technique du portail

- [API IFS Cloud](./api/) - Documentation des services IFS utilisés

La documentation API couvre les services OData v4 d'IFS Cloud utilisés par les outils.- [Templates de documentation](./templates/) - Standards pour futurs outils



#### APIs principales### API IFS Cloud



| API | Description | Documentation || Service | Description | Documentation |

|-----|-------------|---------------||---------|-------------|---------------|

| **Customer Order Handling** | Gestion des commandes clients | [📖 Voir docs](api/customer-order/) || **Customer Order** | Gestion des commandes clients | [→ Docs](./api/customer-order/) |

| **Shop Order Handling** | Gestion des ordres de fabrication | [📖 Voir docs](api/shop-order/) || **Shop Order** | Gestion des ordres de fabrication | [→ Docs](./api/shop-order/) |

| **Print Dialog** | Système d'impression IFS | [📖 Voir docs](api/print-dialog/) || **Print Dialog** | Système d'impression IFS | [→ Docs](./api/print-dialog/) |

| **Serial Number Handling** | Gestion des numéros de série | [📖 Voir docs](api/serial-number/) || **Serial Number** | Gestion des numéros de série | [→ Docs](./api/serial-number/) |

| **DOP Header Handling** | En-têtes DOP et réservations | [📖 Voir docs](api/dop-header/) || **DOP Header** | En-têtes DOP (Dynamic Order Planning) | [→ Docs](./api/dop-header/) |



#### Découvertes techniques### Archives



- [Shop Order → Serial Number → DOP Analysis](api/discoveries/shoporder-serial-dop-analysis.md) - Analyse des relations entre entités- [Phases de développement](./archive/phases/) - Historique des phases Boat Configuration Editor

- [Investigations techniques](./archive/investigations/) - Recherches et découvertes

---

---

## 🔧 Boat Configuration Editor

## 🚀 Quick Start

### Vue d'ensemble

### Prérequis

Le **Boat Configuration Editor** permet aux opérateurs de production de :

1. Rechercher un Shop Order (3 clés)```bash

2. Récupérer automatiquement le Serial Number via DOP- Node.js 18+

3. Valider avec Customer Order- pnpm

4. Sélectionner imprimante et langue- Accès VPN Bénéteau (pour API IFS Cloud)

5. Imprimer le document de configuration```



### Documentation### Installation



| Type | Document | Description |```bash

|------|----------|-------------|# Cloner le repository

| **Spécifications** | [Functional Spec](tools/boat-configuration-editor/specifications/functional-spec.md) | Spécification fonctionnelle complète |git clone <repo-url>

| **Spécifications** | [UX Customer Order](tools/boat-configuration-editor/specifications/ux-customer-order.md) | Validation Customer Order |cd ManufacturingPortal

| **Implémentation** | [Print Workflow](tools/boat-configuration-editor/implementation/print-workflow.md) | Workflow d'impression complet |

| **Implémentation** | [Print Feature](tools/boat-configuration-editor/implementation/print-feature.md) | Fonctionnalité d'impression |# Installer les dépendances

| **Implémentation** | [Print Guide](tools/boat-configuration-editor/implementation/print-guide.md) | Guide d'implémentation |pnpm install

| **Implémentation** | [Customer Order](tools/boat-configuration-editor/implementation/customer-order.md) | Intégration Customer Order |

# Copier et configurer les variables d'environnement

### Workflow principalcp .env.example .env.local

# Éditer .env.local avec vos credentials IFS

```

1. Saisie Shop Order (OrderNo, ReleaseNo, SequenceNo)# Démarrer le serveur de dev

   ↓pnpm run dev

2. Recherche via IFS ShopOrderHandling API```

   ↓

3. Extraction DopId → Récupération Serial Number### Accès

   ↓

4. Validation Customer Order (optionnel)- **URL locale** : http://localhost:3000

   ↓- **Boat Configuration Editor** : http://localhost:3000/boat-configuration

5. Sélection Imprimante + Langue- **(Autres outils à venir)**

   ↓

6. Génération + Impression PDF---

```

## 📝 Conventions de documentation

### Status

### Structure d'un outil

- ✅ **Phase 1-3** : Interface + Shop Order → Serial Number

- ✅ **Phase 4-5** : Customer Order + Impression PDFChaque outil dans `docs/tools/{tool-name}/` suit cette structure :

- 🚀 **Prod** : Déployé et opérationnel

```

---{tool-name}/

├── README.md                    # Vue d'ensemble de l'outil

## 🏭 Part Printer├── specifications/              # Spécifications fonctionnelles et techniques

│   ├── functional-spec.md       # Cahier des charges fonctionnel

### Vue d'ensemble│   ├── ux-specifications.md     # Spécifications UX/UI

│   └── technical-spec.md        # Architecture technique

Le **Part Printer** permet d'imprimer des étiquettes pour les pièces de production.├── implementation/              # Guides d'implémentation

│   ├── architecture.md          # Architecture de l'outil

### Documentation│   ├── backend-setup.md         # Configuration backend

│   ├── frontend-setup.md        # Configuration frontend

- [Spécifications](PartPrinter/specifications.md) - Spécification fonctionnelle│   └── deployment.md            # Guide de déploiement

├── user-guide/                  # Documentation utilisateur

### Status│   ├── getting-started.md       # Prise en main

│   ├── features.md              # Fonctionnalités détaillées

- 🚧 **En développement**│   └── troubleshooting.md       # Résolution de problèmes

└── CHANGELOG.md                 # Historique des changements

---```



## 🏗️ Architecture### Naming Convention



### Stack technique- **Fichiers** : `kebab-case.md` (ex: `functional-spec.md`)

- **Dossiers** : `kebab-case` (ex: `boat-configuration-editor/`)

| Couche | Technologie | Version |- **README** : toujours `README.md` en majuscules

|--------|-------------|---------|

| **Framework** | Next.js | 15.2.1 |### Format Markdown

| **UI** | React + shadcn/ui | 19.0.0 |

| **Language** | TypeScript | 5.8.2 |- **Titre principal** : `# 📚 Titre` (avec emoji pour catégorie)

| **Styling** | Tailwind CSS | 4.1.7 |- **Sections** : `## 🎯 Section`

| **API** | Next.js API Routes | 15.2.1 |- **Code blocks** : Toujours spécifier le langage (```typescript, ```bash, etc.)

| **Auth** | NextAuth.js + Azure AD | 4.24.11 |- **Tables** : Utiliser pour les données structurées

| **Database** | MS SQL Server | 11.0.1 |- **Liens** : Relatifs depuis la racine `docs/`

| **IFS Integration** | OAuth2 + OData v4 | - |

---

### Environnements

## 🤝 Contribution

| Environnement | IFS URL | Status |

|---------------|---------|--------|### Ajouter un nouvel outil

| **AST (Dev)** | https://beneteau-group-ast.ifs.cloud | ✅ Actif |

| **Production** | TBD | 🔜 À venir |1. Créer la structure de dossiers dans `docs/tools/{new-tool}/`

2. Utiliser les [templates de documentation](./templates/)

---3. Suivre les conventions de naming

4. Mettre à jour ce README avec le nouvel outil

## 🚀 Démarrage rapide

### Mettre à jour la documentation

### Prérequis

1. Suivre la structure existante

- Node.js 18+2. Utiliser des exemples concrets

- pnpm 8+3. Ajouter des captures d'écran si pertinent

- Accès IFS Cloud AST/Production4. Tester tous les liens

- Azure AD configuré

---

### Installation

## 📞 Support

```bash

# Cloner le repo### IFS Cloud

git clone <repo-url>

cd ManufacturingPortal- **Environnement DEV (AST)** : https://beneteau-group-ast.ifs.cloud

- **Environnement PROD** : https://beneteau-group-prod.ifs.cloud

# Installer les dépendances

pnpm install### Contacts



# Configurer l'environnement- **Équipe Dev** : (à définir)

cp .env.example .env.local- **Support IFS** : (à définir)

# Éditer .env.local avec vos credentials

---

# Démarrer en développement

pnpm run dev## 📋 Index de navigation

```

### Par fonctionnalité

### Scripts disponibles

- 🔍 **Recherche Shop Orders** → [Boat Configuration Editor](./tools/boat-configuration-editor/)

```bash- 📋 **Customer Orders** → [API Customer Order](./api/customer-order/)

pnpm run dev          # Développement (localhost:3000)- 🖨️ **Impression** → [API Print Dialog](./api/print-dialog/)

pnpm run build        # Build production- 🏷️ **Serial Numbers** → [API Serial Number](./api/serial-number/)

pnpm run start        # Production

pnpm run lint         # Linter### Par phase de projet

pnpm run test         # Tests

```- **📐 Spécification** → Voir `specifications/` de chaque outil

- **💻 Développement** → Voir `implementation/` de chaque outil

---- **👥 Utilisation** → Voir `user-guide/` de chaque outil



## 📖 Guides---



### Pour les développeurs## 📌 Liens utiles



- [IFS Cloud API Documentation](api/) - APIs IFS Cloud- [Inventaire de documentation](./DOCUMENTATION_INVENTORY.md) - Mapping de l'ancienne vers nouvelle structure

- [Architecture Overview](boatConfigurationEditor/documentation/) - Vue d'ensemble architecture- [Guide API IFS Cloud](./api/) - Documentation des services IFS

- Voir aussi [.github/copilot-instructions.md](../.github/copilot-instructions.md) pour les conventions- [Templates](./templates/) - Templates pour nouveaux outils



### Pour les utilisateurs---



- [Boat Configuration Editor User Guide](tools/boat-configuration-editor/user-guide/) - Guide utilisateur**Dernière mise à jour** : 13 octobre 2025  

**Version** : 1.0.0  

---**Maintenue par** : Équipe Manufacturing Bénéteau


## 🤝 Contribution

### Convention de nommage

- **Fichiers** : `kebab-case.md`
- **Dossiers** : `kebab-case/`
- **README** : Toujours `README.md`

### Structure d'un nouvel outil

```
docs/tools/mon-outil/
├── README.md                 # Vue d'ensemble
├── specifications/          # Specs fonctionnelles
│   └── functional-spec.md
├── implementation/          # Guides d'implémentation
│   ├── backend.md
│   └── frontend.md
├── user-guide/              # Documentation utilisateur
│   └── getting-started.md
└── CHANGELOG.md             # Historique
```

---

## 📊 Statistiques

### Documentation

- **APIs documentées** : 5
- **Outils** : 2 (1 prod, 1 dev)
- **Guides d'implémentation** : 6
- **Découvertes techniques** : 1+

### Code

- **Lignes de code** : ~15,000
- **Composants UI** : 50+
- **API Routes** : 10+
- **Services** : 8

---

## 📞 Support

### Ressources

- **IFS Cloud Docs** : https://docs.ifs.com/cloud/
- **Next.js Docs** : https://nextjs.org/docs
- **shadcn/ui** : https://ui.shadcn.com/

---

## �️ Rapports d'Impression

**Nouveaux documents (17 octobre 2025)** :

| Document | Description | Audience |
|----------|-------------|----------|
| [**Rapport Complet**](./RAPPORT_IMPRESSION.md) | Analyse détaillée de l'impression pour Boat Config + Part Printer (architecture, workflows, configuration IFS) | 👨‍💻 Dev + 🔧 IT |
| [**Résumé**](./RAPPORT_IMPRESSION_RESUME.md) | Vue d'ensemble rapide des bloqueurs PROD et actions requises | 📊 Management + 🔧 IT |
| [**Plan d'Action**](./PLAN_ACTION_IMPRESSION.md) | Roadmap 2 semaines pour passer en impression réelle (PROD) | 📋 Chef de projet + 👨‍💻 Dev |

**Contexte** : Actuellement, les deux outils sont en **mode DEV** avec impression simulée. Pour passer en PROD avec impression réelle sur imprimantes physiques, il faut :
- Obtenir credentials IFS PROD
- Configurer les Reports IFS (`MA_FO_CR_1419` + `PART_LABEL_REPORT`)
- Valider les imprimantes physiques (`PRTMNF012`, `PRTBX101`, etc.)
- Implémenter le workflow IFS pour Part Printer

---

## �📝 Changelog

### 2025-10-17 - v2.1

- ✅ **Rapports d'impression créés** (3 documents)
- ✅ Configuration impression PROD documentée
- ✅ Plan d'action 2 semaines défini

### 2025-10-13 - v2.0

- ✅ Réorganisation complète de la documentation
- ✅ Documentation API consolidée (5 services)
- ✅ Structure tools/ créée
- ✅ Archivage des fichiers obsolètes
- ✅ Suppression des redondances (8 fichiers)
- ✅ Migration images vers assets/

### 2025-10-10 - v1.5

- ✅ Boat Configuration Editor : Customer Order integration
- ✅ Impression PDF complète (mode DEV)

### 2025-10-05 - v1.0

- ✅ Boat Configuration Editor : Shop Order → Serial Number
- ✅ Interface utilisateur complète

---

**Maintenu par** : Équipe Manufacturing Portal  
**Dernière revue** : 17 octobre 2025
