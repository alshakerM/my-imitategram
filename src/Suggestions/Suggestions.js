import styles from './Suggestions.module.css';
import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import { NavBar } from '../NavBar/NavBar';
import { Link } from 'react-router-dom';

export function Suggestions() {
  const [suggestionsData, setSuggestionsData] = React.useState([]);
  React.useEffect(() => {
    fetch('/Data/suggestions.json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((results) => setSuggestionsData(results));
  });

  return (
    <>
      <NavBar />
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
    </>
  );
}
