import type { Document } from '../../types';
import DocumentGroup from './DocumentGroup';

interface DocumentTableProps {
  groups: Array<{ title: string; documents: Document[] }>;
  className?: string;
}

export default function DocumentTable({ groups, className = '' }: DocumentTableProps) {
  return (
    <div className={`flex flex-col items-start w-full max-w-full min-w-0 z-[2] gap-8 ${className}`}>
      {groups.map((group, index) => (
        <DocumentGroup
          key={index}
          title={group.title}
          documents={group.documents}
        />
      ))}
    </div>
  );
}

