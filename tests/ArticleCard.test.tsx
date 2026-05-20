import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))
vi.mock('next/image', () => ({
  default: ({ alt, ...p }: { alt: string; [k: string]: unknown }) => (
    <img alt={alt} {...(p as object)} />
  ),
}))
vi.mock('@/lib/sanity/image', () => ({
  urlFor: () => ({ width: () => ({ height: () => ({ url: () => '/img.jpg' }) }) }),
}))

import ArticleCard from '@/components/cards/ArticleCard'

const mockArticle = {
  _id: '1',
  title: { fr: 'Tokyo en 48h', en: 'Tokyo in 48h' },
  slug: { current: 'tokyo-48h' },
  pillar: 'voyage' as const,
  tags: ['japon', 'asie'],
  publishedAt: '2024-03-15T00:00:00Z',
  coverImage: { asset: { _ref: 'img123' } },
  excerpt: { fr: 'Un weekend parfait à Tokyo.', en: 'A perfect weekend in Tokyo.' },
}

describe('ArticleCard', () => {
  it('renders article title in French', () => {
    render(<ArticleCard article={mockArticle} locale="fr" />)
    expect(screen.getByText('Tokyo en 48h')).toBeInTheDocument()
  })
  it('renders article title in English', () => {
    render(<ArticleCard article={mockArticle} locale="en" />)
    expect(screen.getByText('Tokyo in 48h')).toBeInTheDocument()
  })
  it('renders pillar label', () => {
    render(<ArticleCard article={mockArticle} locale="fr" />)
    expect(screen.getByText('voyage')).toBeInTheDocument()
  })
  it('links to correct pillar/slug URL', () => {
    render(<ArticleCard article={mockArticle} locale="fr" />)
    const link = screen.getAllByRole('link')[0]
    expect(link.getAttribute('href')).toBe('/fr/voyage/tokyo-48h')
  })
})
