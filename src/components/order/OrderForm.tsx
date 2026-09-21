'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { gsap, reducedMotion, EASE } from '@/lib/gsap';
import { workTypes } from '@/content/services';
import {
  contactMethods,
  contactPlaceholder,
  validateContact,
  validateFile,
  required,
  MAX_FILE_MB,
  type ContactMethod,
} from '@/lib/validate';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/icons/Icon';
import s from './OrderForm.module.css';

type FormState = {
  workType: string;
  subject: string;
  topic: string;
  course: string;
  university: string;
  pages: string;
  deadline: string;
  requirements: string;
  name: string;
  method: ContactMethod;
  contact: string;
  consent: boolean;
};

const empty: FormState = {
  workType: '',
  subject: '',
  topic: '',
  course: '',
  university: '',
  pages: '',
  deadline: '',
  requirements: '',
  name: '',
  method: 'Telegram',
  contact: '',
  consent: false,
};

const DRAFT_KEY = 'lead-draft';

const stepTitles = [
  { title: 'Что за работа', hint: 'Выберите тип — остальное уточним при общении' },
  { title: 'Детали задания', hint: 'Чем точнее данные, тем точнее расчёт' },
  { title: 'Куда ответить', hint: 'Напишем в удобный вам мессенджер' },
];

