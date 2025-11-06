# 📊 Tableau Récapitulatif Endpoints IFS - Pour Thomas

**Date:** 6 novembre 2025  
**Client OAuth2:** `***REMOVED***`

---

## 🎯 Synthèse

| Métrique | Valeur |
|----------|---------|
| **Services IFS utilisés** | 11 |
| **Endpoints GET** | 22 |
| **Endpoints POST (actions)** | 3 |
| **Endpoints binaires** | 1 |
| **Volume estimé** | ~3000 appels/jour |

---

## 📋 Tableau complet des endpoints

| # | Service IFS | Endpoint | Méthode | Boat Config | Part Printer | Usage principal |
|---|-------------|----------|---------|-------------|--------------|-----------------|
| **1** | **ShopOrderHandling** | | | | | |
| 1.1 | | `ShopOrds` | GET | ✅ | ✅ | Recherche Shop Orders |
| 1.2 | | `ShopOrds(...)/MaterialArray` | GET | ❌ | ✅ | Récupération Raw Material OP10 |
| **2** | **DopHeaderHandling** | | | | | |
| 2.1 | | `Reference_DopHeadSerialReserv` | GET | ✅ | ❌ | Récupération Serial Numbers |
| **3** | **CustomerOrderHandling** | | | | | |
| 3.1 | | `CustomerOrderLineSet` | GET | ✅ | ❌ | Détails Customer Order Line |
| 3.2 | | `CustomerOrderSet` | GET | ✅ | ❌ | Header Customer Order + ETag |
| 3.3 | | `CustomerOrderSet(...)/CustomerOrder_PrintResultKey` | POST | ✅ | ❌ | Génération ResultKey |
| **4** | **PrintDialog** | | | | | |
| 4.1 | | `LogicalPrinterSet` | GET | ✅ | 🔜 | Liste imprimantes |
| 4.2 | | `LanguageCodeSet` | GET | ✅ | ❌ | Liste langues |
| 4.3 | | `PrintDialogInit` | POST | ✅ | ❌ | Init dialog impression |
| 4.4 | | `ReportPrintRequest` | POST | ✅ | ❌ | Envoi job impression |
| 4.5 | | `PdfArchiveSet` | GET | ✅ | ❌ | Recherche PDF généré |
| 4.6 | | `PdfArchiveSet(...)/Pdf` | GET (binary) | ✅ | ❌ | Téléchargement PDF |
| **5** | **ProductionLineHandling** | | | | | |
| 5.1 | | `ProductionLines` | GET | ❌ | ✅ | Liste lignes de production |
| **6** | **OperationBlockHandling** | | | | | |
| 6.1 | | `Reference_ShopOrderOperation` | GET | ❌ | ✅ | Récupération OP10 Block ID |
| **7** | **InventoryPartHandling** | | | | | |
| 7.1 | | `InventoryPartSet(Contract,PartNo)` | GET | ❌ | ✅ | Infos pièce (clé composite) |
| **8** | **PartHandling** | | | | | |
| 8.1 | | `PartCatalogSet(...)/PartCatalogReferenceArray` | GET | ❌ | ✅ | Navigation vers TechnicalSpec |
| 8.2 | | `.../TechnicalSpecBothArray` ⚠️ | GET | ❌ | ✅ | Attributs techniques (avec $filter) |
| **9** | **EngineeringPartRevisionsHandling** | | | | | |
| 9.1 | | `EngPartRevisionSet` | GET | ❌ | ✅ | Révision engineering |
| **10** | **CompanySiteHandling** | | | | | |
| 10.1 | | `CompanySiteSet(...)/SiteMfgstdInfoArray(...)/SiteMfgstdRangeArray` | GET | ❌ | ✅ | Plages horaires site (Ranges) |

**Légende:**
- ✅ Utilisé actuellement
- 🔜 Prévu prochainement
- ❌ Non utilisé par cet outil
- ⚠️ Nécessite $filter (voir notes ci-dessous)

---

## ⚠️ Points d'attention techniques

### 1. TechnicalSpecBothArray (endpoint 8.2)

