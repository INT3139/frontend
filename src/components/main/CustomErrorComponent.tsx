import type { ErrorComponentProps } from '@tanstack/react-router';

export function CustomErrorComponent({ error }: ErrorComponentProps) {
  if (import.meta.env.DEV) console.error(error);
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-lg font-bold">Đã xảy ra lỗi</h2>
      <p className="text-sm">Vui lòng thử lại sau!</p>
    </div>
  );
}
