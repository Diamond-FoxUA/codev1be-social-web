// 'use client';

// import { useEffect } from 'react';
// import { useAuthStore } from '@/lib/store/authStore';

// export default function AuthInitializer() {
//   const checkAuth = useAuthStore((s) => s.checkAuth);

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   return null;
// }
'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getMe } from '@/lib/api/clientApi';
import { User } from '@/types/user';
import Loader from '@/components/Loader/Loader';

interface Props {
  children: React.ReactNode;
  initialUser: User | null;
}

export default function AuthInitializer({ children, initialUser }: Props) {
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
