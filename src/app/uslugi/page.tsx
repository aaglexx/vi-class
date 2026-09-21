import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { CtaBand } from '@/components/sections/CtaBand';
import { Marquee } from '@/components/sections/Marquee';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/icons/Icon';
import { primaryContact } from '@/content/site';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Услуги',
  description:
    'Курсовые, дипломные и ВКР, отчёты по практике (УП, ПП, ПДП), научные статьи, рефераты, контрольные, лабораторные и презентации под ключ.',
};

const formats = [
  { icon: 'clipboard', title: 'По методичке', text: 'Делаем по требованиям вашей кафедры: шрифты, поля, сноски, структура.' },
  { icon: 'clock', title: 'С фиксированным сроком', text: 'Срок обсуждаем до старта и фиксируем. Если не успеваем — говорим сразу.' },
  { icon: 'chat', title: 'С правками', text: 'Показываем этапы, отвечаем на вопросы и правим по замечаниям до сдачи.' },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Услуги"
        title="Какие работы делаем"
        text="Полный список учебных и научных работ, которые берём под ключ. Если вашего типа работы нет в списке — напишите, почти наверняка сделаем."
        aside={<ButtonLink href="/zayavka" size="lg" withArrow>Рассчитать стоимость</ButtonLink>}
      />

      <section className="section">
        <div className="container">
          <ServicesGrid detailed />

          <Reveal className={s.other} y={20}>
            <div>
              <h3>Другие работы</h3>
              <p>
                Эссе, доклады, кейсы, задачи, чертежи, перевод и оформление материалов,
                доработка уже начатого текста, подготовка к защите.
              </p>
            </div>
            <a className={s.otherLink} href={primaryContact.href} target="_blank" rel="noreferrer">
              <Icon name="telegram" size={18} />
              Спросить про свою работу
            </a>
          </Reveal>
        </div>
      </section>

      <Marquee />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Как устроена работа"
            title="Что входит в любую работу"
            text="Независимо от типа работы условия одни и те же."
          />
          <Reveal className={s.formats} stagger="[data-item]" step={0.08} y={26}>
            {formats.map((f) => (
              <article className={s.format} key={f.title} data-item>
                <span className={s.formatIcon}><Icon name={f.icon} size={22} /></span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <CtaBand
            title="Не уверены, что именно вам нужно?"
            text="Опишите задание своими словами — разберёмся и предложим вариант, который закроет вопрос к сроку."
          />
        </div>
      </section>
    </>
  );
}
