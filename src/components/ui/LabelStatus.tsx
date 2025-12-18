import { forwardRef } from 'react';
import type { DocumentStatus } from '../../types';
import { Text } from './Typography';
import { colors } from '../../tokens';
import { cn } from '../../utils/cn';

interface LabelStatusProps {
  type: DocumentStatus;
  className?: string;
}

const LabelStatus = forwardRef<HTMLDivElement, LabelStatusProps>(
  ({ type, className = '' }, ref) => {
    const isToApprove = type === 'To approve';
    
    return (
      <div ref={ref} className={cn('inline-flex items-center', className)}>
        <div
          className="h-4 inline-flex items-center justify-center px-1 rounded"
          style={{
            backgroundColor: isToApprove ? colors.status.orangeLight : '#f4f4f4',
          }}
        >
          <Text
            variant="label"
            size="9px"
            fontFamily="graphik"
            fontWeight="semibold"
            color="light"
            style={isToApprove ? { color: colors.status.orange } : undefined}
            className="uppercase leading-none whitespace-nowrap"
            title={type}
          >
            {type}
          </Text>
        </div>
      </div>
    );
  }
);

LabelStatus.displayName = 'LabelStatus';

export default LabelStatus;

