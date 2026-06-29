import { cn } from '../../lib/utils';

interface CardProps {
  variant?: 'base' | 'elevated' | 'raised';
  hover?: 'scale' | 'lift' | 'border' | 'none';
  padding?: 'sm' | 'md' | 'lg' | 'none';
  rounded?: 'md' | 'lg';
  featured?: boolean;
  className?: string;
  children: React.ReactNode;
  alt?: number
}

const bgMap = {
  base: 'bg-base',
  elevated: 'bg-elevated',
  raised: 'bg-raised',
};

const hoverMap = {
  scale: 'transition-transform duration-300 hover:scale-102',
  lift: 'transition-all duration-200 hover:-translate-y-1',
  border: 'transition-all duration-200 hover:border-ember-deep',
  none: '',
};

const paddingMap = {
  sm: 'px-5 py-4',
  md: 'px-6 py-7',
  lg: 'px-[26px] py-[30px]',
};

const roundedMap = {
  md: 'rounded-[10px]',
  lg: 'rounded-[14px]',
};

export function Card({
  variant = 'base',
  hover = 'none',
  padding = 'md',
  rounded = 'lg',
  featured = false,
  className,
  children,
  alt
}: CardProps) {
  return (
    <div
      className={cn(
        bgMap[variant],
        'border',
        featured
          ? 'border-ember shadow-[0_0_0_1px_var(--color-ember),0_20px_50px_rgba(255,90,46,0.15)] -translate-y-1.5'
          : 'border-bone/12',
        roundedMap[rounded],
        padding !== 'none' && paddingMap[padding],
        hoverMap[hover],
        className,
        alt
      )}
    >
      {children}
    </div>
  );
}
