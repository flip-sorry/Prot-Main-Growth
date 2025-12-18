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
import AIFab from './components/ui/AIFab';
import ChatPanel from './components/ui/ChatPanel';

function App() {
  const [activeTab, setActiveTab] = useState('action-required');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatPanelOpen, setIsChatPanelOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatPanelSource, setChatPanelSource] = useState<'fab' | 'header'>('fab');
  const [fabPosition, setFabPosition] = useState<{ bottom: number; right: number } | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const ignoreNextClickRef = useRef<boolean>(false); // Shared ref to ignore opening click
  
  // Get first name from full name in profile
  const fullUserName = 'Iurii Aliavdin';
  const firstName = fullUserName.split(' ')[0];

  // Handler to open chat panel from different sources
  const handleOpenChatPanel = (source: 'fab' | 'header') => {
    setChatPanelSource(source);
    if (source === 'fab' && fabRef.current) {
      const rect = fabRef.current.getBoundingClientRect();
      setFabPosition({
        bottom: window.innerHeight - rect.top,
        right: window.innerWidth - rect.right,
      });
    } else if (source === 'header') {
      // Use default position for header (bottom-right corner)
      setFabPosition({
        bottom: 16,
        right: 16,
      });
    }
    setIsChatPanelOpen(true);
    setIsMinimized(false);
  };

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

  // Handle Cmd+J / Ctrl+J to toggle chat panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+J on Mac, Ctrl+J on Windows/Linux
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault();
        if (isChatPanelOpen) {
          setIsChatPanelOpen(false);
          setIsMinimized(false);
        } else {
          handleOpenChatPanel('fab');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isChatPanelOpen]);

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
      <Header onOpenChatPanel={handleOpenChatPanel} />
      <div 
        ref={scrollContainerRef}
        data-scroll-container
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
      <AIFab 
        ref={fabRef}
        isHidden={isChatPanelOpen && !isMinimized}
        onClick={(e) => {
          // Stop event propagation to prevent click-outside handler from firing
          e.stopPropagation();
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:157',message:'FAB button clicked',data:{isChatPanelOpen,isMinimized,fabRefExists:!!fabRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run11',hypothesisId:'B'})}).catch(()=>{});
          // #endregion
          if (!isChatPanelOpen && fabRef.current) {
            // Set flag IMMEDIATELY before state update to prevent click-outside handler from closing
            ignoreNextClickRef.current = true;
            // #region agent log
            fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:160',message:'Setting ignoreNextClick flag before opening panel',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run11',hypothesisId:'B'})}).catch(()=>{});
            // #endregion
            // #region agent log
            fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:162',message:'Opening chat panel from FAB',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run11',hypothesisId:'B'})}).catch(()=>{});
            // #endregion
            handleOpenChatPanel('fab');
          } else if (isChatPanelOpen) {
            // #region agent log
            fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:168',message:'Closing chat panel from FAB',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'B'})}).catch(()=>{});
            // #endregion
            // Close panel
            setIsChatPanelOpen(false);
            setIsMinimized(false);
          }
        }} 
      />
      <ChatPanel 
        isOpen={isChatPanelOpen} 
        isMinimized={isMinimized}
        onClose={() => {
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:190',message:'onClose called',data:{isChatPanelOpen,isMinimized},timestamp:Date.now(),sessionId:'debug-session',runId:'run6',hypothesisId:'A'})}).catch(()=>{});
          // #endregion
          ignoreNextClickRef.current = false; // Clear flag when closing
          setChatPanelSource('fab'); // Reset to default source
          setIsChatPanelOpen(false);
          setIsMinimized(false);
        }}
        onMinimize={() => {
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.tsx:194',message:'onMinimize called',data:{isChatPanelOpen,isMinimized},timestamp:Date.now(),sessionId:'debug-session',runId:'run6',hypothesisId:'C'})}).catch(()=>{});
          // #endregion
          setIsMinimized(true);
        }}
        fabPosition={fabPosition}
        fabRef={fabRef}
        ignoreNextClickRef={ignoreNextClickRef}
        source={chatPanelSource}
      />
    </MainLayout>
  );
}

export default App;
