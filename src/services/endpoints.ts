const auth = {
  login: '/auth/login',
};

const profile = {
  me: '/profile/me',
  health: (userId: number | string) => `/profiles/${userId}/health`,
  trainingProducts: (
    userId: number | string,
    trainingProductId?: number | string,
  ) =>
    trainingProductId
      ? `/profiles/${userId}/training-products/${trainingProductId}`
      : `/profiles/${userId}/training-products`,
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
