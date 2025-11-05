# Mermaid Diagram - Boat Configuration Editor Data Flow

**Instructions**: Copy this code to Mermaid Live Editor (https://mermaid.live) to generate the diagram, then export as PNG/SVG and insert into Word.

```mermaid
flowchart TD
    START["User Input<br/>OrderNo, ReleaseNo, SequenceNo"] --> SO["ShopOrderHandling API<br/>Search Shop Order"]
    
    SO --> PARSE["DOP ID Parsing<br/>'95 - 10088' → '95'"]
    
    PARSE --> SERIAL["DopHeaderHandling API<br/>Get Serial Number<br/>(DopId = 95)"]
    
    SERIAL --> CO_STRATEGY{"Customer Order<br/>Lookup Strategy"}
    
    CO_STRATEGY -->|"Try common sites"| CO_FAST["CustomerOrderLineSet<br/>Filter: CHullNumber + Site<br/>(FR05A, FR02A, FR01A)"]
    
    CO_STRATEGY -->|"Fallback if not found"| CO_SLOW["CustomerOrderLineSet<br/>Filter: CHullNumber only<br/>(slower, exhaustive)"]
    
    CO_FAST --> CO_RESULT["Customer Order Data"]
    CO_SLOW --> CO_RESULT
    
    CO_RESULT --> LANG["PrintDialog API<br/>Get Languages List"]
    
    LANG --> PDF_INIT["PDF Generation<br/>5-Step IFS Process"]
    
    PDF_INIT --> STEP1["Step 1: GET CustomerOrder<br/>(Retrieve ETag)"]
    STEP1 --> STEP2["Step 2: POST PrintResultKey<br/>(Generate Job ID)"]
    STEP2 --> STEP3["Step 3: POST PrintDialogInit<br/>(Configure Report)"]
    STEP3 --> STEP4["Step 4: POST ReportPrintRequest<br/>(Layout: BEN_Inventory-BAT.rdl)"]
    STEP4 --> STEP5["Step 5: GET PdfArchiveSet<br/>(Poll until ready, max 60s)"]
    
    STEP5 --> DOWNLOAD["Download PDF<br/>boat-config-OrderNo-SerialNo.pdf"]
    
    style START fill:#3498db,stroke:#2980b9,color:#fff
    style SO fill:#e74c3c,stroke:#c0392b,color:#fff
    style PARSE fill:#f39c12,stroke:#d68910,color:#fff
    style SERIAL fill:#e74c3c,stroke:#c0392b,color:#fff
    style CO_STRATEGY fill:#9b59b6,stroke:#7d3c98,color:#fff
    style CO_FAST fill:#2ecc71,stroke:#27ae60,color:#fff
    style CO_SLOW fill:#e67e22,stroke:#d35400,color:#fff
    style CO_RESULT fill:#16a085,stroke:#138d75,color:#fff
    style LANG fill:#e74c3c,stroke:#c0392b,color:#fff
    style PDF_INIT fill:#34495e,stroke:#2c3e50,color:#fff
    style DOWNLOAD fill:#1abc9c,stroke:#16a085,color:#fff
```

## Alternative: Direct Mermaid Live Link

https://mermaid.live/edit#pako:eNqVVE1vozAQ_SuWTz1UCIQ0CZfVSqtWu1LVSqsePFmDhGxsZEOyivLfO4aQkLbdXvZk2zPz3puZN2cWqRQsYoFgMpNcJowXUIrCKEpBK8VJBRtQZV6CUlyA1krBVq2USsBKKVhpBVulYGslYG0l4OAk4HAtIdypZbzSCo5KwdEpOCoFx1bBSin4pBV8UgrOWsG51XDWGs5aw7nVcNYazq2Gs9Zwbg2ctYaz1XC2Gs5Ww9lqOFsNZ6vhbDWcrYaz1XC2Gs5Ww9lqOFsNZ6vhbDWcrYZza+HcWji3Fs6thXNr4dxaOLcWzq2Fc2vh3Fo4txbOrYVza-HcWji3Fs6thXNr4dxaOLcWzq2Fc2vh3Fo4txbOrYVzZ-HcWTh3Fs6dhXNn4dxZOHcWzp2Fc2fh3Fk4dxbOnYVzZ-HcWTh3Fs6dhXNn4dxZOHcWzp2Fc2fh3Fk4dxbOnYVzZ-HcWTh3Ds6dg3Pn4Nw5OHcOzp2Dc-fg3Dk4dw7OnYNz5-DcOTh3Ds6dg3Pn4Nw5OHcOzp2Dc-fg3Dk4dw7OnYNz5-DcOTh3Ds6dg3Pn4Nw5OHcOzp2Dc-fg3Dk4dw7OnYNz5-DcOTh3Ds6dg3Pn4Nw5OHcOzp2Dc-fg3Dk4dw7OnYNz5-DcOTh3Ds6dg3Pn4Nw5OHcOzp2Dc-fg3Dk4dw7OnYNz5-DcOTh3Ds6dg3Pn4Nw5OHcOzp2Dc-fg3Dk4d

## How to Insert in Word

1. Open https://mermaid.live
2. Copy-paste the Mermaid code above
3. Click "Export" → "PNG" or "SVG"
4. Download the image
5. In Word Online: Insert → Images → Upload from this device
6. Position the image in the document where needed
