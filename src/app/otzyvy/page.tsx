import type { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { Reviews } from '@/components/sections/Reviews';
import { CtaBand } from '@/components/sections/CtaBand';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { Stars } from '@/components/ui/Stars';
import { reviews } from '@/content/reviews';
import s from './page.module.css';

export const metadata: Metadata = {
  title: 'Отзывы',
  description: 'Что говорят студенты, которые обращались за помощью с курсовыми, дипломами и практикой.',
};

const average =
  Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10;

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Отзывы"
        title="Студенты уже обращались к нам"
        text="Короткие истории о том, как проходили заказы. Отзывы добавляются в файл с контентом — скриншоты реальных переписок тоже можно прикреплять."
        aside={
          <div className={s.score}>
            <span className={s.value}>{average.toFixed(1)}</span>
            <div>
              <Stars value={5} size={16} />
              <span className={s.count}>{reviews.length} отзывов</span>
            </div>
          </div>
        }
      />

      <section className="section">
        <div className="container">
          <Reviews layout="grid" />

          <Reveal className={s.add} y={20}>
            <h3>Работали с нами?</h3>
            <p>
              Напишите пару строк о том, как всё прошло — это помогает другим студентам
              решиться и не тянуть до последней ночи.
            </p>
            <ButtonLink href="/kontakty" variant="secondary" withArrow>
              Оставить отзыв
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <CtaBand
            title="Хотите так же?"
            text="Оставьте заявку — посмотрим задание, назовём цену и срок."
          />
        </div>
      </section>
    </>
  );
}
