import * as auth from './auth';
import * as profile from './profile';
import * as reward from './reward';

export const services = {
  ...auth,
  ...profile,
  ...reward,
};
