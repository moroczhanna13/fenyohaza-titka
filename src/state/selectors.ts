import type { AppId } from '../apps/registry'
import { caseOfChapter, chapterAfter, chapterIndex, chaptersUpTo, findConversation } from '../story/chapters'
import type { Chapter, Condition, Conversation, Email, Evidence, Id, Photo, Puzzle, WebPage } from '../story/types'
import { buildTimeline, isFinished } from './conversation'
import { getProgress, type GameState } from './gameState'

export function currentChapter(state: GameState): Chapter {
  return caseOfChapter(state.chapter).chapters[chapterIndex(state.chapter)]
}

/** True while the current chapter's phone lock is still unsolved. */
export function isPhoneLocked(state: GameState): boolean {
  const { lock } = currentChapter(state)
  return !!lock && !state.solvedPuzzles.includes(lock.puzzle)
}

export function isMet(state: GameState, condition: Condition | undefined): boolean {
  if (!condition) return true
  switch (condition.type) {
    case 'puzzleSolved':
      return state.solvedPuzzles.includes(condition.puzzle)
    case 'photoViewed':
      return state.viewedPhotos.includes(condition.photo)
    case 'pageVisited':
      return state.visitedPages.includes(condition.page)
    case 'conversationFinished': {
      const conversation = findConversation(condition.conversation)
      return !!conversation && isFinished(conversation, getProgress(state, conversation.id))
    }
    case 'all':
      return condition.conditions.every((c) => isMet(state, c))
  }
}

export function unlockedApps(state: GameState): AppId[] {
  return chaptersUpTo(state.chapter)
    .flatMap((chapter) => chapter.apps)
    .filter((unlock) => isMet(state, unlock.availableAfter))
    .map((unlock) => unlock.app)
}

/** Photos in the gallery, newest first. Photos sent in a conversation appear once delivered. */
export function availablePhotos(state: GameState): Photo[] {
  const sentInChat = new Map<Id, boolean>()
  for (const conversation of chaptersUpTo(state.chapter).flatMap((c) => c.conversations)) {
    const progress = getProgress(state, conversation.id)
    buildTimeline(conversation, progress.choices).forEach((item, index) => {
      if (item.kind !== 'message' || !item.message.photo) return
      const delivered = isMet(state, conversation.availableAfter) && index < progress.cursor
      sentInChat.set(item.message.photo, (sentInChat.get(item.message.photo) ?? false) || delivered)
    })
  }
  return chaptersUpTo(state.chapter)
    .flatMap((chapter) => chapter.photos)
    .filter((photo) => isMet(state, photo.availableAfter) && sentInChat.get(photo.id) !== false)
    .sort((a, b) => b.info.takenAt.localeCompare(a.info.takenAt))
}

/** Conversations shown together as one chat on the phone share a thread id. */
export function threadOf(conversation: Conversation): Id {
  return conversation.thread ?? conversation.id
}

/** Available conversations grouped into chat threads, each in story order. */
export function availableThreads(state: GameState): Map<Id, Conversation[]> {
  const threads = new Map<Id, Conversation[]>()
  for (const conversation of availableConversations(state)) {
    const id = threadOf(conversation)
    threads.set(id, [...(threads.get(id) ?? []), conversation])
  }
  return threads
}

export function availableConversations(state: GameState): Conversation[] {
  return chaptersUpTo(state.chapter)
    .flatMap((chapter) => chapter.conversations)
    .filter((conversation) => isMet(state, conversation.availableAfter))
}

/** Evidence found so far, in story order; it goes to the notebook automatically. */
export function foundEvidence(state: GameState): Evidence[] {
  return chaptersUpTo(state.chapter)
    .flatMap((chapter) => chapter.evidence)
    .filter((evidence) => isMet(state, evidence.foundWhen))
}

/** Inbox: the current chapter's emails first, each chapter newest first. */
export function availableEmails(state: GameState): Email[] {
  return [...chaptersUpTo(state.chapter)]
    .reverse()
    .flatMap((chapter) => chapter.emails ?? [])
    .filter((email) => isMet(state, email.availableAfter))
}

export function isChapterComplete(state: GameState): boolean {
  const { completedWhen } = currentChapter(state)
  return !!completedWhen && isMet(state, completedWhen)
}

export function nextChapter(state: GameState): Chapter | undefined {
  return chapterAfter(state.chapter)
}

/** The whole case is solved: its last chapter is complete. */
export function isCaseSolved(state: GameState): boolean {
  return isChapterComplete(state) && !nextChapter(state)
}

export function availablePages(state: GameState): WebPage[] {
  return chaptersUpTo(state.chapter)
    .flatMap((chapter) => chapter.pages ?? [])
    .filter((page) => isMet(state, page.availableAfter))
}

/** Puzzles solved in the Deductions app (connect and timeline), available so far. */
export function availableDeductions(state: GameState): Puzzle[] {
  return chaptersUpTo(state.chapter)
    .flatMap((chapter) => chapter.puzzles)
    .filter((puzzle) => puzzle.kind !== 'text' && isMet(state, puzzle.availableAfter))
}
