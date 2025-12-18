import { useEffect, useRef, useState } from 'react';
import { colors } from '../../../tokens';
import { cn } from '../../../utils/cn';
import { CloseIcon } from '../../../assets/icons';
import ChatFooter from './ChatFooter';
import ChatContent from './ChatContent';
import type { Message } from '../../../types/messages';
import { generateAgentResponse, streamAgentResponse } from '../../../services/agentService';

interface ChatPanelProps {
  isOpen: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  fabPosition: { bottom: number; right: number } | null;
  fabRef?: React.RefObject<HTMLButtonElement>;
  ignoreNextClickRef?: React.MutableRefObject<boolean>; // Shared ref from App to ignore opening click
}

export default function ChatPanel({ isOpen, isMinimized, onClose, onMinimize, fabPosition, fabRef, ignoreNextClickRef: appIgnoreNextClickRef }: ChatPanelProps) {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ChatPanel.tsx:16',message:'ChatPanel render',data:{isOpen,isMinimized,fabPosition},timestamp:Date.now(),sessionId:'debug-session',runId:'run11',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  console.log('[ChatPanel] Version run11 loaded - fix for opening click issue (1s delay + detailed logging)');
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollableContentRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isContentScrollable, setIsContentScrollable] = useState(false);
  const panelOpenedAtRef = useRef<number | null>(null);
  const ignoreNextClickRef = useRef<boolean>(false); // Synchronous flag to ignore the opening click
  const timeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const now = Date.now();
      const eventTime = event.timeStamp; // Event timestamp (relative to page load)
      const target = event.target as HTMLElement;
      
      // Log every click for debugging
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ChatPanel.tsx:32',message:'Click outside handler called',data:{targetTagName:target?.tagName,targetId:target?.id,targetClassName:target?.className,panelRefExists:!!panelRef.current,panelContains:panelRef.current?.contains(target as Node),appIgnoreFlag:appIgnoreNextClickRef?.current,localIgnoreFlag:ignoreNextClickRef.current,timeSinceOpen:panelOpenedAtRef.current ? now - panelOpenedAtRef.current : null},timestamp:now,sessionId:'debug-session',runId:'run11',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      
      // FIRST: Check synchronous flag from App - if set, clear it and ignore this click
      // This MUST be checked first, before any other logic
      // This flag is set synchronously in App.tsx BEFORE the state update
      if (appIgnoreNextClickRef?.current) {
        appIgnoreNextClickRef.current = false;
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ChatPanel.tsx:40',message:'Ignoring click (ignoreNextClick flag from App set)',data:{targetTagName:target?.tagName},timestamp:now,sessionId:'debug-session',runId:'run11',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        return;
      }
      
      // SECOND: Also check local flag as backup
      if (ignoreNextClickRef.current) {
        ignoreNextClickRef.current = false;
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ChatPanel.tsx:46',message:'Ignoring click (local ignoreNextClick flag set)',data:{targetTagName:target?.tagName},timestamp:now,sessionId:'debug-session',runId:'run11',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        return;
      }
      
      // THIRD: Check if this click happened during panel opening
      // Compare event timestamp with panel open timestamp
      if (panelOpenedAtRef.current) {
        const timeSinceOpen = now - panelOpenedAtRef.current;
        // If the event timestamp suggests it happened before/during opening, ignore it
        // We use a 500ms window to account for timing differences and React batching
        if (timeSinceOpen < 500) {
          // #region agent log
          fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ChatPanel.tsx:52',message:'Ignoring click (happened during panel opening)',data:{targetTagName:target?.tagName,timeSinceOpen,eventTime},timestamp:now,sessionId:'debug-session',runId:'run11',hypothesisId:'A'})}).catch(()=>{});
          // #endregion
          return;
        }
      }
      
      // FOURTH: Check if click is on FAB button - if so, ignore completely
      // Check by data attribute first (most reliable), then by aria-label, then by ref
      const isFabClick = target?.closest('[data-fab-button="true"]') ||
                         (target?.getAttribute('aria-label') === 'AI Assistant' ||
                          target?.closest('[aria-label="AI Assistant"]')) ||
                         (fabRef?.current && fabRef.current.contains(target as Node));
      
      if (isFabClick) {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ChatPanel.tsx:58',message:'Click on FAB button, ignoring',data:{targetTagName:target?.tagName},timestamp:now,sessionId:'debug-session',runId:'run11',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        return; // Always ignore FAB clicks
      }
      
      // FIFTH: Check if click is inside panel - if so, ignore
      if (panelRef.current && panelRef.current.contains(target as Node)) {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ChatPanel.tsx:63',message:'Click inside panel, ignoring',data:{targetTagName:target?.tagName},timestamp:now,sessionId:'debug-session',runId:'run11',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        return;
      }
      
      // SIXTH: Click is outside panel and not on FAB - close the panel
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ChatPanel.tsx:69',message:'Calling onClose from click outside',data:{targetTagName:target?.tagName,timeSinceOpen:panelOpenedAtRef.current ? now - panelOpenedAtRef.current : null,panelRefExists:!!panelRef.current,panelContains:panelRef.current?.contains(target as Node)},timestamp:now,sessionId:'debug-session',runId:'run11',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      onClose();
    };

    if (isOpen && !isMinimized) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ChatPanel.tsx:74',message:'Setting up click outside listener',data:{isOpen,isMinimized,appIgnoreFlag:appIgnoreNextClickRef?.current,panelRefExists:!!panelRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run11',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      // Set synchronous flag immediately to ignore the opening click
      // This MUST happen before adding the listener to catch any queued click events
      ignoreNextClickRef.current = true;
      // Record when panel opened to ignore clicks that happen too soon after (backup check)
      const openTime = Date.now();
      panelOpenedAtRef.current = openTime;
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ChatPanel.tsx:78',message:'Panel opened, setting local ignoreNextClick flag and timestamp',data:{openTime,appIgnoreFlag:appIgnoreNextClickRef?.current,panelRefExists:!!panelRef.current},timestamp:openTime,sessionId:'debug-session',runId:'run11',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      // CRITICAL: Wait 1 full second before adding the listener
      // This ensures the opening click event has been completely processed
      // React state updates, DOM rendering, and event propagation all complete
      timeoutRef.current = window.setTimeout(() => {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ChatPanel.tsx:80',message:'Adding click outside listener after 1s delay',data:{appIgnoreFlag:appIgnoreNextClickRef?.current,localIgnoreFlag:ignoreNextClickRef.current,timeSinceOpen:Date.now() - openTime,panelRefExists:!!panelRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run11',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        // Use 'click' event in bubble phase (false) so it fires AFTER onClick handlers
        document.addEventListener('click', handleClickOutside, false);
      }, 1000); // 1 second delay - ensures opening click is fully processed
      
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        document.removeEventListener('click', handleClickOutside, false);
      };
    } else {
      // Clear the timestamp and flag when panel closes
      panelOpenedAtRef.current = null;
      ignoreNextClickRef.current = false;
    }
  }, [isOpen, isMinimized, onClose, fabRef]);

  // Check if content is scrollable
  useEffect(() => {
    if (!isOpen || isMinimized) {
      setIsContentScrollable(false);
      return;
    }

    const checkScrollability = () => {
      if (scrollableContentRef.current) {
        const { scrollHeight, clientHeight } = scrollableContentRef.current;
        setIsContentScrollable(scrollHeight > clientHeight);
      }
    };

    // Check initially with a small delay to ensure DOM is ready
    const initialTimeout = setTimeout(checkScrollability, 0);

    // Use ResizeObserver to detect content size changes
    let resizeObserver: ResizeObserver | null = null;
    
    if (scrollableContentRef.current) {
      resizeObserver = new ResizeObserver(checkScrollability);
      resizeObserver.observe(scrollableContentRef.current);
    }

    // Also check when messages change
    const messageTimeout = setTimeout(checkScrollability, 100);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(messageTimeout);
      resizeObserver?.disconnect();
    };
  }, [messages, isOpen, isMinimized]);

  // Handle minimize animation
  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ChatPanel.tsx:47',message:'Minimize animation effect',data:{isMinimized,isOpen,isAnimating},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    if (isMinimized && isOpen) {
      setIsAnimating(true);
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ChatPanel.tsx:49',message:'Starting minimize animation',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      // After animation completes, close the panel
      const timeoutId = setTimeout(() => {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ChatPanel.tsx:52',message:'Animation timeout complete, calling onClose',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        setIsAnimating(false);
        onClose();
      }, 300); // Match animation duration
      
      return () => clearTimeout(timeoutId);
    } else {
      setIsAnimating(false);
    }
  }, [isMinimized, isOpen, onClose]);

  // Final position: 16px from bottom and 16px from right
  const finalBottom = 16;
  const finalRight = 16;
  
  // Starting position: where the FAB button was (or default)
  const startBottom = fabPosition ? fabPosition.bottom : 96;
  const startRight = fabPosition ? fabPosition.right : 24;
  
  // Final dimensions: fixed width 348px, height = viewport height - 168px
  const finalWidth = 348;
  const finalHeight = 'calc(100vh - 168px)';
  
  // Starting dimensions (button size)
  const startSize = 56;

  if (!isOpen) return null;

  const handleMinimize = () => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ChatPanel.tsx:79',message:'Minimize button clicked',data:{isOpen,isMinimized},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    onMinimize();
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Create user message
    const userMessage: Message = {
      id: `user-${Date.now()}-${Math.random()}`,
      type: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    };

    // Add user message immediately
    setMessages(prev => [...prev, userMessage]);

    // Generate and stream agent response
    try {
      // Create "Thinking…" message immediately
      const agentMessageId = `agent-${Date.now()}-${Math.random()}`;
      const thinkingMessage: Message = {
        id: agentMessageId,
        type: 'agent',
        content: 'Thinking…',
        timestamp: Date.now(),
        isStreaming: true,
      };
      
      // Add "Thinking…" message immediately
      setMessages(prev => [...prev, thinkingMessage]);
      
      // First get the full response
      const agentResponseText = await generateAgentResponse(content.trim());
      
      // Stream the response, replacing "Thinking…" with actual content
      let accumulatedContent = '';
      await streamAgentResponse(agentResponseText, (chunk, isComplete) => {
        accumulatedContent += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === agentMessageId 
            ? { ...msg, content: accumulatedContent, isStreaming: !isComplete }
            : msg
        ));
      });
    } catch (error) {
      console.error('Error generating agent response:', error);
      // Add error message
      const errorMessage: Message = {
        id: `agent-error-${Date.now()}-${Math.random()}`,
        type: 'agent',
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div
      ref={panelRef}
      className={cn(
        'fixed z-50',
        'bg-white',
        'border border-[#e4e4e4]',
        'rounded-[12px]',
        'overflow-hidden',
        'flex flex-col',
        isMinimized ? 'chat-panel-minimize' : 'chat-panel-morph'
      )}
      style={{
        '--start-bottom': `${startBottom}px`,
        '--start-right': `${startRight}px`,
        '--final-bottom': `${finalBottom}px`,
        '--final-right': `${finalRight}px`,
        '--start-size': `${startSize}px`,
        '--final-width': `${finalWidth}px`,
        '--final-height': finalHeight,
        boxShadow: '0px 2px 8px 0px rgba(47,47,47,0.04), 0px 8px 24px 0px rgba(47,47,47,0.12)',
      } as React.CSSProperties & {
        '--start-bottom': string;
        '--start-right': string;
        '--final-bottom': string;
        '--final-right': string;
        '--start-size': string;
        '--final-width': string;
        '--final-height': string;
      }}
      data-name="chat-panel"
    >
      {/* Header with minimize button */}
      <div className={cn(
        "flex items-center justify-end p-3 shrink-0",
        isContentScrollable && "border-b border-[#e4e4e4]"
      )}>
        <button
          onClick={(e) => {
            // #region agent log
            fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ChatPanel.tsx:117',message:'Minimize button onClick handler',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
            // #endregion
            e.stopPropagation();
            handleMinimize();
          }}
          className={cn(
            'w-8 h-8',
            'flex items-center justify-center',
            'rounded-[6px]',
            'hover:bg-gray-100',
            'transition-colors duration-150',
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-offset-1',
            'focus:ring-[#248567]'
          )}
          aria-label="Minimize"
        >
          <CloseIcon size={20} />
        </button>
      </div>
      {/* Scrollable content area */}
      <div ref={scrollableContentRef} className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
        <ChatContent 
          messages={messages}
          onPromptClick={(prompt) => {
            handleSendMessage(prompt);
            setInputValue('');
          }} 
        />
      </div>
      {/* Footer */}
      <ChatFooter 
        isOpen={isOpen && !isMinimized} 
        value={inputValue}
        onChange={setInputValue}
        onSend={(message) => {
          handleSendMessage(message);
          setInputValue('');
        }}
      />
      <style>{`
        .chat-panel-morph {
          bottom: var(--start-bottom);
          right: var(--start-right);
          width: var(--start-size);
          height: var(--start-size);
          opacity: 0;
          transform: scale(0.9);
          animation: chatPanelMorph 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes chatPanelMorph {
          to {
            bottom: var(--final-bottom);
            right: var(--final-right);
            width: var(--final-width);
            height: var(--final-height);
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .chat-panel-minimize {
          bottom: var(--final-bottom);
          right: var(--final-right);
          width: var(--final-width);
          height: var(--final-height);
          opacity: 1;
          transform: scale(1);
          animation: chatPanelMinimize 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes chatPanelMinimize {
          to {
            bottom: var(--start-bottom);
            right: var(--start-right);
            width: var(--start-size);
            height: var(--start-size);
            opacity: 0;
            transform: scale(0.9);
          }
        }
      `}</style>
    </div>
  );
}
