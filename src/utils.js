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
