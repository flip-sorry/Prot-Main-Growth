import { PlusIcon } from '../ui/icons';

interface SplitButtonProps {
  className?: string;
}

export default function SplitButton({ className = '' }: SplitButtonProps) {
  return (
    <div className={`flex items-stretch ${className}`}>
      <button className="bg-[#248567] text-white pl-2 pr-4 py-2 rounded-l hover:bg-[#1f6f54] flex items-center gap-2 font-semibold text-sm h-9">
        <PlusIcon />
        <span>Document</span>
      </button>
      <button className="bg-[#248567] text-white px-2 rounded-r hover:bg-[#1f6f54] border-l border-[#1f6f54] flex items-center justify-center h-9">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

