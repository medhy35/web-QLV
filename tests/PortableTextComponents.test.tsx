import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next/image', () => ({
  default: ({ alt, ...p }: { alt: string; [k: string]: unknown }) => (
    <img alt={alt} {...(p as object)} />
  ),
}))
vi.mock('@/lib/sanity/image', () => ({
  urlFor: () => ({ width: () => ({ url: () => '/img.jpg' }) }),
}))

import { components } from '@/components/article/PortableTextComponents'

describe('PortableTextComponents', () => {
  it('exports a components object', () => {
    expect(components).toBeDefined()
    expect(typeof components).toBe('object')
  })
  it('has types for all custom blocks', () => {
    expect(components.types).toBeDefined()
    expect(components.types!.affiliateBlock).toBeDefined()
    expect(components.types!.pullQuote).toBeDefined()
    expect(components.types!.practicalBox).toBeDefined()
  })
  it('renders pullQuote with quote text', () => {
    const PullQuote = components.types!.pullQuote as React.FC<{ value: { quote: string } }>
    render(<PullQuote value={{ quote: 'Une belle citation de voyage.' }} />)
    expect(screen.getByText('Une belle citation de voyage.')).toBeInTheDocument()
  })
  it('renders practicalBox with title', () => {
    const PracticalBox = components.types!.practicalBox as React.FC<{
      value: { title: string; content: [] }
    }>
    render(<PracticalBox value={{ title: 'Infos pratiques', content: [] }} />)
    expect(screen.getByText('Infos pratiques')).toBeInTheDocument()
  })
})
