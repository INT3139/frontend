import { Toaster } from '@/components/ui/sonner';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import * as React from 'react';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools initialIsOpen={false} position="bottom-right" />
    </React.Fragment>
  );
}
