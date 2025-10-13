# 🖨️ IFS Cloud API - PrintDialog Service

**Service** : PrintDialog.svc  
**Type** : Projection API (OData v4)  
**Base URL** : `{IFS_BASE_URL}/PrintDialog.svc`  
**Authentication** : OAuth2 Bearer Token

---

## 📋 Vue d'ensemble

Le service **PrintDialog** gère le système d'impression IFS Cloud, incluant :
- Configuration des impressions (layout, langue, imprimante)
- Gestion des archives PDF
- Récupération des imprimantes logiques
- Sélection des langues disponibles

### Services connexes

- [PrintAgent](../print-agent/) - Gestion des jobs d'impression
- [CustomerOrderHandling](../customer-order/) - Impression de Customer Orders

---

## 🎯 Use Cases principaux

### 1. Workflow d'impression complet

```
1. Customer Order → PrintResultKey
2. PrintDialogInit (obtenir layout + configuration)
3. ReportPrintRequest (envoyer à l'imprimante)
4. PdfArchiveSet (télécharger PDF si besoin)
```

### 2. Récupération des options d'impression

```
- LogicalPrinterSet : Liste des imprimantes
- LanguageCodeSet : Liste des langues
- ReportLayoutDefinitionSet : Liste des layouts disponibles
```

---

## 📡 Endpoints

### PdfArchiveSet

Archive des PDFs générés par les impressions.

#### GET - Récupérer les PDFs archivés

```http
GET /PrintDialog.svc/PdfArchiveSet
```

**Query Parameters (OData)**

| Paramètre | Type | Description | Exemple |
|-----------|------|-------------|---------|
| `$filter` | string | Filtre OData | `ResultKey eq 558558` |
| `$select` | string | Champs à retourner | `ResultKey,FileName,PdfSize` |
| `$top` | integer | Limite de résultats | `10` |
| `$orderby` | string | Tri | `Created desc` |

**Champs disponibles**

| Champ | Type | Description |
|-------|------|-------------|
| `ResultKey` | number | Clé du résultat d'impression |
| `Id` | string (GUID) | ID unique du PDF |
| `FileName` | string | Nom du fichier |
| `PdfSize` | number | Taille en octets |
| `LayoutName` | string | Layout utilisé |
| `LangCode` | string | Code langue |
| `Created` | datetime | Date de création |

**Exemple de requête**

```typescript
const response = await ifsClient.get(
  'PrintDialog.svc/PdfArchiveSet',
  {
    '$filter': 'ResultKey eq 558558',
    '$select': 'ResultKey,Id,FileName,PdfSize,Created'
  }
)
```

**Réponse exemple**

```json
{
  "@odata.context": "...",
  "value": [
    {
      "ResultKey": 558558,
      "Id": "783d639e-990f-42ae-b617-d09a00860540",
      "FileName": "FR0090_SA502-558558.pdf",
      "PdfSize": 179712,
      "LayoutName": "BEN_Inventory-BAT.rdl",
      "LangCode": "fr",
      "Created": "2025-10-13T14:23:45Z"
    }
  ]
}
```

---

#### GET - Télécharger un PDF spécifique

```http
GET /PrintDialog.svc/PdfArchiveSet(ResultKey={n},Id='{guid}')/Pdf
```

**Headers requis**

```http
Authorization: Bearer {access_token}
Accept: application/octet-stream
```

**⚠️ IMPORTANT** : 
- Le header `Accept: application/octet-stream` est **obligatoire**
- Utiliser `/Pdf` (PAS `/Pdf/$value` qui retourne 500)
- Les deux paramètres `ResultKey` et `Id` sont requis (composite key)

**Exemple de requête**

```typescript
const pdfBuffer = await ifsClient.getRaw(
  `PrintDialog.svc/PdfArchiveSet(ResultKey=558558,Id='783d639e-990f-42ae-b617-d09a00860540')/Pdf`,
  undefined,
  { 'Accept': 'application/octet-stream' }
)

// Sauvegarder le fichier
fs.writeFileSync('document.pdf', Buffer.from(pdfBuffer))
```

**Réponse**

- **Status** : 200 OK
- **Content-Type** : application/pdf
- **Body** : Binaire PDF (ArrayBuffer)

---

### LogicalPrinterSet

Liste des imprimantes logiques disponibles.

#### GET - Récupérer les imprimantes

```http
GET /PrintDialog.svc/LogicalPrinterSet
```

**Champs disponibles**

| Champ | Type | Description |
|-------|------|-------------|
| `LogicalPrinter` | string | ID de l'imprimante |
| `Description` | string | Description |
| `PhysicalPrinter` | string | Imprimante physique associée |

**Exemple de requête**

