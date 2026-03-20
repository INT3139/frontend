import * as auth from './auth';
import * as health from './health';
import * as profile from './profile';
import * as reward from './reward';
import * as trainingProduct from './training-product';

export const services = {
  ...auth,
  ...profile,
  ...reward,
  ...health,
  ...trainingProduct,
};
