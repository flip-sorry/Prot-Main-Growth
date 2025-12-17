import { forwardRef } from 'react';

interface AvatarProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

const Avatar = forwardRef<HTMLButtonElement, AvatarProps>(
  ({ text, className = '', onClick }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={`w-10 h-10 flex items-center justify-center hover:bg-[rgba(118,118,118,0.08)] rounded transition-colors duration-150 ${className}`}
      >
        <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-[9px] font-semibold text-[#4262E0]">
          {text}
        </div>
      </button>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;

