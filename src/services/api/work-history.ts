import { removeFirstSlash } from '@/lib/remove-first-slash';
import { type WorkHistoryRecord } from '@/schemas/personnel-cv/work-history';
import apiClient from '@/services/api-client';
import { ENDPOINTS } from '../endpoints';

export const getWorkHistory = async (
  profileId: number,
): Promise<WorkHistoryRecord[]> => {
  const response = await apiClient
    .get(
      removeFirstSlash(ENDPOINTS.profile.me).replace(
        'me',
        `${profileId}/work-history`,
      ),
    )
    .json<{ success: boolean; data: WorkHistoryRecord[] }>();

  return response.data;
};

export const createWorkHistory = async (
  profileId: number,
  data: Partial<WorkHistoryRecord>,
): Promise<WorkHistoryRecord> => {
  const response = await apiClient
    .post(
      removeFirstSlash(ENDPOINTS.profile.me).replace(
        'me',
        `${profileId}/work-history`,
      ),
      {
        json: data,
      },
    )
    .json<{ success: boolean; data: WorkHistoryRecord }>();

  return response.data;
};

export const updateWorkHistory = async (
  profileId: number,
  subId: string,
  data: Partial<WorkHistoryRecord>,
): Promise<WorkHistoryRecord> => {
  const response = await apiClient
    .put(
      removeFirstSlash(ENDPOINTS.profile.me).replace(
        'me',
        `${profileId}/work-history/${subId}`,
      ),
      {
        json: data,
      },
    )
    .json<{ success: boolean; data: WorkHistoryRecord }>();

  return response.data;
};

export const deleteWorkHistory = async (
  profileId: number,
  subId: string,
): Promise<void> => {
  await apiClient.delete(
    removeFirstSlash(ENDPOINTS.profile.me).replace(
      'me',
      `${profileId}/work-history/${subId}`,
    ),
  );
};
