'use client';

import { useRef } from 'react';
import { gsap, useIsomorphicLayoutEffect, reducedMotion, EASE } from '@/lib/gsap';
import { collage } from '@/content/collage';
import { CollageObject } from './Objects';
import { Coin } from './Coin';
import s from './HeroCollage.module.css';

export function HeroCollage() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = Array.from(el.querySelectorAll<HTMLElement>('[data-item]'));
      const frame = el.querySelector<HTMLElement>('[data-frame]');
      const handles = Array.from(el.querySelectorAll<HTMLElement>('[data-handle]'));
      const cursor = el.querySelector<HTMLElement>('[data-cursor]');

      if (reducedMotion()) {
        gsap.set([...items, frame, cursor], { opacity: 1, y: 0, scale: 1 });
        items.forEach((item) => gsap.set(item, { rotate: Number(item.dataset.rotate) }));
        return;
      }

      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        items,
        { opacity: 0, y: 54, scale: 0.86, rotate: 0 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: (i: number) => Number(items[i].dataset.rotate),
          duration: 1,
          stagger: 0.09,
          ease: 'back.out(1.5)',
        },
      )
        .fromTo(
          frame,
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 0.6, ease: EASE.soft },
          '-=0.45',
        )
        .fromTo(
          cursor,
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' },
          '-=0.35',
        );

      // предметы медленно «дышат»
      items.forEach((item, i) => {
        gsap.to(item, {
          y: Number(item.dataset.float),
          rotate: Number(item.dataset.rotate) + (i % 2 === 0 ? 2.5 : -2.5),
          duration: 4.2 + i * 0.6,
          ease: EASE.drift,
          repeat: -1,
          yoyo: true,
          delay: 1.2 + i * 0.2,
        });
      });

      // пульс уголков выделения
      gsap.to(handles, {
        scale: 1.35,
        duration: 1.1,
        ease: EASE.drift,
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.12, from: 'random' },
      });

      // курсор чуть живёт своей жизнью
      if (cursor) {
        gsap.to(cursor, {
          x: -14,
          y: -9,
          duration: 3.4,
          ease: EASE.drift,
          repeat: -1,
          yoyo: true,
        });
      }

      // параллакс от курсора
      if (!window.matchMedia('(pointer: fine)').matches) return;
      const movers = items.map((item, i) =>
        gsap.quickTo(item, 'x', { duration: 1.1, ease: 'power2.out', overwrite: 'auto' }),
      );
      const onMove = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - 0.5;
        movers.forEach((move, i) => move(nx * (10 + i * 6)));
      };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', () => movers.forEach((move) => move(0)));
      return () => el.removeEventListener('pointermove', onMove);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div className={s.stage} ref={root}>
      {/* рамка выделения, как в графическом редакторе */}
      <div className={s.frame} data-frame aria-hidden="true">
        <span className={s.handle} data-handle style={{ top: -4, left: -4 }} />
        <span className={s.handle} data-handle style={{ top: -4, right: -4 }} />
        <span className={s.handle} data-handle style={{ bottom: -4, left: -4 }} />
        <span className={s.handle} data-handle style={{ bottom: -4, right: -4 }} />
        <span className={s.frameLabel}>учебные работы · 2026</span>
      </div>

      {collage.map((item) => (
        <div
          key={item.id}
          className={`${s.item} ${item.desktopOnly ? s.desktopOnly : ''}`}
          data-item
          data-rotate={item.rotate}
          data-float={item.float}
          style={{ left: `${item.x}%`, top: `${item.y}%`, width: `${item.width}%` }}
        >
          <span className={s.itemInner}>
            {item.image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={item.image} alt="" loading="eager" />
            ) : (
              <CollageObject name={item.object} />
            )}
          </span>
        </div>
      ))}

      <span className={s.coinSlot}>
        <Coin size={4} />
      </span>

      <span className={s.cursor} data-cursor aria-hidden="true">
        <svg viewBox="0 0 24 30" width="26" height="33">
          <path
            d="M4 3v21l5.6-4.8L13 27l3.5-1.7-3.3-7.5 6.8-.3z"
            fill="#e5241f"
            stroke="#111111"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}
