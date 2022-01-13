import { Cancel, SearchRounded } from '@mui/icons-material';
import Link from 'next/link';
import React from 'react';
import { Icons } from '../Icons/Icons';
import { useMediaQuery } from '../../utils/index';
import styles from './NavBar.module.css';
import Image from 'next/image';
import { BottomMobileIcons, TopMobileIcons } from '../Icons/MobileIcons';

export function NavBar() {
  const isMobile = useMediaQuery('(max-width: 720px)');
  const [inputValue, setInputValue] = React.useState('');
  const [searchActive, setSearchActive] = React.useState(false);
  const hasValue = inputValue;
  if (isMobile) {
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
                    stroke-Linecap="round"
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
