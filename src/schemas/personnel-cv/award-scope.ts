export const AWARD_SCOPES = {
  GRASSROOTS: 'grassroots',
  INSTITUTIONAL: 'institutional',
  MINISTERIAL: 'ministerial',
  NATIONAL: 'national',
} as const;

export const AWARD_SCOPES_MAP = {
  [AWARD_SCOPES.GRASSROOTS]: 'Cấp Cơ sở',
  [AWARD_SCOPES.INSTITUTIONAL]: 'Cấp Đại học Quốc gia',
  [AWARD_SCOPES.MINISTERIAL]: 'Cấp Bộ',
  [AWARD_SCOPES.NATIONAL]: 'Cấp Nhà nước/TW',
};

export type AwardScope = (typeof AWARD_SCOPES)[keyof typeof AWARD_SCOPES];
