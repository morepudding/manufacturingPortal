/**
 * 🔇 API Logger
 * 
 * Logger pour les API Routes.
 * Désactivé par défaut, activable via ENABLE_DEBUG_LOGS=true
 */

const IS_DEBUG = process.env.ENABLE_DEBUG_LOGS === 'true';

export function apiDebug(...args: any[]): void {
  if (IS_DEBUG) {
    console.log(...args);
  }
}

export function apiInfo(...args: any[]): void {
  if (IS_DEBUG) {
    console.info(...args);
  }
}

export function apiError(...args: any[]): void {
  console.error('❌ [API Error]', ...args);
}

export function apiSuccess(...args: any[]): void {
  if (IS_DEBUG) {
    console.log('✅', ...args);
  }
}

export const apiLogger = {
  debug: apiDebug,
  info: apiInfo,
  error: apiError,
  success: apiSuccess,
};
