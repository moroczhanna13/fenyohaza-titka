const dateTime = new Intl.DateTimeFormat('hu-HU', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})
const monthYear = new Intl.DateTimeFormat('hu-HU', { year: 'numeric', month: 'long' })

/** "2026-09-14T21:12" (local time) → "2026. szeptember 14. 21:12" */
export function formatTakenAt(iso: string): string {
  return dateTime.format(new Date(iso))
}

/** "2026-09-14T21:12" → "2026. szeptember" */
export function formatMonth(iso: string): string {
  return monthYear.format(new Date(iso))
}

/** 46.9132, 17.8915 → "46,9132° É, 17,8915° K" */
export function formatCoordinates({ lat, lon }: { lat: number; lon: number }): string {
  const n = (v: number) => Math.abs(v).toLocaleString('hu-HU', { minimumFractionDigits: 4 })
  return `${n(lat)}° ${lat >= 0 ? 'É' : 'D'}, ${n(lon)}° ${lon >= 0 ? 'K' : 'Ny'}`
}

export function photoUrl(src: string): string {
  return `${import.meta.env.BASE_URL}${src}`
}
