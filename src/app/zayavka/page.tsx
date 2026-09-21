import type { Metadata } from 'next';
import Link from 'next/link';
import { OrderForm } from '@/components/order/OrderForm';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/icons/Icon';
import { primaryContact, trustPoints } from '@/content/site';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Рассчитать стоимость',
  description:
    'Заполните короткую форму: вид работы, тема, срок и контакт. Заявка уйдёт менеджеру, расчёт пришлём в ваш мессенджер.',
};

const after = [
  'Заявка приходит менеджеру сразу после отправки',
  'Смотрим задание и, если нужно, задаём пару уточняющих вопросов',
  'Называем стоимость и срок — расчёт бесплатный',
];

export default function OrderPage() {
  return (
    <section className={s.page}>
      <span className={s.wash} aria-hidden="true" />

      <div className={`container ${s.inner}`}>
        <Reveal className={s.copy} y={22}>
          <nav className={s.crumbs} aria-label="Хлебные крошки">
            <Link href="/">Главная</Link>
            <Icon name="chevron" size={14} className={s.crumbIcon} />
            <span>Рассчитать стоимость</span>
          </nav>

          <h1 className={s.title}>Расскажите о работе</h1>
          <p className={`lead ${s.lead}`}>
            Три коротких шага — примерно две минуты. Черновик сохраняется, так что
            страницу можно спокойно перезагрузить.
          </p>

          <ul className={s.list}>
            {after.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className={s.contact}>
            <p className={s.contactTitle}>Не хочется заполнять форму?</p>
            <a href={primaryContact.href} target="_blank" rel="noreferrer" className={s.contactLink}>
              <Icon name="telegram" size={18} />
              Написать в {primaryContact.label}
            </a>
          </div>

          <ul className={s.trust}>
            {trustPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </Reveal>

        <div className={s.formWrap}>
          <OrderForm />
        </div>
      </div>
    </section>
  );
}
