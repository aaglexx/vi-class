'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { gsap, useIsomorphicLayoutEffect, reducedMotion, EASE } from '@/lib/gsap';
import { nav, cta, visibleContacts, primaryContact } from '@/content/site';
import { Icon } from '@/components/icons/Icon';
import { Logo } from './Logo';
import s from './Header.module.css';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  /* компактная шапка после скролла */
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* закрываем меню при смене страницы */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* появление шапки при загрузке */
  useIsomorphicLayoutEffect(() => {
    if (!headerRef.current || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, { y: -70, opacity: 0, duration: 0.9, ease: EASE.soft, delay: 0.05 });
    });
    return () => ctx.revert();
  }, []);

  /* анимация мобильного меню */
  useIsomorphicLayoutEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    document.body.style.overflow = open ? 'hidden' : '';

    if (reducedMotion()) {
      gsap.set(el, { autoAlpha: open ? 1 : 0 });
      return;
    }

    const panel = el.querySelector(`.${s.panel}`);
    const overlay = el.querySelector(`.${s.overlay}`);
    const items = el.querySelectorAll('[data-menu-item]');

    if (open) {
      const tl = gsap.timeline();
      tl.set(el, { autoAlpha: 1 })
        .fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: EASE.inOut })
        .fromTo(panel, { xPercent: -100 }, { xPercent: 0, duration: 0.5, ease: 'power3.out' }, 0)
        .fromTo(items, { x: -16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: EASE.soft }, '-=0.28');
      return () => {
        tl.kill();
      };
    }

    gsap.timeline()
      .to(panel, { xPercent: -100, duration: 0.35, ease: 'power3.in' })
      .to(el, { autoAlpha: 0, duration: 0.2, ease: EASE.inOut }, '-=0.15');
  }, [open]);

  useEffect(() => () => {
    document.body.style.overflow = '';
  }, []);

  return (
    <>
      <header ref={headerRef} className={`${s.header} ${compact ? s.compact : ''}`}>
        <div className={`container ${s.inner}`}>
          <button
            className={s.burger}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
          >
            <Icon name="menu" size={26} />
          </button>

          <Logo />

          <nav className={s.nav} aria-label="Основная навигация">
            {nav.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${s.link} ${active ? s.active : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <a
            className={s.contact}
            href={primaryContact.href}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="telegram" size={30} className={s.contactIcon} />
            <span className={s.contactText}>
              Свяжись
              <br />с нами
            </span>
          </a>
        </div>
      </header>

      <div ref={menuRef} className={s.menu} hidden={!open}>
        <div className={s.overlay} onClick={() => setOpen(false)} />

        <aside className={s.panel}>
          <button className={s.close} onClick={() => setOpen(false)} aria-label="Закрыть меню">
            <Icon name="close" size={22} />
          </button>

          <nav className={s.panelNav} aria-label="Меню">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={s.panelLink} data-menu-item>
                {item.label}
              </Link>
            ))}
            <Link href={cta.primary.href} className={`${s.panelLink} ${s.panelAccent}`} data-menu-item>
              {cta.primary.label}
            </Link>
          </nav>

          <div className={s.panelFoot} data-menu-item>
            {visibleContacts.map((contact) => (
              <a key={contact.key} href={contact.href} target="_blank" rel="noreferrer">
                {contact.label}
              </a>
            ))}
          </div>
        </aside>
      </div>

    </>
  );
}
