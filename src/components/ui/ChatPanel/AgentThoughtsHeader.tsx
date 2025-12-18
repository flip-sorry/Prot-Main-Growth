import { colors, spacing, typography } from '../../../tokens';
import { cn } from '../../../utils/cn';
import { AgentType } from '../../../services/agents/types';

interface AgentThoughtsHeaderProps {
  state?: 'Loading' | 'Reasoning';
  showReasoning?: boolean;
  className?: string;
  currentAgent?: AgentType;
  isProcessing?: boolean;
}

export default function AgentThoughtsHeader({ 
  state = 'Loading', 
  showReasoning = false,
  className,
  currentAgent,
  isProcessing = true,
}: AgentThoughtsHeaderProps) {
  const getAgentName = (agent?: AgentType): string => {
    if (!agent) return '';
    const names: Record<AgentType, string> = {
      [AgentType.FILE_ORGANIZER]: 'File Organizer',
      [AgentType.DOCUMENT_ANALYTIC]: 'Document Analytic',
      [AgentType.FILE_MANAGER]: 'File Manager',
      [AgentType.SALES_AGENT]: 'Sales Agent',
      [AgentType.KNOWLEDGE_BASE]: 'Knowledge Base',
      [AgentType.HELP_CENTER]: 'Help Center',
    };
    return names[agent];
  };

  return (
    <div
      className={cn(
        'flex flex-col',
        'items-start',
        'w-full',
        'overflow-hidden',
        'rounded-bl-[8px]',
        'rounded-br-[8px]',
        'rounded-tr-[8px]',
        className
      )}
      style={{
        gap: spacing[1], // 4px
        paddingTop: spacing[2], // 8px
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <div
        className={cn(
          'flex',
          'items-center',
          'h-[16px]',
          'shrink-0',
          'gap-2'
        )}
        style={{
          gap: spacing[2], // 8px
        }}
      >
        <p
          style={{
            fontFamily: typography.fontFamily.graphik,
            fontSize: typography.fontSize.xs, // 12px
            lineHeight: '15px',
            fontWeight: typography.fontWeight.normal,
            margin: 0,
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0px',
          }}
        >
          {isProcessing ? (
            <>
              <span className="thinking-text-shimmer">Thinking</span>
              <span className="thinking-dot" style={{ animationDelay: '0s' }}>.</span>
              <span className="thinking-dot" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="thinking-dot" style={{ animationDelay: '0.4s' }}>.</span>
            </>
          ) : (
            <span style={{ color: colors.text.lighter }}>Processing</span>
          )}
        </p>
        {currentAgent && (
          <span
            style={{
              fontFamily: typography.fontFamily.graphik,
              fontSize: typography.fontSize.xs, // 12px
              lineHeight: '15px',
              fontWeight: typography.fontWeight.normal,
              color: colors.text.lighter,
            }}
          >
            • {getAgentName(currentAgent)}
          </span>
        )}
      </div>
      <style>{`
        .thinking-text-shimmer {
          background: linear-gradient(
            90deg,
            #767676 0%,
            #9a9a9a 25%,
            #b8b8b8 50%,
            #9a9a9a 75%,
            #767676 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: textShimmer 2s ease-in-out infinite;
        }
        
        .thinking-dot {
          display: inline-block;
          color: #767676;
          animation: dotBounce 1.4s ease-in-out infinite;
        }
        
        @keyframes textShimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @keyframes dotBounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          40% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

