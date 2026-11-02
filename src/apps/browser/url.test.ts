import { describe, expect, it } from 'vitest'
import type { WebPage } from '../../story/types'
import { findPageByUrl, normalizeUrl } from './url'

describe('browser urls', () => {
  it('ignores protocol, www, case and trailing slashes', () => {
    expect(normalizeUrl(' HTTPS://www.Fenyohazihirek.hu/Archivum/ ')).toBe('fenyohazihirek.hu/archivum')
  })

  it('finds a page by any spelling of its address', () => {
    const pages: WebPage[] = [
      { kind: 'vehicleRegistry', id: 'r', url: 'regirendszam.hu', title: 'R', records: [] },
    ]
    expect(findPageByUrl(pages, 'http://regirendszam.hu/')?.id).toBe('r')
    expect(findPageByUrl(pages, 'masik.hu')).toBeUndefined()
  })
})
