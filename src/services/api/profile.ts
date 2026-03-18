import { removeFirstSlash } from '@/lib/remove-first-slash';
import type { Profile } from '@/schemas/profile';
import apiClient from '../api-client';
import { ENDPOINTS } from '../endpoints';

export type MyProfileResponse = {
  status: string;
  data: Profile;
};

export const getMyProfile = async (): Promise<MyProfileResponse['data']> => {
  const response = await apiClient
    .get(removeFirstSlash(ENDPOINTS.profile.me))
    .json<MyProfileResponse>();

  return response.data;
};

export const updateProfile = async (
  id: number,
  data: Partial<Profile>,
): Promise<Profile> => {
  const response = await apiClient
    .put(removeFirstSlash(ENDPOINTS.profile.me).replace('me', id.toString()), {
      json: data,
    })
    .json<MyProfileResponse>();

  return response.data;
};
