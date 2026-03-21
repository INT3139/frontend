import type { ScholarlyWork } from '@/schemas/academic-cv/scholarly-works';
import type { ScientificArticle } from '@/schemas/academic-cv/scientific-articles';
import type { ScientificReport } from '@/schemas/academic-cv/scientific-reports';
import { ENDPOINTS } from '@/services/endpoints';
import { HttpResponse, http } from 'msw';
import { withAuth } from '../middleware';

let mockScholarlyWorks = [
  {
    id: '1',
    tenSach: 'Giáo trình Cơ sở dữ liệu',
    loaiSach: 'Giáo trình',
    vaiTro: 'Chủ biên',
    nhaXuatBan: 'NXB Đại học Quốc gia Hà Nội',
    namXuatBan: '2020',
    isbn: '978-604-990-123-4',
    trangThai: 'approved',
  },
];

let mockScientificArticles = [
  {
    id: '1',
    tenBaiBao:
      'Simulysis: A Method to Change Impact Analysis in Simulink Projects Based on WAVE-CIA',
    donVi: 'Trường Đại học Công nghệ',
    tenTapChi:
      'International Journal of Advanced Computer Science and Applications (IJACSA)',
    ngayPhatHanh: '08/2025',
    tieuBieu: false,
    trangThai: 'new',
  },
  {
    id: '2',
    tenBaiBao: 'A Control Flow Graph Generation Method for Java Projects',
    donVi: 'Trường Đại học Công nghệ',
    tenTapChi:
      'VNU Journal of Science: Computer Science and Communication Engineering',
    ngayPhatHanh: '07/2024',
    tieuBieu: false,
    trangThai: 'approved',
  },
  {
    id: '12',
    tenBaiBao:
      'On Optimization of Minimized Assumption Generation Method for Component-Based Software Verification',
    donVi: 'Trường Đại học Công nghệ',
    tenTapChi:
      'IEICE Trans. on Fundamentals, Special Issue on Software Reliability Engineering (ISI)',
    ngayPhatHanh: '01/2012',
    tieuBieu: true,
    trangThai: 'rejected',
  },
];

let mockScientificReports: ScientificReport[] = [
  {
    id: '1',
    tenBaoCao:
      'STUBI4UUT: A Stub Generation Method For Library Functions in Unit Testing Java Projects',
    donVi: 'Trường Đại học Công nghệ',
    kyYeu:
      'Conference on Information Technology and its Applications (CITA2025 - Scopus (Q4))',
    ngayToChuc: '20/07/2025',
    tieuBieu: false,
    trangThai: 'new',
  },
  {
    id: '2',
    tenBaoCao:
      'FAMRES: A Framework for Automated Testing of Microservices Based on Requirement Specifications',
    donVi: 'Trường Đại học Công nghệ',
    kyYeu:
      'Proceedings of the Fifth International Conference on Intelligent Systems and Networks',
    ngayToChuc: '22/03/2025',
    tieuBieu: false,
    trangThai: 'new',
  },
];

