# 🏭 Manufacturing Portal - Bénéteau

**Version** : 2.0  
**Status** : ✅ En production (Boat Config) | 🚧 En développement (Part Printer)  
**Dernière mise à jour** : 13 octobre 2025

<!-- Test push Azure DevOps - 25 novembre 2025 -->

---

## 📋 Vue d'ensemble

Le **Manufacturing Portal** est une plateforme Next.js hébergeant plusieurs outils de production pour Bénéteau. Architecture modulaire conçue pour supporter **7+ outils** avec des composants et services partagés.

### Outils disponibles

| Outil | Status | Description | Documentation |
|-------|--------|-------------|---------------|
| **Boat Configuration Editor** | ✅ Production | Gestion des ordres de fabrication et impression des documents de configuration | [📖 Docs](docs/tools/boat-configuration/) |
| **Part Printer** | 🚧 Dev (Phase 1/7) | Impression des étiquettes pour les pièces en bois | [📖 Docs](docs/tools/part-printer/) |
| **Outil 3** | 📋 Planifié | À définir | - |
| **Outil 4** | 📋 Planifié | À définir | - |
| **...** | 📋 Planifié | 5+ outils supplémentaires | - |

---

## 🎯 Objectifs

1. **Centraliser** tous les outils de production dans une seule plateforme
2. **Standardiser** l'expérience utilisateur avec des composants communs
3. **Optimiser** le développement avec une architecture partagée
4. **Simplifier** la maintenance avec une structure modulaire

---

## 🏗️ Architecture

### Structure modulaire

```
src/
├── shared/                  # Code partagé entre tous les outils
│   ├── components/         # UI components (atoms, molecules, organisms)
│   ├── services/           # Services IFS partagés (ifs-client, printer, etc)
│   ├── hooks/              # Custom hooks
│   ├── types/              # Types TypeScript communs
│   └── utils/              # Utilitaires
│
├── tools/                  # Services spécifiques par outil
│   ├── boat-configuration/
│   │   ├── services/       # Services métier Boat Config
│   │   └── types/          # Types spécifiques
│   └── part-printer/
│       ├── services/       # Services métier Part Printer
│       └── types/          # Types spécifiques
│
├── app/
│   ├── (home)/            # Home page
│   ├── (tools)/           # Routes des outils
│   │   ├── boat-configuration/
│   │   └── part-printer/
│   └── api/               # API Routes par outil
│       ├── shared/        # APIs partagées
│       ├── boat-configuration/
│       └── part-printer/
│
└── core/                  # Infrastructure (config, logger, etc)
```

**Documentation complète** : [📖 Architecture Multi-Outils](docs/architecture/MULTI_TOOL_ARCHITECTURE.md)

---

## 🚀 Quick Start

### Développement Local

#### Prérequis

- Node.js 18+
- pnpm 8+
- Docker Desktop (pour la BDD locale)
- WSL (Windows uniquement)
- Accès IFS Cloud (AST ou PROD)
- Azure AD App Registration

#### Installation

```bash
# Cloner le repo
git clone <repo-url>
cd ManufacturingPortal

# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos credentials

# Démarrer le serveur de développement
pnpm run dev

# Accéder à l'application
# http://localhost:3000
```

### Déploiement sur Vercel

Le Manufacturing Portal peut être déployé sur Vercel pour les tests et le développement.

- **⚡ Quick Start** : [Guide de démarrage rapide (10 min)](docs/QUICK_START_VERCEL.md)
- **📖 Guide complet** : [Documentation de déploiement complète](docs/DEPLOYMENT.md)

```bash
# Via Vercel CLI
npm i -g vercel
vercel login
vercel

# Ou via l'interface web : https://vercel.com/new
```

**Note** : Le déploiement final sera sur Azure (documentation à venir).

### Configuration BDD (Développement local)

#### Installation Docker

