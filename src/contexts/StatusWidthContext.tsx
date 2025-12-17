import { createContext, useContext, useEffect, useState, useRef, ReactNode, useCallback } from 'react';

interface StatusWidthContextType {
  maxStatusWidth: number;
  registerStatusRef: (ref: HTMLDivElement | null) => void;
}

const StatusWidthContext = createContext<StatusWidthContextType>({
  maxStatusWidth: 140,
  registerStatusRef: () => {},
});

export const useStatusWidth = () => useContext(StatusWidthContext);

export function StatusWidthProvider({ children }: { children: ReactNode }) {
  const [maxStatusWidth, setMaxStatusWidth] = useState(140);
  const statusRefs = useRef<Set<HTMLDivElement>>(new Set());
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const measureAllStatuses = useCallback(() => {
    let maxWidth = 140; // default min width
    statusRefs.current.forEach((ref) => {
      if (ref && ref.scrollWidth > 0) {
        const width = ref.scrollWidth;
        if (width > maxWidth) {
          maxWidth = width;
        }
      }
    });
    setMaxStatusWidth(maxWidth);
  }, []);

  const registerStatusRef = useCallback((ref: HTMLDivElement | null) => {
    if (ref) {
      statusRefs.current.add(ref);
      
      // Set up ResizeObserver for this ref
      if (!resizeObserverRef.current) {
        resizeObserverRef.current = new ResizeObserver(() => {
          measureAllStatuses();
        });
      }
      resizeObserverRef.current.observe(ref);
      
      // Measure immediately
      requestAnimationFrame(() => {
        measureAllStatuses();
      });
    }
  }, [measureAllStatuses]);

  useEffect(() => {
    // Measure on mount and window resize
    const handleResize = () => {
      measureAllStatuses();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Initial measurement after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      measureAllStatuses();
    }, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [measureAllStatuses]);

  return (
    <StatusWidthContext.Provider value={{ maxStatusWidth, registerStatusRef }}>
      {children}
    </StatusWidthContext.Provider>
  );
}

