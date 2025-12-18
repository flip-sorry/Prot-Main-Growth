import { createContext, useContext, useEffect, useState, useRef, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { debounce } from '../utils/debounce';

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
  const rafIdRef = useRef<number | null>(null);

  const measureAllStatuses = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }
    
    rafIdRef.current = requestAnimationFrame(() => {
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
    });
  }, []);

  // Debounced version for resize events - memoized to prevent recreation
  const debouncedMeasureAllStatuses = useMemo(
    () => debounce(measureAllStatuses, 150),
    [measureAllStatuses]
  );

  const registerStatusRef = useCallback((ref: HTMLDivElement | null) => {
    if (ref) {
      statusRefs.current.add(ref);
      
      // Set up ResizeObserver for this ref with debouncing
      if (!resizeObserverRef.current) {
        resizeObserverRef.current = new ResizeObserver(() => {
          debouncedMeasureAllStatuses();
        });
      }
      resizeObserverRef.current.observe(ref);
      
      // Measure immediately using RAF
      requestAnimationFrame(() => {
        measureAllStatuses();
      });
    }
  }, [measureAllStatuses, debouncedMeasureAllStatuses]);

  useEffect(() => {
    // Measure on mount and window resize with debouncing
    const handleResize = debouncedMeasureAllStatuses;
    
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
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [measureAllStatuses, debouncedMeasureAllStatuses]);

  return (
    <StatusWidthContext.Provider value={{ maxStatusWidth, registerStatusRef }}>
      {children}
    </StatusWidthContext.Provider>
  );
}

