import { forwardRef } from 'react';
import type { DocumentStatus } from '../../types';

interface LabelStatusProps {
  type: DocumentStatus;
  className?: string;
}

const LabelStatus = forwardRef<HTMLDivElement, LabelStatusProps>(
  ({ type, className = '' }, ref) => {
    const isToApprove = type === 'To approve';
    
    return (
      <div ref={ref} className={`${className} inline-flex items-center`}>
        <div
          className={`h-4 inline-flex items-center justify-center px-1 rounded ${
            isToApprove
              ? 'bg-[rgba(255,144,69,0.08)]'
              : 'bg-[#f4f4f4]'
          }`}
        >
          <span
            className={`text-[9px] font-semibold uppercase leading-none whitespace-nowrap ${
              isToApprove
                ? 'text-[#ff9045]'
                : 'text-[#474747]'
            }`}
            style={{ fontFamily: "'Graphik LC Web', sans-serif" }}
            title={type}
          >
            {type}
          </span>
        </div>
      </div>
    );
  }
);

LabelStatus.displayName = 'LabelStatus';

export default LabelStatus;

