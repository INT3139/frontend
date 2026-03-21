export const HEALTH_RECORD = {
  HEALTH_STATUS: 'healthStatus',
  HEIGHT: 'height',
  WEIGHT: 'weight',
  BLOOD_TYPE: 'bloodType',
  NOTES: 'notes',
} as const;

export const HEALTH_RECORD_MAP = {
  [HEALTH_RECORD.HEALTH_STATUS]: 'Tình trạng sức khỏe',
  [HEALTH_RECORD.HEIGHT]: 'Chiều cao (m)',
  [HEALTH_RECORD.WEIGHT]: 'Cân nặng (kg)',
  [HEALTH_RECORD.BLOOD_TYPE]: 'Nhóm máu',
  [HEALTH_RECORD.NOTES]: 'Ghi chú',
} as const;

export const HEALTH_STATUS = ['A', 'B1', 'B2', 'C', 'D'] as const;

export const HEALTH_STATUS_MAP = {
  A: 'Khỏe mạnh',
  B1: 'Đủ sức khỏe công tác',
  B2: 'Đủ sức khỏe công tác',
  C: 'Không đủ sức khỏe công tác',
  D: 'Không đủ sức khỏe công tác',
} as const;

export const BLOOD_TYPES = ['A', 'B', 'O', 'AB', 'Unknown'] as const;

//---------------------//

export type HealthRecord = {
  [HEALTH_RECORD.HEALTH_STATUS]: (typeof HEALTH_STATUS)[number];
  [HEALTH_RECORD.HEIGHT]: number; //cm
  [HEALTH_RECORD.WEIGHT]: number; //kg
  [HEALTH_RECORD.BLOOD_TYPE]: (typeof BLOOD_TYPES)[number];
  [HEALTH_RECORD.NOTES]: string;
};