export const handlers = [
  // Scholarly Works
  http.get(
    import.meta.env.VITE_MOCK_API_PREFIX + ENDPOINTS.academicCv.scholarlyWorks,
    withAuth(() => {
      return HttpResponse.json({
        success: true,
        data: mockScholarlyWorks,
        totalPages: 1,
      });
    }),
  ),
  http.post(
    import.meta.env.VITE_MOCK_API_PREFIX + ENDPOINTS.academicCv.scholarlyWorks,
    withAuth(async ({ request }) => {
      const data = (await request.json()) as Partial<ScholarlyWork>;
      const newRecord: ScholarlyWork = {
        tenSach: '',
        loaiSach: '',
        vaiTro: '',
        nhaXuatBan: '',
        namXuatBan: '',
        isbn: '',
        trangThai: 'pending',
        ...data,
        id: Math.random().toString(36).substring(7),
      };
      mockScholarlyWorks.push(newRecord);
      return HttpResponse.json({ success: true, data: newRecord });
    }),
  ),
  http.put(
    import.meta.env.VITE_MOCK_API_PREFIX +
      ENDPOINTS.academicCv.scholarlyWorks +
      '/:id',
    withAuth(async ({ request, params }) => {
      const { id } = params;
      const data = (await request.json()) as Partial<ScholarlyWork>;
      const index = mockScholarlyWorks.findIndex((item) => item.id === id);
      if (index !== -1) {
        mockScholarlyWorks[index] = { ...mockScholarlyWorks[index], ...data };
        return HttpResponse.json({
          success: true,
          data: mockScholarlyWorks[index],
        });
      }
      return HttpResponse.json({ success: false }, { status: 404 });
    }),
  ),
  http.delete(
    import.meta.env.VITE_MOCK_API_PREFIX +
      ENDPOINTS.academicCv.scholarlyWorks +
      '/:id',
    withAuth(({ params }) => {
      const { id } = params;
      mockScholarlyWorks = mockScholarlyWorks.filter((item) => item.id !== id);
      return HttpResponse.json({ success: true });
    }),
  ),

  // Scientific Articles
  http.get(
    import.meta.env.VITE_MOCK_API_PREFIX +
      ENDPOINTS.academicCv.scientificArticles,
    withAuth(({ request }) => {
      const url = new URL(request.url);
      const search = url.searchParams.get('search')?.toLowerCase() || '';
      const status = url.searchParams.get('status') || 'all';

      let filteredData = [...mockScientificArticles];

      if (search) {
        filteredData = filteredData.filter((item) =>
          item.tenBaiBao.toLowerCase().includes(search),
        );
      }

      if (status !== 'all') {
        filteredData = filteredData.filter((item) => item.trangThai === status);
      }

      return HttpResponse.json({
        success: true,
        data: filteredData,
        totalPages: 1,
      });
    }),
  ),
  http.post(
    import.meta.env.VITE_MOCK_API_PREFIX +
      ENDPOINTS.academicCv.scientificArticles,
    withAuth(async ({ request }) => {
      const data = (await request.json()) as Partial<ScientificArticle>;
      const newRecord: ScientificArticle = {
        tenBaiBao: '',
        donVi: '',
        tenTapChi: '',
        ngayPhatHanh: '',
        tieuBieu: false,
        trangThai: 'new',
        ...data,
        id: Math.random().toString(36).substring(7),
      };
      mockScientificArticles.push(newRecord);
      return HttpResponse.json({ success: true, data: newRecord });
    }),
  ),
  http.put(
    import.meta.env.VITE_MOCK_API_PREFIX +
      ENDPOINTS.academicCv.scientificArticles +
      '/:id',
    withAuth(async ({ request, params }) => {
      const { id } = params;
      const data = (await request.json()) as Partial<ScientificArticle>;
      const index = mockScientificArticles.findIndex((item) => item.id === id);
      if (index !== -1) {
        mockScientificArticles[index] = {
          ...mockScientificArticles[index],
          ...data,
        };
        return HttpResponse.json({
          success: true,
          data: mockScientificArticles[index],
        });
      }
      return HttpResponse.json({ success: false }, { status: 404 });
    }),
  ),
  http.delete(
    import.meta.env.VITE_MOCK_API_PREFIX +
      ENDPOINTS.academicCv.scientificArticles +
      '/:id',
    withAuth(({ params }) => {
      const { id } = params;
      mockScientificArticles = mockScientificArticles.filter(
        (item) => item.id !== id,
      );
      return HttpResponse.json({ success: true });
    }),
  ),

  // Scientific Reports
  http.get(
    import.meta.env.VITE_MOCK_API_PREFIX +
      ENDPOINTS.academicCv.scientificReports,
    withAuth(({ request }) => {
      const url = new URL(request.url);
      const search = url.searchParams.get('search')?.toLowerCase() || '';
      const status = url.searchParams.get('status') || 'all';

      let filteredData = [...mockScientificReports];

      if (search) {
        filteredData = filteredData.filter((item) =>
          item.tenBaoCao.toLowerCase().includes(search),
        );
      }

      if (status !== 'all') {
        filteredData = filteredData.filter((item) => item.trangThai === status);
      }

      return HttpResponse.json({
        success: true,
        data: filteredData,
        totalPages: 1,
      });
    }),
  ),
  http.post(
    import.meta.env.VITE_MOCK_API_PREFIX +
      ENDPOINTS.academicCv.scientificReports,
    withAuth(async ({ request }) => {
      const data = (await request.json()) as Partial<ScientificReport>;
      const newRecord: ScientificReport = {
        tenBaoCao: '',
        donVi: '',
        kyYeu: '',
        ngayToChuc: '',
        tieuBieu: false,
        trangThai: 'new',
        ...data,
        id: Math.random().toString(36).substring(7),
      };
      mockScientificReports.push(newRecord);
      return HttpResponse.json({ success: true, data: newRecord });
    }),
  ),
  http.put(
    import.meta.env.VITE_MOCK_API_PREFIX +
      ENDPOINTS.academicCv.scientificReports +
      '/:id',
    withAuth(async ({ request, params }) => {
      const { id } = params;
      const data = (await request.json()) as Partial<ScientificReport>;
      const index = mockScientificReports.findIndex((item) => item.id === id);
      if (index !== -1) {
        mockScientificReports[index] = {
          ...mockScientificReports[index],
          ...data,
        };
        return HttpResponse.json({
          success: true,
          data: mockScientificReports[index],
        });
      }
      return HttpResponse.json({ success: false }, { status: 404 });
    }),
  ),
  http.delete(
    import.meta.env.VITE_MOCK_API_PREFIX +
      ENDPOINTS.academicCv.scientificReports +
      '/:id',
    withAuth(({ params }) => {
      const { id } = params;
      mockScientificReports = mockScientificReports.filter(
        (item) => item.id !== id,
      );
      return HttpResponse.json({ success: true });
    }),
  ),
];
