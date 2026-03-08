import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/(protected)/_authenticated/academic-cv/projects',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Trang nhiệm vụ KH&CN!</div>;
}
