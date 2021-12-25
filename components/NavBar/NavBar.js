import { Clear, SearchRounded } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import { createStyles, withStyles } from '@mui/styles';
import React from 'react';
import Link from 'next/link'
import { Icons } from '../Icons/Icons';
import {
  clearButton,
  clearIcon,
  searchInputSection,
  navContainer,
  navContent,
  navTitle,
  searchIcon,
} from './NavBar.module.css';

const borderStyles = createStyles({
  notchedOutline: {
    borderColor: '#dbdbdb !important',
    borderWidth: '1px !important',
  },
  inputSizeSmall: {
    height: '20px!important',
    width: '190px!important',
    fontSize: '14px!important',
    padding: '0!important',
  },
  formControl: { height: 28, padding: '0 12px!important' },
});

const BorderLessTextInput = withStyles(borderStyles)((props) => {
  const { classes, InputProps, ...rest } = props;
  return (
    <TextField
      sx={{ width: 200 }}
      {...rest}
      InputProps={{
        ...InputProps,
        classes: {
          notchedOutline: classes.notchedOutline,
          inputSizeSmall: classes.inputSizeSmall,
          formControl: classes.formControl,
        },
      }}
    />
  );
});

export function NavBar() {
  const [inputValue, setInputValue] = React.useState('');
  const hasValue = inputValue;
  return (
    <nav className={navContainer}>
      <div className={navContent}>
        <Link href="/" className={navTitle}>
          <img
            src="/Instagram_logo_text.svg"
            width="109"
            height="39"
            alt="Instagram text"
          />
        </Link>
        <div>
          <BorderLessTextInput
            onChange={(event) => setInputValue(event.target.value)}
            margin="dense"
            value={inputValue}
            className={searchInputSection}
            placeholder="Search"
            size="small"
            InputProps={
              hasValue
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          className={clearButton}
                          onClick={() => setInputValue('')}
                        >
                          <Clear className={clearIcon} fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                : {
                    startAdornment: (
                      <InputAdornment position="start" style={{ margin: 0 }}>
                        <SearchRounded
                          fontSize="small"
                          className={searchIcon}
                        />
                      </InputAdornment>
                    ),
                  }
            }
          >
            <SearchRounded />
          </BorderLessTextInput>
        </div>
        <div className="nav-icons">
          <Icons />
        </div>
      </div>
    </nav>
  );
}
