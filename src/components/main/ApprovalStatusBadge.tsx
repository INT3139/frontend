import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  APPROVAL_STATUS,
  APPROVAL_STATUS_MAP,
  type ApprovalStatus,
} from '@/schemas/personnel-cv/approval';

export function ApprovalStatusBadge({ status }: { status: ApprovalStatus }) {
  return (
    <Badge
      className={cn('px-3', {
        'bg-green-200 text-green-700': status === APPROVAL_STATUS.APPROVED,
        'bg-yellow-200 text-yellow-700': status === APPROVAL_STATUS.PENDING,
        'bg-red-200 text-red-700': status === APPROVAL_STATUS.REJECTED,
      })}
    >
      {APPROVAL_STATUS_MAP[status]}
    </Badge>
  );
}
