import { reviews } from '@/content/reviews';
import { Stars } from '@/components/ui/Stars';
import { Reveal } from '@/components/ui/Reveal';
import s from './Reviews.module.css';

export function Reviews({ layout = 'row' }: { layout?: 'row' | 'grid' }) {
  return (
    <Reveal
      className={layout === 'row' ? s.row : s.grid}
      stagger="[data-item]"
      step={0.07}
      y={30}
    >
      {reviews.map((review) => (
        <figure className={s.card} key={review.name + review.work} data-item>
          <div className={s.head}>
            <div>
              <figcaption className={s.name}>{review.name}</figcaption>
              <span className={s.meta}>{review.meta}</span>
            </div>
            <Stars value={review.rating} />
          </div>

          <blockquote className={s.text}>{review.text}</blockquote>

          {review.image && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img className={s.shot} src={review.image} alt="Скриншот отзыва" loading="lazy" />
          )}

          <span className={s.work}>{review.work}</span>
        </figure>
      ))}
    </Reveal>
  );
}
