interface WorkspaceIconProps {
  className?: string;
  size?: number;
}

export default function WorkspaceIcon({ className = '', size = 32 }: WorkspaceIconProps) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="32" height="32" rx="3.2" fill="#FDDCBD"/>
        <path d="M17.8631 15.9728C32.6805 15.9728 16.0087 -0.727811 16.0087 14.213C16.0087 -0.727811 -0.715613 15.9728 14.1718 15.9728C-0.645637 15.9728 15.9212 32.7262 15.9212 17.7326C16.0087 32.7966 32.6805 15.9728 17.8631 15.9728Z" fill="#F88619"/>
      </svg>
    </div>
  );
}

