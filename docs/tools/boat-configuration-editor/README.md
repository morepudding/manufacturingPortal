# 🚢 Boat Configuration Editor

**Version** : 1.5  
**Status** : ✅ Production  
**Dernière mise à jour** : 13 octobre 2025

---

## 📋 Vue d'ensemble

Le **Boat Configuration Editor** est un outil web qui permet aux opérateurs de production Bénéteau de rechercher des Shop Orders, récupérer les Serial Numbers associés, valider avec les Customer Orders, et imprimer les documents de configuration.

### Objectif

Simplifier et automatiser le processus d'impression des configurations de bateaux en :
1. Recherchant un Shop Order dans IFS Cloud
2. Récupérant automatiquement le Serial Number via le DOP Header
3. Validant avec le Customer Order
4. Imprimant le document MA_FO_CR_1419

---

## 🎯 Fonctionnalités

### ✅ Implémentées

| Fonctionnalité | Description | Status |
|----------------|-------------|--------|
| **Recherche Shop Order** | Saisie des 3 clés (OrderNo, ReleaseNo, SequenceNo) | ✅ |
| **Récupération Serial Number** | Via DOP Header automatique | ✅ |
| **Validation Customer Order** | Vérification cohérence données | ✅ |
| **Sélection Imprimante** | Liste des imprimantes disponibles | ✅ |
| **Sélection Langue** | Choix de la langue du document | ✅ |
| **Impression PDF** | Génération et impression MA_FO_CR_1419 | ✅ |
| **Téléchargement PDF** | Téléchargement du document généré | ✅ |

### 🚧 En développement

| Fonctionnalité | Description | Priorité |
|----------------|-------------|----------|
| **Historique** | Historique des impressions | 🟡 Medium |
| **Mode hors-ligne** | Gestion déconnectée | 🟢 Low |

---

## 📖 Documentation

### Spécifications

- [**Spécification Fonctionnelle**](specifications/functional-spec.md) - Spécification complète du workflow
- [**UX Customer Order**](specifications/ux-customer-order.md) - Validation Customer Order

### Implémentation

- [**Print Workflow**](implementation/print-workflow.md) - Workflow d'impression complet (Phase 5)
- [**Print Feature**](implementation/print-feature.md) - Fonctionnalité d'impression
- [**Print Guide**](implementation/print-guide.md) - Guide d'implémentation développeur
- [**Customer Order**](implementation/customer-order.md) - Intégration Customer Order

### User Guide

- [**Getting Started**](user-guide/getting-started.md) - Guide de démarrage utilisateur (à créer)

---

## 🔄 Workflow

### Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                 WORKFLOW BOAT CONFIGURATION EDITOR              │
└─────────────────────────────────────────────────────────────────┘

1. SAISIE SHOP ORDER
   ├─> OrderNo: "97277"
   ├─> ReleaseNo: "*"
   └─> SequenceNo: "*"
   
2. RECHERCHE IFS CLOUD
   └─> POST /api/shop-orders/search

3. RÉCUPÉRATION SERIAL NUMBER
   ├─> Shop Order.DopId: "95 - 10088"
   ├─> Parse DOP ID: "95"
   └─> GET /api/serial-numbers?dopId=95
       → Serial Number: "LG5MA0114"

4. VALIDATION CUSTOMER ORDER (Optionnel)
   ├─> Recherche par Serial Number
   └─> GET /api/customer-orders?serialNumber=LG5MA0114
       → Customer Order: "C1000038587"

5. SÉLECTION IMPRESSION
   ├─> Imprimante: "PDF_PRINTER"
   └─> Langue: "fr"

6. IMPRESSION
   └─> POST /api/print
       ├─> Génération ResultKey
       ├─> Envoi Print Request
       ├─> Polling PDF Archive
       └─> Téléchargement PDF
