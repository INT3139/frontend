import ContractHistory from '@/components/personnel/ContractHistory';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/contract',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <ContractHistory />;
}
