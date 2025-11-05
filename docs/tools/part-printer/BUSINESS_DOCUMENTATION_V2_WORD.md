# Part Printer - Business Documentation V2

**Version**: 2.0  
**Date**: October 30, 2025  
**Developer**: Romain BOTTERO  
**Specification**: Marc TOCQUARD

---

## 1. Overview

### Purpose
**Part Printer** automates label and listing generation for wood parts in production. It replaces manual IFS navigation by consolidating data from 5+ IFS Cloud endpoints into ready-to-print documents.

### Business Context
- **Users**: GAP Leaders, Supervisors
- **Sites**: BDR, FR017, PRTBX
- **IFS Form**: MA_FO_CR_184 (labels)
- **Azure Interface**: MA_IN_EN_1543 (Logic App)

### Key Features
✅ Filter shop orders (site, date, production line, block ID)  
✅ 3 print modes: Listing Only / Labels Only / Listing + Labels  
✅ PDF generation (A4 landscape, grouped & sorted)  
✅ Azure Print API integration (OAuth2 + retry logic)  
✅ Error handling (6 blocking errors + 4 warnings)

---

## 2. User Workflow (7 Steps)

### Step 1: Site Selection ⭐ MANDATORY
- **Field**: Site (Contract)
- **Type**: Dropdown (LOV from IFS)
- **Example**: "BDR", "FR017", "PRTBX"
- **Error**: PP_E001 if no sites → STOPS

### Step 2: Production Date ⭐ MANDATORY*
- **Field**: Start Date
- **Type**: Calendar picker
- **Format**: YYYY-MM-DD
- **Rule**: Mandatory UNLESS Block ID filled

### Step 3: Production Line (Optional)
- **Field**: Production Line
- **Type**: Dropdown (filtered by site)
- **Example**: "Line 1", "CP", "M5"
- **Error**: PP_W002 if none → WARNING (continues)

### Step 4: Block ID (Optional)
- **Field**: OP10 Block ID
- **Type**: Text input
- **Example**: "B25", "B89"
- **Rule**: If filled, Date & Line become optional

### Step 5: Block Date Filter (Advanced)
- **Type**: Toggle ON/OFF + TRUE/FALSE
- **Default**: OFF
- **Logic**:
  - ON + TRUE = Classic cutting (CBlockDates = true)
  - ON + FALSE = Re-cutting (CBlockDates = false)
  - OFF = No filter

### Step 6: Sent to Cutting System (Advanced)
- **Type**: Toggle ON/OFF + TRUE/FALSE
- **Default**: OFF
- **Logic**: Filter shop orders sent/not sent to cutting system

### Step 7: Print Mode ⭐ MANDATORY

| Mode | Printer Required? | Button | Output |
|------|-------------------|--------|--------|
| **Listing Only** | ❌ No | 🔵 DOWNLOAD PDF | PDF only |
| **Labels Only** | ✅ Yes | 🟢 PRINT TO IFS | IFS printer only |
| **Listing + Labels** | ✅ Yes | 🟣 PRINT & DOWNLOAD | PDF + IFS printer |

**Printer Selection**:
- Required for: Labels Only, Listing + Labels
- Type: Dropdown (IFS Logical Printers)
- Example: "PRTBX105_P"
- Error: PP_W003 if none → Forces Listing Only mode

---

## 3. Data Consolidation

### Data Sources (5+ IFS Endpoints per Label)

**See separate Mermaid diagram file for visual representation**

For EACH shop order, the system queries:

1. **Shop Order API** → OrderNo, PartNo, Contract, StartDate
2. **Material Lines API** → Raw Material (OperationNo = 10)
3. **Operations API** → Block ID (OperationNo = 10)
4. **Master Part API** → TechnicalSpecNo
5. **Technical Attributes API** → 50+ attributes, filter by name:
   - GENERIC CODE (mandatory → PP_E004 if missing)
   - LENGTH SETUP (mandatory → PP_E005 if missing)
   - VARNISH CODE (optional → PP_W004 uses "N/A" if missing)
6. **Range Service** → Range ID (site + time-based letter)
7. **Barcode Generation** → CODE128 format

### Label Data Structure

| Field | Source | Mandatory | Error if Missing |
|-------|--------|-----------|------------------|
| OrderNo, PartNo | Shop Order | ✅ | PP_E002 |
| Raw Material | Material Lines (OP10) | ✅ | PP_E003 |
| Block ID | Operations (OP10) | ❌ | - |
| Generic Code | Master Part Attributes | ✅ | PP_E004 |
| Length Setup | Master Part Attributes | ✅ | PP_E005 |
| Varnish Code | Master Part Attributes | ❌ | PP_W004 (uses "N/A") |
| Range ID | Range Service | ❌ | PP_W001 (uses "N/A") |
| Barcode | Generated | ✅ | - |

### PDF Generation

**Format**: A4 Landscape (297mm x 210mm)

**Grouping Logic**:
1. Group labels by (Raw Material, Varnish Code) pair
2. Create 1 page per group
3. Sort by Length Setup descending within each group

**Columns**: Range | Varnish | Raw Material | Shop Order | Generic Code | Length | Barcode | Block ID

---

## 4. Print Modes & Azure Integration

### Azure Print API Details

**Endpoint**: `https://gbenapimgtaiscommondev.azure-api.net/manufacturing/print/execute/Print`

**Authentication**: OAuth2 Client Credentials (Azure AD)
- Token cached 55 minutes (60 min validity - 5 min margin)
- Automatic renewal on expiration

