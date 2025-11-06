#!/bin/bash

# ============================================
# Script de nettoyage des secrets IFS hardcodés
# ============================================
# Ce script remplace tous les secrets hardcodés par des références à process.env uniquement
# 
# Usage: bash scripts/remove-hardcoded-secrets.sh
# ============================================

set -e

echo "🔒 Nettoyage des secrets IFS hardcodés..."
echo ""

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Compteur de fichiers modifiés
count=0

# Liste des fichiers à modifier (basé sur grep_search)
files=(
  "scripts/find-shoporder-by-part.ts"
  "scripts/investigate-shoporder-fields.ts"
  "scripts/test-material-requisition-lines.ts"
  "scripts/ifs-test-14-single-part.ts"
  "scripts/ifs-test-13-reverse-search-complete.ts"
  "scripts/test-material-allocation-endpoints.ts"
  "scripts/ifs-test-12-user-provided-parts.ts"
  "scripts/test-shop-order-materials-array.ts"
  "scripts/ifs-test-12-user-parts-simple.ts"
  "scripts/test-manufacturing-material-history.ts"
  "scripts/test-material-history-final.ts"
  "scripts/investigate-shoporder-materials.ts"
  "scripts/test-product-structure-bom.ts"
  "src/testscript/test-shoporder-customer-fields.js"
  "src/testscript/test-customer-order-optimized.js"
  "src/testscript/test-customer-order-search-strategies.js"
)

echo "📋 Fichiers à nettoyer: ${#files[@]}"
echo ""

# Fonction de remplacement pour TypeScript
replace_ts_secrets() {
  local file=$1
  
  if [ -f "$file" ]; then
    echo -n "  🔧 $file ... "
    
    # Remplacer les secrets hardcodés
    sed -i "s/const IFS_CLIENT_ID = '[^']*'/const IFS_CLIENT_ID = process.env.IFS_CLIENT_ID || ''/g" "$file"
    sed -i "s/const IFS_CLIENT_SECRET = '[^']*'/const IFS_CLIENT_SECRET = process.env.IFS_CLIENT_SECRET || ''/g" "$file"
    sed -i "s/const IFS_BASE_URL = '[^']*'/const IFS_BASE_URL = process.env.IFS_BASE_URL || ''/g" "$file"
    sed -i "s/const IFS_TOKEN_URL = '[^']*'/const IFS_TOKEN_URL = process.env.IFS_TOKEN_URL || ''/g" "$file"
    
    # Pour les fichiers sans fallback (|| '')
    sed -i "s/|| 'https:\/\/beneteau-group-ast\.ifs\.cloud\/main\/ifsapplications\/projection\/v1'/|| ''/g" "$file"
    sed -i "s/|| 'https:\/\/beneteau-group-ast\.ifs\.cloud\/auth\/realms\/beneast1\/protocol\/openid-connect\/token'/|| ''/g" "$file"
    sed -i "s/|| '***REMOVED***'/|| ''/g" "$file"
    sed -i "s/|| '***REMOVED***'/|| ''/g" "$file"
    
    echo -e "${GREEN}✓${NC}"
    ((count++))
  else
    echo -e "  ${YELLOW}⚠ Fichier non trouvé: $file${NC}"
  fi
}

# Nettoyer les fichiers TypeScript
for file in "${files[@]}"; do
  replace_ts_secrets "$file"
done

# Nettoyer les fichiers de documentation
echo ""
echo "📚 Nettoyage des fichiers de documentation..."

doc_files=(
  "docs/archive/phases/PHASE1_COMPLETE.md"
  "docs/IFS_ENDPOINTS_USED.md"
  ".github/copilot-instructions.md"
  "docs/tools/boat-configuration-editor/README.md"
  "README.md"
)

for file in "${doc_files[@]}"; do
  if [ -f "$file" ]; then
    echo -n "  🔧 $file ... "
    
    # Remplacer dans les blocs de code markdown
    sed -i "s/IFS_CLIENT_SECRET=***REMOVED***/IFS_CLIENT_SECRET=your_client_secret_here/g" "$file"
    sed -i "s/IFS_CLIENT_ID=***REMOVED***/IFS_CLIENT_ID=your_client_id_here/g" "$file"
    
    echo -e "${GREEN}✓${NC}"
    ((count++))
  fi
done

echo ""
echo -e "${GREEN}✅ Nettoyage terminé!${NC}"
echo "📊 $count fichiers modifiés"
echo ""
echo "⚠️  IMPORTANT: Les fichiers suivants doivent être SUPPRIMÉS du repo:"
echo "   - .environment.dev (contient les secrets)"
echo ""
echo "💡 Prochaines étapes:"
echo "   1. Vérifier les changements: git diff"
echo "   2. Supprimer .environment.dev: git rm --cached .environment.dev"
echo "   3. Commiter: git commit -m \"🔒 Remove hardcoded IFS secrets\""
echo "   4. IMPORTANT: Nettoyer l'historique Git (voir ci-dessous)"
echo ""
echo "🚨 CRITIQUE: Les secrets sont toujours dans l'historique Git!"
echo "   Il faut utiliser git-filter-repo pour les supprimer complètement."
echo ""
