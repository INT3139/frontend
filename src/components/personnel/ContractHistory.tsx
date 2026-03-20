import { HeaderWrapper } from '@/components/main/HeaderWrapper';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Download, Edit, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

// ==========================================
// KHAI BÁO KIỂU DỮ LIỆU
// ==========================================
export type ContractItemType = {
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
};

export type ExtensionItemType = {
  id: number;
  soQD: string;
  ngayKy: string;
  thoiGianKeoDai: string;
  ngayBatDau: string;
  ngayKetThuc: string;
  donVi: string;
  chucDanh: string;
};

// ==========================================
// COMPONENT FORM: HỢP ĐỒNG
// ==========================================
function ContractForm({
  initialValues,
  onSubmit,
  onCancel,
}: {
  initialValues: Partial<ContractItemType>;
  onSubmit: (data: Partial<ContractItemType>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<ContractItemType>>({
    soHD: '',
    loaiHD: '',
    ngayHieuLuc: '',
    ngayHetHan: '',
    donVi: '',
    isCurrent: false,
    congViec: '',
    doiTuong: '',
    ngayBHXH: '',
    ...initialValues,
  });

  const handleChange = (
    field: keyof ContractItemType,
    value: string | boolean,
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
          <Label>Số hợp đồng</Label>
          <Input
            value={formData.soHD}
            onChange={(e) => handleChange('soHD', e.target.value)}
            placeholder="Nhập số HD..."
          />
        </div>
        <div className="space-y-2">
          <Label>Loại hợp đồng</Label>
          <Input
            value={formData.loaiHD}
            onChange={(e) => handleChange('loaiHD', e.target.value)}
            placeholder="Nhập loại HD..."
          />
        </div>
        <div className="space-y-2">
          <Label>Ngày hiệu lực</Label>
          <Input
            value={formData.ngayHieuLuc}
            onChange={(e) => handleChange('ngayHieuLuc', e.target.value)}
            placeholder="DD/MM/YYYY"
          />
        </div>
        <div className="space-y-2">
          <Label>Ngày hết hiệu lực</Label>
          <Input
            value={formData.ngayHetHan}
            onChange={(e) => handleChange('ngayHetHan', e.target.value)}
            placeholder="DD/MM/YYYY"
          />
        </div>
        <div className="space-y-2">
          <Label>Đơn vị tuyển</Label>
          <Input
            value={formData.donVi}
            onChange={(e) => handleChange('donVi', e.target.value)}
            placeholder="Nhập đơn vị..."
          />
        </div>
        <div className="space-y-2">
          <Label>Công việc đảm nhận</Label>
          <Input
            value={formData.congViec}
            onChange={(e) => handleChange('congViec', e.target.value)}
            placeholder="Nhập công việc..."
          />
        </div>
        <div className="space-y-2">
          <Label>Đối tượng</Label>
          <Input
            value={formData.doiTuong}
            onChange={(e) => handleChange('doiTuong', e.target.value)}
            placeholder="Nhập đối tượng..."
          />
        </div>
        <div className="space-y-2">
          <Label>Ngày đóng BHXH</Label>
          <Input
            value={formData.ngayBHXH}
            onChange={(e) => handleChange('ngayBHXH', e.target.value)}
            placeholder="DD/MM/YYYY"
          />
        </div>
        <div className="mt-2 flex items-center space-x-2 md:col-span-2">
          <input
            type="checkbox"
            id="isCurrent"
            checked={formData.isCurrent}
            onChange={(e) => handleChange('isCurrent', e.target.checked)}
            className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-[#008a70]"
          />
          <Label htmlFor="isCurrent" className="cursor-pointer">
            Là hợp đồng hiện tại
          </Label>
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
// COMPONENT FORM: KÉO DÀI THỜI GIAN
// ==========================================
function ExtensionForm({
  initialValues,
  onSubmit,
  onCancel,
}: {
  initialValues: Partial<ExtensionItemType>;
  onSubmit: (data: Partial<ExtensionItemType>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<ExtensionItemType>>({
    soQD: '',
    ngayKy: '',
    thoiGianKeoDai: '',
    ngayBatDau: '',
    ngayKetThuc: '',
    donVi: '',
    chucDanh: '',
    ...initialValues,
  });

  const handleChange = (field: keyof ExtensionItemType, value: string) => {
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
          <Label>Số quyết định</Label>
          <Input
            value={formData.soQD}
            onChange={(e) => handleChange('soQD', e.target.value)}
            placeholder="Nhập số QĐ..."
          />
        </div>
        <div className="space-y-2">
          <Label>Ngày ký</Label>
          <Input
            value={formData.ngayKy}
            onChange={(e) => handleChange('ngayKy', e.target.value)}
            placeholder="DD/MM/YYYY"
          />
        </div>
        <div className="space-y-2">
          <Label>Thời gian kéo dài</Label>
          <Input
            value={formData.thoiGianKeoDai}
            onChange={(e) => handleChange('thoiGianKeoDai', e.target.value)}
            placeholder="Nhập thời gian..."
          />
        </div>
        <div className="space-y-2">
          <Label>Ngày bắt đầu</Label>
          <Input
            value={formData.ngayBatDau}
            onChange={(e) => handleChange('ngayBatDau', e.target.value)}
            placeholder="DD/MM/YYYY"
          />
        </div>
        <div className="space-y-2">
          <Label>Ngày kết thúc</Label>
          <Input
            value={formData.ngayKetThuc}
            onChange={(e) => handleChange('ngayKetThuc', e.target.value)}
            placeholder="DD/MM/YYYY"
          />
        </div>
        <div className="space-y-2">
          <Label>Đơn vị sử dụng</Label>
          <Input
            value={formData.donVi}
            onChange={(e) => handleChange('donVi', e.target.value)}
            placeholder="Nhập đơn vị..."
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Chức danh (chức vụ)</Label>
          <Input
            value={formData.chucDanh}
            onChange={(e) => handleChange('chucDanh', e.target.value)}
            placeholder="Nhập chức danh..."
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
// MAIN COMPONENT
// ==========================================
export default function ContractHistory() {
  // STATE: Dữ liệu
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
    },
  ]);
  const [extensions, setExtensions] = useState<ExtensionItemType[]>([]);

  // STATE: Quản lý Dialog Hợp đồng
  const [isContractDialogOpen, setIsContractDialogOpen] = useState(false);
  const [editingContract, setEditingContract] =
    useState<ContractItemType | null>(null);

  // STATE: Quản lý Dialog Kéo dài thời gian
  const [isExtensionDialogOpen, setIsExtensionDialogOpen] = useState(false);
  const [editingExtension, setEditingExtension] =
    useState<ExtensionItemType | null>(null);

  // HANDLERS: Hợp đồng
  const handleOpenContractForm = (contract: ContractItemType | null = null) => {
    setEditingContract(contract);
    setIsContractDialogOpen(true);
  };

  const handleSubmitContract = (data: Partial<ContractItemType>) => {
    if (editingContract) {
      setContracts(
        contracts.map((item) =>
          item.id === editingContract.id
            ? ({ ...item, ...data } as ContractItemType)
            : item,
        ),
      );
    } else {
      setContracts([
        { ...data, id: Date.now() } as ContractItemType,
        ...contracts,
      ]);
    }
    setIsContractDialogOpen(false);
  };

  const handleDeleteContract = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
      setContracts(contracts.filter((item) => item.id !== id));
    }
  };

  // HANDLERS: Kéo dài thời gian
  const handleOpenExtensionForm = (
    extension: ExtensionItemType | null = null,
  ) => {
    setEditingExtension(extension);
    setIsExtensionDialogOpen(true);
  };

  const handleSubmitExtension = (data: Partial<ExtensionItemType>) => {
    if (editingExtension) {
      setExtensions(
        extensions.map((item) =>
          item.id === editingExtension.id
            ? ({ ...item, ...data } as ExtensionItemType)
            : item,
        ),
      );
    } else {
      setExtensions([
        { ...data, id: Date.now() } as ExtensionItemType,
        ...extensions,
      ]);
    }
    setIsExtensionDialogOpen(false);
  };

  const handleDeleteExtension = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
      setExtensions(extensions.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="flex flex-col">
      <HeaderWrapper title="Quá trình ký hợp đồng & Kéo dài chuyên môn">
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Xuất lý lịch
          </Button>
        </div>
      </HeaderWrapper>

      <div className="space-y-8 px-4 py-6">
        {/* BẢNG 1: QUÁ TRÌNH KÝ HỢP ĐỒNG */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">
              I. Quá trình ký hợp đồng
            </h3>
            <Button onClick={() => handleOpenContractForm(null)}>
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
                    Số hợp đồng
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800">
                    Loại hợp đồng
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-800">
                    Ngày hiệu lực
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-800">
                    Ngày hết hạn
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800">
                    Đơn vị tuyển
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-800">
                    HĐ hiện tại
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800">
                    Công việc
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800">
                    Đối tượng
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-800">
                    Đóng BHXH
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.length > 0 ? (
                  contracts.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 px-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            onClick={() => handleOpenContractForm(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 px-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleDeleteContract(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {item.soHD || '---'}
                      </TableCell>
                      <TableCell>{item.loaiHD || '---'}</TableCell>
                      <TableCell className="text-center">
                        {item.ngayHieuLuc || '---'}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.ngayHetHan || '---'}
                      </TableCell>
                      <TableCell>{item.donVi || '---'}</TableCell>
                      <TableCell className="text-center">
                        {item.isCurrent ? (
                          <span className="font-medium text-blue-600">
                            Đang hiệu lực
                          </span>
                        ) : (
                          '---'
                        )}
                      </TableCell>
                      <TableCell>{item.congViec || '---'}</TableCell>
                      <TableCell>{item.doiTuong || '---'}</TableCell>
                      <TableCell className="text-center">
                        {item.ngayBHXH || '---'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={10}
                      className="h-32 text-center text-gray-500"
                    >
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* BẢNG 2: KÉO DÀI THỜI GIAN */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">
              II. Quá trình kéo dài thời gian làm công tác chuyên môn
            </h3>
            <Button onClick={() => handleOpenExtensionForm(null)}>
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
                  <TableHead className="font-semibold text-gray-800">
                    Số quyết định
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-800">
                    Ngày ký
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-800">
                    T/G kéo dài
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-800">
                    Ngày bắt đầu
                  </TableHead>
                  <TableHead className="text-center font-semibold text-gray-800">
                    Ngày kết thúc
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800">
                    Đơn vị sử dụng
                  </TableHead>
                  <TableHead className="font-semibold text-gray-800">
                    Chức danh
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {extensions.length > 0 ? (
                  extensions.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">
                        <div className="flex justify-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 px-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            onClick={() => handleOpenExtensionForm(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 px-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleDeleteExtension(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.soQD || '---'}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.ngayKy || '---'}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.thoiGianKeoDai || '---'}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.ngayBatDau || '---'}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.ngayKetThuc || '---'}
                      </TableCell>
                      <TableCell>{item.donVi || '---'}</TableCell>
                      <TableCell>{item.chucDanh || '---'}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="h-32 text-center text-gray-500"
                    >
                      Không có dữ liệu
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* DIALOG: FORM HỢP ĐỒNG */}
      <Dialog
        open={isContractDialogOpen}
        onOpenChange={setIsContractDialogOpen}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              {editingContract ? 'Cập nhật' : 'Thêm mới'} thông tin hợp đồng
            </DialogTitle>
          </DialogHeader>
          <ContractForm
            initialValues={editingContract || {}}
            onSubmit={handleSubmitContract}
            onCancel={() => setIsContractDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* DIALOG: FORM KÉO DÀI THỜI GIAN */}
      <Dialog
        open={isExtensionDialogOpen}
        onOpenChange={setIsExtensionDialogOpen}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              {editingExtension ? 'Cập nhật' : 'Thêm mới'} thông tin kéo dài
              thời gian
            </DialogTitle>
          </DialogHeader>
          <ExtensionForm
            initialValues={editingExtension || {}}
            onSubmit={handleSubmitExtension}
            onCancel={() => setIsExtensionDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
