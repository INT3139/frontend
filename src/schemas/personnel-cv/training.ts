import type { ApprovalStatus } from './approval';

export const TRAINING_RECORD = {
  APPROVAL_STATUS: 'approvalStatus',
  FROM: 'from',
  TO: 'to',
  LEVEL: 'level',
  PLACE: 'place',
  MAJOR: 'major',
  FORMAT: 'format',
  FIELD: 'field',
  STUDYING: 'studying',
  STATUS: 'status',
} as const;

export const TRAINING_RECORD_MAP = {
  [TRAINING_RECORD.APPROVAL_STATUS]: 'Trạng thái phê duyệt',
  [TRAINING_RECORD.FROM]: 'Từ',
  [TRAINING_RECORD.TO]: 'Đến',
  [TRAINING_RECORD.LEVEL]: 'Trình độ chuyên môn',
  [TRAINING_RECORD.PLACE]: 'Nơi đào tạo',
  [TRAINING_RECORD.MAJOR]: 'Chuyên ngành',
  [TRAINING_RECORD.FORMAT]: 'Hình thức đào tạo',
  [TRAINING_RECORD.FIELD]: 'Lĩnh vực',
  [TRAINING_RECORD.STUDYING]: 'Đang học',
  [TRAINING_RECORD.STATUS]: 'Trạng thái',
};

export type TrainingRecord = {
  id: number;
  [TRAINING_RECORD.APPROVAL_STATUS]: ApprovalStatus;
  [TRAINING_RECORD.FROM]: string;
  [TRAINING_RECORD.TO]: string;
  [TRAINING_RECORD.LEVEL]: string;
  [TRAINING_RECORD.PLACE]: string;
  [TRAINING_RECORD.MAJOR]: string;
  [TRAINING_RECORD.FORMAT]: string;
  [TRAINING_RECORD.FIELD]: string;
  [TRAINING_RECORD.STUDYING]: string;
  [TRAINING_RECORD.STATUS]: string;
};
