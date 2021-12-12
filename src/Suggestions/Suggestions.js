import cx from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '../Avatar/Avatar';
import styles from './Suggestions.module.css';

export function Suggestions({ isExpanded }) {
  const [suggestionsData, setSuggestionsData] = React.useState([]);
  React.useEffect(() => {
    fetch('/Data/suggestions.json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((results) => setSuggestionsData(results));
  }, []);
  const slicedSuggestionData = suggestionsData.slice(0, 5);
  if (isExpanded) {
    return (
      <div className={styles.suggestionSection}>
        <p className={cx(styles.text, styles.isExpanded)}>Suggested</p>
        <div className={cx(styles.contentSection, styles.isExpanded)}>
          {suggestionsData?.map((suggestionData) => (
            <div className={cx(styles.content, styles.isExpanded)}>
              <Avatar user={suggestionData} size="44" />
              <div className={cx(styles.userNameAndReason, styles.isExpanded)}>
                <Link
                  to={`/${suggestionData.user_name}`}
                  className={cx(styles.userName, styles.isExpanded)}
                >
                  {suggestionData.user_name}
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
          <Link to="/explore/people/" className={styles.seeAllButton}>
            See All
          </Link>
        </div>
        <div>
          {slicedSuggestionData?.map((suggestionData) => (
            <div className={styles.content}>
              <Avatar user={suggestionData} size="small" />
              <div className={styles.userNameAndReason}>
                <Link
                  to={`/${suggestionData.user_name}`}
                  className={styles.userName}
                >
                  {suggestionData.user_name}
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
