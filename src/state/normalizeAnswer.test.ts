import { describe, expect, it } from 'vitest'
import { normalizeAnswer } from './normalizeAnswer'

describe('normalizeAnswer', () => {
  it('lowercases and strips accents, including ő and ű', () => {
    expect(normalizeAnswer('FENYŐHÁZA')).toBe('fenyohaza')
    expect(normalizeAnswer('Tűzoltó')).toBe('tuzolto')
  })

  it('removes all whitespace', () => {
    expect(normalizeAnswer('  Tavi  Fesztivál\t')).toBe('tavifesztival')
  })
})
