import cx from 'classnames';
import React from 'react';
import Link from 'next/link';
import { Avatar } from '../Avatar/Avatar';
import styles from './Suggestions.module.css';
import { useSelect } from '@wordpress/data';
import '../../stores/suggestionsStore';

export function Suggestions({ isExpanded }) {
  const suggestionsData = useSelect((select) =>
    select('ig-suggestions').getSuggestions()
  );

  const slicedSuggestionData = suggestionsData.slice(0, 5);
  if (isExpanded) {
    return (
      <div className={styles.suggestionSection}>
        <p className={cx(styles.text, styles.isExpanded)}>Suggested</p>
        <div className={cx(styles.contentSection, styles.isExpanded)}>
          {suggestionsData?.map((suggestionData) => (
            <div
              className={cx(styles.content, styles.isExpanded)}
              key={suggestionData.user_id}
            >
              <Avatar user={suggestionData} size="44" />
              <div className={cx(styles.userNameAndReason, styles.isExpanded)}>
                <Link href={`/${suggestionData.user_name}`}>
                  <a className={cx(styles.userName, styles.isExpanded)}>
                    {suggestionData.user_name}
                  </a>
                </Link>
                <p className={styles.userFullName}>
                  {suggestionData.full_name}
                </p>
                <p className={cx(styles.userReason, styles.isExpanded)}>
                  {suggestionData.reason}
                </p>
              </div>
              <button className={cx(styles.followButton, styles.isExpanded)}>
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.suggestionContainer}>
        <div className={styles.textViewButton}>
          <p className={styles.text}>Suggestions for you</p>
          <Link href="/explore/people/">
            <a className={styles.seeAllButton}>See All</a>
          </Link>
        </div>
        <div>
          {slicedSuggestionData?.map((suggestionData) => (
            <div className={styles.content} key={suggestionData.user_id}>
              <Avatar user={suggestionData} size="small" />
              <div className={styles.userNameAndReason}>
                <Link href={`/${suggestionData.user_name}`}>
                  <a className={styles.userName}>{suggestionData.user_name}</a>
                </Link>
                <p
                  className={cx(styles.userReason, {
                    [styles.isExpanded]: true,
                  })}
                >
                  {suggestionData.reason}
                </p>
              </div>
              <button className={styles.followButton}>Follow</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}