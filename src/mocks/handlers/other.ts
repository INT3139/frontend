import { ENDPOINTS } from '@/services/endpoints';
import { HttpResponse, http } from 'msw';
import { withAuth } from '../middleware';

let mockOtherInfo = {
  khaiRoTienAn: '',
  lamViecCheDoCu: '',
  quanHeToChucNuocNgoai: '',
  thanNhanNuocNgoai: '',
  luong: '',
  nhaO: '',
  datO: '',
  nguonKhac: '',
  tongDienTich: '',
  datTuMua: '',
};

export const handlers = [
  http.get(
    import.meta.env.VITE_MOCK_API_PREFIX + ENDPOINTS.other.me,
    withAuth(() => {
      return HttpResponse.json({
        status: 'success',
        data: mockOtherInfo,
      });
    }),
  ),

  http.put(
    import.meta.env.VITE_MOCK_API_PREFIX + ENDPOINTS.other.me,
    withAuth(async ({ request }) => {
      const payload = await request.json();
      mockOtherInfo = payload as typeof mockOtherInfo;
      return HttpResponse.json({
        status: 'success',
        data: mockOtherInfo,
      });
    }),
  ),
];
