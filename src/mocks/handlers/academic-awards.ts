import { HttpResponse, delay, http } from 'msw';
import type { AcademicAward } from '../../schemas/academic-cv/academic-awards';

let mockAcademicAwards: AcademicAward[] = [
  {
    id: '1',
    soQuyetDinh: 'QD-123',
    ngayQuyetDinh: '2023-05-10',
    tenGiaiThuong: 'Giải thưởng Hồ Chí Minh',
    tenCongTrinh: 'Nghiên cứu ứng dụng AI trong Y tế',
    thuHang: 'Giải Nhất',
    trangThai: 'approved',
  },
  {
    id: '2',
    soQuyetDinh: 'QD-456',
    ngayQuyetDinh: '2024-01-20',
    tenGiaiThuong: 'Giải thưởng VIFOTEC',
    tenCongTrinh: 'Hệ thống cảnh báo lũ sớm',
    thuHang: 'Giải Vàng',
    trangThai: 'pending',
  },
];

export const handlers = [
  http.get('/api/academic-awards', async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() || '';
    const status = url.searchParams.get('status') || 'all';
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '5');

    let filtered = mockAcademicAwards;
    if (search) {
      filtered = filtered.filter(
        (w) =>
          w.tenGiaiThuong.toLowerCase().includes(search) ||
          w.tenCongTrinh.toLowerCase().includes(search) ||
          w.soQuyetDinh.toLowerCase().includes(search),
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

  http.post('/api/academic-awards', async ({ request }) => {
    await delay(800);
    const newAward = (await request.json()) as AcademicAward;
    newAward.id = crypto.randomUUID();
    newAward.trangThai = 'pending';
    mockAcademicAwards = [newAward, ...mockAcademicAwards];
    return HttpResponse.json(
      { message: 'Thêm thành công', data: newAward },
      { status: 201 },
    );
  }),

  http.put('/api/academic-awards/:id', async ({ request, params }) => {
    await delay(800);
    const { id } = params;
    const updatedData = (await request.json()) as Partial<AcademicAward>;
    mockAcademicAwards = mockAcademicAwards.map((w) =>
      w.id === id ? { ...w, ...updatedData } : w,
    );
    return HttpResponse.json({ message: 'Cập nhật thành công' });
  }),

  http.delete('/api/academic-awards/:id', async ({ params }) => {
    await delay(500);
    const { id } = params;
    mockAcademicAwards = mockAcademicAwards.filter((w) => w.id !== id);
    return HttpResponse.json({ message: 'Xóa thành công' });
  }),
];
