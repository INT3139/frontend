import { createFileRoute } from '@tanstack/react-router';
import { Check, Edit, Eye, Plus, Save, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/salary',
)({
  component: RouteComponent,
});

// ==========================================
// KHAI BÁO KIỂU DỮ LIỆU (Giúp ESLint vui vẻ)
// ==========================================
type HistoryItemType = {
  id: number;
  maCD: string;
  bacLuong: string;
  heSoLuong: number | string;
  mucLuong: number | string;
  vuotKhung: string;
  phuCap: string;
  ngayHuong: string;
  mocNangBac: string;
  soQD: string;
  nhomCD: string;
  isEditing: boolean;
};

type ProposalItemType = {
  id: number;
  maCD: string;
  bacCu: string;
  heSoCu: number | string;
  ngayHuong: string;
  tenCD: string;
  dinhKem: boolean;
  trangThai: string;
  bacMoi: string;
  heSoMoi: number | string;
  ngayTiepTheo: string;
  loaiNBL: string;
  isEditing: boolean;
};

// ==========================================
// COMPONENT 1: INFO ROW (Thông tin chung)
// ==========================================
function InfoRow({
  label,
  value,
  isEditing,
  onChange,
  name,
}: {
  label: string;
  value: string;
  isEditing?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}) {
  return (
    <div className="flex items-center text-sm">
      <div className="w-56 shrink-0 font-semibold text-gray-700 md:w-64">
        {label}
      </div>
      <div className="w-6 shrink-0 text-gray-600">:</div>
      <div className="flex-1 text-gray-800">
        {isEditing ? (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-[#008a70] focus:outline-none"
          />
        ) : (
          value
        )}
      </div>
    </div>
  );
}

// ==========================================
// COMPONENT 2: DÒNG NHẬT KÝ LƯƠNG
// ==========================================
function SalaryHistoryRow({
  item,
  index,
  onEdit,
  onSave,
  onDelete,
  onChange,
}: {
  item: HistoryItemType;
  index: number;
  onEdit: (id: number) => void;
  onSave: (id: number) => void;
  onDelete: (id: number) => void;
  onChange: (id: number, field: string, value: string) => void;
}) {
  return (
    <tr className="border-b border-gray-100 transition-colors hover:bg-gray-50">
      <td className="w-20 p-3">
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
      <td className="w-12 p-3 text-center text-gray-600">{index + 1}</td>
      <td className="p-3 font-medium text-gray-700">
        {item.isEditing ? (
          <input
            className="w-24 border-b border-gray-300 outline-none focus:border-[#008a70]"
            value={item.maCD}
            onChange={(e) => onChange(item.id, 'maCD', e.target.value)}
          />
        ) : (
          item.maCD
        )}
      </td>
      <td className="p-3 text-center">
        {item.isEditing ? (
          <input
            className="w-12 border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.bacLuong}
            onChange={(e) => onChange(item.id, 'bacLuong', e.target.value)}
          />
        ) : (
          item.bacLuong
        )}
      </td>
      <td className="p-3 text-center">
        {item.isEditing ? (
          <input
            type="number"
            className="w-16 border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.heSoLuong}
            onChange={(e) => onChange(item.id, 'heSoLuong', e.target.value)}
          />
        ) : (
          item.heSoLuong
        )}
      </td>
      <td className="p-3 text-right font-semibold">
        {item.isEditing ? (
          <input
            type="number"
            className="w-24 border-b border-gray-300 text-right outline-none focus:border-[#008a70]"
            value={item.mucLuong}
            onChange={(e) => onChange(item.id, 'mucLuong', e.target.value)}
          />
        ) : (
          Number(item.mucLuong).toLocaleString('vi-VN')
        )}
      </td>
      <td className="p-3 text-center">
        {item.isEditing ? (
          <input
            className="w-16 border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.vuotKhung}
            onChange={(e) => onChange(item.id, 'vuotKhung', e.target.value)}
          />
        ) : (
          item.vuotKhung
        )}
      </td>
      <td className="p-3 text-center">
        {item.isEditing ? (
          <input
            className="w-16 border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.phuCap}
            onChange={(e) => onChange(item.id, 'phuCap', e.target.value)}
          />
        ) : (
          item.phuCap
        )}
      </td>
      <td className="p-3 text-gray-600">
        {item.isEditing ? (
          <input
            className="w-24 border-b border-gray-300 outline-none focus:border-[#008a70]"
            value={item.ngayHuong}
            onChange={(e) => onChange(item.id, 'ngayHuong', e.target.value)}
          />
        ) : (
          item.ngayHuong
        )}
      </td>
      <td className="p-3 text-gray-600">
        {item.isEditing ? (
          <input
            className="w-24 border-b border-gray-300 outline-none focus:border-[#008a70]"
            value={item.mocNangBac}
            onChange={(e) => onChange(item.id, 'mocNangBac', e.target.value)}
          />
        ) : (
          item.mocNangBac
        )}
      </td>
      <td className="p-3 text-blue-600 italic">
        {item.isEditing ? (
          <input
            className="w-20 border-b border-gray-300 outline-none focus:border-[#008a70]"
            value={item.soQD}
            onChange={(e) => onChange(item.id, 'soQD', e.target.value)}
          />
        ) : (
          item.soQD
        )}
      </td>
      <td className="p-3 text-gray-600">
        {item.isEditing ? (
          <input
            className="w-20 border-b border-gray-300 outline-none focus:border-[#008a70]"
            value={item.nhomCD}
            onChange={(e) => onChange(item.id, 'nhomCD', e.target.value)}
          />
        ) : (
          item.nhomCD
        )}
      </td>
    </tr>
  );
}

// ==========================================
// COMPONENT 3: DÒNG ĐỀ XUẤT NÂNG LƯƠNG
// ==========================================
function ProposalRow({
  item,
  index,
  onEdit,
  onSave,
  onDelete,
  onChange,
}: {
  item: ProposalItemType;
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
          <button className="flex h-6 w-6 cursor-pointer items-center justify-center rounded bg-[#e0f2ef] text-[#008a70] transition-colors hover:bg-[#c2e5de]">
            <Eye className="h-3.5 w-3.5" />
          </button>

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
      <td className="border border-gray-200 p-3 text-gray-600">{index + 1}</td>

      <td className="border border-gray-200 p-3">
        {item.isEditing ? (
          <input
            className="w-20 border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.maCD}
            onChange={(e) => onChange(item.id, 'maCD', e.target.value)}
          />
        ) : (
          item.maCD
        )}
      </td>
      <td className="border border-gray-200 p-3">
        {item.isEditing ? (
          <input
            className="w-12 border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.bacCu}
            onChange={(e) => onChange(item.id, 'bacCu', e.target.value)}
          />
        ) : (
          item.bacCu
        )}
      </td>
      <td className="border border-gray-200 p-3 font-medium">
        {item.isEditing ? (
          <input
            type="number"
            className="w-16 border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.heSoCu}
            onChange={(e) => onChange(item.id, 'heSoCu', e.target.value)}
          />
        ) : (
          item.heSoCu
        )}
      </td>
      <td className="border border-gray-200 p-3">
        {item.isEditing ? (
          <input
            className="w-24 border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.ngayHuong}
            onChange={(e) => onChange(item.id, 'ngayHuong', e.target.value)}
          />
        ) : (
          item.ngayHuong
        )}
      </td>
      <td className="border border-gray-200 p-3 text-left">
        {item.isEditing ? (
          <input
            className="w-full border-b border-gray-300 outline-none focus:border-[#008a70]"
            value={item.tenCD}
            onChange={(e) => onChange(item.id, 'tenCD', e.target.value)}
          />
        ) : (
          item.tenCD
        )}
      </td>

      <td className="border border-gray-200 p-3">
        {item.dinhKem && (
          <span className="cursor-pointer text-[#008a70]">📎</span>
        )}
      </td>

      <td className="border border-gray-200 p-3">
        {item.isEditing ? (
          <input
            className="w-24 border-b border-gray-300 text-center text-xs outline-none focus:border-[#008a70]"
            value={item.trangThai}
            onChange={(e) => onChange(item.id, 'trangThai', e.target.value)}
          />
        ) : (
          <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600 uppercase">
            {item.trangThai}
          </span>
        )}
      </td>

      <td className="border border-gray-200 p-3 font-bold text-[#008a70]">
        {item.isEditing ? (
          <input
            className="w-12 border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.bacMoi}
            onChange={(e) => onChange(item.id, 'bacMoi', e.target.value)}
          />
        ) : (
          item.bacMoi
        )}
      </td>
      <td className="border border-gray-200 p-3 font-bold text-[#008a70]">
        {item.isEditing ? (
          <input
            type="number"
            className="w-16 border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.heSoMoi}
            onChange={(e) => onChange(item.id, 'heSoMoi', e.target.value)}
          />
        ) : (
          item.heSoMoi
        )}
      </td>
      <td className="border border-gray-200 p-3">
        {item.isEditing ? (
          <input
            className="w-24 border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.ngayTiepTheo}
            onChange={(e) => onChange(item.id, 'ngayTiepTheo', e.target.value)}
          />
        ) : (
          item.ngayTiepTheo
        )}
      </td>
      <td className="border border-gray-200 p-3 italic">
        {item.isEditing ? (
          <input
            className="w-24 border-b border-gray-300 text-center outline-none focus:border-[#008a70]"
            value={item.loaiNBL}
            onChange={(e) => onChange(item.id, 'loaiNBL', e.target.value)}
          />
        ) : (
          item.loaiNBL
        )}
      </td>
    </tr>
  );
}

function RouteComponent() {
  const [isEditingTop, setIsEditingTop] = useState(false);
  const [salaryInfo, setSalaryInfo] = useState({
    ngayHuong: '',
    nhomCDNN: '',
    maCDNN: '',
    heSoLuong: '',
    phuCapCV: '',
    phuCapKhac: '',
    phuCapTN: '',
    phuCapUD: '',
    phuCapKhuVuc: '',
    tiLeHuong: '',
    mocNangBac: '12/03/2026',
    ghiChu: '',
    soQD: '',
    chucDanhNN: '',
    bacLuong: '',
    vuotKhung: '',
    phuCapThamNien: '',
    phuCapDocHai: '',
    heSoThucHuong: '',
    ngayTangHeSo: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSalaryInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveTop = () => {
    console.log('Dữ liệu Thông tin chung lưu xuống DB:', salaryInfo);
    setIsEditingTop(false);
  };

  const [historyList, setHistoryList] = useState<HistoryItemType[]>([
    {
      id: 1,
      maCD: 'V.07.01.03',
      bacLuong: '2',
      heSoLuong: 4.98,
      mucLuong: 11500000,
      vuotKhung: '',
      phuCap: '',
      ngayHuong: '01/01/2024',
      mocNangBac: '01/01/2027',
      soQD: '',
      nhomCD: '',
      isEditing: false,
    },
  ]);

  const handleAddHistory = () => {
    setHistoryList([
      {
        id: Date.now(),
        maCD: '',
        bacLuong: '',
        heSoLuong: 0,
        mucLuong: 0,
        vuotKhung: '',
        phuCap: '',
        ngayHuong: '',
        mocNangBac: '',
        soQD: '',
        nhomCD: '',
        isEditing: true,
      },
      ...historyList,
    ]);
  };
  const handleEditHistory = (id: number) =>
    setHistoryList(
      historyList.map((item) =>
        item.id === id ? { ...item, isEditing: true } : item,
      ),
    );
  const handleSaveHistory = (id: number) =>
    setHistoryList(
      historyList.map((item) =>
        item.id === id ? { ...item, isEditing: false } : item,
      ),
    );
  const handleDeleteHistory = (id: number) =>
    setHistoryList(historyList.filter((item) => item.id !== id));
  const handleChangeHistory = (id: number, field: string, value: string) =>
    setHistoryList(
      historyList.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );

  const [proposalList, setProposalList] = useState<ProposalItemType[]>([
    {
      id: 1,
      maCD: 'V.07.01.03',
      bacCu: '1',
      heSoCu: 3.99,
      ngayHuong: '01/01/2021',
      tenCD: 'Giảng viên (hạng I)',
      dinhKem: true,
      trangThai: 'Đang chờ duyệt',
      bacMoi: '2',
      heSoMoi: 4.32,
      ngayTiepTheo: '01/01/2024',
      loaiNBL: 'Thường xuyên',
      isEditing: false,
    },
  ]);

  const handleAddProposal = () => {
    setProposalList([
      {
        id: Date.now(),
        maCD: '',
        bacCu: '',
        heSoCu: 0,
        ngayHuong: '',
        tenCD: '',
        dinhKem: false,
        trangThai: 'Nháp',
        bacMoi: '',
        heSoMoi: 0,
        ngayTiepTheo: '',
        loaiNBL: '',
        isEditing: true,
      },
      ...proposalList,
    ]);
  };
  const handleEditProposal = (id: number) =>
    setProposalList(
      proposalList.map((item) =>
        item.id === id ? { ...item, isEditing: true } : item,
      ),
    );
  const handleSaveProposal = (id: number) =>
    setProposalList(
      proposalList.map((item) =>
        item.id === id ? { ...item, isEditing: false } : item,
      ),
    );
  const handleDeleteProposal = (id: number) =>
    setProposalList(proposalList.filter((item) => item.id !== id));
  const handleChangeProposal = (id: number, field: string, value: string) =>
    setProposalList(
      proposalList.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );

  return (
    <div className="flex min-h-screen justify-center font-sans">
      <div className="flex w-full flex-col border border-gray-200 bg-white shadow-sm">
        {/* --- HEADER THÔNG TIN LƯƠNG --- */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-[#f0f9f6] p-3">
          <h1 className="ml-2 text-base font-bold text-[#008a70] uppercase md:text-lg">
            Thông tin lương
          </h1>
          <div className="flex gap-2">
            {!isEditingTop ? (
              <button
                onClick={() => setIsEditingTop(true)}
                className="flex items-center gap-2 rounded bg-[#f5b027] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-yellow-500"
              >
                <Edit className="h-4 w-4" />
                Cập nhật
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsEditingTop(false)}
                  className="flex items-center gap-2 rounded bg-gray-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-600"
                >
                  <X className="h-4 w-4" />
                  Hủy
                </button>
                <button
                  onClick={handleSaveTop}
                  className="flex items-center gap-2 rounded bg-[#00a680] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
                >
                  <Save className="h-4 w-4" />
                  Lưu
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 p-6 md:p-8">
          <div>
            <h3 className="mb-6 font-bold text-[#008a70] uppercase">
              Thông tin chung
            </h3>
            <div className="grid grid-cols-1 gap-x-16 gap-y-4 lg:grid-cols-2">
              <div className="space-y-4">
                <InfoRow
                  label="Ngày hưởng chế độ lương"
                  name="ngayHuong"
                  value={salaryInfo.ngayHuong}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Nhóm chức danh nghề nghiệp"
                  name="nhomCDNN"
                  value={salaryInfo.nhomCDNN}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Mã chức danh nghề nghiệp"
                  name="maCDNN"
                  value={salaryInfo.maCDNN}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Hệ số lương"
                  name="heSoLuong"
                  value={salaryInfo.heSoLuong}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Phụ cấp chức vụ, chức danh"
                  name="phuCapCV"
                  value={salaryInfo.phuCapCV}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Phụ cấp khác"
                  name="phuCapKhac"
                  value={salaryInfo.phuCapKhac}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Phụ cấp trách nhiệm"
                  name="phuCapTN"
                  value={salaryInfo.phuCapTN}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Phụ cấp ưu đãi nhà giáo"
                  name="phuCapUD"
                  value={salaryInfo.phuCapUD}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Phụ cấp khác (khu vực, lưu động)"
                  name="phuCapKhuVuc"
                  value={salaryInfo.phuCapKhuVuc}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Tỉ lệ hướng (%)"
                  name="tiLeHuong"
                  value={salaryInfo.tiLeHuong}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Mốc nâng bậc tiếp theo"
                  name="mocNangBac"
                  value={salaryInfo.mocNangBac}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Ghi chú"
                  name="ghiChu"
                  value={salaryInfo.ghiChu}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-4">
                <InfoRow
                  label="Số quyết định"
                  name="soQD"
                  value={salaryInfo.soQD}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Chức danh nghề nghiệp"
                  name="chucDanhNN"
                  value={salaryInfo.chucDanhNN}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Bậc lương"
                  name="bacLuong"
                  value={salaryInfo.bacLuong}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Vượt khung"
                  name="vuotKhung"
                  value={salaryInfo.vuotKhung}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Phụ cấp thâm niên nhà giáo"
                  name="phuCapThamNien"
                  value={salaryInfo.phuCapThamNien}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Phụ cấp độc hại"
                  name="phuCapDocHai"
                  value={salaryInfo.phuCapDocHai}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Hệ số thực hưởng"
                  name="heSoThucHuong"
                  value={salaryInfo.heSoThucHuong}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
                <InfoRow
                  label="Ngày tăng hệ số PCTNVK tiếp theo"
                  name="ngayTangHeSo"
                  value={salaryInfo.ngayTangHeSo}
                  isEditing={isEditingTop}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="my-8 border-t border-gray-300"></div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-[#008a70] uppercase">
                Nhật ký lương
              </h3>
              <button
                onClick={handleAddHistory}
                className="flex items-center gap-2 rounded bg-[#008a70] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
              >
                <Plus className="h-4 w-4" /> Thêm mới
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-max border-collapse text-left text-sm">
                <thead className="bg-[#f8fafc] text-gray-800">
                  <tr>
                    <th className="w-20 border border-gray-200 px-4 py-3 text-center font-semibold">
                      Thao tác
                    </th>
                    <th className="w-12 border border-gray-200 px-4 py-3 text-center font-semibold">
                      STT
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Mã chức danh
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-center font-semibold">
                      Bậc
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-center font-semibold">
                      Hệ số
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-right font-semibold">
                      Mức lương
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-center font-semibold">
                      Vượt khung
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-center font-semibold">
                      Phụ cấp
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Ngày hưởng
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Mốc nâng bậc
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Số QĐ
                    </th>
                    <th className="border border-gray-200 px-4 py-3 font-semibold">
                      Nhóm CD
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {historyList.map((item, index) => (
                    <SalaryHistoryRow
                      key={item.id}
                      item={item}
                      index={index}
                      onEdit={handleEditHistory}
                      onSave={handleSaveHistory}
                      onDelete={handleDeleteHistory}
                      onChange={handleChangeHistory}
                    />
                  ))}
                  {historyList.length === 0 && (
                    <tr>
                      <td
                        colSpan={12}
                        className="p-4 text-center text-gray-500"
                      >
                        Chưa có dữ liệu nhật ký lương.
                      </td>
                    </tr>
                  )}
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
              <button
                onClick={handleAddProposal}
                className="flex items-center gap-2 rounded bg-[#008a70] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-teal-700"
              >
                <Plus className="h-4 w-4" /> Tạo đề xuất mới
              </button>
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
                      Lương trước nâng bậc
                    </th>
                    <th
                      colSpan={4}
                      className="border border-gray-200 px-4 py-3 uppercase"
                    >
                      Đề nghị nâng bậc
                    </th>
                  </tr>
                  <tr>
                    <th className="border border-gray-200 px-4 py-3">
                      Mã CDNN
                    </th>
                    <th className="border border-gray-200 px-4 py-3">Bậc</th>
                    <th className="border border-gray-200 px-4 py-3">
                      Hệ số cũ
                    </th>
                    <th className="border border-gray-200 px-4 py-3">
                      Ngày hưởng
                    </th>
                    <th className="border border-gray-200 px-4 py-3">
                      Tên CDNN
                    </th>
                    <th className="border border-gray-200 px-4 py-3">
                      Đính kèm
                    </th>
                    <th className="border border-gray-200 px-4 py-3">
                      Trạng thái
                    </th>
                    <th className="border border-gray-200 px-4 py-3">
                      Bậc mới
                    </th>
                    <th className="border border-gray-200 px-4 py-3">
                      Hệ số mới
                    </th>
                    <th className="border border-gray-200 px-4 py-3">
                      Ngày tăng H/s
                    </th>
                    <th className="border border-gray-200 px-4 py-3">
                      Loại NBL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {proposalList.map((item, index) => (
                    <ProposalRow
                      key={item.id}
                      item={item}
                      index={index}
                      onEdit={handleEditProposal}
                      onSave={handleSaveProposal}
                      onDelete={handleDeleteProposal}
                      onChange={handleChangeProposal}
                    />
                  ))}
                  {proposalList.length === 0 && (
                    <tr>
                      <td
                        colSpan={13}
                        className="p-4 text-center text-gray-500"
                      >
                        Chưa có đề xuất nâng lương nào.
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