1. **Prérequis**
   - 🐋 [Docker Desktop](https://www.docker.com/products/docker-desktop)
   - 🪟 WSL fonctionnel (Windows uniquement)

2. **Configuration Docker (Windows)**
   - Ouvrir Docker Desktop
   - Aller dans Paramètres → Général
   - Sélectionner "Use WSL 2 based engine"
   - Cliquer sur "Appliquer"

3. **Installation SQL Server**
   ```bash
   # Ouvrir terminal WSL dans VS Code
   
   # Télécharger l'image
   docker pull mcr.microsoft.com/azure-sql-edge:latest
   
   # Créer le container
   docker run --cap-add SYS_PTRACE -e 'ACCEPT_EULA=1' \
     -e 'MSSQL_SA_PASSWORD=M5-sq1_s8v' \
     -p 1433:1433 --name azuresqledge \
     -d mcr.microsoft.com/azure-sql-edge
   ```

4. **Vérifier l'installation**
   - Dans Docker Desktop, vérifier que le container `azuresqledge` est en cours d'exécution
   - Cliquer sur les 3 petits points → "Open in terminal"
   
5. **Créer la base de données**
   ```bash
   # Se connecter à SQL Server
   /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P M5-sq1_s8v
   
   # Créer la DB (exemple)
   CREATE DATABASE testApp;
   GO
   ```

6. **Extension VS Code**
   - Installer une extension SQL Server pour VS Code (ex: SQL Server (mssql))
   - Connecter à `localhost:1433` avec `sa` / `M5-sq1_s8v`

---

## 🛠️ Commandes

### Développement

```bash
pnpm run dev              # Démarrer le serveur (http://localhost:3000)
pnpm run build            # Build production
pnpm run start            # Démarrer en mode production
pnpm run lint             # ESLint + TypeScript check
pnpm run lint:fix         # Fix automatique
```

### Tests

```bash
pnpm run test             # Lancer tous les tests
pnpm run test:watch       # Tests en mode watch
pnpm run coverage         # Coverage report avec HTML
```

### Storybook

```bash
pnpm run storybook        # Démarrer Storybook (http://localhost:6006)
pnpm run build-storybook  # Build Storybook
```

### Database

```bash
pnpm run db:connect       # Tester la connexion DB
```

---

## 📚 Documentation

### 📖 Architecture & Guides

- [**Architecture Multi-Outils**](docs/architecture/MULTI_TOOL_ARCHITECTURE.md) - Architecture complète du portal
- [**Plan de Migration**](docs/architecture/MIGRATION_PLAN.md) - Migration vers architecture v2 (4 semaines)
- [**Copilot Instructions**](.github/copilot-instructions.md) - Guide complet pour GitHub Copilot

### 🔧 Outils

| Outil | README | Roadmap | API | Status |
|-------|--------|---------|-----|--------|
| **Boat Configuration Editor** | [📖](docs/tools/boat-configuration/README.md) | - | [📌](docs/tools/boat-configuration/) | ✅ Prod |
| **Part Printer** | [📖](docs/tools/part-printer/README.md) | [🗺️](docs/tools/part-printer/ROADMAP.md) | [📌](docs/tools/part-printer/api/ENDPOINTS.md) | 🚧 Dev |

### 🔌 APIs IFS

- [**Shop Orders**](docs/api/shop-order/README.md) - ShopOrderHandling.svc
- [**DOP Headers**](docs/api/dop-header/README.md) - DopHeaderHandling.svc
- [**Serial Numbers**](docs/api/serial-number/README.md) - Récupération Serial Numbers
- [**Customer Orders**](docs/api/customer-order/README.md) - CustomerOrderHandling.svc
- [**Print Dialog**](docs/api/print-dialog/README.md) - PrintDialog.svc

---

## 🧰 Stack Technique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| **Framework** | Next.js | 15.2.1 |
| **Runtime** | React | 19.0.0 |
| **Language** | TypeScript | 5.8.2 |
| **UI Components** | shadcn/ui + Radix UI | Latest |
| **Styling** | Tailwind CSS | 4.1.7 |
| **API Backend** | Next.js API Routes | 15.2.1 |
| **Authentication** | NextAuth.js (Azure AD) | 4.24.11 |
| **Database** | MS SQL Server | 11.0.1 |
| **IFS Integration** | Custom OAuth2 Client | - |
| **Package Manager** | pnpm | - |
| **Testing** | Vitest | Latest |
| **Storybook** | Storybook | Latest |

---

## 🔐 Variables d'environnement

### Configuration IFS Cloud

```bash
# .env.local
IFS_BASE_URL=https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1
IFS_CLIENT_ID=your_ifs_client_id_here
IFS_CLIENT_SECRET=***
IFS_TOKEN_URL=https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token
IFS_SCOPE=openid microprofile-jwt
```

### Configuration Azure AD

```bash
AZURE_AD_CLIENT_ID=***
AZURE_AD_CLIENT_SECRET=***
AZURE_AD_TENANT_ID=***
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=***
```

### Configuration Database

```bash
DATABASE_USER=sa
DATABASE_PASSWORD=M5-sq1_s8v
DATABASE_HOST=localhost
DATABASE_PORT=1433
DATABASE_NAME=testApp
AZURE_SQL_AUTHENTICATIONTYPE=default
```

---

## 🎨 Prettier & ESLint

### Installation Prettier (VS Code)

1. Ouvrir le menu Extensions : `Ctrl + Shift + X`
2. Rechercher `Prettier` et installer
3. Ouvrir les paramètres de l'extension
4. Vérifier que le config path pointe vers `.prettierrc`

![Prettier settings](docs/prettiersettings1.PNG)

### Linting

```bash
# Vérifier le code
pnpm run lint

# Fix automatique
pnpm run lint:fix
```

---

## 📅 Roadmap Globale

### Phase Actuelle : Migration Architecture v2 (Oct-Nov 2025)

- [x] ✅ Boat Configuration Editor en production
- [ ] 🔄 Migration vers architecture multi-outils (4 semaines)
- [ ] 🚧 Part Printer - Phase 1 (Architecture & Fondations)

### Q4 2025 - Q1 2026

- [ ] Part Printer - Phases 2-7 (13 semaines)
- [ ] Nouveaux outils (à définir)

---

## 🧪 Tests

### Structure des tests

```bash
src/
├── shared/
│   ├── components/
│   │   └── atoms/
│   │       ├── Button.tsx
│   │       └── Button.test.tsx      # Tests à côté des composants
│   └── services/
│       ├── ifs-client.ts
│       └── ifs-client.test.ts
```

### Commandes

```bash
# Tous les tests
pnpm run test

# Tests d'un outil spécifique
pnpm run test src/tools/boat-configuration

# Coverage
pnpm run coverage
```

### Objectif Coverage

- **Target** : > 80%
- **Current** : TBD

---

## 🤝 Contribution

### Workflow Git

```bash
# Créer une branche feature
git checkout -b feature/my-feature

# Développer + Tests
# ...

# Commit
git add .
git commit -m "feat: my feature description"

# Push et créer PR
git push origin feature/my-feature
```

### Conventions

- **TypeScript strict mode** obligatoire
- **Tests unitaires** pour tous les services
- **Documentation** JSDoc pour fonctions publiques
- **ESLint** : 0 erreurs
- **Prettier** : Code formaté
- **Pull Request** : Review obligatoire

### Ajout d'un nouvel outil

Suivre le guide : [📖 Template Nouvel Outil](docs/architecture/MULTI_TOOL_ARCHITECTURE.md#-template-pour-un-nouveau-tool)

---

## 🐛 Troubleshooting

### Problème : Build échoue

```bash
# Nettoyer et réinstaller
rm -rf node_modules .next
pnpm install
pnpm run build
```

### Problème : IFS OAuth2 token expired

```bash
# Le token est automatiquement renouvelé par ifs-client.ts
# Si problème persistant, vérifier .env.local
```

### Problème : Docker SQL Server ne démarre pas

```bash
# Vérifier les logs
docker logs azuresqledge

# Redémarrer le container
docker restart azuresqledge
```

---

## 📞 Support & Contacts

### Questions techniques

- Ouvrir une issue GitHub avec le label approprié
- Consulter la documentation dans `/docs`

### Feedback utilisateurs

- Canal Slack : `#manufacturing-portal` (à créer)

---

## 📝 Changelog

### v2.0.0 - 2025-10-13 (En cours)

- 🏗️ Refonte architecture multi-outils
- 📚 Documentation complète architecture
- 🗺️ Roadmap Part Printer créée
- 🔄 Migration plan défini

### v1.5.0 - 2025-10-10

- ✅ Boat Configuration Editor : Intégration Customer Order
- ✅ Validation cohérence Serial Number ↔ Customer Order

### v1.4.0 - 2025-10-08

- ✅ Boat Configuration Editor : Impression PDF complète

### v1.0.0 - 2025-09-25

- ✅ Boat Configuration Editor : Version initiale

---

## 📜 License

Propriétaire - Bénéteau Group

---

**Maintenu par** : Équipe Manufacturing Portal  
**Contact** : [À définir]