import Link from 'next/link';
import { Hero } from '@/components/home/Hero';
import { Marquee } from '@/components/sections/Marquee';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { StepsFlow } from '@/components/sections/StepsFlow';
import { Reviews } from '@/components/sections/Reviews';
import { WhyUs } from '@/components/sections/WhyUs';
import { CtaBand } from '@/components/sections/CtaBand';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { faq } from '@/content/faq';
import { cta, primaryContact } from '@/content/site';
import s from './page.module.css';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />

      <section className="section" id="uslugi">
        <div className="container">
          <SectionHeading
            eyebrow="С чем поможем"
            title="От контрольной до диплома"
            text="Пишем с нуля под вашу тему, методичку и срок. Оформление, оригинальность и правки — уже внутри."
            aside={<ButtonLink href="/uslugi" variant="secondary" withArrow>Все услуги</ButtonLink>}
          />
          <ServicesGrid />
          <Reveal className={s.note} y={16}>
            <span>Не нашли свой тип работы?</span>
            <a href={primaryContact.href} target="_blank" rel="noreferrer">
              Напишите — скорее всего, сделаем
            </a>
          </Reveal>
        </div>
      </section>

      <section className={`section ${s.soft}`} id="kak-rabotaem">
        <div className="container">
          <SectionHeading
            eyebrow="Как всё происходит"
            title="Четыре шага без сюрпризов"
            text="Цену и срок фиксируем до начала. Пока вы не сказали «да», работа не стартует и платить не нужно."
            aside={<ButtonLink href="/kak-rabotaem" variant="secondary" withArrow>Подробнее о процессе</ButtonLink>}
          />
          <StepsFlow />
        </div>
      </section>

      <section className="section" id="otzyvy">
        <div className="container">
          <SectionHeading
            eyebrow="Отзывы"
            title="Студенты уже обращались к нам"
            text="Как проходили заказы — от первой заявки до принятой работы."
            aside={<ButtonLink href="/otzyvy" variant="secondary" withArrow>Все отзывы</ButtonLink>}
          />
          <Reviews layout="row" />
        </div>
      </section>

      <section className={`section ${s.soft}`}>
        <div className="container">
          <SectionHeading
            eyebrow="Почему выбирают нас"
            title="Берём задачу и доводим до сдачи"
          />
          <WhyUs />
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <SectionHeading
            eyebrow="Частые вопросы"
            title="Коротко о главном"
            text="Стоимость, сроки, оригинальность и правки — всё, что обычно спрашивают до заказа."
          />
          <div className={s.faqWrap}>
            <Reveal y={24}>
              <Accordion items={faq} />
            </Reveal>
            <Reveal className={s.faqAside} y={24} delay={0.1}>
              <h3>Остался вопрос?</h3>
              <p>
                Напишите в {primaryContact.label} — ответим по срокам и стоимости, даже
                если вы ещё только прикидываете дедлайн.
              </p>
              <ButtonLink href={cta.primary.href} withArrow>
                {cta.primary.label}
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={`section ${s.ctaSection}`}>
        <div className="container">
          <CtaBand />
        </div>
      </section>

      <Link href="/zayavka" className="sr-only">Рассчитать стоимость</Link>
    </>
  );
}
