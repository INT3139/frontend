import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/salary',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(protected)/_authenticated/personnel-cv/salary"!</div>
}
