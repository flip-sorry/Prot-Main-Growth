import { SearchIcon } from '../ui/icons';

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className = '' }: SearchBarProps) {
  return (
    <div className={`flex-1 relative ${className}`}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder="Search or ask anything"
        className="w-full h-10 pl-10 pr-4 rounded bg-[rgba(118,118,118,0.08)] hover:bg-[rgba(118,118,118,0.12)] focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white transition-colors duration-150 text-sm min-w-0"
      />
    </div>
  );
}

