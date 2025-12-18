import { colors } from '../../../tokens';

interface RecentDocumentsIconProps {
  className?: string;
  size?: number;
}

export default function RecentDocumentsIcon({ className = '', size = 24 }: RecentDocumentsIconProps) {
  return (
    <div className={`relative shrink-0 overflow-clip ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path fillRule="evenodd" clipRule="evenodd" d="M3 11V3H21V11H3ZM19 9H5V5H19V9Z" fill={colors.text.lighter}/>
        <path d="M13.101 13C12.5151 13.5741 12.0297 14.2504 11.6736 15H5V19H11.0709C11.1719 19.7061 11.3783 20.3783 11.6736 21H3V13H13.101Z" fill={colors.text.lighter}/>
        <path fillRule="evenodd" clipRule="evenodd" d="M18 23C16.6167 23 15.4375 22.5125 14.4625 21.5375C13.4875 20.5625 13 19.3833 13 18C13 16.6167 13.4875 15.4375 14.4625 14.4625C15.4375 13.4875 16.6167 13 18 13C19.3833 13 20.5625 13.4875 21.5375 14.4625C22.5125 15.4375 23 16.6167 23 18C23 19.3833 22.5125 20.5625 21.5375 21.5375C20.5625 22.5125 19.3833 23 18 23ZM19.675 20.375L20.375 19.675L18.5 17.8V15H17.5V18.2L19.675 20.375Z" fill={colors.text.lighter}/>
      </svg>
    </div>
  );
}

