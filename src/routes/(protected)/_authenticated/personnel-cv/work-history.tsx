import { ActionBar } from '@/components/main/personel-cv/ActionBar';
import { PageHeader } from '@/components/main/personel-cv/PageHeader';
import { TabNavigation } from '@/components/main/personel-cv/TabNavigation';
import {
  ActionIcon,
  TriangleIcon,
} from '@/components/main/personel-cv/TableIcons';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/work-history',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    'Quá trình công tác chính quyền',
    'Quá trình hoạt động Đảng',
    'Quá trình hoạt động Công Đoàn',
    'Quá trình hoạt động Đoàn',
    'Quá trình hoạt động Quân ngũ - Tổ chức chính trị khác',
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tableDataByTab: Record<number, any[]> = {
    0: [
      {
        id: 1,
        from: '07/2002',
        to: '09/2005',
        unit: 'Trường Đại học Công nghệ',
        role: '',
        type: '',
        status: 'Đã duyệt',
      },
      {
        id: 2,
        from: '12/2009',
        to: '05/2016',
        unit: 'Trường Đại học Công nghệ',
        role: '',
        type: '',
        status: 'Đã duyệt',
      },
      {
        id: 3,
        from: '05/2015',
        to: '08/2018',
        unit: 'Trường Đại học Công nghệ',
        role: 'Chủ Nhiệm Bộ môn Công nghệ phần mềm',
        type: '',
        status: 'Đã duyệt',
      },
      {
        id: 4,
        from: '05/2016',
        to: '',
        unit: 'Trường Đại học Công nghệ',
        role: '',
        type: '',
        status: 'Đã duyệt',
      },
      {
        id: 5,
        from: '02/2018',
        to: '',
        unit: 'Trường Đại học Công nghệ',
        role: 'Phó Chủ Nhiệm Khoa Công nghệ thông tin',
        type: '',
        status: 'Đã duyệt',
      },
    ],
    1: [],
    2: [],
    3: [],
    4: [],
  };

  const currentTableData = tableDataByTab[activeTab] || [];

  return (
    <div className="flex min-h-full justify-center bg-gray-100 font-sans">
      <div className="flex w-full max-w-[1400px] min-w-0 flex-col bg-white shadow-sm">
        {/* Header */}
        <PageHeader
          title="Quá trình công tác, hoạt động Đảng - Đoàn thể"
          showRefresh={false}
        />

        {/* Tabs */}
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Action Bar */}
        <ActionBar />

        {/* Table Content */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
            <thead className="border-b border-gray-200 bg-slate-50 text-gray-700">
              <tr>
                <th className="w-10 border-r border-gray-200 px-2 py-3 text-center font-semibold"></th>
                <th className="w-24 border-r border-gray-200 px-4 py-3 text-center font-semibold">
                  Thao tác
                </th>
                <th className="w-16 border-r border-gray-200 px-4 py-3 text-center font-semibold">
                  STT
                </th>
                <th className="w-28 border-r border-gray-200 px-4 py-3 text-center font-semibold">
                  Từ
                </th>
                <th className="w-28 border-r border-gray-200 px-4 py-3 text-center font-semibold">
                  Đến
                </th>
                <th className="border-r border-gray-200 px-4 py-3 font-semibold">
                  Đơn vị công tác
                </th>
                <th className="w-64 border-r border-gray-200 px-4 py-3 font-semibold">
                  Chức vụ, chức danh
                </th>
                <th className="w-56 border-r border-gray-200 px-4 py-3 font-semibold">
                  Phân loại quá trình hoạt động
                </th>
                <th className="w-32 px-4 py-3 text-center font-semibold">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.length > 0 ? (
                currentTableData.map((row) => (
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
                      {row.id}
                    </td>
                    <td className="border-r border-gray-200 px-4 py-3 text-center text-gray-800">
                      {row.from}
                    </td>
                    <td className="border-r border-gray-200 px-4 py-3 text-center text-gray-800">
                      {row.to}
                    </td>
                    <td className="border-r border-gray-200 px-4 py-3 text-gray-800">
                      {row.unit}
                    </td>
                    <td className="border-r border-gray-200 px-4 py-3 text-gray-800">
                      {row.role}
                    </td>
                    <td className="border-r border-gray-200 px-4 py-3 text-gray-800">
                      {row.type}
                    </td>
                    <td className="px-4 py-3 text-center align-middle">
                      <span className="bg-vnu-status inline-block w-full max-w-[100px] rounded-[3px] px-6 py-1 text-xs font-medium text-white">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
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
