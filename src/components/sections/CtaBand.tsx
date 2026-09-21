'use client';

import { useRef } from 'react';
import { gsap, useIsomorphicLayoutEffect, reducedMotion, EASE } from '@/lib/gsap';
import { ButtonLink } from '@/components/ui/Button';
import { cta, primaryContact } from '@/content/site';
import { Icon } from '@/components/icons/Icon';
import s from './CtaBand.module.css';

type Props = {
  title?: string;
  text?: string;
};

export function CtaBand({
  title = 'Нужна работа под ключ?',
  text = 'Пришлите тему, срок и методичку — посчитаем стоимость и скажем, успеваем ли. Расчёт бесплатный и ни к чему не обязывает.',
}: Props) {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (reducedMotion()) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        el,
        { opacity: 0, y: 40, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: EASE.soft,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      );

      gsap.to(el.querySelector('[data-cta-glow]'), {
        xPercent: 12,
        yPercent: -10,
        scale: 1.15,
        duration: 14,
        ease: EASE.drift,
        repeat: -1,
        yoyo: true,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={s.band} data-band>
      <span className={s.glow} data-cta-glow aria-hidden="true" />
      <div className={s.content}>
        <h2 className={s.title}>{title}</h2>
        <p className={s.text}>{text}</p>
        <div className={s.actions}>
          <ButtonLink href={cta.primary.href} size="lg" variant="secondary" withArrow>
            {cta.primary.label}
          </ButtonLink>
          <a className={s.messenger} href={primaryContact.href} target="_blank" rel="noreferrer">
            <Icon name="telegram" size={19} />
            Написать в {primaryContact.label}
          </a>
        </div>
      </div>
    </div>
  );
}
