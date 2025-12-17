interface TabProps {
  label: string;
  count: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Tab({ label, count, active = false, onClick, className = '' }: TabProps) {
  return (
    <div
      className={`flex flex-col items-start min-w-[100px] md:min-w-[120px] shrink-0 cursor-pointer group ${className}`}
      onClick={onClick}
    >
      <div
        className={`flex flex-col gap-1 isolate items-start leading-tight overflow-hidden px-4 py-2 md:py-3 shrink-0 text-xs md:text-sm w-full transition-colors duration-150 ${
          active 
            ? 'bg-background rounded-tl-lg rounded-tr-lg' 
            : 'bg-[rgba(255,255,255,0.08)] rounded-tl-lg rounded-tr-lg'
        }`}
      >
        <p className={`font-semibold relative shrink-0 z-10 text-text-dark group-hover:text-[#248567] transition-colors duration-150`} style={{ fontFamily: "'Graphik LC Web', sans-serif" }}>
          {label}
        </p>
        <p className="font-normal relative shrink-0 text-text-light z-0" style={{ fontFamily: "'Graphik LC Web', sans-serif" }}>
          {count} docs
        </p>
      </div>
    </div>
  );
}

