# 📡 IFS Cloud Endpoints Utilisés - Manufacturing Portal

**Date:** 6 novembre 2025  
**Version:** 1.0  
**Status:** Validation Thomas requis

---

## 📋 Vue d'ensemble

Ce document liste **TOUS** les endpoints IFS Cloud OData utilisés par le Manufacturing Portal (Boat Configuration Editor + Part Printer).

**Base URL:** `https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1`

---

## 🔐 Authentification

### Endpoint OAuth2
- **URL:** `https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token`
- **Méthode:** POST
- **Grant Type:** `client_credentials`
- **Scope:** `openid microprofile-jwt`
- **Client ID:** `***REMOVED***`
- **Usage:** Authentification pour tous les appels API

---

## 🛠️ Endpoints Partagés (Boat Config + Part Printer)

### 1. ShopOrderHandling.svc

#### 1.1 Recherche Shop Orders
```
GET ShopOrderHandling.svc/ShopOrds
```
**Paramètres OData:**
- `$filter`: `contains(OrderNo,'97277')`
- `$select`: `OrderNo,ReleaseNo,SequenceNo,DopId,PartNo,PartDescription,Contract,CustomerOrderNo,CustomerLineNo`
- `$top`: `10`

**Usage:**
- ✅ Boat Configuration: Recherche Shop Order par OrderNo
- ✅ Part Printer: Extraction des sites (distinct Contract) et filtrage Shop Orders

**Code:** 
- `src/tools/boat-configuration/services/shop-order-service.ts`
- `src/tools/part-printer/services/site-service.ts`
- `src/tools/part-printer/services/shop-order-filter-service.ts`

#### 1.2 Navigation MaterialArray
```
GET ShopOrderHandling.svc/ShopOrds(OrderNo='454853',ReleaseNo='*',SequenceNo='*')/MaterialArray
```
**Paramètres OData:**
- `$filter`: `OperationNo eq 10`
- `$select`: `LineItemNo,PartNo,OperationNo`
- `$orderby`: `LineItemNo`
- `$top`: `1`

**Usage:**
- ✅ Part Printer: Récupération Raw Material (première ligne OP10)

**Code:**
- `src/tools/part-printer/services/operation-service.ts`
- `src/tools/part-printer/services/material-line-service.ts`

---

### 2. PrintDialog.svc

#### 2.1 Logical Printers
```
GET PrintDialog.svc/LogicalPrinterSet
```
**Paramètres OData:**
- `$select`: `LogicalPrinter,Description`
- `$orderby`: `LogicalPrinter asc`

**Usage:**
- ✅ Boat Configuration: Liste des imprimantes disponibles
- ✅ Part Printer: Liste des imprimantes pour étiquettes

**Code:**
- `src/app/api/shared/printers/route.ts`

#### 2.2 Language Codes
```
GET PrintDialog.svc/LanguageCodeSet
```
**Paramètres OData:**
- `$select`: `LanguageCode,Description`
- `$orderby`: `LanguageCode asc`

**Usage:**
- ✅ Boat Configuration: Liste des langues disponibles

**Code:**
- `src/app/api/shared/languages/route.ts`

#### 2.3 Print Workflow (Boat Configuration uniquement)
```
1. POST PrintDialog.svc/PrintDialogInit
   Body: { ResultKey: 123456 }

2. POST PrintDialog.svc/ReportPrintRequest
   Body: {
     ResultKey: 123456,
     LayoutName: "BEN_Boat_configuration_for_production.rdl",
     LanguageCode: "fr",
     LogicalPrinter: "PDF_PRINTER",
     Copies: 1
   }

3. GET PrintDialog.svc/PdfArchiveSet
   $filter: ResultKey eq 123456
   $top: 1

4. GET PrintDialog.svc/PdfArchiveSet(ResultKey=123456,Id='xxx-xxx')/Pdf
   Accept: application/octet-stream
```

**Usage:**
- ✅ Boat Configuration: Workflow complet d'impression Customer Order

