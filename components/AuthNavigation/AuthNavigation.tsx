'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import css from './AuthNavigation.module.css';
import Image from 'next/image';

export default function AuthNavigation() {
  const router = useRouter();
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      clearIsAuthenticated();
      router.push('/');
    }
  };

  return (
    <div className={css.wrapper}>
      {isAuthenticated && user ? (
        <div className={css.userContainer}>
          <Link href="/profile" className={css.profileLink}>
            <span className={css.userName}>{user.name || user.email}</span>
            <div className={css.avatarCircle}>
              {user.avatarUrl ? (
                <Image
                  src={user.avatarUrl}
                  alt="Avatar"
                  className={css.avatarImg}
                  // width={23} Image with src "https://randomuser.me/api/portraits/women/44.jpg" is missing required "width" property.
                  // height={23}
                />
              ) : (
                (user.name || 'U').charAt(0).toUpperCase()
              )}
            </div>
          </Link>
          <button onClick={handleLogout} className={css.logoutButton}>
            Вихід
          </button>
        </div>
      ) : (
        <div className={css.authButtons}>
          <Link href="/login" prefetch={false} className={css.loginLink}>
            Вхід
          </Link>
          <Link href="/register" prefetch={false} className={css.registerBtn}>
            Реєстрація
          </Link>
        </div>
      )}
    </div>
  );
}
