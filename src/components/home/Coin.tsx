'use client';

import { useRef } from 'react';
import { gsap, useIsomorphicLayoutEffect, reducedMotion } from '@/lib/gsap';
import s from './Coin.module.css';

/** пиксельная монетка: '.' — прозрачно, k — контур, y — золото, l — блик, o — тень */
const rows = [
  '......kkkk......',
  '....kkyyyykk....',
  '...kyllyyyyyk...',
  '..kyllyyyyyyyk..',
  '.kyllyyyooyyyyk.',
  '.kylyyyyooyyyyk.',
  'kyyyyyooooooyyyk',
  'kyyyyyooooooyyyk',
  'kyyyyyyooyyyyyyk',
  'kyyyyyyooyyyyyyk',
  '.kyyyyyyyyyyyyk.',
  '.kyyyyyyyyyyook.',
  '..kyyyyyyyyook..',
  '...kyyyyyyook...',
  '....kkyyyykk....',
  '......kkkk......',
];

const palette: Record<string, string> = {
  k: '#1a1206',
  y: '#f5b301',
  l: '#ffe07a',
  o: '#c07c06',
};

export function Coin({ size = 4 }: { size?: number }) {
  const root = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;

    const ctx = gsap.context(() => {
      const sprite = el.querySelector('svg');
      if (!sprite) return;

      gsap.set(sprite, { transformOrigin: '50% 100%' });

      // прыг-скок: подлёт, растяжение в полёте, сплющивание при приземлении
      gsap
        .timeline({ repeat: -1, repeatDelay: 0.5 })
        .to(sprite, { y: -34, duration: 0.42, ease: 'power2.out' })
        .to(sprite, { scaleY: 1.12, scaleX: 0.92, duration: 0.2, ease: 'sine.out' }, 0)
        .to(sprite, { scaleY: 1, scaleX: 1, duration: 0.22, ease: 'sine.in' }, 0.2)
        .to(sprite, { y: 0, duration: 0.34, ease: 'power2.in' })
        .to(sprite, { scaleY: 0.82, scaleX: 1.18, duration: 0.09, ease: 'power2.out' })
        .to(sprite, { scaleY: 1, scaleX: 1, duration: 0.45, ease: 'elastic.out(1, 0.35)' })
        .to(sprite, { rotate: 0, duration: 0.01 });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <span className={s.coin} ref={root} aria-hidden="true">
      <svg
        viewBox="0 0 16 16"
        width={16 * size}
        height={16 * size}
        shapeRendering="crispEdges"
      >
        {rows.flatMap((row, y) =>
          row.split('').map((char, x) =>
            palette[char] ? (
              <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={palette[char]} />
            ) : null,
          ),
        )}
      </svg>
    </span>
  );
}
