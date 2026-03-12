export const isRouteActive = (pathname: string, to: string | undefined) => {
  if (!to || to === '/') return false;
  return pathname.startsWith(to);
};
