import { removeFirstSlash } from '@/lib/remove-first-slash';
import type { OtherInfo } from '@/schemas/personnel-cv/other';
import apiClient from '../api-client';
import { ENDPOINTS } from '../endpoints';

export type OtherInfoResponse = {
  status: string;
  data: OtherInfo;
};

export const getOtherInfo = async (): Promise<OtherInfoResponse['data']> => {
  const response = await apiClient
    .get(removeFirstSlash(ENDPOINTS.other.me))
    .json<OtherInfoResponse>();

  return response.data;
};

export const updateOtherInfo = async (
  payload: OtherInfo,
): Promise<OtherInfoResponse['data']> => {
  const response = await apiClient
    .put(removeFirstSlash(ENDPOINTS.other.me), { json: payload })
    .json<OtherInfoResponse>();

  return response.data;
};
