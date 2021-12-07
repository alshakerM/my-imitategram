import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

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
  document.body.style.overflow = lock ? 'hidden' : '';
}

/**
 * takes a number and returns it as a human readable number
 * exp (10000 = 10k)
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
    return digitGrouping(num);
  }
  return num;
}
export function digitGrouping(num) {
  return Intl.NumberFormat('en-us', { useGrouping: true }).format(num);
}