**Code:**
- `src/tools/boat-configuration/services/print-service.ts`
- `src/app/api/boat-configuration/print/route.ts`

---

## 🚢 Endpoints Boat Configuration Editor

### 3. DopHeaderHandling.svc

#### 3.1 Serial Number Reservation
```
GET DopHeaderHandling.svc/Reference_DopHeadSerialReserv
```
**Paramètres OData:**
- `$filter`: `contains(DopId,'54')`
- `$select`: `DopId,SerialNo,PartNo`
- `$top`: `50`

**Usage:**
- ✅ Récupération Serial Number à partir du DOP Header ID

**Code:**
- `src/tools/boat-configuration/services/serial-number-service.ts`

---

### 4. CustomerOrderHandling.svc

#### 4.1 Customer Order Line (Par OrderNo + LineNo)
```
GET CustomerOrderHandling.svc/CustomerOrderLineSet
```
**Paramètres OData:**
- `$filter`: `OrderNo eq 'C1000038587' and LineNo eq '1'`
- `$select`: `OrderNo,LineNo,RelNo,LineItemNo,PartNo,CatalogNo,CatalogDesc,CHullNumber,BoatHullNumber,CustomerNo,ConfigurationId,Objstate,BuyQtyDue,QtyOrdered,DopConnection,DopConnectionExists,SupplyCode,Contract,Company,PlannedDeliveryDate,WantedDeliveryDate`

**Usage:**
- ✅ Récupération détails Customer Order depuis Shop Order (OrderNo + LineNo)

**Code:**
- `src/tools/boat-configuration/services/customer-order-service.ts`

#### 4.2 Customer Order Header
```
GET CustomerOrderHandling.svc/CustomerOrderSet
```
**Paramètres OData:**
- `$filter`: `OrderNo eq 'C1000038587'`
- `$select`: `OrderNo,CustomerNo,CustomerName,Objstate,DateEntered,Contract,Company,CurrencyCode,WantedDeliveryDate,CustomerPoNo,InternalPoNo`
- `$top`: `1`

**Usage:**
- ✅ Récupération infos client (nom, dates, PO)

**Code:**
- `src/tools/boat-configuration/services/customer-order-service.ts`

#### 4.3 Customer Order (GET pour ETag)
```
GET CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='C1000038587')
```
**Usage:**
- ✅ Récupération ETag pour Print Workflow

**Code:**
- `src/tools/boat-configuration/services/print-service.ts`

#### 4.4 Print Result Key (Action)
```
POST CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='C1000038587')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey
```
**Body:**
```json
{
  "ReportId": "PROFORMA_INVOICE_REP"
}
```
**Headers:**
- `If-Match`: `<etag>`

**Usage:**
- ✅ Génération ResultKey pour impression

**Code:**
- `src/tools/boat-configuration/services/print-service.ts`

---

## 🏷️ Endpoints Part Printer

### 5. ProductionLineHandling.svc

#### 5.1 Production Lines
```
GET ProductionLineHandling.svc/ProductionLines
```
**Paramètres OData:**
- `$select`: `ProductionLine,Description,Contract`
- `$orderby`: `ProductionLine asc`
- `$top`: `1000`

**Usage:**
- ✅ Liste des lignes de production par site (filtrage local par Contract)

**Code:**
- `src/tools/part-printer/services/production-line-service.ts`

---

### 6. OperationBlockHandling.svc

#### 6.1 Shop Order Operations
```
GET OperationBlockHandling.svc/Reference_ShopOrderOperation
```
**Paramètres OData:**
- `$filter`: `OrderNo eq '454853' and OperationNo eq 10`
- `$select`: `OrderNo,ReleaseNo,SequenceNo,OperationNo,OpId,OperationBlockId,OperationDescription,WorkCenterNo`

**Usage:**
- ✅ Récupération OperationBlockId de l'opération 10

**Code:**
- `src/tools/part-printer/services/operation-service.ts`

---

### 7. InventoryPartHandling.svc

