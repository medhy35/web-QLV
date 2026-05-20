import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'fr',
}))
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))
vi.mock('next/navigation', () => ({
  usePathname: () => '/fr',
  useRouter: () => ({ push: vi.fn() }),
}))

import Nav from '@/components/layout/Nav'

describe('Nav', () => {
  it('renders navigation element', () => {
    render(<Nav />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
  it('renders locale switcher buttons', () => {
    render(<Nav />)
    expect(screen.getByText('FR')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
  })
  it('renders brand name', () => {
    render(<Nav />)
    expect(screen.getByText('WanderBite')).toBeInTheDocument()
  })
})
