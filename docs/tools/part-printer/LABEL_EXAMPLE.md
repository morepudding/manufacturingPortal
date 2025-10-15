# 🏷️ Exemple d'Étiquette - Part Printer

**Shop Order** : 463215-*-*  
**Format** : A4 Paysage (297 x 210 mm)  
**Groupement** : Par (Raw Material / Varnish Code)  
**Tri** : Length Setup décroissant

---

## Étiquette Simple (1 pièce)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  BÉNÉTEAU - PRODUCTION MASSIF                    FR017                 │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  SHOP ORDER                                                             │
│  463215-*-*                                      Date: 2025-10-22       │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────   │
│                                                                         │
│  PART NUMBER            C000001026112G110                               │
│  DESCRIPTION            TRAVERSE                                        │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────   │
│                                                                         │
│  GENERIC CODE           C000001026112                                  │
│  LENGTH SETUP           N/A                                            │
│  VARNISH CODE           RCTL0000                                       │
│                                                                         │
│  RAW MATERIAL           N/A (à investiguer)                            │
│  BLOCK ID               (vide)                                         │
│                                                                         │
│  ENGINEERING REV        1                                              │
│  RANGE                  295 R                                          │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────   │
│                                                                         │
│                          ┌─────────────────┐                           │
│                          │   QR CODE       │                           │
│                          │   [████████]    │                           │
│                          │   C000001026112 │                           │
│                          └─────────────────┘                           │
│                                                                         │
│  ───────────────────────────────────────────────────────────────────   │
│                                                                         │
│  WORK CENTER: W4X09                          OP10                      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Étiquette Multi-Pièces (Groupées)

### Page 1 - Groupe : Raw Material = "AN28-15-00" / Varnish = "RCTL0000"

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                    │
│  BÉNÉTEAU - PRODUCTION MASSIF                              FR017                   │
│  ════════════════════════════════════════════════════════════════════════════════  │
│                                                                                    │
│  GROUPE: RAW MATERIAL AN28-15-00 / VARNISH RCTL0000         Date: 2025-10-22      │
│                                                                                    │
│  ──────────────────────────────────────────────────────────────────────────────  │
│                                                                                    │
│  N°  │ SHOP ORDER  │ PART NO          │ GENERIC CODE  │ LENGTH  │ QR CODE       │
│  ───────────────────────────────────────────────────────────────────────────────  │
│                                                                                    │
│  1   │ 463215-*-*  │ C000001026112G110│ C000001026112 │ N/A     │ [████████]    │
│  2   │ 463219-*-*  │ C000001026113G110│ C000001026113 │ N/A     │ [████████]    │
│  3   │ 463220-*-*  │ C000001026113G110│ C000001026113 │ N/A     │ [████████]    │
│  4   │ 463221-*-*  │ C000001026113G110│ C000001026113 │ N/A     │ [████████]    │
│  5   │ 463224-*-*  │ C000001026108G110│ C000001026108 │ N/A     │ [████████]    │
│                                                                                    │
│  ──────────────────────────────────────────────────────────────────────────────  │
│                                                                                    │
│  TOTAL: 5 pièces                                          Page 1/1                │
│                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Spécifications Étiquette

### Format Physique
- **Taille** : A4 Paysage (297 x 210 mm)
- **Orientation** : Horizontal
- **Marges** : 10 mm de chaque côté

### Zones
1. **En-tête** (30 mm)
   - Logo Bénéteau (gauche)
   - Titre "PRODUCTION MASSIF" (centre)
   - Site "FR017" (droite)

2. **Informations Shop Order** (40 mm)
   - Shop Order complet
   - Date de production
   - Part Number + Description

3. **Attributs Techniques** (60 mm)
   - Generic Code
   - Length Setup
   - Varnish Code
   - Raw Material
   - Block ID
   - Engineering Rev
   - Range

4. **QR Code** (50 mm)
   - Code-barres centré
   - Basé sur Generic Code + Revision
   - Taille : 40 x 40 mm

5. **Pied de page** (20 mm)
   - Work Center
   - Operation No

### Groupement & Tri
- **Groupement** : Par couple (Raw Material, Varnish Code)
- **Tri intra-groupe** : Length Setup décroissant
- **Pagination** : 1 page par groupe

### Police & Taille
- **En-tête** : Arial Bold 18pt
- **Shop Order** : Arial Bold 14pt
- **Attributs** : Arial Regular 12pt
- **Labels** : Arial Bold 10pt
- **QR Code** : Data Matrix ou QR Code standard

---

## 🎨 Données Affichées

| Champ | Source | Exemple | Obligatoire |
|-------|--------|---------|-------------|
| Shop Order | ShopOrds | 463215-*-* | ✅ Oui |
| Part No | ShopOrds | C000001026112G110 | ✅ Oui |
| Description | ShopOrds | TRAVERSE | ✅ Oui |
| Generic Code | TechnicalSpecBothArray | C000001026112 | ✅ Oui |
| Length Setup | TechnicalSpecBothArray | 2450 mm | ⚠️ Si dispo |
| Varnish Code | TechnicalSpecBothArray | RCTL0000 | ✅ Oui |
| Raw Material | MaterialHistorys | AN28-15-00 | ⚠️ Si dispo |
| Block ID | OperationBlockHandling | B25 ou (vide) | ✅ Oui |
| Engineering Rev | ShopOrds.EngChgLevel | 1 | ✅ Oui |
| Range | **Calculé** (date + mode) | 295 R | ✅ **RÉSOLU** |
| QR Code | Généré | Generic + Rev | ✅ Oui |
| Work Center | OperationBlockHandling | W4X09 | ✅ Oui |

---

## 🔧 Génération PDF

### Bibliothèques
- **jsPDF** : Génération PDF
- **qrcode** : Génération QR Code
- **pdf-lib** : Manipulation PDF avancée

### Workflow
1. Récupérer toutes les données (Shop Orders filtrés)
2. Grouper par (Raw Material, Varnish Code)
3. Trier par Length Setup décroissant
4. Générer 1 page PDF par groupe
5. Ajouter QR Code pour chaque pièce
6. Concaténer toutes les pages
7. Envoyer à l'imprimante sélectionnée

---

## ⚠️ Gestion des Données Manquantes

### Affichage sur l'étiquette

| Donnée manquante | Affichage | Note |
|------------------|-----------|------|
| Length Setup | `N/A` | Peut être normal pour certaines pièces |
| Raw Material | `N/A (à investiguer)` | ⚠️ Devrait exister |
| Block ID vide | `(vide)` | Normal pour certaines opérations |

**Range ID** : ✅ **RÉSOLU** - Calculé via `Quantième + Lettre` (R si Redébit, A si Débit classique)

### Couleurs (optionnel)
- ✅ Données présentes : Texte noir
- ⚠️ Données manquantes : Texte orange
- ❌ Erreurs critiques : Texte rouge

---

**Version** : 1.0  
**Dernière mise à jour** : 15 octobre 2025  
**Format validé** : Non (en attente validation utilisateur)
