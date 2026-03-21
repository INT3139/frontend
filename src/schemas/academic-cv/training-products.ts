import type { EducationLevel } from '../education-level';
import type { ApprovalStatus } from '../personnel-cv/approval';

export const TRAINING_PRODUCT_RECORD = {
  APPROVAL_STATUS: 'approvalStatus',
  STUDENT_NAME: 'studentName',
  THESIS_TITLE: 'thesisTitle',
  ASSIGNMENT: 'assignment',
  EDUCATION_LEVEL: 'educationLevel',
  START_TIME: 'startTime',
  END_TIME: 'endTime',
} as const;

export const TRAINING_PRODUCT_RECORD_MAP = {
  [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: 'Trạng thái phê duyệt',
  [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: 'Tên học viên',
  [TRAINING_PRODUCT_RECORD.THESIS_TITLE]: 'Tên khóa luận/luận văn/luận án',
  [TRAINING_PRODUCT_RECORD.ASSIGNMENT]: 'Nhiệm vụ/Đề tài',
  [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]: 'Trình độ đào tạo',
  [TRAINING_PRODUCT_RECORD.START_TIME]: 'Thời gian bắt đầu đào tạo',
  [TRAINING_PRODUCT_RECORD.END_TIME]: 'Thời gian kết thúc đào tạo',
} as const;

export type TrainingProductRecord = {
  id?: number;
  [TRAINING_PRODUCT_RECORD.APPROVAL_STATUS]: ApprovalStatus;
  [TRAINING_PRODUCT_RECORD.STUDENT_NAME]: string;
  [TRAINING_PRODUCT_RECORD.THESIS_TITLE]: string;
  [TRAINING_PRODUCT_RECORD.ASSIGNMENT]?: string;
  [TRAINING_PRODUCT_RECORD.EDUCATION_LEVEL]: EducationLevel;
  [TRAINING_PRODUCT_RECORD.START_TIME]: string;
  [TRAINING_PRODUCT_RECORD.END_TIME]: string;
};
