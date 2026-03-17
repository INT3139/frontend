import { removeFirstSlash } from '@/lib/remove-first-slash';
import type { PartialProfile } from '@/schemas/profile';
import apiClient from '../api-client';
import { ENDPOINTS } from '../endpoints';

export type MyProfileResponse = {
  status: string;
  data: PartialProfile;
};

export const getMyProfile = async (): Promise<MyProfileResponse['data']> => {
  const response = await apiClient
    .get(removeFirstSlash(ENDPOINTS.profile.me))
    .json<MyProfileResponse>();

  return response.data;
};
