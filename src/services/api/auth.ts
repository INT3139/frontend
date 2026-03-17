import { removeFirstSlash } from '@/lib/remove-first-slash';
import apiClient from '@/services/api-client';
import { ENDPOINTS } from '../endpoints';

export type LoginRequestBody = {
  username: string;
  password: string;
};

export type LoginResponseBody = {
  success: boolean;
  data: {
    user?: {
      id: number;
      username: string;
      emailVnu: string;
      fullName: string;
      unitId: number;
    } | null;
    accessToken?: string;
    refreshToken?: string;
  };
};

export const login = async (
  body: LoginRequestBody,
): Promise<LoginResponseBody> => {
  const response = await apiClient
    .post(removeFirstSlash(ENDPOINTS.auth.login), {
      json: body,
    })
    .json<LoginResponseBody>();

  console.log('Login response: ', response);

  return response;
};
