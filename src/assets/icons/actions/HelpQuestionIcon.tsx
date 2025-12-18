import { colors } from '../../../tokens';

interface HelpQuestionIconProps {
  className?: string;
  size?: number;
}

export default function HelpQuestionIcon({ className = '', size = 24 }: HelpQuestionIconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M13 17V15H11V17H13Z" fill={colors.text.lighter}/>
        <path d="M9 10C9 8.34 10.34 7 12 7C13.66 7 15 8.34 15 10C15 11.31 14.17 12.42 13 12.82V14H11V12C11 11.45 11.45 11 12 11C12.55 11 13 10.55 13 10C13 9.45 12.55 9 12 9C11.45 9 11 9.45 11 10H9Z" fill={colors.text.lighter}/>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.032 3 3 7.032 3 12C3 16.968 7.032 21 12 21C16.968 21 21 16.968 21 12C21 7.032 16.968 3 12 3ZM12 19C8.14 19 5 15.859 5 12C5 8.141 8.14 5 12 5C15.86 5 19 8.141 19 12C19 15.859 15.86 19 12 19Z" fill={colors.text.lighter}/>
      </svg>
    </div>
  );
}

