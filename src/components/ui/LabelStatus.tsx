import type { DocumentStatus } from '../../types';

interface LabelStatusProps {
  type: DocumentStatus;
  className?: string;
}

export default function LabelStatus({ type, className = '' }: LabelStatusProps) {
  const isToApprove = type === 'To approve';
  
  return (
    <div className={`${className} inline-block`}>
      <div
        className={`h-4 inline-flex items-center px-1 rounded ${
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

