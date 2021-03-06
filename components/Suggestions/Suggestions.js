import cx from 'classnames';
import React from 'react';
import Link from 'next/link';
import { Avatar } from '../Avatar/Avatar';
import styles from './Suggestions.module.css';
import { useSelect } from '@wordpress/data';
import '../../stores/suggestionsStore';

export function Suggestions({ isExpanded }) {
  const suggestionsData = useSelect((select) => {
    if (isExpanded) {
      return select('ig-suggestions').getSuggestions();
    } else {
      return select('ig-suggestions').getSuggestions(5);
    }
  });

  return (
    <div
      className={cx(styles.suggestionSection, {
        [styles.isExpanded]: isExpanded,
      })}
    >
      {isExpanded ? (
        <p
          className={cx(styles.text, {
            [styles.isExpanded]: isExpanded,
          })}
        >
          Suggested
        </p>
      ) : (
        <div className={styles.textViewButton}>
          <p className={styles.text}>Suggestions for you</p>
          <Link href="/explore/people/">
            <a className={styles.seeAllButton}>See All</a>
          </Link>
        </div>
      )}

      <div
        className={cx(styles.contentSection, {
          [styles.isExpanded]: isExpanded,
        })}
      >
        {suggestionsData.map((suggestionData) => (
          <div
            className={cx(styles.content, {
              [styles.isExpanded]: isExpanded,
            })}
            key={suggestionData.user_id}
          >
            <Avatar
              user={suggestionData}
              size={isExpanded ? '51' : '37'}
              link={`/${suggestionData.user_name}`}
            />
            <div
              className={cx(styles.userNameAndReason, {
                [styles.isExpanded]: isExpanded,
              })}
            >
              <Link href={`/${suggestionData.user_name}`}>
                <a className={cx(styles.userName, styles.isExpanded)}>
                  {suggestionData.user_name}
                </a>
              </Link>
              {isExpanded && (
                <p className={styles.userFullName}>
                  {suggestionData.full_name}
                </p>
              )}

              <p className={cx(styles.userReason, styles.isExpanded)}>
                {suggestionData.reason}
              </p>
            </div>
            <button
              className={cx(styles.followButton, {
                [styles.isExpanded]: isExpanded,
              })}
            >
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
