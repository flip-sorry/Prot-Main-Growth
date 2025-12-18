import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { typography } from '../../../tokens';
import { cn } from '../../../utils/cn';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  fontFamily?: 'graphik' | 'inter';
  color?: 'dark' | 'light' | 'lighter';
  className?: string;
  fontWeight?: 'normal' | 'semibold' | 'bold';
  lineHeight?: 'tight' | 'normal' | 'relaxed' | '17px' | '24px' | '29px';
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      children,
      level = 1,
      size = 'xl',
      fontFamily = 'graphik',
      color = 'dark',
      className = '',
      fontWeight = 'bold',
      lineHeight,
      ...props
    },
    ref
  ) => {
    const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    
    // Map size to Tailwind classes (using explicit mapping for Tailwind JIT to detect)
    // Include all classes as literal strings so Tailwind JIT can detect them
    const sizeClassMap: Record<string, string> = {
      'sm': 'text-sm',
      'base': 'text-base',
      'lg': 'text-lg',
      'xl': 'text-xl',
      '2xl': 'text-2xl',
    };
    const sizeClass = sizeClassMap[size] || 'text-xl';
    
    const colorClass = color === 'dark' ? 'text-text-dark' : color === 'light' ? 'text-text-light' : 'text-text-lighter';
    const weightClass = fontWeight === 'normal' ? 'font-normal' : fontWeight === 'semibold' ? 'font-semibold' : 'font-bold';
    
    // Map lineHeight to Tailwind classes (using explicit mapping for Tailwind JIT to detect)
    const lineHeightClassMap: Record<string, string> = {
      'tight': 'leading-tight',
      'normal': 'leading-normal',
      'relaxed': 'leading-relaxed',
      '17px': 'leading-[17px]',
      '24px': 'leading-[24px]',
      '29px': 'leading-[29px]',
    };
    const lineHeightClass = lineHeight ? lineHeightClassMap[lineHeight] || '' : '';

    const finalClassName = cn(
      sizeClass,
      colorClass,
      weightClass,
      lineHeightClass,
      className
    );

    const setRefs = (node: HTMLElement | null) => {
      // Handle forwarded ref
      if (typeof ref === 'function') {
        ref(node as any);
      } else if (ref) {
        (ref as any).current = node;
      }
    };

    const Component = Tag;
    return (
      <Component
        ref={setRefs}
        className={finalClassName}
        style={{ fontFamily: typography.fontFamily[fontFamily] }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

export default Heading;

