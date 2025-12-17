interface AvatarProps {
  text: string;
  className?: string;
}

export default function Avatar({ text, className = '' }: AvatarProps) {
  return (
    <div className={`w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700 ${className}`}>
      {text}
    </div>
  );
}

