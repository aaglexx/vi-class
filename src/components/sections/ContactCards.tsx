import { visibleContacts } from '@/content/site';
import { Icon, type IconName } from '@/components/icons/Icon';
import { Reveal } from '@/components/ui/Reveal';
import s from './ContactCards.module.css';

const icons: Record<string, IconName> = {
  telegram: 'telegram',
  vk: 'vk',
  whatsapp: 'whatsapp',
  phone: 'phone',
  email: 'mail',
};

const hints: Record<string, string> = {
  telegram: 'Отвечаем быстрее всего',
  vk: 'Пишите в сообщения сообщества',
  whatsapp: 'Можно голосовыми',
  phone: 'Звонок в рабочее время',
  email: 'Для документов и длинных писем',
};

export function ContactCards() {
  return (
    <Reveal className={s.grid} stagger="[data-item]" step={0.08} y={26}>
      {visibleContacts.map((contact) => (
        <a
          key={contact.key}
          href={contact.href}
          target="_blank"
          rel="noreferrer"
          className={s.card}
          data-item
        >
          <span className={s.icon}><Icon name={icons[contact.key] ?? 'chat'} size={22} /></span>
          <span className={s.label}>{contact.label}</span>
          <span className={s.handle}>{contact.handle}</span>
          <span className={s.hint}>{hints[contact.key]}</span>
          <Icon name="arrow" size={18} className={s.arrow} />
        </a>
      ))}
    </Reveal>
  );
}