```typescript
const response = await ifsClient.get(
  'PrintDialog.svc/LogicalPrinterSet',
  {
    '$select': 'LogicalPrinter,Description,PhysicalPrinter',
    '$orderby': 'LogicalPrinter'
  }
)
```

**Réponse exemple**

```json
{
  "value": [
    {
      "LogicalPrinter": "PDF_PRINTER",
      "Description": "PDF Archive Printer",
      "PhysicalPrinter": "PDF"
    },
    {
      "LogicalPrinter": "PRTMNF012",
      "Description": "Manufacturing Printer 012 - BW",
      "PhysicalPrinter": "HP LaserJet..."
    }
  ]
}
```

---

### LanguageCodeSet

Liste des langues disponibles pour les impressions.

#### GET - Récupérer les langues

```http
GET /PrintDialog.svc/LanguageCodeSet
```

**Champs disponibles**

| Champ | Type | Description |
|-------|------|-------------|
| `LangCode` | string | Code langue (ex: "fr", "en") |
| `Description` | string | Nom de la langue |
| `LangCodeRfc3066` | string | Code RFC 3066 |
| `Installed` | boolean | Langue installée |

**Exemple de requête**

```typescript
const response = await ifsClient.get(
  'PrintDialog.svc/LanguageCodeSet',
  {
    '$select': 'LangCode,Description',
    '$filter': 'Installed eq true',
    '$orderby': 'Description'
  }
)
```

**Réponse exemple**

```json
{
  "value": [
    { "LangCode": "da", "Description": "Dansk" },
    { "LangCode": "en", "Description": "English" },
    { "LangCode": "fr", "Description": "Français" },
    { "LangCode": "it", "Description": "Italiano" },
    { "LangCode": "pl", "Description": "Polski" },
    { "LangCode": "pt", "Description": "Português" }
  ]
}
```

---

### ReportLayoutDefinitionSet

Définitions des layouts de rapports disponibles.

#### GET - Récupérer les layouts

```http
GET /PrintDialog.svc/ReportLayoutDefinitionSet
```

**Champs disponibles**

| Champ | Type | Description |
|-------|------|-------------|
| `ReportId` | string | ID du rapport |
| `LayoutName` | string | Nom du layout |
| `LayoutTitle` | string | Titre du layout |
| `LayoutType` | enum | Type (ReportDesigner, ExcelReports, etc) |
| `Status` | enum | Published / Unpublished |

**Exemple de requête**

```typescript
const response = await ifsClient.get(
  'PrintDialog.svc/ReportLayoutDefinitionSet',
  {
    '$filter': "contains(ReportId,'CUSTOMER')",
    '$select': 'ReportId,LayoutName,LayoutTitle'
  }
)
```

**Réponse exemple**

```json
{
  "value": [
    {
      "ReportId": "CUSTOMER_ORDER_CONF_REP",
      "LayoutName": "BEN_Inventory-BAT.rdl",
      "LayoutTitle": "Customer Order Configuration"
    }
  ]
}
```

---

## 🔄 Actions (Service Operations)

### PrintDialogInit

Initialise un dialogue d'impression avec la configuration par défaut.

```http
POST /PrintDialog.svc/PrintDialogInit
Content-Type: application/json

{
  "ResultKey": 558558
}
```

**Réponse**

```json
{
  "ResultKey": 558558,
  "LayoutName": "BEN_Inventory-BAT.rdl",
  "ReportTitle": "Customer Order Configuration",
  "ReportId": "CUSTOMER_ORDER_CONF_REP",
  "LanguageCode": "fr",
  "LogicalPrinter": "PDF_PRINTER"
}
```

---

### ReportPrintRequest

Envoie une demande d'impression à IFS.

```http
POST /PrintDialog.svc/ReportPrintRequest
Content-Type: application/json

{
  "ResultKey": 558558,
  "LayoutName": "BEN_Inventory-BAT.rdl",
  "LanguageCode": "fr",
  "LogicalPrinter": "PDF_PRINTER",
  "Copies": 1
}
```

**Réponse**

- **Status** : 204 No Content (succès)
- **Body** : Vide

**⚠️ Note** : Le statut 204 indique que la demande d'impression a été acceptée. Le PDF sera disponible dans `PdfArchiveSet` après quelques secondes (polling requis).

---

## 🛠️ Workflow complet d'impression

### Scénario : Imprimer un Customer Order

