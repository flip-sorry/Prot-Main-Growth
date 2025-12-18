import { SearchIcon } from '../../assets/icons';
import { colors, transitions } from '../../tokens';
import { cn } from '../../utils/cn';

interface SearchBarProps {
  className?: string;
}

export default function SearchBar({ className = '' }: SearchBarProps) {
  return (
    <div className={cn('flex-1 relative', className)}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder="Search or ask anything"
        className={cn(
          'w-full h-10 pl-10 pr-4 rounded text-sm min-w-0',
          'focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white',
          transitions.default
        )}
        style={{ backgroundColor: colors.interactive.hover }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLInputElement).style.backgroundColor = colors.interactive.hoverStrong;
        }}
        onMouseLeave={(e) => {
          if (document.activeElement !== e.currentTarget) {
            (e.currentTarget as HTMLInputElement).style.backgroundColor = colors.interactive.hover;
          }
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLInputElement).style.backgroundColor = '#ffffff';
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLInputElement).style.backgroundColor = colors.interactive.hover;
        }}
      />
    </div>
  );
}

