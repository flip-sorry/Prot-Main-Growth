import type { ReactNode } from 'react';
import { Text } from '../ui/Typography';
import { colors, transitions } from '../../tokens';
import { cn } from '../../utils/cn';

interface NavButtonProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  className?: string;
}

export default function NavButton({ icon, label, active = false, className = '' }: NavButtonProps) {
  return (
    <div
      className={cn(
        'flex gap-2 h-9 items-center pl-3 pr-2 py-0 w-full rounded cursor-pointer',
        transitions.default,
        active ? 'bg-white shadow-nav' : '',
        className
      )}
      onMouseEnter={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.backgroundColor = colors.interactive.hover;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          (e.currentTarget as HTMLElement).style.backgroundColor = '';
        }
      }}
    >
      <div className="w-5 h-5 shrink-0 flex items-center justify-center">
        {icon}
      </div>
      <Text
        variant="body"
        size="sm"
        fontFamily="inter"
        fontWeight={active ? 'semibold' : 'normal'}
        color="dark"
        lineHeight="normal"
        className="flex-1"
      >
        {label}
      </Text>
    </div>
  );
}

