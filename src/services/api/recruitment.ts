import { removeFirstSlash } from '@/lib/remove-first-slash';
import type { RecruitmentInfo } from '@/schemas/recruitment';
import apiClient from '../api-client';
import { ENDPOINTS } from '../endpoints';

export const updateRecruitmentInfo = async (
  profileId: number,
  data: Partial<RecruitmentInfo>,
): Promise<void> => {
  const response = await apiClient
    .put(
      removeFirstSlash(ENDPOINTS.profile.me).replace(
        'me',
        `${profileId}/recruitment`,
      ),
      {
        json: data,
      },
    )
    .json<{ status: string; data: unknown }>();

  return response.data as void;
};
