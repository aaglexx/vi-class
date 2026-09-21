'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import { gsap, reducedMotion, EASE } from '@/lib/gsap';
import { cta } from '@/content/site';
import { Icon } from '@/components/icons/Icon';
import s from './MobileCta.module.css';

/** Плавающая кнопка на мобильных: появляется, когда первый экран пролистан */
export function MobileCta() {
  const pathname = usePathname();
  const ref = useRef<HTMLAnchorElement>(null);
  const [shown, setShown] = useState(false);
  const hidden = pathname.startsWith('/zayavka');

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const visible = shown && !hidden;
    if (reducedMotion()) {
      gsap.set(el, { autoAlpha: visible ? 1 : 0, y: 0 });
      return;
    }
    gsap.to(el, {
      autoAlpha: visible ? 1 : 0,
      y: visible ? 0 : 24,
      duration: 0.45,
      ease: EASE.soft,
    });
  }, [shown, hidden]);

  return (
    <Link ref={ref} href={cta.primary.href} className={s.fab} aria-hidden={hidden}>
      <Icon name="spark" size={19} />
      <span>{cta.primary.label}</span>
    </Link>
  );
}
