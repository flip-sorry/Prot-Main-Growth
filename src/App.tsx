import { useState, useEffect, useRef } from 'react';
import MainLayout from './components/layout/MainLayout';
import Header from './components/header/Header';
import WelcomeSection from './components/content/WelcomeSection';
import SplitButton from './components/content/SplitButton';
import Tabs from './components/content/Tabs';
import DocumentTable from './components/content/DocumentTable';
import { documentsToday, documentsLastWeek } from './data/documents';

function App() {
  const [, setActiveTab] = useState('action-required');
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrolled = scrollContainerRef.current.scrollTop > 0;
        setIsScrolled(scrolled);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const tabs = [
    { id: 'ai-recap', label: 'AI Recap', count: 5 },
    { id: 'drafts', label: 'Drafts', count: 5 },
    { id: 'action-required', label: 'Action required', count: 6, active: true },
    { id: 'waiting-for-others', label: 'Waiting for others', count: 4 },
    { id: 'finalized', label: 'Finalized', count: 7 },
    { id: 'suggested-edits', label: 'Suggested edits', count: 0 },
  ];

  const documentGroups = [
    { title: 'Today', documents: documentsToday },
    { title: 'Last week', documents: documentsLastWeek },
  ];

  return (
    <MainLayout>
      <Header />
      <div 
        ref={scrollContainerRef}
        className="flex-1 flex flex-col grow isolate items-start min-h-0 min-w-0 relative shrink-0 w-full max-w-full z-0 overflow-y-auto mt-[72px] overflow-x-hidden"
      >
        <div className="sticky top-0 z-20 bg-white w-full max-w-full">
          <div className={`flex flex-col px-4 md:px-6 pb-0 transition-all duration-150 w-full max-w-full ${
            isScrolled 
              ? 'gap-3 md:gap-4 pt-3 md:pt-4' 
              : 'gap-6 md:gap-8 pt-6 md:pt-8'
          }`}>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center shrink-0 w-full">
              <WelcomeSection userName="Aaron" />
              <SplitButton />
            </div>
            <div className="w-full max-w-full min-w-0">
              <Tabs tabs={tabs} onTabClick={setActiveTab} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-8 px-4 md:px-6 pb-6 md:pb-8 pt-0 w-full max-w-full min-w-0">
          <DocumentTable groups={documentGroups} />
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
