import { colors, spacing, typography } from '../../../tokens';
import { cn } from '../../../utils/cn';
import type { AgentThought } from '../../../services/agents/types';
import { AgentType } from '../../../services/agents/types';

interface AgentThoughtsProps {
  thoughts: AgentThought[];
  currentAgent?: AgentType;
  className?: string;
}

export default function AgentThoughts({ 
  thoughts, 
  currentAgent,
  className 
}: AgentThoughtsProps) {
  if (thoughts.length === 0) {
    return null;
  }

  const getAgentName = (agent: AgentType): string => {
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
        className
      )}
      style={{
        gap: spacing[2], // 8px
      }}
    >
      {thoughts.map((thought, index) => (
        <div
          key={thought.id}
          className={cn(
            'flex flex-col',
            'items-start',
            'w-full',
            'animate-fade-in'
          )}
          style={{
            gap: spacing[1], // 4px
            paddingTop: index > 0 ? spacing[2] : 0, // 8px spacing between thoughts
          }}
        >
          {/* Step label */}
          <div
            className={cn(
              'flex',
              'items-center',
              'gap-2'
            )}
          >
            <span
              style={{
                fontFamily: typography.fontFamily.graphik,
                fontSize: typography.fontSize.xs, // 12px
                lineHeight: '15px',
                fontWeight: typography.fontWeight.semibold,
                color: colors.text.dark,
              }}
            >
              {thought.step}
            </span>
            {thought.agent !== AgentType.HELP_CENTER && (
              <span
                style={{
                  fontFamily: typography.fontFamily.graphik,
                  fontSize: typography.fontSize.xs, // 12px
                  lineHeight: '15px',
                  fontWeight: typography.fontWeight.normal,
                  color: colors.text.lighter,
                }}
              >
                • {getAgentName(thought.agent)}
              </span>
            )}
          </div>
          
          {/* Reasoning */}
          <p
            style={{
              fontFamily: typography.fontFamily.graphik,
              fontSize: typography.fontSize.sm, // 14px
              lineHeight: '17px',
              color: colors.text.lighter,
              fontWeight: typography.fontWeight.normal,
              margin: 0,
            }}
          >
            {thought.reasoning}
          </p>
        </div>
      ))}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

