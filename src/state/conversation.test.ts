import { describe, expect, it } from 'vitest'
import type { Conversation } from '../story/types'
import { buildTimeline, initialProgress, isFinished, unreadCount } from './conversation'

// Test-only fixture; not real story content.
const conversation: Conversation = {
  id: 'c',
  contact: 'Valaki',
  history: [{ type: 'message', from: 'contact', text: 'régi' }],
  steps: [
    { type: 'message', from: 'contact', text: 'egy' },
    {
      type: 'choice',
      options: [
        { text: 'A', replies: [{ type: 'message', from: 'contact', text: 'válasz A' }] },
        { text: 'B', replies: [] },
      ],
    },
    { type: 'wait', until: { type: 'puzzleSolved', puzzle: 'p' } },
    { type: 'message', from: 'contact', text: 'vége' },
  ],
}

const texts = (choices: Record<number, number>) =>
  buildTimeline(conversation, choices).map((item) => (item.kind === 'message' ? item.message.text : item.kind))

describe('conversation timeline', () => {
  it('stops at an unanswered choice and expands the chosen branch', () => {
    expect(texts({})).toEqual(['régi', 'egy', 'choice', 'wait', 'vége'])
    expect(texts({ 1: 0 })).toEqual(['régi', 'egy', 'choice', 'A', 'válasz A', 'wait', 'vége'])
    expect(texts({ 1: 1 })).toEqual(['régi', 'egy', 'choice', 'B', 'wait', 'vége'])
  })

  it('treats history as delivered and read', () => {
    expect(initialProgress(conversation)).toEqual({ cursor: 1, readUpTo: 1, choices: {} })
  })

  it('counts unread contact messages and detects the end', () => {
    expect(unreadCount(conversation, { cursor: 2, readUpTo: 0, choices: {} })).toBe(2)
    expect(isFinished(conversation, { cursor: 6, readUpTo: 6, choices: { 1: 1 } })).toBe(true)
    expect(isFinished(conversation, { cursor: 5, readUpTo: 5, choices: { 1: 1 } })).toBe(false)
  })
})
