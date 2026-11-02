import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import HomeScreen from './HomeScreen'
import { APPS } from '../apps/registry'

describe('HomeScreen', () => {
  const html = renderToStaticMarkup(
    <HomeScreen unlockedApps={['messages', 'gallery']} onOpenApp={() => {}} />,
  )

  it('shows an icon for every app', () => {
    for (const app of APPS) expect(html).toContain(app.label)
  })

  it('marks only the locked apps as disabled', () => {
    expect(html).toContain('aria-label="Üzenetek"')
    expect(html).toContain('aria-label="Galéria"')
    expect(html).toContain('aria-label="E-mail (zárolva)"')
    expect(html.match(/aria-disabled="true"/g)).toHaveLength(APPS.length - 2)
  })
})
