import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type ButtonVariant = 'ember' | 'ghost' | 'outline-ember';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

export type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
export type ButtonLinkProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const BASE =
  'inline-flex items-center justify-center gap-2 font-extrabold text-[14px] uppercase ' +
  'tracking-[0.5px] rounded-md border-2 border-transparent cursor-pointer ' +
  'transition-all duration-150 whitespace-nowrap select-none';

const VARIANTS: Record<ButtonVariant, string> = {
  ember:
    'bg-ember text-[#160a05] border-ember ' +
    'hover:bg-[#ff7548] hover:shadow-[0_6px_24px_rgba(255,90,46,0.45)] hover:-translate-y-0.5',
  ghost:
    'bg-transparent border-bone/12 text-cream hover:border-ember hover:text-ember',
  'outline-ember':
    'bg-transparent border-ember-deep text-ember ' +
    'hover:bg-ember hover:border-ember hover:text-[#160a05]',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-7 py-3',
  lg: 'px-8 py-4 text-[15px]',
};

function buildClasses(variant: ButtonVariant, size: ButtonSize, className?: string): string {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

export function Button({
  variant = 'ember',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={buildClasses(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'ember',
  size = 'md',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={buildClasses(variant, size, className)} {...props}>
      {children}
    </a>
  );
}
