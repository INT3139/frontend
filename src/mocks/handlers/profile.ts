/* eslint-disable @typescript-eslint/no-explicit-any */
import { type RecruitmentInfo } from '@/schemas/recruitment';
import { ENDPOINTS } from '@/services/endpoints';
import { HttpResponse, http } from 'msw';
import { withAuth } from '../middleware';

const mockProfile: any = {
  id: 2,
  username: 'annv',
  password: '123',
  fullName: 'Nguyễn Văn An',
  emailVnu: 'annv@vnu.edu.vn',
  unitId: 5,
  recruitment: {
    info: {
      id: 1,
      profileId: 2,
      recruitingUnitId: 5,
      recruitmentDate: '2020-01-01',
      salaryForm: 'Hợp đồng',
      previousOccupation: 'Sinh viên',
      eduSectorStartYear: 2020,
      vnuStartDate: '2020-02-01',
      workSeniorityYears: '4',
      longestJob: 'Giảng viên',
      jobGroup: 'Giảng dạy',
      jobPositionVnu: 'Giảng viên',
      jobPositionUnit: 'Giảng viên khoa',
      mainAssignedWork: 'Giảng dạy, nghiên cứu',
      notes: 'Hồ sơ đầy đủ',
    },
    contracts: [
      {
        id: 1,
        profileId: 2,
        contractNumber: 'HD-2020/001',
        contractType: 'Hợp đồng lao động',
        startDate: '2020-01-01',
        endDate: '2023-01-01',
        currentContract: false,
        status: 'expired',
      },
      {
        id: 2,
        profileId: 2,
        contractNumber: 'HD-2023/001',
        contractType: 'Hợp đồng không xác định thời hạn',
        startDate: '2023-01-01',
        endDate: null,
        currentContract: true,
        status: 'active',
      },
    ],
  },
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
  http.put(
    import.meta.env.VITE_MOCK_API_PREFIX + '/profiles/:id',
    withAuth(async ({ request }) => {
      const data = (await request.json()) as Record<string, unknown>;
      Object.assign(mockProfile, data);
      return HttpResponse.json({
        status: 'success',
        data: mockProfile,
      });
    }),
  ),
  http.put(
    import.meta.env.VITE_MOCK_API_PREFIX + '/profiles/:id/recruitment',
    withAuth(async ({ request }) => {
      const data = (await request.json()) as Record<string, unknown>;
      if (!mockProfile.recruitment) {
        mockProfile.recruitment = {
          info: {} as RecruitmentInfo,
          contracts: [],
        };
      }
      mockProfile.recruitment.info = {
        ...(mockProfile.recruitment.info || {}),
        ...data,
      } as any;
      return HttpResponse.json({
        status: 'success',
        data: mockProfile.recruitment.info,
      });
    }),
  ),
];
