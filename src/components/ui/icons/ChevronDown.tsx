interface ChevronDownProps {
  className?: string;
}

export default function ChevronDown({ className = '' }: ChevronDownProps) {
  return (
    <div className={`w-4 h-4 ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M6 9L12 15L18 9"
          stroke="#767676"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

