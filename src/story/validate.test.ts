import { describe, expect, it } from 'vitest'
import type { Chapter } from './types'
import { validateChapter } from './validate'

// Test-only fixture; not real story content.
const HASH = 'a'.repeat(64)

function sampleChapter(): Chapter {
  return {
    id: 'test',
    number: 1,
    title: 'Teszt fejezet',
    apps: [{ app: 'messages' }, { app: 'gallery', availableAfter: { type: 'puzzleSolved', puzzle: 'p1' } }],
    conversations: [
      {
        id: 'c1',
        contact: 'Valaki',
        steps: [
          { type: 'message', from: 'contact', text: 'Szia', photo: 'ph1' },
          {
            type: 'choice',
            options: [
              { text: 'Szia!', replies: [{ type: 'message', from: 'contact', text: 'Jó.' }] },
              { text: 'Ki vagy?', replies: [] },
            ],
          },
          { type: 'wait', until: { type: 'puzzleSolved', puzzle: 'p1' } },
          { type: 'message', from: 'contact', text: 'Ügyes.' },
        ],
      },
    ],
    photos: [{ id: 'ph1', src: 'images/test.jpg', alt: 'Egy tó', info: { takenAt: '1999-07-17T22:45' } }],
    puzzles: [{ id: 'p1', kind: 'text', title: 'Jelszó', prompt: 'Mi a jelszó?', answerHash: HASH, hints: ['a', 'b', 'c'] }],
    evidence: [
      {
        id: 'e1',
        title: 'Nyom',
        description: 'Leírás',
        source: { type: 'photo', photo: 'ph1' },
        foundWhen: { type: 'photoViewed', photo: 'ph1' },
      },
    ],
    completedWhen: {
      type: 'all',
      conditions: [
        { type: 'puzzleSolved', puzzle: 'p1' },
        { type: 'conversationFinished', conversation: 'c1' },
      ],
    },
  }
}

describe('validateChapter', () => {
  it('accepts a consistent chapter', () => {
    expect(validateChapter(sampleChapter())).toEqual([])
  })

  it('reports duplicate ids', () => {
    const chapter = sampleChapter()
    chapter.evidence[0].id = 'p1'
    expect(validateChapter(chapter)).toContain('Duplicate id "p1"')
  })

  it('reports references to missing content', () => {
    const chapter = sampleChapter()
    chapter.completedWhen = { type: 'all', conditions: [{ type: 'puzzleSolved', puzzle: 'nincs' }] }
    chapter.conversations[0].steps[0] = { type: 'message', from: 'contact', text: 'x', photo: 'nincs-kep' }
    chapter.evidence[0].source = { type: 'conversation', conversation: 'nincs-beszelgetes' }
    expect(validateChapter(chapter)).toEqual([
      'conversation c1: unknown photo "nincs-kep"',
      'evidence e1: unknown conversation "nincs-beszelgetes"',
      'completedWhen: unknown puzzle "nincs"',
    ])
  })

  it('reports malformed hashes and one-option choices', () => {
    const chapter = sampleChapter()
    chapter.puzzles[0].answerHash = 'jelszo'
    chapter.conversations[0].steps[1] = { type: 'choice', options: [{ text: 'Csak ez', replies: [] }] }
    expect(validateChapter(chapter)).toEqual([
      'conversation c1: a choice needs at least two options',
      'puzzle p1: answerHash is not a SHA-256 hex string',
    ])
  })

  it('requires exactly three hints at compile time', () => {
    const chapter = sampleChapter()
    // @ts-expect-error two hints are not enough
    chapter.puzzles[0].hints = ['a', 'b']
    expect(chapter.puzzles[0].hints).toHaveLength(2)
  })
})
