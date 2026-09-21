'use client';

import { useRef } from 'react';
import { gsap, useIsomorphicLayoutEffect, reducedMotion, EASE } from '@/lib/gsap';
import { steps } from '@/content/steps';
import s from './StepsFlow.module.css';

export function StepsFlow({ detailed = false }: { detailed?: boolean }) {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = Array.from(el.querySelectorAll<HTMLElement>('[data-step]'));
      const line = el.querySelector<HTMLElement>('[data-line]');

      if (reducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0 });
        if (line) gsap.set(line, { scaleX: 1, scaleY: 1 });
        return;
      }

      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0, scaleY: 0 },
          {
            scaleX: 1,
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 72%', end: 'bottom 72%', scrub: 0.6 },
          },
        );
      }

      gsap.fromTo(
        items,
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: EASE.soft,
          scrollTrigger: { trigger: el, start: 'top 78%', once: true },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [detailed]);

  return (
    <div ref={root} className={`${s.wrap} ${detailed ? s.detailed : ''}`}>
      <span className={s.lineBase} aria-hidden="true" />
      <span className={s.line} data-line aria-hidden="true" />

      <ol className={s.list}>
        {steps.map((step) => (
          <li className={s.item} key={step.number} data-step>
            <span className={s.num}>{step.number}</span>
            <h3 className={s.title}>{step.title}</h3>
            <p className={s.text}>{step.text}</p>
            {detailed && <p className={s.detail}>{step.detail}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}
