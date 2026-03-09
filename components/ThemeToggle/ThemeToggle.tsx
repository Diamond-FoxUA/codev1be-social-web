'use client';

import { useTheme } from 'next-themes';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      className={`${styles.toggle} ${isDark ? styles.dark : ''}`}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Перемкнути тему"
      suppressHydrationWarning
    >
      <span className={styles.track}>
        <span className={styles.thumb} suppressHydrationWarning>
          {isDark ? '🌙' : '☀️'}
        </span>
      </span>
    </button>
  );
}
