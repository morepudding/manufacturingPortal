/**
 * Configuration de version de l'application
 * Gère les versions selon l'environnement
 */

export const APP_VERSION = {
  dev: '2.1.0',
  ppd: '2.1.0',
  prd: '2.0.0',
} as const

/**
 * Détecte l'environnement à partir de l'URL
 */
function detectEnvironmentFromURL(): 'dev' | 'ppd' | 'prd' {
  if (typeof window === 'undefined') {
    return 'dev'
  }

  const hostname = window.location.hostname

  // https://manufacturingportal.beneteau-group.com = PRD
  if (hostname === 'manufacturingportal.beneteau-group.com') {
    return 'prd'
  }

  // https://int.manufacturingportal.beneteau-group.com = PPD
  if (hostname === 'int.manufacturingportal.beneteau-group.com') {
    return 'ppd'
  }

  // https://dev.manufacturingportal.beneteau-group.com = DEV
  // localhost = DEV (par défaut)
  return 'dev'
}

/**
 * Récupère la version actuelle selon l'environnement
 */
export function getCurrentVersion(): string {
  const env = detectEnvironmentFromURL()
  return APP_VERSION[env]
}

/**
 * Récupère le nom de l'environnement actuel
 */
export function getEnvironmentName(): string {
  const env = detectEnvironmentFromURL()
  
  if (env === 'prd') {
    return 'PRD'
  }
  
  if (env === 'ppd') {
    return 'PPD'
  }
  
  return 'DEV'
}
