import type { ChoiceOption, Condition, Conversation, MessageStep } from '../story/types'

/**
 * A conversation flattened into the order the player experiences it.
 * Chosen options are expanded in place (the player's message, then the replies),
 * so everything before the cursor stays stable as the player makes choices.
 */
export type TimelineItem =
  | { kind: 'message'; message: MessageStep }
  | { kind: 'choice'; step: number; options: ChoiceOption[] }
  | { kind: 'wait'; until: Condition }

export interface ConversationProgress {
  /** Index of the next timeline item; everything before it has been delivered. */
  cursor: number
  /** Everything before this index has been seen by the player. */
  readUpTo: number
  /** Step index of each answered choice → chosen option index. */
  choices: Record<number, number>
}

export function buildTimeline(conversation: Conversation, choices: Record<number, number>): TimelineItem[] {
  const items: TimelineItem[] = (conversation.history ?? []).map((message) => ({ kind: 'message', message }))
  conversation.steps.forEach((step, index) => {
    if (step.type === 'message') {
      items.push({ kind: 'message', message: step })
    } else if (step.type === 'wait') {
      items.push({ kind: 'wait', until: step.until })
    } else {
      items.push({ kind: 'choice', step: index, options: step.options })
      const chosen = step.options[choices[index]]
      if (chosen) {
        items.push({ kind: 'message', message: { type: 'message', from: 'player', text: chosen.text } })
        chosen.replies.forEach((message) => items.push({ kind: 'message', message }))
      }
    }
  })
  return items
}

/** History counts as already delivered and read. */
export function initialProgress(conversation: Conversation): ConversationProgress {
  const historyLength = conversation.history?.length ?? 0
  return { cursor: historyLength, readUpTo: historyLength, choices: {} }
}

export function isFinished(conversation: Conversation, progress: ConversationProgress): boolean {
  return progress.cursor >= buildTimeline(conversation, progress.choices).length
}

export function unreadCount(conversation: Conversation, progress: ConversationProgress): number {
  return buildTimeline(conversation, progress.choices)
    .slice(progress.readUpTo, progress.cursor)
    .filter((item) => item.kind === 'message' && item.message.from === 'contact').length
}

/** How long the contact "types" before a message arrives. */
export function typingDelay(message: MessageStep): number {
  if (message.from === 'player') return 600
  return Math.min(3500, Math.max(900, 500 + message.text.length * 30))
}
