import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { CHAPTERS } from '../story/chapters'
import type { LoginPage, SocialHomePage, SocialPage, WebPage } from '../story/types'
import { createInitialState, gameReducer } from '../state/gameState'
import ContactsApp from './contacts/ContactsApp'
import EmailApp from './email/EmailApp'
import NotebookApp from './notebook/NotebookApp'
import LoginPageView from './browser/LoginPageView'
import SocialHomeView from './browser/SocialHomeView'
import SocialPageView from './browser/SocialPageView'

const noop = () => {}
const unlocked = gameReducer(createInitialState(), { type: 'solvePuzzle', puzzle: 'ch1-lock' })
const pages: WebPage[] = CHAPTERS.flatMap((c) => c.pages ?? [])
const page = (id: string) => pages.find((p) => p.id === id)!

describe('new screens render', () => {
  it('lists the known people in the Contacts app', () => {
    const html = renderToStaticMarkup(<ContactsApp game={unlocked} onClose={noop} />)
    expect(html).toContain('Berényi Gedeon')
    expect(html).toContain('Ismeretlen szám')
  })

  it("shows Gedeon's notes in the notebook", () => {
    const html = renderToStaticMarkup(<NotebookApp game={unlocked} dispatch={noop} onClose={noop} />)
    expect(html).toContain('Gedeon jegyzetei')
  })

  it('shows mail folders, starting with the inbox', () => {
    const html = renderToStaticMarkup(<EmailApp game={unlocked} dispatch={noop} onClose={noop} />)
    expect(html).toContain('Beérkezett levelek')
    expect(html).toContain('Spam')
    expect(html).not.toContain('Nyereményközpont')
  })

  it('renders a social profile with posts and comments', () => {
    const html = renderToStaticMarkup(<SocialPageView page={page('ch3-group') as SocialPage} dispatch={noop} />)
    expect(html).toContain('Régi fenyőházi fesztiválok')
    expect(html).toContain('Kiss Jolán')
  })

  it('lists groups and businesses, but not people, on the social home page', () => {
    const html = renderToStaticMarkup(
      <SocialHomeView page={page('ch3-szomszedok') as SocialHomePage} pages={pages} dispatch={noop} onNavigate={noop} />,
    )
    expect(html).toContain('Pásztor Söröző')
    expect(html).not.toContain('Vidor Ilona')
  })

  it('starts the pharmacy login with a user list, not a filled-in user name', () => {
    const html = renderToStaticMarkup(
      <LoginPageView page={page('ch4-pharmacy') as LoginPage} game={unlocked} dispatch={noop} />,
    )
    expect(html).toContain('Válassz felhasználót')
    expect(html).toContain('Kovács Zsófia')
    expect(html).not.toContain('Kiadási napló')
  })
})
