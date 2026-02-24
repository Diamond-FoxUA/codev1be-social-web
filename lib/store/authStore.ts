import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/types/user';

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  clearIsAuthenticated: () => void;
}

// export const useAuthStore = create<AuthStore>()(
//   persist(
//     (set) => ({
//       isAuthenticated: false,
//       user: null,

//       setUser: (user) =>
//         set({
//           user,
//           isAuthenticated: !!user,
//         }),

//       clearIsAuthenticated: () =>
//         set({
//           user: null,
//           isAuthenticated: false,
//         }),
//     }),
//     {
//       name: 'auth-storage', // назва ключа в localStorage
//       storage: createJSONStorage(() => localStorage),
//     },
//   ),
// );

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // ТИМЧАСОВО ПОСТАВ true ТА ДАНІ ЮЗЕРА
      isAuthenticated: true,
      user: {
        _id: '1',
        name: 'Анастасія',
        email: 'test@mail.com',
        avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', // або null
        articlesAmount: 5,
        favoriteStories: [],
      },

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'auth-storage' },
  ),
);
