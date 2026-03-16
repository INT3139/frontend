import { services } from '@/services/api';
import { queryOptions } from '@tanstack/react-query';

export const profileQueryOptions = queryOptions({
  queryKey: ['profile', 'me'],
  queryFn: services.getMyProfile,
  staleTime: 1000 * 60 * 5, // 5 minutes
});
