import { PersonnelSidebar } from '@/components/main/PersonnelSidebar';
import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen w-full">
      <PersonnelSidebar />
      <div className="grow bg-gray-50 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
