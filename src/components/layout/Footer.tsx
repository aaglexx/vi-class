import Link from 'next/link';
import { legalNav, nav, site, visibleContacts, cta } from '@/content/site';
import { ButtonLink } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/icons/Icon';
import { Logo } from './Logo';
import s from './Footer.module.css';

const contactIcon: Record<string, IconName> = {
  telegram: 'telegram',
  vk: 'vk',
  whatsapp: 'whatsapp',
  phone: 'phone',
  email: 'mail',
};

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`container ${s.inner}`}>
        <div className={s.brand}>
          <Logo />
          <p className={s.tagline}>
            {site.description}
          </p>
          <p className={s.hours}>{site.workingHours}</p>
          <ButtonLink href={cta.primary.href} withArrow className={s.cta}>
            {cta.primary.label}
          </ButtonLink>
        </div>

        <div className={s.col}>
          <h3 className={s.colTitle}>Разделы</h3>
          <ul className={s.list}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={s.link}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.col}>
          <h3 className={s.colTitle}>Связь</h3>
          <ul className={s.list}>
            {visibleContacts.map((c) => (
              <li key={c.key}>
                <a className={`${s.link} ${s.contact}`} href={c.href} target="_blank" rel="noreferrer">
                  <Icon name={contactIcon[c.key] ?? 'chat'} size={18} />
                  <span>{c.label}</span>
                  <span className={s.handle}>{c.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={s.col}>
          <h3 className={s.colTitle}>Документы</h3>
          <ul className={s.list}>
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={s.link}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={s.wordmarkWrap} aria-hidden="true">
        <span className={s.wordmark}>Работы под ключ</span>
      </div>

      <div className={`container ${s.bottom}`}>
        <span>© {new Date().getFullYear()} {site.name}. {site.city}</span>
        <span className={s.note}>
          Материалы предоставляются в помощь студенту и носят образовательный характер.
        </span>
      </div>
    </footer>
  );
}
