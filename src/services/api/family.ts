import { removeFirstSlash } from '@/lib/remove-first-slash';
import type { UpdateFamilyPayload } from '@/schemas/personnel-cv/family';
import apiClient from '../api-client';
import { ENDPOINTS } from '../endpoints';

export type FamilyResponse = {
  status: string;
  data: UpdateFamilyPayload;
};

export const getFamilyInfo = async (): Promise<FamilyResponse['data']> => {
  const response = await apiClient
    .get(removeFirstSlash(ENDPOINTS.family.me))
    .json<FamilyResponse>();

  return response.data;
};

export const updateFamilyInfo = async (
  payload: UpdateFamilyPayload,
): Promise<FamilyResponse['data']> => {
  const response = await apiClient
    .put(removeFirstSlash(ENDPOINTS.family.me), { json: payload })
    .json<FamilyResponse>();

  return response.data;
};
