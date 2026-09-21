'use client';

import { useRef } from 'react';
import { gsap, useIsomorphicLayoutEffect, reducedMotion, EASE } from '@/lib/gsap';
import { ButtonLink } from '@/components/ui/Button';
import { cta, trustPoints } from '@/content/site';
import { GlowField } from './GlowField';
import { HeroCollage } from './HeroCollage';
import s from './Hero.module.css';

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const bubbles = Array.from(el.querySelectorAll<HTMLElement>('[data-bubble]'));
      const words = Array.from(el.querySelectorAll<HTMLElement>('[data-word]'));
      const fades = Array.from(el.querySelectorAll<HTMLElement>('[data-hero-fade]'));

      if (reducedMotion()) {
        gsap.set([...bubbles, ...words, ...fades], { opacity: 1, y: 0, yPercent: 0, scale: 1 });
        return;
      }

      const tl = gsap.timeline({ delay: 0.12 });

      tl.fromTo(
        bubbles,
        { opacity: 0, y: 16, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.6)' },
      )
        .fromTo(
          words,
          { yPercent: 112 },
          { yPercent: 0, duration: 1.15, stagger: 0.07, ease: 'power4.out' },
          '-=0.4',
        )
        .fromTo(
          fades,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: EASE.soft },
          '-=0.75',
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={s.hero}>
      <GlowField />

      <div className={`container ${s.inner}`}>
        <div className={s.top}>
          <span className="eyebrow">Курсовые · Дипломы · Практика · Статьи</span>

          <div className={s.bubbles}>
            <p className={`${s.bubble} ${s.bubbleLight}`} data-bubble>
              (пишите в Telegram, VK или WhatsApp — как удобнее)
            </p>
            <p className={`${s.bubble} ${s.bubbleBlue}`} data-bubble>
              Пришлите тему и срок — посчитаем стоимость и возьмём работу на себя
            </p>
          </div>
        </div>

        <div className={s.middle}>
          <div className={s.visual} data-hero-fade>
            <HeroCollage />
          </div>

          <div className={s.ctaFloat} data-hero-fade>
            <ButtonLink href={cta.primary.href} size="lg" className={s.ctaBtn}>
              {cta.primary.label}
              <span className={s.plus} aria-hidden="true">+</span>
            </ButtonLink>

          </div>
        </div>

        <h1 className={s.title}>
          <span className={s.mask}><span data-word>Работы</span></span>
          <span className={s.mask}><span data-word>под ключ</span></span>
        </h1>

        <div className={s.bottom}>
          <p className={s.sub} data-hero-fade>
            Курсовые, дипломные и ВКР, отчёты по практике, статьи, рефераты
            и презентации. Пишем сами, цену фиксируем до начала, правки до
            защиты — без доплат.
          </p>

          <div className={s.actions} data-hero-fade>
            <ButtonLink href={cta.secondary.href} variant="secondary" withArrow>
              {cta.secondary.label}
            </ButtonLink>
          </div>
        </div>

        <ul className={s.trust} data-hero-fade>
          {trustPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
