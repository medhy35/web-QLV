import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}))

// Mock @/lib/sanity/image
vi.mock('@/lib/sanity/image', () => ({
  urlFor: () => ({
    width: () => ({ height: () => ({ fit: () => ({ url: () => 'https://cdn.sanity.io/thumb.jpg' }) }) }),
  }),
}))

import ReelCard, { type ReelItem } from '@/components/reels/ReelCard'

const reel: ReelItem = {
  _id: 'r1',
  title: 'Test Reel Paris',
  instagramUrl: 'https://www.instagram.com/reel/ABC123/',
  account: '@QueleVentre',
  thumbnail: null,
  views: 12500,
  likes: 843,
}

describe('ReelCard', () => {
  it('renders the reel title', () => {
    render(<ReelCard reel={reel} onClick={vi.fn()} />)
    expect(screen.getByText('Test Reel Paris')).toBeInTheDocument()
  })

  it('renders the account badge', () => {
    render(<ReelCard reel={reel} onClick={vi.fn()} />)
    expect(screen.getByText('@QueleVentre')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<ReelCard reel={reel} onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledWith(reel)
  })

  it('formats view count correctly', () => {
    render(<ReelCard reel={reel} onClick={vi.fn()} />)
    expect(screen.getByText('13k')).toBeInTheDocument()
  })
})
