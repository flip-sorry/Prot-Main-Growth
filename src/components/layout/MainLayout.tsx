import type { ReactNode } from 'react';
import Sidebar from '../navigation/Sidebar';
import MainContent from './MainContent';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function MainLayout({ children, className = '' }: MainLayoutProps) {
  return (
    <div className={`bg-background flex items-start relative w-full h-screen overflow-hidden max-w-full ${className}`}>
      <Sidebar />
      <MainContent>
        {children}
      </MainContent>
    </div>
  );
}

