import type { IconName } from '../../../types/icons';
import { colors } from '../../../tokens';
import {
  HomeIcon,
  DocumentsIcon,
  TemplatesIcon,
  ContactsIcon,
  MoreIcon,
  SearchIcon,
  MoreOptionsIcon,
  ChevronDownIcon,
  ViewOptionsIcon,
  HelpQuestionIcon,
  SignOutIcon,
  PlusIcon,
  DocumentPortraitIcon,
  DocumentImageIcon,
  RecentDocumentsIcon,
  WorkspaceStarIcon,
  WorkspaceChevronIcon,
} from '../../../assets/icons';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  color?: 'default' | 'lighter' | 'dark' | 'primary' | 'white';
}

const iconColorMap = {
  default: colors.text.light,
  lighter: colors.text.lighter,
  dark: colors.text.dark,
  primary: colors.primary.base,
  white: '#ffffff',
};

const iconComponentMap = {
  home: HomeIcon,
  documents: DocumentsIcon,
  templates: TemplatesIcon,
  contacts: ContactsIcon,
  more: MoreIcon,
  search: SearchIcon,
  'more-options': MoreOptionsIcon,
  'chevron-down': ChevronDownIcon,
  'view-options': ViewOptionsIcon,
  'help-question': HelpQuestionIcon,
  'sign-out': SignOutIcon,
  plus: PlusIcon,
  'document-portrait': DocumentPortraitIcon,
  'document-image': DocumentImageIcon,
  'recent-documents': RecentDocumentsIcon,
  'workspace-star': WorkspaceStarIcon,
  'workspace-chevron': WorkspaceChevronIcon,
};

export default function Icon({ name, size, className = '', color }: IconProps) {
  const IconComponent = iconComponentMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  // For icons that support color prop (like PlusIcon), pass it through
  if (name === 'plus' && color) {
    return <IconComponent className={className} size={size} color={iconColorMap[color]} />;
  }

  return <IconComponent className={className} size={size} />;
}

