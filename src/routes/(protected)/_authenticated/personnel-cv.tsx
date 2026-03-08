import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Trang lý lịch cá nhân!</div>;
}
