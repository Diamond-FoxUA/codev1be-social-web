'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import css from './MobileMenu.module.css';
import Image from 'next/image';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();

  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      clearIsAuthenticated();
      onClose();
    }
  };

  return (
    <div className={css.overlay}>
      <div className={css.menuContainer}>
        {/* ВЕРХНЯ ЧАСТИНА: Лого та Закрити */}
        <div className={css.header}>
          <Link href="/" className={css.logoLink} aria-label="Home">
            <div className={css.logoWrapper}>
              <Image
                src="/svg/logo.svg"
                alt="Лого 'Подорожники'"
                width={23}
                height={23}
                priority
                className={css.logoIcon}
              />
              <span className={css.logoText}>Подорожники</span>
            </div>
          </Link>
          <button
            className={css.closeBtn}
            onClick={onClose}
            aria-label="Закрити меню"
          >
            <svg width="24" height="24" className={css.iconClose}>
              <use href="/svg/icons.svg#icon-close" />
            </svg>
          </button>
        </div>

        {/* ЦЕНТРАЛЬНА ЧАСТИНА: Навігація */}
        <nav className={css.nav}>
          <Link href="/" onClick={onClose} className={css.navLink}>
            Головна
          </Link>
          <Link href="/stories" onClick={onClose} className={css.navLink}>
            Історії
          </Link>
          <Link href="/travelers" onClick={onClose} className={css.navLink}>
            Мандрівники
          </Link>

          {isAuthenticated && (
            <Link href="/profile" onClick={onClose} className={css.navLink}>
              Мій Профіль
            </Link>
          )}
        </nav>

        {/* НИЖНЯ ЧАСТИНА: Кнопки дії */}
        <div className={css.footer}>
          {isAuthenticated ? (
            /* ДЛЯ ЗАЛОГІНЕНОГО (МАКЕТ 2) */
            <div className={css.loggedInContent}>
              <button className={css.blueButton} onClick={onClose}>
                Опублікувати історію
              </button>
              <div className={css.userRow}>
                <div className={css.avatar}>
                  {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Avatar" />
                  ) : (
                    <div className={css.avatarPlaceholder} />
                  )}
                </div>
                <span className={css.userName}>{user?.name || "Ім'я"}</span>
                <button
                  className={css.logoutIconBtn}
                  onClick={handleLogout}
                  aria-label="Вийти"
                >
                  <svg width="24" height="24" className={css.iconLogout}>
                    <use href="/svg/icons.svg#logout" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            /* ДЛЯ ГОСТЯ (МАКЕТ 1) */
            <div className={css.guestContent}>
              <Link href="/login" className={css.grayButton} onClick={onClose}>
                Вхід
              </Link>
              <Link
                href="/register"
                className={css.blueButton}
                onClick={onClose}
              >
                Реєстрація
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
