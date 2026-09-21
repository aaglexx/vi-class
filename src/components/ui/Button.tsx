import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Icon } from '@/components/icons/Icon';
import s from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
};

function classes({ variant = 'primary', size = 'md', className }: CommonProps) {
  return [s.btn, s[variant], s[size], className].filter(Boolean).join(' ');
}

export function ButtonLink({
  href,
  children,
  withArrow,
  external,
  ...rest
}: CommonProps & { href: string; external?: boolean }) {
  const content = (
    <>
      <span className={s.label}>{children}</span>
      {withArrow && <Icon name="arrow" size={19} className={s.arrow} />}
    </>
  );

  if (external) {
    return (
      <a className={classes({ children, ...rest })} href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link className={classes({ children, ...rest })} href={href}>
      {content}
    </Link>
  );
}

export function Button({
  children,
  withArrow,
  variant,
  size,
  className,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={classes({ children, variant, size, className })} {...rest}>
      <span className={s.label}>{children}</span>
      {withArrow && <Icon name="arrow" size={19} className={s.arrow} />}
    </button>
  );
}
