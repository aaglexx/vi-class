import { ButtonLink } from '@/components/ui/Button';
import s from './not-found.module.css';

export default function NotFound() {
  return (
    <section className={s.page}>
      <div className="container">
        <span className={s.code}>404</span>
        <h1 className={s.title}>Такой страницы нет</h1>
        <p className={s.text}>
          Возможно, ссылка устарела. Вернитесь на главную или сразу оставьте заявку —
          так быстрее.
        </p>
        <div className={s.actions}>
          <ButtonLink href="/" size="lg" withArrow>На главную</ButtonLink>
          <ButtonLink href="/zayavka" size="lg" variant="secondary">Рассчитать стоимость</ButtonLink>
        </div>
      </div>
    </section>
  );
}
