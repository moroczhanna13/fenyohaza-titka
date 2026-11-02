import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import HintPanel from './HintPanel'
import type { Hints } from '../story/types'

const hints: Hints = ['gyenge', 'közepes', 'erős']
const render = (opened: number) =>
  renderToStaticMarkup(<HintPanel hints={hints} opened={opened} onOpenNext={() => {}} />)

describe('HintPanel', () => {
  it('shows no hint text until one is opened', () => {
    const html = render(0)
    expect(html).not.toContain('gyenge')
    expect(html).toContain('Tipp kérése (0/3)')
  })

  it('shows opened hints in order and offers the next one', () => {
    const html = render(2)
    expect(html.indexOf('gyenge')).toBeLessThan(html.indexOf('közepes'))
    expect(html).not.toContain('erős')
    expect(html).toContain('Következő tipp (2/3)')
  })

  it('hides the button once all hints are open', () => {
    expect(render(3)).not.toContain('<button')
  })
})
