import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const BASE =
  'w-full bg-base rounded-lg px-3.5 py-3 text-cream font-body text-[14px] ' +
  'outline-none transition-colors duration-150 placeholder:text-cream/40 border';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => (
    <>
      <input
        ref={ref}
        className={cn(
          BASE,
          error ? 'border-red-400 focus:border-red-400' : 'border-bone/12 focus:border-ember',
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1 text-[12px] text-red-400">{error}</p>}
    </>
  ),
);
