# 🔧 Shared Components & Services

Ce dossier contient tous les composants, services et utilitaires partagés entre les différents outils du Manufacturing Portal.

## 📁 Structure

```
shared/
├── components/      # Composants UI réutilisables
│   ├── atoms/      # Composants de base (Button, Input, etc.)
│   ├── molecules/  # Composants composés (InputWithLabel, etc.)
│   └── organisms/  # Composants complexes (DataTable, Header, etc.)
├── services/       # Services partagés (IFS client, printer, language)
├── hooks/          # React hooks personnalisés
├── types/          # Types TypeScript partagés
└── utils/          # Fonctions utilitaires
```

## 🎯 Principes

- **Réutilisabilité** : Tout code partagé par au moins 2 outils doit être ici
- **Atomic Design** : Respecter la hiérarchie atoms → molecules → organisms
- **Type Safety** : Tout doit être typé avec TypeScript strict
- **Tests** : Chaque composant/service doit avoir ses tests

## 📦 Import

```typescript
// Composants
import { Button } from '@/shared/components/atoms/Button'
import { DataTable } from '@/shared/components/organisms/DataTable'

// Services
import { getIFSClient } from '@/shared/services/ifs-client'
import { printerService } from '@/shared/services/printer-service'

// Types
import type { IFSPrinter, IFSLanguage } from '@/shared/types/ifs'

// Utils
import { cn } from '@/shared/utils/cn'
```
