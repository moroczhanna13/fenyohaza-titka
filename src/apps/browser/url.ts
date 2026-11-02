import type { WebPage } from '../../story/types'

/** "https://www.Example.hu/a/" → "example.hu/a" */
export function normalizeUrl(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^[a-z]+:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/+$/, '')
}

export function findPageByUrl(pages: WebPage[], input: string): WebPage | undefined {
  const url = normalizeUrl(input)
  return pages.find((page) => normalizeUrl(page.url) === url)
}
