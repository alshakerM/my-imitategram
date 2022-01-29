import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import React from 'react';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

/**
 * Converts a JavaScript date object to a relative time (eg: 5min ago)
 * @param {Date} date the JS date object
 * @param {dateTextSize} dateTextSize the size of the date text with ago is the default value use or without ago use mini
 * @returns {string} the relative time/date
 */
export function absoluteToRelativeDate(date, dateTextSize) {
  return timeAgo.format(new Date(date), dateTextSize);
}
export function elementWidth(el) {
  return el?.getBoundingClientRect().width;
}

/**
 * Locks the body from scrolling
 * @param {Boolean} lock true = lock, false = unlock
 */
export function lockBodyScrolls(lock) {
  if (typeof window !== undefined) {
    document.body.style.overflow = lock ? 'hidden' : '';
  }
}

/**
 * takes a number and returns it as a human readable number
 * e.g. (10000 = 10k), (1200 => 1,200), (12000 => 12k)
 * @param {num} num is the number
 * @returns returns the the number as human readable number
 */
export function readableNumber(num) {
  if (num > 1000000) {
    return `${(num / 1000000).toFixed(1)}m`;
  } else if (num > 100000) {
    return `${Math.floor(num / 1000)}k`;
  } else if (num >= 10000) {
    return `${(num / 1000).toFixed(1)}k`;
  } else if (num < 10000) {
    return digitGrouping(num); // using only digitGrouping because we only need to display any number below 10k with only a comma
  }
  return num;
}
/**
 *
 * @param {*} num you pass a number here
 * @returns return the number with a comma
 */
export function digitGrouping(num) {
  return Intl.NumberFormat('en-us', { useGrouping: true }).format(num);
}
/**
 * bounds n between min and max
 * @param {number} n
 * @param {number} min
 * @param {number} max
 * @returns
 */
export function numberBetween(n, min, max) {
  return Math.max(min, Math.min(n, max));
}

export function isomorphicFetch(url, config) {
  const base =
    typeof window !== 'undefined' ? window.location.href : process.env.BASE_URL;
  const absoluteURL = new URL(url, base).href;
  return fetch(absoluteURL, config);
}
/**
 * Runs a media query and returns its value when it changes.
 * See: https://github.com/WordPress/gutenberg/blob/trunk/packages/compose/src/hooks/use-media-query/index.js
 *
 * @param {string} [query] Media Query.
 * @return {boolean} return value of the media query.
 */
export function useMediaQuery(query) {
  const isServer = typeof window === 'undefined';
  const [match, setMatch] = React.useState(
    () =>
      !!(
        // on SSR default to returning true
        (
          isServer ||
          (query &&
            typeof window !== 'undefined' &&
            window.matchMedia(query).matches)
        )
      )
  );

  React.useEffect(() => {
    if (!query) {
      return;
    }
    const updateMatch = () => setMatch(window.matchMedia(query).matches);
    updateMatch();
    const list = window.matchMedia(query);
    list.addListener(updateMatch);
    return () => {
      list.removeListener(updateMatch);
    };
  }, [query]);
  return !!query && match;
}
