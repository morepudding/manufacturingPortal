/**
 * 🔇 Part Printer Logger
 * 
 * Système de logging centralisé avec activation/désactivation via env var.
 * Par défaut, seules les erreurs critiques sont loggées.
 * 
 * Pour activer les logs de debug: ENABLE_DEBUG_LOGS=true dans .env.local
 */

const IS_DEBUG = process.env.ENABLE_DEBUG_LOGS === 'true';

/**
 * Log de débogage (désactivé en production par défaut)
 */
export function debug(...args: any[]): void {
  if (IS_DEBUG) {
    console.log(...args);
  }
}

/**
 * Log d'information (désactivé en production par défaut)
 */
export function info(...args: any[]): void {
  if (IS_DEBUG) {
    console.info(...args);
  }
}

/**
 * Log d'avertissement (toujours affiché)
 */
export function warn(...args: any[]): void {
  console.warn('⚠️', ...args);
}

/**
 * Log d'erreur (toujours affiché)
 */
export function error(...args: any[]): void {
  console.error('❌', ...args);
}

/**
 * Log de succès critique (toujours affiché)
 */
export function success(...args: any[]): void {
  console.log('✅', ...args);
}

export const logger = {
  debug,
  info,
  warn,
  error,
  success,
};
