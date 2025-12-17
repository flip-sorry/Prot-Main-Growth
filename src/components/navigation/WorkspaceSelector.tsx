import { WorkspaceStarIcon, WorkspaceChevronIcon } from '../ui/icons';

interface WorkspaceSelectorProps {
  className?: string;
}

export default function WorkspaceSelector({ className = '' }: WorkspaceSelectorProps) {
  return (
    <div className={`flex gap-2 items-center pl-1 pr-2 py-1 rounded cursor-pointer hover:bg-[rgba(118,118,118,0.08)] transition-colors duration-150 ${className}`}>
      <div className="w-8 h-8 rounded bg-workspace-accent flex items-center justify-center shrink-0">
        <WorkspaceStarIcon />
      </div>
      <div className="flex flex-col gap-0.5 grow min-w-0">
        <div className="text-sm font-bold text-text-dark leading-5 truncate" style={{ fontFamily: "'Graphik LC Web', sans-serif" }}>
          Acme Sales
        </div>
        <div className="text-[9px] font-semibold text-text-lighter uppercase leading-[10px] truncate" style={{ fontFamily: "'Graphik LC Web', sans-serif" }}>
          Sales • 3 members
        </div>
      </div>
      <WorkspaceChevronIcon />
    </div>
  );
}

