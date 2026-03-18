import { HttpResponse, delay, http } from 'msw';
import type { ScholarlyWork } from '../../schemas/academic-cv/scholarly-works';

let mockScholarlyWorks: ScholarlyWork[] = [
  {
    id: '1',
    tenSach: 'Cơ sở Trí tuệ Nhân tạo',
    loaiSach: 'Giáo trình',
    vaiTro: 'Chủ biên',
    nhaXuatBan: 'NXB Đại học Quốc gia Hà Nội',
    namXuatBan: '2022',
    isbn: '978-604-315-123-4',
    trangThai: 'approved',
  },
  {
    id: '2',
    tenSach: 'Kiến trúc phần mềm nâng cao',
    loaiSach: 'Sách chuyên khảo',
    vaiTro: 'Đồng tác giả',
    nhaXuatBan: 'NXB Khoa học và Kỹ thuật',
    namXuatBan: '2023',
    isbn: '978-604-112-987-6',
    trangThai: 'pending',
  },
  {
    id: '3',
    tenSach: 'Cấu trúc dữ liệu và Giải thuật',
    loaiSach: 'Sách tham khảo',
    vaiTro: 'Tác giả',
    nhaXuatBan: 'NXB Giáo dục',
    namXuatBan: '2020',
    isbn: '978-604-001-456-7',
    trangThai: 'rejected',
  },
];

export const handlers = [
  // Lấy danh sách (Có phân trang, tìm kiếm)
  http.get('/api/scholarly-works', async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() || '';
    const status = url.searchParams.get('status') || 'all';
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '5');

    let filtered = mockScholarlyWorks;
    if (search) {
      filtered = filtered.filter(
        (w) =>
          w.tenSach.toLowerCase().includes(search) ||
          w.isbn.toLowerCase().includes(search),
      );
    }
    if (status !== 'all') {
      filtered = filtered.filter((w) => w.trangThai === status);
    }

    const total = filtered.length;
    const start = (page - 1) * limit;
    const paginatedData = filtered.slice(start, start + limit);

    return HttpResponse.json({
      data: paginatedData,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  }),

  // Thêm mới
  http.post('/api/scholarly-works', async ({ request }) => {
    await delay(800);
    const newWork = (await request.json()) as ScholarlyWork;
    newWork.id = crypto.randomUUID();
    newWork.trangThai = 'pending';
    mockScholarlyWorks = [newWork, ...mockScholarlyWorks];
    return HttpResponse.json(
      { message: 'Thêm thành công', data: newWork },
      { status: 201 },
    );
  }),

  // Cập nhật
  http.put('/api/scholarly-works/:id', async ({ request, params }) => {
    await delay(800);
    const { id } = params;
    const updatedData = (await request.json()) as Partial<ScholarlyWork>;
    mockScholarlyWorks = mockScholarlyWorks.map((w) =>
      w.id === id ? { ...w, ...updatedData } : w,
    );
    return HttpResponse.json({ message: 'Cập nhật thành công' });
  }),

  // Xóa
  http.delete('/api/scholarly-works/:id', async ({ params }) => {
    await delay(500);
    const { id } = params;
    mockScholarlyWorks = mockScholarlyWorks.filter((w) => w.id !== id);
    return HttpResponse.json({ message: 'Xóa thành công' });
  }),
];
