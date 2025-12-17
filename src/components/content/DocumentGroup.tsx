import type { Document } from '../../types';
import DocumentRow from './DocumentRow';

interface DocumentGroupProps {
  title: string;
  documents: Document[];
  className?: string;
}

export default function DocumentGroup({ title, documents, className = '' }: DocumentGroupProps) {
  return (
    <div className={`flex flex-col items-start w-full max-w-full min-w-0 ${className}`}>
      <div className="flex gap-0 items-start p-3 shrink-0 w-full max-w-full min-w-0">
        <div className="text-[13px] font-semibold text-text-lighter leading-4 shrink-0" style={{ fontFamily: "'Graphik LC Web', sans-serif" }}>
          {title}
        </div>
      </div>
      {documents.map((doc, index) => (
        <DocumentRow
          key={doc.id}
          document={doc}
          className={index === documents.length - 1 ? 'border-b-0' : ''}
        />
      ))}
    </div>
  );
}

