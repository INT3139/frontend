export interface Project {
  id: string;
  maSo: string;
  tenNhiemVu: string;
  coQuanChuTri: string;
  capDo: string;
  thoiGianBatDau: string;
  thoiGianKetThuc: string;
  tieuBieu: boolean;
  trangThai: 'pending' | 'approved' | 'rejected';
  dinhKem: string | null;
}
