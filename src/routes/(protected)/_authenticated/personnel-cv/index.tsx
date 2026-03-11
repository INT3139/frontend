import { createFileRoute } from '@tanstack/react-router';
import { Download, RefreshCw } from 'lucide-react';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/',
)({
  component: RouteComponent,
});

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex text-sm">
      <div className="w-56 md:w-64 font-semibold text-gray-700 shrink-0">
        {label}
      </div>
      <div className="w-6 text-gray-600 shrink-0">:</div>
      <div className="text-gray-800 flex-1">{value}</div>
    </div>
  );
}

function TableRow({
  label,
  street,
  ward,
  district,
  city,
  country,
}: {
  label: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  country: string;
}) {
  return (
    <tr className="bg-white hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 border border-gray-200 font-semibold text-gray-700">
        {label}
      </td>
      <td className="px-4 py-3 border border-gray-200 text-gray-800">
        {street}
      </td>
      <td className="px-4 py-3 border border-gray-200 text-gray-800">{ward}</td>
      <td className="px-4 py-3 border border-gray-200 text-gray-800">
        {district}
      </td>
      <td className="px-4 py-3 border border-gray-200 text-gray-800">{city}</td>
      <td className="px-4 py-3 border border-gray-200 text-gray-800">
        {country}
      </td>
    </tr>
  );
}

function RouteComponent() {
  return (
    <div className="min-h-screen font-sans flex justify-center">
      <div className="w-full bg-white shadow-sm border border-gray-200 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#f0f9f6] p-3 border-b border-gray-200">
          <h1 className="text-[#008a70] font-bold text-base md:text-lg uppercase ml-2">
            Thông tin nhân sự
          </h1>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-[#f5b027] hover:bg-yellow-500 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors">
              <RefreshCw className="w-4 h-4" />
              Cập nhật
            </button>
            <button className="flex items-center gap-2 bg-[#00a680] hover:bg-teal-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors">
              <Download className="w-4 h-4" />
              Xuất lý lịch
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
            {/* Top Left */}
            <div className="space-y-4">
              <InfoRow label="Số CMND/CCCD" value="" />
              <InfoRow label="Ngày cấp" value="18/02/2013" />
              <InfoRow label="Nơi cấp" value="CA. Hà Tĩnh" />
              <InfoRow label="Số điện thoại" value="" />
              <InfoRow label="ĐT Cơ quan" value="" />
              <InfoRow label="ĐT Nhà riêng" value="" />
              <InfoRow
                label="Loại hợp đồng"
                value="Hợp đồng làm việc không xác định thời hạn"
              />
            </div>

            {/* Top Right */}
            <div className="space-y-4">
              <InfoRow
                label="Đối tượng"
                value="Người lao động chuyên môn, nghiệp vụ"
              />
              <InfoRow label="Email VNU" value="" />
              <InfoRow label="Email" value="" />
              <InfoRow label="Quốc tịch" value="Việt Nam" />
              <InfoRow label="Dân tộc" value="Kinh" />
              <InfoRow label="Tôn giáo" value="Không" />
              <InfoRow label="Tên gọi khác" value="" />
            </div>
          </div>

          <div className="my-8 border-t border-gray-100"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
            {/* Bottom Left */}
            <div className="space-y-4">
              <InfoRow label="Đối tượng chính sách" value="" />
              <InfoRow label="Thành phần gia đình, xuất thân" value="" />
              <InfoRow label="Số BHXH" value="" />
              <InfoRow label="Tình trạng hôn nhân" value="Đã kết hôn" />
            </div>

            {/* Bottom Right */}
            <div className="space-y-4">
              <InfoRow label="Hộ chiếu" value="B8653351" />
              <InfoRow label="Ngày cấp" value="02/01/2014" />
              <InfoRow label="Nơi cấp" value="Cục xuất nhập cảnh" />
              <InfoRow label="Ghi chú" value="" />
            </div>
          </div>

          {/* Table */}
          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse min-w-[800px]">
              <thead className="bg-[#f8fafc] text-gray-800">
                <tr>
                  <th className="px-4 py-3 font-semibold border border-gray-200 w-48"></th>
                  <th className="px-4 py-3 font-semibold border border-gray-200">
                    Số nhà
                  </th>
                  <th className="px-4 py-3 font-semibold border border-gray-200">
                    Xã/Phường
                  </th>
                  <th className="px-4 py-3 font-semibold border border-gray-200">
                    Huyện/Quận
                  </th>
                  <th className="px-4 py-3 font-semibold border border-gray-200">
                    Tỉnh/Thành phố
                  </th>
                  <th className="px-4 py-3 font-semibold border border-gray-200">
                    Quốc gia
                  </th>
                </tr>
              </thead>
              <tbody>
                <TableRow
                  label="Quê quán"
                  street=""
                  ward="Xã Thạch Kim"
                  district="Huyện Lộc Hà"
                  city="Tỉnh Hà Tĩnh"
                  country="Việt Nam"
                />
                <TableRow
                  label="Nơi sinh"
                  street=""
                  ward="Xã Thạch Kim"
                  district="Huyện Lộc Hà"
                  city="Tỉnh Hà Tĩnh"
                  country="Việt Nam"
                />
                <TableRow
                  label="Hộ khẩu thường trú"
                  street="Phòng 1609, tòa nhà CT3B"
                  ward="Phường Cổ Nhuế 1"
                  district="Quận Bắc Từ Liêm"
                  city="Thành phố Hà Nội"
                  country="Việt Nam"
                />
                <TableRow
                  label="Nơi ở hiện nay"
                  street="Phòng 1609, tòa nhà CT3B"
                  ward="Phường Cổ Nhuế 1"
                  district="Quận Bắc Từ Liêm"
                  city="Thành phố Hà Nội"
                  country="Việt Nam"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