```typescript
import { getIFSClient } from '@/lib/ifs-client'

async function printCustomerOrder(orderNo: string) {
  const client = getIFSClient()
  
  // 1. Obtenir le Customer Order + ETag
  const order = await client.get(
    `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')`
  )
  const etag = order['@odata.etag']
  
  // 2. Générer un ResultKey
  const resultKeyResponse = await client.post(
    `CustomerOrderHandling.svc/CustomerOrderSet(OrderNo='${orderNo}')/IfsApp.CustomerOrderHandling.CustomerOrder_PrintResultKey`,
    { ReportId: 'CUSTOMER_ORDER_CONF_REP' },
    { 'If-Match': etag }
  )
  const resultKey = parseInt(resultKeyResponse.value)
  
  // 3. Initialiser le Print Dialog
  const dialogResponse = await client.post(
    'PrintDialog.svc/PrintDialogInit',
    { ResultKey: resultKey }
  )
  
  // 4. Envoyer la demande d'impression
  await client.post(
    'PrintDialog.svc/ReportPrintRequest',
    {
      ResultKey: resultKey,
      LayoutName: dialogResponse.LayoutName,
      LanguageCode: 'fr',
      LogicalPrinter: 'PDF_PRINTER',
      Copies: 1
    }
  )
  
  // 5. Polling pour récupérer le PDF (avec retry)
  let pdfInfo = null
  for (let attempt = 0; attempt < 15; attempt++) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const archiveResponse = await client.get(
      'PrintDialog.svc/PdfArchiveSet',
      { '$filter': `ResultKey eq ${resultKey}` }
    )
    
    if (archiveResponse.value?.length > 0) {
      pdfInfo = archiveResponse.value[0]
      break
    }
  }
  
  // 6. Télécharger le PDF
  if (pdfInfo) {
    const pdfBuffer = await client.getRaw(
      `PrintDialog.svc/PdfArchiveSet(ResultKey=${pdfInfo.ResultKey},Id='${pdfInfo.Id}')/Pdf`,
      undefined,
      { 'Accept': 'application/octet-stream' }
    )
    
    return {
      resultKey,
      fileName: pdfInfo.FileName,
      pdfBuffer
    }
  }
  
  throw new Error('PDF not available after 15 seconds')
}
```

---

## ⚠️ Points d'attention & Découvertes critiques

### 1. Accept Header pour PDF

**❌ NE PAS FAIRE**
```http
Accept: application/pdf  # Retourne 400 Bad Request
```

**✅ CORRECT**
```http
Accept: application/octet-stream  # Fonctionne
```

### 2. Endpoint PDF

**❌ NE PAS FAIRE**
```
/PdfArchiveSet(...)/Pdf/$value  # Retourne 500 Internal Server Error
```

**✅ CORRECT**
```
/PdfArchiveSet(...)/Pdf  # Fonctionne
```

### 3. Composite Key

Le endpoint `PdfArchiveSet` nécessite **DEUX** paramètres :
- `ResultKey` (number)
- `Id` (GUID string)

```
PdfArchiveSet(ResultKey=558558,Id='783d639e-990f-42ae-b617-d09a00860540')
```

### 4. Status 204 No Content

Le status `204 No Content` de `ReportPrintRequest` signifie :
- ✅ La demande d'impression a été **acceptée**
- ⏳ Le PDF n'est **pas encore généré**
- 🔄 Polling requis sur `PdfArchiveSet`

Délai typique : 2-3 secondes

### 5. ReportId spécifique par environnement

- **AST (Dev)** : `CUSTOMER_ORDER_CONF_REP`
- **Production** : `MA_FO_CR_1419` (custom Bénéteau)

⚠️ Vérifier l'existence du ReportId avant utilisation !

---

## 📊 Codes d'erreur courants

| Code | Erreur | Cause | Solution |
|------|--------|-------|----------|
| 400 | Bad Request | Accept header incorrect | Utiliser `application/octet-stream` |
| 404 | Not Found | ReportId inexistant | Vérifier l'environnement (AST vs Prod) |
| 500 | Internal Server Error | Endpoint /$value incorrect | Utiliser `/Pdf` sans /$value |
| ORA-01722 | Invalid number | ReportId incompatible | Choisir un ReportId validé |

---

## 📚 Références

### Documentation IFS

- [IFS Cloud OData Documentation](https://docs.ifs.com/cloud/api/)
- [Print Dialog Projection API](https://beneteau-group-ast.ifs.cloud/main/ifsapplications/projection/v1/PrintDialog.svc/$metadata)

### Documentation projet

- [Workflow d'impression complet](../../tools/boat-configuration-editor/implementation/print-workflow.md)
- [Guide d'implémentation print](../../tools/boat-configuration-editor/implementation/print-guide.md)

---

**Dernière mise à jour** : 13 octobre 2025  
**Testé avec** : IFS Cloud AST (Beneteau Dev)  
**Validé par** : Implémentation Boat Configuration Editor
