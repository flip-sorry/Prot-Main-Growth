import { useState, useRef } from 'react';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import UserMenu from './UserMenu';
import { DocumentImageIcon, RecentDocumentsIcon, HelpQuestionIcon } from '../ui/icons';

// Helper function to get initials from a full name
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export default function ActionButtons() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const avatarRef = useRef<HTMLButtonElement>(null);
  const userName = 'Iurii Aliavdin';
  const userInitials = getInitials(userName);

  const handleAvatarClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="flex gap-2 items-center shrink-0">
        <Button variant="icon" size="L">
          <DocumentImageIcon />
        </Button>
        <Button variant="icon" size="L">
          <RecentDocumentsIcon />
        </Button>
        <Button variant="icon" size="L">
          <HelpQuestionIcon />
        </Button>
        <Avatar text={userInitials} onClick={handleAvatarClick} ref={avatarRef} />
      </div>
      <UserMenu isOpen={isMenuOpen} onClose={handleCloseMenu} anchorRef={avatarRef} avatarText={userInitials} />
    </>
  );
}

