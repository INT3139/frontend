import { useQueryClient } from '@tanstack/react-query';
import { useRouter, type ErrorComponentProps } from '@tanstack/react-router';
import { Button } from '../ui/button';

export function CustomErrorComponent({ error, reset }: ErrorComponentProps) {
  if (import.meta.env.DEV) console.error('[DEV]: ', error);

  const router = useRouter();

  const queryClient = useQueryClient();

  const handleRetry = () => {
    queryClient.resetQueries({
      predicate: (query) => query.state.status === 'error',
    });

    // Invalidate the router cache to force loaders to re-run
    router.invalidate();
    // Reset the error boundary to re-attempt rendering the main component
    reset();
  };

  return (
    <div className="m-auto flex h-full flex-col items-center justify-center gap-2">
      <h2 className="text-lg font-bold">Đã xảy ra lỗi</h2>
      <p className="text-sm">Vui lòng thử lại sau!</p>
      <Button onClick={handleRetry} variant={'outline'} className="mt-4">
        Thử lại
      </Button>
    </div>
  );
}
