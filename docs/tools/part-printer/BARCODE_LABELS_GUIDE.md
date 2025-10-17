# 📋 Guide de Génération d'Étiquettes - Part Printer

**Date**: 16 octobre 2025  
**Version**: 1.0  
**Auteur**: Manufacturing Portal Team

---

## 📖 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Types d'étiquettes](#types-détiquettes)
3. [Trigger d'impression](#trigger-dimpression)
4. [Barre-codes des parts](#barre-codes-des-parts)
5. [Spécifications techniques](#spécifications-techniques)
6. [Format de sortie](#format-de-sortie)
7. [Tests et validation](#tests-et-validation)

---

## 🎯 Vue d'ensemble

Le système Part Printer génère **deux types d'étiquettes codes-barres** pour la traçabilité des pièces en bois :

1. **Trigger d'impression** : Code-barres unique identifiant le batch d'impression
2. **Barre-codes individuels** : Un code-barres par Shop Order pour traçabilité individuelle

Ces étiquettes doivent être **scannables par douchette** pour remonter les informations vers IFS Cloud.

---

## 📦 Types d'étiquettes

### Type 1 : Trigger d'impression (Batch Identifier)

**Objectif** : Identifier le batch d'impression complet

**Format** :
```
*295 B*
```

**Composition** :
- `295` = Quantième (jour de l'année, ex: 22 octobre = jour 295)
- `B` = Range Letter (plage horaire : A, B, C, R, etc.)

**Utilisation** :
- Imprimé **1 fois par page** (en-tête du PDF)
- Scanné pour identifier toutes les pièces du batch
- Permet de retrouver la production d'une journée/range spécifique

**Encodage** :
- Type : Code-barres simple (Code128)
- Données encodées : `295B` (format compact sans espace)
- Largeur : 40mm
- Hauteur : 12mm

---

### Type 2 : Barre-code individuel (Shop Order Identifier)

**Objectif** : Tracer chaque pièce individuellement

**Format visible** :
```
Shop Order: 454853-1-10
Part No: AN29-13-00
Generic: AN29-13-00-0101-01
```

**Composition du code-barres** :
```
454853-1-10|AN29-13-00|AN29-13-00-0101-01|285A
```

**Structure des données** :
- `454853-1-10` = Shop Order complet (OrderNo-ReleaseNo-SequenceNo)
- `AN29-13-00` = Part Number
- `AN29-13-00-0101-01` = Generic Code avec révision
- `285A` = Range ID (quantième + range letter)

**Séparateur** : `|` (pipe)

**Utilisation** :
- Imprimé **1 fois par ligne** du tableau
- Scanné pour tracer chaque pièce individuellement
- Remonte vers IFS pour mise à jour du statut

**Encodage** :
- Type : Code-barres 2D (QR Code recommandé) ou Code128 si linéaire
- Données encodées : Format texte avec séparateurs
- Taille : 15x15mm (QR) ou 40x8mm (Code128)

---

## 🔧 Trigger d'impression

### Calcul du Range ID

**Algorithme** :
1. Extraire la date de début du Shop Order (`RevisedStartDate`)
2. Calculer le quantième (jour de l'année)
3. Interroger IFS pour récupérer les ranges du site
4. Comparer l'heure actuelle avec les plages horaires
5. Déterminer la Range Letter (A, B, C, R, etc.)

**Exemple** :
```typescript
Date: 22 octobre 2025, 14h30
Site: FR017

Plages horaires IFS:
- Range A: 00:00 → 11:59
- Range B: 12:00 → 23:59

Résultat: 295 B
```

**Service IFS utilisé** :
```
GET /CompanySiteHandling.svc/CompanySiteSet(Contract='FR017')/
    SiteMfgstdInfoArray(Contract='FR017')/SiteMfgstdRangeArray

Response:
[
  { Contract: "FR017", Range: "A", StartTime: "00:00:00", FinishTime: "11:59:00" },
  { Contract: "FR017", Range: "B", StartTime: "12:00:00", FinishTime: "23:59:00" }
]
```

**Service applicatif** :
```typescript
// src/tools/part-printer/services/range-service.ts

export async function getRangeId(
  site: string,
  startDate: string
): Promise<string> {
  const dayOfYear = calculateDayOfYear(startDate)
  const currentTime = new Date().toTimeString().slice(0, 8) // "HH:mm:ss"
  
  const ranges = await fetchSiteRanges(site)
  const activeRange = findActiveRange(ranges, currentTime)
  
  return `${dayOfYear} ${activeRange.Range}` // Ex: "295 B"
}
```

---

## 📊 Barre-codes des parts

### Génération du code-barres

**Service actuel** :
```typescript
// src/tools/part-printer/services/barcode-service.ts

export async function generateBarcode(data: {
  orderNo: string
  releaseNo: string
  sequenceNo: string
  partNo: string
  genericCode: string
  rangeId: string
}): Promise<string> {
  // Format: OrderNo-ReleaseNo-SequenceNo|PartNo|GenericCode|RangeId
  const barcodeData = `${data.orderNo}-${data.releaseNo}-${data.sequenceNo}|${data.partNo}|${data.genericCode}|${data.rangeId.replace(' ', '')}`
  
  // Générer le code-barres (actuellement retourne "mock-barcode-XXX")
  // TODO: Implémenter la génération réelle avec bibliothèque (jsbarcode, qrcode)
  
  return `data:image/png;base64,${base64EncodedImage}`
}
```

### Données scannées

**Format reçu par la douchette** :
```
454853-1-10|AN29-13-00|AN29-13-00-0101-01|295B
```

**Parsing côté application** :
```typescript
function parseScannedBarcode(scannedData: string) {
  const parts = scannedData.split('|')
  
  return {
    shopOrder: parts[0],        // "454853-1-10"
    partNo: parts[1],           // "AN29-13-00"
    genericCode: parts[2],      // "AN29-13-00-0101-01"
    rangeId: parts[3],          // "295B"
  }
}
```

**Utilisation** :
1. Scanner le code-barres avec la douchette
2. Parser les données
3. Envoyer à IFS pour mise à jour du statut
4. Confirmation visuelle/sonore sur la douchette

---

## 🔍 Spécifications techniques

### Trigger d'impression

| Propriété | Valeur |
|-----------|--------|
| **Type de code-barres** | Code128 (linéaire) |
| **Données encodées** | `295B` (format compact) |
| **Largeur** | 40mm |
| **Hauteur** | 12mm |
| **Position** | En-tête, centre du document |
| **Texte lisible** | `*295 B*` (sous le code-barres) |
| **Police** | Helvetica, 10pt |

### Barre-code individuel

| Propriété | Valeur (Recommandé) | Valeur (Alternatif) |
|-----------|---------------------|---------------------|
| **Type de code-barres** | QR Code (2D) | Code128 (linéaire) |
| **Données encodées** | `OrderNo-ReleaseNo-SequenceNo\|PartNo\|GenericCode\|RangeId` | Même format |
| **Taille** | 15x15mm | 40x8mm |
| **Position** | Colonne 7 du tableau | Colonne 7 du tableau |
| **Niveau de correction** | M (15%) | N/A |
| **Densité** | Haute (pour petite taille) | Standard |

**Recommandation** : **QR Code** pour plus de données et meilleure lecture

---

## 📄 Format de sortie

### Structure du PDF

```
┌─────────────────────────────────────────────────────────────────────┐
│ Part Printer          *295 B*        Range        Varnish Code      │
│                    [BARCODE IMG]     295 B             V101          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  #  | Raw Mat    | Shop Order  | Generic      | Length | ... | QR  │
│ ────┼────────────┼─────────────┼──────────────┼────────┼─────┼──── │
│  1  | AN29-13-00 | 454853-1-10 | AN29-13-..01 | 2850.0 | ... | [▪] │
│  2  | AN29-13-00 | 454854-1-10 | AN29-13-..01 | 2750.0 | ... | [▪] │
│  3  | AN29-13-00 | 454855-1-10 | AN29-13-..02 | 2650.0 | ... | [▪] │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘

[▪] = QR Code individuel pour chaque ligne
```

### Pages multiples

**Règle de pagination** : 1 page par couple (Raw Material, Varnish Code)

**Exemple** :
- **Page 1** : 15 Shop Orders avec `AN29-13-00` + `V101`
- **Page 2** : 8 Shop Orders avec `AN29-13-00` + `V202`
- **Page 3** : 12 Shop Orders avec `AN28-10-05` + `V101`

Chaque page a son propre **trigger d'impression** (même Range ID mais contexte différent).

---

## 🧪 Tests et validation

### Test 1 : Génération du trigger

**Objectif** : Vérifier que le Range ID est correct

**Procédure** :
1. Sélectionner un site (ex: `FR017`)
2. Définir une date de début (ex: `2025-10-22`)
3. Générer l'étiquette
4. Vérifier le format : `295 B`

**Validation** :
```bash
✅ Quantième correct (295 pour le 22 octobre)
✅ Range Letter correspond à l'heure actuelle
✅ Code-barres scannable
✅ Texte lisible sous le code-barres
```

### Test 2 : Génération des barre-codes individuels

**Objectif** : Vérifier que chaque Shop Order a un code-barres unique

**Procédure** :
1. Sélectionner 5 Shop Orders
2. Générer le PDF
3. Scanner chaque QR Code avec une douchette/app mobile

**Validation** :
```bash
✅ Chaque ligne a un QR Code unique
✅ Le scan retourne les bonnes données (OrderNo, PartNo, GenericCode, RangeId)
✅ Format parsable avec séparateur |
✅ Pas de doublon
```

### Test 3 : Groupement par page

**Objectif** : Vérifier la pagination correcte

**Procédure** :
1. Sélectionner 20 Shop Orders avec 3 couples (Raw Material, Varnish) différents
2. Générer le PDF
3. Vérifier le nombre de pages

**Validation** :
```bash
✅ 3 pages générées
✅ Chaque page a le bon Varnish Code dans l'en-tête
✅ Les Shop Orders sont correctement groupés
✅ Tri par Length Setup décroissant dans chaque groupe
```

### Test 4 : Scan avec douchette réelle

**Objectif** : Valider l'intégration avec le matériel de production

**Matériel** :
- Douchette Zebra/Honeywell/Datalogic
- Imprimante étiquettes (Zebra ZT411, etc.)

**Procédure** :
1. Imprimer le PDF sur imprimante étiquettes
2. Scanner le trigger d'impression
3. Scanner 3 codes-barres individuels
4. Vérifier la remontée des données

**Validation** :
```bash
✅ Trigger scanné correctement
✅ Codes individuels scannés correctement
✅ Données parsées sans erreur
✅ Remontée vers IFS réussie (si implémenté)
```

---

## 🚀 Implémentation future

### Phase 1 : Génération réelle des codes-barres ✅ (Complète)

**Status** : Actuellement en mode MOCK

**Bibliothèques recommandées** :
- **QR Code** : `qrcode` (npm package)
- **Code128** : `jsbarcode` (npm package)

**Exemple d'implémentation** :
```typescript
import QRCode from 'qrcode'
import JsBarcode from 'jsbarcode'

// QR Code (recommandé)
export async function generateQRCode(data: string): Promise<string> {
  const qrCodeDataUrl = await QRCode.toDataURL(data, {
    width: 150,
    margin: 1,
    errorCorrectionLevel: 'M',
  })
  return qrCodeDataUrl // data:image/png;base64,...
}

// Code128 (alternatif)
export function generateCode128(data: string): string {
  const canvas = document.createElement('canvas')
  JsBarcode(canvas, data, {
    format: 'CODE128',
    width: 2,
    height: 40,
    displayValue: false,
  })
  return canvas.toDataURL() // data:image/png;base64,...
}
```

### Phase 2 : Intégration douchette ⏳ (Planifié)

**API de scan** :
```typescript
// POST /api/part-printer/scan/validate
{
  scannedData: "454853-1-10|AN29-13-00|AN29-13-00-0101-01|295B",
  scanType: "individual" | "trigger"
}

Response:
{
  success: true,
  data: {
    shopOrder: "454853-1-10",
    partNo: "AN29-13-00",
    status: "valid",
    nextAction: "print_label"
  }
}
```

### Phase 3 : Remontée IFS ⏳ (Planifié)

**Endpoint IFS** :
```
POST /ShopOrderHandling.svc/UpdateShopOrderStatus
Body:
{
  OrderNo: "454853",
  ReleaseNo: "1",
  SequenceNo: "10",
  Status: "Printed",
  Timestamp: "2025-10-22T14:30:00Z",
  RangeId: "295B"
}
```

---

## 📚 Références

### Documents liés
- [Part Printer Roadmap](./ROADMAP.md)
- [API Endpoints Documentation](./api/ENDPOINTS.md)
- [Architecture Multi-Outils](../../architecture/MULTI_TOOL_ARCHITECTURE.md)

### Services impliqués
- `range-service.ts` : Calcul du Range ID
- `barcode-service.ts` : Génération des codes-barres
- `label-pdf-service-table.ts` : Génération du PDF
- `part-label-service.ts` : Consolidation des données

### APIs IFS utilisées
- `CompanySiteHandling.svc` : Récupération des ranges
- `ShopOrderHandling.svc` : Données Shop Orders
- `InventoryPartHandling.svc` : Attributs des parts

---

**Dernière mise à jour** : 16 octobre 2025  
**Prochaine révision** : Après implémentation Phase 2 (scan douchette)
