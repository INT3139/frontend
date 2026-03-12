import { InfoRow } from '@/components/main/personel-cv/InfoRow';
import { PageHeader } from '@/components/main/personel-cv/PageHeader';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/',
)({
  component: RouteComponent,
});

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
    <tr className="bg-white transition-colors hover:bg-gray-50">
      <td className="border border-gray-200 px-4 py-3 font-semibold text-gray-700">
        {label}
      </td>
      <td className="border border-gray-200 px-4 py-3 text-gray-800">
        {street}
      </td>
      <td className="border border-gray-200 px-4 py-3 text-gray-800">{ward}</td>
      <td className="border border-gray-200 px-4 py-3 text-gray-800">
        {district}
      </td>
      <td className="border border-gray-200 px-4 py-3 text-gray-800">{city}</td>
      <td className="border border-gray-200 px-4 py-3 text-gray-800">
        {country}
      </td>
    </tr>
  );
}

function RouteComponent() {
  return (
    <div className="flex min-h-full justify-center font-sans">
      <div className="flex w-full max-w-[1400px] min-w-0 flex-col bg-white shadow-sm">
        {/* Header */}
        <PageHeader title="Thông tin nhân sự" />

        {/* Content */}
        <div className="flex-1 p-6 md:p-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-2">
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

          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-2">
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
            <table className="w-full min-w-[800px] border-collapse text-left text-sm">
              <thead className="bg-slate-50 text-gray-800">
                <tr>
                  <th className="w-48 border border-gray-200 px-4 py-3 font-semibold"></th>
                  <th className="border border-gray-200 px-4 py-3 font-semibold">
                    Số nhà
                  </th>
                  <th className="border border-gray-200 px-4 py-3 font-semibold">
                    Xã/Phường
                  </th>
                  <th className="border border-gray-200 px-4 py-3 font-semibold">
                    Huyện/Quận
                  </th>
                  <th className="border border-gray-200 px-4 py-3 font-semibold">
                    Tỉnh/Thành phố
                  </th>
                  <th className="border border-gray-200 px-4 py-3 font-semibold">
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
