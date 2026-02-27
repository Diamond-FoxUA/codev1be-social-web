'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import css from './AuthNavModal.module.css';

import { useAuthModalStore } from '@/lib/store/authModalStore';

export default function AuthNavModal() {
  const { isOpen, close } = useAuthModalStore();

  /// Escape

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    window.addEventListener('keydown', handleEscape);

    return () => window.removeEventListener('keydown', handleEscape);
  }, [close]);

  /// не рендеримо якщо закрита

  if (!isOpen) return null;

  return (
    <div className={css.backdrop} onClick={close}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={css.close} onClick={close}>
          <svg className={css.menuIcon} width="14" height="14">
              <use href="/svg/icons.svg#close"></use>
            </svg>
        </button>

        <h2 className={css.title}>Помилка під час збереження</h2>

        <p className={css.text}>
          Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису зареєструйтесь
        </p>

        <div className={css.buttons}>
          <Link href="/login" onClick={close} className={css.loginBtn}>
            Увійти
          </Link>

          <Link href="/register" onClick={close} className={css.registerBtn}>
            Зареєструватись
          </Link>
        </div>
      </div>
    </div>
  );
}
