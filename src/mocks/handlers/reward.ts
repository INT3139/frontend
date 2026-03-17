import { APPROVAL_STATUS } from '@/schemas/personnel-cv/approval';
import { AWARD_SCOPES } from '@/schemas/personnel-cv/award-scope';
import { type CommendationRecord } from '@/schemas/personnel-cv/commendation';
import type { DisciplineRecord } from '@/schemas/personnel-cv/discipline';
import type { EmulationTitleRecord } from '@/schemas/personnel-cv/emulation-title';
import { ENDPOINTS } from '@/services/endpoints';
import { HttpResponse, http } from 'msw';
import { withAuth } from '../middleware';

const mockCommendations: CommendationRecord[] = [
  {
    decisionNumber: '121/QĐ-TW',
    decisionDate: '19/05/2025',
    awardScope: AWARD_SCOPES.NATIONAL,
    awardName: 'Giải thưởng Hồ Chí Minh',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    academicYear: '2025',
    isHighestLevel: true,
    approvalStatus: APPROVAL_STATUS.PENDING,
    attachmentUrl: null,
  },
  {
    decisionNumber: '99/QĐ-TW',
    decisionDate: '19/05/2025',
    awardScope: AWARD_SCOPES.NATIONAL,
    awardName: 'Giải thưởng Hồ Chí Minh',
    content: 'Công trình nghiên cứu khoa học cấp quốc gia đặc biệt xuất sắc',
    academicYear: '2025',
    isHighestLevel: true,
    approvalStatus: APPROVAL_STATUS.PENDING,
    attachmentUrl: null,
  },
  {
    decisionNumber: '445/QĐ-LĐ',
    decisionDate: '22/12/2024',
    awardScope: AWARD_SCOPES.MINISTERIAL,
    awardName: 'Kỷ niệm chương Vì sự nghiệp giáo dục',
    content: 'Có thời gian công tác 10 năm trong ngành giáo dục',
    academicYear: '2024',
    isHighestLevel: false,
    approvalStatus: APPROVAL_STATUS.APPROVED,
    attachmentUrl: null,
  },
  {
    decisionNumber: '12/BC-VNU',
    decisionDate: '10/01/2023',
    awardScope: AWARD_SCOPES.INSTITUTIONAL,
    awardName: 'Giải thưởng Công trình khoa học tiêu biểu ĐHQG',
    content: 'Nghiên cứu về ứng dụng AI trong quản trị nhân sự',
    academicYear: '2022-2023',
    isHighestLevel: false,
    approvalStatus: APPROVAL_STATUS.APPROVED,
    attachmentUrl: null,
  },
  {
    decisionNumber: '567/QĐ-ĐHCN',
    decisionDate: '30/08/2022',
    awardScope: AWARD_SCOPES.GRASSROOTS,
    awardName: 'Giấy khen của Hiệu trưởng',
    content: 'Hoàn thành xuất sắc nhiệm vụ năm học',
    academicYear: '2021-2022',
    isHighestLevel: false,
    approvalStatus: APPROVAL_STATUS.PENDING,
    attachmentUrl: null,
  },
  {
    decisionNumber: '',
    decisionDate: '12/06/2021',
    awardScope: AWARD_SCOPES.GRASSROOTS,
    awardName: 'Chiến sĩ thi đua cấp cơ sở',
    content: 'Đạt danh hiệu Chiến sĩ thi đua cấp cơ sở năm học 2020-2021',
    academicYear: '2020-2021',
    isHighestLevel: false,
    approvalStatus: APPROVAL_STATUS.REJECTED,
    attachmentUrl: null,
  },
  {
    decisionNumber: '88/QĐ-TTg',
    decisionDate: '02/09/2020',
    awardScope: AWARD_SCOPES.NATIONAL,
    awardName: 'Huân chương Lao động hạng Ba',
    content: 'Cống hiến đặc biệt cho sự nghiệp giáo dục và đào tạo',
    academicYear: '',
    isHighestLevel: true,
    approvalStatus: APPROVAL_STATUS.PENDING,
    attachmentUrl: null,
  },
  {
    decisionNumber: '',
    decisionDate: '20/11/2018',
    awardScope: AWARD_SCOPES.MINISTERIAL,
    awardName: 'Bằng khen của Bộ trưởng Bộ Giáo dục và Đào tạo',
    content: 'Đổi mới sáng tạo trong quản lý giáo dục đại học',
    academicYear: '2018',
    isHighestLevel: false,
    approvalStatus: APPROVAL_STATUS.APPROVED,
    attachmentUrl: null,
  },
  {
    decisionNumber: '256/QĐ-ĐHQG',
    decisionDate: '15/05/2015',
    awardScope: AWARD_SCOPES.INSTITUTIONAL,
    awardName: 'Giảng viên tiêu biểu cấp ĐHQG',
    content:
      'Có thành tích xuất sắc trong công tác giảng dạy giai đoạn 2010-2015',
    academicYear: '',
    isHighestLevel: false,
    approvalStatus: APPROVAL_STATUS.APPROVED,
    attachmentUrl: null,
  },
  {
    decisionNumber: '',
    decisionDate: '04/01/2013',
    awardScope: AWARD_SCOPES.NATIONAL,
    awardName: 'Tài năng trẻ KHCN năm 2013',
    content: 'Tài năng trẻ KHCN năm 2013',
    academicYear: '2013',
    isHighestLevel: false,
    approvalStatus: APPROVAL_STATUS.APPROVED,
    attachmentUrl: null,
  },
  {
    decisionNumber: '1112/QĐ-CTSV',
    decisionDate: '03/12/2010',
    awardScope: AWARD_SCOPES.GRASSROOTS,
    awardName: 'Gương mặt trẻ tiêu biểu cấp cơ sở năm 2010',
    content: 'Gương mặt trẻ tiêu biểu cấp cơ sở năm 2010',
    academicYear: '2010-2011',
    isHighestLevel: false,
    approvalStatus: APPROVAL_STATUS.APPROVED,
    attachmentUrl: null,
  },
  {
    decisionNumber: '567/QĐ-ĐHCN',
    decisionDate: '30/08/2022',
    awardScope: AWARD_SCOPES.GRASSROOTS,
    awardName: 'Giấy khen của Hiệu trưởng',
    content: 'Hoàn thành xuất sắc nhiệm vụ năm học',
    academicYear: '2021-2022',
    isHighestLevel: false,
    approvalStatus: APPROVAL_STATUS.PENDING,
    attachmentUrl: null,
  },
  {
    decisionNumber: '567/QĐ-ĐHCN',
    decisionDate: '30/08/2022',
    awardScope: AWARD_SCOPES.GRASSROOTS,
    awardName: 'Giấy khen của Hiệu trưởng',
    content: 'Hoàn thành xuất sắc nhiệm vụ năm học',
    academicYear: '2021-2022',
    isHighestLevel: false,
    approvalStatus: APPROVAL_STATUS.PENDING,
    attachmentUrl: null,
  },
  {
    decisionNumber: '567/QĐ-ĐHCN',
    decisionDate: '30/08/2022',
    awardScope: AWARD_SCOPES.GRASSROOTS,
    awardName: 'Giấy khen của Hiệu trưởng',
    content: 'Hoàn thành xuất sắc nhiệm vụ năm học',
    academicYear: '2021-2022',
    isHighestLevel: false,
    approvalStatus: APPROVAL_STATUS.PENDING,
    attachmentUrl: null,
  },
  {
    decisionNumber: '567/QĐ-ĐHCN',
    decisionDate: '30/08/2022',
    awardScope: AWARD_SCOPES.GRASSROOTS,
    awardName: 'Giấy khen của Hiệu trưởng',
    content: 'Hoàn thành xuất sắc nhiệm vụ năm học',
    academicYear: '2021-2022',
    isHighestLevel: false,
    approvalStatus: APPROVAL_STATUS.PENDING,
    attachmentUrl: null,
  },
  {
    decisionNumber: '567/QĐ-ĐHCN',
    decisionDate: '30/08/2022',
    awardScope: AWARD_SCOPES.GRASSROOTS,
    awardName: 'Giấy khen của Hiệu trưởng',
    content: 'Hoàn thành xuất sắc nhiệm vụ năm học',
    academicYear: '2021-2022',
    isHighestLevel: false,
    approvalStatus: APPROVAL_STATUS.PENDING,
    attachmentUrl: null,
  },
];

