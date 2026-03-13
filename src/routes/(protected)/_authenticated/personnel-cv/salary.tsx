import { createFileRoute } from '@tanstack/react-router';
import { Download, RefreshCw } from 'lucide-react';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/salary',
)({
  component: RouteComponent,
});

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex text-sm">
      <div className="w-56 shrink-0 font-semibold text-gray-700 md:w-64">
        {label}
      </div>
      <div className="w-6 shrink-0 text-gray-600">:</div>
      <div className="flex-1 text-gray-800">{value}</div>
    </div>
  );
}

function SalaryHistoryRow({
  stt,
  maCD,
  bacLuong,
  heSoLuong,
  mucLuong,
  vuotKhung,
  phuCap,
  ngayHuong,
  mocNangBac,
  soQD,
  nhomCD,
}: {
  stt: number;
  maCD: string;
  bacLuong: string;
  heSoLuong: number;
  mucLuong: number;
  vuotKhung: string;
  phuCap: string;
  ngayHuong: string;
  mocNangBac: string;
  soQD: string;
  nhomCD: string;
}) {
  return (
    <tr className="border-b border-gray-100 transition-colors hover:bg-gray-50">
      <td className="w-16 p-3">
        <div className="flex items-center gap-2">
          <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded bg-blue-100 text-blue-600 hover:bg-blue-200">
            <span className="text-[10px]">▼</span>
          </div>
          <div className="flex h-5 w-5 cursor-pointer items-center justify-center rounded bg-green-100 text-[#008a70] hover:bg-green-200">
            <span className="text-[10px]">💳</span>
          </div>
        </div>
      </td>

      <td className="w-12 p-3 text-center text-gray-600">{stt}</td>
      <td className="p-3 font-medium whitespace-nowrap text-gray-700">
        {maCD}
      </td>
      <td className="p-3 text-center">{bacLuong}</td>
      <td className="p-3 text-center">{heSoLuong}</td>

      <td className="p-3 text-right font-semibold">
        {mucLuong.toLocaleString('vi-VN')}
      </td>

      <td className="p-3 text-center">{vuotKhung}</td>
      <td className="p-3 text-center">{phuCap}</td>
      <td className="p-3 whitespace-nowrap text-gray-600">{ngayHuong}</td>
      <td className="p-3 whitespace-nowrap text-gray-600">{mocNangBac}</td>
      <td className="p-3 text-blue-600 italic">{soQD}</td>
      <td className="p-3 text-gray-600">{nhomCD}</td>
    </tr>
  );
}

