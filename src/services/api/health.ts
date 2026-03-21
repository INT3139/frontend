import { removeFirstSlash } from '@/lib/remove-first-slash';
import type { HealthRecord } from '@/schemas/personnel-cv/health';
import apiClient from '../api-client';
import { ENDPOINTS } from '../endpoints';

interface HealthRecordResponse {
  status: string;
  data: HealthRecord;
}

export const getHealthRecord = async (
  profileId: number,
): Promise<HealthRecord> => {
  const response = await apiClient
    .get(removeFirstSlash(ENDPOINTS.profile.health(profileId)))
    .json<HealthRecordResponse>();

  return response.data;
};
