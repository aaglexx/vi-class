export type ContactMethod = 'Telegram' | 'WhatsApp' | 'VK' | 'Телефон';

export const contactMethods: ContactMethod[] = ['Telegram', 'WhatsApp', 'VK', 'Телефон'];

export const contactPlaceholder: Record<ContactMethod, string> = {
  Telegram: '@username или +7 900 000-00-00',
  WhatsApp: '+7 900 000-00-00',
  VK: 'vk.com/id... или ссылка на профиль',
  'Телефон': '+7 900 000-00-00',
};

const digits = (value: string) => value.replace(/\D/g, '');

export function validateContact(method: ContactMethod, value: string): string | null {
  const v = value.trim();
  if (!v) return 'Укажите, куда вам написать';

  if (method === 'Телефон' || method === 'WhatsApp') {
    return digits(v).length >= 10 ? null : 'Похоже, в номере не хватает цифр';
  }

  if (method === 'Telegram') {
    const ok = /^@[\w\d_]{4,}$/.test(v) || /t\.me\//i.test(v) || digits(v).length >= 10;
    return ok ? null : 'Укажите @никнейм, ссылку t.me или номер телефона';
  }

  const ok = /vk\.com\//i.test(v) || /^@?[\w\d_.]{3,}$/.test(v);
  return ok ? null : 'Укажите ссылку на профиль VK или id';
}

/**
 * Лимит вложения. На Vercel тело запроса к serverless-функции ограничено 4.5 МБ,
 * поэтому по умолчанию 4. На своём сервере можно поднять через
 * NEXT_PUBLIC_MAX_FILE_MB (и MAX_FILE_MB на бэкенде).
 */
export const MAX_FILE_MB = Number(process.env.NEXT_PUBLIC_MAX_FILE_MB) || 4;

export function validateFile(file: File | null): string | null {
  if (!file) return null;
  if (file.size > MAX_FILE_MB * 1024 * 1024) {
    return `Файл больше ${MAX_FILE_MB} МБ — пришлите его в мессенджере`;
  }
  return null;
}

export function required(value: string, message: string): string | null {
  return value.trim() ? null : message;
}
