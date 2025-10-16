#!/bin/bash

# Script de conversion Markdown vers PDF pour Manufacturing Portal
# Utilise md-to-pdf (npm package)

echo "🔧 Installation de md-to-pdf..."
npm install -g md-to-pdf

echo "📄 Conversion de DOCUMENTATION_BUSINESS.md en PDF..."
cd /home/rbottero/ManufacturingPortal/docs

# Conversion avec options de style
md-to-pdf DOCUMENTATION_BUSINESS.md \
  --pdf-options '{"format": "A4", "margin": {"top": "20mm", "right": "20mm", "bottom": "20mm", "left": "20mm"}}' \
  --stylesheet "body { font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.6; } h1 { color: #2c3e50; page-break-before: always; } h2 { color: #3498db; margin-top: 1.5em; } table { border-collapse: collapse; width: 100%; margin: 1em 0; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #3498db; color: white; } img { max-width: 100%; height: auto; margin: 1em 0; border: 1px solid #ddd; }"

echo "✅ PDF créé : DOCUMENTATION_BUSINESS.pdf"
