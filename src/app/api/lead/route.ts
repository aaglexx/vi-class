import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_FILE_MB = Number(process.env.MAX_FILE_MB) || 4;
const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;

/** примитивный лимит частоты: 5 заявок с одного адреса за 10 минут */
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < WINDOW)) hits.delete(key);
    }
  }
  return list.length > LIMIT;
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function field(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

/** 2026-10-05 -> 5 октября 2026 */
function humanDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

function buildMessage(form: FormData, fileName: string | null) {
  const line = (label: string, value: string) =>
    value ? `<b>${label}:</b> ${escapeHtml(value)}\n` : '';

  const when = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

  return (
    '<b>НОВАЯ ЗАЯВКА</b>\n\n' +
    line('Имя', field(form, 'name')) +
    line('Тип работы', field(form, 'workType')) +
    line('Предмет', field(form, 'subject')) +
    line('Тема', field(form, 'topic')) +
    line('Курс', field(form, 'course')) +
    line('Учебное заведение', field(form, 'university')) +
    line('Объём', field(form, 'pages') ? `${field(form, 'pages')} страниц` : '') +
    line('Срок', humanDate(field(form, 'deadline'))) +
    line('Комментарий', field(form, 'requirements')) +
    '\n' +
    line('Способ связи', field(form, 'method')) +
    line('Контакт', field(form, 'contact')) +
    line('Файл', fileName ? `прикреплён — ${fileName}` : 'нет') +
    `\n<i>${escapeHtml(when)} (МСК)</i>`
  );
}

async function sendToTelegram(token: string, chatId: string, text: string, file: File | null) {
  const api = `https://api.telegram.org/bot${token}`;

  const message = await fetch(`${api}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  if (!message.ok) {
    const detail = await message.text();
    throw new Error(`Telegram sendMessage: ${message.status} ${detail}`);
  }

  if (file && file.size > 0) {
    const payload = new FormData();
    payload.append('chat_id', chatId);
    payload.append('caption', 'Файл к заявке выше');
    payload.append('document', file, file.name);

    const document = await fetch(`${api}/sendDocument`, { method: 'POST', body: payload });
    if (!document.ok) {
      const detail = await document.text();
      // сам лид уже доставлен — сообщаем об этом в тот же чат
      await fetch(`${api}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Файл к последней заявке не загрузился: ${detail.slice(0, 200)}`,
        }),
      });
    }
  }
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Слишком много заявок подряд. Напишите нам в мессенджер.' },
        { status: 429 },
      );
    }

    const form = await request.formData();

    // антиспам: скрытое поле и слишком быстрая отправка
    if (field(form, 'website')) return NextResponse.json({ ok: true });
    if (Number(field(form, 'elapsed') || 0) < 2500) {
      return NextResponse.json({ ok: false, error: 'Заявка отправлена слишком быстро' }, { status: 400 });
    }

    const name = field(form, 'name');
    const contact = field(form, 'contact');
    const workType = field(form, 'workType');
    const consent = field(form, 'consent') === 'true';

    if (!name || !contact || !workType) {
      return NextResponse.json({ ok: false, error: 'Заполнены не все обязательные поля' }, { status: 400 });
    }

    if (!consent) {
      return NextResponse.json({ ok: false, error: 'Нужно согласие на обработку данных' }, { status: 400 });
    }

    const raw = form.get('file');
    const file = raw instanceof File && raw.size > 0 ? raw : null;

    if (file && file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ ok: false, error: `Файл больше ${MAX_FILE_MB} МБ — пришлите его в мессенджере` }, { status: 413 });
    }

    const text = buildMessage(form, file?.name ?? null);
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chats = (process.env.TELEGRAM_CHAT_ID ?? '').split(',').map((c) => c.trim()).filter(Boolean);

    if (!token || chats.length === 0) {
      // чтобы заявка не потерялась, пока бот ещё не подключён
      console.warn('[lead] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы. Заявка:\n', text);
      return NextResponse.json({ ok: true, delivered: false });
    }

    for (const chat of chats) {
      await sendToTelegram(token, chat, text, file);
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error('[lead] ошибка отправки', error);
    return NextResponse.json(
      { ok: false, error: 'Не смогли отправить заявку. Напишите нам в мессенджер — так точно не потеряется.' },
      { status: 500 },
    );
  }
}