#### 7.1 Inventory Part (Clé composite)
```
GET InventoryPartHandling.svc/InventoryPartSet(Contract='BDR',PartNo='1000014690G136')
```
**Usage:**
- ✅ Récupération informations de base d'une pièce

**Code:**
- `src/tools/part-printer/services/master-part-service.ts`

---

### 8. PartHandling.svc

#### 8.1 Part Catalog Reference Array
```
GET PartHandling.svc/PartCatalogSet(PartNo='1000014690G136')/PartCatalogReferenceArray
```
**Paramètres OData:**
- `$select`: `LuName,KeyRef,TechnicalSpecNo`

**Usage:**
- ✅ Récupération TechnicalSpecNo pour accès aux attributs techniques

**Code:**
- `src/tools/part-printer/services/master-part-service.ts`

#### 8.2 Technical Spec Both Array (Navigation complète)
```
GET PartHandling.svc/PartCatalogSet(PartNo='1000014690G136')/PartCatalogReferenceArray(LuName='InventoryPart',KeyRef='CONTRACT%3DBDR%5EPART_NO%3D1000014690G136%5E',TechnicalSpecNo=229)/TechnicalSpecBothArray
```
**Paramètres OData (3 requêtes parallèles):**

1. **GENERIC CODE:**
   - `$filter`: `Attribute eq 'GENERIC CODE'`
   - `$select`: `ValueText`

2. **VARNISH CODE:**
   - `$filter`: `Attribute eq 'VARNISH CODE'`
   - `$select`: `ValueText`

3. **LENGTH SETUP:**
   - `$filter`: `Attribute eq 'LENGTH SETUP'`
   - `$select`: `ValueNo`

**⚠️ CRITIQUE:** Utiliser `$filter` pour éviter timeouts sur parts avec 50+ attributs (ex: AN29-13-00)

**Usage:**
- ✅ Extraction des 3 attributs Part Printer (Generic Code, Varnish Code, Length Setup)

**Code:**
- `src/tools/part-printer/services/master-part-service.ts`

---

### 9. EngineeringPartRevisionsHandling.svc

#### 9.1 Engineering Part Revision
```
GET EngineeringPartRevisionsHandling.svc/EngPartRevisionSet
```
**Paramètres OData:**
- `$filter`: `PartNo eq 'C000001026112G110'`
- `$select`: `PartNo,PartRev,Description`
- `$orderby`: `PartRev desc`
- `$top`: `1`

**Usage:**
- ✅ Récupération de la révision engineering la plus récente

**Code:**
- `src/tools/part-printer/services/master-part-service.ts`

---

### 10. CompanySiteHandling.svc

#### 10.1 Site Manufacturing Standard Ranges
```
GET CompanySiteHandling.svc/CompanySiteSet(Contract='FR017')/SiteMfgstdInfoArray(Contract='FR017')/SiteMfgstdRangeArray
```
**Paramètres OData:**
- `$select`: `Contract,Range,StartTime,FinishTime`
- `$orderby`: `StartTime asc`

**Usage:**
- ✅ Récupération des plages horaires (Ranges) pour calcul Range ID

**Code:**
- `src/tools/part-printer/services/range-service.ts`

---

## 📊 Statistiques d'utilisation

### Par outil

| Service IFS | Boat Config | Part Printer | Partagé |
|-------------|-------------|--------------|---------|
| ShopOrderHandling | ✅ | ✅ | ✅ |
| PrintDialog | ✅ | 🔜 Futur | ✅ |
| DopHeaderHandling | ✅ | ❌ | ❌ |
| CustomerOrderHandling | ✅ | ❌ | ❌ |
| ProductionLineHandling | ❌ | ✅ | ❌ |
| OperationBlockHandling | ❌ | ✅ | ❌ |
| InventoryPartHandling | ❌ | ✅ | ❌ |
| PartHandling | ❌ | ✅ | ❌ |
| EngineeringPartRevisionsHandling | ❌ | ✅ | ❌ |
| CompanySiteHandling | ❌ | ✅ | ❌ |

### Total endpoints

