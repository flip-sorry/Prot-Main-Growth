import type { ReactNode } from 'react';

interface MainContentProps {
  children: ReactNode;
  className?: string;
}

export default function MainContent({ children, className = '' }: MainContentProps) {
  return (
    <div className={`flex-1 bg-white flex flex-col md:ml-[240px] h-screen isolate items-start min-h-0 min-w-0 relative shrink-0 w-full md:w-[calc(100%-240px)] max-w-full overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

