import { PersonnelSidebar } from '@/components/main/PersonnelSidebar';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv',
)({
  component: RouteComponent,
});
function RouteComponent() {
  return (
    <div className="flex w-full">
      <PersonnelSidebar />
      <div className="w-full overflow-hidden bg-gray-50 p-6">
        <Outlet />
      </div>
    </div>
  );
}
