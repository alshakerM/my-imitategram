import { Cancel, SearchRounded } from '@mui/icons-material';
import Link from 'next/link';
import React from 'react';
import { Icons } from '../Icons/Icons';
import {
  navContainer,
  navContent,
  navIcons,
  navTitle,
  searchIcon,
  searchInput,
  searchPlaceholder,
  cancelIconContainer,
  inputSection,
  cancelIcon,
  titleImg,
  inputMain,
} from './NavBar.module.css';
import Image from 'next/image';

export function NavBar() {
  const [inputValue, setInputValue] = React.useState('');
  const [searchActive, setSearchActive] = React.useState(false);
  const hasValue = inputValue;
  return (
    <nav className={navContainer}>
      <div className={navContent}>
        <Link href="/">
          <div className={navTitle}>
            <Image
              src="/Instagram_logo_text.svg"
              width={840}
              height={300}
              layout="responsive"
              alt="Instagram text"
              className={titleImg}
            />
          </div>
        </Link>
        <div className={inputMain}>
          {searchActive ? (
            <div className={inputSection}>
              <input
                type="text"
                onBlur={() => !hasValue && setSearchActive(false)}
                placeholder="Search"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                className={searchInput}
                autoFocus
              ></input>
              <div
                className={cancelIconContainer}
                onClick={() => {
                  setInputValue('');
                  setSearchActive(false);
                }}
              >
                <Cancel className={cancelIcon} fontSize="small" />
              </div>
            </div>
          ) : (
            <button
              className={searchPlaceholder}
              onClick={() => setSearchActive(true)}
            >
              <SearchRounded className={searchIcon} />
              <span> Search</span>
            </button>
          )}
        </div>
        <div className={navIcons}>
          <Icons />
        </div>
      </div>
    </nav>
  );
}
