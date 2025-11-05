# Mermaid Diagram - Manufacturing Portal Architecture

**Instructions**: Copy this code to Mermaid Live Editor (https://mermaid.live) to generate the diagram, then export as PNG/SVG and insert into Word.

```mermaid
flowchart TD
    USER["User Access<br/>(Azure AD)"] --> PORTAL["Portal Home<br/>src/app/page.tsx"]
    
    PORTAL --> TOOL1["Boat Configuration<br/>/boat-configuration"]
    PORTAL --> TOOL2["Part Printer<br/>/part-printer"]
    PORTAL --> TOOL3["Future Tools<br/>/new-tool"]
    
    TOOL1 --> API1["Tool 1 APIs<br/>/api/boat-configuration/*"]
    TOOL2 --> API2["Tool 2 APIs<br/>/api/part-printer/*"]
    TOOL3 --> API3["Tool N APIs<br/>/api/new-tool/*"]
    
    API1 & API2 & API3 --> SHARED_API["Shared APIs<br/>/api/shared/*<br/>(printers, languages, sites)"]
    
    SHARED_API --> SERVICES["Shared Services<br/>src/shared/services/"]
    API1 --> SERVICES
    API2 --> SERVICES
    API3 --> SERVICES
    
    SERVICES --> IFS_CLIENT["IFS Client<br/>ifs-client.ts<br/>(OAuth2 + Token Cache)"]
    
    IFS_CLIENT --> IFS_CLOUD["IFS Cloud APIs<br/>ShopOrderHandling<br/>CustomerOrderHandling<br/>PrintDialog<br/>DopHeaderHandling"]
    
    TOOL1 & TOOL2 & TOOL3 --> COMPONENTS["Shared Components<br/>src/shared/components/<br/>(atoms, molecules, organisms)"]
    
    COMPONENTS --> UI["UI Library<br/>shadcn/ui + Radix UI<br/>Tailwind CSS"]
    
    style USER fill:#3498db,stroke:#2980b9,color:#fff
    style PORTAL fill:#9b59b6,stroke:#7d3c98,color:#fff
    style TOOL1 fill:#e74c3c,stroke:#c0392b,color:#fff
    style TOOL2 fill:#f39c12,stroke:#d68910,color:#fff
    style TOOL3 fill:#95a5a6,stroke:#7f8c8d,color:#fff
    style API1 fill:#e74c3c,stroke:#c0392b,color:#fff
    style API2 fill:#f39c12,stroke:#d68910,color:#fff
    style API3 fill:#95a5a6,stroke:#7f8c8d,color:#fff
    style SHARED_API fill:#2ecc71,stroke:#27ae60,color:#fff
    style SERVICES fill:#16a085,stroke:#138d75,color:#fff
    style IFS_CLIENT fill:#34495e,stroke:#2c3e50,color:#fff
    style IFS_CLOUD fill:#c0392b,stroke:#922b21,color:#fff
    style COMPONENTS fill:#1abc9c,stroke:#16a085,color:#fff
    style UI fill:#3498db,stroke:#2980b9,color:#fff
```

## Alternative: Simplified Layered Architecture

```mermaid
flowchart TB
    subgraph "Presentation Layer"
        PORTAL[Portal Home]
        TOOL1[Boat Config]
        TOOL2[Part Printer]
        TOOLN[Future Tools]
    end
    
    subgraph "API Layer"
        API1[Tool 1 APIs]
        API2[Tool 2 APIs]
        SHARED[Shared APIs]
    end
    
    subgraph "Business Logic Layer"
        SERVICES[Shared Services]
        IFS[IFS Client<br/>OAuth2 + Cache]
    end
    
    subgraph "Integration Layer"
        IFS_CLOUD[IFS Cloud<br/>OData APIs]
    end
    
    PORTAL --> TOOL1 & TOOL2 & TOOLN
    TOOL1 --> API1
    TOOL2 --> API2
    TOOLN --> SHARED
    
    API1 & API2 --> SERVICES
    SERVICES --> IFS
    IFS --> IFS_CLOUD
    
    style PORTAL fill:#9b59b6,stroke:#7d3c98,color:#fff
    style TOOL1 fill:#e74c3c,stroke:#c0392b,color:#fff
    style TOOL2 fill:#f39c12,stroke:#d68910,color:#fff
    style TOOLN fill:#95a5a6,stroke:#7f8c8d,color:#fff
    style SHARED fill:#2ecc71,stroke:#27ae60,color:#fff
    style SERVICES fill:#16a085,stroke:#138d75,color:#fff
    style IFS fill:#34495e,stroke:#2c3e50,color:#fff
    style IFS_CLOUD fill:#c0392b,stroke:#922b21,color:#fff
```

## Alternative: File Structure Diagram

```mermaid
flowchart LR
    subgraph "Frontend"
        HOME["/app/page.tsx<br/>(Portal Home)"]
        TOOLS["/app/(tools)/<br/>boat-configuration/<br/>part-printer/"]
    end
    
    subgraph "Backend"
        API["/app/api/<br/>boat-configuration/<br/>part-printer/<br/>shared/"]
    end
    
    subgraph "Shared Code"
        SERVICES["/shared/services/<br/>ifs-client.ts<br/>printer-service.ts"]
        COMPONENTS["/shared/components/<br/>atoms/<br/>molecules/<br/>organisms/"]
        TYPES["/shared/types/<br/>ifs.ts<br/>api.ts"]
    end
    
    subgraph "Tool Isolation"
        TOOL_SERVICES["/tools/[tool]/services/"]
        TOOL_TYPES["/tools/[tool]/types/"]
    end
    
    HOME --> TOOLS
    TOOLS --> API
    API --> SERVICES
    API --> TOOL_SERVICES
    TOOLS --> COMPONENTS
    SERVICES --> TYPES
    TOOL_SERVICES --> TOOL_TYPES
    
    style HOME fill:#9b59b6,stroke:#7d3c98,color:#fff
    style TOOLS fill:#e74c3c,stroke:#c0392b,color:#fff
    style API fill:#f39c12,stroke:#d68910,color:#fff
    style SERVICES fill:#2ecc71,stroke:#27ae60,color:#fff
    style COMPONENTS fill:#1abc9c,stroke:#16a085,color:#fff
    style TYPES fill:#3498db,stroke:#2980b9,color:#fff
    style TOOL_SERVICES fill:#e67e22,stroke:#d35400,color:#fff
    style TOOL_TYPES fill:#95a5a6,stroke:#7f8c8d,color:#fff
```

## How to Insert in Word

1. Open https://mermaid.live
2. Copy-paste one of the Mermaid codes above (choose the one you prefer)
3. Click "Export" → "PNG" or "SVG"
4. Download the image
5. In Word Online: Insert → Images → Upload from this device
6. Position the image in the document where needed

## Diagram Choices

**Main Flow Diagram**: Shows complete data flow from user to IFS Cloud  
**Layered Architecture**: Shows architectural layers (Presentation, API, Business Logic, Integration)  
**File Structure**: Shows actual code organization and folder structure
