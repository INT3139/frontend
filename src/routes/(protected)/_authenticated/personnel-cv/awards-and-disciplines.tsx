import { CommendationsTable } from '@/components/main/Awards/CommendationsTable';
import { EmulationTitlesTable } from '@/components/main/Awards/EmulationTitlesTable';
import { DisciplinesTable } from '@/components/main/Disciplines/DisciplinesTable';
import { services } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/awards-and-disciplines',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['awards-and-disciplines'],
    queryFn: services.getAwardsAndDisciplines,
  });

  if (isLoading)
    return (
      <div className="flex h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (error) {
    if (import.meta.env.DEV) console.error(error);
    throw error;
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <CommendationsTable data={data?.commendations ?? []} />
      <EmulationTitlesTable data={data?.emulation_titles ?? []} />
      <DisciplinesTable data={data?.disciplines ?? []} />
    </div>
  );
}
