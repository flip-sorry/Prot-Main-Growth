import { Text } from '../ui/Typography';
import { colors, transitions } from '../../tokens';
import { cn } from '../../utils/cn';

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
      className={cn('flex flex-col items-start min-w-[100px] md:min-w-[120px] shrink-0 cursor-pointer group', className)}
      onClick={onClick}
    >
      <div
        className={cn(
          'flex flex-col gap-1 isolate items-start overflow-hidden px-4 py-2 md:py-3 shrink-0 w-full',
          transitions.default,
          active 
            ? 'bg-background rounded-tl-lg rounded-tr-lg' 
            : 'bg-[rgba(255,255,255,0.08)] rounded-tl-lg rounded-tr-lg'
        )}
      >
        <Text
          variant="body"
          size="sm"
          fontFamily="graphik"
          fontWeight="semibold"
          color="dark"
          lineHeight="tight"
          className={cn('relative shrink-0 z-10 group-hover:text-[#248567]', transitions.default)}
        >
          {label}
        </Text>
        <Text
          variant="body"
          size="sm"
          fontFamily="graphik"
          fontWeight="normal"
          color="light"
          lineHeight="tight"
          className="relative shrink-0 z-0"
        >
          {count} docs
        </Text>
      </div>
    </div>
  );
}