const mockEmulationTitles: EmulationTitleRecord[] = [
  {
    decisionNumber: '121/QĐ-TW',
    decisionDate: '19/05/2025',
    titleName: 'Chiến sĩ thi đua toàn quốc',
    isHighestLevel: true,
    approvalStatus: APPROVAL_STATUS.PENDING,
    attachmentUrl: null,
  },
  {
    decisionNumber: null,
    decisionDate: '12/05/2020',
    titleName: 'Chiến sĩ thi đua cấp ĐHQGHN',
    isHighestLevel: false,
    approvalStatus: APPROVAL_STATUS.REJECTED,
    attachmentUrl: null,
  },
  {
    decisionNumber: '42/QĐ-DHCN',
    decisionDate: '23/08/2018',
    titleName: 'Chiến sĩ thi đua cấp cơ sở',
    isHighestLevel: false,
    approvalStatus: APPROVAL_STATUS.APPROVED,
    attachmentUrl: null,
  },
];

const mockDisciplines: DisciplineRecord[] = [];

export const handlers = [
  http.get(
    import.meta.env.VITE_MOCK_API_PREFIX + ENDPOINTS.reward.me,
    withAuth(() => {
      // return new HttpResponse(null, {
      //   status: 500,
      //   statusText: 'Internal Server Error',
      // });

      return HttpResponse.json({
        status: 'success',
        data: {
          commendations: mockCommendations,
          emulation_titles: mockEmulationTitles,
          disciplines: mockDisciplines,
        },
      });
    }),
  ),

  http.post(
    import.meta.env.VITE_MOCK_API_PREFIX + ENDPOINTS.reward.commendation,
    withAuth(() => {
      return HttpResponse.json({
        status: 'success',
        data: {},
      });
    }),
  ),
];
