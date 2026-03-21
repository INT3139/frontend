/* eslint-disable @typescript-eslint/no-explicit-any */
import { type RecruitmentInfo } from '@/schemas/recruitment';
import { ENDPOINTS } from '@/services/endpoints';
import { HttpResponse, http } from 'msw';
import { withAuth } from '../middleware';

// 1. Đổi tên thành defaultProfile
const defaultProfile: any = {
  id: 2,
  username: 'annv',
  password: '123',
  fullName: 'Nguyễn Văn An',
  emailVnu: 'annv@vnu.edu.vn',
  unitId: 5,
  idNumber: '123456789',
  idIssuedDate: '2020-01-01',
  idIssuedBy: 'Công an Hà Nội',
  phoneWork: '0123456789',
  phoneHome: '0123456789',
  employmentStatus: 'active',
  emailPersonal: 'annv@gmail.com',
  nationality: 'Việt Nam',
  ethnicity: 'Kinh',
  religion: 'Không',
  nickName: 'An',
  policyObject: 'Không',
  insuranceNumber: '123456789',
  insuranceJoinedAt: '2020-01-01',
  maritalStatus: 'single',
  passportNumber: '123456789',
  passportIssuedAt: '2020-01-01',
  passportIssuedBy: 'Công an Hà Nội',
  academicDegree: 'bachelor',
  academicTitle: 'gs',
  eduLevelGeneral: 'Đại học',
  stateManagement: 'sơ cấp',
  politicalTheory: 'sơ cấp',
  foreignLangLevel: 'C1',
  itLevel: 'C1',
  addrHometown: {
    street: 'Số 123, đường Nguyễn Trãi',
    ward: 'Phường Thanh Xuân',
    district: 'Quận Thanh Xuân',
    province: 'Hà Nội',
    country: 'Việt Nam',
  },
  addrPermanent: {
    street: 'Số 123, đường Nguyễn Trãi',
    ward: 'Phường Thanh Xuân',
    district: 'Quận Thanh Xuân',
    province: 'Hà Nội',
    country: 'Việt Nam',
  },
  addrBirthplace: {
    street: 'Số 123, đường Nguyễn Trãi',
    ward: 'Phường Thanh Xuân',
    district: 'Quận Thanh Xuân',
    province: 'Hà Nội',
    country: 'Việt Nam',
  },
  addrCurrent: {
    street: 'Số 123, đường Nguyễn Trãi',
    ward: 'Phường Thanh Xuân',
    district: 'Quận Thanh Xuân',
    province: 'Hà Nội',
    country: 'Việt Nam',
  },
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

// 2. Khởi tạo mockProfile từ LocalStorage (chống F5 mất data)
let mockProfile: any = { ...defaultProfile };
try {
  const savedData = localStorage.getItem('mockProfile_hieu');
  if (savedData) {
    mockProfile = JSON.parse(savedData);
  }
} catch (error) {
  console.error('Lỗi khi lấy dữ liệu từ localStorage', error);
}

let mockEducation: any[] = [
  {
    id: '1',
    eduType: 'degree',
    fromDate: '1998-09-01',
    toDate: '2002-07-01',
    degreeLevel: 'Cử nhân',
    institution: 'Khoa CN, ĐHQGHN',
    major: 'CNTT',
    trainingForm: 'Chính quy',
    field: 'Khoa học công nghệ - kỹ thuật',
    isStudying: false,
    approvalStatus: 'approved',
  },
  {
    id: '2',
    eduType: 'degree',
    fromDate: '2004-09-15',
    toDate: '2006-09-15',
    degreeLevel: 'Thạc sĩ',
    institution: 'Viện KH&CN Tiên Tiến Nhật Bản',
    major: 'CNTT',
    trainingForm: 'Chính quy',
    field: 'Khoa học công nghệ - kỹ thuật',
    isStudying: false,
    approvalStatus: 'approved',
  },
];

let mockWorkHistory: any[] = [
  {
    id: '1',
    historyType: 'chinh_quyen',
    fromDate: '2010-09-01',
    toDate: '2015-08-31',
    unitName: 'Trường Đại học Công nghệ, ĐHQGHN',
    positionName: 'Giảng viên',
    activityType: 'Giảng dạy',
    status: 'approved',
  },
  {
    id: '2',
    historyType: 'chinh_quyen',
    fromDate: '2015-09-01',
    toDate: null,
    unitName: 'Trường Đại học Công nghệ, ĐHQGHN',
    positionName: 'Phó Trưởng khoa',
    activityType: 'Quản lý',
    status: 'approved',
  },
  {
    id: '3',
    historyType: 'dang',
    fromDate: '2018-05-19',
    toDate: null,
    unitName: 'Chi bộ Khoa CNTT',
    positionName: 'Bí thư',
    activityType: 'Hoạt động Đảng',
    status: 'approved',
  },
];

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

  // 3. API PUT xử lý lưu vào LocalStorage
  http.put(
    import.meta.env.VITE_MOCK_API_PREFIX + ENDPOINTS.profile.me,
    withAuth(async ({ request }) => {
      const data = (await request.json()) as Record<string, unknown>;

      Object.assign(mockProfile, data);

      // Lưu thẳng vào trình duyệt
      localStorage.setItem('mockProfile_hieu', JSON.stringify(mockProfile));

      return HttpResponse.json({
        status: 'success',
        message: 'Cập nhật thông tin thành công',
        data: mockProfile,
      });
    }),
  ),

  http.put(
    import.meta.env.VITE_MOCK_API_PREFIX + '/profiles/:id',
    withAuth(async ({ request }) => {
      const data = (await request.json()) as Record<string, unknown>;
      Object.assign(mockProfile, data);
      localStorage.setItem('mockProfile_hieu', JSON.stringify(mockProfile));
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

  http.get(
    import.meta.env.VITE_MOCK_API_PREFIX + '/profiles/:id/education',
    withAuth(() => {
      return HttpResponse.json({
        success: true,
        data: mockEducation,
      });
    }),
  ),

  http.post(
    import.meta.env.VITE_MOCK_API_PREFIX + '/profiles/:id/education',
    withAuth(async ({ request }) => {
      const data = (await request.json()) as any;
      const newRecord = {
        ...data,
        id: Math.random().toString(36).substring(7),
        approvalStatus: 'pending',
      };
      mockEducation.push(newRecord);
      return HttpResponse.json({
        success: true,
        data: newRecord,
      });
    }),
  ),

  http.put(
    import.meta.env.VITE_MOCK_API_PREFIX + '/profiles/:id/education/:subId',
    withAuth(async ({ request, params }) => {
      const { subId } = params;
      const data = (await request.json()) as any;
      const index = mockEducation.findIndex((item) => item.id === subId);
      if (index !== -1) {
        mockEducation[index] = { ...mockEducation[index], ...data };
        return HttpResponse.json({
          success: true,
          data: mockEducation[index],
        });
      }
      return HttpResponse.json({ success: false }, { status: 404 });
    }),
  ),

  http.delete(
    import.meta.env.VITE_MOCK_API_PREFIX + '/profiles/:id/education/:subId',
    withAuth(({ params }) => {
      const { subId } = params;
      mockEducation = mockEducation.filter((item) => item.id !== subId);
      return HttpResponse.json({ success: true });
    }),
  ),

  http.get(
    import.meta.env.VITE_MOCK_API_PREFIX + '/profiles/:id/work-history',
    withAuth(() => {
      return HttpResponse.json({
        success: true,
        data: mockWorkHistory,
      });
    }),
  ),

  http.post(
    import.meta.env.VITE_MOCK_API_PREFIX + '/profiles/:id/work-history',
    withAuth(async ({ request }) => {
      const data = (await request.json()) as any;
      const newRecord = {
        ...data,
        id: Math.random().toString(36).substring(7),
        status: 'pending',
      };
      mockWorkHistory.push(newRecord);
      return HttpResponse.json({
        success: true,
        data: newRecord,
      });
    }),
  ),

  http.put(
    import.meta.env.VITE_MOCK_API_PREFIX + '/profiles/:id/work-history/:subId',
    withAuth(async ({ request, params }) => {
      const { subId } = params;
      const data = (await request.json()) as any;
      const index = mockWorkHistory.findIndex((item) => item.id === subId);
      if (index !== -1) {
        mockWorkHistory[index] = { ...mockWorkHistory[index], ...data };
        return HttpResponse.json({
          success: true,
          data: mockWorkHistory[index],
        });
      }
      return HttpResponse.json({ success: false }, { status: 404 });
    }),
  ),

  http.delete(
    import.meta.env.VITE_MOCK_API_PREFIX + '/profiles/:id/work-history/:subId',
    withAuth(({ params }) => {
      const { subId } = params;
      mockWorkHistory = mockWorkHistory.filter((item) => item.id !== subId);
      return HttpResponse.json({ success: true });
    }),
  ),
];
