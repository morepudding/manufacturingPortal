# 📚 Manufacturing Portal - Documentation

**Version** : 2.0  
**Dernière mise à jour** : 12 novembre 2025

---

## 🎯 Vue d'ensemble

Le **Manufacturing Portal** est une plateforme Next.js regroupant plusieurs outils de production Bénéteau :

- ✅ **Boat Configuration Editor** - Impression documents de configuration (Production)
- 🚧 **Part Printer** - Impression étiquettes pièces (En développement)
- 📋 **5+ outils supplémentaires** - Planifiés

---

## 🚀 Quick Start

### Installation rapide

```bash
# 1. Cloner et installer
git clone <repo-url>
cd ManufacturingPortal
pnpm install

# 2. Configurer l'environnement
cp .env.example .env.local
# Éditer .env.local avec vos credentials

# 3. Démarrer
pnpm run dev
```

**Accès :** http://localhost:3000

📖 **Guide complet :** [QUICK_START.md](./QUICK_START.md)

---

## 📖 Documentation

### 🌟 Documents principaux

| Document | Description | Audience |
|----------|-------------|----------|
| **[QUICK_START.md](./QUICK_START.md)** | Installation et démarrage rapide | 👨‍💻 Tous |

### 📖 Guides utilisateur

| Document | Description | Audience |
|----------|-------------|----------|
| **[guides/boat-configuration-editor.md](./guides/boat-configuration-editor.md)** | Guide complet Boat Config | 👨‍💻 Dev + 👥 Users |
| **[guides/part-printer.md](./guides/part-printer.md)** | Guide complet Part Printer | 👨‍💻 Dev + 👥 Users |

### 📋 Spécifications fonctionnelles

| Document | Description | Audience |
|----------|-------------|----------|
| **[specifications/boat-configuration-functional-spec.md](./specifications/boat-configuration-functional-spec.md)** | Specs fonctionnelles Boat Config (Marc Toquard) | 📊 Product + 👨‍💻 Dev |
| **[specifications/part-printer-functional-spec.md](./specifications/part-printer-functional-spec.md)** | Specs fonctionnelles Part Printer (Marc Toquard) | 📊 Product + 👨‍💻 Dev |

### 📡 Documentation API

| Document | Description | Audience |
|----------|-------------|----------|
| **[api/IFS_ENDPOINTS.md](./api/IFS_ENDPOINTS.md)** | Documentation API IFS Cloud (11 services, 26 endpoints) | 👨‍💻 Dev + 🔧 IT |

### 🏗️ Architecture

| Document | Description | Audience |
|----------|-------------|----------|
| **[architecture/ARCHITECTURE.md](./architecture/ARCHITECTURE.md)** | Architecture multi-outils | 👨‍💻 Dev |
| [architecture/archive-migration/](./architecture/archive-migration/) | Documents migration (archivés) | 📦 Archive |

### 📁 Documentation archivée

L'ancienne documentation détaillée (70+ fichiers) est disponible dans `archive/old-docs/` pour référence historique.

---

## 🛠️ Outils disponibles

### Boat Configuration Editor ✅

**Status :** Production  
**Usage :** Impression documents de configuration via Shop Orders et Customer Orders

**Fonctionnalités :**
- Recherche Shop Order (3 clés)
- Récupération automatique Serial Number
- Validation Customer Order (FR05A)
- Impression document MA_FO_CR_1419

**Documentation :**
- **Guide utilisateur** : [guides/boat-configuration-editor.md](./guides/boat-configuration-editor.md)
- **Spécifications** : [specifications/boat-configuration-functional-spec.md](./specifications/boat-configuration-functional-spec.md)

---

### Part Printer 🚧

**Status :** En développement  
**Usage :** Impression étiquettes et listings pour pièces de production

**Fonctionnalités :**
- Filtrage avancé (Site, Production Line, Date, Block ID)
- Génération listings PDF multi-pages
- Impression étiquettes via Azure Print API
- 3 modes : Listing seul / Étiquettes seules / Les deux

**Documentation :**
- **Guide utilisateur** : [guides/part-printer.md](./guides/part-printer.md)
- **Spécifications** : [specifications/part-printer-functional-spec.md](./specifications/part-printer-functional-spec.md)

---

## 🏗️ Stack technique

| Composant | Technologie |
|-----------|-------------|
| Framework | Next.js 15.2.1 + React 19 |
| UI | shadcn/ui + Tailwind CSS |
| Language | TypeScript 5.8.2 |
| API | Next.js API Routes |
| Auth | NextAuth.js + Azure AD |
| IFS | OAuth2 + OData v4 |

**Documentation :** [architecture/ARCHITECTURE.md](./architecture/ARCHITECTURE.md)

---

## 📡 API IFS Cloud

Le portal utilise **11 services IFS** avec **26 endpoints** (22 GET + 3 POST + 1 binaire).

### Services principaux

