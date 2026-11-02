// Short sound effects generated with the Web Audio API, so no audio files are needed.

let context: AudioContext | null = null

function audio(): AudioContext | null {
  try {
    context ??= new AudioContext()
    // Browsers start the context suspended until the first user gesture.
    if (context.state === 'suspended') void context.resume()
    return context
  } catch {
    return null
  }
}

function tone(ctx: AudioContext, frequency: number, start: number, duration: number, volume: number) {
  const oscillator = ctx.createOscillator()
  const gain = ctx.createGain()
  oscillator.type = 'sine'
  oscillator.frequency.value = frequency
  gain.gain.setValueAtTime(0, start)
  gain.gain.linearRampToValueAtTime(volume, start + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  oscillator.connect(gain).connect(ctx.destination)
  oscillator.start(start)
  oscillator.stop(start + duration)
}

/** Two quick rising notes for an incoming message. */
export function playMessageSound() {
  const ctx = audio()
  if (!ctx) return
  const now = ctx.currentTime
  tone(ctx, 880, now, 0.12, 0.15)
  tone(ctx, 1320, now + 0.09, 0.18, 0.12)
}
