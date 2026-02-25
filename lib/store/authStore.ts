import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/types/user';

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      clearIsAuthenticated: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
