#!/bin/bash

# Script pour remplacer tous les console.log/error par le logger centralisé
# dans les services Part Printer

echo "🔧 Remplacement des logs dans les services Part Printer..."

SERVICES_DIR="src/tools/part-printer/services"

# Liste des fichiers à traiter
FILES=$(find $SERVICES_DIR -name "*.ts" -type f)

for file in $FILES; do
  echo "📝 Traitement: $file"
  
  # Ajouter l'import du logger s'il n'existe pas déjà
  if ! grep -q "import.*logger.*from.*'../utils/logger'" "$file"; then
    # Trouver la dernière ligne d'import et ajouter après
    sed -i '/^import/a import { logger } from '\''../utils/logger'\''' "$file"
    echo "   ✅ Import logger ajouté"
  fi
  
  # Remplacer console.log par logger.debug
  sed -i 's/console\.log(/logger.debug(/g' "$file"
  
  # Remplacer console.error par logger.error
  sed -i 's/console\.error(/logger.error(/g' "$file"
  
  # Remplacer console.warn par logger.warn
  sed -i 's/console\.warn(/logger.warn(/g' "$file"
  
  # Remplacer console.info par logger.info
  sed -i 's/console\.info(/logger.info(/g' "$file"
  
  echo "   ✅ Logs remplacés"
done

echo ""
echo "✅ Terminé ! Tous les services ont été mis à jour."
echo ""
echo "Pour activer les logs de debug, ajoutez dans .env.local:"
echo "ENABLE_DEBUG_LOGS=true"
