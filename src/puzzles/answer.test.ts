import { describe, expect, it } from 'vitest'
import { hashAnswer, isCorrectAnswer, normalizeAnswer } from './answer'
import { CHAPTERS } from '../story/chapters'

describe('normalizeAnswer', () => {
  it('lowercases and strips accents, including ő and ű', () => {
    expect(normalizeAnswer('FENYŐHÁZA')).toBe('fenyohaza')
    expect(normalizeAnswer('Tűzoltó')).toBe('tuzolto')
  })

  it('removes whitespace and punctuation', () => {
    expect(normalizeAnswer('  Tavi  Fesztivál\t')).toBe('tavifesztival')
    expect(normalizeAnswer('Kikötő sétány 4.')).toBe('kikotosetany4')
    expect(normalizeAnswer('„Kerekes”!')).toBe('kerekes')
  })
})

describe('hashAnswer', () => {
  it('produces the SHA-256 hex of the normalized answer', async () => {
    // sha256("abc")
    expect(await hashAnswer('A B C')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad')
  })

  it('accepts the chapter 1 answers in the forms players are likely to type', async () => {
    const [lock, place] = CHAPTERS[0].puzzles
    expect(await isCorrectAnswer('KEREKES', lock.answerHash)).toBe(true)
    expect(await isCorrectAnswer('Kikötő sétány 4.', place.answerHash)).toBe(true)
    expect(await isCorrectAnswer('kikoto setany 4', place.answerHash)).toBe(true)
    expect(await isCorrectAnswer('Kikötő sétány', place.answerHash)).toBe(false)
  })
})
