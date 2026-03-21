import { removeFirstSlash } from '@/lib/remove-first-slash';
import type { ScientificReport } from '@/schemas/academic-cv/scientific-reports';
import apiClient from '@/services/api-client';
import { ENDPOINTS } from '@/services/endpoints';
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

export const Route = createFileRoute(
  '/(protected)/_authenticated/academic-cv/scientific-reports',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [reports, setReports] = useState<ScientificReport[]>([]);
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
    tenBaoCao: '',
    donVi: '',
    kyYeu: '',
    ngayToChuc: '',
    tieuBieu: false,
    fileDinhKem: '',
  });

  // Gọi API (Giả lập hoặc gọi thật tùy vào backend)
  const fetchReports = useCallback(async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        search: searchTerm,
        status: filterStatus,
        page: page.toString(),
        limit: '10',
      });
      const endpoint = `${removeFirstSlash(ENDPOINTS.academicCv.scientificReports)}?${query.toString()}`;
      const data = await apiClient
        .get(endpoint)
        .json<{ data: ScientificReport[]; totalPages: number }>();
      setReports(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch {
      toast.error('Không thể tải dữ liệu!');
      setReports([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, filterStatus, page]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchReports();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [fetchReports]);

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const endpoint = targetId
        ? `${removeFirstSlash(ENDPOINTS.academicCv.scientificReports)}/${targetId}`
        : removeFirstSlash(ENDPOINTS.academicCv.scientificReports);

      if (targetId) {
        await apiClient.put(endpoint, { json: formData }).json();
      } else {
        await apiClient.post(endpoint, { json: formData }).json();
      }

      toast.success(
        targetId ? 'Đã cập nhật báo cáo!' : 'Thêm báo cáo thành công!',
      );
      closeModal();
      fetchReports();
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
      const endpoint = `${removeFirstSlash(ENDPOINTS.academicCv.scientificReports)}/${targetId}`;
      await apiClient.delete(endpoint).json();

      toast.success('Đã xóa báo cáo vĩnh viễn!');
      setIsDeleteModalOpen(false);
      setTargetId(null);
      if (reports.length === 1 && page > 1) setPage(page - 1);
      else fetchReports();
    } catch {
      toast.error('Lỗi khi xóa!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (report: ScientificReport) => {
    setTargetId(report.id);
    setFormData({
      tenBaoCao: report.tenBaoCao,
      donVi: report.donVi,
      kyYeu: report.kyYeu,
      ngayToChuc: report.ngayToChuc,
      tieuBieu: report.tieuBieu,
      fileDinhKem: report.fileDinhKem || '',
    });
    setIsModalOpen(true);
  };

  const handleExportExcel = () => {
    const headers = [
      'STT',
      'Tên báo cáo khoa học',
      'Đơn vị/Cơ quan',
      'Kỷ yếu',
      'Ngày tổ chức',
      'Tiêu biểu',
      'Trạng thái',
    ];
    const csvRows = reports.map((r, index) =>
      [
        (page - 1) * 10 + index + 1,
        `"${r.tenBaoCao}"`,
        `"${r.donVi}"`,
        `"${r.kyYeu}"`,
        `"${r.ngayToChuc}"`,
        r.tieuBieu ? 'X' : '',
        r.trangThai,
      ].join(','),
    );
    const csvContent = '\uFEFF' + headers.join(',') + '\n' + csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Bao_Cao_Khoa_Hoc.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Đã xuất file Excel!');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTargetId(null);
    setFormData({
      tenBaoCao: '',
      donVi: '',
      kyYeu: '',
      ngayToChuc: '',
      tieuBieu: false,
      fileDinhKem: '',
    });
  };

  return (
    <div className="relative space-y-4 rounded-lg bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <h2 className="text-xl font-bold text-[#003366] uppercase">
          Báo cáo khoa học
        </h2>
        <div className="flex flex-wrap items-center gap-2 lg:gap-3">
          <div className="relative">
            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Nhập từ khóa..."
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
              <TableHead className="w-1/3">Tên báo cáo khoa học</TableHead>
              <TableHead>Đơn vị/Cơ quan</TableHead>
              <TableHead>Kỷ yếu</TableHead>
              <TableHead className="text-center">Ngày tổ chức</TableHead>
              <TableHead className="text-center">Tiêu biểu</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead className="text-center">Đính kèm</TableHead>
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
            ) : reports.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="h-24 text-center text-gray-500"
                >
                  Không tìm thấy kết quả phù hợp
                </TableCell>
              </TableRow>
            ) : (
              reports.map((report, index) => (
                <TableRow key={report.id} className="hover:bg-blue-50/50">
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-3 text-gray-500">
                      <button
                        onClick={() => handleEditClick(report)}
                        title="Sửa"
                        className="hover:text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setTargetId(report.id);
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
                    {(page - 1) * 10 + index + 1}
                  </TableCell>
                  <TableCell className="min-w-60 font-semibold whitespace-normal">
                    {report.tenBaoCao}
                  </TableCell>
                  <TableCell>{report.donVi}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {report.kyYeu}
                  </TableCell>
                  <TableCell className="text-center">
                    {report.ngayToChuc}
                  </TableCell>
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      readOnly
                      checked={report.tieuBieu}
                      className="h-4 w-4"
                    />
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {report.trangThai === 'approved' && (
                      <Badge className="bg-emerald-500 hover:bg-emerald-600">
                        Đã duyệt
                      </Badge>
                    )}
                    {(report.trangThai === 'pending' ||
                      report.trangThai === 'new') && (
                      <Badge className="bg-amber-500 hover:bg-amber-600">
                        {report.trangThai === 'new' ? 'Đang chờ' : 'Đã duyệt'}
                      </Badge>
                    )}
                    {report.trangThai === 'rejected' && (
                      <Badge className="bg-rose-500 hover:bg-rose-600">
                        Từ chối
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {/* {report.fileDinhKem ? (
                      <a
                        href={report.fileDinhKem}
                        target="_blank"
                        rel="noreferrer"
                        className="flex justify-center text-blue-600 hover:text-blue-800"
                      >
                        <FileText className="h-4 w-4" />
                      </a>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 rounded bg-emerald-500 px-3 text-xs text-white hover:bg-emerald-600 hover:text-white"
                      >
                        Tạo mới
                      </Button>
                    )} */}
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
              {targetId ? 'Cập nhật' : 'Thêm mới'} Báo cáo khoa học
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium">
                    Tên báo cáo khoa học *
                  </label>
                  <Input
                    required
                    value={formData.tenBaoCao}
                    onChange={(e) =>
                      setFormData({ ...formData, tenBaoCao: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Đơn vị/Cơ quan</label>
                  <Input
                    value={formData.donVi}
                    onChange={(e) =>
                      setFormData({ ...formData, donVi: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Kỷ yếu</label>
                  <Input
                    value={formData.kyYeu}
                    onChange={(e) =>
                      setFormData({ ...formData, kyYeu: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    Ngày tổ chức (DD/MM/YYYY)
                  </label>
                  <Input
                    placeholder="VD: 20/07/2025"
                    value={formData.ngayToChuc}
                    onChange={(e) =>
                      setFormData({ ...formData, ngayToChuc: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">File đính kèm</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setFormData({ ...formData, fileDinhKem: url });
                        }
                      }}
                    />
                    {formData.fileDinhKem && (
                      <a
                        href={formData.fileDinhKem}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 text-sm text-blue-600 hover:underline"
                      >
                        Xem file
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <label className="text-sm font-medium">Tiêu biểu</label>
                  <input
                    type="checkbox"
                    checked={formData.tieuBieu}
                    onChange={(e) =>
                      setFormData({ ...formData, tieuBieu: e.target.checked })
                    }
                    className="h-4 w-4"
                  />
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
              Bạn có chắc chắn muốn xóa báo cáo này?
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
