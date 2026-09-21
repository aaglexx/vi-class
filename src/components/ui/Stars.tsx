import { Icon } from '@/components/icons/Icon';
import s from './Stars.module.css';

export function Stars({ value = 5, size = 15 }: { value?: number; size?: number }) {
  return (
    <span className={s.row} aria-label={`Оценка ${value} из 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon
          key={i}
          name="star"
          size={size}
          className={i < value ? s.on : s.off}
        />
      ))}
    </span>
  );
}
