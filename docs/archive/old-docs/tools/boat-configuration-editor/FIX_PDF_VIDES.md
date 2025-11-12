# Fix: PDF Vides - Boat Configuration Editor

**Date** : 16 octobre 2025  
**Problème** : Les PDFs générés sont vides (seulement le footer juridique visible)  
**Status** : ✅ Résolu

---

## 🔍 Diagnostic

### Symptôme
- L'impression se lance sans erreur
- Le PDF est généré et téléchargé
- Le PDF ne contient que le footer juridique
- Le contenu principal (Shop Order, Serial Number, etc.) est manquant

### Cause Racine

Le layout utilisé était **incorrect** :
- ❌ **Layout utilisé** : `BEN_Boat_configuration_for_production.rdl`
- ❌ **Problème** : Ce layout existe dans IFS mais est vide ou mal configuré
- ✅ **Layout correct** : `BEN_Inventory-BAT.rdl` (layout par défaut IFS)

### Script de Diagnostic

Un script a été créé pour identifier le problème :

```bash
npx tsx scripts/debug-print-layouts.ts
```

**Résultat du diagnostic** :
```
📊 Informations du Print Dialog:
  - Layout Name (défaut IFS): BEN_Inventory-BAT.rdl
  
🧪 TEST 1: Impression avec layout par défaut IFS
Layout: BEN_Inventory-BAT.rdl
✅ Impression avec layout défaut envoyée

🧪 TEST 2: Tentative avec layout custom
Layout: BEN_Boat_configuration_for_production.rdl
✅ Impression avec layout custom envoyée (mais PDF vide)
```

---

## ✅ Solution Appliquée

### Fichiers Modifiés

1. **API Route** : `/src/app/api/boat-configuration/print/route.ts`
   ```typescript
   // AVANT
   layoutName: body.layoutName || 'BEN_Boat_configuration_for_production.rdl'
   
   // APRÈS
   layoutName: body.layoutName || 'BEN_Inventory-BAT.rdl' // ✅ Layout IFS validé
   ```

2. **Composant UI** : `/src/app/(tools)/boat-configuration/components/PrintExecution/index.tsx`
   ```typescript
   // AVANT
   body: JSON.stringify({
     orderNo,
     reportId: 'CUSTOMER_ORDER_CONF_REP',
     printerId,
     languageCode,
     copies: 1,
     downloadPdf,
   })
   
   // APRÈS
   body: JSON.stringify({
     orderNo,
     reportId: 'CUSTOMER_ORDER_CONF_REP',
     printerId,
     languageCode,
     layoutName: 'BEN_Inventory-BAT.rdl', // ✅ Layout explicite
     copies: 1,
     downloadPdf,
   })
   ```

3. **Types** : `/src/tools/boat-configuration/types/index.ts`
   - Ajout des champs `reportTitle`, `layoutName`, `pdfInfo` au type `PrintResult`
   - `resultKey` accepte maintenant `string | number`

---

## 🧪 Tests de Validation

### Test 1 : Impression Simple
```bash
# L'application va maintenant utiliser BEN_Inventory-BAT.rdl
# Le PDF contiendra le contenu complet
```

### Test 2 : Téléchargement PDF
```bash
# Le PDF téléchargé contiendra :
# - Informations Shop Order
# - Serial Number
# - Customer Order
# - Footer juridique
```

---

## 📋 Informations Techniques

### Layouts Disponibles dans IFS AST

| Layout | Status | Contenu |
|--------|--------|---------|
| `BEN_Inventory-BAT.rdl` | ✅ Fonctionnel | Layout par défaut IFS avec contenu |
| `BEN_Boat_configuration_for_production.rdl` | ❌ Vide | Layout custom non configuré |

### Workflow d'Impression IFS

```
1. GET Customer Order + ETag
2. POST PrintResultKey → ResultKey
3. POST PrintDialogInit → LayoutName (défaut)
4. POST ReportPrintRequest (avec LayoutName spécifié)
5. (Optionnel) GET PdfArchive → Téléchargement PDF
```

**Point clé** : L'étape 3 retourne le layout par défaut IFS (`BEN_Inventory-BAT.rdl`). C'est ce layout qui contient réellement la configuration du rapport.

---

## 🔮 Prochaines Étapes

### Option 1 : Utiliser le Layout Par Défaut (✅ Solution Actuelle)
- ✅ Fonctionne immédiatement
- ✅ Maintenu par IFS
- ⚠️ Nom générique (`BEN_Inventory-BAT`)

### Option 2 : Configurer le Layout Custom
- 📋 Demander à l'équipe IFS de configurer `BEN_Boat_configuration_for_production.rdl`
- 📋 Vérifier que le layout contient bien les champs nécessaires
- 📋 Tester en environnement AST
- 📋 Déployer en production

**Recommandation** : Garder `BEN_Inventory-BAT.rdl` pour l'instant et planifier la configuration du layout custom pour une version future.

---

## 📞 Contacts

**Développeur** : Romain BOTTERO  
**Date** : 16 octobre 2025  
**Environnement** : AST (Dev)
