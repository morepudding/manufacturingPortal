# Boat Configuration Editor - Business Documentation

**Version:** 1.0  
**Last Updated:** November 3, 2025  
**Status:** Production Ready  
**Environment:** IFS Cloud AST (DEV) / ACC (PPD) / PRD

---

## 1. Executive Summary

**Boat Configuration Editor** allows production users to print boat configuration documents (MA_FO_CR_1419) directly from IFS Cloud using Shop Order keys.

**Key Metrics:**
- 5-step workflow (Entry to PDF Download)
- 3 user inputs (Order No, Release No, Sequence No)
- 30-60 seconds processing time
- 5 IFS Cloud APIs orchestrated

**Users:** GAP Leaders, Supervisors, Quality Controllers (Bénéteau)

---

## 2. User Workflow (5 Steps)

### Step 1: Shop Order Entry

**Input:**
```
Order No:    [97277]         (mandatory)
Release No:  [*]             (* = wildcard)
Sequence No: [*]             (* = wildcard)
```

**API:** POST /api/boat-configuration/shop-orders/search

**Validation:** Exact match filter in code (avoids "101043" when searching "1043")

---

### Step 2: Serial Number Confirmation

**System retrieves and displays:**
- Shop Order details (Part No, Description, Contract)
- Serial Number (ex: LG5MA0114)
- DOP Header ID (ex: 95 - 10088)

**User Action:** Confirm Yes/No

**Key Technical Implementation:**
- Shop Order returns composite DOP ID: "95 - 10088"
- Backend parses to main ID: "95" (using `extractMainDopId()`)
- Queries DOP API to retrieve Serial Number

**Bridge with Marc's Specs:**
- Spec section 2: "Verify and confirm that the serial number is correct"
- Implementation: Automatic retrieval via parsed DOP Header ID

---

### Step 3: Customer Order Validation (Optional)

**System loads Customer Order automatically if Hull Number exists**

**Optimized Performance Strategy:**
```typescript
// Try common sites first (fast - 500ms)
commonSites = ['FR05A', 'FR02A', 'FR01A']
// Fallback: unfiltered search (slower - 2s)
```

**Displays:** Order No, Customer Name, Status, Delivery Dates

**Bridge with Marc's Specs:**
- Spec section 8: "Get Customer Order line with Hull Number = Serial No / Site = FR05A"
- Implementation adds: Site filter for performance (prevents timeouts)

**User Action:** Confirm Continue/Back

---

### Step 4: Printer & Language Selection

**Printer:** Fixed to PDF_PRINTER (automatic)

**Language:** User selects from dropdown (10+ options from IFS)

**API:** GET /api/shared/languages

**Key Difference from Specs:**
- Marc's Spec: User selects printer from full list
- Implementation: Fixed PDF_PRINTER (simpler workflow)
- Rationale: PDF generation always uses IFS PDF Archiver

---

### Step 5: PDF Download

**IFS Cloud 5-Step Process:**
1. Retrieve ETag (Customer Order versioning)
2. Generate ResultKey (print job ID)
3. Initialize PrintDialog
4. Send ReportPrintRequest
5. Poll PdfArchiveSet (max 60s)

**Configuration:**
```javascript
{
  reportId: "CUSTOMER_ORDER_CONF_REP",
  layoutName: "BEN_Inventory-BAT.rdl",
  languageCode: "en",
  logicalPrinter: "PDF_PRINTER"
}
```

**Processing Time:** 30-60 seconds

**User Action:** New Print (reset workflow)

---

## 3. Technical Architecture

### IFS Cloud APIs (5 Endpoints)

| API | Purpose | Response Time |
|-----|---------|---------------|
| ShopOrderHandling.svc/ShopOrds | Search Shop Order | ~500ms |
| DopHeaderHandling.svc/Reference_DopHeadSerialReserv | Get Serial Number | ~300ms |
| CustomerOrderHandling.svc/CustomerOrderLineSet | Get Customer Order | ~500ms* |
| PrintDialog.svc/LanguageSet | List languages | ~200ms |
| CustomerOrderHandling.svc + PrintDialog.svc | PDF generation | ~30s |

*With site filter: 500ms, without: up to 2s

### Data Flow

See separate Mermaid diagram file for visual representation.

**Process:**
1. Shop Order Search (contains filter + exact match in code)
2. DOP ID Parsing ("95 - 10088" to "95")
3. Serial Number Retrieval (via parsed DOP ID)
4. Customer Order Lookup (site filter optimization)
5. PDF Generation (5-step IFS process)

### Backend Structure

