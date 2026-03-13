import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/recruitment',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>Hello "/(protected)/_authenticated/personnel-cv/recruitment"!</div>
  );
}
