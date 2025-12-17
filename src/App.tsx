import { useState, useEffect, useRef, useMemo } from 'react';
import MainLayout from './components/layout/MainLayout';
import Header from './components/header/Header';
import WelcomeSection from './components/content/WelcomeSection';
import SplitButton from './components/content/SplitButton';
import Tabs from './components/content/Tabs';
import DocumentTable from './components/content/DocumentTable';
import { documentsToday, documentsLastWeek, allDocuments } from './data/documents';
import type { Document } from './types';
import { StatusWidthProvider } from './contexts/StatusWidthContext';

function App() {
  const [activeTab, setActiveTab] = useState('action-required');
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Get first name from full name in profile
  const fullUserName = 'Iurii Aliavdin';
  const firstName = fullUserName.split(' ')[0];

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

  // Function to filter documents based on tab
  const getDocumentsForTab = (tabId: string): Document[] => {
    switch (tabId) {
      case 'drafts':
        return allDocuments.filter(doc => doc.status === 'Draft');
      case 'action-required':
        return allDocuments.filter(doc => doc.status === 'To approve' || doc.status === 'To sign');
      case 'waiting-for-others':
        return allDocuments.filter(doc => doc.status === 'Awaiting approval' || doc.status === 'Waiting for payment');
      case 'finalized':
        return allDocuments.filter(doc => doc.status === 'Completed' || doc.status === 'Paid');
      default:
        return [];
    }
  };

  // Filter documents based on active tab
  const filteredDocuments = useMemo(() => {
    return getDocumentsForTab(activeTab);
  }, [activeTab]);

  // Group filtered documents by date (Today vs Last week)
  const documentGroups = useMemo(() => {
    const todayIds = new Set(documentsToday.map(doc => doc.id));
    const lastWeekIds = new Set(documentsLastWeek.map(doc => doc.id));

    const todayDocs = filteredDocuments.filter(doc => todayIds.has(doc.id));
    const lastWeekDocs = filteredDocuments.filter(doc => lastWeekIds.has(doc.id));

    const groups = [];
    if (todayDocs.length > 0) {
      groups.push({ title: 'Today', documents: todayDocs });
    }
    if (lastWeekDocs.length > 0) {
      groups.push({ title: 'Last week', documents: lastWeekDocs });
    }
    return groups;
  }, [filteredDocuments]);

  // Calculate tab counts dynamically
  const tabCounts = useMemo(() => {
    return {
      drafts: getDocumentsForTab('drafts').length,
      'action-required': getDocumentsForTab('action-required').length,
      'waiting-for-others': getDocumentsForTab('waiting-for-others').length,
      finalized: getDocumentsForTab('finalized').length,
    };
  }, []);

  const tabs = [
    { id: 'drafts', label: 'Drafts', count: tabCounts.drafts, active: activeTab === 'drafts' },
    { id: 'action-required', label: 'Action required', count: tabCounts['action-required'], active: activeTab === 'action-required' },
    { id: 'waiting-for-others', label: 'Waiting for others', count: tabCounts['waiting-for-others'], active: activeTab === 'waiting-for-others' },
    { id: 'finalized', label: 'Finalized', count: tabCounts.finalized, active: activeTab === 'finalized' },
  ];

  return (
    <MainLayout>
      <Header />
      <div 
        ref={scrollContainerRef}
        className="flex-1 flex flex-col grow isolate items-start min-h-0 min-w-0 relative shrink-0 w-full max-w-full z-0 overflow-y-auto mt-[72px] overflow-x-hidden"
      >
        <div className="sticky top-0 z-20 bg-white w-full max-w-full">
          <div className={`flex flex-col px-[60px] pb-0 transition-all duration-150 w-full max-w-full ${
            isScrolled 
              ? 'gap-3 md:gap-4 pt-3 md:pt-4' 
              : 'gap-6 md:gap-8 pt-6 md:pt-8'
          }`}>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center shrink-0 w-full">
              <WelcomeSection userName={firstName} />
              <SplitButton />
            </div>
            <div className="w-full max-w-full min-w-0">
              <Tabs tabs={tabs} onTabClick={setActiveTab} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-8 px-[60px] pb-6 md:pb-8 pt-0 w-full max-w-full min-w-0">
          <StatusWidthProvider>
            <DocumentTable groups={documentGroups} />
          </StatusWidthProvider>
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
