# 📋 Spécification Format Étiquette Part Printer

**Date** : 15 octobre 2025  
**Version** : 1.0.0  
**Format** : A4 Paysage (297mm x 210mm)

---

## 🎯 Vue d'ensemble

Le format d'étiquette Part Printer est un **tableau multi-lignes** permettant de lister plusieurs Shop Orders regroupés par:
- **Raw Material** (matière première)
- **Varnish Code** (code vernis)

Une page = Un groupe (Raw Material + Varnish Code) avec plusieurs Shop Orders.

---

## 📐 Structure de la page

### Zone 1 : En-tête (Haut de page)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Part Printer              [CODE-BARRE]           Range            Varnish Code  │
│                              *285*              285 A               97773P        │
└─────────────────────────────────────────────────────────────────────────┘
```

**Disposition** :
- **Gauche** : `Part Printer` (titre, texte noir, gras)
- **Centre** : 
  - Code-barres graphique du trigger
  - Texte `*{quantième}*` en dessous
- **Centre-droite** : `Range` (label) + `{rangeId}` (valeur en gros)
- **Droite** : `Varnish Code` (label) + `{varnishCode}` (valeur en gros)

**Trigger d'impression** : `Quantième selon Start Date + Range`
- Exemple : Start Date = 2025-10-13 → Jour 286 de l'année → Trigger = `286 A` (si Range = "A")

---

### Zone 2 : Tableau des Shop Orders

```
┌───────┬──────────────┬────────────┬────────────────────┬─────────┬──────────────────┬──────────┐
│ Index │ Raw Material │ Shop Order │ Generic Part No +  │ Length  │ Barre-code       │ OP 10    │
│       │              │            │ revision           │         │                  │ Block ID │
├───────┼──────────────┼────────────┼────────────────────┼─────────┼──────────────────┼──────────┤
│   1   │  A1580K      │ 13246662   │ 00000553499-B     │  646.0  │ ▌▐ ▌ ▐▌▐ ▌ ▐ ▌▐ │   B25    │
│       │              │            │                    │         │ *00000553499-B*  │          │
├───────┼──────────────┼────────────┼────────────────────┼─────────┼──────────────────┼──────────┤
│   2   │  A1580K      │ 13246660   │ 00000553497-B     │  392.9  │ ▌▐ ▌ ▐▌▐ ▌ ▐ ▌▐ │   B25    │
│       │              │            │                    │         │ *00000553497-B*  │          │
└───────┴──────────────┴────────────┴────────────────────┴─────────┴──────────────────┴──────────┘
```

**Colonnes** :

| Colonne | Largeur | Description | Source |
|---------|---------|-------------|--------|
| **Index** | 8% | Numéro de ligne (1, 2, 3...) | Compteur |
| **Raw Material** | 12% | Code matière première | `label.rawMaterial` |
| **Shop Order** | 12% | Numéro d'ordre de fabrication | `label.orderNo` |
| **Generic Part No + revision** | 20% | Code générique + révision | `label.genericCode + "-" + label.engineeringPartRev` |
| **Length** | 10% | Longueur de la pièce | `label.lengthSetup` |
| **Barre-code** | 25% | Code-barres + texte | `label.barcode` |
| **OP 10 Block ID** | 13% | Identifiant du bloc OP10 | `label.blockId` |

---

## 🔢 Calcul du Trigger

### Formule

```typescript
const quantieme = getDayOfYear(startDate)
const trigger = `${quantieme} ${rangeId.split(' ')[1]}` // Ex: "285 A"
```

### Fonction getDayOfYear

```typescript
function getDayOfYear(dateString: string): number {
  const date = new Date(dateString)
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}
```

### Exemples

| Start Date | Jour de l'année | Range ID | Trigger |
|------------|-----------------|----------|---------|
| 2025-01-15 | 15 | 15 A | `15 A` |
| 2025-10-13 | 286 | 286 A | `286 A` |
| 2025-10-22 | 295 | 295 R | `295 R` |
| 2025-12-31 | 365 | 365 A | `365 A` |

---

## 📊 Groupement des données

### Logique de groupement

Les Shop Orders sont regroupés par :
1. **Raw Material** (clé primaire)
2. **Varnish Code** (clé secondaire)

### Algorithme

```typescript
interface GroupKey {
  rawMaterial: string
  varnishCode: string
}

function groupLabels(labels: PartLabel[]): Map<string, PartLabel[]> {
  const groups = new Map<string, PartLabel[]>()
  
  for (const label of labels) {
    const key = `${label.rawMaterial}_${label.varnishCode}`
    
    if (!groups.has(key)) {
      groups.set(key, [])
    }
    
    groups.get(key)!.push(label)
  }
  
  return groups
}
```

### Tri dans chaque groupe

Les Shop Orders sont triés par **Length Setup** décroissant :

```typescript
groupLabels.sort((a, b) => {
  const lengthA = parseFloat(a.lengthSetup) || 0
  const lengthB = parseFloat(b.lengthSetup) || 0
  return lengthB - lengthA // Décroissant
})
```

---

## 🎨 Dimensions et mise en page

### Page A4 Paysage

- **Largeur** : 297 mm (841.92 points)
- **Hauteur** : 210 mm (595.32 points)
- **Marges** : 10 mm de chaque côté

### En-tête

- **Hauteur** : 40 mm
- **Police "Part Printer"** : Helvetica Bold, 18pt
- **Police Range** : Helvetica Bold, 24pt
- **Police Varnish Code** : Helvetica Bold, 20pt
- **Code-barres trigger** : Hauteur 15mm, largeur variable

### Tableau

- **Hauteur en-tête** : 15 mm
- **Hauteur ligne** : 20 mm (minimum)
- **Hauteur ligne dynamique** : Ajustée si le barcode est grand
- **Bordures** : 0.5 mm
- **Police en-têtes** : Helvetica Bold, 11pt
- **Police cellules** : Helvetica, 10pt
- **Police barcode texte** : Courier, 8pt

---

## 📦 Exemple de données

### Shop Order 463215

```typescript
{
  orderNo: "463215",
  releaseNo: "*",
  sequenceNo: "*",
  partNo: "AN28-13-00.52C000001026112G110",
  startDate: "2025-10-22", // → Quantième 295
  
  rawMaterial: "N/A",
  blockId: "(vide)",
  
  genericCode: "C000001026112",
  varnishCode: "RCTL0000",
  lengthSetup: "0.5",
  rangeId: "295 R",
  engineeringPartRev: "N/A",
  barcode: "C000001026112_N/A"
}
```

### Rendu attendu

```
Part Printer              [▌▐ ▌ ▐▌]           Range            Varnish Code
                            *295*             295 R              RCTL0000

