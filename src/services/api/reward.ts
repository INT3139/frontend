import type { CommendationRecord } from '@/schemas/personnel-cv/commendation';
import type { DisciplineRecord } from '@/schemas/personnel-cv/discipline';
import type { EmulationTitleRecord } from '@/schemas/personnel-cv/emulation-title';
import API from '@/services/api-client';
import { ENDPOINTS } from '../endpoints';

export type AwardsAndDisciplinesResponse = {
  status: string;
  data: {
    commendations: CommendationRecord[];
    emulation_titles: EmulationTitleRecord[];
    disciplines: DisciplineRecord[];
  };
};

export const getAwardsAndDisciplines =
  async (): Promise<AwardsAndDisciplinesResponse> => {
    const response = await API.get<AwardsAndDisciplinesResponse>(
      ENDPOINTS.reward.me,
    );
    return response.data;
  };