| Service | Usage |
|---------|-------|
| **ShopOrderHandling** | Recherche Shop Orders (partagé) |
| **DopHeaderHandling** | Serial Numbers (Boat Config) |
| **CustomerOrderHandling** | Customer Orders (Boat Config) |
| **PrintDialog** | Imprimantes et langues (partagé) |
| **PartHandling** | Attributs parts (Part Printer) |
| **OperationBlockHandling** | Opérations OP10 (Part Printer) |

**Documentation complète :** [api/IFS_ENDPOINTS.md](./api/IFS_ENDPOINTS.md)

---

## 🔧 Scripts

```bash
pnpm run dev          # Développement
pnpm run build        # Build production
pnpm run start        # Production
pnpm run lint         # Linter
pnpm run test         # Tests unitaires
pnpm run coverage     # Coverage report
```

---

## 🐛 Troubleshooting

### Erreur de connexion IFS

```bash
# Vérifier credentials
cat .env.local | grep IFS_

# Tester connexion
pnpm run test:ifs
```

### Erreur d'authentification Azure AD

```bash
# Vérifier credentials
cat .env.local | grep AZURE_

# Vérifier redirect URIs dans Azure Portal
```

### Build échoue

```bash
# Nettoyer et réinstaller
rm -rf node_modules .next
pnpm install
pnpm run build
```

---

## 📊 Structure du projet

```
ManufacturingPortal/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (home)/                  # Home page
│   │   ├── (tools)/                 # Routes des outils
│   │   │   ├── boat-configuration/
│   │   │   └── part-printer/
│   │   └── api/                     # API Routes
│   │
│   ├── shared/                      # Code partagé
│   │   ├── components/              # UI components
│   │   ├── services/                # Services IFS
│   │   ├── hooks/                   # Custom hooks
│   │   └── types/                   # Types TypeScript
│   │
│   ├── tools/                       # Code par outil
│   │   ├── boat-configuration/
│   │   │   ├── services/
│   │   │   └── types/
│   │   └── part-printer/
│   │       ├── services/
│   │       └── types/
│   │
│   └── core/                        # Infrastructure
│       ├── config/
│       └── lib/
│
├── docs/                            # 📚 Documentation (ici)
│   ├── README.md                    # Ce fichier
│   ├── QUICK_START.md              # Guide démarrage
│   │
│   ├── guides/                      # 📖 Guides utilisateur
│   │   ├── boat-configuration-editor.md
│   │   └── part-printer.md
│   │
│   ├── specifications/              # 📋 Spécifications fonctionnelles
│   │   ├── boat-configuration-functional-spec.md
│   │   └── part-printer-functional-spec.md
│   │
│   ├── api/                        # 📡 Documentation API
│   │   └── IFS_ENDPOINTS.md
│   │
│   ├── architecture/               # 🏗️ Architecture
│   │   ├── ARCHITECTURE.md
│   │   └── archive-migration/      # Docs migration (archivés)
│   │
│   └── archive/
│       └── old-docs/               # Ancienne doc (70+ fichiers)
│
└── package.json
```

---

## 🤝 Contribution

### Ajouter un nouvel outil

1. Suivre le template dans [ARCHITECTURE.md](./architecture/ARCHITECTURE.md)
2. Créer la structure `/src/tools/[tool-name]`
3. Créer la documentation `/docs/[tool-name].md`
4. Mettre à jour ce README

### Conventions

- TypeScript strict mode
- Tests coverage > 80%
- Documentation obligatoire
- ESLint + Prettier

---

## 📞 Support

### Documentation

- **Quick Start** : [QUICK_START.md](./QUICK_START.md)
- **Guides** : [guides/](./guides/)
- **Spécifications** : [specifications/](./specifications/)
- **Architecture** : [architecture/ARCHITECTURE.md](./architecture/ARCHITECTURE.md)
- **API IFS** : [api/IFS_ENDPOINTS.md](./api/IFS_ENDPOINTS.md)

### Ressources

- **IFS Cloud** : https://beneteau-group-ast.ifs.cloud
- **Next.js Docs** : https://nextjs.org/docs
- **shadcn/ui** : https://ui.shadcn.com

### Contacts

- **Dev Team** : Équipe Manufacturing Portal
- **IFS Admin** : Thomas (permissions)
- **IT Support** : IT Bénéteau

---

## 📝 Changelog

### v2.0 - 2025-11-12
- ✅ Documentation simplifiée (79 → 7 fichiers actifs)
- ✅ Archivage ancienne documentation (70+ fichiers)
- ✅ Guides consolidés par outil
- ✅ README restructuré

### v1.5 - 2025-10-17
- ✅ Rapports d'impression créés
- ✅ Configuration impression PROD documentée

### v1.0 - 2025-09-25
- ✅ Boat Configuration Editor production
- ✅ Documentation initiale

---

**Maintenu par** : Équipe Manufacturing Portal  
**Version** : 2.0
