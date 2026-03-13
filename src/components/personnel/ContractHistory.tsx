import { Edit, Plus } from 'lucide-react';

export default function ContractHistory() {
  const contracts = [
    {
      id: 1,
      soHD: '83',
      loaiHD: 'Hợp đồng lao động không xác định thời hạn',
      ngayHieuLuc: '11/03/2026',
      ngayHetHan: '',
      donVi: '',
      isCurrent: true,
      congViec: '',
      doiTuong: '',
      ngayBHXH: '',
    },
  ];

  return (
    <div className="flex min-h-screen justify-center font-sans">
      <div className="flex w-full flex-col border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#f0f9f6] p-3">
          <h1 className="ml-2 text-base font-bold text-[#008a70] uppercase md:text-lg">
            Quá trình ký hợp đồng
          </h1>
        </div>

        <div className="flex-1 p-6 md:p-8">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-[#008a70] uppercase">
                Quá trình ký hợp đồng
              </h3>
              <button className="flex items-center gap-2 rounded bg-[#f5b027] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-yellow-500">
                <Plus className="h-4 w-4" />
                Thêm mới
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-max border-collapse text-left text-sm">
                <thead className="bg-[#f8fafc] text-center text-gray-800">
                  <tr>
                    <th className="w-20 border border-gray-200 px-4 py-3 font-semibold">
                      Thao tác
                    </th>
                    <th className="w-16 border border-gray-200 px-4 py-3 font-semibold">
                      STT
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                      Số hợp đồng
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                      Loại hợp đồng
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Ngày hiệu lực
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Ngày hết hiệu lực
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                      Đơn vị tuyển
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      HĐ hiện tại
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                      Công việc đảm nhận
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                      Đối tượng
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Ngày đóng BHXH
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map((item, index) => (
                    <tr
                      key={item.id}
                      className="text-center transition-colors hover:bg-gray-50"
                    >
                      <td className="border border-gray-200 p-3">
                        <div className="flex justify-center">
                          <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded text-green-600 transition-colors hover:bg-green-100">
                            <Edit className="h-4 w-4" />
                          </div>
                        </div>
                      </td>
                      <td className="border border-gray-200 p-3">
                        {index + 1}
                      </td>
                      <td className="border border-gray-200 p-3 text-left font-medium">
                        {item.soHD}
                      </td>
                      <td className="border border-gray-200 p-3 text-left">
                        {item.loaiHD}
                      </td>
                      <td className="border border-gray-200 p-3">
                        {item.ngayHieuLuc}
                      </td>
                      <td className="border border-gray-200 p-3">
                        {item.ngayHetHan}
                      </td>
                      <td className="border border-gray-200 p-3 text-left">
                        {item.donVi}
                      </td>
                      <td className="border border-gray-200 p-3">
                        <input
                          type="checkbox"
                          checked={item.isCurrent}
                          readOnly
                          className="h-4 w-4 cursor-default accent-[#008a70]"
                        />
                      </td>
                      <td className="border border-gray-200 p-3 text-left">
                        {item.congViec}
                      </td>
                      <td className="border border-gray-200 p-3 text-left">
                        {item.doiTuong}
                      </td>
                      <td className="border border-gray-200 p-3">
                        {item.ngayBHXH}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="my-8 border-t border-gray-300"></div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-[#008a70] uppercase">
                Quá trình kéo dài thời gian làm công tác chuyên môn
              </h3>
              <button className="flex items-center gap-2 rounded bg-[#f5b027] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-yellow-500">
                <Plus className="h-4 w-4" />
                Thêm mới
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-max border-collapse text-left text-sm">
                <thead className="bg-[#f8fafc] text-center text-gray-800">
                  <tr>
                    <th className="w-20 border border-gray-200 px-4 py-3 font-semibold">
                      Thao tác
                    </th>
                    <th className="w-16 border border-gray-200 px-4 py-3 font-semibold">
                      STT
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                      Số quyết định
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Ngày ký
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Thời gian kéo dài
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Ngày bắt đầu
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Ngày kết thúc
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                      Đơn vị sử dụng
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                      Chức danh (chức vụ)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      colSpan={9}
                      className="border border-gray-200 py-8 text-center text-gray-500 italic"
                    >
                      Không có dữ liệu
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
