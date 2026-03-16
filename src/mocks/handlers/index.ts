import { handlers as authHandlers } from './auth';
import { handlers as rewardHandlers } from './reward';

export const handlers = [...authHandlers, ...rewardHandlers];
