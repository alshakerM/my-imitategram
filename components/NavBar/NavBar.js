import { SearchRounded } from '@mui/icons-material';
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
} from './NavBar.module.css';

export function NavBar() {
  const [inputValue, setInputValue] = React.useState('');
  const [searchActive, setSearchActive] = React.useState(false);
  const hasValue = inputValue;
  return (
    <nav className={navContainer}>
      <div className={navContent}>
        <Link href="/">
          <a className={navTitle}>
            <img
              src="/Instagram_logo_text.svg"
              width="109"
              height="39"
              alt="Instagram text"
            />
          </a>
        </Link>
        <div>
          {searchActive ? (
            <input
              type="search"
              onBlur={() => !hasValue && setSearchActive(false)}
              placeholder="Search"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              className={searchInput}
              autoFocus
            ></input>
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
