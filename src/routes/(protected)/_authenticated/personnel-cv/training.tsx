import { ActionBar } from '@/components/main/personel-cv/ActionBar';
import { InfoRow } from '@/components/main/personel-cv/InfoRow';
import { PageHeader } from '@/components/main/personel-cv/PageHeader';
import { TabNavigation } from '@/components/main/personel-cv/TabNavigation';
import {
  ActionIcon,
  TriangleIcon,
} from '@/components/main/personel-cv/TableIcons';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/training',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeTopTab, setActiveTopTab] = useState(0);
  const [activeBottomTab, setActiveBottomTab] = useState(0);

  const topTabs = ['Trình độ chuyên môn', 'Học hàm'];
  const bottomTabs = [
    'Đào tạo, bồi dưỡng dài hạn - cấp văn bằng',
    'Đào tạo, bồi dưỡng ngắn hạn - cấp chứng chỉ',
    'Đào tạo, bồi dưỡng ngoại ngữ',
    'Đào tạo, bồi dưỡng tin học',
  ];

  const tableData = [
    {
      id: 1,
      from: '9/1998',
      to: '7/2002',
      level: 'Cử nhân',
      place: 'Khoa CN, ĐHQGHN',
      major: 'CNTT',
      format: 'Chính quy',
      field: 'Khoa học công nghệ - kỹ thuật',
      studying: '',
      status: '',
    },
    {
      id: 2,
      from: '9/2004',
      to: '9/2006',
      level: 'Thạc sĩ',
      place: 'Viện KH&CN Tiên Tiến Nhật Bản',
      major: 'CNTT',
      format: 'Chính quy',
      field: 'Khoa học công nghệ - kỹ thuật',
      studying: '',
      status: '',
    },
    {
      id: 3,
      from: '9/2006',
      to: '9/2009',
      level: 'Tiến sĩ',
      place: 'Viện KH&CN Tiên Tiến Nhật Bản',
      major: 'CNTT',
      format: 'Chính quy',
      field: 'Khoa học công nghệ - kỹ thuật',
      studying: '',
      status: '',
    },
  ];

  return (
    <div className="flex min-h-full justify-center font-sans">
      <div className="flex w-full max-w-[1400px] min-w-0 flex-col bg-white shadow-sm">
        {/* Header */}
        <PageHeader title="Học hàm, trình độ chuyên môn" />

        {/* Top Tabs */}
        <TabNavigation
          tabs={topTabs}
          activeTab={activeTopTab}
          onTabChange={setActiveTopTab}
        />

        {/* Info Grid */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-4 lg:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-4">
              <InfoRow label="Trình độ giáo dục phổ thông" value="12/12" />
              <InfoRow label="Trình độ chuyên môn cao nhất" value="Tiến sĩ" />
              <InfoRow label="Ghi chú" value="" />
            </div>
            {/* Right Column */}
            <div className="space-y-4">
              <InfoRow label="Quản lý nhà nước" value="Không có" />
              <InfoRow label="Lý luận chính trị" value="Sơ cấp" />
              <InfoRow label="Trình độ ngoại ngữ" value="Tiếng Anh" />
              <InfoRow label="Trình độ tin học" value="Tiến sĩ" />
            </div>
          </div>
        </div>

        {/* Bottom Tabs */}
        <TabNavigation
          tabs={bottomTabs}
          activeTab={activeBottomTab}
          onTabChange={setActiveBottomTab}
        />

        {/* Action Bar */}
        <ActionBar />

        {/* Table Content */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full min-w-[1200px] border-collapse text-left text-sm">
            <thead className="border-b border-gray-200 bg-slate-50 text-gray-700">
              <tr>
                <th className="w-10 border-r border-gray-200 px-2 py-3 text-center font-semibold"></th>
                <th className="w-24 border-r border-gray-200 px-4 py-3 text-center font-semibold">
                  Thao tác
                </th>
                <th className="w-24 border-r border-gray-200 px-4 py-3 text-center font-semibold">
                  Từ
                </th>
                <th className="w-24 border-r border-gray-200 px-4 py-3 text-center font-semibold">
                  Đến
                </th>
                <th className="w-40 border-r border-gray-200 px-4 py-3 font-semibold">
                  Trình độ chuyên môn
                </th>
                <th className="w-64 border-r border-gray-200 px-4 py-3 font-semibold">
                  Nơi đào tạo
                </th>
                <th className="w-40 border-r border-gray-200 px-4 py-3 font-semibold">
                  Chuyên ngành
                </th>
                <th className="w-32 border-r border-gray-200 px-4 py-3 font-semibold">
                  Hình thức đào tạo
                </th>
                <th className="w-56 border-r border-gray-200 px-4 py-3 font-semibold">
                  Lĩnh vực
                </th>
                <th className="w-24 border-r border-gray-200 px-4 py-3 text-center font-semibold">
                  Đang học
                </th>
                <th className="w-24 px-4 py-3 font-semibold">Trì...</th>
              </tr>
            </thead>
            <tbody>
              {activeBottomTab === 0 ? (
                tableData.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-200 bg-white transition-colors hover:bg-gray-50"
                  >
                    <td className="border-r border-gray-200 px-2 py-3 text-center align-middle">
                      <TriangleIcon />
                    </td>
                    <td className="border-r border-gray-200 px-4 py-3 text-center align-middle">
                      <ActionIcon />
                    </td>
                    <td className="border-r border-gray-200 px-4 py-3 text-center text-gray-800">
                      {row.from}
                    </td>
                    <td className="border-r border-gray-200 px-4 py-3 text-center text-gray-800">
                      {row.to}
                    </td>
                    <td className="border-r border-gray-200 px-4 py-3 text-gray-800">
                      {row.level}
                    </td>
                    <td className="border-r border-gray-200 px-4 py-3 text-gray-800">
                      {row.place}
                    </td>
                    <td className="border-r border-gray-200 px-4 py-3 text-gray-800">
                      {row.major}
                    </td>
                    <td className="border-r border-gray-200 px-4 py-3 text-gray-800">
                      {row.format}
                    </td>
                    <td className="border-r border-gray-200 px-4 py-3 text-gray-800">
                      {row.field}
                    </td>
                    <td className="border-r border-gray-200 px-4 py-3 text-center text-gray-800">
                      {row.studying}
                    </td>
                    <td className="px-4 py-3 text-gray-800">{row.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={11}
                    className="bg-white px-4 py-8 text-center text-gray-500"
                  >
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
