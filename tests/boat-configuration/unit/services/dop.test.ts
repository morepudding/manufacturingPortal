/**
 * Tests unitaires - dop-service.ts
 * 
 * Tests des fonctions utilitaires de parsing des DOP IDs :
 * 1. extractMainDopId() - Extraction du DOP ID principal
 * 2. isCompositeDopId() - Vérification si composite
 * 3. parseDopId() - Parsing complet avec parties
 * 
 * ⚠️ Tests UNITAIRES purs (pas de mocks, juste de la logique)
 * 
 * Contexte:
 * Les Shop Orders IFS retournent des DOP IDs composés comme "54 - 1035"
 * mais le service DopHeaderHandling.svc n'accepte que le DOP principal "54"
 */

import { describe, it, expect, vi } from 'vitest'
import {
  extractMainDopId,
  isCompositeDopId,
  parseDopId,
} from '@/tools/boat-configuration/services/dop-service'

describe('dop-service.ts', () => {
  // ===================================================================
  // extractMainDopId()
  // ===================================================================

  describe('extractMainDopId()', () => {
    // ===== TEST 1: CAS NOMINAUX =====

    it('devrait extraire "54" depuis "54 - 1035" (format standard IFS)', () => {
      // Arrange
      const dopId = '54 - 1035'

      // Act
      const result = extractMainDopId(dopId)

      // Assert
      expect(result).toBe('54')
    })

    it('devrait extraire "95" depuis "95 - 10088"', () => {
      // Arrange
      const dopId = '95 - 10088'

      // Act
      const result = extractMainDopId(dopId)

      // Assert
      expect(result).toBe('95')
    })

    it('devrait extraire "34" depuis "34 - 1014"', () => {
      // Arrange
      const dopId = '34 - 1014'

      // Act
      const result = extractMainDopId(dopId)

      // Assert
      expect(result).toBe('34')
    })

    it('devrait extraire "48" depuis "48 - 10102"', () => {
      // Arrange
      const dopId = '48 - 10102'

      // Act
      const result = extractMainDopId(dopId)

      // Assert
      expect(result).toBe('48')
    })

    // ===== TEST 2: DOP ID SIMPLE (NON COMPOSÉ) =====

    it('devrait retourner "103" tel quel (pas de séparateur)', () => {
      // Arrange
      const dopId = '103'

      // Act
      const result = extractMainDopId(dopId)

      // Assert
      expect(result).toBe('103')
    })

    it('devrait retourner "42" tel quel', () => {
      // Arrange
      const dopId = '42'

      // Act
      const result = extractMainDopId(dopId)

      // Assert
      expect(result).toBe('42')
    })

    // ===== TEST 3: FORMATS ALTERNATIFS =====

    it('devrait gérer le format sans espaces "37-2"', () => {
      // Arrange
      const dopId = '37-2'

      // Act
      const result = extractMainDopId(dopId)

      // Assert
      expect(result).toBe('37')
    })

    it('devrait gérer le format "54-1035" (sans espaces)', () => {
      // Arrange
      const dopId = '54-1035'

      // Act
      const result = extractMainDopId(dopId)

      // Assert
      expect(result).toBe('54')
    })

    // ===== TEST 4: WHITESPACE & TRIM =====

    it('devrait trimmer les espaces avant/après "  95 - 10088  "', () => {
      // Arrange
      const dopId = '  95 - 10088  '

      // Act
      const result = extractMainDopId(dopId)

      // Assert
      expect(result).toBe('95')
    })

    it('devrait trimmer les espaces dans "  34  "', () => {
      // Arrange
      const dopId = '  34  '

      // Act
      const result = extractMainDopId(dopId)

      // Assert
      expect(result).toBe('34')
    })

    it('devrait gérer les espaces multiples "54  -  1035"', () => {
      // Arrange
      const dopId = '54  -  1035'

      // Act
      const result = extractMainDopId(dopId)

      // Assert
      expect(result).toBe('54')
    })

    // ===== TEST 5: EDGE CASES =====

    it('devrait retourner string vide pour DOP ID vide', () => {
      // Arrange
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      // Act
      const result = extractMainDopId('')

      // Assert
      expect(result).toBe('')
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Empty DOP ID provided')
      )

      // Cleanup
      consoleWarnSpy.mockRestore()
    })

    it('devrait gérer DOP ID avec uniquement des espaces', () => {
      // Arrange
      const dopId = '   '
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      // Act
      const result = extractMainDopId(dopId)

      // Assert
      expect(result).toBe('')

      // Cleanup
      consoleWarnSpy.mockRestore()
    })

    // ===== TEST 6: LOGS =====

    it('devrait logger le parsing effectué', () => {
      // Arrange
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const dopId = '54 - 1035'

      // Act
      extractMainDopId(dopId)

      // Assert
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('DOP ID parsing:')
      )
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('"54 - 1035"')
      )
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('"54"')
      )

      // Cleanup
      consoleLogSpy.mockRestore()
    })
  })

  // ===================================================================
  // isCompositeDopId()
  // ===================================================================

  describe('isCompositeDopId()', () => {
    // ===== TEST 1: DOP IDS COMPOSÉS =====

    it('devrait retourner true pour "54 - 1035" (format standard)', () => {
      // Act & Assert
      expect(isCompositeDopId('54 - 1035')).toBe(true)
    })

    it('devrait retourner true pour "95 - 10088"', () => {
      // Act & Assert
      expect(isCompositeDopId('95 - 10088')).toBe(true)
    })

    it('devrait retourner true pour "37-2" (sans espaces)', () => {
      // Act & Assert
      expect(isCompositeDopId('37-2')).toBe(true)
    })

    it('devrait retourner true pour "34-1014" (sans espaces)', () => {
      // Act & Assert
      expect(isCompositeDopId('34-1014')).toBe(true)
    })

    // ===== TEST 2: DOP IDS SIMPLES =====

    it('devrait retourner false pour "103" (pas de séparateur)', () => {
      // Act & Assert
      expect(isCompositeDopId('103')).toBe(false)
    })

    it('devrait retourner false pour "42"', () => {
      // Act & Assert
      expect(isCompositeDopId('42')).toBe(false)
    })

    it('devrait retourner false pour "1"', () => {
      // Act & Assert
      expect(isCompositeDopId('1')).toBe(false)
    })

    // ===== TEST 3: EDGE CASES =====

    it('devrait retourner false pour string vide', () => {
      // Act & Assert
      expect(isCompositeDopId('')).toBe(false)
    })

    it('devrait retourner false pour string avec espaces uniquement', () => {
      // Act & Assert
      expect(isCompositeDopId('   ')).toBe(false)
    })
  })

  // ===================================================================
  // parseDopId()
  // ===================================================================

  describe('parseDopId()', () => {
    // ===== TEST 1: DOP IDS COMPOSÉS =====

    it('devrait parser "54 - 1035" en { mainId: "54", secondaryId: "1035", isComposite: true }', () => {
      // Arrange
      const dopId = '54 - 1035'

      // Act
      const result = parseDopId(dopId)

      // Assert
      expect(result).toEqual({
        mainId: '54',
        secondaryId: '1035',
        isComposite: true,
      })
    })

    it('devrait parser "95 - 10088" correctement', () => {
      // Arrange
      const dopId = '95 - 10088'

      // Act
      const result = parseDopId(dopId)

      // Assert
      expect(result).toEqual({
        mainId: '95',
        secondaryId: '10088',
        isComposite: true,
      })
    })

    it('devrait parser "37-2" (sans espaces) correctement', () => {
      // Arrange
      const dopId = '37-2'

      // Act
      const result = parseDopId(dopId)

      // Assert
      expect(result).toEqual({
        mainId: '37',
        secondaryId: '2',
        isComposite: true,
      })
    })

    it('devrait parser "34 - 1014" correctement', () => {
      // Arrange
      const dopId = '34 - 1014'

      // Act
      const result = parseDopId(dopId)

      // Assert
      expect(result).toEqual({
        mainId: '34',
        secondaryId: '1014',
        isComposite: true,
      })
    })

    // ===== TEST 2: DOP IDS SIMPLES =====

    it('devrait parser "103" en { mainId: "103", secondaryId: null, isComposite: false }', () => {
      // Arrange
      const dopId = '103'

      // Act
      const result = parseDopId(dopId)

      // Assert
      expect(result).toEqual({
        mainId: '103',
        secondaryId: null,
        isComposite: false,
      })
    })

    it('devrait parser "42" correctement', () => {
      // Arrange
      const dopId = '42'

      // Act
      const result = parseDopId(dopId)

      // Assert
      expect(result).toEqual({
        mainId: '42',
        secondaryId: null,
        isComposite: false,
      })
    })

    // ===== TEST 3: WHITESPACE =====

    it('devrait trimmer les espaces "  54 - 1035  "', () => {
      // Arrange
      const dopId = '  54 - 1035  '

      // Act
      const result = parseDopId(dopId)

      // Assert
      expect(result).toEqual({
        mainId: '54',
        secondaryId: '1035',
        isComposite: true,
      })
    })

    it('devrait gérer espaces multiples "54  -  1035"', () => {
      // Arrange
      const dopId = '54  -  1035'

      // Act
      const result = parseDopId(dopId)

      // Assert
      expect(result).toEqual({
        mainId: '54',
        secondaryId: '1035',
        isComposite: true,
      })
    })

    it('devrait trimmer DOP ID simple "  103  "', () => {
      // Arrange
      const dopId = '  103  '

      // Act
      const result = parseDopId(dopId)

      // Assert
      expect(result).toEqual({
        mainId: '103',
        secondaryId: null,
        isComposite: false,
      })
    })

    // ===== TEST 4: EDGE CASES =====

    it('devrait retourner valeurs vides pour string vide', () => {
      // Arrange
      const dopId = ''

      // Act
      const result = parseDopId(dopId)

      // Assert
      expect(result).toEqual({
        mainId: '',
        secondaryId: null,
        isComposite: false,
      })
    })

    it('devrait gérer DOP ID avec uniquement des espaces', () => {
      // Arrange
      const dopId = '   '

      // Act
      const result = parseDopId(dopId)

      // Assert
      expect(result).toEqual({
        mainId: '',
        secondaryId: null,
        isComposite: false,
      })
    })

    // ===== TEST 5: CAS COMPLEXES =====

    it('devrait gérer DOP ID avec plusieurs séparateurs "54 - 1035 - 2"', () => {
      // Arrange - Cas improbable mais on teste quand même
      const dopId = '54 - 1035 - 2'

      // Act
      const result = parseDopId(dopId)

      // Assert
      expect(result.mainId).toBe('54')
      expect(result.secondaryId).toBe('1035') // Prend seulement la première partie après "-"
      expect(result.isComposite).toBe(true)
    })
  })

  // ===================================================================
  // Tests de cohérence entre les fonctions
  // ===================================================================

  describe('Cohérence entre les fonctions', () => {
    it('extractMainDopId() devrait retourner le même mainId que parseDopId()', () => {
      // Arrange
      const testCases = [
        '54 - 1035',
        '95 - 10088',
        '34 - 1014',
        '103',
        '42',
        '37-2',
      ]

      testCases.forEach((dopId) => {
        // Act
        const extractedId = extractMainDopId(dopId)
        const parsedResult = parseDopId(dopId)

        // Assert
        expect(extractedId).toBe(parsedResult.mainId)
      })
    })

    it('isCompositeDopId() devrait être cohérent avec parseDopId().isComposite', () => {
      // Arrange
      const testCases = [
        '54 - 1035',
        '95 - 10088',
        '103',
        '42',
        '37-2',
        '',
      ]

      testCases.forEach((dopId) => {
        // Act
        const isComposite = isCompositeDopId(dopId)
        const parsedResult = parseDopId(dopId)

        // Assert
        expect(isComposite).toBe(parsedResult.isComposite)
      })
    })

    it('tous les DOP IDs composés devraient avoir un secondaryId non-null', () => {
      // Arrange
      const compositeDopIds = [
        '54 - 1035',
        '95 - 10088',
        '34 - 1014',
        '48 - 10102',
        '37-2',
      ]

      compositeDopIds.forEach((dopId) => {
        // Act
        const result = parseDopId(dopId)

        // Assert
        expect(result.isComposite).toBe(true)
        expect(result.secondaryId).not.toBeNull()
        expect(result.secondaryId).toBeTruthy()
      })
    })

    it('tous les DOP IDs simples devraient avoir secondaryId null', () => {
      // Arrange
      const simpleDopIds = ['103', '42', '1', '999']

      simpleDopIds.forEach((dopId) => {
        // Act
        const result = parseDopId(dopId)

        // Assert
        expect(result.isComposite).toBe(false)
        expect(result.secondaryId).toBeNull()
      })
    })
  })
})
