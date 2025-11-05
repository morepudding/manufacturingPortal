#!/bin/bash

echo "🔍 Vérification configuration Part Printer"
echo ""

# 1. Vérifier .env.local
echo "📄 Fichier .env.local:"
if [ -f .env.local ]; then
  grep -E "ENABLE_DEBUG_LOGS" .env.local || echo "  ⚠️  ENABLE_DEBUG_LOGS non trouvé"
else
  echo "  ❌ Fichier .env.local introuvable"
fi

echo ""

# 2. Vérifier logger.ts
echo "📄 Fichier logger.ts:"
if [ -f src/tools/part-printer/utils/logger.ts ]; then
  echo "  ✅ Logger existe"
  grep "IS_DEBUG" src/tools/part-printer/utils/logger.ts | head -1
else
  echo "  ❌ Logger introuvable"
fi

echo ""

# 3. Compter les services migrés
echo "📊 Services migrés au logger:"
MIGRATED=$(find src/tools/part-printer/services -name "*.ts" -exec grep -l "from '../utils/logger'" {} \; | wc -l)
echo "  ✅ $MIGRATED services utilisent le logger"

echo ""

# 4. Vérifier les imports dupliqués
echo "🔍 Vérification imports dupliqués:"
DUPLICATES=0
for file in src/tools/part-printer/services/*.ts; do
  COUNT=$(grep -c "import.*logger.*from.*utils/logger" "$file" 2>/dev/null || echo "0")
  if [ "$COUNT" -gt 1 ]; then
    echo "  ⚠️  $file a $COUNT imports (doublon!)"
    DUPLICATES=$((DUPLICATES + 1))
  fi
done

if [ "$DUPLICATES" -eq 0 ]; then
  echo "  ✅ Aucun doublon détecté"
fi

echo ""
echo "✅ Vérification terminée"
echo ""
echo "💡 Pour que les changements prennent effet:"
echo "   1. Arrêter le serveur (Ctrl+C)"
echo "   2. Redémarrer: pnpm run dev"
