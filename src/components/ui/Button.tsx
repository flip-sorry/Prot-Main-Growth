import type { ReactNode } from 'react';

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'icon';
}

export default function Button({ children, className = '', onClick, variant = 'default' }: ButtonProps) {
  if (variant === 'icon') {
    return (
      <button
        onClick={onClick}
        className={`w-10 h-10 flex items-center justify-center hover:bg-[rgba(118,118,118,0.08)] rounded transition-colors duration-150 ${className}`}
      >
        {children}
      </button>
    );
  }
  
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded hover:bg-gray-100 ${className}`}
    >
      {children}
    </button>
  );
}

