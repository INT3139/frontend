import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/work-history',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/(protected)/_authenticated/personnel-cv/work-history"!</div>
  )
}
