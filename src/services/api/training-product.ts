import { removeFirstSlash } from '@/lib/remove-first-slash';
import type { TrainingProductRecord } from '@/schemas/academic-cv/training-products';
import apiClient from '../api-client';
import { ENDPOINTS } from '../endpoints';

interface TrainingProductsResponse {
  status: string;
  data: TrainingProductRecord[];
}

export const getTrainingProducts = async (
  profileId: number,
): Promise<TrainingProductRecord[]> => {
  const response = await apiClient
    .get(removeFirstSlash(ENDPOINTS.profile.trainingProducts(profileId)))
    .json<TrainingProductsResponse>();

  return response.data;
};

//---------------//

export const addTrainingProduct = async (
  profileId: number,
  data: TrainingProductRecord,
) => {
  const response = await apiClient
    .post(removeFirstSlash(ENDPOINTS.profile.trainingProducts(profileId)), {
      json: data,
    })
    .json<{ data: TrainingProductRecord }>();

  return response.data;
};

//--------------//

export const updateTrainingProduct = async (
  profileId: number,
  trainingProductId: number,
  data: TrainingProductRecord,
) => {
  const response = await apiClient
    .put(
      removeFirstSlash(
        ENDPOINTS.profile.trainingProducts(profileId, trainingProductId),
      ),
      {
        json: data,
      },
    )
    .json<{ data: TrainingProductRecord }>();

  return response.data;
};
export const deleteTrainingProduct = async (
  profileId: number,
  trainingProductId: number,
) => {
  const response = await apiClient
    .delete(
      removeFirstSlash(
        ENDPOINTS.profile.trainingProducts(profileId, trainingProductId),
      ),
    )
    .json();

  return response;
};
