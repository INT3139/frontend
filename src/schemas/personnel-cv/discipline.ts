import type { ApprovalStatus } from './approval';

export const DISCIPLINE_RECORD = {
  APPROVAL_STATUS: 'approvalStatus',
  DISCIPLINE_SCOPE: 'disciplineScope',
  DECISION_NUMBER: 'decisionNumber',
  DECISION_DATE: 'decisionDate',
  DISCIPLINE_NAME: 'disciplineName',
  IS_HIGHEST_LEVEL: 'isHighestLevel',
  ATTACHMENT_URL: 'attachmentUrl',
} as const;

export const DISCIPLINE_RECORD_MAP = {
  [DISCIPLINE_RECORD.APPROVAL_STATUS]: 'Tình trạng phê duyệt',
  [DISCIPLINE_RECORD.DISCIPLINE_SCOPE]: 'Đơn vị',
  [DISCIPLINE_RECORD.DECISION_NUMBER]: 'Số quyết định',
  [DISCIPLINE_RECORD.DECISION_DATE]: 'Ngày quyết định',
  [DISCIPLINE_RECORD.DISCIPLINE_NAME]: 'Tên kỷ luật',
  [DISCIPLINE_RECORD.IS_HIGHEST_LEVEL]: 'Kỷ luật cao nhất',
  [DISCIPLINE_RECORD.ATTACHMENT_URL]: 'Tệp đính kèm',
};

export type DisciplineRecord = {
  [DISCIPLINE_RECORD.APPROVAL_STATUS]: ApprovalStatus;
  [DISCIPLINE_RECORD.DISCIPLINE_SCOPE]: string;
  [DISCIPLINE_RECORD.DECISION_NUMBER]: string | null;
  [DISCIPLINE_RECORD.DECISION_DATE]: string;
  [DISCIPLINE_RECORD.DISCIPLINE_NAME]: string;
  [DISCIPLINE_RECORD.IS_HIGHEST_LEVEL]: boolean;
  [DISCIPLINE_RECORD.ATTACHMENT_URL]: string | null;
};
