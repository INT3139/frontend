const auth = {
  login: '/auth/login',
};

const profile = {
  me: '/profile/me',
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

export const ENDPOINTS = {
  auth,
  profile,
  reward,
  family,
  other,
} as const;
