# 🚤 Boat Configuration Editor - Business Logic

Ce dossier contient toute la logique métier spécifique à l'outil Boat Configuration Editor.

## 📁 Structure

```
boat-configuration/
├── services/          # Services métier
│   ├── shop-order-service.ts
│   ├── serial-number-service.ts
│   ├── dop-service.ts
│   ├── customer-order-service.ts
│   └── print-service.ts
├── types/            # Types TypeScript spécifiques
│   ├── shop-order.ts
│   ├── serial-number.ts
│   ├── customer-order.ts
│   └── index.ts
├── utils/            # Utilitaires spécifiques
└── README.md         # Ce fichier
```

## 🎯 Workflow principal

### Phase 1 : Shop Order → Serial Number
1. Recherche du Shop Order par OrderNo/ReleaseNo/SequenceNo
2. Extraction du DOP ID
3. Récupération du Serial Number via DOP Header

### Phase 2 : Sélection Imprimante & Langue
1. Liste des imprimantes disponibles
2. Liste des langues disponibles
3. Sélection utilisateur

### Phase 3 : Impression
1. Génération du PDF MA_FO_CR_1419
2. Envoi à l'imprimante
3. Confirmation

## 📦 Services disponibles

### `shop-order-service.ts`
Gestion des Shop Orders IFS

```typescript
import { shopOrderService } from '@/tools/boat-configuration/services/shop-order-service'

const result = await shopOrderService.searchShopOrder({
  orderNo: '97277',
  releaseNo: '*',
  sequenceNo: '*'
})
```

### `serial-number-service.ts`
Récupération des Serial Numbers

```typescript
import { serialNumberService } from '@/tools/boat-configuration/services/serial-number-service'

const serial = await serialNumberService.getSerialNumber(dopId)
```

### `customer-order-service.ts`
Gestion des Customer Orders

```typescript
import { customerOrderService } from '@/tools/boat-configuration/services/customer-order-service'

const order = await customerOrderService.getCustomerOrder(serialNo)
```

### `print-service.ts`
Service d'impression du PDF

```typescript
import { printService } from '@/tools/boat-configuration/services/print-service'

await printService.print({
  serialNumber,
  printer,
  language
})
```

## 🔗 Dépendances

- **Services partagés** : `@/shared/services/ifs-client`
- **Types partagés** : `@/shared/types/ifs`
- **Utils partagés** : `@/shared/utils/utils`

## ✅ Tests

Cas de test validés :
- Order 97277 → Serial LG5MA0114
- Order 563 → Serial JY6MB0019
- Order 949 → Serial LX6MA0116
- Order 1043 → Serial LX6MA0115
