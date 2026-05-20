import { Fragment } from 'react'

/**
 * Transforme "_texte en italique doré_" en éléments React <em> stylisés.
 * Aucun HTML injecté — uniquement des nœuds React sûrs.
 */
export function parseHeadline(text: string): React.ReactNode[] {
  const parts = text.split(/(_[^_]+_)/g)
  return parts.map((part, i) => {
    if (part.startsWith('_') && part.endsWith('_')) {
      return (
        <em key={i} className="text-[#c9a96e] not-italic">
          {part.slice(1, -1)}
        </em>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}
