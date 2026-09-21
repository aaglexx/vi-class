import Link from 'next/link';
import { site } from '@/content/site';
import s from './Logo.module.css';

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className={s.logo} onClick={onClick} aria-label={`${site.name} — на главную`}>
      <span className={s.name}>{site.name}</span>
      <span className={s.dot} aria-hidden="true" />
    </Link>
  );
}
