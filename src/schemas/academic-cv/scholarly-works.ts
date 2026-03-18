export interface ScholarlyWork {
  id: string;
  tenSach: string;
  loaiSach: string;
  vaiTro: string;
  nhaXuatBan: string;
  namXuatBan: string;
  isbn: string;
  trangThai: 'pending' | 'approved' | 'rejected';
}
