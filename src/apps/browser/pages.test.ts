import { describe, expect, it } from 'vitest'
import type { NewsArticle, SocialHomePage, SocialPage, VehicleRecord } from '../../story/types'
import { networkPages, searchProfiles } from './SocialHomeView'
import { initials } from './SocialPageView'
import { formatIssueDate, searchArticles } from './NewsArchiveView'
import { findVehicles, normalizePlate } from './VehicleRegistryView'

const article = (id: string, date: string): NewsArticle => ({ id, date, title: id, body: [] })

describe('news archive search', () => {
  const articles = [article('c', '2001-07-30'), article('a', '2001-07-16'), article('b', '2001-07-23')]

  it('finds articles from the chosen day and the following days', () => {
    expect(searchArticles(articles, '2001-07-21', 3).map((a) => a.id)).toEqual(['b'])
    expect(searchArticles(articles, '2001-07-23', 0).map((a) => a.id)).toEqual(['b'])
    expect(searchArticles(articles, '2001-07-15', 20).map((a) => a.id)).toEqual(['a', 'b', 'c'])
    expect(searchArticles(articles, '2001-07-24', 3)).toEqual([])
    expect(searchArticles(articles, '', 3)).toEqual([])
  })

  it('formats issue dates in Hungarian', () => {
    expect(formatIssueDate('2001-07-23')).toBe('2001. július 23.')
  })
})

describe('vehicle registry search', () => {
  const records: VehicleRecord[] = [
    { plate: 'GBM-418', vehicle: 'x', color: 'piros', holder: 'h', period: '1997–2005' },
  ]

  it('matches plates regardless of spacing, dashes and case', () => {
    expect(normalizePlate(' gbm 418 ')).toBe('GBM418')
    expect(findVehicles(records, 'gbm418')).toHaveLength(1)
    expect(findVehicles(records, 'GBM-481')).toHaveLength(0)
    expect(findVehicles(records, '  ')).toHaveLength(0)
  })
})

describe('social network', () => {
  const profile = (id: string, url: string, name: string, profileType: SocialPage['profileType']): SocialPage => ({
    kind: 'social',
    id,
    url,
    title: name,
    name,
    profileType,
    posts: [],
  })
  const home: SocialHomePage = { kind: 'socialHome', id: 'home', url: 'szomszedok.hu', title: 'Szomszédok' }
  const ilona = profile('i', 'szomszedok.hu/vidor.ilona', 'Vidor Ilona', 'person')
  const pub = profile('p', 'szomszedok.hu/sorozo', 'Pásztor Söröző', 'business')
  const elsewhere = profile('x', 'masik.hu/valaki', 'Vidor Valaki', 'person')

  it('lists only the pages under its own address', () => {
    expect(networkPages(home, [ilona, pub, elsewhere, home]).map((p) => p.id)).toEqual(['i', 'p'])
  })

  it('finds profiles ignoring case and accents, from three letters', () => {
    expect(searchProfiles([ilona, pub], 'vidor').map((p) => p.id)).toEqual(['i'])
    expect(searchProfiles([ilona, pub], 'PASZTOR').map((p) => p.id)).toEqual(['p'])
    expect(searchProfiles([ilona, pub], 'vi')).toEqual([])
  })

  it('makes initials from capitalized words', () => {
    expect(initials('Vidor Ilona')).toBe('VI')
    expect(initials('Régi fenyőházi fesztiválok')).toBe('R')
  })
})
