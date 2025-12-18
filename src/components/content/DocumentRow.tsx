import { useRef, useEffect, useState } from 'react';
import type { Document } from '../../types';
import LabelStatus from '../ui/LabelStatus';
import Avatar from '../ui/Avatar';
import { Button } from '../ui/Button';
import { DocumentPortraitIcon, MoreOptionsIcon, ChevronDownIcon } from '../../assets/icons';
import { useStatusWidth } from '../../contexts/StatusWidthContext';
import { Text } from '../ui/Typography';
import { colors, transitions } from '../../tokens';
import { cn } from '../../utils/cn';

interface DocumentRowProps {
  document: Document;
  className?: string;
}

export default function DocumentRow({ document, className = '' }: DocumentRowProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [isTitleTruncated, setIsTitleTruncated] = useState(false);
  const { maxStatusWidth, registerStatusRef } = useStatusWidth();

  useEffect(() => {
    const checkTruncation = () => {
      if (titleRef.current) {
        const isTruncated = titleRef.current.scrollWidth > titleRef.current.clientWidth;
        setIsTitleTruncated(isTruncated);
      }
    };

    checkTruncation();
    window.addEventListener('resize', checkTruncation);
    
    // Use ResizeObserver for more accurate detection
    const resizeObserver = new ResizeObserver(checkTruncation);
    if (titleRef.current) {
      resizeObserver.observe(titleRef.current);
    }

    return () => {
      window.removeEventListener('resize', checkTruncation);
      resizeObserver.disconnect();
    };
  }, [document.title]);

  useEffect(() => {
    // Register status ref for width measurement
    registerStatusRef(statusRef.current);
  }, [registerStatusRef]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className={cn(
      'border-b flex gap-3 md:gap-6 h-auto md:h-16 items-center px-3 md:px-4 py-3 md:py-0 shrink-0 w-full max-w-full min-w-0 cursor-pointer',
      transitions.default,
      className
    )}
    style={{ borderBottomColor: colors.border.light }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.backgroundColor = colors.interactive.hover;
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.backgroundColor = '';
    }}
    >
      {/* Icon - fixed width */}
      <div className="w-6 shrink-0 flex-shrink-0">
        <DocumentPortraitIcon className="shrink-0" />
      </div>
      
      {/* Name column - fills available space */}
      <div className="flex-1 flex flex-col gap-1 items-start min-w-0">
        <div className="flex items-center shrink-0 w-full">
          <Text
            ref={titleRef}
            variant="body"
            size="sm"
            fontFamily="graphik"
            fontWeight="semibold"
            color="dark"
            lineHeight="17px"
            className="flex-1 truncate"
          >
            {document.title}
          </Text>
        </div>
        <div className="flex items-center overflow-hidden shrink-0 w-full">
          <Text
            variant="body"
            size="13px"
            fontFamily="graphik"
            fontWeight="normal"
            color="lighter"
            lineHeight="normal"
            className="shrink-0"
          >
            {document.participants.join(', ')}
          </Text>
          <ChevronDownIcon className="shrink-0 ml-1" />
        </div>
      </div>
      
      {/* Status column - width based on longest status label on page */}
      <div 
        className="shrink-0 flex items-center justify-start h-fit self-center"
        style={{ width: `${maxStatusWidth}px`, minWidth: `${maxStatusWidth}px` }}
      >
        <LabelStatus ref={statusRef} type={document.status} />
      </div>
      
      {/* Price column - max 120px, hidden on mobile and when title is truncated */}
      {!isTitleTruncated && (
        <div className="hidden md:flex max-w-[120px] shrink-0 items-center justify-end">
          <Text
            variant="body"
            size="13px"
            fontFamily="graphik"
            fontWeight="normal"
            color="dark"
            lineHeight="normal"
            className="text-right truncate"
          >
            {formatCurrency(document.amount)}
          </Text>
        </div>
      )}
      
      {/* Avatar + Date column - max 140px, can shrink on smaller screens */}
      <div className="max-w-[140px] min-w-0 shrink flex gap-2 items-center">
        <Avatar text={document.avatarText} />
        <Text
          variant="body"
          size="13px"
          fontFamily="graphik"
          fontWeight="normal"
          color="dark"
          lineHeight="normal"
          className="flex-1 min-w-0 shrink-0 hidden md:block truncate"
        >
          {document.date}
        </Text>
      </div>
      
      {/* More options button - fixed width */}
      <div className="w-8 shrink-0 flex-shrink-0">
        <Button variant="icon">
          <MoreOptionsIcon />
        </Button>
      </div>
    </div>
  );
}

