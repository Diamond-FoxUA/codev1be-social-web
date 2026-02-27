import Link from 'next/link';
import Image from 'next/image';
import css from './Logo.module.css';

interface LogoProps {
  className?: string;
}

function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={`${css.logoLink} ${className ?? ''}`}
      aria-label="Home"
    >
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
  );
}

export default Logo;
