import { getMyProfile } from '@/services/api/profile';
import { queryOptions } from '@tanstack/react-query';

export const profileQueryOptions = queryOptions({
  queryKey: ['profile', 'me'],
  queryFn: getMyProfile,
  staleTime: 1000 * 60 * 5, // 5 minutes
});