- **11 services IFS** utilisés
- **3 services partagés** (ShopOrderHandling, PrintDialog - printers/languages)
- **4 services exclusifs Boat Configuration**
- **7 services exclusifs Part Printer**

---

## 🚫 Endpoints NON utilisés (à nettoyer)

### ❌ Aucun endpoint inutilisé détecté

Tous les endpoints implémentés sont activement utilisés par les deux outils.

---

## 🔧 Configuration technique

### Client IFS (ifs-client.ts)

**Fichier:** `src/shared/services/ifs-client.ts`

**Fonctionnalités:**
- ✅ Authentification OAuth2 (Client Credentials Flow)
- ✅ Cache du token avec expiration automatique
- ✅ Méthodes: `get()`, `post()`, `getRaw()` (binary)
- ✅ Gestion erreurs + logging

**Variables d'environnement:**
```bash
IFS_BASE_URL=https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1
IFS_CLIENT_ID=your_ifs_client_id_here
IFS_CLIENT_SECRET=your_ifs_client_secret_here
IFS_TOKEN_URL=https://beneteau-group-ast.ifs.cloud/auth/realms/beneast1/protocol/openid-connect/token
IFS_SCOPE=openid microprofile-jwt
```

---

## 📝 Notes importantes

### 1. Filtres OData

⚠️ **PROBLÈME CONNU:** `eq` avec strings cause erreurs "types not compatible"

✅ **SOLUTION:** Utiliser `contains()` + filtrage exact côté code

```typescript
// ❌ Mauvais
$filter: "OrderNo eq '97277'"

// ✅ Bon
$filter: "contains(OrderNo,'97277')"
// + filtrage exact en JavaScript après récupération
```

### 2. DOP ID composite

⚠️ **PROBLÈME:** IFS retourne `"54 - 1035"`, mais Serial Number service cherche avec `"54"`

✅ **SOLUTION:** Parser avec `extractMainDopId()` → `"54"`

**Code:** `src/tools/boat-configuration/services/dop-service.ts`

### 3. TechnicalSpecBothArray (Part Printer)

⚠️ **CRITIQUE:** Parts avec 50+ attributs (ex: AN29-13-00) causent timeouts

✅ **SOLUTION:** Utiliser `$filter` pour chaque attribut individuellement

```typescript
// ✅ 3 requêtes parallèles avec $filter
await Promise.all([
  client.get(fullPath, { $filter: "Attribute eq 'GENERIC CODE'" }),
  client.get(fullPath, { $filter: "Attribute eq 'VARNISH CODE'" }),
  client.get(fullPath, { $filter: "Attribute eq 'LENGTH SETUP'" })
])
```

### 4. Cache

✅ **Implémenté:**
- Range Service: 5 minutes TTL
- Master Part Attributes: 5 minutes TTL
- OAuth2 Token: Automatique (expires_in - 60s)

---

## 🔐 Permissions IFS requises

### Pour Thomas - Vérifier que le client `***REMOVED***` a accès à :

**Boat Configuration Editor:**
- ✅ ShopOrderHandling (lecture)
- ✅ DopHeaderHandling (lecture)
- ✅ CustomerOrderHandling (lecture + actions Print)
- ✅ PrintDialog (lecture + actions Print + téléchargement PDF)

**Part Printer:**
- ✅ ShopOrderHandling (lecture + navigation MaterialArray)
- ✅ ProductionLineHandling (lecture)
- ✅ OperationBlockHandling (lecture)
- ✅ InventoryPartHandling (lecture)
- ✅ PartHandling (lecture + navigation TechnicalSpecBothArray)
- ✅ EngineeringPartRevisionsHandling (lecture)
- ✅ CompanySiteHandling (lecture + navigation SiteMfgstdRangeArray)

---

## 📞 Contact

**Pour questions techniques IFS:**
- Thomas (IFS Administrator)

**Pour questions applicatives:**
- Romain Bottero (Manufacturing Portal Developer)

---

**Dernière mise à jour:** 6 novembre 2025  
**Version:** 1.0
