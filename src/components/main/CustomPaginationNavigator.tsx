import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export function CustomPaginationNavigator({
  onClick,
  disabled,
  isNext,
}: React.ComponentProps<typeof Button> & {
  isNext?: boolean;
}) {
  return (
    <Button variant="ghost" size="sm" onClick={onClick} disabled={disabled}>
      {!isNext && <ChevronLeftIcon />}
      <span className="hidden sm:block">{!isNext ? 'Trước' : 'Sau'}</span>
      {isNext && <ChevronRightIcon />}
    </Button>
  );
}
