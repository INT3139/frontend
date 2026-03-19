import { CommendationsTable } from '@/components/main/Awards/CommendationsTable';
import { EmulationTitlesTable } from '@/components/main/Awards/EmulationTitlesTable';
import { CustomErrorComponent } from '@/components/main/CustomErrorComponent';
import { CustomPendingComponent } from '@/components/main/CustomPendingComponent';
import { DisciplinesTable } from '@/components/main/Disciplines/DisciplinesTable';
import { services } from '@/services/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/awards-and-disciplines',
)({
  component: RouteComponent,
  errorComponent: CustomErrorComponent,
  pendingComponent: CustomPendingComponent,
});

function RouteComponent() {
  const { data } = useSuspenseQuery({
    queryKey: ['awards-and-disciplines'],
    queryFn: services.getAwardsAndDisciplines,
  });

  return (
    <div className="flex w-full flex-col gap-8">
      <CommendationsTable data={data.commendations} />
      <EmulationTitlesTable data={data.emulation_titles} />
      <DisciplinesTable data={data.disciplines} />
    </div>
  );
}
