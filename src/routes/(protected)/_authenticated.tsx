import { AppSidebar } from '@/components/main/AppSidebar';
import { MainHeader } from '@/components/main/MainHeader';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { getMyProfile } from '@/services/api/profile';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(protected)/_authenticated')({
  beforeLoad: async () => {
    if (!localStorage.getItem('access_token')) {
      throw redirect({ to: '/login', replace: true });
    }

    try {
      const profile = await getMyProfile();
      return profile;
    } catch (err) {
      if (import.meta.env.DEV) console.error(err);
      else {
        localStorage.removeItem('access_token');
        throw redirect({ to: '/login', replace: true });
      }
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '18rem',
          '--sidebar-width-icon': '4rem',
        } as React.CSSProperties
      }
      defaultOpen={false}
    >
      <AppSidebar />
      <main className="w-full overflow-hidden">
        <TooltipProvider>
          <MainHeader />
          <Outlet />
        </TooltipProvider>
      </main>
    </SidebarProvider>
  );
}
