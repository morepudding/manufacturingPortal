# 📱 Tools - UI Pages & Components

Ce dossier contient les pages et composants UI spécifiques à chaque outil.

## 📁 Structure

```
(tools)/
├── boat-configuration/
│   ├── page.tsx           # Page principale
│   ├── layout.tsx         # Layout spécifique (optionnel)
│   └── components/        # Composants UI spécifiques
│
└── part-printer/
    ├── page.tsx           # Page principale
    ├── layout.tsx         # Layout spécifique (optionnel)
    └── components/        # Composants UI spécifiques
```

## 🎯 Principes

- **Route Grouping** : Le `(tools)` permet de grouper sans affecter l'URL
- **URL** : `/boat-configuration` pointe vers `app/(tools)/boat-configuration/page.tsx`
- **UI Only** : Seuls les composants React et pages Next.js ici
- **Business Logic** : Doit être dans `/tools/{tool}/services/`

## 📦 Import

```typescript
// Composants partagés
import { Button } from '@/shared/components/atoms/Button'
import { DataTable } from '@/shared/components/organisms/DataTable'

// Composants spécifiques locaux
import { ShopOrderSearch } from './components/ShopOrderSearch'

// Services spécifiques à l'outil
import { shopOrderService } from '@/tools/boat-configuration/services/shop-order-service'

// Services partagés
import { printerService } from '@/shared/services/printer-service'
```

## 🔄 Quand créer un composant ici vs shared ?

1. Composant spécifique à UN outil → `/app/(tools)/{tool}/components/`
2. Composant réutilisé par PLUSIEURS outils → `/shared/components/`