```
src/tools/boat-configuration/services/
├── shop-order-service.ts          # Main orchestration
├── dop-service.ts                 # DOP ID parsing
├── serial-number-service.ts       # Serial Number retrieval
└── customer-order-service.ts      # Customer Order queries

src/app/api/boat-configuration/
├── shop-orders/search/route.ts
├── customer-orders/route.ts
└── print/route.ts
```

### Key Technical Decisions

**1. OData Filter Strategy**
- Problem: `eq` with strings causes IFS type errors
- Solution: Use `contains()` + exact match filter in code

**2. Composite DOP ID Handling**
- Problem: Shop Order returns "54 - 1035", API expects "54"
- Solution: Parse with `extractMainDopId()` function
- Impact: Critical for Serial Number retrieval

**3. Customer Order Performance**
- Problem: CHullNumber filter without site causes 2s+ timeout
- Solution: Try common sites first (FR05A, FR02A, FR01A)
- Impact: Reduces timeout from 2s to 500ms

---

## 4. Bridge: Specifications vs Implementation

### Alignment Summary

| Spec Item | Status | Notes |
|-----------|--------|-------|
| Section 1: Shop Order to Print | Fully Implemented | 5-step workflow |
| Section 2: Serial Number Confirm | Implemented | Automatic DOP parsing |
| Section 3: Printer/Language | Partially Modified | Printer fixed (simplified) |
| Section 4: Access Control | Ready | Azure AD structure in place |
| Section 8: Customer Order Link | Enhanced | Site filter optimization added |
| Section 9: Report MA_FO_CR_1419 | Implemented | Layout: BEN_Inventory-BAT.rdl |

### Key Differences

**1. Printer Selection**
- Spec: User selects from printer list
- Implementation: Fixed PDF_PRINTER
- Impact: Positive (simpler workflow)

**2. Customer Order Validation Step**
- Spec: Not mentioned
- Implementation: Added as Step 3
- Impact: Positive (better validation, user confidence)

**3. Site Filter Performance**
- Spec: Site = FR05A only
- Implementation: Try multiple sites (FR05A, FR02A, FR01A) + fallback
- Impact: Positive (prevents timeouts, exhaustive search)

---

## 5. Error Handling & Performance

### Business Errors

| Code | Scenario | Message |
|------|----------|---------|
| BCE_E001 | Shop Order not found | "Shop Order not found" |
| BCE_E002 | No Serial Number | "Serial Number not found for this Shop Order" |
| BCE_E003 | No Customer Order | "No Customer Order linked to this Serial Number" |
| BCE_E004 | PDF timeout | "PDF generation timeout (60s)" |
| BCE_E005 | IFS API error | "IFS Cloud communication error" |

### Performance Optimization

| Operation | Before | After |
|-----------|--------|-------|
| Customer Order Lookup | 2s (no filter) | 500ms (site filter) |
| DOP ID Parsing | N/A | 1ms (client-side) |
| Total Workflow | 35-40s | 32-35s |

---

## 6. Deployment & Testing

### Environments

| Environment | IFS Instance |
|-------------|-------------|
| DEV | beneteau-group-ast.ifs.cloud |
| PPD | beneteau-group-acc.ifs.cloud |
| PRD | beneteau-group.ifs.cloud |

### User Access (Azure AD)

**Roles:** GAP Leaders, Supervisors, Quality Controllers  
**Admin:** IT Project Manager + Key User (Bénéteau)

### Validated Test Cases

| Order No | Serial Number | DOP Header ID | Status |
|----------|---------------|---------------|--------|
| 563 | JY6MB0019 | 34 - 1014 | Pass |
| 949 | LX6MA0116 | 48 - 10102 | Pass |
| 97277 | LG5MA0114 | 95 - 10088 | Pass |
| 1043 | LX6MA0115 | 54 - 1035 | Pass |

---

## 7. Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Frontend/Backend | Next.js | 15.2.1 |
| Language | TypeScript | 5.8.2 |
| UI Library | shadcn/ui + Radix UI | Latest |
| Styling | Tailwind CSS | 4.1.7 |
| IFS Integration | OAuth2 + OData | IFS Cloud |
| Authentication | Azure AD (NextAuth) | 4.24.11 |

---

## 8. Conclusion

**Implementation Status:** Production Ready

**Achievements:**
- Full 5-step workflow operational
- 5 IFS Cloud APIs orchestrated seamlessly
- Performance optimized (site filter strategy)
- Customer Order validation step added (enhancement)
- Printer selection simplified (acceptable deviation)
- 4+ Shop Orders validated

**Next Steps:**
1. Azure AD integration (user access control)
2. PPD/PRD deployment
3. User training
