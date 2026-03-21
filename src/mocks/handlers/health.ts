import {
  HEALTH_RECORD,
  type HealthRecord,
} from '@/schemas/personnel-cv/health';
import { ENDPOINTS } from '@/services/endpoints';
import { HttpResponse, http } from 'msw';
import { withAuth } from '../middleware';

const mockHealthRecord: HealthRecord = {
  [HEALTH_RECORD.HEALTH_STATUS]: 'B1',
  [HEALTH_RECORD.HEIGHT]: 169,
  [HEALTH_RECORD.WEIGHT]: 63,
  [HEALTH_RECORD.BLOOD_TYPE]: 'AB',
  [HEALTH_RECORD.NOTES]:
    'Thoái hóa khớp nhẹ. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
};

export const handlers = [
  http.get(
    import.meta.env.VITE_MOCK_API_PREFIX + ENDPOINTS.profile.health(':userId'),
    withAuth(() => {
      // return new HttpResponse(null, {
      //   status: 500,
      //   statusText: 'Internal Server Error',
      // });

      return HttpResponse.json({
        status: 'success',
        data: mockHealthRecord,
      });
    }),
  ),
];
