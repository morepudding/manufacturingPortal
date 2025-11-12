# 📡 Résumé Endpoints IFS - Pour Thomas

**Date:** 6 novembre 2025  
**Client OAuth2:** `***REMOVED***`

---

## 🎯 Services IFS utilisés (11 au total)

### ✅ Partagés (Boat Config + Part Printer)

1. **ShopOrderHandling.svc**
   - `ShopOrds` (lecture)
   - `ShopOrds(...)/MaterialArray` (navigation)

2. **PrintDialog.svc** 
   - `LogicalPrinterSet` (lecture)
   - `LanguageCodeSet` (lecture)
   - Actions Print (Boat Config uniquement pour l'instant)

---

### 🚢 Boat Configuration Editor (4 services exclusifs)

3. **DopHeaderHandling.svc**
   - `Reference_DopHeadSerialReserv` (lecture)

4. **CustomerOrderHandling.svc**
   - `CustomerOrderLineSet` (lecture - **EXCLUSIVEMENT site FR05A**)
   - `CustomerOrderSet` (lecture + actions Print)
   - Action `CustomerOrder_PrintResultKey`
   - ⚠️ **CRITIQUE**: Boat Configuration utilise **UNIQUEMENT FR05A** (jamais FR018 ou autre)

---

### 🏷️ Part Printer (7 services exclusifs)

5. **ProductionLineHandling.svc**
   - `ProductionLines` (lecture)

6. **OperationBlockHandling.svc**
   - `Reference_ShopOrderOperation` (lecture)

7. **InventoryPartHandling.svc**
   - `InventoryPartSet(Contract,PartNo)` (lecture clé composite)

8. **PartHandling.svc**
   - `PartCatalogSet(...)/PartCatalogReferenceArray` (navigation)
   - `PartCatalogReferenceArray(...)/TechnicalSpecBothArray` (navigation + $filter)

9. **EngineeringPartRevisionsHandling.svc**
   - `EngPartRevisionSet` (lecture)

10. **CompanySiteHandling.svc**
    - `CompanySiteSet(...)/SiteMfgstdInfoArray(...)/SiteMfgstdRangeArray` (navigation)

---

## 🔐 Permissions requises

### Client `***REMOVED***` doit avoir accès à :

**Lecture (GET):**
- ✅ Tous les endpoints listés ci-dessus

**Actions (POST):**
- ✅ `CustomerOrder_PrintResultKey` (Boat Config)
- ✅ `PrintDialogInit` (Boat Config)
- ✅ `ReportPrintRequest` (Boat Config)

**Téléchargement binaire:**
- ✅ `PdfArchiveSet(...)/Pdf` (Boat Config)

---

## ⚠️ Points d'attention

### 1. Filtres OData

**Problème:** `eq` avec strings cause erreurs  
**Solution adoptée:** Utiliser `contains()` + filtrage côté code

### 2. TechnicalSpecBothArray (Part Printer)

**Critique:** Parts AN29-13-00 ont 50+ attributs  
**Solution adoptée:** Utiliser `$filter` pour chaque attribut individuellement (évite timeouts)

```typescript
// ✅ Bon (3 requêtes parallèles avec $filter)
$filter: "Attribute eq 'GENERIC CODE'"
$filter: "Attribute eq 'VARNISH CODE'"
$filter: "Attribute eq 'LENGTH SETUP'"
```

### 3. Navigation OData complexe

**Part Printer utilise des navigations en 2 étapes:**

```
PartCatalogSet → PartCatalogReferenceArray (récupère TechnicalSpecNo)
                ↓
         TechnicalSpecBothArray (avec clés composites)
```

**Confirmé fonctionnel** sur environnement AST.

---

## 📊 Volume d'appels estimé

### Boat Configuration Editor
- **1-5 appels/impression** (faible volume)
- Peak: ~20 impressions/jour

### Part Printer
- **10-15 appels/étiquette** (volume moyen)
- Peak: ~100-200 étiquettes/jour = **1000-3000 appels/jour**

**Total estimé:** ~3000 appels IFS/jour max

---

## 📝 Documentation complète

**Voir:** `/docs/IFS_ENDPOINTS_USED.md`

- Détails de chaque endpoint
- Paramètres OData utilisés
- Exemples de code
- Résolution des problèmes connus

---

## ✅ Validation nécessaire

**Vérifier que le client `***REMOVED***` a bien :**

1. ✅ Accès en lecture aux 11 services listés
2. ✅ Accès aux actions Print (CustomerOrderHandling + PrintDialog)
3. ✅ Pas de rate limiting bloquant (3000 appels/jour)
4. ✅ Navigations OData autorisées (PartHandling, CompanySiteHandling)

---

**Contact:** Romain Bottero  
**Documentation complète:** `docs/IFS_ENDPOINTS_USED.md`
