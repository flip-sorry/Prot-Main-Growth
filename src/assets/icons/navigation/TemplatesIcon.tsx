import { colors } from '../../../tokens';

interface TemplatesIconProps {
  className?: string;
  size?: number;
}

export default function TemplatesIcon({ className = '', size = 20 }: TemplatesIconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.33331 1.66666V18.3333H16.6666V5.83249L12.5 1.66666H3.33331ZM4.99998 3.33332H10.8333V7.49916H15V9.99999H4.99998V3.33332ZM9.16665 16.6667H15V11.6667H9.16665V16.6667ZM4.99998 16.6667H7.50081V11.6667H4.99998V16.6667Z" fill={colors.text.light}/>
      </svg>
    </div>
  );
}

