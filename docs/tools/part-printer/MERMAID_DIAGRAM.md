# Mermaid Diagram - Part Printer Data Flow

**Instructions**: Copier ce code dans un éditeur Mermaid en ligne (https://mermaid.live) pour générer le diagramme, puis exporter l'image et l'insérer dans Word.

```mermaid
flowchart TD
    SO["Shop Order<br/>(OrderNo, PartNo, Contract)"] --> MAT["Material Lines API<br/>→ Raw Material<br/>(OperationNo = 10)"]
    SO --> OP["Operations API<br/>→ Block ID<br/>(OperationNo = 10)"]
    SO --> PART["Master Part API<br/>→ TechnicalSpecNo"]
    
    PART --> ATTR["Technical Attributes API<br/>→ 50+ attributes<br/>Filter by attribute name"]
    
    ATTR --> GC["GENERIC CODE<br/>(ValueText)"]
    ATTR --> LS["LENGTH SETUP<br/>(ValueNo)"]
    ATTR --> VC["VARNISH CODE<br/>(ValueText)"]
    
    SO --> RANGE["Range Service<br/>→ Range ID<br/>(Site + Time)"]
    
    GC --> BARCODE["Barcode Generation<br/>(CODE128 format)"]
    VC --> BARCODE
    
    MAT & OP & GC & LS & VC & RANGE & BARCODE --> LABEL["Complete Label"]
    
    style SO fill:#3498db,stroke:#2980b9,color:#fff
    style MAT fill:#e74c3c,stroke:#c0392b,color:#fff
    style OP fill:#e74c3c,stroke:#c0392b,color:#fff
    style PART fill:#e74c3c,stroke:#c0392b,color:#fff
    style ATTR fill:#f39c12,stroke:#d68910,color:#fff
    style RANGE fill:#9b59b6,stroke:#7d3c98,color:#fff
    style BARCODE fill:#2ecc71,stroke:#27ae60,color:#fff
    style LABEL fill:#1abc9c,stroke:#16a085,color:#fff
```

## Alternative: Lien direct Mermaid Live

https://mermaid.live/edit#pako:eNqNVE1v2zAM_SuETgXWJm2TJT70tAPWdV2BZoFXDDsIsSxXqCwZkpx1QPLfR8lO0rTLeukkU-TjI_n4xA5GGmjo3qBLhNOa4AYJb5ggQUq0Rq2RcktEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI-VEaYVaI

## Comment l'insérer dans Word

1. Ouvrir https://mermaid.live
2. Copier-coller le code Mermaid ci-dessus
3. Cliquer sur "Export" → "PNG" ou "SVG"
4. Télécharger l'image
5. Dans Word Online: Insertion → Images → Télécharger depuis ce périphérique
6. Positionner l'image dans la section "3. Data Consolidation"
