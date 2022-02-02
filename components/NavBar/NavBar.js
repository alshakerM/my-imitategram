import { ArrowBackIos, Cancel } from '@mui/icons-material';
import Link from 'next/link';
import React from 'react';
import { Icons } from '../Icons/Icons';
import styles from './NavBar.module.css';
import Image from 'next/image';
import cx from 'classnames';
import { BottomMobileIcons, TopMobileIcons } from '../Icons/MobileIcons';
import { useRouter } from 'next/router';
import { Route } from '../Route';

export function NavBar({ userName }) {
  const [inputValue, setInputValue] = React.useState('');
  const [searchActive, setSearchActive] = React.useState(false);
  const hasValue = inputValue;
  const router = useRouter();
  const commentsOnly = router.query.comments;
  const isUserProfile = router.asPath.match(/^\/\w+$/);
  return (
    <>
      <Route
        matcher={() => {
          return commentsOnly || isUserProfile;
        }}
        paths={['/direct/inbox']}
      >
        <div
          className={cx(styles.fixedPlaceholder, styles.hideOnDesktop)}
        ></div>
        <nav className={cx(styles.limitedNavBar, styles.hideOnDesktop)}>
          <Link href="/">
            <a>
              <ArrowBackIos style={{ color: 'black' }} />
            </a>
          </Link>
          <h1>
            <Route
              matcher={() => {
                return commentsOnly;
              }}
            >
              Comments
            </Route>
            <Route
              matcher={() => {
                return isUserProfile;
              }}
            >
              <div>{userName}</div>
            </Route>

            <Route paths={['/direct/inbox']}>
              <div>Direct</div>
            </Route>
          </h1>

          <Route
            matcher={() => {
              return isUserProfile;
            }}
          >
            <div style={{ width: 64 }}></div>
          </Route>

          <Route paths={['/direct/inbox']}>
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
          </Route>
        </nav>
      </Route>
      <Route
        paths={['/[[...segments]]']}
        negativeMatcher={() => {
          return isUserProfile;
        }}
      >
        <div
          className={cx(styles.fixedPlaceholder, styles.hideOnDesktop)}
        ></div>
        <nav className={cx(styles.mobileTopNavContainer, styles.hideOnDesktop)}>
          <div>
            <TopMobileIcons className={styles.mobileNavContent} />
          </div>

          <div className={styles.mobileBottomNavContainer}>
            <BottomMobileIcons className={styles.mobileIcons} />
          </div>
        </nav>
      </Route>
      <div className={cx(styles.fixedPlaceholder, styles.hideOnMobile)}></div>
      <nav className={cx(styles.navContainer, styles.hideOnMobile)}>
        <div className={styles.navContent}>
          <Link href="/">
            <a className={styles.navTitle}>
              <Image
                src="/Imitategram_logo_text.svg"
                width={840}
                height={300}
                layout="responsive"
                alt="Imitategram text"
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
    </>
  );
}