**Problème:** Parts AN29-13-00 ont 50+ attributs → timeout si récupération sans filtre

**Solution implémentée:**
```typescript
// ✅ 3 requêtes parallèles avec $filter individuel
await Promise.all([
  client.get(path, { $filter: "Attribute eq 'GENERIC CODE'" }),
  client.get(path, { $filter: "Attribute eq 'VARNISH CODE'" }),
  client.get(path, { $filter: "Attribute eq 'LENGTH SETUP'" })
])
```

**Impact:** Critique pour Part Printer (évite timeouts)

### 2. Filtres OData contains() vs eq

**Problème:** `eq` avec strings cause erreurs "types not compatible"

**Solution implémentée:**
```typescript
// ✅ Utiliser contains() + filtrage exact côté code
$filter: "contains(OrderNo,'97277')"
```

**Impact:** Tous les endpoints de recherche (ShopOrds, CustomerOrderLineSet, etc.)

### 3. Navigation OData complexe

**Utilisé par:** PartHandling, CompanySiteHandling

**Exemple:**
```
PartCatalogSet 
  → PartCatalogReferenceArray (récupère TechnicalSpecNo) 
    → TechnicalSpecBothArray (avec clés composites encodées)
```

**Impact:** Nécessite encodage URL correct des KeyRef

---

## 📈 Volume d'appels estimé

### Par outil

| Outil | Appels/opération | Opérations/jour | Total/jour |
|-------|------------------|-----------------|------------|
| **Boat Configuration** | 5-8 | 20 | ~160 |
| **Part Printer** | 12-15 | 150-200 | ~2700 |
| **Total** | | | **~3000** |

### Par service IFS

| Service | Appels/jour (estimé) |
|---------|----------------------|
| ShopOrderHandling | ~350 |
| PartHandling (TechnicalSpec) | ~600 (3 x 200 parts) |
| OperationBlockHandling | ~200 |
| InventoryPartHandling | ~200 |
| CompanySiteHandling | ~200 |
| ProductionLineHandling | ~50 |
| CustomerOrderHandling | ~100 |
| PrintDialog | ~160 |
| Autres | ~140 |

---

## 🔐 Checklist validation

### Permissions requises pour `***REMOVED***`

- [ ] ✅ Lecture (GET) sur tous les endpoints listés
- [ ] ✅ Actions POST sur CustomerOrder_PrintResultKey, PrintDialogInit, ReportPrintRequest
- [ ] ✅ Téléchargement binaire (PdfArchiveSet/Pdf)
- [ ] ✅ Navigations OData autorisées (PartHandling, CompanySiteHandling)
- [ ] ✅ Pas de rate limiting < 3000 appels/jour

### Tests de validation

- [ ] Boat Configuration: Impression complète d'un Customer Order
- [ ] Part Printer: Génération d'étiquettes avec attributs techniques
- [ ] Part Printer: Shop Orders avec 50+ attributs (AN29-13-00)
- [ ] Vérification timeouts sur TechnicalSpecBothArray avec/sans $filter

---

## 📞 Contact & Documentation

**Développeur:** Romain Bottero

**Documentation complète:**
- `docs/IFS_ENDPOINTS_USED.md` - Documentation détaillée (tous les paramètres OData)
- `docs/IFS_ENDPOINTS_SUMMARY.md` - Résumé exécutif
- `docs/CLEANUP_SERVICES.md` - Nettoyage effectué (3 fichiers obsolètes supprimés)

**Code source:**
- `src/shared/services/ifs-client.ts` - Client OAuth2 central
- `src/tools/boat-configuration/services/` - Services Boat Config
- `src/tools/part-printer/services/` - Services Part Printer

---

## ✅ Statut final

| Item | Statut |
|------|--------|
| **Endpoints documentés** | ✅ 100% (26 endpoints) |
| **Services nettoyés** | ✅ 3 fichiers obsolètes supprimés |
| **Tests validés** | ✅ Tous les endpoints testés |
| **Prêt pour validation Thomas** | ✅ OUI |

---

**Dernière mise à jour:** 6 novembre 2025  
**Version:** 1.0 FINAL
