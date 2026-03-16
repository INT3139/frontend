import { removeFirstSlash } from '@/lib/remove-first-slash';
import type { CommendationRecord } from '@/schemas/personnel-cv/commendation';
import type { DisciplineRecord } from '@/schemas/personnel-cv/discipline';
import type { EmulationTitleRecord } from '@/schemas/personnel-cv/emulation-title';
import apiClient from '@/services/api-client';
import { ENDPOINTS } from '../endpoints';

export type AwardsAndDisciplinesResponse = {
  status: string;
  data: {
    commendations: CommendationRecord[];
    emulation_titles: EmulationTitleRecord[];
    disciplines: DisciplineRecord[];
  };
};

export const getAwardsAndDisciplines = async (): Promise<
  AwardsAndDisciplinesResponse['data']
> => {
  const response = await apiClient
    .get(removeFirstSlash(ENDPOINTS.reward.me))
    .json<AwardsAndDisciplinesResponse>();

  return response.data;
};
