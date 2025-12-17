import type { ReactNode } from 'react';

interface NavGroupProps {
  children: ReactNode;
  className?: string;
}

export default function NavGroup({ children, className = '' }: NavGroupProps) {
  return (
    <div className={`flex flex-col items-start w-full gap-1 ${className}`}>
      {children}
    </div>
  );
}

