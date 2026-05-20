import { describe, it, expect } from 'vitest'
import fs from 'fs'

describe('design tokens', () => {
  const css = fs.readFileSync('app/globals.css', 'utf-8')

  it('defines dark background token', () => {
    expect(css).toContain('--color-dark: #0d0b09')
  })
  it('defines gold accent token', () => {
    expect(css).toContain('--color-gold: #c9a96e')
  })
  it('defines cream background token', () => {
    expect(css).toContain('--color-cream: #faf9f6')
  })
})
