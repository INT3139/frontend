import { HttpResponse, delay, http } from 'msw';
import type { Project } from '../../schemas/academic-cv/project';

let mockProjects: Project[] = [
  {
    id: '1',
    maSo: 'QG.16.31',
    tenNhiemVu: 'Các phương pháp và công cụ hiệu quả...',
    coQuanChuTri: 'Cơ quan ĐHQGHN',
    capDo: 'Cấp ĐHQGHN',
    thoiGianBatDau: '2016-01-01',
    thoiGianKetThuc: '2018-01-01',
    tieuBieu: false,
    trangThai: 'approved',
    dinhKem: null,
  },
  {
    id: '2',
    maSo: 'CN.10.05',
    tenNhiemVu: 'Đặc tả và kiểm chứng bài toán...',
    coQuanChuTri: 'Trường Đại học Công nghệ',
    capDo: 'Cấp Cơ sở',
    thoiGianBatDau: '2010-06-01',
    thoiGianKetThuc: '2011-06-01',
    tieuBieu: true,
    trangThai: 'pending',
    dinhKem: null,
  },
  {
    id: '3',
    maSo: 'QGTD.09.02',
    tenNhiemVu: 'Phát triển các phương pháp trợ giúp...',
    coQuanChuTri: 'Cơ quan ĐHQGHN',
    capDo: 'Cấp ĐHQGHN',
    thoiGianBatDau: '2009-05-01',
    thoiGianKetThuc: '2011-05-01',
    tieuBieu: false,
    trangThai: 'rejected',
    dinhKem: null,
  },
  {
    id: '4',
    maSo: 'QG.22.01',
    tenNhiemVu: 'Nghiên cứu AI ứng dụng',
    coQuanChuTri: 'VNU',
    capDo: 'Cấp ĐHQGHN',
    thoiGianBatDau: '2022-01-01',
    thoiGianKetThuc: '2024-01-01',
    tieuBieu: true,
    trangThai: 'approved',
    dinhKem: null,
  },
  {
    id: '5',
    maSo: 'CS.23.11',
    tenNhiemVu: 'Xây dựng hệ thống quản lý',
    coQuanChuTri: 'UET',
    capDo: 'Cấp Cơ sở',
    thoiGianBatDau: '2023-05-01',
    thoiGianKetThuc: '2023-12-31',
    tieuBieu: false,
    trangThai: 'pending',
    dinhKem: null,
  },
];

export const handlers = [
  http.get('/api/projects', async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() || '';
    const status = url.searchParams.get('status') || 'all';
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '5'); // Demo 5 dòng/trang

    let filtered = mockProjects;
    if (search) {
      filtered = filtered.filter(
        (p) =>
          p.tenNhiemVu.toLowerCase().includes(search) ||
          p.maSo.toLowerCase().includes(search),
      );
    }
    if (status !== 'all') {
      filtered = filtered.filter((p) => p.trangThai === status);
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

  http.post('/api/projects', async ({ request }) => {
    await delay(800);
    const newProject = (await request.json()) as Project;
    newProject.id = crypto.randomUUID(); // Backend đẻ ID
    newProject.trangThai = 'pending';
    mockProjects = [newProject, ...mockProjects]; // Lưu vào Database ảo
    return HttpResponse.json(
      { message: 'Thêm thành công', data: newProject },
      { status: 201 },
    );
  }),

  http.put('/api/projects/:id', async ({ request, params }) => {
    await delay(800);
    const { id } = params;
    const updatedData = (await request.json()) as Partial<Project>;
    mockProjects = mockProjects.map((p) =>
      p.id === id ? { ...p, ...updatedData } : p,
    );
    return HttpResponse.json({ message: 'Cập nhật thành công' });
  }),

  http.delete('/api/projects/:id', async ({ params }) => {
    await delay(500);
    const { id } = params;
    mockProjects = mockProjects.filter((p) => p.id !== id);
    return HttpResponse.json({ message: 'Xóa thành công' });
  }),
];
