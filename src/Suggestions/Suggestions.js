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
      <NavBar />
      {isExpanded ? (
        <div
          className={cx(styles.suggestionSection, {
            [styles.onHomePage]: isExpanded,
          })}
        >
          <div className={styles.SuggestionTextViewButton}>
            <p
              className={cx(styles.suggestionText, {
                [styles.onHomePage]: isExpanded,
              })}
            >
              Suggestions for you
            </p>
            <Link to="/explore/people/" className={styles.seeAllButton}>
              See All
            </Link>
          </div>
          <div
            className={cx(styles.suggestionContentSection, {
              [styles.onHomePage]: isExpanded,
            })}
          >
            {slicedSuggestionData?.map((suggestionData) => (
              <div
                className={cx(styles.suggestionContent, {
                  [styles.onHomePage]: isExpanded,
                })}
              >
                <Avatar src={suggestionData.user_thumbnail} size="32" />
                <div className={styles.suggestionsUserNameReason}>
                  <Link
                    to={`/${suggestionData.user_name}`}
                    className={styles.suggestionUserName}
                  >
                    {suggestionData.user_name}
                  </Link>
                  <p
                    className={cx(styles.suggestionUserReason, {
                      [styles.onHomePage]: isExpanded,
                    })}
                  >
                    {suggestionData.reason}
                  </p>
                </div>
                <button
                  className={cx(styles.followButton, {
                    [styles.onHomePage]: isExpanded,
                  })}
                >
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.suggestionSection}>
          <p className={styles.suggestedText}>Suggested</p>
          <div className={styles.suggestionContentSection}>
            {suggestionsData?.map((suggestionData) => (
              <div className={styles.suggestionContent}>
                <Avatar src={suggestionData.user_thumbnail} size="44" />
                <div className={styles.suggestionsUserNameReason}>
                  <Link
                    to={`/${suggestionData.user_name}`}
                    className={styles.suggestionUserName}
                  >
                    {suggestionData.user_name}
                  </Link>
                  <p className={styles.suggestionUserFullName}>
                    {suggestionData.full_name}
                  </p>
                  <p className={styles.suggestionUserReason}>
                    {suggestionData.reason}
                  </p>
                </div>
                <button className={styles.followButton}>Follow</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
