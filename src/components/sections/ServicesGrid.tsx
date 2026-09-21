import Link from 'next/link';
import { services } from '@/content/services';
import { Icon } from '@/components/icons/Icon';
import { Reveal } from '@/components/ui/Reveal';
import s from './ServicesGrid.module.css';

export function ServicesGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <Reveal className={`${s.grid} ${detailed ? s.detailed : ''}`} stagger="[data-item]" step={0.07} y={34}>
      {services.map((service) => (
        <article className={s.card} key={service.slug} data-item>
          <span className={s.icon}>
            <Icon name={service.icon} size={detailed ? 26 : 24} />
          </span>

          <h3 className={s.title}>{service.title}</h3>
          <p className={s.text}>{detailed ? service.full : service.short}</p>

          {detailed && (
            <>
              <ul className={s.list}>
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <footer className={s.foot}>
                <span className={s.timing}>{service.timing}</span>
                <Link href="/zayavka" className={s.link}>
                  Рассчитать
                  <Icon name="arrow" size={16} />
                </Link>
              </footer>
            </>
          )}
        </article>
      ))}
    </Reveal>
  );
}
