/**
 * Единая точка правки всех «редакционных» данных сайта.
 * Меняешь здесь — меняется везде: шапка, футер, кнопки, метаданные.
 */

export const site = {
  name: 'VI',
  tagline: 'студенческие работы под ключ',
  description:
    'Курсовые, дипломные и ВКР, отчёты по практике, статьи и презентации под ключ. Считаем стоимость до начала работы и сдаём в срок.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  workingHours: 'На связи каждый день, отвечаем обычно за 15 минут',
  city: 'Работаем со студентами по всей России и СНГ',
} as const;

export type ContactKey = 'telegram' | 'vk' | 'whatsapp' | 'phone' | 'email';

export type Contact = {
  key: ContactKey;
  label: string;
  handle: string;
  href: string;
  /** показывать ли в футере и на странице контактов */
  visible: boolean;
};

/** ЗАГЛУШКИ — подставь свои ссылки и никнеймы */
export const contacts: Contact[] = [
  {
    key: 'telegram',
    label: 'Telegram',
    handle: '@@zzz0zzz_0',
    href: 'https://t.me/@zzz0zzz_0',
    visible: true,
  },
  {
    key: 'vk',
    label: 'VK',
    handle: 'vk.com/club',
    href: 'https://vk.com/club',
    visible: true,
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    handle: '+7 909 910-04-43',
    href: 'https://wa.me/79099100443',
    visible: true,
  },
  {
    key: 'phone',
    label: 'Телефон',
    handle: '+7 909 910-04-43',
    href: 'tel:+79099100443',
    visible: false,
  },
  {
    key: 'email',
    label: 'Почта',
    handle: 'ceo@meetory.co',
    href: 'mailto:ceo@meetory.co',
    visible: false,
  },
];

export const visibleContacts = contacts.filter((c) => c.visible);

export const primaryContact =
  contacts.find((c) => c.key === 'telegram') ?? contacts[0];

export const nav = [
  { href: '/', label: 'Главная' },
  { href: '/uslugi', label: 'Услуги' },
  { href: '/kak-rabotaem', label: 'Как работаем' },
  { href: '/otzyvy', label: 'Отзывы' },
  { href: '/kontakty', label: 'Контакты' },
] as const;

export const legalNav = [
  { href: '/politika', label: 'Политика конфиденциальности' },
  { href: '/soglasie', label: 'Согласие на обработку данных' },
] as const;

export const cta = {
  primary: { label: 'Рассчитать стоимость', href: '/zayavka' },
  secondary: { label: 'Задать вопрос', href: '/kontakty' },
} as const;

export const trustPoints = [
  'Делаем сами, без бирж',
  'Оформление по методичке вуза',
  'Цена фиксируется до старта',
  'Правки до защиты без доплат',
] as const;
