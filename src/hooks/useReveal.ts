'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect, reducedMotion, EASE } from '@/lib/gsap';

type Options = {
  /** сдвиг по вертикали, px */
  y?: number;
  /** задержка старта, сек */
  delay?: number;
  /** анимировать детей по очереди: селектор внутри контейнера */
  children?: string;
  /** шаг между детьми, сек */
  stagger?: number;
  /** момент старта относительно вьюпорта */
  start?: string;
};

/**
 * Появление блока при скролле. Одна логика на весь сайт —
 * поэтому анимации выглядят как одна система, а не как набор эффектов.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  y = 26,
  delay = 0,
  children,
  stagger = 0.08,
  start = 'top 82%',
}: Options = {}) {
  const ref = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion()) {
      gsap.set(children ? el.querySelectorAll(children) : el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const targets = children
        ? Array.from(el.querySelectorAll<HTMLElement>(children))
        : [el];
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          delay,
          ease: EASE.soft,
          stagger: children ? stagger : 0,
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [y, delay, children, stagger, start]);

  return ref;
}
