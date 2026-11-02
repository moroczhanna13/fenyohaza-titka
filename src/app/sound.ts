// Sound effects and ambience generated with the Web Audio API, so no audio files are needed.
// Everything plays through one master gain, which the mute switch turns down.

import { browserStorage } from '../state/storage'
import { loadSettings, saveSettings } from '../state/settings'

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