function ProposalRow({
  stt,
  maCD,
  bacCu,
  heSoCu,
  ngayHuong,
  tenCD,
  dinhKem,
  trangThai,
  bacMoi,
  heSoMoi,
  ngayTiepTheo,
  loaiNBL,
}: {
  stt: number;
  maCD: string;
  bacCu: string;
  heSoCu: number;
  ngayHuong: string;
  tenCD: string;
  dinhKem: boolean;
  trangThai: string;
  bacMoi: string;
  heSoMoi: number;
  ngayTiepTheo: string;
  loaiNBL: string;
}) {
  return (
    <tr className="text-center transition-colors hover:bg-gray-50">
      <td className="border border-gray-200 p-3">
        <div className="flex justify-center">
          <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-green-100 text-[#008a70] hover:bg-green-200">
            <span className="text-xs">👁️</span>
          </div>
        </div>
      </td>
      <td className="border border-gray-200 p-3">{stt}</td>

      <td className="border border-gray-200 p-3">{maCD}</td>
      <td className="border border-gray-200 p-3">{bacCu}</td>
      <td className="border border-gray-200 p-3 font-medium">{heSoCu}</td>
      <td className="border border-gray-200 p-3">{ngayHuong}</td>
      <td className="border border-gray-200 p-3 text-left">{tenCD}</td>
      <td className="border border-gray-200 p-3">
        {dinhKem && <span className="cursor-pointer text-[#008a70]">📎</span>}
      </td>
      <td className="border border-gray-200 p-3">
        <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600 uppercase">
          {trangThai}
        </span>
      </td>

      <td className="border border-gray-200 p-3 font-bold text-[#008a70]">
        {bacMoi}
      </td>
      <td className="border border-gray-200 p-3 font-bold text-[#008a70]">
        {heSoMoi}
      </td>
      <td className="border border-gray-200 p-3">{ngayTiepTheo}</td>
      <td className="border border-gray-200 p-3 italic">{loaiNBL}</td>
    </tr>
  );
}

function RouteComponent() {
  return (
    <div className="flex min-h-screen justify-center font-sans">
      <div className="flex w-full flex-col border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#f0f9f6] p-3">
          <h1 className="ml-2 text-base font-bold text-[#008a70] uppercase md:text-lg">
            Thông tin lương
          </h1>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded bg-[#f5b027] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-yellow-500">
              <RefreshCw className="h-4 w-4" />
              Cập nhật
            </button>
            <button className="flex items-center gap-2 rounded bg-[#00a680] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-teal-700">
              <Download className="h-4 w-4" />
              Xuất lý lịch
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 md:p-8">
          <div>
            <h3 className="mb-6 font-bold text-[#008a70] uppercase">
              Thông tin lương
            </h3>
            <div className="grid grid-cols-1 gap-x-16 gap-y-4 lg:grid-cols-2">
              <div className="space-y-4">
                <InfoRow label="Ngày hưởng chế độ lương" value="" />
                <InfoRow label="Nhóm chức danh nghề nghiệp" value="" />
                <InfoRow label="Mã chức danh nghề nghiệp" value="" />
                <InfoRow label="Hệ số lương" value="" />
                <InfoRow label="Phụ cấp chức vụ, chức danh" value="" />
                <InfoRow label="Phụ cấp khác" value="" />
                <InfoRow label="Phụ cấp trách nhiệm" value="" />
                <InfoRow label="Phụ cấp ưu đãi nhà giáo" value="" />
                <InfoRow
                  label="Phụ cấp khác(khu vực, lưu động, lưu trú)"
                  value=""
                />
                <InfoRow label="Tỉ lệ hướng(%)" value="" />
                <InfoRow label="Mốc nâng bậc tiếp theo" value="12/03/2026" />
                <InfoRow label="Ghi chú" value="" />
              </div>
              <div className="space-y-4">
                <InfoRow label="Số quyết định" value="" />
                <InfoRow label="Chức danh nghề nghiệp" value="" />
                <InfoRow label="Bậc lương" value="" />
                <InfoRow label="Vượt khung" value="" />
                <InfoRow label="Phụ cấp thâm niên nhà giáo" value="" />
                <InfoRow label="Phụ cấp độc hại" value="" />
                <InfoRow label="Hệ số thực hưởng" value="" />
                <InfoRow label="Ngày tăng hệ số PCTNVK tiếp theo" value="" />
              </div>
            </div>
          </div>
          <div className="my-8 border-t border-gray-300"></div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-[#008a70] uppercase">
                Nhật ký lương
              </h3>
              <button className="flex items-center gap-2 rounded bg-[#f5b027] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-yellow-500">
                <RefreshCw className="h-4 w-4" />
                Cập nhật
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-max border-collapse text-left text-sm">
                <thead className="bg-[#f8fafc] text-gray-800">
                  <tr>
                    <th className="w-20 border border-gray-200 px-4 py-3 text-center font-semibold">
                      Thao tác
                    </th>
                    <th className="w-20 border border-gray-200 px-4 py-3 text-center font-semibold">
                      STT
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Mã chức danh nghề nghiệp
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Bậc lương
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Hệ số lương
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Mức lương
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Vượt khung
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Phụ cấp chức vụ, chức danh
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Ngày hưởng chế độ lương
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Mốc nâng bậc lương thưởng thường xuyên tiếp theo
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Số quyết định
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Nhóm chức danh nghiệp vụ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <SalaryHistoryRow
                    stt={1}
                    maCD=""
                    bacLuong="2"
                    heSoLuong={4.98}
                    mucLuong={11500000}
                    vuotKhung=""
                    phuCap=""
                    ngayHuong="01/01/2024"
                    mocNangBac="01/01/2027"
                    soQD=""
                    nhomCD=""
                  />
                  <SalaryHistoryRow
                    stt={2}
                    maCD=""
                    bacLuong="1"
                    heSoLuong={2.19}
                    mucLuong={8500000}
                    vuotKhung=""
                    phuCap=""
                    ngayHuong=""
                    mocNangBac=""
                    soQD="123QĐ-ĐH"
                    nhomCD=""
                  />
                </tbody>
              </table>
            </div>
          </div>

          <div className="my-8 border-t border-gray-300"></div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-[#008a70] uppercase">
                Đề xuất nâng lương
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-max border-collapse text-left text-sm">
                <thead className="bg-[#f8fafc] text-center text-gray-800">
                  <tr>
                    <th
                      rowSpan={2}
                      className="border border-gray-200 px-4 py-3"
                    >
                      Thao tác
                    </th>
                    <th
                      rowSpan={2}
                      className="border border-gray-200 px-4 py-3"
                    >
                      STT
                    </th>
                    <th
                      colSpan={7}
                      className="border border-gray-200 px-4 py-3 uppercase"
                    >
                      Lương trước khi được nâng bậc
                    </th>
                    <th
                      colSpan={4}
                      className="border border-gray-200 px-4 py-3 uppercase"
                    >
                      Đề nghị nâng bậc lương
                    </th>
                  </tr>

                  <tr>
                    <th className="border border-gray-200 px-4 py-3">
                      Mã chức danh nghề nghiệp
                    </th>
                    <th className="border border-gray-200 px-4 py-3">
                      Bậc lương
                    </th>
                    <th className="border border-gray-200 px-4 py-3">
                      Hệ số lương hiện giữ
                    </th>
                    <th className="border border-gray-200 px-4 py-3">
                      Ngày hưởng chế độ lương
                    </th>
                    <th className="border border-gray-200 px-4 py-3">
                      Tên chức danh nghề nghiệp
                    </th>
                    <th className="border border-gray-200 px-4 py-3">
                      Đính kèm
                    </th>
                    <th className="border border-gray-200 px-4 py-3">
                      Trạng thái
                    </th>

                    <th className="border border-gray-200 px-4 py-3">
                      Bậc lương
                    </th>
                    <th className="border border-gray-200 px-4 py-3">
                      Hệ số lương mới được nâng bậc
                    </th>
                    <th className="border border-gray-200 px-4 py-3">
                      Ngày tăng lương tiếp theo
                    </th>
                    <th className="border border-gray-200 px-4 py-3">
                      Loại NBL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <ProposalRow
                    stt={1}
                    maCD="V.07.01.03"
                    bacCu=""
                    heSoCu={3.99}
                    ngayHuong=""
                    tenCD="Giảng viên (hạng I)"
                    dinhKem={true}
                    trangThai="Đang chờ duyệt"
                    bacMoi=""
                    heSoMoi={4.32}
                    ngayTiepTheo=""
                    loaiNBL=""
                  />
                  <ProposalRow
                    stt={2}
                    maCD=""
                    bacCu=""
                    heSoCu={3.99}
                    ngayHuong=""
                    tenCD="Giảng viên (hạng III)"
                    dinhKem={true}
                    trangThai="Đã phê duyệt"
                    bacMoi=""
                    heSoMoi={4.32}
                    ngayTiepTheo=""
                    loaiNBL=""
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
