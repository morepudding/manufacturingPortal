# 🚀 Quick Start - Manufacturing Portal

**Version** : 1.0  
**Dernière mise à jour** : 12 novembre 2025

---

## 📋 Vue d'ensemble

Le Manufacturing Portal est une plateforme Next.js regroupant plusieurs outils de production Bénéteau :
- ✅ **Boat Configuration Editor** (Production)
- 🚧 **Part Printer** (En développement)

---

## ⚡ Installation rapide

### Prérequis

- Node.js 18+
- pnpm 8+
- Accès VPN Bénéteau (pour API IFS Cloud)
- Credentials Azure AD

### Installation

```bash
# 1. Cloner le repository
git clone <repo-url>
cd ManufacturingPortal

# 2. Installer les dépendances
pnpm install

# 3. Configurer l'environnement
cp .env.example .env.local

# 4. Éditer .env.local avec vos credentials
# IFS_BASE_URL=https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1
# IFS_CLIENT_ID=***
# IFS_CLIENT_SECRET=***
# AZURE_AD_CLIENT_ID=***
# AZURE_AD_CLIENT_SECRET=***
# AZURE_AD_TENANT_ID=***

# 5. Démarrer le serveur de développement
pnpm run dev
```

### Accès

- **URL locale** : http://localhost:3000
- **Boat Configuration** : http://localhost:3000/boat-configuration
- **Part Printer** : http://localhost:3000/part-printer

---

## 🔧 Scripts disponibles

```bash
pnpm run dev          # Développement (localhost:3000)
pnpm run build        # Build production
pnpm run start        # Production
pnpm run lint         # ESLint + TypeScript
pnpm run test         # Tests unitaires
pnpm run coverage     # Coverage report
```

---

## 🏗️ Stack technique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| Framework | Next.js | 15.2.1 |
| UI | React + shadcn/ui | 19.0.0 |
| Language | TypeScript | 5.8.2 |
| Styling | Tailwind CSS | 4.1.7 |
| API | Next.js API Routes | - |
| Auth | NextAuth.js + Azure AD | 4.24.11 |
| Database | MS SQL Server | 11.0.1 |
| IFS | OAuth2 + OData v4 | - |

---

## 📖 Documentation complète

| Document | Description |
|----------|-------------|
| [README.md](./README.md) | Vue d'ensemble du projet |
| [boat-configuration-editor.md](./boat-configuration-editor.md) | Guide complet Boat Config |
| [part-printer.md](./part-printer.md) | Guide complet Part Printer |
| [IFS_ENDPOINTS.md](./IFS_ENDPOINTS.md) | Documentation API IFS |
| [ARCHITECTURE.md](./architecture/ARCHITECTURE.md) | Architecture multi-outils |

---

## 🐛 Troubleshooting

### Erreur de connexion IFS

```bash
# Vérifier les variables d'environnement
cat .env.local | grep IFS_

# Tester la connexion IFS
pnpm run test:ifs
```

### Erreur d'authentification Azure AD

```bash
# Vérifier les credentials Azure AD
cat .env.local | grep AZURE_

# Vérifier les redirects URI dans Azure Portal
```

### Build échoue

```bash
# Nettoyer et réinstaller
rm -rf node_modules .next
pnpm install
pnpm run build
```

---

## 📞 Support

- **Documentation** : [docs/](.)
- **IFS Cloud** : https://beneteau-group-ast.ifs.cloud
- **Issues** : GitHub Issues

---

**Maintenu par** : Équipe Manufacturing Portal
