const auth = {
  login: '/auth/login',
};

const profile = {
  me: '/profile/me',
  health: (userId: number | string) => `/profiles/${userId}/health`,
};

const reward = {
  me: '/reward/me',
  commendation: '/reward/commendations',
  emulationTitle: '/reward/titles',
  discipline: '/reward/discipline',
};

export const ENDPOINTS = {
  auth,
  profile,
  reward,
} as const;
