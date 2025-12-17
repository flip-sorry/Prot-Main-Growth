import { useState, useRef } from 'react';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import UserMenu from './UserMenu';
import { DocumentImageIcon, RecentDocumentsIcon, HelpQuestionIcon } from '../ui/icons';

export default function ActionButtons() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const avatarRef = useRef<HTMLButtonElement>(null);

  const handleAvatarClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
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
        <Avatar text="KZ" onClick={handleAvatarClick} ref={avatarRef} />
      </div>
      <UserMenu isOpen={isMenuOpen} onClose={handleCloseMenu} anchorRef={avatarRef} />
    </>
  );
}

