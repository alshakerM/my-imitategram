import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

/**
 * Converts a JavaScript date object to a relative time (eg: 5min ago)
 * @param {Date} date the JS date object
 * @returns {string} the relative time/date
 */
export function absoluteToRelativeDate(date) {
  return timeAgo.format(new Date(date), 'mini');
}
