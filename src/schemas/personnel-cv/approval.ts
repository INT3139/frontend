export const APPROVAL_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export const APPROVAL_STATUS_MAP = {
  [APPROVAL_STATUS.PENDING]: 'Đang chờ',
  [APPROVAL_STATUS.APPROVED]: 'Đã duyệt',
  [APPROVAL_STATUS.REJECTED]: 'Từ chối',
};

export type ApprovalStatus =
  (typeof APPROVAL_STATUS)[keyof typeof APPROVAL_STATUS];
