import { describe, expect, it } from 'vitest'
import type { NewsArticle, VehicleRecord } from '../../story/types'
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
