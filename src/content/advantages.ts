import type { IconName } from '@/components/icons/Icon';

export type Advantage = { title: string; text: string; icon: IconName };

export const advantages: Advantage[] = [
  {
    title: 'Делаем сами',
    text: 'Своя команда авторов по направлениям, без бирж и перекупщиков заказов.',
    icon: 'cap',
  },
  {
    title: 'Цена фиксируется',
    text: 'Стоимость называем до начала и не меняем по ходу работы.',
    icon: 'wallet',
  },
  {
    title: 'Сроки, включая срочные',
    text: 'Берём и горящие задачи. Если не успеваем — говорим сразу, а не за день до сдачи.',
    icon: 'clock',
  },
  {
    title: 'Оформление по методичке',
    text: 'ГОСТ, требования кафедры и пожелания научного руководителя.',
    icon: 'clipboard',
  },
  {
    title: 'Правки до защиты',
    text: 'Замечания по работе отрабатываем без доплат, пока её не примут.',
    icon: 'shield',
  },
  {
    title: 'Всегда на связи',
    text: 'Пишем в вашем мессенджере, показываем этапы и черновики.',
    icon: 'chat',
  },
];
