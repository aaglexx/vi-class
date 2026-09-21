'use client';

import { useRef } from 'react';
import { gsap, useIsomorphicLayoutEffect, reducedMotion } from '@/lib/gsap';
import s from './Marquee.module.css';

const defaultItems = [
  'Курсовые', 'Дипломные и ВКР', 'Отчёты по практике', 'УП · ПП · ПДП',
  'Научные статьи', 'Рефераты', 'Контрольные', 'Лабораторные',
  'Презентации', 'Доклады',
];

export function Marquee({ items = defaultItems }: { items?: string[] }) {
  const track = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = track.current;
    if (!el || reducedMotion()) return;

    const ctx = gsap.context(() => {
      const half = el.scrollWidth / 2;
      gsap.to(el, {
        x: -half,
        duration: half / 38,
        ease: 'none',
        repeat: -1,
        modifiers: { x: (value) => `${gsap.utils.wrap(-half, 0, parseFloat(value))}px` },
      });
    }, el);

    return () => ctx.revert();
  }, [items]);

  const row = [...items, ...items];

  return (
    <div className={s.wrap} aria-hidden="true">
      <div className={s.track} ref={track}>
        {row.map((item, i) => (
          <span className={s.item} key={`${item}-${i}`}>
            <span className={s.pill}>{item}</span>
            <span className={s.dot} />
          </span>
        ))}
      </div>
    </div>
  );
}
