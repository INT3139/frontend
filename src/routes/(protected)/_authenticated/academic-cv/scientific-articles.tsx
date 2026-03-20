import { removeFirstSlash } from '@/lib/remove-first-slash';
import type { ScientificArticle } from '@/schemas/academic-cv/scientific-articles';
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
  '/(protected)/_authenticated/academic-cv/scientific-articles',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [articles, setArticles] = useState<ScientificArticle[]>([]);
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
    tenBaiBao: '',
    donVi: '',
    tenTapChi: '',
    ngayPhatHanh: '',
    tieuBieu: false,
  });

  // Gọi API (Giả lập hoặc gọi thật tùy vào backend)
  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        search: searchTerm,
        status: filterStatus,
        page: page.toString(),
        limit: '10',
      });
      const endpoint = `${removeFirstSlash(ENDPOINTS.academicCv.scientificArticles)}?${query.toString()}`;
      const data = await apiClient
        .get(endpoint)
        .json<{ data: ScientificArticle[]; totalPages: number }>();
      setArticles(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch {
      toast.error('Không thể tải dữ liệu!');
      setArticles([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, filterStatus, page]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchArticles();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [fetchArticles]);

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const endpoint = targetId
        ? `${removeFirstSlash(ENDPOINTS.academicCv.scientificArticles)}/${targetId}`
        : removeFirstSlash(ENDPOINTS.academicCv.scientificArticles);

      if (targetId) {
        await apiClient.put(endpoint, { json: formData }).json();
      } else {
        await apiClient.post(endpoint, { json: formData }).json();
      }

      toast.success(
        targetId ? 'Đã cập nhật bài báo!' : 'Thêm bài báo thành công!',
      );
      closeModal();
      fetchArticles();
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
      const endpoint = `${removeFirstSlash(ENDPOINTS.academicCv.scientificArticles)}/${targetId}`;
      await apiClient.delete(endpoint).json();

      toast.success('Đã xóa bài báo vĩnh viễn!');
      setIsDeleteModalOpen(false);
      setTargetId(null);
      if (articles.length === 1 && page > 1) setPage(page - 1);
      else fetchArticles();
    } catch {
      toast.error('Lỗi khi xóa!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (article: ScientificArticle) => {
    setTargetId(article.id);
    setFormData({
      tenBaiBao: article.tenBaiBao,
      donVi: article.donVi,
      tenTapChi: article.tenTapChi,
      ngayPhatHanh: article.ngayPhatHanh,
      tieuBieu: article.tieuBieu,
    });
    setIsModalOpen(true);
  };

  const handleExportExcel = () => {
    const headers = [
      'STT',
      'Tên bài báo khoa học',
      'Đơn vị/Cơ quan',
      'Tên tạp chí',
      'Ngày phát hành',
      'Tiêu biểu',
      'Trạng thái',
    ];
    const csvRows = articles.map((a, index) =>
      [
        (page - 1) * 10 + index + 1,
        `"${a.tenBaiBao}"`,
        `"${a.donVi}"`,
        `"${a.tenTapChi}"`,
        `"${a.ngayPhatHanh}"`,
        a.tieuBieu ? 'X' : '',
        a.trangThai,
      ].join(','),
    );
    const csvContent = '\uFEFF' + headers.join(',') + '\n' + csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Bai_Bao_Khoa_Hoc.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Đã xuất file Excel!');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTargetId(null);
    setFormData({
      tenBaiBao: '',
      donVi: '',
      tenTapChi: '',
      ngayPhatHanh: '',
      tieuBieu: false,
    });
  };

  return (
    <div className="relative space-y-4 rounded-lg bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <h2 className="text-xl font-bold text-[#003366] uppercase">
          Bài báo khoa học
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
              <TableHead className="w-1/3">Tên bài báo khoa học</TableHead>
              <TableHead>Đơn vị/Cơ quan</TableHead>
              <TableHead>Tên tạp chí</TableHead>
              <TableHead className="text-center">Ngày phát hành</TableHead>
              <TableHead className="text-center">Tiêu biểu</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-32 text-center text-gray-500"
                >
                  <Loader2 className="mx-auto mb-2 h-6 w-6 animate-spin text-blue-500" />{' '}
                  Đang tải dữ liệu...
                </TableCell>
              </TableRow>
            ) : articles.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-24 text-center text-gray-500"
                >
                  Không tìm thấy kết quả phù hợp
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article, index) => (
                <TableRow key={article.id} className="hover:bg-blue-50/50">
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-3 text-gray-500">
                      <button
                        onClick={() => handleEditClick(article)}
                        title="Sửa"
                        className="hover:text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setTargetId(article.id);
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
                    {article.tenBaiBao}
                  </TableCell>
                  <TableCell>{article.donVi}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {article.tenTapChi}
                  </TableCell>
                  <TableCell className="text-center">
                    {article.ngayPhatHanh}
                  </TableCell>
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      readOnly
                      checked={article.tieuBieu}
                      className="h-4 w-4"
                    />
                  </TableCell>
                  <TableCell className="text-center whitespace-nowrap">
                    {article.trangThai === 'approved' && (
                      <Badge className="bg-emerald-500 hover:bg-emerald-600">
                        Đã duyệt
                      </Badge>
                    )}
                    {(article.trangThai === 'pending' ||
                      article.trangThai === 'new') && (
                      <Badge className="bg-amber-500 hover:bg-amber-600">
                        {article.trangThai === 'new' ? 'Đang chờ' : 'Đã duyệt'}
                      </Badge>
                    )}
                    {article.trangThai === 'rejected' && (
                      <Badge className="bg-rose-500 hover:bg-rose-600">
                        Từ chối
                      </Badge>
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
              {targetId ? 'Cập nhật' : 'Thêm mới'} Bài báo khoa học
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium">
                    Tên bài báo khoa học *
                  </label>
                  <Input
                    required
                    value={formData.tenBaiBao}
                    onChange={(e) =>
                      setFormData({ ...formData, tenBaiBao: e.target.value })
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
                  <label className="text-sm font-medium">Tên tạp chí</label>
                  <Input
                    value={formData.tenTapChi}
                    onChange={(e) =>
                      setFormData({ ...formData, tenTapChi: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    Ngày phát hành (MM/YYYY)
                  </label>
                  <Input
                    placeholder="VD: 08/2025"
                    value={formData.ngayPhatHanh}
                    onChange={(e) =>
                      setFormData({ ...formData, ngayPhatHanh: e.target.value })
                    }
                  />
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
              Bạn có chắc chắn muốn xóa bài báo này?
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
