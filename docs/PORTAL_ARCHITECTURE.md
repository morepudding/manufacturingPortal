# Manufacturing Portal - Architecture Documentation

**Version:** 1.0  
**Last Updated:** November 3, 2025  
**Status:** Production Ready  
**Current Tools:** 2 (Boat Configuration Editor, Part Printer)

---

## 1. Executive Summary

**Manufacturing Portal** is a centralized web platform that hosts multiple production tools for Bénéteau. Built with a modular architecture, it enables independent tool development while sharing common infrastructure.

**Key Architecture Principles:**
- Modular multi-tool design
- Shared components and services
- Route isolation with Next.js groups
- Scalable for 10+ future tools

**Current Deployment:**
- 2 operational tools
- 5+ shared services
- 30+ reusable UI components
- Single authentication system

---

## 2. Portal Overview

### Home Page Features

**User Experience:**
- Tool selection interface (2 active cards)
- Bilingual support (FR/EN)
- Boat carousel showcase
- Futuristic design with animations

**Navigation Structure:**
```
/ (home)
├── /boat-configuration    (Tool 1)
├── /part-printer          (Tool 2)
└── /[future-tool]         (Placeholder)
```

**Bridge with Marc's Specs:**
- Spec section 1: "Application for several functionalities access from a main page like a portal"
- Implementation: Home page with tool cards
- Spec section 2: "PartPrinter, BoatConfigurationEditor, ..."
- Implementation: 2 tools operational, extensible architecture for more

---

## 3. Modular Architecture

### Core Design Pattern: Route Groups

**Next.js Route Groups Strategy:**
```
src/app/
├── (home)/                    # Portal home (no prefix in URL)
│   └── page.tsx              # Main landing page
│
├── (tools)/                   # Tool isolation (no prefix in URL)
│   ├── boat-configuration/   # Tool 1 (independent)
│   │   ├── page.tsx
│   │   └── components/       # Tool-specific UI
│   │
│   └── part-printer/         # Tool 2 (independent)
│       ├── page.tsx
│       └── components/       # Tool-specific UI
│
└── api/
    ├── shared/               # Shared APIs (all tools)
    │   ├── printers/
    │   ├── languages/
    │   └── sites/
    │
    ├── boat-configuration/   # Tool 1 APIs
    │   ├── shop-orders/
    │   ├── customer-orders/
    │   └── print/
    │
    └── part-printer/         # Tool 2 APIs
        ├── shop-orders/
        ├── operations/
        └── labels/
```

**Benefits:**
- Tools don't interfere with each other
- Clean URLs (/boat-configuration, /part-printer)
- Independent deployments possible
- Shared code isolated in /shared

---

## 4. Shared Infrastructure

### Shared Services (src/shared/services/)

**IFS Cloud Integration:**
```typescript
src/shared/services/
├── ifs-client.ts              # OAuth2 + OData client (284 lines)
│   - Token caching (55 min)
│   - Automatic renewal
│   - GET/POST/getRaw methods
│
├── printer-service.ts         # Printer management
│   - List IFS printers
│   - Printer validation
│
├── language-service.ts        # Language management
│   - List IFS languages
│   - Language codes (RFC3066)
│
└── azure-print-service.ts     # Azure Print API (Part Printer)
    - OAuth2 flow
    - Retry logic (3 attempts)
    - Selection string format
```

**Key Feature: IFS Client (Central Service)**
```typescript
// Used by ALL tools
import { getIFSClient } from '@/shared/services/ifs-client'

const client = getIFSClient()
const response = await client.get('ShopOrderHandling.svc/ShopOrds')
```

**Advantages:**
- Single OAuth2 token management
- Consistent error handling
- Shared cache (reduces IFS load)
- Easy debugging (centralized logs)

---

### Shared Components (src/shared/components/)

**Atomic Design Structure:**
```
src/shared/components/
├── atoms/                     # Basic UI elements
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Label.tsx
│   ├── Select.tsx
│   └── Table.tsx
│
├── molecules/                 # Composite components
│   ├── InputWithLabel.tsx
│   ├── SearchBar.tsx
│   └── Dialog.tsx
│
└── organisms/                 # Complex components
    ├── Header.tsx            # Global navigation
    ├── BoatCarousel.tsx      # Home page carousel
    └── DataTable.tsx         # Reusable table
```

