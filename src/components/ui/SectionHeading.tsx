import type { ReactNode } from 'react';
import s from './SectionHeading.module.css';
import { Reveal } from './Reveal';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: 'left' | 'center';
  aside?: ReactNode;
};

export function SectionHeading({ eyebrow, title, text, align = 'left', aside }: Props) {
  return (
    <Reveal className={`${s.wrap} ${align === 'center' ? s.center : ''}`}>
      <div className={s.main}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 className={s.title}>{title}</h2>
        {text && <p className={`lead ${s.text}`}>{text}</p>}
      </div>
      {aside && <div className={s.aside}>{aside}</div>}
    </Reveal>
  );
}
