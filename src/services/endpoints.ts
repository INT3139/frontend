const auth = {
  login: '/auth/login',
};

const profile = {
  me: '/profiles/me',
  education: (id: string) => `/profiles/${id}/education`,
  educationItem: (id: string, subId: string) =>
    `/profiles/${id}/education/${subId}`,
};

const reward = {
  me: '/reward/me',
  commendation: '/reward/commendations',
  emulationTitle: '/reward/titles',
  discipline: '/reward/discipline',
};

const family = {
  me: '/personnel-cv/family/me',
};

const other = {
  me: '/personnel-cv/other/me', 
};
const academicCv = {
  scholarlyWorks: '/academic-cv/scholarly-works',
  scientificArticles: '/academic-cv/scientific-articles',
  scientificReports: '/academic-cv/scientific-reports',
};

export const ENDPOINTS = {
  auth,
  profile,
  reward,
  family,
  other,
  academicCv,
} as const;
