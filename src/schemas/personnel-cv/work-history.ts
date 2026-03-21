export const WORK_HISTORY_RECORD = {
  APPROVAL_STATUS: 'status',
  FROM: 'fromDate',
  TO: 'toDate',
  UNIT: 'unitName',
  ROLE: 'positionName',
  TYPE: 'activityType',
  HISTORY_TYPE: 'historyType',
} as const;

export const WORK_HISTORY_RECORD_MAP = {
  [WORK_HISTORY_RECORD.APPROVAL_STATUS]: 'Trạng thái',
  [WORK_HISTORY_RECORD.FROM]: 'Từ',
  [WORK_HISTORY_RECORD.TO]: 'Đến',
  [WORK_HISTORY_RECORD.UNIT]: 'Đơn vị công tác',
  [WORK_HISTORY_RECORD.ROLE]: 'Chức vụ, chức danh',
  [WORK_HISTORY_RECORD.TYPE]: 'Phân loại quá trình hoạt động',
};

export type WorkHistoryRecord = {
  id: string; // UUID from backend
  [WORK_HISTORY_RECORD.HISTORY_TYPE]:
    | 'chinh_quyen'
    | 'dang'
    | 'cong_doan'
    | 'doan'
    | 'quan_ngu_chinh_tri';
  [WORK_HISTORY_RECORD.APPROVAL_STATUS]: 'pending' | 'approved' | 'rejected';
  [WORK_HISTORY_RECORD.FROM]: string | null;
  [WORK_HISTORY_RECORD.TO]: string | null;
  [WORK_HISTORY_RECORD.UNIT]: string;
  [WORK_HISTORY_RECORD.ROLE]: string | null;
  [WORK_HISTORY_RECORD.TYPE]: string | null;
};
