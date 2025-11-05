#!/bin/bash

# Script pour générer un secret NextAuth aléatoire
# Usage: ./scripts/generate-nextauth-secret.sh

echo "🔐 Génération d'un nouveau secret NextAuth..."
echo ""

# Vérifier si openssl est disponible
if ! command -v openssl &> /dev/null; then
    echo "❌ Erreur: openssl n'est pas installé"
    echo "   Installer avec: sudo apt-get install openssl (Ubuntu/Debian)"
    echo "   ou: brew install openssl (macOS)"
    exit 1
fi

# Générer le secret
SECRET=$(openssl rand -base64 32)

echo "✅ Secret généré avec succès !"
echo ""
echo "📋 Copiez cette ligne dans votre fichier .env.local :"
echo ""
echo "NEXTAUTH_SECRET=$SECRET"
echo ""
echo "⚠️  IMPORTANT :"
echo "   - Gardez ce secret confidentiel"
echo "   - Utilisez des secrets différents pour dev/staging/prod"
echo "   - Ne committez JAMAIS ce secret dans Git"
echo ""
