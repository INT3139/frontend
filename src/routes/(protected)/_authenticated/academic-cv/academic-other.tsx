import { createFileRoute } from '@tanstack/react-router';
import { Loader2, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';

export const Route = createFileRoute(
  '/(protected)/_authenticated/academic-cv/academic-other',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>(
    'pending',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/academic-other');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setContent(data.content || '');
        if (data.trangThai) setStatus(data.trangThai);
      } catch {
        toast.error('Không thể tải dữ liệu!');
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/academic-other', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error('Save failed');
      const result = await res.json();
      if (result.data?.trangThai) {
        setStatus(result.data.trangThai);
      }
      toast.success('Đã lưu thông tin thành công!');
    } catch {
      toast.error('Lỗi khi lưu dữ liệu!');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative space-y-4 rounded-lg bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[#003366] uppercase">
          Thông tin khác
        </h2>

        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="other-content"
                className="font-medium text-gray-700"
              >
                Tham gia các tổ chức, hiệp hội ngành nghề, thành viên Ban biên
                tập các tạp chí khoa học trong và ngoài nước, thành viên các hội
                đồng khoa học quốc gia, quốc tế:
              </label>
              <textarea
                id="other-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={10}
                className="w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-[#003366] focus:ring-1 focus:ring-[#003366] focus:outline-none"
                placeholder="Nhập thông tin tại đây..."
              />
            </div>

            <div className="mt-2 flex items-center justify-end gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Trạng thái:
                </span>
                {status === 'approved' && (
                  <Badge className="bg-emerald-500 hover:bg-emerald-600">
                    Đã duyệt
                  </Badge>
                )}
                {status === 'pending' && (
                  <Badge className="bg-amber-500 hover:bg-amber-600">
                    Đang chờ
                  </Badge>
                )}
                {status === 'rejected' && (
                  <Badge className="bg-rose-500 hover:bg-rose-600">
                    Từ chối
                  </Badge>
                )}
              </div>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-[#003366] text-white hover:bg-[#002244]"
              >
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Lưu thay đổi
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
