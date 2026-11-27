import type { RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/** The institutional site's scroll rhythm, scoped to each landing page. */
export function useInstitutionalMotion(root: RefObject<HTMLDivElement | null>, page: 'bleph' | 'toxina') {
  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const element = root.current
      if (!element) return
      const listeners = new AbortController()
      const reveal = (block: HTMLElement, targets: gsap.TweenTarget) => {
        const timeline = gsap.timeline({ scrollTrigger: {
          trigger: block, start: 'top 92%', end: 'top 62%', scrub: .25, once: true,
        } }).from(targets, { y: 42, opacity: 0, duration: .65, stagger: .16, ease: 'power2.out' })
        // Keyboard navigation must never land on an invisible control.
        block.addEventListener('focusin', () => {
          timeline.scrollTrigger?.kill(false, true)
          timeline.progress(1).pause()
        }, { signal: listeners.signal })
      }

      if (page === 'bleph') {
        gsap.from(element.querySelectorAll('.bleph-static-copy > *'), {
          y: 28, opacity: 0, duration: 1.1, stagger: .12, ease: 'power2.out', clearProps: 'transform,opacity',
        })
      }
      const photos = '.concern-photo, .bleph-treatment-photo, .bleph-gentle-process > figure, .doctor-portrait'
      element.querySelectorAll<HTMLElement>(photos).forEach(photo => {
        const image = photo.querySelector('img')
        if (!image) return
        gsap.timeline({ scrollTrigger: {
          trigger: photo, start: 'top 94%', end: 'top 58%', scrub: .25, once: true,
        } })
          .fromTo(photo, { clipPath: 'inset(0% 0% 100% 0% round 8px)' }, {
            clipPath: 'inset(0% 0% 0% 0% round 8px)', clearProps: 'clipPath', duration: 1, ease: 'none',
          }, 0)
          .from(image, { scale: 1.12, duration: 1, ease: 'power2.out', clearProps: 'transform' }, 0)
      })
      const blocks = page === 'bleph'
        ? '.bleph-manifesto-copy, .concern-copy, .bleph-treatment-grid > div, .bleph-planning-heading, .martelli-media-accordion, .bleph-planning > .bleph-actions, .bleph-gentle-process > div, .doctor-copy, .bleph-journey .section-heading, .treatment-timeline > li, .bleph-journey .bleph-actions, .faq > div, .final-grid > *, .footer'
        : '.reveal:not(.concern-photo):not(.doctor-portrait), .final-grid > *, .footer'
      element.querySelectorAll<HTMLElement>(blocks).forEach(block => {
        const staggerCopy = block.matches('.bleph-manifesto-copy, .concern-copy, .bleph-treatment-grid > div, .bleph-gentle-process > div, .doctor-copy')
        reveal(block, staggerCopy ? block.children : block)
      })
      const refresh = () => ScrollTrigger.refresh()
      document.fonts.addEventListener('loadingdone', refresh, { signal: listeners.signal })
      element.querySelectorAll('img').forEach(image => {
        if (!image.complete) image.addEventListener('load', refresh, { once: true, signal: listeners.signal })
      })
      return () => listeners.abort()
    }, root)
    return () => media.revert()
  }, { scope: root })
}
