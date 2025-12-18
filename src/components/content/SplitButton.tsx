import { Button } from '../ui/Button';
import { PlusIcon } from '../../assets/icons';

interface SplitButtonProps {
  className?: string;
}

export default function SplitButton({ className = '' }: SplitButtonProps) {
  return (
    <Button variant="split" size="md" className={className}>
      <Button.Primary>
        <PlusIcon />
        <span>Document</span>
      </Button.Primary>
    </Button>
  );
}

