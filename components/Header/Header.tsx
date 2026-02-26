'use client';

import Link from 'next/link';
import AuthNavigation from '@/components/AuthNavigation/AuthNavigation';
import css from './Header.module.css';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import React, { useState } from 'react';
import MobileMenu from '../MobileMenu/MobileMenu';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const headerClasses = `${css.header} ${isHomePage ? css.homeHeader : css.pageHeader}`;

  return (
    <>
      <header className={headerClasses}>
        <div className={`container ${css.headerContainer}`}>
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
          <nav aria-label="Main Navigation" className={css.desktopNav}>
            <ul className={css.navigation}>
              <li className={css.navigationItem}>
                <Link href="/">Головна</Link>
              </li>
              <li className={css.navigationItem}>
                <Link href="/stories">Історії</Link>
              </li>
              <li>
                <Link href="/travelers">Мандрівники</Link>
              </li>
              <AuthNavigation />
            </ul>
          </nav>

          <div className={css.mobileActions}>
            <button
              className={css.menuBtn}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className={css.menuIcon} width="24" height="24">
                <use href="/svg/icons.svg#menu"></use>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

export default Header;
