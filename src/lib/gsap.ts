'use client';

import { useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'power3.out', duration: 0.9 });

  // после загрузки шрифтов высота блоков меняется — пересчитываем триггеры
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => undefined);
  }
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function reducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Мягкие «человеческие» кривые — без резиновых отскоков */
export const EASE = {
  soft: 'power3.out',
  inOut: 'power2.inOut',
  drift: 'sine.inOut',
} as const;

export { gsap, ScrollTrigger };
