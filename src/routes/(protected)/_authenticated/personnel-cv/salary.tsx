import { HeaderWrapper } from '@/components/main/HeaderWrapper';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { createFileRoute } from '@tanstack/react-router';
import { Edit, Eye, PlusCircle, Save, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';

export const Route = createFileRoute(
  '/(protected)/_authenticated/personnel-cv/salary',
)({
  component: RouteComponent,
});

// ==========================================
// COMPONENT TỰ CUSTOM (Thay thế cho Input/Label tránh lỗi thiếu module)
// ==========================================
const CustomInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:border-[#008a70] focus-visible:ring-1 focus-visible:ring-[#008a70] focus-visible:outline-none ${props.className || ''}`}
  />
);

const CustomLabel = ({
  children,
  className,
  htmlFor,
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm leading-none font-medium text-gray-700 ${className || ''}`}
  >
    {children}
  </label>
);

// ==========================================
// KHAI BÁO KIỂU DỮ LIỆU
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
};

// ==========================================
// COMPONENT: INFO ROW (Thông tin chung)
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
    <div className="flex items-center border-b py-2 text-sm">
      <div className="w-56 shrink-0 font-semibold tracking-wider text-gray-800 md:w-72">
        {label}
      </div>
      <div className="w-6 shrink-0 text-gray-600">:</div>
      <div className="flex-1 leading-relaxed text-gray-800">
        {isEditing ? (
          <CustomInput
            name={name}
            value={value}
            onChange={onChange}
            className="h-8"
          />
        ) : (
          value || '---'
        )}
      </div>
    </div>
  );
}

// ==========================================
// FORM DIALOG: NHẬT KÝ LƯƠNG
// ==========================================
function HistoryForm({
  initialValues,
  onSubmit,
  onCancel,
}: {
  initialValues: Partial<HistoryItemType>;
  onSubmit: (data: Partial<HistoryItemType>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<HistoryItemType>>({
    maCD: '',
    bacLuong: '',
    heSoLuong: '',
    mucLuong: '',
    vuotKhung: '',
    phuCap: '',
    ngayHuong: '',
    mocNangBac: '',
    soQD: '',
    nhomCD: '',
    ...initialValues,
  });

  const handleChange = (
    field: keyof HistoryItemType,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-4 py-4"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <CustomLabel>Mã chức danh</CustomLabel>
          <CustomInput
            value={formData.maCD}
            onChange={(e) => handleChange('maCD', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <CustomLabel>Nhóm chức danh</CustomLabel>
          <CustomInput
            value={formData.nhomCD}
            onChange={(e) => handleChange('nhomCD', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <CustomLabel>Bậc lương</CustomLabel>
          <CustomInput
            value={formData.bacLuong}
            onChange={(e) => handleChange('bacLuong', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <CustomLabel>Hệ số lương</CustomLabel>
          <CustomInput
            type="number"
            step="0.01"
            value={formData.heSoLuong}
            onChange={(e) => handleChange('heSoLuong', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <CustomLabel>Mức lương</CustomLabel>
          <CustomInput
            type="number"
            value={formData.mucLuong}
            onChange={(e) => handleChange('mucLuong', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <CustomLabel>Vượt khung (%)</CustomLabel>
          <CustomInput
            value={formData.vuotKhung}
            onChange={(e) => handleChange('vuotKhung', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <CustomLabel>Phụ cấp</CustomLabel>
          <CustomInput
            value={formData.phuCap}
            onChange={(e) => handleChange('phuCap', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <CustomLabel>Ngày hưởng</CustomLabel>
          <CustomInput
            value={formData.ngayHuong}
            onChange={(e) => handleChange('ngayHuong', e.target.value)}
            placeholder="DD/MM/YYYY"
          />
        </div>
        <div className="space-y-2">
          <CustomLabel>Mốc nâng bậc</CustomLabel>
          <CustomInput
            value={formData.mocNangBac}
            onChange={(e) => handleChange('mocNangBac', e.target.value)}
            placeholder="DD/MM/YYYY"
          />
        </div>
        <div className="space-y-2">
          <CustomLabel>Số QĐ</CustomLabel>
          <CustomInput
            value={formData.soQD}
            onChange={(e) => handleChange('soQD', e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 border-t pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit">Xác nhận</Button>
      </div>
    </form>
  );
}

// ==========================================
// FORM DIALOG: ĐỀ XUẤT NÂNG LƯƠNG
// ==========================================
function ProposalForm({
  initialValues,
  onSubmit,
  onCancel,
}: {
  initialValues: Partial<ProposalItemType>;
  onSubmit: (data: Partial<ProposalItemType>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<ProposalItemType>>({
    maCD: '',
    bacCu: '',
    heSoCu: '',
    ngayHuong: '',
    tenCD: '',
    dinhKem: false,
    trangThai: 'Nháp',
    bacMoi: '',
    heSoMoi: '',
    ngayTiepTheo: '',
    loaiNBL: '',
    ...initialValues,
  });

  const handleChange = (
    field: keyof ProposalItemType,
    value: string | number | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-4 py-4"
    >
      <div className="rounded-md border bg-gray-50/50 p-4 shadow-sm">
        <h4 className="mb-3 font-semibold text-[#008a70]">
          Lương trước nâng bậc
        </h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <CustomLabel>Tên CDNN</CustomLabel>
            <CustomInput
              value={formData.tenCD}
              onChange={(e) => handleChange('tenCD', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <CustomLabel>Mã CDNN</CustomLabel>
            <CustomInput
              value={formData.maCD}
              onChange={(e) => handleChange('maCD', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <CustomLabel>Bậc cũ</CustomLabel>
            <CustomInput
              value={formData.bacCu}
              onChange={(e) => handleChange('bacCu', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <CustomLabel>Hệ số cũ</CustomLabel>
            <CustomInput
              type="number"
              step="0.01"
              value={formData.heSoCu}
              onChange={(e) => handleChange('heSoCu', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <CustomLabel>Ngày hưởng</CustomLabel>
            <CustomInput
              value={formData.ngayHuong}
              onChange={(e) => handleChange('ngayHuong', e.target.value)}
              placeholder="DD/MM/YYYY"
            />
          </div>
        </div>
      </div>

      <div className="rounded-md border bg-green-50/30 p-4 shadow-sm">
        <h4 className="mb-3 font-semibold text-[#008a70]">Đề nghị nâng bậc</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <CustomLabel>Bậc mới</CustomLabel>
            <CustomInput
              value={formData.bacMoi}
              onChange={(e) => handleChange('bacMoi', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <CustomLabel>Hệ số mới</CustomLabel>
            <CustomInput
              type="number"
              step="0.01"
              value={formData.heSoMoi}
              onChange={(e) => handleChange('heSoMoi', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <CustomLabel>Ngày tăng H/s</CustomLabel>
            <CustomInput
              value={formData.ngayTiepTheo}
              onChange={(e) => handleChange('ngayTiepTheo', e.target.value)}
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div className="space-y-2">
            <CustomLabel>Loại NBL</CustomLabel>
            <CustomInput
              value={formData.loaiNBL}
              onChange={(e) => handleChange('loaiNBL', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <CustomLabel>Trạng thái</CustomLabel>
            <CustomInput
              value={formData.trangThai}
              onChange={(e) => handleChange('trangThai', e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2 pt-8">
            <input
              type="checkbox"
              id="dinhKem"
              checked={formData.dinhKem}
              onChange={(e) => handleChange('dinhKem', e.target.checked)}
              className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-[#008a70]"
            />
            <CustomLabel htmlFor="dinhKem" className="cursor-pointer">
              Có tệp đính kèm
            </CustomLabel>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit">Xác nhận</Button>
      </div>
    </form>
  );
}

// ==========================================
// MÀN HÌNH CHÍNH
// ==========================================
function RouteComponent() {
  // --- STATE: THÔNG TIN CHUNG ---
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

  // --- STATE: NHẬT KÝ LƯƠNG ---
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
    },
  ]);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [editingHistory, setEditingHistory] = useState<HistoryItemType | null>(
    null,
  );

  const handleOpenHistoryForm = (item: HistoryItemType | null = null) => {
    setEditingHistory(item);
    setIsHistoryDialogOpen(true);
  };

  const handleSubmitHistory = (data: Partial<HistoryItemType>) => {
    if (editingHistory) {
      setHistoryList(
        historyList.map((item) =>
          item.id === editingHistory.id
            ? ({ ...item, ...data } as HistoryItemType)
            : item,
        ),
      );
    } else {
      setHistoryList([
        { ...data, id: Date.now() } as HistoryItemType,
        ...historyList,
      ]);
    }
    setIsHistoryDialogOpen(false);
  };

  const handleDeleteHistory = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
      setHistoryList(historyList.filter((item) => item.id !== id));
    }
  };

  // --- STATE: ĐỀ XUẤT NÂNG LƯƠNG ---
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
    },
  ]);
  const [isProposalDialogOpen, setIsProposalDialogOpen] = useState(false);
  const [editingProposal, setEditingProposal] =
    useState<ProposalItemType | null>(null);

  const handleOpenProposalForm = (item: ProposalItemType | null = null) => {
    setEditingProposal(item);
    setIsProposalDialogOpen(true);
  };

  const handleSubmitProposal = (data: Partial<ProposalItemType>) => {
    if (editingProposal) {
      setProposalList(
        proposalList.map((item) =>
          item.id === editingProposal.id
            ? ({ ...item, ...data } as ProposalItemType)
            : item,
        ),
      );
    } else {
      setProposalList([
        { ...data, id: Date.now() } as ProposalItemType,
        ...proposalList,
      ]);
    }
    setIsProposalDialogOpen(false);
  };

  const handleDeleteProposal = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
      setProposalList(proposalList.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="flex flex-col">
      <HeaderWrapper title="Thông tin lương">
        <div className="flex gap-2">
          {!isEditingTop ? (
            <Button variant="outline" onClick={() => setIsEditingTop(true)}>
              <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa thông tin
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => setIsEditingTop(false)}
              >
                <X className="mr-2 h-4 w-4" /> Hủy
              </Button>
              <Button onClick={handleSaveTop}>
                <Save className="mr-2 h-4 w-4" /> Lưu
              </Button>
            </>
          )}
        </div>
      </HeaderWrapper>

      <div className="space-y-8 px-4 py-6">
        {/* PHẦN 1: THÔNG TIN CHUNG */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-gray-800">
            I. Thông tin chung
          </h3>
          <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-2">
            <div className="space-y-1">
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
                label="Tỉ lệ hưởng (%)"
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
            <div className="space-y-1">
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

        {/* PHẦN 2: NHẬT KÝ LƯƠNG */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">
              II. Nhật ký lương
            </h3>
            <Button onClick={() => handleOpenHistoryForm(null)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Thêm mới
            </Button>
          </div>
          <div className="overflow-hidden rounded-md border text-sm">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-24 text-center font-semibold text-gray-800">
                    Thao tác
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-800">
                    Số QĐ
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800">
                    Nhóm CD
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800">
                    Mã CD
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-800">
                    Bậc
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-800">
                    Hệ số
                  </TableHead>
                  <TableHead className="text-right font-semibold text-gray-800">
                    Mức lương
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-800">
                    Vượt khung
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-800">
                    Phụ cấp
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800">
                    Ngày hưởng
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800">
                    Mốc nâng bậc
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyList.length > 0 ? (
                  historyList.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 px-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            onClick={() => handleOpenHistoryForm(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 px-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleDeleteHistory(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-blue-600 italic">
                        {item.soQD || '---'}
                      </TableCell>
                      <TableCell>{item.nhomCD || '---'}</TableCell>
                      <TableCell className="font-medium text-gray-700">
                        {item.maCD || '---'}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.bacLuong || '---'}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.heSoLuong || '---'}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {item.mucLuong
                          ? Number(item.mucLuong).toLocaleString('vi-VN')
                          : '---'}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.vuotKhung || '---'}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.phuCap || '---'}
                      </TableCell>
                      <TableCell>{item.ngayHuong || '---'}</TableCell>
                      <TableCell>{item.mocNangBac || '---'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={11}
                      className="h-32 text-center text-gray-500"
                    >
                      Chưa có dữ liệu nhật ký lương.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* PHẦN 3: ĐỀ XUẤT NÂNG LƯƠNG */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">
              III. Đề xuất nâng lương
            </h3>
            <Button onClick={() => handleOpenProposalForm(null)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Tạo đề xuất mới
            </Button>
          </div>
          <div className="overflow-hidden rounded-md border text-sm">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead
                    rowSpan={2}
                    className="w-24 border-r border-gray-200 text-center align-middle font-semibold text-gray-800"
                  >
                    Thao tác
                  </TableHead>
                  <TableHead
                    colSpan={6}
                    className="border-r border-b border-gray-200 bg-gray-100/50 text-center font-bold text-gray-800 uppercase"
                  >
                    Lương trước nâng bậc
                  </TableHead>
                  <TableHead
                    colSpan={4}
                    className="border-b border-gray-200 bg-green-50/50 text-center font-bold text-[#008a70] uppercase"
                  >
                    Đề nghị nâng bậc
                  </TableHead>
                </TableRow>
                <TableRow>
                  <TableHead className="font-semibold text-gray-800">
                    Tên CDNN
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800">
                    Mã CDNN
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-800">
                    Bậc cũ
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-800">
                    Hệ số cũ
                  </TableHead>
                  <TableHead className="border-r border-gray-200 font-semibold text-gray-800">
                    Ngày hưởng
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-800">
                    Đính kèm
                  </TableHead>
                  <TableHead className="bg-green-50/50 text-center font-semibold text-[#008a70]">
                    Bậc mới
                  </TableHead>
                  <TableHead className="bg-green-50/50 text-center font-semibold text-[#008a70]">
                    Hệ số mới
                  </TableHead>
                  <TableHead className="bg-green-50/50 text-center font-semibold text-gray-800">
                    Ngày tăng H/s
                  </TableHead>
                  <TableHead className="bg-green-50/50 text-center font-semibold text-gray-800">
                    Trạng thái
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {proposalList.length > 0 ? (
                  proposalList.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="border-r border-gray-200 text-center">
                        <div className="flex justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 px-0 text-teal-600 hover:bg-teal-50 hover:text-teal-700"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 px-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            onClick={() => handleOpenProposalForm(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 px-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleDeleteProposal(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-gray-700">
                        {item.tenCD || '---'}
                      </TableCell>
                      <TableCell>{item.maCD || '---'}</TableCell>
                      <TableCell className="text-center">
                        {item.bacCu || '---'}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.heSoCu || '---'}
                      </TableCell>
                      <TableCell className="border-r border-gray-200">
                        {item.ngayHuong || '---'}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.dinhKem ? (
                          <span className="text-[#008a70]">📎</span>
                        ) : (
                          '---'
                        )}
                      </TableCell>
                      <TableCell className="bg-green-50/10 text-center font-bold text-[#008a70]">
                        {item.bacMoi || '---'}
                      </TableCell>
                      <TableCell className="bg-green-50/10 text-center font-bold text-[#008a70]">
                        {item.heSoMoi || '---'}
                      </TableCell>
                      <TableCell className="bg-green-50/10 text-center">
                        {item.ngayTiepTheo || '---'}
                      </TableCell>
                      <TableCell className="bg-green-50/10 text-center">
                        <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600 uppercase">
                          {item.trangThai || 'Nháp'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={11}
                      className="h-32 text-center text-gray-500"
                    >
                      Chưa có đề xuất nâng lương nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* DIALOG: NHẬT KÝ LƯƠNG */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              {editingHistory ? 'Cập nhật' : 'Thêm mới'} nhật ký lương
            </DialogTitle>
          </DialogHeader>
          <HistoryForm
            initialValues={editingHistory || {}}
            onSubmit={handleSubmitHistory}
            onCancel={() => setIsHistoryDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* DIALOG: ĐỀ XUẤT NÂNG LƯƠNG */}
      <Dialog
        open={isProposalDialogOpen}
        onOpenChange={setIsProposalDialogOpen}
      >
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              {editingProposal ? 'Cập nhật' : 'Tạo'} đề xuất nâng lương
            </DialogTitle>
          </DialogHeader>
          <ProposalForm
            initialValues={editingProposal || {}}
            onSubmit={handleSubmitProposal}
            onCancel={() => setIsProposalDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
