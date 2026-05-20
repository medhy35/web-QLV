import { describe, it, expect } from 'vitest'
import {
  HOMEPAGE_QUERY,
  ARTICLES_QUERY,
  ARTICLE_QUERY,
  REELS_QUERY,
  AFFILIATE_QUERY,
} from '@/lib/sanity/queries'

describe('GROQ queries', () => {
  it('HOMEPAGE_QUERY is a non-empty string', () => {
    expect(typeof HOMEPAGE_QUERY).toBe('string')
    expect(HOMEPAGE_QUERY.length).toBeGreaterThan(10)
  })
  it('ARTICLES_QUERY accepts pillar parameter', () => {
    expect(ARTICLES_QUERY).toContain('pillar')
  })
  it('ARTICLE_QUERY fetches by slug', () => {
    expect(ARTICLE_QUERY).toContain('slug.current')
  })
  it('REELS_QUERY fetches reels', () => {
    expect(REELS_QUERY).toContain('reel')
  })
  it('AFFILIATE_QUERY fetches affiliateItems', () => {
    expect(AFFILIATE_QUERY).toContain('affiliateItem')
  })
})
