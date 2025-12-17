interface WelcomeSectionProps {
  userName: string;
  className?: string;
}

export default function WelcomeSection({ userName, className = '' }: WelcomeSectionProps) {
  return (
    <div className={`flex-1 text-xl md:text-2xl font-bold leading-[24px] md:leading-[29px] text-text-dark ${className}`} style={{ fontFamily: "'Graphik LC Web', sans-serif" }}>
      Welcome back, {userName}
    </div>
  );
}

