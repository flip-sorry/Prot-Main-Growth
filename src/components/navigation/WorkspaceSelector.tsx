import { WorkspaceIcon, WorkspaceChevronIcon } from '../../assets/icons';
import { Text } from '../ui/Typography';
import { colors, transitions } from '../../tokens';
import { cn } from '../../utils/cn';

interface WorkspaceSelectorProps {
  className?: string;
}

export default function WorkspaceSelector({ className = '' }: WorkspaceSelectorProps) {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'WorkspaceSelector.tsx:11',message:'WorkspaceSelector render',data:{iconSize:32,containerSize:'w-8 h-8'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  return (
    <div className={cn(
      'flex gap-2 items-center pl-1 pr-2 py-1 rounded cursor-pointer',
      transitions.default,
      className
    )}
    onMouseEnter={(e) => {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'WorkspaceSelector.tsx:19',message:'onMouseEnter triggered',data:{backgroundColor:colors.interactive.hover},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      (e.currentTarget as HTMLElement).style.backgroundColor = colors.interactive.hover;
    }}
    onMouseLeave={(e) => {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/795e997c-f257-4cd3-b49a-079e5d61a81d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'WorkspaceSelector.tsx:23',message:'onMouseLeave triggered',data:{backgroundColor:'cleared'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      (e.currentTarget as HTMLElement).style.backgroundColor = '';
    }}
    >
      <div className="w-8 h-8 rounded bg-workspace-accent flex items-center justify-center shrink-0 overflow-hidden">
        <WorkspaceIcon size={32} />
      </div>
      <div className="flex flex-col gap-0.5 grow min-w-0">
        <Text
          variant="body"
          size="sm"
          fontFamily="graphik"
          fontWeight="bold"
          color="dark"
          lineHeight="normal"
          className="truncate"
        >
          Acme Sales
        </Text>
        <Text
          variant="label"
          size="9px"
          fontFamily="graphik"
          fontWeight="semibold"
          color="lighter"
          lineHeight="tight"
          uppercase
          className="truncate"
        >
          Sales • 3 members
        </Text>
      </div>
      <WorkspaceChevronIcon />
    </div>
  );
}

