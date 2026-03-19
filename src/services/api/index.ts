import * as auth from './auth';
import * as family from './family';
import * as other from './other';
import * as profile from './profile';
import * as reward from './reward';

export const services = {
  ...auth,
  ...profile,
  ...reward,
  ...family,
  ...other,
};
