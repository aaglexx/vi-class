'use client';

import { useRef, useState } from 'react';
import { gsap, reducedMotion, EASE } from '@/lib/gsap';
import { Icon } from '@/components/icons/Icon';
import type { FaqItem } from '@/content/faq';
import s from './Accordion.module.css';

export function Accordion({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const bodies = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (index: number) => {
    const next = open === index ? null : index;
    const instant = reducedMotion();

    const animate = (i: number, to: 'open' | 'close') => {
      const el = bodies.current[i];
      if (!el) return;
      gsap.killTweensOf(el);
      if (instant) {
        gsap.set(el, { height: to === 'open' ? 'auto' : 0, opacity: to === 'open' ? 1 : 0 });
        return;
      }
      if (to === 'open') {
        gsap.fromTo(
          el,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.5, ease: EASE.inOut },
        );
      } else {
        gsap.to(el, { height: 0, opacity: 0, duration: 0.38, ease: EASE.inOut });
      }
    };

    if (open !== null) animate(open, 'close');
    if (next !== null) animate(next, 'open');
    setOpen(next);
  };

  return (
    <div className={s.list}>
      {items.map((item, i) => (
        <div key={item.q} className={`${s.item} ${open === i ? s.itemOpen : ''}`}>
          <button
            className={s.head}
            onClick={() => toggle(i)}
            aria-expanded={open === i}
            aria-controls={`faq-body-${i}`}
          >
            <span className={s.q}>{item.q}</span>
            <span className={s.sign} aria-hidden="true">
              <Icon name="chevron" size={20} />
            </span>
          </button>
          <div
            id={`faq-body-${i}`}
            className={s.body}
            ref={(el) => {
              bodies.current[i] = el;
            }}
            style={open === i ? undefined : { height: 0, opacity: 0 }}
          >
            <p className={s.a}>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
