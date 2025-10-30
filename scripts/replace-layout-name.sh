#!/bin/bash

##
# Script de remplacement du layout d'impression
# 
# Remplace toutes les occurrences de:
#   BEN_Inventory-BAT.rdl
# Par:
#   BEN_Boat_configuration_for_production.rdl
#
# Usage: bash scripts/replace-layout-name.sh
##

set -e

echo "🔄 Remplacement du layout d'impression..."
echo ""
echo "   ANCIEN: BEN_Inventory-BAT.rdl"
echo "   NOUVEAU: BEN_Boat_configuration_for_production.rdl"
echo ""

# Compteur de fichiers modifiés
count=0

# Liste des fichiers à modifier
files_to_update=(
  # Source code (TypeScript/TSX)
  "src/app/api/boat-configuration/print/route.ts"
  "src/app/(tools)/boat-configuration/components/PrintExecution/index.tsx"
  
  # Scripts
  "scripts/list-all-reports-and-layouts.ts"
  "scripts/test-language-by-report.ts"
  "scripts/report-test-results.json"
  
  # Documentation API
  "docs/api/print-dialog/README.md"
  
  # Documentation Boat Configuration Editor
  "docs/tools/boat-configuration-editor/api/ENDPOINTS_IMPLEMENTED.md"
  "docs/tools/boat-configuration-editor/implementation/print-guide.md"
  "docs/tools/boat-configuration-editor/implementation/print-workflow.md"
  "docs/tools/boat-configuration-editor/implementation/SERVICES.md"
  "docs/tools/boat-configuration-editor/IMPLEMENTATION_STATUS.md"
  "docs/tools/boat-configuration-editor/FIX_PDF_VIDES.md"
)

# Effectuer le remplacement
for file in "${files_to_update[@]}"; do
  if [ -f "$file" ]; then
    echo "📝 Traitement: $file"
    
    # Utiliser perl pour remplacer (très portable)
    perl -pi -e 's/BEN_Inventory-BAT\.rdl/BEN_Boat_configuration_for_production.rdl/g' "$file"
    
    ((count++))
  else
    echo "⚠️  Fichier introuvable (ignoré): $file"
  fi
done

echo ""
echo "✅ Remplacement terminé !"
echo "   📊 $count fichiers modifiés"
echo ""
echo "💡 Prochaines étapes:"
echo "   1. Vérifier les changements: git diff"
echo "   2. Tester l'application: pnpm run dev"
echo "   3. Commiter: git add . && git commit -m 'fix: Replace layout BEN_Inventory-BAT with BEN_Boat_configuration_for_production'"
echo ""
