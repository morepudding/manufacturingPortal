import { defineConfig, devices } from '@playwright/test'

/**
 * Configuration Playwright pour Boat Configuration Editor
 * 
 * Tests E2E exécutés sur:
 * - Chromium (Chrome)
 * - Firefox
 * - Webkit (Safari)
 * 
 * Intégration Azure Playwright Cloud configurée via variables d'environnement
 */
export default defineConfig({
  testDir: './tests/boat-configuration/e2e',
  testMatch: '**/*.spec.ts', // Ne scanner QUE les fichiers .spec.ts
  
  // Parallélisation complète des tests
  fullyParallel: true,
  
  // Ne pas autoriser .only() en CI
  forbidOnly: !!process.env.CI,
  
  // Retry en cas d'échec (2x en CI, 0 en local)
  retries: process.env.CI ? 2 : 0,
  
  // Workers: 1 en CI pour stabilité, auto en local
  workers: process.env.CI ? 1 : undefined,
  
  // Reporters
  reporter: [
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list']
  ],
  
  // Configuration globale
  use: {
    // Base URL (port 3002 car 3000/3001 sont occupés)
    baseURL: process.env.BASE_URL || 'http://localhost:3002',
    
    // Trace en cas d'échec
    trace: 'on-first-retry',
    
    // Screenshot en cas d'échec
    screenshot: 'only-on-failure',
    
    // Video en cas d'échec
    video: 'retain-on-failure',
    
    // Timeout des actions
    actionTimeout: 10000,
  },
  
  // Timeout global des tests (augmenté pour APIs IFS réelles)
  timeout: 90000, // 90s pour permettre les appels IFS lents
  
  // Timeout pour expect (augmenté pour attendre les réponses IFS)
  expect: {
    timeout: 15000, // 15s pour les assertions avec vraies APIs
  },
  
  // Projets de test (navigateurs)
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
  
  // Serveur web local pour les tests
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:3002', // Port 3002 car 3000/3001 occupés
    reuseExistingServer: true, // Toujours réutiliser le serveur existant
    timeout: 120000,
  },
})
