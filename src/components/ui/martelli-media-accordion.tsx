import { useId, useState } from 'react'

/** Adapted from Shadcn Space's Media Accordion (MIT), listed on 21st.dev.
 * Source: https://shadcnspace.com/r/accordion-05.json
 * Copyright (c) 2026 Shadcn Space.
 * Replaces the registry primitives with native accessible React controls.
 */
export interface MediaItem { title: string; content: string; media: string; alt: string }
export function MartelliMediaAccordion({ items }: { items: MediaItem[] }) {
  const [active, setActive] = useState(0)
  const id = useId()
  return <div className="martelli-media-accordion">
    <figure className="media-accordion-photo"><img src={items[active].media} alt={items[active].alt} loading="lazy"/><figcaption><span>0{active + 1}</span><span>{items[active].title}</span></figcaption></figure>
    <div className="media-accordion-items">{items.map((item, index) => <article key={item.title} data-open={index === active}>
      <h3><button type="button" id={`${id}-trigger-${index}`} aria-expanded={index === active} aria-controls={`${id}-panel-${index}`} onClick={() => setActive(index)}><span className="media-accordion-number">0{index + 1}</span><span>{item.title}</span><span className="media-accordion-plus" aria-hidden="true">{index === active ? '−' : '+'}</span></button></h3>
      <div id={`${id}-panel-${index}`} role="region" aria-labelledby={`${id}-trigger-${index}`} hidden={index !== active}><p>{item.content}</p></div>
    </article>)}</div>
  </div>
}
