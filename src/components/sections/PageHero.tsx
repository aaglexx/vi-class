import type { ReactNode } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/icons/Icon';
import s from './PageHero.module.css';

type Props = {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  aside?: ReactNode;
};

export function PageHero({ eyebrow, title, text, aside }: Props) {
  return (
    <section className={s.hero}>
      <span className={s.wash} aria-hidden="true" />
      <div className={`container ${s.inner}`}>
        <Reveal className={s.copy} y={22}>
          <nav className={s.crumbs} aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <Icon name="chevron" size={14} className={s.crumbIcon} />
            <span>{eyebrow}</span>
          </nav>
          <h1 className={s.title}>{title}</h1>
          {text && <p className={`lead ${s.text}`}>{text}</p>}
        </Reveal>
        {aside && <Reveal className={s.aside} y={22} delay={0.12}>{aside}</Reveal>}
      </div>
    </section>
  );
}
