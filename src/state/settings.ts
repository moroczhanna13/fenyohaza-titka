/** Player preferences, kept apart from the save so "Új játék" does not reset them. */
export interface Settings {
  muted: boolean
}

export const SETTINGS_KEY = 'fenyohaza-titka:settings'

const DEFAULTS: Settings = { muted: false }

type KeyValueStorage = Pick<Storage, 'getItem' | 'setItem'>

export function loadSettings(storage: KeyValueStorage | null): Settings {
  try {
    const parsed: unknown = JSON.parse(storage?.getItem(SETTINGS_KEY) ?? 'null')
    if (typeof parsed === 'object' && parsed !== null && typeof (parsed as Settings).muted === 'boolean') {
      return { ...DEFAULTS, muted: (parsed as Settings).muted }
    }
  } catch {
    // Fall through to defaults.
  }
  return { ...DEFAULTS }
}

export function saveSettings(storage: KeyValueStorage | null, settings: Settings): void {
  try {
    storage?.setItem(SETTINGS_KEY, JSON.stringify(settings))
  } catch {
    // Storage blocked or full: the setting just lasts for this session.
  }
}
