import Link from 'next/link';
import css from './NavLinks.module.css';
import { links, profileLink } from './links';

interface NavLinksProps {
  linkClassName?: string;
  onClick?: () => void;
  showProfile?: boolean;
}

function NavLinks({ linkClassName, onClick, showProfile }: NavLinksProps) {
  const allLinks = showProfile ? [...links, profileLink] : links;

  return (
    <>
      {allLinks.map(({ href, label }) => (
        <li key={href} className={linkClassName}>
          <Link
            href={href}
            className={`${css.navLink} ${linkClassName ?? ''}`}
            onClick={onClick}
          >
            {label}
          </Link>
        </li>
      ))}
    </>
  );
}

export default NavLinks;
