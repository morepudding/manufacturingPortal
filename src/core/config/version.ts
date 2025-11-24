/**
 * Configuration de version de l'application
 * Gère les versions selon l'environnement
 */

export const APP_VERSION = {
  dev: '2.1.0',
  ppd: '2.0.0',
  prd: '2.0.0',
} as const

/**
 * Récupère la version actuelle selon l'environnement
 */
export function getCurrentVersion(): string {
  const env = process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV || 'dev'
  
  // Mapper les environnements
  if (env === 'production' || env === 'prd') {
    return APP_VERSION.prd
  }
  
  if (env === 'preprod' || env === 'ppd' || env === 'preview') {
    return APP_VERSION.ppd
  }
  
  // Par défaut: dev
  return APP_VERSION.dev
}

/**
 * Récupère le nom de l'environnement actuel
 */
export function getEnvironmentName(): string {
  const env = process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV || 'dev'
  
  if (env === 'production' || env === 'prd') {
    return 'PRD'
  }
  
  if (env === 'preprod' || env === 'ppd' || env === 'preview') {
    return 'PPD'
  }
  
  return 'DEV'
}