**Request Payload**:
```json
{
  "Printer": "PRTBX105_P",
  "PrintModel": "BEN_MA_FO_CR_184.rdl",
  "Selection": "ORDER_NO=495642^RELEASE_NO=*^SEQUENCE_NO=*^;"
}
```

**Retry Logic**: 3 attempts with exponential backoff (1s, 2s, 4s)

**Timeout**: 120 seconds (IFS generates labels)

### Print Mode Workflows

**Mode 1: Listing Only 📄**
1. User fills: Site + Date (no printer)
2. Clicks 🔵 DOWNLOAD PDF
3. System: Filters → Consolidates → Generates PDF
4. Result: PDF opens in new tab
5. ✅ No IFS print job

**Mode 2: Labels Only 🖨️**
1. User fills: Site + Date + Printer
2. Clicks 🟢 PRINT TO IFS
3. System: Filters → Generates Selection string → Calls Azure Print API
4. Result: "X labels printed to {printer}"
5. ✅ No PDF generated

**Mode 3: Listing + Labels 🎯**
1. User fills: Site + Date + Printer
2. Clicks 🟣 PRINT & DOWNLOAD
3. System: Filters → Consolidates → Generates PDF (parallel) → Calls Azure API (parallel)
4. Result: PDF opens + "X labels printed"
5. ✅ Both PDF and IFS print

---

## 5. Error Handling System

### Error Code Format
`PP_[E|W][XXX]` where E = Error (blocking), W = Warning (continues)

### Blocking Errors (STOPS Processing)

| Code | Trigger | User Action |
|------|---------|-------------|
| **PP_E001** | No sites retrieved | Contact support |
| **PP_E002** | No shop orders found | Adjust filters |
| **PP_E003** | Raw Material missing (OP10) | Check IFS data |
| **PP_E004** | Generic Code missing | Configure in IFS |
| **PP_E005** | Length Setup missing | Configure in IFS |
| **PP_E006** | Azure Print API failed | Retry or contact IT |

**Behavior**: Stops immediately, displays error dialog, logs with stack trace

### Warning Errors (CONTINUES with Degradation)

| Code | Trigger | Degraded Behavior |
|------|---------|-------------------|
| **PP_W001** | No ranges for site | Uses "N/A" for Range ID |
| **PP_W002** | No production lines | Production line filter disabled |
| **PP_W003** | No logical printers | Forces **Listing Only** mode |
| **PP_W004** | Varnish Code missing | Uses "N/A" as default |

**Behavior**: Continues processing, displays warning toast, logs, uses defaults

---

## 6. Technical Specifications

### IFS APIs Used

| API | Purpose |
|-----|---------|
| CompanySiteHandling.svc | List sites (contracts) |
| ProductionLineHandling.svc | List production lines |
| ShopOrderHandling.svc | Filter shop orders |
| ShopOrd(...)/ShopOrdOperationArray | Get Block ID (OP10) |
| ShopOrd(...)/MaterialArray | Get Raw Material (OP10) |
| PartCatalogHandling.svc/.../TechnicalSpecBothArray | Get technical attributes |
| CompanySite(...)/SiteMfgstdRangeArray | Get time ranges |
| PrintDialogHandling.svc | List IFS printers |

### Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js | 15.2.1 |
| Language | TypeScript | 5.8.2 |
| UI | shadcn/ui + Tailwind CSS | 4.1.7 |
| PDF | jsPDF | Latest |
| Barcode | JsBarcode | Latest |
| HTTP Client | Axios | 1.13.1 |

### Performance

**Caching**:
- OAuth2 tokens: 55 min (both IFS and Azure)
- Sites/Printers: Session cache

**Timeouts**:
- Shop Order filter: 30s
- Data extraction: 10s per endpoint
- PDF generation: 60s
- Azure Print API: 120s

**Processing**:
- Shop orders filtered once (batch)
- Data extraction sequential (avoid IFS overload)
- PDF + Azure Print parallel (Listing + Labels mode)

---

## 7. Deployment

### Environment Variables

```bash
# IFS Cloud OAuth2
IFS_BASE_URL=https://beneteau-group-ast.ifs.cloud/...
IFS_CLIENT_ID=AIS_IFS_MA_AST
IFS_CLIENT_SECRET=<secret>

# Azure Print API OAuth2
AZURE_PRINT_CLIENT_ID=1ed5fa70-9e6c-4bda-9540-32bd72c4b590
AZURE_PRINT_CLIENT_SECRET=<secret>
AZURE_PRINT_TENANT_ID=<tenant_id>

# Azure Print API Endpoint
AZURE_PRINT_API_URL=https://gbenapimgtaiscommondev.azure-api.net/...
AZURE_PRINT_SUBSCRIPTION_KEY=c5dcb4c8fdf34250b33a5988b269fb8d
```



---

## Conclusion

**Part Printer** automates wood part label generation by orchestrating 5+ IFS Cloud endpoints. Key features:

✅ **7-step workflow** with clear business rules  
✅ **3 print modes** for flexibility  
✅ **Robust error handling** (6 blocking + 4 warnings)  
✅ **Azure Print integration** with OAuth2 + retry logic  
✅ **Professional PDF** with grouping & sorting

**Deployment**: November 2025 (UAT phase)

---

**Developer**: Romain BOTTERO  
**Specification**: Marc TOCQUARD  
**Version**: 2.0 | October 30, 2025
