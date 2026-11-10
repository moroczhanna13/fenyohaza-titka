import { findConversation } from './chapters'
import type { Chapter, Condition, ConversationStep, EvidenceSource } from './types'

/**
 * Checks a chapter for authoring mistakes: duplicate ids, references to
 * content that does not exist, malformed answer hashes.
 * Returns a list of problems; an empty list means the chapter is valid.
 */
export function validateChapter(chapter: Chapter): string[] {
  const errors: string[] = []
  const conversations = new Set(chapter.conversations.map((c) => c.id))
  const photos = new Set(chapter.photos.map((p) => p.id))
  const puzzles = new Set(chapter.puzzles.map((p) => p.id))
  const voices = new Set((chapter.voiceMessages ?? []).map((v) => v.id))
  const pages = new Set(
    (chapter.pages ?? []).flatMap((p) => [
      p.id,
      ...(p.kind === 'newsArchive' ? p.articles.map((a) => a.id) : []),
      ...(p.kind === 'imageSearch' ? p.searches.map((e) => e.id) : []),
    ]),
  )

  const seen = new Set<string>()
  const allIds = [
    ...(chapter.box ?? []),
    ...chapter.conversations,
    ...(chapter.emails ?? []),
    ...chapter.photos,
    ...chapter.puzzles,
    ...chapter.evidence,
    ...[...pages].map((id) => ({ id })),
  ].map((item) => item.id)
  for (const id of allIds) {
    if (seen.has(id)) errors.push(`Duplicate id "${id}"`)
    seen.add(id)
  }

  const checkCondition = (condition: Condition | undefined, where: string) => {
    if (!condition) return
    switch (condition.type) {
      case 'puzzleSolved':
        if (!puzzles.has(condition.puzzle)) errors.push(`${where}: unknown puzzle "${condition.puzzle}"`)
        break
      case 'conversationFinished':
        if (!conversations.has(condition.conversation))
          errors.push(`${where}: unknown conversation "${condition.conversation}"`)
        break
      case 'photoViewed':
        if (!photos.has(condition.photo)) errors.push(`${where}: unknown photo "${condition.photo}"`)
        break
      case 'pageVisited':
        if (!pages.has(condition.page)) errors.push(`${where}: unknown page "${condition.page}"`)
        break
      case 'all':
        condition.conditions.forEach((c) => checkCondition(c, where))
        break
    }
  }

  const checkSource = (source: EvidenceSource | undefined, where: string) => {
    if (!source) return
    const [known, ref] =
      source.type === 'photo'
        ? [photos, source.photo]
        : source.type === 'conversation'
          ? [conversations, source.conversation]
          : [puzzles, source.puzzle]
    if (!known.has(ref)) errors.push(`${where}: unknown ${source.type} "${ref}"`)
  }

  const checkSteps = (steps: ConversationStep[], where: string) => {
    for (const step of steps) {
      if (step.type === 'message' && step.photo && !photos.has(step.photo))
        errors.push(`${where}: unknown photo "${step.photo}"`)
      if (step.type === 'message' && step.audio && !voices.has(step.audio))
        errors.push(`${where}: unknown voice message "${step.audio}"`)
      if (step.type === 'choice') {
        if (step.options.length < 2) errors.push(`${where}: a choice needs at least two options`)
        step.options.forEach((o) => checkSteps(o.replies, where))
      }
      if (step.type === 'wait') checkCondition(step.until, where)
    }
  }

  chapter.apps.forEach((a) => checkCondition(a.availableAfter, `app ${a.app}`))
  for (const c of chapter.conversations) {
    checkCondition(c.availableAfter, `conversation ${c.id}`)
    if (c.thread && !findConversation(c.thread)) errors.push(`conversation ${c.id}: unknown thread "${c.thread}"`)
    checkSteps([...(c.history ?? []), ...c.steps], `conversation ${c.id}`)
  }
  chapter.emails?.forEach((e) => checkCondition(e.availableAfter, `email ${e.id}`))
  for (const p of chapter.pages ?? []) {
    checkCondition(p.availableAfter, `page ${p.id}`)
    if (p.kind === 'login') checkCondition({ type: 'puzzleSolved', puzzle: p.puzzle }, `page ${p.id}`)
    if (p.kind === 'imageSearch') p.searches.forEach((e) => checkCondition({ type: 'photoViewed', photo: e.photo }, `page ${p.id}`))
  }
  chapter.photos.forEach((p) => checkCondition(p.availableAfter, `photo ${p.id}`))
  for (const p of chapter.puzzles) {
    checkCondition(p.availableAfter, `puzzle ${p.id}`)
    if (!/^[0-9a-f]{64}$/.test(p.answerHash)) errors.push(`puzzle ${p.id}: answerHash is not a SHA-256 hex string`)
    if ((p.kind === 'connect' || p.kind === 'timeline') && new Set(p.statements.map((s) => s.id)).size !== p.statements.length)
      errors.push(`puzzle ${p.id}: duplicate statement ids`)
    if (p.kind === 'match') {
      const ids = [...p.left, ...p.right].map((s) => s.id)
      if (new Set(ids).size !== ids.length) errors.push(`puzzle ${p.id}: duplicate match item ids`)
      if (p.right.length < p.left.length) errors.push(`puzzle ${p.id}: fewer right items than left items`)
    }
    if (p.kind === 'route') {
      const places = new Set(p.places.map((pl) => pl.id))
      if (places.size !== p.places.length) errors.push(`puzzle ${p.id}: duplicate place ids`)
      if (!places.has(p.start)) errors.push(`puzzle ${p.id}: unknown start "${p.start}"`)
      for (const road of p.roads) {
        if (!places.has(road.from) || !places.has(road.to)) errors.push(`puzzle ${p.id}: road to an unknown place`)
      }
    }
    if (p.kind === 'accusation') {
      for (const q of p.questions) {
        if (!/^[0-9a-f]{64}$/.test(q.answerHash)) errors.push(`puzzle ${p.id}: question ${q.id} has no valid hash`)
      }
    }
  }
  for (const e of chapter.evidence) {
    checkCondition(e.foundWhen, `evidence ${e.id}`)
    checkSource(e.source, `evidence ${e.id}`)
  }
  checkCondition(chapter.completedWhen, 'completedWhen')
  if (chapter.lock) checkCondition({ type: 'puzzleSolved', puzzle: chapter.lock.puzzle }, 'lock')

  return errors
}