┌───────┬──────────────┬────────────┬────────────────────┬─────────┬──────────────────┬──────────┐
│ Index │ Raw Material │ Shop Order │ Generic Part No +  │ Length  │ Barre-code       │ OP 10    │
│       │              │            │ revision           │         │                  │ Block ID │
├───────┼──────────────┼────────────┼────────────────────┼─────────┼──────────────────┼──────────┤
│   1   │  N/A         │ 463215     │ C000001026112-N/A │  0.5    │ ▌▐ ▌ ▐▌▐ ▌ ▐ ▌▐ │  (vide)  │
│       │              │            │                    │         │*C000001026112_N/A│          │
└───────┴──────────────┴────────────┴────────────────────┴─────────┴──────────────────┴──────────┘
```

---

## 🔍 Points d'attention

### 1. Code-barres du trigger

- **Type** : CODE128 ou CODE39
- **Position** : Centre de l'en-tête
- **Données** : Quantième seul (ex: "295")
- **Texte** : `*{quantième}*` en dessous du barcode

### 2. Code-barres des Shop Orders

- **Type** : CODE128
- **Position** : Colonne "Barre-code"
- **Données** : `{genericCode}_{engineeringPartRev}` ou `{genericCode}_N/A`
- **Texte** : `*{barcode}*` en dessous du barcode graphique

### 3. Gestion des N/A

Si une donnée est manquante :
- `rawMaterial` → Afficher `"N/A"`
- `engineeringPartRev` → Afficher `"N/A"`
- `blockId` vide → Afficher `"(vide)"`
- `lengthSetup` → Afficher `"N/A"`

### 4. Format des nombres

- **Length** : 1 décimale (ex: `646.0`, `392.9`, `0.5`)
- **Shop Order** : Pas de séparateurs (ex: `13246662` pas `13 246 662`)
- **Quantième** : Entier (ex: `295` pas `295.0`)

---

## 📝 Mapping des données IFS → PDF

| Champ PDF | Source IFS | Transformation |
|-----------|------------|----------------|
| Index | Compteur | `i + 1` |
| Raw Material | `label.rawMaterial` | `|| 'N/A'` |
| Shop Order | `label.orderNo` | Direct |
| Generic Part No | `label.genericCode` | Direct |
| Revision | `label.engineeringPartRev` | `|| 'N/A'` |
| Length | `label.lengthSetup` | `toFixed(1)` ou `'N/A'` |
| Barre-code (data) | `label.barcode` | Direct |
| OP 10 Block ID | `label.blockId` | `|| '(vide)'` |
| **En-tête:** | | |
| Trigger | `getDayOfYear(label.startDate)` | Calcul quantième |
| Range | `label.rangeId` | Direct (ex: "295 R") |
| Varnish Code | `label.varnishCode` | Direct (ex: "RCTL0000") |

---

## 🚀 Implémentation

### Librairie recommandée

**jsPDF** : Compatible Next.js, pas de problème de polices

```bash
pnpm add jspdf
```

### Structure du service

```typescript
// src/tools/part-printer/services/label-pdf-service-table.ts

export async function generateLabelsPDF(
  labels: PartLabel[],
  options?: PDFGenerationOptions
): Promise<PDFGenerationResult> {
  // 1. Grouper par (Raw Material, Varnish Code)
  const groups = groupLabels(labels)
  
  // 2. Créer PDF A4 Paysage
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  
  // 3. Pour chaque groupe, générer une page
  for (const [groupKey, groupLabels] of groups.entries()) {
    generateGroupPage(doc, groupLabels, groupKey)
  }
  
  // 4. Retourner le buffer PDF
  return {
    buffer: Buffer.from(doc.output('arraybuffer')),
    pageCount: doc.getNumberOfPages(),
    labelCount: labels.length,
    groupCount: groups.size,
    size: doc.output('arraybuffer').byteLength
  }
}
```

---

## 📸 Capture d'écran de référence

Voir : `/home/rbottero/ManufacturingPortal/docs/exempleparfait.pdf`

**Caractéristiques observées** :
- ✅ Titre "Part Printer" en haut à gauche
- ✅ Code-barres du trigger au centre
- ✅ Range au centre-droite
- ✅ Varnish Code à droite
- ✅ Tableau avec 7 colonnes
- ✅ Index numérotés (1, 2, 3...)
- ✅ Code-barres graphiques + texte dans la colonne "Barre-code"
- ✅ Bordures de tableau visibles
- ✅ En-têtes sur 2 lignes ("Generic Part No +" sur ligne 1, "revision" sur ligne 2)

---

**Version** : 1.0.0  
**Auteur** : Manufacturing Portal Team  
**Dernière mise à jour** : 15 octobre 2025
