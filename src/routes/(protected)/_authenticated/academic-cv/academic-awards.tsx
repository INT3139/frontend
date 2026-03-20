import { createFileRoute } from '@tanstack/react-router';
import {
  Download,
  Edit,
  Filter,
  Loader2,
  Paperclip,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../components/ui/table';
import type { AcademicAward } from '../../../../schemas/academic-cv/academic-awards';

export const Route = createFileRoute(
  '/(protected)/_authenticated/academic-cv/academic-awards',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [awards, setAwards] = useState<AcademicAward[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // --- STATE KẾT NỐI BACKEND ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  // --- STATE UI & FORM ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    soQuyetDinh: '',
    ngayQuyetDinh: '',
    tenGiaiThuong: '',
    tenCongTrinh: '',
    thuHang: '',
    fileDinhKem: '',
  });

  // --- API ---
  const fetchAwards = useCallback(async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        search: searchTerm,
        status: filterStatus,
        page: page.toString(),
        limit: '5',
      });
      const res = await fetch(`/api/academic-awards?${query.toString()}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setAwards(data.data);
      setTotalPages(data.totalPages);
    } catch {
      toast.error('Không thể tải dữ liệu!');
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, filterStatus, page]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAwards();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [fetchAwards]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const method = targetId ? 'PUT' : 'POST';
      const endpoint = targetId
        ? `/api/academic-awards/${targetId}`
        : '/api/academic-awards';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('API Error');

      toast.success(
        targetId
          ? 'Đã cập nhật giải thưởng thành công!'
          : 'Thêm mới giải thưởng thành công!',
      );
      closeModal();
      fetchAwards();
    } catch {
      toast.error('Có lỗi xảy ra khi lưu dữ liệu!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!targetId) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/academic-awards/${targetId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Đã xóa giải thưởng vĩnh viễn!');
      setIsDeleteModalOpen(false);
      setTargetId(null);
      if (awards.length === 1 && page > 1) setPage(page - 1);
      else fetchAwards();
    } catch {
      toast.error('Lỗi khi xóa giải thưởng!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (award: AcademicAward) => {
    setTargetId(award.id);
    setFormData({
      soQuyetDinh: award.soQuyetDinh,
      ngayQuyetDinh: award.ngayQuyetDinh,
      tenGiaiThuong: award.tenGiaiThuong,
      tenCongTrinh: award.tenCongTrinh,
      thuHang: award.thuHang,
      fileDinhKem: award.fileDinhKem || '',
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setTargetId(id);
    setIsDeleteModalOpen(true);
  };

  const handleExportExcel = () => {
    const headers = [
      'STT',
      'Số quyết định',
      'Ngày quyết định',
      'Tên giải thưởng',
      'Tên công trình được trao giải',
      'Thứ hạng',
      'Trạng thái',
    ];
    const csvRows = awards.map((a, index) =>
      [
        (page - 1) * 5 + index + 1,
        `"${a.soQuyetDinh}"`,
        a.ngayQuyetDinh,
        `"${a.tenGiaiThuong}"`,
        `"${a.tenCongTrinh}"`,
        `"${a.thuHang}"`,
        a.trangThai,
      ].join(','),
    );
    const csvContent = '\uFEFF' + headers.join(',') + '\n' + csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Giai_Thuong_KHCN.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Đã xuất file Excel!');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTargetId(null);
    setFormData({
      soQuyetDinh: '',
      ngayQuyetDinh: '',
      tenGiaiThuong: '',
      tenCongTrinh: '',
      thuHang: '',
      fileDinhKem: '',
    });
  };

  return (
    <div className="relative space-y-4 rounded-lg bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <h2 className="text-xl font-bold text-[#003366] uppercase">
          Giải thưởng khoa học và công nghệ
        </h2>
        <div className="flex flex-wrap items-center gap-2 lg:gap-3">
          <div className="relative">
            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Nhập từ khóa..."
              className="w-full pl-9 md:w-56"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <Button
            variant={showFilter ? 'secondary' : 'outline'}
            size="icon"
            onClick={() => setShowFilter(!showFilter)}
          >
            <Filter className="h-4 w-4 text-gray-600" />
          </Button>
          <Button
            variant="outline"
            className="whitespace-nowrap"
            onClick={handleExportExcel}
          >
            <Download className="mr-2 h-4 w-4" /> Xuất excel
          </Button>
          <Button
            className="bg-[#003366] whitespace-nowrap text-white hover:bg-[#002244]"
            onClick={() => setIsModalOpen(true)}
          >
            + Thêm mới
          </Button>
        </div>
      </div>

      {showFilter && (
        <div className="animate-in fade-in slide-in-from-top-2 flex items-center gap-4 rounded-md border bg-gray-50 p-3">
          <span className="text-sm font-medium text-gray-600">
            Lọc trạng thái:
          </span>
          <select
            className="rounded border bg-white px-3 py-1.5 text-sm"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">-- Tất cả --</option>
            <option value="approved">Đã duyệt</option>
            <option value="pending">Đang chờ</option>
            <option value="rejected">Từ chối</option>
          </select>
        </div>
      )}

      <div className="overflow-x-auto rounded-md border">
        <Table className="min-w-max">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12 text-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer rounded border-gray-300"
                />
              </TableHead>
              <TableHead className="w-24 text-center">Thao tác</TableHead>
              <TableHead className="w-16 text-center">STT</TableHead>
              <TableHead>Số quyết định</TableHead>
              <TableHead>Ngày quyết định</TableHead>
              <TableHead className="w-1/5">Tên giải thưởng</TableHead>
              <TableHead className="w-1/4">
                Tên công trình được trao giải
              </TableHead>
              <TableHead>Thứ hạng giải thưởng</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead className="text-center">File đính kèm</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="h-32 text-center text-gray-500"
                >
                  <Loader2 className="mx-auto mb-2 h-6 w-6 animate-spin text-blue-500" />{' '}
                  Đang tải dữ liệu...
                </TableCell>
              </TableRow>
            ) : awards.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="h-24 text-center text-gray-500"
                >
                  Không tìm thấy kết quả phù hợp
                </TableCell>
              </TableRow>
            ) : (
              awards.map((award, index) => (
                <TableRow key={award.id} className="hover:bg-blue-50/50">
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-3 text-gray-500">
                      <button
                        onClick={() => handleEditClick(award)}
                        title="Sửa"
                        className="hover:text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(award.id)}
                        title="Xóa"
                        className="hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {(page - 1) * 5 + index + 1}
                  </TableCell>
                  <TableCell className="font-semibold">
                    {award.soQuyetDinh}
                  </TableCell>
                  <TableCell>{award.ngayQuyetDinh}</TableCell>
                  <TableCell className="whitespace-normal">
                    {award.tenGiaiThuong}
                  </TableCell>
                  <TableCell className="whitespace-normal">
                    {award.tenCongTrinh}
                  </TableCell>
                  <TableCell>{award.thuHang}</TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {award.trangThai === 'approved' && (
                      <Badge className="bg-emerald-500">Đã duyệt</Badge>
                    )}
                    {award.trangThai === 'pending' && (
                      <Badge className="bg-amber-500">Đang chờ</Badge>
                    )}
                    {award.trangThai === 'rejected' && (
                      <Badge className="bg-rose-500">Từ chối</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {award.fileDinhKem ? (
                      <button
                        title="Tải xuống file đính kèm"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Paperclip className="mx-auto h-4 w-4" />
                      </button>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-gray-500">
            Trang {page} / {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Sau
            </Button>
          </div>
        </div>
      )}

      {/* Modal Thêm/Sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="animate-in zoom-in-95 relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="mb-6 border-b pb-2 text-xl font-bold text-[#003366]">
              {targetId ? 'Cập nhật' : 'Thêm mới'} Giải thưởng KH&CN
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Số quyết định *</label>
                  <Input
                    required
                    value={formData.soQuyetDinh}
                    onChange={(e) =>
                      setFormData({ ...formData, soQuyetDinh: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    Ngày quyết định *
                  </label>
                  <Input
                    type="date"
                    required
                    value={formData.ngayQuyetDinh}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ngayQuyetDinh: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium">
                    Tên giải thưởng *
                  </label>
                  <Input
                    required
                    value={formData.tenGiaiThuong}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tenGiaiThuong: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium">
                    Tên công trình được trao giải *
                  </label>
                  <Input
                    required
                    value={formData.tenCongTrinh}
                    onChange={(e) =>
                      setFormData({ ...formData, tenCongTrinh: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    Thứ hạng giải thưởng
                  </label>
                  <Input
                    value={formData.thuHang}
                    onChange={(e) =>
                      setFormData({ ...formData, thuHang: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">File đính kèm</label>
                  <Input
                    type="file"
                    onChange={(e) => {
                      // Xử lý upload tĩnh tại front-end bằng cách lưu tên file giả
                      const file = e.target.files?.[0];
                      if (file) {
                        setFormData({ ...formData, fileDinhKem: file.name });
                      }
                    }}
                  />
                  {formData.fileDinhKem && (
                    <p className="mt-1 text-xs text-blue-600">
                      Đã chọn: {formData.fileDinhKem}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
                  disabled={isSubmitting}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="w-32 bg-[#003366] text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : targetId ? (
                    'Cập nhật'
                  ) : (
                    'Lưu'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Xóa */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="animate-in zoom-in-95 w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-xl">
            <Trash2 className="mx-auto mb-4 h-12 w-12 text-red-500" />
            <h3 className="mb-2 text-lg font-bold">Xác nhận xóa?</h3>
            <p className="mb-6 text-sm text-gray-500">
              Bạn có chắc chắn muốn xóa giải thưởng này? Hành động này không thể
              hoàn tác.
            </p>
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isSubmitting}
              >
                Hủy
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={isSubmitting}
                className="w-24"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Xóa ngay'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
