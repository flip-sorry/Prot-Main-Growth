import SearchBar from './SearchBar';
import ActionButtons from './ActionButtons';

interface HeaderProps {
  onOpenChatPanel: (source: 'fab' | 'header') => void;
}

export default function Header({ onOpenChatPanel }: HeaderProps) {
  return (
    <div className="bg-white flex gap-4 h-[72px] items-center px-[60px] py-0 shrink-0 w-full md:w-[calc(100%-240px)] z-10 fixed top-0 left-0 md:left-[240px] right-0">
      <SearchBar />
      <ActionButtons onOpenChatPanel={onOpenChatPanel} />
    </div>
  );
}

