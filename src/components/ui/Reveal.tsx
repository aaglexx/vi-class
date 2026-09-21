'use client';

import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

type Props = {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  /** селектор детей для поочерёдного появления, например '[data-item]' */
  stagger?: string;
  step?: number;
};

export function Reveal({ children, className, y, delay, stagger, step }: Props) {
  const ref = useReveal<HTMLDivElement>({ y, delay, children: stagger, stagger: step });
  return (
    <div ref={ref} className={className} data-reveal>
      {children}
    </div>
  );
}
