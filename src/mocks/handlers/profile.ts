import { ENDPOINTS } from '@/services/endpoints';
import { HttpResponse, http } from 'msw';
import { withAuth } from '../middleware';

const mockProfile = {
  id: 2,
  username: 'namnv',
  password: '123',
  fullName: 'Nguyễn Văn Nam',
  emailVnu: 'namnv@vnu.edu.vn',
  unitId: 5,
};

export const handlers = [
  http.get(
    import.meta.env.VITE_MOCK_API_PREFIX + ENDPOINTS.profile.me,
    withAuth(() => {
      return HttpResponse.json({
        status: 'success',
        data: mockProfile,
      });
    }),
  ),
];
