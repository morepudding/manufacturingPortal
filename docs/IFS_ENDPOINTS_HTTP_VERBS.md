# 📡 Endpoints IFS - Verbes HTTP

**Date:** 6 novembre 2025  
**Client OAuth2:** `***REMOVED***`  
**Pour:** Thomas (validation permissions IFS)

---

## 📋 Liste complète des endpoints avec verbes HTTP

### 1. ShopOrderHandling.svc

| Endpoint | Verbe HTTP | Usage |
|----------|------------|-------|
| `ShopOrds` | **GET** | Recherche Shop Orders |
| `ShopOrds(OrderNo='X',ReleaseNo='Y',SequenceNo='Z')/MaterialArray` | **GET** | Navigation vers Raw Material |

---

### 2. DopHeaderHandling.svc

| Endpoint | Verbe HTTP | Usage |
|----------|------------|-------|
| `Reference_DopHeadSerialReserv` | **GET** | Récupération Serial Numbers |

---

### 3. CustomerOrderHandling.svc

| Endpoint | Verbe HTTP | Usage |
|----------|------------|-------|
| `CustomerOrderLineSet` | **GET** | Recherche Customer Order Lines |
| `CustomerOrderSet` | **GET** | Recherche Customer Orders + récupération ETag |
| `CustomerOrderSet(OrderNo='X')` | **GET** | Récupération Customer Order spécifique (avec ETag) |
| `CustomerOrderSet(OrderNo='X')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey` | **POST** | Action : Générer ResultKey pour impression |

---

### 4. PrintDialog.svc

| Endpoint | Verbe HTTP | Usage |
|----------|------------|-------|
| `LogicalPrinterSet` | **GET** | Liste des imprimantes disponibles |
| `LanguageCodeSet` | **GET** | Liste des langues disponibles |
| `PrintDialogInit` | **POST** | Action : Initialiser dialog d'impression |
| `ReportPrintRequest` | **POST** | Action : Envoyer job d'impression |
| `PdfArchiveSet` | **GET** | Recherche PDF généré |
| `PdfArchiveSet(ResultKey=X,Id='Y')/Pdf` | **GET** | Téléchargement binaire du PDF |

---

### 5. ProductionLineHandling.svc

| Endpoint | Verbe HTTP | Usage |
|----------|------------|-------|
| `ProductionLines` | **GET** | Liste des lignes de production |

---

### 6. OperationBlockHandling.svc

| Endpoint | Verbe HTTP | Usage |
|----------|------------|-------|
| `Reference_ShopOrderOperation` | **GET** | Récupération opérations Shop Order |

---

### 7. InventoryPartHandling.svc

| Endpoint | Verbe HTTP | Usage |
|----------|------------|-------|
| `InventoryPartSet(Contract='X',PartNo='Y')` | **GET** | Récupération pièce (clé composite) |

---

### 8. PartHandling.svc

| Endpoint | Verbe HTTP | Usage |
|----------|------------|-------|
| `PartCatalogSet(PartNo='X')/PartCatalogReferenceArray` | **GET** | Navigation vers références techniques |
| `PartCatalogReferenceArray(LuName='X',KeyRef='Y',TechnicalSpecNo=Z)/TechnicalSpecBothArray` | **GET** | Navigation vers attributs techniques |

---

### 9. EngineeringPartRevisionsHandling.svc

| Endpoint | Verbe HTTP | Usage |
|----------|------------|-------|
| `EngPartRevisionSet` | **GET** | Récupération révisions engineering |

---

### 10. CompanySiteHandling.svc

| Endpoint | Verbe HTTP | Usage |
|----------|------------|-------|
| `CompanySiteSet(Contract='X')/SiteMfgstdInfoArray(Contract='X')/SiteMfgstdRangeArray` | **GET** | Navigation vers plages horaires site |

---

## 📊 Statistiques

| Verbe HTTP | Nombre d'endpoints | Pourcentage |
|------------|-------------------|-------------|
| **GET** | 22 | 85% |
| **POST** | 3 | 11% |
| **GET (binary)** | 1 | 4% |
| **Total** | 26 | 100% |

---

## 🔐 Permissions requises par verbe

### GET (22 endpoints)
- **Permission nécessaire:** Lecture (Read) sur tous les services listés
- **Critique:** Navigation OData (clés composites, chemins complexes)

### POST (3 endpoints - Actions IFS)
- **CustomerOrder_PrintResultKey** (CustomerOrderHandling)
- **PrintDialogInit** (PrintDialog)
- **ReportPrintRequest** (PrintDialog)
- **Permission nécessaire:** Exécution d'actions (Action/Function execution)

### GET binary (1 endpoint)
- **PdfArchiveSet(...)/Pdf** (PrintDialog)
- **Permission nécessaire:** Lecture + téléchargement binaire (application/octet-stream)

---

## ⚠️ Notes importantes

### Actions POST (3 endpoints)

Ces 3 endpoints POST sont des **Actions IFS OData** (pas des créations/modifications classiques) :

1. **CustomerOrder_PrintResultKey**
   - Format : `CustomerOrderSet(OrderNo='X')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey`
   - Headers requis : `If-Match: <etag>`
   - Body : `{ "ReportId": "PROFORMA_INVOICE_REP" }`

2. **PrintDialogInit**
   - Format : `PrintDialog.svc/PrintDialogInit`
   - Body : `{ "ResultKey": 123456 }`

3. **ReportPrintRequest**
   - Format : `PrintDialog.svc/ReportPrintRequest`
   - Body : `{ "ResultKey": 123456, "LayoutName": "...", "LanguageCode": "fr", "LogicalPrinter": "...", "Copies": 1 }`

### GET binary (1 endpoint)

Le téléchargement PDF nécessite :
- Header `Accept: application/octet-stream`
- Réponse : ArrayBuffer (binaire)

### Navigation OData

Les endpoints PartHandling et CompanySiteHandling utilisent des navigations OData complexes avec :
- Clés composites encodées URL
- Chemins en 2-3 étapes
- Navigation imbriquée

---

## ✅ Checklist validation Thomas

- [ ] Lecture (GET) autorisée sur les 10 services
- [ ] Exécution d'actions (POST) autorisée sur CustomerOrderHandling + PrintDialog
- [ ] Téléchargement binaire (GET avec Accept: application/octet-stream) autorisé
- [ ] Navigation OData avec clés composites autorisée
- [ ] Pas de rate limiting < 3000 requêtes/jour

---

**Documentation complète :** `docs/IFS_ENDPOINTS_SUMMARY.md`  
**Contact :** Romain Bottero
