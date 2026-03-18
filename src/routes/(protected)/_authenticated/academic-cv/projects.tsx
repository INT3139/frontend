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
import type { Project } from '../../../../schemas/academic-cv/project';

export const Route = createFileRoute(
  '/(protected)/_authenticated/academic-cv/projects',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [projects, setProjects] = useState<Project[]>([]);
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
    maSo: '',
    tenNhiemVu: '',
    coQuanChuTri: '',
    capDo: '',
    thoiGianBatDau: '',
    thoiGianKetThuc: '',
    tieuBieu: false,
  });

  // --- HÀM GỌI API TỔNG (FETCH DATA TỪ SERVER/MSW) ---
  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        search: searchTerm,
        status: filterStatus,
        page: page.toString(),
        limit: '5',
      });
      const res = await fetch(`/api/projects?${query.toString()}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setProjects(data.data);
      setTotalPages(data.totalPages);
    } catch {
      toast.error('Không thể tải dữ liệu!');
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, filterStatus, page]); // Tự gọi lại API khi Search/Filter/Page thay đổi

  useEffect(() => {
    // Delay tạo hiệu ứng chờ
    const timeoutId = setTimeout(() => {
      fetchProjects();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [fetchProjects]);

  // --- SUBMIT FORM TỚI BACKEND ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. VALIDATION CƠ BẢN
    if (
      formData.thoiGianKetThuc &&
      new Date(formData.thoiGianBatDau) > new Date(formData.thoiGianKetThuc)
    ) {
      toast.error('Thời gian kết thúc không hợp lệ!', {
        description: 'Phải lớn hơn hoặc bằng thời gian bắt đầu.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const method = targetId ? 'PUT' : 'POST';
      const endpoint = targetId ? `/api/projects/${targetId}` : '/api/projects';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('API Error');

      toast.success(
        targetId
          ? 'Đã cập nhật nhiệm vụ thành công!'
          : 'Thêm mới nhiệm vụ thành công!',
      );
      closeModal();
      fetchProjects(); // Backend báo OK, load lại bảng
    } catch {
      toast.error('Có lỗi xảy ra khi lưu dữ liệu!');
    } finally {
      setIsSubmitting(false);
    }
  };

  // GỌI API XÓA
  const confirmDelete = async () => {
    if (!targetId) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/projects/${targetId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Đã xóa nhiệm vụ vĩnh viễn!');
      setIsDeleteModalOpen(false);
      setTargetId(null);
      // Nếu xóa dòng cuối cùng của trang 2, lùi về trang 1
      if (projects.length === 1 && page > 1) setPage(page - 1);
      else fetchProjects();
    } catch {
      toast.error('Lỗi khi xóa nhiệm vụ!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (project: Project) => {
    setTargetId(project.id);
    setFormData({
      maSo: project.maSo,
      tenNhiemVu: project.tenNhiemVu,
      coQuanChuTri: project.coQuanChuTri,
      capDo: project.capDo,
      thoiGianBatDau: project.thoiGianBatDau,
      thoiGianKetThuc: project.thoiGianKetThuc,
      tieuBieu: project.tieuBieu,
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
      'Mã số',
      'Tên nhiệm vụ',
      'Cơ quan chủ trì',
      'Cấp độ',
      'Bắt đầu',
      'Kết thúc',
      'Tiêu biểu',
      'Trạng thái',
    ];
    const csvRows = projects.map((p, index) =>
      [
        (page - 1) * 5 + index + 1,
        `"${p.maSo}"`,
        `"${p.tenNhiemVu}"`,
        `"${p.coQuanChuTri}"`,
        `"${p.capDo}"`,
        p.thoiGianBatDau,
        p.thoiGianKetThuc,
        p.tieuBieu ? 'Có' : 'Không',
        p.trangThai,
      ].join(','),
    );
    const csvContent = '\uFEFF' + headers.join(',') + '\n' + csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Nhiem_Vu_KHCN.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Đã xuất file Excel!');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTargetId(null);
    setFormData({
      maSo: '',
      tenNhiemVu: '',
      coQuanChuTri: '',
      capDo: '',
      thoiGianBatDau: '',
      thoiGianKetThuc: '',
      tieuBieu: false,
    });
  };

  return (
    <div className="relative space-y-4 rounded-lg bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <h2 className="text-xl font-bold text-[#003366] uppercase">
          Nhiệm vụ KH&CN
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
              }} // Search thì reset về trang 1
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
              <TableHead>Mã số</TableHead>
              <TableHead className="w-1/4">Tên nhiệm vụ</TableHead>
              <TableHead>Cơ quan chủ trì</TableHead>
              <TableHead>Cấp độ</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead className="text-center">Tiêu biểu</TableHead>
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
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="h-24 text-center text-gray-500"
                >
                  Không tìm thấy kết quả phù hợp
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project, index) => (
                <TableRow key={project.id} className="hover:bg-blue-50/50">
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-3 text-gray-500">
                      <button
                        onClick={() => handleEditClick(project)}
                        title="Sửa"
                        className="hover:text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(project.id)}
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
                    {project.maSo}
                  </TableCell>
                  <TableCell className="min-w-50 whitespace-normal">
                    {project.tenNhiemVu}
                  </TableCell>
                  <TableCell>{project.coQuanChuTri}</TableCell>
                  <TableCell>{project.capDo}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {project.thoiGianBatDau}{' '}
                    {project.thoiGianKetThuc
                      ? `- ${project.thoiGianKetThuc}`
                      : ''}
                  </TableCell>
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      checked={project.tieuBieu}
                      readOnly
                      className="h-4 w-4 cursor-not-allowed rounded border-gray-300 opacity-70"
                    />
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {project.trangThai === 'approved' && (
                      <Badge className="bg-emerald-500">Đã duyệt</Badge>
                    )}
                    {project.trangThai === 'pending' && (
                      <Badge className="bg-amber-500">Đang chờ</Badge>
                    )}
                    {project.trangThai === 'rejected' && (
                      <Badge className="bg-rose-500">Từ chối</Badge>
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

      {/* Thêm và sửa */}
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
              {targetId ? 'Cập nhật' : 'Thêm mới'} Nhiệm vụ KH&CN
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Mã số *</label>
                  <Input
                    required
                    value={formData.maSo}
                    onChange={(e) =>
                      setFormData({ ...formData, maSo: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Cấp độ</label>
                  <Input
                    value={formData.capDo}
                    onChange={(e) =>
                      setFormData({ ...formData, capDo: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium">Tên nhiệm vụ *</label>
                  <Input
                    required
                    value={formData.tenNhiemVu}
                    onChange={(e) =>
                      setFormData({ ...formData, tenNhiemVu: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium">Cơ quan chủ trì</label>
                  <Input
                    value={formData.coQuanChuTri}
                    onChange={(e) =>
                      setFormData({ ...formData, coQuanChuTri: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Bắt đầu *</label>
                  <Input
                    required
                    type="date"
                    value={formData.thoiGianBatDau}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        thoiGianBatDau: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Kết thúc</label>
                  <Input
                    type="date"
                    value={formData.thoiGianKetThuc}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        thoiGianKetThuc: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="tb"
                  checked={formData.tieuBieu}
                  onChange={(e) =>
                    setFormData({ ...formData, tieuBieu: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label
                  htmlFor="tb"
                  className="cursor-pointer text-sm font-medium"
                >
                  Nhiệm vụ tiêu biểu
                </label>
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

      {/* Thông báo xóa, bỏ popup */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="animate-in zoom-in-95 w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-xl">
            <Trash2 className="mx-auto mb-4 h-12 w-12 text-red-500" />
            <h3 className="mb-2 text-lg font-bold">Xác nhận xóa?</h3>
            <p className="mb-6 text-sm text-gray-500">
              Bạn có chắc chắn muốn xóa nhiệm vụ này? Hành động này không thể
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
