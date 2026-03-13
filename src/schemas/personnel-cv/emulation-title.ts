import type { ApprovalStatus } from './approval';

export const EMULATION_TITLE_RECORD = {
  APPROVAL_STATUS: 'approval_status',
  DECISION_NUMBER: 'decision_number',
  DECISION_DATE: 'decision_date',
  TITLE_NAME: 'title_name',
  IS_HIGHEST_LEVEL: 'is_highest_level',
  ATTACHMENT_URL: 'attachment_url',
} as const;

export const EMULATION_TITLE_RECORD_MAP = {
  [EMULATION_TITLE_RECORD.APPROVAL_STATUS]: 'Trạng thái phê duyệt',
  [EMULATION_TITLE_RECORD.DECISION_NUMBER]: 'Số quyết định',
  [EMULATION_TITLE_RECORD.DECISION_DATE]: 'Ngày quyết định',
  [EMULATION_TITLE_RECORD.TITLE_NAME]: 'Tên danh hiệu',
  [EMULATION_TITLE_RECORD.IS_HIGHEST_LEVEL]: 'Danh hiệu cao cấp nhất',
  [EMULATION_TITLE_RECORD.ATTACHMENT_URL]: 'File đính kèm',
};

export type EmulationTitleRecord = {
  [EMULATION_TITLE_RECORD.APPROVAL_STATUS]: ApprovalStatus;
  [EMULATION_TITLE_RECORD.DECISION_NUMBER]: string | null;
  [EMULATION_TITLE_RECORD.DECISION_DATE]: string;
  [EMULATION_TITLE_RECORD.TITLE_NAME]: string;
  [EMULATION_TITLE_RECORD.IS_HIGHEST_LEVEL]: boolean;
  [EMULATION_TITLE_RECORD.ATTACHMENT_URL]: string | null;
};
