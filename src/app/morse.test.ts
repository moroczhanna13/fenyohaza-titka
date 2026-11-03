import { describe, expect, it } from 'vitest'
import { formatSeconds, morseSchedule } from './morse'

describe('morseSchedule', () => {
  it('uses 1-3-7 unit spacing', () => {
    // "A A": dot, dash, letter gap, dot, dash
    const { beeps, total } = morseSchedule('.- .-', 1)
    expect(beeps).toEqual([
      { start: 0, length: 1 },
      { start: 2, length: 3 },
      { start: 8, length: 1 },
      { start: 10, length: 3 },
    ])
    expect(total).toBe(13)
  })

  it('puts 7 units between words', () => {
    const { beeps } = morseSchedule('. / .', 1)
    expect(beeps.map((b) => b.start)).toEqual([0, 8])
  })
})

describe('formatSeconds', () => {
  it('formats as m:ss', () => {
    expect(formatSeconds(20.3)).toBe('0:20')
    expect(formatSeconds(65)).toBe('1:05')
  })
})
