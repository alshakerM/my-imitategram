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
          <a className={navTitle}>
            <Image
              src="/Instagram_logo_text.svg"
              width="109"
              height="39"
              alt="Instagram text"
            />
          </a>
        </Link>
        <div>
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
              <SearchRounded fontSize="small" className={searchIcon} />
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
