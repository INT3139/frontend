export const EDUCATION_LEVEL = {
  BACHELOR: 'bachelor',
  MASTER: 'master',
  RESEARCHER: 'researcher',
  DOCTOR: 'doctor',
} as const;

export const EDUCATION_LEVEL_MAP = {
  [EDUCATION_LEVEL.BACHELOR]: 'Cử nhân',
  [EDUCATION_LEVEL.MASTER]: 'Thạc sĩ',
  [EDUCATION_LEVEL.RESEARCHER]: 'Nghiên cứu sinh',
  [EDUCATION_LEVEL.DOCTOR]: 'Tiến sĩ',
} as const;

export type EducationLevel =
  (typeof EDUCATION_LEVEL)[keyof typeof EDUCATION_LEVEL];
