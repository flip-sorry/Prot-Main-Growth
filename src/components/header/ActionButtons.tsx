import Button from '../ui/Button';
import { DocumentImageIcon, RecentDocumentsIcon, HelpQuestionIcon } from '../ui/icons';

export default function ActionButtons() {
  return (
    <div className="flex gap-2 items-center shrink-0">
      <Button variant="icon">
        <DocumentImageIcon />
      </Button>
      <Button variant="icon">
        <RecentDocumentsIcon />
      </Button>
      <Button variant="icon">
        <HelpQuestionIcon />
      </Button>
    </div>
  );
}

