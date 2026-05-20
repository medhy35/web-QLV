import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeAll } from 'vitest'

vi.mock('next-intl', () => ({
  useTranslations: () => (k: string) => k,
}))

// IntersectionObserver non disponible en jsdom
beforeAll(() => {
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
})

import TableOfContents from '@/components/article/TableOfContents'

const headings = [
  { id: 'intro', text: 'Introduction', level: 2 as const },
  { id: 'jour-1', text: 'Jour 1 — Arrivée', level: 2 as const },
  { id: 'le-matin', text: 'Le matin', level: 3 as const },
]

describe('TableOfContents', () => {
  it('renders all headings', () => {
    render(<TableOfContents headings={headings} />)
    expect(screen.getByText('Introduction')).toBeInTheDocument()
    expect(screen.getByText('Jour 1 — Arrivée')).toBeInTheDocument()
    expect(screen.getByText('Le matin')).toBeInTheDocument()
  })
  it('renders anchor links with correct hrefs', () => {
    render(<TableOfContents headings={headings} />)
    const links = screen.getAllByRole('link')
    expect(links[0].getAttribute('href')).toBe('#intro')
    expect(links[1].getAttribute('href')).toBe('#jour-1')
  })
  it('renders nothing when headings is empty', () => {
    const { container } = render(<TableOfContents headings={[]} />)
    expect(container.firstChild).toBeNull()
  })
})
