import { advantages } from '@/content/advantages';
import { Icon } from '@/components/icons/Icon';
import { Reveal } from '@/components/ui/Reveal';
import s from './WhyUs.module.css';

export function WhyUs() {
  return (
    <Reveal className={s.grid} stagger="[data-item]" step={0.06} y={28}>
      {advantages.map((item) => (
        <article className={s.item} key={item.title} data-item>
          <span className={s.icon}><Icon name={item.icon} size={22} /></span>
          <h3 className={s.title}>{item.title}</h3>
          <p className={s.text}>{item.text}</p>
        </article>
      ))}
    </Reveal>
  );
}
