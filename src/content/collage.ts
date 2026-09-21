import type { ObjectName } from '@/components/home/Objects';

/**
 * Коллаж на первом экране.
 * Хочешь свои предметы вместо векторных — положи PNG без фона
 * в /public/stickers и укажи путь в `image`. Размер и наклон берутся отсюда.
 */
export type CollageItem = {
  id: string;
  object: ObjectName;
  /** свой PNG без фона, например '/stickers/hoodie.png' */
  image?: string;
  /** позиция в процентах от сцены */
  x: number;
  y: number;
  /** ширина в процентах от ширины сцены */
  width: number;
  rotate: number;
  /** амплитуда «дыхания», px */
  float: number;
  /** прятать на мобильных */
  desktopOnly?: boolean;
};

export const collage: CollageItem[] = [
  { id: 'gradebook', object: 'gradebook', x: 4, y: 14, width: 16, rotate: -6, float: -12 },
  { id: 'coffee', object: 'coffee', x: 28, y: 6, width: 12, rotate: 5, float: 10 },
  { id: 'laptop', object: 'laptop', x: 46, y: 22, width: 28, rotate: -2, float: -9 },
  { id: 'notes', object: 'notes', x: 78, y: 12, width: 17, rotate: 6, float: 12 },
];
