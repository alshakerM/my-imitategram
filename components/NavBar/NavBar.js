import { Cancel, ChevronLeft } from '@mui/icons-material';
import Link from 'next/link';
import React from 'react';
import { Icons } from '../Icons/Icons';
import { useMediaQuery } from '../../utils/index';
import styles from './NavBar.module.css';
import Image from 'next/image';
import { BottomMobileIcons, TopMobileIcons } from '../Icons/MobileIcons';
import { useRouter } from 'next/router';

export function NavBar() {
  const isMobile = useMediaQuery('(max-width: 720px)');
  const [inputValue, setInputValue] = React.useState('');
  const [searchActive, setSearchActive] = React.useState(false);
  const hasValue = inputValue;
  const router = useRouter();
  const commentsOnly = router.asPath.endsWith('comments');

  if (isMobile) {
    if (commentsOnly) {
      return (
        <nav className={styles.onlyCommentsNav}>
          <Link href="/">
            <a>
              <ChevronLeft />
            </a>
          </Link>
          <h1>Comments</h1>
          <Link href="/direct/inbox">
            <a>
              <svg
                aria-label="Direct"
                className={styles.icon}
                color="#262626"
                fill="#262626"
                height="22"
                role="img"
                viewBox="0 0 48 48"
                width="22"
              >
                <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
              </svg>
            </a>
          </Link>
        </nav>
      );
    }
    return (
      <nav>
        <div className={styles.mobileTopNavContainer}>
          <TopMobileIcons className={styles.mobileNavContent} />
        </div>
        <div className={styles.mobileBottomNavContainer}>
          <BottomMobileIcons className={styles.mobileIcons} />
        </div>
      </nav>
    );
  } else {
    return (
      <nav className={styles.navContainer}>
        <div className={styles.navContent}>
          <Link href="/">
            <a className={styles.navTitle}>
              <Image
                src="/Instagram_logo_text.svg"
                width={840}
                height={300}
                layout="responsive"
                alt="Instagram text"
                className={styles.titleImg}
              />
            </a>
          </Link>
          <div className={styles.inputMain}>
            {searchActive ? (
              <div className={styles.inputSection}>
                <input
                  type="text"
                  onBlur={() => !hasValue && setSearchActive(false)}
                  placeholder="Search"
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                  className={styles.searchInput}
                  autoFocus
                ></input>
                <div
                  className={styles.cancelIconContainer}
                  onClick={() => {
                    setInputValue('');
                    setSearchActive(false);
                  }}
                >
                  <Cancel className={styles.cancelIcon} fontSize="small" />
                </div>
              </div>
            ) : (
              <button
                className={styles.searchPlaceholder}
                onClick={() => setSearchActive(true)}
              >
                <svg
                  aria-label="Search and explore"
                  className={styles.searchIcon}
                  fill="#8e8e8e"
                  height="16"
                  role="img"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path
                    d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="16.511"
                    x2="22"
                    y1="16.511"
                    y2="22"
                  ></line>
                </svg>
                <span className={styles.placeholderText}> Search</span>
              </button>
            )}
          </div>
          <div className={styles.navIcons}>
            <Icons />
          </div>
        </div>
      </nav>
    );
  }
}
