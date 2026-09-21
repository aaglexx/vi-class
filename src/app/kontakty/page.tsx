import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { ContactCards } from '@/components/sections/ContactCards';
import { CtaBand } from '@/components/sections/CtaBand';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/icons/Icon';
import { site } from '@/content/site';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Напишите в Telegram, VK или WhatsApp — ответим по срокам и стоимости работы.',
};

const answers = [
  { icon: 'clock', title: 'Когда отвечаем', text: site.workingHours },
  { icon: 'chat', title: 'Как общаемся', text: 'Перепиской в удобном для вас мессенджере. Звоним, только если попросите.' },
  { icon: 'shield', title: 'Что с данными', text: 'Тема, файлы и контакты нужны только для работы и не уходят третьим лицам.' },
] as const;

export default function ContactsPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Остались вопросы?"
        text="Напишите — ответим по срокам и стоимости. Можно просто спросить, заявку оставлять не обязательно."
        aside={<ButtonLink href="/zayavka" size="lg" withArrow>Рассчитать стоимость</ButtonLink>}
      />

      <section className="section">
        <div className="container">
          <ContactCards />

          <Reveal className={s.cards} stagger="[data-item]" step={0.08} y={24}>
            {answers.map((a) => (
              <article className={s.card} key={a.title} data-item>
                <span className={s.icon}><Icon name={a.icon} size={20} /></span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className={`section ${s.soft}`}>
        <div className="container">
          <SectionHeading
            eyebrow="Если удобнее письменно"
            title="Оставьте заявку — вернёмся с расчётом"
            text="Форма занимает пару минут: тип работы, тема, срок и контакт. Методичку можно прикрепить файлом."
            aside={<ButtonLink href="/zayavka" withArrow>Перейти к форме</ButtonLink>}
          />
          <CtaBand
            title="Не уверены, что успеваем по сроку?"
            text="Напишите дедлайн как есть — сразу скажем, берём работу или нет. Без «перезвоним позже»."
          />
        </div>
      </section>
    </>
  );
}
