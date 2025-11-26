/**
 * MSW Setup - Mock Service Worker pour tests d'intégration
 * 
 * Configure un serveur MSW qui intercepte les requêtes HTTP vers:
 * - Azure AD OAuth2 Token Endpoint
 * - Azure APIM IFS Manufacturing Endpoints
 * 
 * Ce setup est automatiquement chargé par Vitest pour tous les tests d'intégration
 * 
 * @see tests/boat-configuration/integration/mocks/apim-handlers.ts
 * @see vitest.config.mts (setupFiles)
 */

import { setupServer } from 'msw/node'
import { apimHandlers } from './mocks/apim-handlers'
import { beforeAll, afterEach, afterAll } from 'vitest'

/**
 * Créer le serveur MSW avec tous les handlers APIM
 */
export const server = setupServer(...apimHandlers)

/**
 * Lifecycle Hooks pour Vitest
 */

// Démarrer le serveur MSW avant tous les tests
beforeAll(() => {
  console.log('🚀 Starting MSW server for integration tests...')
  server.listen({
    onUnhandledRequest: 'warn' // Afficher warning si requête non mockée
  })
})

// Réinitialiser les handlers après chaque test
afterEach(() => {
  server.resetHandlers()
})

// Fermer le serveur MSW après tous les tests
afterAll(() => {
  console.log('🛑 Stopping MSW server...')
  server.close()
})
