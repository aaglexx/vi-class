import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/icons/Icon';
import { primaryContact, visibleContacts } from '@/content/site';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Заявка отправлена',
  description: 'Мы получили информацию о вашей работе и скоро свяжемся с вами.',
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <section className={s.page}>
      <span className={s.wash} aria-hidden="true" />
      <div className={`container ${s.inner}`}>
        <span className={s.mark}>
          <Icon name="check" size={34} />
        </span>

        <h1 className={s.title}>Заявка отправлена</h1>
        <p className={s.text}>
          Мы получили информацию о вашей работе и свяжемся с вами по указанному контакту.
          Обычно отвечаем в течение 15 минут, в ночное время — утром.
        </p>

        <div className={s.actions}>
          <ButtonLink href={primaryContact.href} external size="lg" withArrow>
            Перейти в {primaryContact.label}
          </ButtonLink>
          <ButtonLink href="/" size="lg" variant="secondary">
            Вернуться на сайт
          </ButtonLink>
        </div>

        <div className={s.other}>
          <span>Другие способы связи:</span>
          {visibleContacts.map((c) => (
            <a key={c.key} href={c.href} target="_blank" rel="noreferrer">
              {c.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
