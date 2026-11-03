// Sound effects and ambience generated with the Web Audio API, so no audio files are needed.
// Everything plays through one master gain, which the mute switch turns down.

import { browserStorage } from '../state/storage'
import { loadSettings, saveSettings } from '../state/settings'
import { morseSchedule, VOICE_INTRO, VOICE_OUTRO, VOICE_PAUSE, voiceMessageSeconds } from './morse'

let context: AudioContext | null = null
let master: GainNode | null = null
let ambienceStarted = false
let muted = loadSettings(browserStorage()).muted

function audio(): { ctx: AudioContext; out: GainNode } | null {
  try {
    if (!context) {
      context = new AudioContext()
      master = context.createGain()
      master.gain.value = muted ? 0 : 1
      master.connect(context.destination)
    }
    // Browsers start the context suspended until the first user gesture.
    if (context.state === 'suspended') void context.resume()
    return { ctx: context, out: master! }
  } catch {
    return null
  }
}

export function isMuted(): boolean {
  return muted
}

export function setMuted(value: boolean) {
  muted = value
  saveSettings(browserStorage(), { muted })
  if (context && master) master.gain.setTargetAtTime(muted ? 0 : 1, context.currentTime, 0.05)
}

function tone(frequency: number, start: number, duration: number, volume: number) {
  const a = audio()
  if (!a) return
  const oscillator = a.ctx.createOscillator()
  const gain = a.ctx.createGain()
  oscillator.type = 'sine'
  oscillator.frequency.value = frequency
  gain.gain.setValueAtTime(0, start)
  gain.gain.linearRampToValueAtTime(volume, start + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  oscillator.connect(gain).connect(a.out)
  oscillator.start(start)
  oscillator.stop(start + duration)
}

/** Two quick rising notes for an incoming message. */
export function playMessageSound() {
  const a = audio()
  if (!a) return
  const now = a.ctx.currentTime
  tone(880, now, 0.12, 0.15)
  tone(1320, now + 0.09, 0.18, 0.12)
}

/** A short rising major arpeggio for a solved puzzle. */
export function playSuccessSound() {
  const a = audio()
  if (!a) return
  const now = a.ctx.currentTime
  ;[523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, now + i * 0.08, 0.35, 0.12))
}

/**
 * Faint radio static in the background: looping white noise through a band-pass
 * filter, with a slow wobble in volume. Must be started from a user gesture.
 */
export function startAmbience() {
  if (ambienceStarted) return
  const a = audio()
  if (!a) return
  ambienceStarted = true
  const { ctx, out } = a

  const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1

  const noise = ctx.createBufferSource()
  noise.buffer = buffer
  noise.loop = true

  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 1800
  filter.Q.value = 0.7

  const level = ctx.createGain()
  level.gain.value = 0.012

  const wobble = ctx.createOscillator()
  wobble.frequency.value = 0.15
  const wobbleDepth = ctx.createGain()
  wobbleDepth.gain.value = 0.005
  wobble.connect(wobbleDepth).connect(level.gain)

  noise.connect(filter).connect(level).connect(out)
  noise.start()
  wobble.start()
}

/**
 * Plays a voice message: crackle and muffled murmur, then the knock pattern
 * twice as beeps. Returns a function that stops it, or null without audio.
 */
export function playVoiceMessage(knocks: string, onEnd: () => void): (() => void) | null {
  const a = audio()
  if (!a) return null
  const { ctx, out } = a
  const { beeps, total: patternLength } = morseSchedule(knocks)
  const intro = VOICE_INTRO
  const pause = VOICE_PAUSE
  const outro = VOICE_OUTRO
  const total = voiceMessageSeconds(knocks)
  const now = ctx.currentTime + 0.05
  const sources: AudioScheduledSourceNode[] = []

  const noise = (seconds: number) => {
    const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * seconds), ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
    const source = ctx.createBufferSource()
    source.buffer = buffer
    sources.push(source)
    return source
  }

  // Crackle under the whole recording.
  const crackle = noise(total)
  const crackleFilter = ctx.createBiquadFilter()
  crackleFilter.type = 'highpass'
  crackleFilter.frequency.value = 2500
  const crackleGain = ctx.createGain()
  crackleGain.gain.value = 0.03
  crackle.connect(crackleFilter).connect(crackleGain).connect(out)
  crackle.start(now)

  // Muffled "speech": band-passed noise with a choppy volume, before and after the knocks.
  const murmur = (from: number, seconds: number) => {
    const source = noise(seconds)
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 450
    filter.Q.value = 1.8
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, from)
    for (let t = 0; t < seconds; t += 0.18) {
      gain.gain.linearRampToValueAtTime(Math.random() < 0.7 ? 0.25 + Math.random() * 0.25 : 0.02, from + t)
    }
    gain.gain.linearRampToValueAtTime(0, from + seconds)
    source.connect(filter).connect(gain).connect(out)
    source.start(from)
  }
  murmur(now + 0.2, intro - 0.6)
  murmur(now + total - outro + 0.4, outro - 0.6)

  // The knocks, as short and long beeps, played twice.
  for (const offset of [intro, intro + patternLength + pause]) {
    for (const beep of beeps) {
      const osc = ctx.createOscillator()
      osc.type = 'square'
      osc.frequency.value = 620
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 1400
      const gain = ctx.createGain()
      const start = now + offset + beep.start
      gain.gain.setValueAtTime(0, start)
      gain.gain.linearRampToValueAtTime(0.06, start + 0.005)
      gain.gain.setValueAtTime(0.06, start + beep.length - 0.01)
      gain.gain.linearRampToValueAtTime(0, start + beep.length)
      osc.connect(filter).connect(gain).connect(out)
      osc.start(start)
      osc.stop(start + beep.length + 0.02)
      sources.push(osc)
    }
  }

  let stopped = false
  const timer = window.setTimeout(() => stop(), total * 1000 + 100)
  function stop() {
    if (stopped) return
    stopped = true
    window.clearTimeout(timer)
    for (const s of sources) {
      try {
        s.stop()
      } catch {
        // Already stopped.
      }
    }
    onEnd()
  }
  return stop
}
