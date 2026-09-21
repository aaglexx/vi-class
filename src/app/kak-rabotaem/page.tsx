import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { StepsFlow } from '@/components/sections/StepsFlow';
import { CtaBand } from '@/components/sections/CtaBand';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Как работаем',
  description:
    'Четыре шага: заявка, расчёт стоимости, работа и сдача. Цена и срок фиксируются до начала.',
};

const rules = [
  'Сначала смотрим задание — потом называем цену. Без «от 990 ₽» в рекламе.',
  'Общаемся в том мессенджере, который вы выбрали. Никаких звонков без предупреждения.',
  'Если понимаем, что не успеваем в срок, говорим об этом сразу, а не за день до сдачи.',
  'Правки по замечаниям преподавателя в рамках задания — часть работы, а не доплата.',
  'Не публикуем и не перепродаём ваши материалы: методички и задания остаются у нас.',
];

const timeline = [
  { when: 'Сразу', what: 'Заявка падает менеджеру в Telegram — с темой, сроком и вашими файлами.' },
  { when: '15–60 минут', what: 'Отвечаем, уточняем детали и говорим, берёмся ли за работу.' },
  { when: 'В тот же день', what: 'Называем стоимость и срок. Дальше решение за вами.' },
  { when: 'До сдачи', what: 'Держим в курсе по этапам, присылаем черновики и правим по замечаниям.' },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Как работаем"
        title="Четыре шага без сюрпризов"
        text="Понятный путь от первой заявки до принятой работы — чтобы вы всегда знали, что происходит дальше."
        aside={<ButtonLink href="/zayavka" size="lg" withArrow>Оставить заявку</ButtonLink>}
      />

      <section className="section">
        <div className="container">
          <StepsFlow detailed />
        </div>
      </section>

      <section className={`section ${s.soft}`}>
        <div className="container">
          <div className={s.split}>
            <div>
              <SectionHeading
                eyebrow="Правила"
                title="О чём договариваемся на берегу"
                text="Простые вещи, из-за которых со студентами обычно и возникают проблемы."
              />
              <Reveal className={s.rules} stagger="[data-item]" step={0.07} y={22}>
                {rules.map((rule) => (
                  <li key={rule} data-item>
                    <span>{rule}</span>
                  </li>
                ))}
              </Reveal>
            </div>

            <Reveal className={s.timeline} y={26} delay={0.1}>
              <h3 className={s.timelineTitle}>Что происходит после отправки заявки</h3>
              <ol>
                {timeline.map((row) => (
                  <li key={row.when}>
                    <span className={s.when}>{row.when}</span>
                    <span className={s.what}>{row.what}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <CtaBand
            title="Готовы обсудить вашу работу?"
            text="Заполните короткую форму — вернёмся с расчётом и сроком."
          />
        </div>
      </section>
    </>
  );
}