export function OrderForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(empty);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);

  const stepRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const openedAt = useRef<number>(Date.now());
  const honeypot = useRef<HTMLInputElement>(null);

  /* черновик не теряется при перезагрузке */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<FormState>;
        setData((prev) => ({ ...prev, ...parsed }));
        if (parsed.workType) setRestored(true);
      }
    } catch {
      /* приватный режим — просто работаем без черновика */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [data]);

  /* анимация смены шага и прогресса */
  useEffect(() => {
    const el = stepRef.current;
    if (el && !reducedMotion()) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, ease: EASE.soft },
      );
      gsap.fromTo(
        el.querySelectorAll('[data-field]'),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: EASE.soft },
      );
    }
    if (barRef.current) {
      gsap.to(barRef.current, {
        scaleX: (step + 1) / 3,
        duration: reducedMotion() ? 0 : 0.7,
        ease: EASE.inOut,
      });
    }
  }, [step]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as string]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  };

  const validateStep = (index: number) => {
    const next: Record<string, string> = {};

    if (index === 0) {
      if (!data.workType) next.workType = 'Выберите вид работы';
    }

    if (index === 1) {
      const subject = required(data.subject, 'Укажите предмет');
      const topic = required(data.topic, 'Укажите тему или опишите задание');
      const deadline = required(data.deadline, 'Укажите срок');
      if (subject) next.subject = subject;
      if (topic) next.topic = topic;
      if (deadline) next.deadline = deadline;
      const fileError = validateFile(file);
      if (fileError) next.file = fileError;
    }

    if (index === 2) {
      const name = required(data.name, 'Как к вам обращаться?');
      const contact = validateContact(data.method, data.contact);
      if (name) next.name = name;
      if (contact) next.contact = contact;
      if (!data.consent) next.consent = 'Без согласия мы не можем обработать заявку';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const shake = () => {
    if (!stepRef.current || reducedMotion()) return;
    gsap.fromTo(stepRef.current, { x: -7 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
  };

  const next = () => {
    if (!validateStep(step)) return shake();
    setStep((v) => Math.min(v + 1, 2));
  };

  const back = () => setStep((v) => Math.max(v - 1, 0));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateStep(2)) return shake();

    setSending(true);
    setServerError(null);

    try {
      const payload = new FormData();
      Object.entries(data).forEach(([key, value]) => payload.append(key, String(value)));
      payload.append('elapsed', String(Date.now() - openedAt.current));
      payload.append('website', honeypot.current?.value ?? '');
      if (file) payload.append('file', file);

      const res = await fetch('/api/lead', { method: 'POST', body: payload });
      const json = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !json.ok) {
        throw new Error(json.error || 'Не удалось отправить заявку');
      }

      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      router.push('/zayavka/spasibo');
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : 'Что-то пошло не так. Напишите нам в мессенджер — заявка не потеряется.',
      );
      setSending(false);
    }
  };

  return (
    <form className={s.form} onSubmit={submit} noValidate>
      <header className={s.head}>
        <div className={s.steps}>
          {stepTitles.map((item, i) => (
            <button
              type="button"
              key={item.title}
              className={`${s.stepTab} ${i === step ? s.stepActive : ''} ${i < step ? s.stepDone : ''}`}
              onClick={() => (i < step ? setStep(i) : undefined)}
            >
              <span className={s.stepNum}>{i < step ? <Icon name="check" size={13} /> : i + 1}</span>
              {item.title}
            </button>
          ))}
        </div>
        <div className={s.track}>
          <span className={s.bar} ref={barRef} />
        </div>
      </header>

      {restored && step === 0 && (
        <p className={s.restored}>
          <Icon name="check" size={15} />
          Мы сохранили черновик прошлой заявки — можно продолжить с того же места.
        </p>
      )}

      <div className={s.body} ref={stepRef} key={step}>
        <div className={s.stepHead}>
          <h2 className={s.stepTitle}>{stepTitles[step].title}</h2>
          <p className={s.stepHint}>{stepTitles[step].hint}</p>
        </div>

        {step === 0 && (
          <div className={s.chips} data-field>
            {workTypes.map((type) => (
              <button
                type="button"
                key={type}
                className={`${s.chip} ${data.workType === type ? s.chipOn : ''}`}
                onClick={() => set('workType', type)}
              >
                {type}
              </button>
            ))}
            {errors.workType && <span className={s.error}>{errors.workType}</span>}
          </div>
        )}

        {step === 1 && (
          <div className={s.grid}>
            <label className={s.field} data-field>
              <span className={s.label}>Предмет *</span>
              <input
                className={`${s.input} ${errors.subject ? s.inputError : ''}`}
                value={data.subject}
                onChange={(e) => set('subject', e.target.value)}
                placeholder="Например, экономика труда"
              />
              {errors.subject && <span className={s.error}>{errors.subject}</span>}
            </label>

            <label className={s.field} data-field>
              <span className={s.label}>Курс</span>
              <input
                className={s.input}
                value={data.course}
                onChange={(e) => set('course', e.target.value)}
                placeholder="3"
                inputMode="numeric"
              />
            </label>

            <label className={`${s.field} ${s.wide}`} data-field>
              <span className={s.label}>Тема работы или задание *</span>
              <input
                className={`${s.input} ${errors.topic ? s.inputError : ''}`}
                value={data.topic}
                onChange={(e) => set('topic', e.target.value)}
                placeholder="Тема по методичке или своими словами"
              />
              {errors.topic && <span className={s.error}>{errors.topic}</span>}
            </label>

            <label className={s.field} data-field>
              <span className={s.label}>Учебное заведение</span>
              <input
                className={s.input}
                value={data.university}
                onChange={(e) => set('university', e.target.value)}
                placeholder="Необязательно"
              />
            </label>

            <label className={s.field} data-field>
              <span className={s.label}>Количество страниц</span>
              <input
                className={s.input}
                value={data.pages}
                onChange={(e) => set('pages', e.target.value)}
                placeholder="Если знаете"
                inputMode="numeric"
              />
            </label>

            <label className={s.field} data-field>
              <span className={s.label}>Срок сдачи *</span>
              <input
                className={`${s.input} ${errors.deadline ? s.inputError : ''}`}
                type="date"
                value={data.deadline}
                onChange={(e) => set('deadline', e.target.value)}
              />
              {errors.deadline && <span className={s.error}>{errors.deadline}</span>}
            </label>

            <label className={`${s.field} ${s.wide}`} data-field>
              <span className={s.label}>Дополнительные требования</span>
              <textarea
                className={`${s.input} ${s.textarea}`}
                value={data.requirements}
                onChange={(e) => set('requirements', e.target.value)}
                rows={4}
                placeholder="Оригинальность, особые пожелания научрука, что уже сделано"
              />
            </label>

            <div className={`${s.field} ${s.wide}`} data-field>
              <span className={s.label}>Методичка или задание</span>
              <label className={`${s.file} ${file ? s.fileOn : ''}`}>
                <Icon name={file ? 'clip' : 'upload'} size={20} />
                <span className={s.fileText}>
                  {file ? file.name : `Прикрепить файл — до ${MAX_FILE_MB} МБ`}
                </span>
                <input
                  type="file"
                  className={s.fileInput}
                  onChange={(e) => {
                    const picked = e.target.files?.[0] ?? null;
                    setFile(picked);
                    setErrors((prev) => ({ ...prev, file: validateFile(picked) ?? '' }));
                  }}
                  accept=".pdf,.doc,.docx,.rtf,.txt,.jpg,.jpeg,.png,.zip,.rar,.xlsx,.pptx"
                />
              </label>
              {file && (
                <button type="button" className={s.fileRemove} onClick={() => setFile(null)}>
                  Убрать файл
                </button>
              )}
              {errors.file && <span className={s.error}>{errors.file}</span>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={s.grid}>
            <label className={`${s.field} ${s.wide}`} data-field>
              <span className={s.label}>Как вас зовут? *</span>
              <input
                className={`${s.input} ${errors.name ? s.inputError : ''}`}
                value={data.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Имя"
                autoComplete="given-name"
              />
              {errors.name && <span className={s.error}>{errors.name}</span>}
            </label>

            <div className={`${s.field} ${s.wide}`} data-field>
              <span className={s.label}>Где вам удобнее общаться? *</span>
              <div className={s.methods}>
                {contactMethods.map((method) => (
                  <button
                    type="button"
                    key={method}
                    className={`${s.method} ${data.method === method ? s.methodOn : ''}`}
                    onClick={() => set('method', method)}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <label className={`${s.field} ${s.wide}`} data-field>
              <span className={s.label}>Никнейм, ссылка или номер *</span>
              <input
                className={`${s.input} ${errors.contact ? s.inputError : ''}`}
                value={data.contact}
                onChange={(e) => set('contact', e.target.value)}
                placeholder={contactPlaceholder[data.method]}
              />
              {errors.contact && <span className={s.error}>{errors.contact}</span>}
            </label>

            <label className={`${s.consent} ${s.wide}`} data-field>
              <input
                type="checkbox"
                checked={data.consent}
                onChange={(e) => set('consent', e.target.checked)}
              />
              <span>
                Согласен на обработку персональных данных и принимаю{' '}
                <Link href="/politika" target="_blank">политику конфиденциальности</Link>.
              </span>
            </label>
            {errors.consent && <span className={s.error}>{errors.consent}</span>}

            <div className={s.summary} data-field>
              <h3>Проверьте заявку</h3>
              <dl>
                <div><dt>Вид работы</dt><dd>{data.workType || '—'}</dd></div>
                <div><dt>Предмет</dt><dd>{data.subject || '—'}</dd></div>
                <div><dt>Тема</dt><dd>{data.topic || '—'}</dd></div>
                <div><dt>Срок</dt><dd>{data.deadline || '—'}</dd></div>
                {file && <div><dt>Файл</dt><dd>{file.name}</dd></div>}
              </dl>
            </div>
          </div>
        )}

        {/* ловушка для ботов */}
        <input
          ref={honeypot}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className={s.honeypot}
          aria-hidden="true"
        />
      </div>

      {serverError && <p className={s.serverError}>{serverError}</p>}

      <footer className={s.foot}>
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={back}>
            Назад
          </Button>
        ) : (
          <span className={s.footNote}>Ответим в течение 15 минут</span>
        )}

        {step < 2 ? (
          <Button type="button" onClick={next} withArrow>
            Дальше
          </Button>
        ) : (
          <Button type="submit" disabled={sending} withArrow={!sending}>
            {sending ? 'Отправляем…' : 'Отправить заявку'}
          </Button>
        )}
      </footer>
    </form>
  );
}
