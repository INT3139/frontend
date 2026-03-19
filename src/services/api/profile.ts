import { removeFirstSlash } from '@/lib/remove-first-slash';
import type { TrainingRecord } from '@/schemas/personnel-cv/education';
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
    .put(removeFirstSlash(ENDPOINTS.profile.me.replace('me', id.toString())), {
      json: data,
    })
    .json<MyProfileResponse>();

  return response.data;
};

// Education APIs
export type EducationListResponse = {
  success: boolean;
  data: TrainingRecord[];
};

export type EducationItemResponse = {
  success: boolean;
  data: TrainingRecord;
};

export const getProfileEducation = async (
  id: string,
): Promise<TrainingRecord[]> => {
  const response = await apiClient
    .get(removeFirstSlash(ENDPOINTS.profile.education(id)))
    .json<EducationListResponse>();

  return response.data;
};

export const createProfileEducation = async (
  id: string,
  data: Omit<TrainingRecord, 'id'>,
): Promise<TrainingRecord> => {
  const response = await apiClient
    .post(removeFirstSlash(ENDPOINTS.profile.education(id)), {
      json: data,
    })
    .json<EducationItemResponse>();

  return response.data;
};

export const updateProfileEducation = async (
  id: string,
  subId: string,
  data: Partial<TrainingRecord>,
): Promise<TrainingRecord> => {
  const response = await apiClient
    .put(removeFirstSlash(ENDPOINTS.profile.educationItem(id, subId)), {
      json: data,
    })
    .json<EducationItemResponse>();

  return response.data;
};

export const deleteProfileEducation = async (
  id: string,
  subId: string,
): Promise<boolean> => {
  const response = await apiClient
    .delete(removeFirstSlash(ENDPOINTS.profile.educationItem(id, subId)))
    .json<{ success: boolean }>();

  return response.success;
};
