export interface AcademicAward {
  id: string;
  soQuyetDinh: string;
  ngayQuyetDinh: string;
  tenGiaiThuong: string;
  tenCongTrinh: string;
  thuHang: string;
  fileDinhKem?: string;
  trangThai: 'pending' | 'approved' | 'rejected';
}
