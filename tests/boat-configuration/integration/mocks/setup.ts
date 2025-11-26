import { setupServer } from 'msw/node'
import { handlers } from './handlers'

/**
 * Configuration MSW (Mock Service Worker) pour les tests d'intégration
 * 
 * Ce serveur mock intercepte les appels HTTP pendant les tests
 * et retourne des réponses simulées basées sur les handlers définis.
 * 
 * Usage:
 * - Automatiquement démarré avant tous les tests
 * - Réinitialisé après chaque test
 * - Arrêté après tous les tests
 */

// Créer le serveur avec les handlers
export const server = setupServer(...handlers)

// Démarrer le serveur avant tous les tests
beforeAll(() => {
  server.listen({ 
    onUnhandledRequest: 'error' // Erreur si requête non mockée
  })
  console.log('🔧 MSW Server started')
})

// Réinitialiser après chaque test
afterEach(() => {
  server.resetHandlers()
})

// Arrêter après tous les tests
afterAll(() => {
  server.close()
  console.log('🔧 MSW Server stopped')
})
