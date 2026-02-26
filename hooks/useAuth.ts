'use client';

import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/lib/api/auth';

export const useAuth = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getMe,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
};
