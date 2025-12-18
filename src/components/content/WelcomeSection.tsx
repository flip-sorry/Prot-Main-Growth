import { Heading } from '../ui/Typography';
import { cn } from '../../utils/cn';

interface WelcomeSectionProps {
  userName: string;
  className?: string;
}

export default function WelcomeSection({ userName, className = '' }: WelcomeSectionProps) {
  return (
    <Heading
      level={1}
      size="xl"
      fontFamily="graphik"
      fontWeight="bold"
      color="dark"
      lineHeight="24px"
      className={cn('flex-1 md:text-2xl md:leading-[29px]', className)}
    >
      Welcome back, {userName}
    </Heading>
  );
}

