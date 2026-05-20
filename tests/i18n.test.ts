import { describe, it, expect } from 'vitest'
import fr from '@/messages/fr.json'
import en from '@/messages/en.json'

describe('i18n messages', () => {
  it('fr has all required navigation keys', () => {
    expect(fr.nav.voyage).toBeDefined()
    expect(fr.nav.food).toBeDefined()
    expect(fr.nav.reels).toBeDefined()
    expect(fr.nav.bonsPlan).toBeDefined()
    expect(fr.nav.about).toBeDefined()
  })
  it('en has same top-level keys as fr', () => {
    expect(Object.keys(en.nav)).toEqual(Object.keys(fr.nav))
  })
  it('fr has newsletter section', () => {
    expect(fr.newsletter.title).toBeDefined()
    expect(fr.newsletter.placeholder).toBeDefined()
    expect(fr.newsletter.cta).toBeDefined()
  })
})