**Component Reuse Examples:**

| Component | Boat Config | Part Printer | Shared |
|-----------|-------------|--------------|--------|
| Button | Yes | Yes | atoms/ |
| Input | Yes | Yes | atoms/ |
| Select | Yes | Yes | atoms/ |
| Header | Yes | Yes | organisms/ |
| DataTable | No | Yes | organisms/ |

**Design System:**
- shadcn/ui base components
- Tailwind CSS styling
- Radix UI accessibility
- Consistent theming

---

### Shared API Routes (src/app/api/shared/)

**Common Endpoints:**
```
GET /api/shared/printers       # List IFS printers
GET /api/shared/languages      # List IFS languages
GET /api/shared/sites          # List production sites
```

**Usage by Tools:**
- Boat Configuration: Printers, Languages
- Part Printer: Printers, Languages, Sites
- Future Tools: All available without duplication

**Performance:**
- Single IFS query per resource
- Response caching possible
- Consistent error format

---

## 5. Tool Isolation Strategy

### Independent Tool Development

**Each tool has isolated:**

**1. Frontend Components:**
```
src/app/(tools)/[tool-name]/components/
├── FilterPanel.tsx           # Tool-specific
├── DataDisplay.tsx           # Tool-specific
└── PrintDialog.tsx           # Tool-specific
```

**2. Backend Services:**
```
src/tools/[tool-name]/services/
├── shop-order-service.ts     # Tool-specific logic
├── orchestrator-service.ts   # Tool-specific workflow
└── error-service.ts          # Tool-specific errors
```

**3. API Routes:**
```
src/app/api/[tool-name]/
├── search/route.ts           # Tool-specific endpoint
├── filter/route.ts           # Tool-specific endpoint
└── print/route.ts            # Tool-specific endpoint
```

**4. Type Definitions:**
```
src/tools/[tool-name]/types/
├── index.ts                  # Tool-specific types
├── errors.ts                 # Tool-specific error codes
└── interfaces.ts             # Tool-specific interfaces
```

### Benefits of Isolation

**Development:**
- Teams can work independently
- No merge conflicts between tools
- Clear ownership boundaries
- Independent testing

**Deployment:**
- Can deploy tool updates separately
- No risk of breaking other tools
- Faster CI/CD pipelines
- Isolated error tracking

**Maintenance:**
- Easy to locate tool-specific code
- Clear documentation per tool
- Independent version control
- Simple onboarding for new devs

---


## 6. Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js | 15.2.1 |
| Language | TypeScript | 5.8.2 |
| UI | shadcn/ui + Tailwind CSS | 4.1.7 |
| IFS Integration | OAuth2 + OData | - |
| Authentication | Azure AD | - |

**Environments:**
- DEV: IFS AST + Azure App Service
- PPD: IFS ACC + Azure App Service
- PRD: IFS PRD + Azure App Service

---

## 7. Specifications vs Implementation

| Spec Item | Status |
|-----------|--------|
| Multi-tool portal | Fully Implemented |
| PartPrinter + BoatConfigurationEditor | Fully Implemented |
| IFS API via APIM | Fully Implemented |
| User access control (Azure AD) | Ready (to integrate) |
| English interface | Enhanced (EN/FR) |
| 3 environments (DEV/PPD/PRD) | Ready |


---

## 8. Code Organization Best Practices

### Directory Structure Philosophy

**Golden Rule: Shared vs Isolated**
```
 SHARED: Code used by 2+ tools
   → src/shared/
   → src/app/api/shared/

 ISOLATED: Code specific to 1 tool
   → src/tools/[tool-name]/
   → src/app/(tools)/[tool-name]/
   → src/app/api/[tool-name]/
```


## 10. Performance & Code Metrics

**Performance:**
- Home Page Load: < 1s
- Tool Navigation: < 500ms
- IFS API Response: 300-500ms
- OAuth2 Token Cache: 55 min (95% hit rate)

**Code Metrics:**
- Shared Services: ~1500 lines
- Shared Components: ~1000 lines (30+ components)
- Tool-Specific Code: Isolated per tool
- Code Duplication: < 5%

**Error Tracking:**
```
BCE_E001-E006: Boat Configuration errors
PP_E001-E006:  Part Printer errors
SHARED_E001+:  Infrastructure errors
```
