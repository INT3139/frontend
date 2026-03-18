import { createFileRoute } from '@tanstack/react-router';
import {
  Download,
  Edit,
  Filter,
  Loader2,
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
import type { ScholarlyWork } from '../../../../schemas/academic-cv/scholarly-works';

export const Route = createFileRoute(
  '/(protected)/_authenticated/academic-cv/scholarly-works',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [works, setWorks] = useState<ScholarlyWork[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    tenSach: '',
    loaiSach: '',
    vaiTro: '',
    nhaXuatBan: '',
    namXuatBan: '',
    isbn: '',
  });

  // Gọi API
  const fetchWorks = useCallback(async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        search: searchTerm,
        status: filterStatus,
        page: page.toString(),
        limit: '5',
      });
      const res = await fetch(`/api/scholarly-works?${query.toString()}`);
      if (!res.ok) throw new Error('Error');
      const data = await res.json();
      setWorks(data.data);
      setTotalPages(data.totalPages);
    } catch {
      toast.error('Không thể tải dữ liệu!');
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, filterStatus, page]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchWorks();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [fetchWorks]);

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const method = targetId ? 'PUT' : 'POST';
      const endpoint = targetId
        ? `/api/scholarly-works/${targetId}`
        : '/api/scholarly-works';
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('API Error');
      toast.success(targetId ? 'Đã cập nhật sách!' : 'Thêm sách thành công!');
      closeModal();
      fetchWorks();
    } catch {
      toast.error('Lỗi khi lưu dữ liệu!');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Xóa
  const confirmDelete = async () => {
    if (!targetId) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/scholarly-works/${targetId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Đã xóa sách vĩnh viễn!');
      setIsDeleteModalOpen(false);
      setTargetId(null);
      if (works.length === 1 && page > 1) setPage(page - 1);
      else fetchWorks();
    } catch {
      toast.error('Lỗi khi xóa!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (work: ScholarlyWork) => {
    setTargetId(work.id);
    setFormData({
      tenSach: work.tenSach,
      loaiSach: work.loaiSach,
      vaiTro: work.vaiTro,
      nhaXuatBan: work.nhaXuatBan,
      namXuatBan: work.namXuatBan,
      isbn: work.isbn,
    });
    setIsModalOpen(true);
  };

  const handleExportExcel = () => {
    const headers = [
      'STT',
      'Tên sách',
      'Loại sách',
      'Vai trò',
      'Nhà xuất bản',
      'Năm XB',
      'ISBN',
      'Trạng thái',
    ];
    const csvRows = works.map((w, index) =>
      [
        (page - 1) * 5 + index + 1,
        `"${w.tenSach}"`,
        `"${w.loaiSach}"`,
        `"${w.vaiTro}"`,
        `"${w.nhaXuatBan}"`,
        w.namXuatBan,
        `"${w.isbn}"`,
        w.trangThai,
      ].join(','),
    );
    const csvContent = '\uFEFF' + headers.join(',') + '\n' + csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Sach_Chuyen_Khao.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Đã xuất file Excel!');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTargetId(null);
    setFormData({
      tenSach: '',
      loaiSach: '',
      vaiTro: '',
      nhaXuatBan: '',
      namXuatBan: '',
      isbn: '',
    });
  };

  return (
    <div className="relative space-y-4 rounded-lg bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <h2 className="text-xl font-bold text-[#003366] uppercase">
          Sách chuyên khảo / Giáo trình
        </h2>
        <div className="flex flex-wrap items-center gap-2 lg:gap-3">
          <div className="relative">
            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Tìm tên sách, ISBN..."
              className="w-full pl-9 md:w-64"
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
          <Button variant="outline" className="whitespace-nowrap text-gray-600">
            Đề xuất
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
              <TableHead className="w-1/4">Tên sách</TableHead>
              <TableHead>Loại sách</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Nhà xuất bản</TableHead>
              <TableHead className="text-center">Năm XB</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
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
            ) : works.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="h-24 text-center text-gray-500"
                >
                  Không tìm thấy kết quả phù hợp
                </TableCell>
              </TableRow>
            ) : (
              works.map((work, index) => (
                <TableRow key={work.id} className="hover:bg-blue-50/50">
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-3 text-gray-500">
                      <button
                        onClick={() => handleEditClick(work)}
                        title="Sửa"
                        className="hover:text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setTargetId(work.id);
                          setIsDeleteModalOpen(true);
                        }}
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
                  <TableCell className="min-w-50 font-semibold whitespace-normal">
                    {work.tenSach}
                  </TableCell>
                  <TableCell>{work.loaiSach}</TableCell>
                  <TableCell>{work.vaiTro}</TableCell>
                  <TableCell>{work.nhaXuatBan}</TableCell>
                  <TableCell className="text-center">
                    {work.namXuatBan}
                  </TableCell>
                  <TableCell>{work.isbn}</TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {work.trangThai === 'approved' && (
                      <Badge className="bg-emerald-500">Đã duyệt</Badge>
                    )}
                    {work.trangThai === 'pending' && (
                      <Badge className="bg-amber-500">Đang chờ</Badge>
                    )}
                    {work.trangThai === 'rejected' && (
                      <Badge className="bg-rose-500">Từ chối</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

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

      {/* MODAL THÊM/SỬA */}
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
              {targetId ? 'Cập nhật' : 'Thêm mới'} Sách / Giáo trình
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium">Tên sách *</label>
                  <Input
                    required
                    value={formData.tenSach}
                    onChange={(e) =>
                      setFormData({ ...formData, tenSach: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Loại sách</label>
                  <Input
                    placeholder="VD: Giáo trình..."
                    value={formData.loaiSach}
                    onChange={(e) =>
                      setFormData({ ...formData, loaiSach: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Vai trò</label>
                  <Input
                    placeholder="VD: Chủ biên..."
                    value={formData.vaiTro}
                    onChange={(e) =>
                      setFormData({ ...formData, vaiTro: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Nhà xuất bản</label>
                  <Input
                    value={formData.nhaXuatBan}
                    onChange={(e) =>
                      setFormData({ ...formData, nhaXuatBan: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">
                      Năm xuất bản *
                    </label>
                    <Input
                      required
                      type="number"
                      value={formData.namXuatBan}
                      onChange={(e) =>
                        setFormData({ ...formData, namXuatBan: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Mã số ISBN</label>
                    <Input
                      value={formData.isbn}
                      onChange={(e) =>
                        setFormData({ ...formData, isbn: e.target.value })
                      }
                    />
                  </div>
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

      {/* POPUP XÓA */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="animate-in zoom-in-95 w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-xl">
            <Trash2 className="mx-auto mb-4 h-12 w-12 text-red-500" />
            <h3 className="mb-2 text-lg font-bold">Xác nhận xóa?</h3>
            <p className="mb-6 text-sm text-gray-500">
              Bạn có chắc chắn muốn xóa cuốn sách này?
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
