import styles from './Suggestions.module.css';
import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import { NavBar } from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import cx from 'classnames';

export function Suggestions({ isExpanded }) {
  const [suggestionsData, setSuggestionsData] = React.useState([]);
  React.useEffect(() => {
    fetch('/Data/suggestions.json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((results) => setSuggestionsData(results));
  });
  const slicedSuggestionData = suggestionsData.slice(0, 5);

  return (
    <>
      {isExpanded ? (
        <div className={styles.suggestionSection}>
          <p className={styles.text}>Suggested</p>
          <div className={styles.contentSection}>
            {suggestionsData?.map((suggestionData) => (
              <div className={styles.content}>
                <Avatar src={suggestionData.user_thumbnail} size="44" />
                <div className={styles.userNameAndReason}>
                  <Link
                    to={`/${suggestionData.user_name}`}
                    className={styles.userName}
                  >
                    {suggestionData.user_name}
                  </Link>
                  <p className={styles.userFullName}>
                    {suggestionData.full_name}
                  </p>
                  <p className={styles.userReason}>{suggestionData.reason}</p>
                </div>
                <button className={styles.followButton}>Follow</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.suggestionSectionIsExpanded}>
          <div className={styles.textViewButton}>
            <p className={styles.textIsExpanded}>Suggestions for you</p>
            <Link to="/explore/people/" className={styles.seeAllButton}>
              See All
            </Link>
          </div>
          <div>
            {slicedSuggestionData?.map((suggestionData) => (
              <div className={styles.content}>
                <Avatar src={suggestionData.user_thumbnail} size="32" />
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
                <button className={styles.followButtonIsExpanded}>
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
