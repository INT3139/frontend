import { z } from 'zod';
import { APPROVAL_STATUS } from './approval';

export const familyRecordSchema = z.object({
  id: z.number().optional(),
  quanHe: z.string().min(1, 'Quan hệ là bắt buộc'),
  hoTen: z.string().min(1, 'Họ tên là bắt buộc'),
  namSinh: z.string(),
  queQuan: z.string(),
  ngheNghiep: z.string(),
  trangThai: z.nativeEnum(APPROVAL_STATUS).default(APPROVAL_STATUS.PENDING),
});

export const updateFamilySchema = z.object({
  myFamily: z.array(familyRecordSchema),
  inLawFamily: z.array(familyRecordSchema),
});

export type FamilyRecord = z.infer<typeof familyRecordSchema>;
export type UpdateFamilyPayload = z.infer<typeof updateFamilySchema>;
