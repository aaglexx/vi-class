'use client';

import { useRef } from 'react';
import { gsap, useIsomorphicLayoutEffect, reducedMotion, EASE } from '@/lib/gsap';
import s from './GlowField.module.css';

/**
 * Живой фон первого экрана: несколько очень мягких пятен света,
 * которые медленно дышат и слегка реагируют на курсор.
 * Никакой пестроты — только пыльно-синий и тёплый песок поверх молочного фона.
 */
export function GlowField() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (reducedMotion()) return;

    const ctx = gsap.context(() => {
      const blobs = Array.from(el.querySelectorAll<HTMLElement>('[data-blob]'));

      gsap.set(blobs, { xPercent: -50, yPercent: -50 });

      // появление
      gsap.fromTo(
        blobs,
        { opacity: 0, scale: 0.72 },
        { opacity: 1, scale: 1, duration: 1.5, stagger: 0.14, ease: EASE.soft },
      );

      // бесконечный медленный дрейф — у каждого пятна свой ритм
      const drift = [
        { x: 90, y: -60, scale: 1.14, dur: 17 },
        { x: -110, y: 70, scale: 0.9, dur: 21 },
        { x: 70, y: 90, scale: 1.1, dur: 25 },
        { x: -60, y: -80, scale: 0.95, dur: 19 },
      ];

      blobs.forEach((blob, i) => {
        const d = drift[i % drift.length];
        gsap.to(blob, {
          x: d.x,
          y: d.y,
          scale: d.scale,
          duration: d.dur,
          ease: EASE.drift,
          repeat: -1,
          yoyo: true,
          delay: i * 0.6,
        });
        gsap.to(blob, {
          opacity: 0.78,
          duration: 8 + i * 2.5,
          ease: EASE.drift,
          repeat: -1,
          yoyo: true,
        });
      });

      // лёгкая реакция на курсор (только на десктопе)
      const finePointer = window.matchMedia('(pointer: fine)').matches;
      if (!finePointer) return;

      const movers = blobs.map((blob, i) =>
        gsap.quickTo(blob, i % 2 === 0 ? 'xPercent' : 'yPercent', {
          duration: 1.6,
          ease: 'power2.out',
        }),
      );

      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        movers.forEach((move, i) => {
          const strength = 10 + i * 5;
          move(-50 + (i % 2 === 0 ? nx : ny) * strength);
        });
      };

      window.addEventListener('pointermove', onMove);
      return () => window.removeEventListener('pointermove', onMove);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={s.field} aria-hidden="true">
      <span className={`${s.blob} ${s.blue}`} data-blob />
      <span className={`${s.blob} ${s.sand}`} data-blob />
      <span className={`${s.blob} ${s.mist}`} data-blob />
      <span className={`${s.blob} ${s.deep}`} data-blob />
      <span className={s.grid} />
    </div>
  );
}
