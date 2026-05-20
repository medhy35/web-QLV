import type { TocHeading } from '@/components/article/TableOfContents'

type PortableBlock = {
  _type: string
  style?: string
  _key: string
  children?: { text?: string }[]
}

/**
 * Extrait les titres h2/h3 d'un body Portable Text pour le TOC.
 * Utilise _key comme id pour que le scroll-spy cible l'élément DOM.
 */
export function extractHeadings(blocks: PortableBlock[]): TocHeading[] {
  return blocks
    .filter((b) => b._type === 'block' && (b.style === 'h2' || b.style === 'h3'))
    .map((b) => ({
      id: b._key,
      text: b.children?.map((c) => c.text ?? '').join('') ?? '',
      level: (b.style === 'h2' ? 2 : 3) as 2 | 3,
    }))
}
