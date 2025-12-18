import { useEffect, useRef } from 'react';
import { SignOutIcon } from '../../assets/icons';
import Avatar from '../ui/Avatar';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
  avatarText: string;
}

export default function UserMenu({ isOpen, onClose, anchorRef, avatarText }: UserMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen) return null;

  const anchorRect = anchorRef.current?.getBoundingClientRect();
  const top = anchorRect ? anchorRect.bottom + 8 : 0;
  const right = anchorRect ? window.innerWidth - anchorRect.right : 0;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        ref={menuRef}
        className="fixed z-50 bg-white border border-gray-200 rounded-[4px] shadow-lg min-w-[280px] py-1"
        style={{
          top: `${top}px`,
          right: `${right}px`,
        }}
      >
        {/* MY ACCOUNT Section */}
        <div className="px-4 py-1.5">
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            MY ACCOUNT
          </div>
          <div className="flex gap-3 items-center mb-2">
            <Avatar text={avatarText} className="w-10 h-10 text-xs shrink-0" />
            <div className="flex flex-col min-w-0">
              <div className="text-sm font-semibold text-gray-800 truncate">
                Iurii Aliavdin
              </div>
              <div className="text-xs text-gray-600 truncate">
                iurii.aliavdin@pandadoc.com
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200 w-full mb-1" />

        <div className="py-1">
          <button
            onClick={onClose}
            className="w-full text-left text-sm text-gray-800 py-2 hover:bg-[rgba(118,118,118,0.08)] px-4 transition-colors"
          >
            Account settings
          </button>
          <button
            onClick={onClose}
            className="w-full text-left text-sm text-gray-800 py-2 hover:bg-[rgba(118,118,118,0.08)] px-4 transition-colors"
          >
            Notifications
          </button>
        </div>

        <div className="h-px bg-gray-200 w-full my-1" />

        {/* WORKSPACE Section */}
        <div className="py-1">
          <div className="px-4 mb-1">
            <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
              WORKSPACE
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full text-left text-sm text-gray-800 py-2 hover:bg-[rgba(118,118,118,0.08)] px-4 transition-colors"
          >
            Workspace settings
          </button>
          <button
            onClick={onClose}
            className="w-full text-left text-sm text-gray-800 py-2 hover:bg-[rgba(118,118,118,0.08)] px-4 transition-colors"
          >
            Integrations
          </button>
        </div>

        <div className="h-px bg-gray-200 w-full my-1" />

        {/* Sign out */}
        <div className="py-1">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-between text-sm text-gray-800 py-2 hover:bg-[rgba(118,118,118,0.08)] px-4 transition-colors"
          >
            <span>Sign out</span>
            <SignOutIcon />
          </button>
        </div>
      </div>
    </>
  );
}

