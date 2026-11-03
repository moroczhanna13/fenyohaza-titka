import { describe, expect, it } from 'vitest'
import { CASES } from './chapters'
import { validateChapter } from './validate'

describe('story data', () => {
  it.each(CASES.flatMap((sc) => sc.chapters).map((c) => [c.id, c] as const))('%s is consistent', (_id, chapter) => {
    expect(validateChapter(chapter)).toEqual([])
  })

  it('uses unique ids across all cases and chapters', () => {
    const ids = CASES.flatMap((sc) => sc.chapters).flatMap((c) => [...c.conversations, ...c.photos, ...c.puzzles, ...c.evidence]).map((x) => x.id)
    expect(new Set(ids).size).toBe(ids.length)
    const chapterIds = CASES.flatMap((sc) => sc.chapters).map((c) => c.id)
    expect(new Set([...chapterIds, ...CASES.map((c) => c.id)]).size).toBe(chapterIds.length + CASES.length)
  })
})
