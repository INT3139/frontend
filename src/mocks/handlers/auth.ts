import type { LoginRequestBody, LoginResponseBody } from '@/services/api/auth';
import { ENDPOINTS } from '@/services/endpoints';
import { HttpResponse, http } from 'msw';

const mockUser = {
  id: 2,
  username: 'namnv',
  password: '123',
  fullName: 'Nguyễn Văn Nam',
  emailVnu: 'namnv@vnu.edu.vn',
  unitId: 5,
};

export const handlers = [
  http.post<object, LoginRequestBody, LoginResponseBody>(
    import.meta.env.VITE_MOCK_API_PREFIX + ENDPOINTS.auth.login,
    async ({ request }) => {
      const { username, password } = await request.json();

      if (username !== mockUser.username || password !== mockUser.password) {
        return HttpResponse.json({
          success: false,
          data: {
            user: null,
          },
        });
      }

      //Generate mock accessToken and refreshToken
      const accessToken = 'mockAccessToken';
      const refreshToken = 'mockRefreshToken';

      return HttpResponse.json({
        success: true,
        data: {
          user: mockUser,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
    },
  ),
];
