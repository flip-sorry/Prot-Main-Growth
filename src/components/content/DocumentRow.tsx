import { useRef, useEffect, useState } from 'react';
import type { Document } from '../../types';
import LabelStatus from '../ui/LabelStatus';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { DocumentPortraitIcon, MoreOptionsIcon, ChevronDownIcon } from '../ui/icons';
import { useStatusWidth } from '../../contexts/StatusWidthContext';

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
    <div className={`border-b border-[rgba(118,118,118,0.16)] flex gap-3 md:gap-6 h-auto md:h-16 items-start md:items-center px-3 md:px-4 py-3 md:py-0 shrink-0 w-full max-w-full min-w-0 cursor-pointer transition-colors duration-150 hover:bg-gray-50 ${className}`}>
      {/* Icon - fixed width */}
      <div className="w-6 shrink-0 flex-shrink-0">
        <DocumentPortraitIcon className="shrink-0" />
      </div>
      
      {/* Name column - fills available space */}
      <div className="flex-1 flex flex-col gap-1 items-start min-w-0">
        <div className="flex items-center shrink-0 w-full">
          <div 
            ref={titleRef}
            className="flex-1 text-sm font-semibold text-text-dark leading-[17px] truncate" 
            style={{ fontFamily: "'Graphik LC Web', sans-serif" }}
          >
            {document.title}
          </div>
        </div>
        <div className="flex items-center overflow-hidden shrink-0 w-full">
          <p className="text-[13px] font-normal text-text-lighter leading-4 shrink-0" style={{ fontFamily: "'Graphik LC Web', sans-serif" }}>
            {document.participants.join(', ')}
          </p>
          <ChevronDownIcon className="shrink-0 ml-1" size={16} />
        </div>
      </div>
      
      {/* Status column - width based on longest status label on page */}
      <div 
        className="shrink-0 flex items-center justify-start"
        style={{ width: `${maxStatusWidth}px`, minWidth: `${maxStatusWidth}px` }}
      >
        <LabelStatus ref={statusRef} type={document.status} />
      </div>
      
      {/* Price column - max 120px, hidden on mobile and when title is truncated */}
      {!isTitleTruncated && (
        <div className="hidden md:flex max-w-[120px] shrink-0 items-center justify-end">
          <p className="text-[13px] font-normal leading-4 text-right text-text-dark truncate" style={{ fontFamily: "'Graphik LC Web', sans-serif" }}>
            {formatCurrency(document.amount)}
          </p>
        </div>
      )}
      
      {/* Avatar + Date column - max 140px, can shrink on smaller screens */}
      <div className="w-[140px] min-w-[100px] shrink flex gap-2 items-center">
        <Avatar text={document.avatarText} />
        <p className="flex-1 text-[13px] font-normal leading-4 min-w-0 text-text-dark shrink-0 hidden md:block truncate" style={{ fontFamily: "'Graphik LC Web', sans-serif" }}>
          {document.date}
        </p>
      </div>
      
      {/* More options button - fixed width */}
      <div className="w-10 shrink-0 flex-shrink-0">
        <Button variant="icon">
          <MoreOptionsIcon />
        </Button>
      </div>
    </div>
  );
}

