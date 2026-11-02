import { describe, expect, it } from 'vitest'
import { formatCoordinates, formatMonth, formatTakenAt } from './format'

describe('gallery formatting', () => {
  it('formats dates in Hungarian', () => {
    expect(formatTakenAt('2026-09-14T21:12')).toBe('2026. szeptember 14. 21:12')
    expect(formatTakenAt('2026-07-02T08:05')).toBe('2026. július 2. 08:05')
    expect(formatMonth('2026-09-14T21:12')).toBe('2026. szeptember')
  })

  it('formats coordinates with Hungarian compass letters', () => {
    expect(formatCoordinates({ lat: 46.9132, lon: 17.8915 })).toBe('46,9132° É, 17,8915° K')
    expect(formatCoordinates({ lat: -1.5, lon: -2.25 })).toBe('1,5000° D, 2,2500° Ny')
  })
})
