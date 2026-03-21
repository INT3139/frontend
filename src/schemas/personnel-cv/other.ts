import { z } from 'zod';

export const otherInfoSchema = z.object({
  khaiRoTienAn: z.string().optional(),
  lamViecCheDoCu: z.string().optional(),
  quanHeToChucNuocNgoai: z.string().optional(),
  thanNhanNuocNgoai: z.string().optional(),
  luong: z.string().optional(),
  nhaO: z.string().optional(),
  datO: z.string().optional(),
  nguonKhac: z.string().optional(),
  tongDienTich: z.string().optional(),
  datTuMua: z.string().optional(),
});

export type OtherInfo = z.infer<typeof otherInfoSchema>;
