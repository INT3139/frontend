import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { CircleOff } from 'lucide-react';

export function CustomEmpty() {
  return (
    <Empty className="md:pt-0">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CircleOff />
        </EmptyMedia>
        <EmptyTitle className="text-base">Không có dữ liệu</EmptyTitle>
      </EmptyHeader>
    </Empty>
  );
}
