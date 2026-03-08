import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  // validateSearch: (search) => ({
  //   redirect: (search.redirect as string) || "/",
  // }),
  beforeLoad: () => {
    /* TODO: Redirect if already authenticated */
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Trang đăng nhập</div>;
}
