import { describe, expect, it } from 'vitest'
import { loadSettings, saveSettings, SETTINGS_KEY } from './settings'

function memoryStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial))
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
  }
}

describe('settings', () => {
  it('defaults to sound on', () => {
    expect(loadSettings(memoryStorage())).toEqual({ muted: false })
    expect(loadSettings(null)).toEqual({ muted: false })
    expect(loadSettings(memoryStorage({ [SETTINGS_KEY]: '{rossz' }))).toEqual({ muted: false })
  })

  it('remembers muting', () => {
    const storage = memoryStorage()
    saveSettings(storage, { muted: true })
    expect(loadSettings(storage)).toEqual({ muted: true })
  })
})
