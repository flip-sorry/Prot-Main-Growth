import { forwardRef } from 'react';
import { typography, colors } from '../../../tokens';
import { cn } from '../../../utils/cn';

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  variant?: 'body' | 'label' | 'caption';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '9px' | '13px';
  fontFamily?: 'graphik' | 'inter';
  color?: 'dark' | 'light' | 'lighter';
  className?: string;
  uppercase?: boolean;
  fontWeight?: 'normal' | 'semibold' | 'bold';
  lineHeight?: 'tight' | 'normal' | 'relaxed' | '17px' | '24px' | '29px';
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      children,
      variant = 'body',
      size = 'base',
      fontFamily = 'inter',
      color = 'dark',
      className = '',
      uppercase = false,
      fontWeight = 'normal',
      lineHeight,
      ...props
    },
    ref
  ) => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Text.tsx:33',message:'Text component render',data:{size,variant,fontFamily,color,fontWeight,lineHeight},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    
    // Map size to Tailwind classes (using explicit mapping for Tailwind JIT to detect)
    const sizeClassMap: Record<string, string> = {
      'xs': 'text-xs',
      'sm': 'text-sm',
      'base': 'text-base',
      'lg': 'text-lg',
      'xl': 'text-xl',
      '2xl': 'text-2xl',
      '9px': 'text-[9px]',
      '13px': 'text-[13px]',
    };
    const sizeClass = sizeClassMap[size] || 'text-base';
    
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

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Text.tsx:52',message:'Generated className values',data:{sizeClass,lineHeightClass,colorClass,weightClass},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    const finalClassName = cn(
      sizeClass,
      colorClass,
      weightClass,
      lineHeightClass,
      uppercase && 'uppercase',
      className
    );
    
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Text.tsx:70',message:'Final className before render',data:{finalClassName,sizeClass,colorClass,weightClass,lineHeightClass},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    return (
      <p
        ref={ref}
        className={finalClassName}
        style={{ fontFamily: typography.fontFamily[fontFamily] }}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Text.displayName = 'Text';

export default Text;

