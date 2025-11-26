/**
 * Fixtures Index - Point d'entrée centralisé pour toutes les fixtures IFS
 * 
 * Toutes les fixtures sont basées sur de VRAIES données IFS capturées via Azure APIM
 * ou sur des données de fallback validées dans les tests unitaires
 * 
 * @see scripts/investigate-ifs-data.ts
 * @see tests/boat-configuration/integration/fixtures/ifs-real-data.json
 */

export * from './shop-orders.fixture'
export * from './dop-headers.fixture'
export * from './customer-orders.fixture'
export * from './print.fixture'
