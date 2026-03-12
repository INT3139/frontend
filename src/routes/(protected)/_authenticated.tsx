import { AppSidebar } from '@/components/main/AppSidebar';
import { MainHeader } from '@/components/main/MainHeader';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/(protected)/_authenticated')({
  /* TODO: authenticate user here! */
  beforeLoad: async () => {
    const isLoggedIn = true;
    if (!isLoggedIn) {
      throw redirect({ to: '/login', replace: true });
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
    >
      <AppSidebar />
      <SidebarInset>
        <TooltipProvider>
          <MainHeader />
          <Outlet />
        </TooltipProvider>
      </SidebarInset>
    </SidebarProvider>
  );
}
