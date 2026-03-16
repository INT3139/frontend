import { CommendationsTable } from '@/components/main/Awards/CommendationsTable';
import { EmulationTitlesTable } from '@/components/main/Awards/EmulationTitlesTable';
import { DisciplinesTable } from '@/components/main/Disciplines/DisciplinesTable';
import { getAwardsAndDisciplines } from '@/services/api/reward';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/awards-and-disciplines',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['awards-and-disciplines'],
    queryFn: getAwardsAndDisciplines,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex w-full flex-col gap-8">
      <CommendationsTable data={data?.commendations ?? []} />
      <EmulationTitlesTable data={data?.emulation_titles ?? []} />
      <DisciplinesTable data={data?.disciplines ?? []} />
    </div>
  );
}
