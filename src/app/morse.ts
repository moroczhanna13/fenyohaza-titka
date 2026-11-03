/** Length of one Morse unit in seconds: a dot is 1 unit, a dash 3. */
export const MORSE_UNIT = 0.13

export interface Beep {
  start: number
  length: number
}

/**
 * Turns a knock pattern (".--. .- -", letters separated by spaces, words by " / ")
 * into beeps with standard Morse timing: 1 unit between signals, 3 between
 * letters, 7 between words. Times are in seconds from the start.
 */
export function morseSchedule(pattern: string, unit = MORSE_UNIT): { beeps: Beep[]; total: number } {
  const beeps: Beep[] = []
  let t = 0
  const words = pattern.trim().split(/\s*\/\s*/)
  words.forEach((word, wi) => {
    if (wi > 0) t += 7 * unit
    word
      .split(/\s+/)
      .filter(Boolean)
      .forEach((letter, li) => {
        if (li > 0) t += 3 * unit
        ;[...letter].forEach((signal, si) => {
          if (si > 0) t += unit
          const length = (signal === '-' ? 3 : 1) * unit
          beeps.push({ start: t, length })
          t += length
        })
      })
  })
  return { beeps, total: t }
}

/** Layout of a voice message: murmur, the knock pattern, a pause, the pattern again, murmur. */
export const VOICE_INTRO = 3
export const VOICE_PAUSE = 1.5
export const VOICE_OUTRO = 2.5

export function voiceMessageSeconds(knocks: string): number {
  const { total } = morseSchedule(knocks)
  return VOICE_INTRO + total + VOICE_PAUSE + total + VOICE_OUTRO
}

/** 20.3 → "0:20" */
export function formatSeconds(seconds: number): string {
  const s = Math.round(seconds)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}
