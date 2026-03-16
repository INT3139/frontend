import { LoginForm } from '@/components/main/LoginForm';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  // validateSearch: (search) => ({
  //   redirect: (search.redirect as string) || "/",
  // }),
  beforeLoad: async () => {
    if (localStorage.getItem('access_token')) {
      throw redirect({ to: '/', replace: true });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-accent-foreground flex h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}
