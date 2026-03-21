import { APPROVAL_STATUS } from '@/schemas/personnel-cv/approval';
import { ENDPOINTS } from '@/services/endpoints';
import { HttpResponse, http } from 'msw';
import { withAuth } from '../middleware';

let mockFamilyData = {
  myFamily: [
    {
      id: 1,
      quanHe: 'Bố đẻ',
      hoTen: 'Nguyễn Bố',
      namSinh: '1963',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Công nhân',
      trangThai: APPROVAL_STATUS.APPROVED,
    },
    {
      id: 2,
      quanHe: 'Mẹ đẻ',
      hoTen: 'Nguyễn Thị M',
      namSinh: '1966',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Công nhân',
      trangThai: APPROVAL_STATUS.APPROVED,
    },
  ],
  inLawFamily: [
    {
      id: 1,
      quanHe: 'Bố vợ',
      hoTen: 'Nguyễn Bố Vợ',
      namSinh: '1960',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Nông dân',
      trangThai: APPROVAL_STATUS.APPROVED,
    },
    {
      id: 2,
      quanHe: 'Mẹ vợ',
      hoTen: 'Nguyễn Mẹ Vợ',
      namSinh: '1965',
      queQuan: 'Hà Nội',
      ngheNghiep: 'Nông dân',
      trangThai: APPROVAL_STATUS.PENDING,
    },
  ],
};

export const handlers = [
  http.get(
    import.meta.env.VITE_MOCK_API_PREFIX + ENDPOINTS.family.me,
    withAuth(() => {
      return HttpResponse.json({
        status: 'success',
        data: mockFamilyData,
      });
    }),
  ),

  http.put(
    import.meta.env.VITE_MOCK_API_PREFIX + ENDPOINTS.family.me,
    withAuth(async ({ request }) => {
      const payload = await request.json();
      mockFamilyData = payload as typeof mockFamilyData;
      return HttpResponse.json({
        status: 'success',
        data: mockFamilyData,
      });
    }),
  ),
];
