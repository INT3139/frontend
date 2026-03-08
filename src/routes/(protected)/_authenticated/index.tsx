import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(protected)/_authenticated/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Trang chủ</div>;
}
