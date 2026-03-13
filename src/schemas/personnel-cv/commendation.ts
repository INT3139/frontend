import type { ApprovalStatus } from './approval';
import type { AwardScope } from './award-scope';

export const COMMENDATION_RECORD = {
  APPROVAL_STATUS: 'approval_status',
  DECISION_NUMBER: 'decision_number',
  DECISION_DATE: 'decision_date',
  AWARD_SCOPE: 'award_scope',
  AWARD_NAME: 'award_name',
  CONTENT: 'content',
  ACADEMIC_YEAR: 'academic_year',
  IS_HIGHEST_LEVEL: 'is_highest_level',
} as const;

export const COMMENDATION_RECORD_MAP = {
  [COMMENDATION_RECORD.APPROVAL_STATUS]: 'Trạng thái phê duyệt',
  [COMMENDATION_RECORD.DECISION_NUMBER]: 'Số quyết định',
  [COMMENDATION_RECORD.DECISION_DATE]: 'Ngày quyết định',
  [COMMENDATION_RECORD.AWARD_SCOPE]: 'Cấp khen thưởng',
  [COMMENDATION_RECORD.AWARD_NAME]: 'Tên khen thưởng',
  [COMMENDATION_RECORD.CONTENT]: 'Nội dung',
  [COMMENDATION_RECORD.ACADEMIC_YEAR]: 'Năm học/Năm',
  [COMMENDATION_RECORD.IS_HIGHEST_LEVEL]: 'Khen thưởng cao nhất',
};

export type CommendationRecord = {
  [COMMENDATION_RECORD.APPROVAL_STATUS]: ApprovalStatus;
  [COMMENDATION_RECORD.DECISION_NUMBER]: string | null;
  [COMMENDATION_RECORD.DECISION_DATE]: string;
  [COMMENDATION_RECORD.AWARD_SCOPE]: AwardScope;
  [COMMENDATION_RECORD.AWARD_NAME]: string;
  [COMMENDATION_RECORD.CONTENT]: string;
  [COMMENDATION_RECORD.ACADEMIC_YEAR]: string | null;
  [COMMENDATION_RECORD.IS_HIGHEST_LEVEL]: boolean;
};