```

---

## 🏗️ Architecture Technique

### Stack

| Composant | Technologie |
|-----------|-------------|
| **Frontend** | React 19 + Next.js 15 |
| **UI Components** | shadcn/ui + Radix UI |
| **Styling** | Tailwind CSS 4 |
| **API** | Next.js API Routes |
| **IFS Integration** | OAuth2 + OData v4 |
| **State Management** | React Hooks + SWR |

### Services Backend

```
src/lib/
├── ifs-client.ts                 # Client OAuth2 IFS
├── shop-order-service.ts         # Service Shop Orders
├── serial-number-service.ts      # Service Serial Numbers
├── dop-service.ts                # Service DOP Headers
├── customer-order-service.ts     # Service Customer Orders
├── printer-service.ts            # Service Imprimantes
├── language-service.ts           # Service Langues
└── print-service.ts              # Service Impression
```

### API Routes

```
src/app/api/
├── shop-orders/
│   └── search/route.ts          # POST /api/shop-orders/search
├── serial-numbers/
│   └── route.ts                 # GET /api/serial-numbers
├── customer-orders/
│   └── route.ts                 # GET /api/customer-orders
├── printers/
│   └── route.ts                 # GET /api/printers
├── languages/
│   └── route.ts                 # GET /api/languages
└── print/
    └── route.ts                 # POST /api/print
```

---

## 🧪 Tests

### Cas de test validés

| OrderNo | ReleaseNo | SequenceNo | Serial Number | Customer Order | Status |
|---------|-----------|------------|---------------|----------------|--------|
| 563 | * | * | JY6MB0019 | C1000038587 | ✅ |
| 949 | * | * | LX6MA0116 | - | ✅ |
| 97277 | * | * | LG5MA0114 | C1000038587 | ✅ |
| 1043 | * | * | LX6MA0115 | - | ✅ |

### Environnements

- **DEV (AST)** : https://beneteau-group-ast.ifs.cloud
- **PROD** : TBD

---

## 🚀 Installation & Déploiement

### Prérequis

- Node.js 18+
- pnpm 8+
- Accès IFS Cloud (AST ou PROD)
- Azure AD App Registration

### Configuration

```bash
# .env.local
IFS_BASE_URL=https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1
IFS_CLIENT_ID=AIS_IFS_MA_AST
IFS_CLIENT_SECRET=***
IFS_TOKEN_URL=https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token

AZURE_AD_CLIENT_ID=***
AZURE_AD_CLIENT_SECRET=***
AZURE_AD_TENANT_ID=***
```

### Démarrage

```bash
# Installation
pnpm install

# Développement
pnpm run dev

# Build
pnpm run build

# Production
pnpm run start
```

---

## 📊 API IFS Utilisées

| Service | Endpoint | Usage |
|---------|----------|-------|
| **ShopOrderHandling** | `/ShopOrderHandling.svc/ShopOrds` | Recherche Shop Orders |
| **DopHeaderHandling** | `/DopHeaderHandling.svc/Reference_DopHeadSerialReserv` | Récupération Serial Numbers |
| **CustomerOrderHandling** | `/CustomerOrderHandling.svc/CustomerOrderSet` | Validation Customer Orders |
| **PrintDialog** | `/PrintDialog.svc/*` | Gestion impression |

Documentation API : [Voir docs](../../api/)

---

## 🐛 Problèmes connus

### 1. DOP ID composite

**Problème** : Shop Order retourne parfois des DOP IDs composites (`"54 - 1035"`)

**Solution** : Parser avec `extractMainDopId()` avant requête

### 2. Environnement AST

**Problème** : Données incomplètes en environnement de test

**Solution** : Validation complète en environnement PROD

---

## 📝 Changelog

### v1.5 - 2025-10-10

- ✅ Intégration Customer Order complète
- ✅ Validation cohérence Serial Number ↔ Customer Order
- ✅ Amélioration UX avec messages d'erreur explicites

### v1.4 - 2025-10-08

- ✅ Impression PDF complète
- ✅ Téléchargement PDF
- ✅ Polling automatique archive PDF

### v1.3 - 2025-10-05

- ✅ Sélection imprimante et langue
- ✅ Génération ResultKey IFS

### v1.0 - 2025-09-25

- ✅ Recherche Shop Order
- ✅ Récupération Serial Number via DOP
- ✅ Interface utilisateur

---

## 🤝 Contribution

### Convention de code

- TypeScript strict mode
- ESLint + Prettier
- Tests unitaires obligatoires
- Documentation JSDoc

### Pull Request

1. Créer une branche feature
2. Implémenter + Tests
3. Update documentation
4. Submit PR avec description

---

**Maintenu par** : Équipe Manufacturing Portal  
**Contact** : [À définir]
