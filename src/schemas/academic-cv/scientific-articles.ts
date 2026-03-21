export type ScientificArticle = {
  id: string;
  tenBaiBao: string;
  donVi: string;
  tenTapChi: string;
  ngayPhatHanh: string;
  tieuBieu: boolean;
  trangThai: 'approved' | 'pending' | 'rejected' | 'new';
};
