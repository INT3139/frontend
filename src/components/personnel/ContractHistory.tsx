import { Check, Edit, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

// ==========================================
// KHAI BÁO KIỂU DỮ LIỆU
// ==========================================
type ContractItemType = {
  id: number;
  soHD: string;
  loaiHD: string;
  ngayHieuLuc: string;
  ngayHetHan: string;
  donVi: string;
  isCurrent: boolean;
  congViec: string;
  doiTuong: string;
  ngayBHXH: string;
  isEditing: boolean;
};

type ExtensionItemType = {
  id: number;
  soQD: string;
  ngayKy: string;
  thoiGianKeoDai: string;
  ngayBatDau: string;
  ngayKetThuc: string;
  donVi: string;
  chucDanh: string;
  isEditing: boolean;
};

// ==========================================
// COMPONENT 1: DÒNG QUÁ TRÌNH KÝ HỢP ĐỒNG
// ==========================================
function ContractRow({
  item,
  index,
  onEdit,
  onSave,
  onDelete,
  onChange,
}: {
  item: ContractItemType;
  index: number;
  onEdit: (id: number) => void;
  onSave: (id: number) => void;
  onDelete: (id: number) => void;
  onChange: (id: number, field: string, value: string | boolean) => void;
}) {
  return (
    <tr className="text-center transition-colors hover:bg-gray-50">
      <td className="border border-gray-200 p-3">
        <div className="flex items-center justify-center gap-2">
          {item.isEditing ? (
            <button
              onClick={() => onSave(item.id)}
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-green-100 text-green-600 transition-colors hover:bg-green-200"
            >
              <Check className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => onEdit(item.id)}
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-blue-100 text-blue-600 transition-colors hover:bg-blue-200"
            >
              <Edit className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            onClick={() => onDelete(item.id)}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-red-100 text-red-600 transition-colors hover:bg-red-200"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
      <td className="border border-gray-200 p-3">{index + 1}</td>
      <td className="border border-gray-200 p-3 text-left font-medium">
        {item.isEditing ? (
          <input
            className="w-full border-b border-gray-300 outline-none focus:border-[#008a70]"
            value={item.soHD}
            onChange={(e) => onChange(item.id, 'soHD', e.target.value)}
          />
        ) : (
          item.soHD
        )}
      </td>
      <td className="border border-gray-200 p-3 text-left">
        {item.isEditing ? (
          <input
            className="w-full border-b border-gray-300 outline-none focus:border-[#008a70]"
            value={item.loaiHD}
            onChange={(e) => onChange(item.id, 'loaiHD', e.target.value)}
          />
        ) : (
          item.loaiHD
        )}
      </td>
      <td className="border border-gray-200 p-3">
        {item.isEditing ? (
          <input
            className="w-24 border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.ngayHieuLuc}
            onChange={(e) => onChange(item.id, 'ngayHieuLuc', e.target.value)}
          />
        ) : (
          item.ngayHieuLuc
        )}
      </td>
      <td className="border border-gray-200 p-3">
        {item.isEditing ? (
          <input
            className="w-24 border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.ngayHetHan}
            onChange={(e) => onChange(item.id, 'ngayHetHan', e.target.value)}
          />
        ) : (
          item.ngayHetHan
        )}
      </td>
      <td className="border border-gray-200 p-3 text-left">
        {item.isEditing ? (
          <input
            className="w-full border-b border-gray-300 outline-none focus:border-[#008a70]"
            value={item.donVi}
            onChange={(e) => onChange(item.id, 'donVi', e.target.value)}
          />
        ) : (
          item.donVi
        )}
      </td>
      <td className="border border-gray-200 p-3">
        <input
          type="checkbox"
          checked={item.isCurrent}
          onChange={(e) => onChange(item.id, 'isCurrent', e.target.checked)}
          disabled={!item.isEditing}
          className="h-4 w-4 cursor-pointer accent-[#008a70] disabled:cursor-default"
        />
      </td>
      <td className="border border-gray-200 p-3 text-left">
        {item.isEditing ? (
          <input
            className="w-full border-b border-gray-300 outline-none focus:border-[#008a70]"
            value={item.congViec}
            onChange={(e) => onChange(item.id, 'congViec', e.target.value)}
          />
        ) : (
          item.congViec
        )}
      </td>
      <td className="border border-gray-200 p-3 text-left">
        {item.isEditing ? (
          <input
            className="w-full border-b border-gray-300 outline-none focus:border-[#008a70]"
            value={item.doiTuong}
            onChange={(e) => onChange(item.id, 'doiTuong', e.target.value)}
          />
        ) : (
          item.doiTuong
        )}
      </td>
      <td className="border border-gray-200 p-3">
        {item.isEditing ? (
          <input
            className="w-24 border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.ngayBHXH}
            onChange={(e) => onChange(item.id, 'ngayBHXH', e.target.value)}
          />
        ) : (
          item.ngayBHXH
        )}
      </td>
    </tr>
  );
}

// ==========================================
// COMPONENT 2: DÒNG QUÁ TRÌNH KÉO DÀI
// ==========================================
function ExtensionRow({
  item,
  index,
  onEdit,
  onSave,
  onDelete,
  onChange,
}: {
  item: ExtensionItemType;
  index: number;
  onEdit: (id: number) => void;
  onSave: (id: number) => void;
  onDelete: (id: number) => void;
  onChange: (id: number, field: string, value: string) => void;
}) {
  return (
    <tr className="text-center transition-colors hover:bg-gray-50">
      <td className="border border-gray-200 p-3">
        <div className="flex items-center justify-center gap-2">
          {item.isEditing ? (
            <button
              onClick={() => onSave(item.id)}
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-green-100 text-green-600 transition-colors hover:bg-green-200"
            >
              <Check className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => onEdit(item.id)}
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-blue-100 text-blue-600 transition-colors hover:bg-blue-200"
            >
              <Edit className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            onClick={() => onDelete(item.id)}
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-red-100 text-red-600 transition-colors hover:bg-red-200"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
      <td className="border border-gray-200 p-3">{index + 1}</td>
      <td className="border border-gray-200 p-3 text-left font-medium">
        {item.isEditing ? (
          <input
            className="w-full border-b border-gray-300 outline-none focus:border-[#008a70]"
            value={item.soQD}
            onChange={(e) => onChange(item.id, 'soQD', e.target.value)}
          />
        ) : (
          item.soQD
        )}
      </td>
      <td className="border border-gray-200 p-3">
        {item.isEditing ? (
          <input
            className="w-24 border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.ngayKy}
            onChange={(e) => onChange(item.id, 'ngayKy', e.target.value)}
          />
        ) : (
          item.ngayKy
        )}
      </td>
      <td className="border border-gray-200 p-3">
        {item.isEditing ? (
          <input
            className="w-24 border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.thoiGianKeoDai}
            onChange={(e) =>
              onChange(item.id, 'thoiGianKeoDai', e.target.value)
            }
          />
        ) : (
          item.thoiGianKeoDai
        )}
      </td>
      <td className="border border-gray-200 p-3">
        {item.isEditing ? (
          <input
            className="w-24 border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.ngayBatDau}
            onChange={(e) => onChange(item.id, 'ngayBatDau', e.target.value)}
          />
        ) : (
          item.ngayBatDau
        )}
      </td>
      <td className="border border-gray-200 p-3">
        {item.isEditing ? (
          <input
            className="w-24 border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.ngayKetThuc}
            onChange={(e) => onChange(item.id, 'ngayKetThuc', e.target.value)}
          />
        ) : (
          item.ngayKetThuc
        )}
      </td>
      <td className="border border-gray-200 p-3 text-left">
        {item.isEditing ? (
          <input
            className="w-full border-b border-gray-300 outline-none focus:border-[#008a70]"
            value={item.donVi}
            onChange={(e) => onChange(item.id, 'donVi', e.target.value)}
          />
        ) : (
          item.donVi
        )}
      </td>
      <td className="border border-gray-200 p-3 text-left">
        {item.isEditing ? (
          <input
            className="w-full border-b border-gray-300 outline-none focus:border-[#008a70]"
            value={item.chucDanh}
            onChange={(e) => onChange(item.id, 'chucDanh', e.target.value)}
          />
        ) : (
          item.chucDanh
        )}
      </td>
    </tr>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function ContractHistory() {
  // STATE: Danh sách hợp đồng
  const [contracts, setContracts] = useState<ContractItemType[]>([
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
      isEditing: false,
    },
  ]);

  // STATE: Danh sách kéo dài thời gian
  const [extensions, setExtensions] = useState<ExtensionItemType[]>([]);

  // HANDLERS: Hợp đồng
  const handleAddContract = () => {
    setContracts([
      {
        id: Date.now(),
        soHD: '',
        loaiHD: '',
        ngayHieuLuc: '',
        ngayHetHan: '',
        donVi: '',
        isCurrent: false,
        congViec: '',
        doiTuong: '',
        ngayBHXH: '',
        isEditing: true,
      },
      ...contracts,
    ]);
  };

  const handleEditContract = (id: number) =>
    setContracts(
      contracts.map((item) =>
        item.id === id ? { ...item, isEditing: true } : item,
      ),
    );

  const handleSaveContract = (id: number) =>
    setContracts(
      contracts.map((item) =>
        item.id === id ? { ...item, isEditing: false } : item,
      ),
    );

  const handleDeleteContract = (id: number) =>
    setContracts(contracts.filter((item) => item.id !== id));

  const handleChangeContract = (
    id: number,
    field: string,
    value: string | boolean,
  ) =>
    setContracts(
      contracts.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );

  // HANDLERS: Kéo dài thời gian
  const handleAddExtension = () => {
    setExtensions([
      {
        id: Date.now(),
        soQD: '',
        ngayKy: '',
        thoiGianKeoDai: '',
        ngayBatDau: '',
        ngayKetThuc: '',
        donVi: '',
        chucDanh: '',
        isEditing: true,
      },
      ...extensions,
    ]);
  };

  const handleEditExtension = (id: number) =>
    setExtensions(
      extensions.map((item) =>
        item.id === id ? { ...item, isEditing: true } : item,
      ),
    );

  const handleSaveExtension = (id: number) =>
    setExtensions(
      extensions.map((item) =>
        item.id === id ? { ...item, isEditing: false } : item,
      ),
    );

  const handleDeleteExtension = (id: number) =>
    setExtensions(extensions.filter((item) => item.id !== id));

  const handleChangeExtension = (id: number, field: string, value: string) =>
    setExtensions(
      extensions.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );

  return (
    <div className="flex min-h-screen justify-center font-sans">
      <div className="flex w-full flex-col border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#f0f9f6] p-3">
          <h1 className="ml-2 text-base font-bold text-[#008a70] uppercase md:text-lg">
            Quá trình ký hợp đồng
          </h1>
        </div>
        <div className="flex-1 p-6 md:p-8">
          {/* BẢNG 1: QUÁ TRÌNH KÝ HỢP ĐỒNG */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-[#008a70] uppercase">
                Quá trình ký hợp đồng
              </h3>
              <button
                onClick={handleAddContract}
                className="flex items-center gap-2 rounded bg-[#f5b027] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-yellow-500"
              >
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
                    <ContractRow
                      key={item.id}
                      item={item}
                      index={index}
                      onEdit={handleEditContract}
                      onSave={handleSaveContract}
                      onDelete={handleDeleteContract}
                      onChange={handleChangeContract}
                    />
                  ))}
                  {contracts.length === 0 && (
                    <tr>
                      <td
                        colSpan={11}
                        className="p-4 text-center text-gray-500"
                      >
                        Chưa có dữ liệu hợp đồng.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="my-8 border-t border-gray-300"></div>

          {/* BẢNG 2: KÉO DÀI THỜI GIAN */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-[#008a70] uppercase">
                Quá trình kéo dài thời gian làm công tác chuyên môn
              </h3>
              <button
                onClick={handleAddExtension}
                className="flex items-center gap-2 rounded bg-[#f5b027] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-yellow-500"
              >
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
                  {extensions.map((item, index) => (
                    <ExtensionRow
                      key={item.id}
                      item={item}
                      index={index}
                      onEdit={handleEditExtension}
                      onSave={handleSaveExtension}
                      onDelete={handleDeleteExtension}
                      onChange={handleChangeExtension}
                    />
                  ))}
                  {extensions.length === 0 && (
                    <tr>
                      <td
                        colSpan={9}
                        className="border border-gray-200 py-8 text-center text-gray-500 italic"
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
      </div>
    </div>
  );
}
