import type { ReactNode } from 'react';

interface NavButtonProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  className?: string;
}

export default function NavButton({ icon, label, active = false, className = '' }: NavButtonProps) {
  return (
    <div
      className={`flex gap-2 h-9 items-center pl-3 pr-2 py-0 w-full rounded cursor-pointer transition-all duration-150 ${
        active
          ? 'bg-white shadow-nav'
          : 'hover:bg-[rgba(118,118,118,0.08)]'
      } ${className}`}
    >
      <div className="w-5 h-5 shrink-0 flex items-center justify-center">
        {icon}
      </div>
      <div className={`flex-1 text-sm leading-5 text-text-dark ${active ? 'font-semibold' : 'font-normal'}`} style={{ fontFamily: "'Inter', sans-serif" }}>
        {label}
      </div>
    </div>
  );
}

