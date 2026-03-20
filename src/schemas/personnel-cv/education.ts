import type { ApprovalStatus } from './approval';

export type EducationType = 'degree' | 'certificate' | 'foreign_lang' | 'it';

export type LanguageLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | null;

export const EDUCATION_TYPES: EducationType[] = [
  'degree',
  'certificate',
  'foreign_lang',
  'it',
];

export const EDUCATION_TYPE_MAP: Record<EducationType, string> = {
  degree: 'Đào tạo, bồi dưỡng dài hạn - cấp văn bằng',
  certificate: 'Đào tạo, bồi dưỡng ngắn hạn - cấp chứng chỉ',
  foreign_lang: 'Đào tạo, bồi dưỡng ngoại ngữ',
  it: 'Đào tạo, bồi dưỡng tin học',
};

export const TRAINING_RECORD = {
  ID: 'id',
  EDU_TYPE: 'eduType',
  FROM_DATE: 'fromDate',
  TO_DATE: 'toDate',
  DEGREE_LEVEL: 'degreeLevel',
  INSTITUTION: 'institution',
  MAJOR: 'major',
  TRAINING_FORM: 'trainingForm',
  FIELD: 'field',
  IS_STUDYING: 'isStudying',
  CERT_NAME: 'certName',
  LANG_NAME: 'langName',
  LANG_LEVEL: 'langLevel',
  APPROVAL_STATUS: 'approvalStatus',
} as const;

export const TRAINING_RECORD_MAP = {
  [TRAINING_RECORD.FROM_DATE]: 'Từ',
  [TRAINING_RECORD.TO_DATE]: 'Đến',
  [TRAINING_RECORD.DEGREE_LEVEL]: 'Trình độ chuyên môn',
  [TRAINING_RECORD.INSTITUTION]: 'Nơi đào tạo',
  [TRAINING_RECORD.MAJOR]: 'Chuyên ngành',
  [TRAINING_RECORD.TRAINING_FORM]: 'Hình thức đào tạo',
  [TRAINING_RECORD.FIELD]: 'Lĩnh vực',
  [TRAINING_RECORD.IS_STUDYING]: 'Đang học',
  [TRAINING_RECORD.CERT_NAME]: 'Tên chứng chỉ',
  [TRAINING_RECORD.LANG_NAME]: 'Tên ngoại ngữ',
  [TRAINING_RECORD.LANG_LEVEL]: 'Trình độ ngoại ngữ',
  [TRAINING_RECORD.APPROVAL_STATUS]: 'Trạng thái phê duyệt',
};

export type TrainingRecord = {
  id: string;
  eduType: EducationType;
  fromDate: string | null;
  toDate: string | null;
  degreeLevel: string | null;
  institution: string | null;
  major: string | null;
  trainingForm: string | null;
  field: string | null;
  isStudying: boolean;
  certName: string | null;
  langName: string | null;
  langLevel: LanguageLevel;
  approvalStatus?: ApprovalStatus;
};
