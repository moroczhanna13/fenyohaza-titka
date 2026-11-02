import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import PhoneFrame from './PhoneFrame'

describe('PhoneFrame', () => {
  it('renders its children inside the screen with a clock in the status bar', () => {
    const html = renderToStaticMarkup(
      <PhoneFrame>
        <p>tartalom</p>
      </PhoneFrame>,
    )
    expect(html).toContain('<p>tartalom</p>')
    expect(html).toMatch(/<time datetime="[^"]+">\d{2}:\d{2}<\/time>/i)
  })
})
