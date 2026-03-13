import { CommendationsTable } from '@/components/main/Awards/CommendationsTable';
import { EmulationTitlesTable } from '@/components/main/Awards/EmulationTitlesTable';
import { DisciplinesTable } from '@/components/main/Disciplines/DisciplinesTable';
import { APPROVAL_STATUS } from '@/schemas/personnel-cv/approval';
import { AWARD_SCOPES } from '@/schemas/personnel-cv/award-scope';
import { type CommendationRecord } from '@/schemas/personnel-cv/commendation';
import type { DisciplineRecord } from '@/schemas/personnel-cv/discipline';
import type { EmulationTitleRecord } from '@/schemas/personnel-cv/emulation-title';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/awards-and-disciplines',
)({
  component: RouteComponent,
});

const mockCommendations: CommendationRecord[] = [
  {
    decision_number: '121/QĐ-TW',
    decision_date: '19/05/2025',
    award_scope: AWARD_SCOPES.NATIONAL,
    award_name: 'Giải thưởng Hồ Chí Minh',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
    academic_year: '2025',
    is_highest_level: true,
    approval_status: APPROVAL_STATUS.PENDING,
  },
  {
    decision_number: '99/QĐ-TW',
    decision_date: '19/05/2025',
    award_scope: AWARD_SCOPES.NATIONAL,
    award_name: 'Giải thưởng Hồ Chí Minh',
    content: 'Công trình nghiên cứu khoa học cấp quốc gia đặc biệt xuất sắc',
    academic_year: '2025',
    is_highest_level: true,
    approval_status: APPROVAL_STATUS.PENDING,
  },
  {
    decision_number: '445/QĐ-LĐ',
    decision_date: '22/12/2024',
    award_scope: AWARD_SCOPES.MINISTERIAL,
    award_name: 'Kỷ niệm chương Vì sự nghiệp giáo dục',
    content: 'Có thời gian công tác 10 năm trong ngành giáo dục',
    academic_year: '2024',
    is_highest_level: false,
    approval_status: APPROVAL_STATUS.APPROVED,
  },
  {
    decision_number: '12/BC-VNU',
    decision_date: '10/01/2023',
    award_scope: AWARD_SCOPES.INSTITUTIONAL,
    award_name: 'Giải thưởng Công trình khoa học tiêu biểu ĐHQG',
    content: 'Nghiên cứu về ứng dụng AI trong quản trị nhân sự',
    academic_year: '2022-2023',
    is_highest_level: false,
    approval_status: APPROVAL_STATUS.APPROVED,
  },
  {
    decision_number: '567/QĐ-ĐHCN',
    decision_date: '30/08/2022',
    award_scope: AWARD_SCOPES.GRASSROOTS,
    award_name: 'Giấy khen của Hiệu trưởng',
    content: 'Hoàn thành xuất sắc nhiệm vụ năm học',
    academic_year: '2021-2022',
    is_highest_level: false,
    approval_status: APPROVAL_STATUS.PENDING,
  },
  {
    decision_number: null,
    decision_date: '12/06/2021',
    award_scope: AWARD_SCOPES.GRASSROOTS,
    award_name: 'Chiến sĩ thi đua cấp cơ sở',
    content: 'Đạt danh hiệu Chiến sĩ thi đua cấp cơ sở năm học 2020-2021',
    academic_year: '2020-2021',
    is_highest_level: false,
    approval_status: APPROVAL_STATUS.REJECTED,
  },
  {
    decision_number: '88/QĐ-TTg',
    decision_date: '02/09/2020',
    award_scope: AWARD_SCOPES.NATIONAL,
    award_name: 'Huân chương Lao động hạng Ba',
    content: 'Cống hiến đặc biệt cho sự nghiệp giáo dục và đào tạo',
    academic_year: null,
    is_highest_level: true,
    approval_status: APPROVAL_STATUS.PENDING,
  },
  {
    decision_number: null,
    decision_date: '20/11/2018',
    award_scope: AWARD_SCOPES.MINISTERIAL,
    award_name: 'Bằng khen của Bộ trưởng Bộ Giáo dục và Đào tạo',
    content: 'Đổi mới sáng tạo trong quản lý giáo dục đại học',
    academic_year: '2018',
    is_highest_level: false,
    approval_status: APPROVAL_STATUS.APPROVED,
  },
  {
    decision_number: '256/QĐ-ĐHQG',
    decision_date: '15/05/2015',
    award_scope: AWARD_SCOPES.INSTITUTIONAL,
    award_name: 'Giảng viên tiêu biểu cấp ĐHQG',
    content:
      'Có thành tích xuất sắc trong công tác giảng dạy giai đoạn 2010-2015',
    academic_year: null,
    is_highest_level: false,
    approval_status: APPROVAL_STATUS.APPROVED,
  },
  {
    decision_number: null,
    decision_date: '04/01/2013',
    award_scope: AWARD_SCOPES.NATIONAL,
    award_name: 'Tài năng trẻ KHCN năm 2013',
    content: 'Tài năng trẻ KHCN năm 2013',
    academic_year: '2013',
    is_highest_level: false,
    approval_status: APPROVAL_STATUS.APPROVED,
  },
  {
    decision_number: '1112/QĐ-CTSV',
    decision_date: '03/12/2010',
    award_scope: AWARD_SCOPES.GRASSROOTS,
    award_name: 'Gương mặt trẻ tiêu biểu cấp cơ sở năm 2010',
    content: 'Gương mặt trẻ tiêu biểu cấp cơ sở năm 2010',
    academic_year: '2010-2011',
    is_highest_level: false,
    approval_status: APPROVAL_STATUS.APPROVED,
  },
  {
    decision_number: '567/QĐ-ĐHCN',
    decision_date: '30/08/2022',
    award_scope: AWARD_SCOPES.GRASSROOTS,
    award_name: 'Giấy khen của Hiệu trưởng',
    content: 'Hoàn thành xuất sắc nhiệm vụ năm học',
    academic_year: '2021-2022',
    is_highest_level: false,
    approval_status: APPROVAL_STATUS.PENDING,
  },
  {
    decision_number: '567/QĐ-ĐHCN',
    decision_date: '30/08/2022',
    award_scope: AWARD_SCOPES.GRASSROOTS,
    award_name: 'Giấy khen của Hiệu trưởng',
    content: 'Hoàn thành xuất sắc nhiệm vụ năm học',
    academic_year: '2021-2022',
    is_highest_level: false,
    approval_status: APPROVAL_STATUS.PENDING,
  },
  {
    decision_number: '567/QĐ-ĐHCN',
    decision_date: '30/08/2022',
    award_scope: AWARD_SCOPES.GRASSROOTS,
    award_name: 'Giấy khen của Hiệu trưởng',
    content: 'Hoàn thành xuất sắc nhiệm vụ năm học',
    academic_year: '2021-2022',
    is_highest_level: false,
    approval_status: APPROVAL_STATUS.PENDING,
  },
  {
    decision_number: '567/QĐ-ĐHCN',
    decision_date: '30/08/2022',
    award_scope: AWARD_SCOPES.GRASSROOTS,
    award_name: 'Giấy khen của Hiệu trưởng',
    content: 'Hoàn thành xuất sắc nhiệm vụ năm học',
    academic_year: '2021-2022',
    is_highest_level: false,
    approval_status: APPROVAL_STATUS.PENDING,
  },
  {
    decision_number: '567/QĐ-ĐHCN',
    decision_date: '30/08/2022',
    award_scope: AWARD_SCOPES.GRASSROOTS,
    award_name: 'Giấy khen của Hiệu trưởng',
    content: 'Hoàn thành xuất sắc nhiệm vụ năm học',
    academic_year: '2021-2022',
    is_highest_level: false,
    approval_status: APPROVAL_STATUS.PENDING,
  },
  {
    decision_number: '567/QĐ-ĐHCN',
    decision_date: '30/08/2022',
    award_scope: AWARD_SCOPES.GRASSROOTS,
    award_name: 'Giấy khen của Hiệu trưởng',
    content: 'Hoàn thành xuất sắc nhiệm vụ năm học',
    academic_year: '2021-2022',
    is_highest_level: false,
    approval_status: APPROVAL_STATUS.PENDING,
  },
  {
    decision_number: '567/QĐ-ĐHCN',
    decision_date: '30/08/2022',
    award_scope: AWARD_SCOPES.GRASSROOTS,
    award_name: 'Giấy khen của Hiệu trưởng',
    content: 'Hoàn thành xuất sắc nhiệm vụ năm học',
    academic_year: '2021-2022',
    is_highest_level: false,
    approval_status: APPROVAL_STATUS.PENDING,
  },
  {
    decision_number: '567/QĐ-ĐHCN',
    decision_date: '30/08/2022',
    award_scope: AWARD_SCOPES.GRASSROOTS,
    award_name: 'Giấy khen của Hiệu trưởng',
    content: 'Hoàn thành xuất sắc nhiệm vụ năm học',
    academic_year: '2021-2022',
    is_highest_level: false,
    approval_status: APPROVAL_STATUS.PENDING,
  },
  {
    decision_number: '567/QĐ-ĐHCN',
    decision_date: '30/08/2022',
    award_scope: AWARD_SCOPES.GRASSROOTS,
    award_name: 'Giấy khen của Hiệu trưởng',
    content: 'Hoàn thành xuất sắc nhiệm vụ năm học',
    academic_year: '2021-2022',
    is_highest_level: false,
    approval_status: APPROVAL_STATUS.PENDING,
  },
];

const mockEmulationTitles: EmulationTitleRecord[] = [
  {
    decision_number: '121/QĐ-TW',
    decision_date: '19/05/2025',
    title_name: 'Chiến sĩ thi đua toàn quốc',
    is_highest_level: true,
    approval_status: APPROVAL_STATUS.PENDING,
    attachment_url: null,
  },
  {
    decision_number: null,
    decision_date: '12/05/2020',
    title_name: 'Chiến sĩ thi đua cấp ĐHQGHN',
    is_highest_level: false,
    approval_status: APPROVAL_STATUS.REJECTED,
    attachment_url: null,
  },
  {
    decision_number: '42/QĐ-DHCN',
    decision_date: '23/08/2018',
    title_name: 'Chiến sĩ thi đua cấp cơ sở',
    is_highest_level: false,
    approval_status: APPROVAL_STATUS.APPROVED,
    attachment_url: null,
  },
];

const mockDisciplines: DisciplineRecord[] = [];

function RouteComponent() {
  return (
    <div className="flex w-full flex-col gap-8">
      <CommendationsTable data={mockCommendations} />
      <EmulationTitlesTable data={mockEmulationTitles} />
      <DisciplinesTable data={mockDisciplines} />
    </div>
  );
}
