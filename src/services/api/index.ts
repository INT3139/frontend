import * as auth from './auth';
import * as family from './family';
import * as health from './health';
import * as other from './other';
import * as profile from './profile';
import * as reward from './reward';
import * as trainingProduct from './training-product';

export const services = {
  ...auth,
  ...profile,
  ...reward,
  ...health,
  ...trainingProduct,
  ...family,
  ...other,
};
