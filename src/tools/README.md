# 🛠️ Tools - Business Logic

Ce dossier contient la logique métier spécifique à chaque outil du Manufacturing Portal.

## 📁 Structure par outil

Chaque outil a sa propre structure :

```
tools/
├── boat-configuration/
│   ├── services/      # Services spécifiques (shop-order, serial-number, etc.)
│   ├── types/         # Types TypeScript spécifiques
│   ├── utils/         # Utilitaires spécifiques
│   └── README.md
│
└── part-printer/
    ├── services/      # Services spécifiques (raw-material, range, etc.)
    ├── types/         # Types TypeScript spécifiques
    ├── utils/         # Utilitaires spécifiques
    └── README.md
```

## 🎯 Principes

- **Isolation** : Le code d'un outil ne doit pas être accessible par un autre
- **Shared First** : Si du code est partageable, il doit être dans `/shared`
- **Business Logic Only** : Pas de composants UI ici (ils vont dans `/app/(tools)`)
- **Type Safety** : TypeScript strict obligatoire

## 📦 Import

```typescript
// ❌ Mauvais - Ne pas importer entre outils
import { shopOrderService } from '@/tools/boat-configuration/services/shop-order-service'
// depuis part-printer

// ✅ Bon - Importer son propre code
import { shopOrderService } from './services/shop-order-service'
// depuis boat-configuration

// ✅ Bon - Utiliser les services partagés
import { getIFSClient } from '@/shared/services/ifs-client'
```

## 🔄 Quand créer un nouveau service ?

1. Le service est spécifique à UN outil → `/tools/{tool}/services/`
2. Le service est utilisé par PLUSIEURS outils → `/shared/services/`
