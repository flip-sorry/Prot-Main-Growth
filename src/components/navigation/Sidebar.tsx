import WorkspaceSelector from './WorkspaceSelector';
import NavGroup from './NavGroup';
import NavButton from './NavButton';
import { HomeIcon, DocumentsIcon, TemplatesIcon, ContactsIcon, MoreIcon } from '../ui/icons';

export default function Sidebar() {

  return (
    <div className="bg-background hidden md:flex flex-col gap-10 h-screen overflow-hidden p-4 shrink-0 w-[240px] fixed left-0 top-0 z-30">
      <WorkspaceSelector />
      <NavGroup>
        <NavButton icon={<HomeIcon />} label="Home" active />
        <NavButton icon={<DocumentsIcon />} label="Documents" />
        <NavButton icon={<TemplatesIcon />} label="Templates" />
        <NavButton icon={<ContactsIcon />} label="Contacts" />
        <NavButton icon={<MoreIcon />} label="More" />
      </NavGroup>
    </div>
  );
}

