import Tab from './Tab';
import { ViewOptionsIcon, ChevronDownIcon } from '../ui/icons';

interface TabsProps {
  tabs: Array<{ id: string; label: string; count: number; active?: boolean }>;
  onTabClick?: (tabId: string) => void;
  className?: string;
}

export default function Tabs({ tabs, onTabClick, className = '' }: TabsProps) {
  return (
    <div className={`bg-white border-b-2 border-background flex items-end w-full max-w-full min-w-0 relative pl-4 md:pl-6 ${className}`}>
      <div className="flex items-end flex-1 min-w-0 overflow-x-auto pr-0">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            label={tab.label}
            count={tab.count}
            active={tab.active}
            onClick={() => onTabClick?.(tab.id)}
          />
        ))}
      </div>
      <div className="flex h-[50px] md:h-[62px] items-center justify-end w-[120px] py-2 pl-2 pr-0 md:py-3 md:pl-3 md:pr-0 rounded-tr-lg shrink-0 flex-shrink-0 bg-white absolute right-0 top-0 z-10">
        <button className="inline-flex items-center justify-center hover:bg-[rgba(118,118,118,0.08)] rounded transition-colors duration-150 p-1">
          <div className="flex items-start">
            <ViewOptionsIcon />
            <ChevronDownIcon />
          </div>
        </button>
      </div>
    </div>
  );
}

