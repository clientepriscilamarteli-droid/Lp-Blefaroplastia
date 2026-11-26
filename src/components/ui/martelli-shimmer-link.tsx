import type { ReactNode } from 'react'

/** Adapted from the ShimmerButton code published on https://21st.dev/.
 * Anchor semantics preserve ordinary navigation and keyboard behavior.
 */
export function MartelliShimmerLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  const external = href.startsWith('https:')
  return <a href={href} className={'martelli-action' + (secondary ? ' secondary' : '')} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
    {!secondary && <span className="shimmer-ring" aria-hidden="true"/>}<span>{children}</span><span className="action-arrow" aria-hidden="true">{secondary ? '↓' : '↗'}</span>
  </a>
}
