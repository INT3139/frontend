export type ScientificReport = {
  id: string;
  tenBaoCao: string;
  donVi: string;
  kyYeu: string;
  ngayToChuc: string; // DD/MM/YYYY
  tieuBieu: boolean;
  trangThai: 'approved' | 'pending' | 'rejected' | 'new';
  fileDinhKem?: string;
};
