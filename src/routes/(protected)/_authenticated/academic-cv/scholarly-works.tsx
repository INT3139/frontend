import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/(protected)/_authenticated/academic-cv/scholarly-works',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Trang sách chuyên khảo/giáo trình!</div>;
}
