import { describe, expect, it } from 'vitest'
import { CHAPTERS } from './chapters'
import { validateChapter } from './validate'

describe('story data', () => {
  it.each(CHAPTERS.map((c) => [c.id, c] as const))('%s is consistent', (_id, chapter) => {
    expect(validateChapter(chapter)).toEqual([])
  })

  it('uses unique ids across all chapters', () => {
    const ids = CHAPTERS.flatMap((c) => [...c.conversations, ...c.photos, ...c.puzzles, ...c.evidence]).map((x) => x.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
