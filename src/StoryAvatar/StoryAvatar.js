import './StoryAvatar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
export function StoryAvatar({ user, isUserNameNeeded }) {
  const userId = user.user_id;

  return (
    <div
      className={cx('story-avatar', {
        'is-small': !isUserNameNeeded,
      })}
    >
      <div className="circle">
        <Link to={`/stories/${userId}`}>
          <img
            src={user.user_thumbnail}
            alt={`${user.user_name} avatar`}
            className="story-user-avatar"
          />
        </Link>
      </div>
      {isUserNameNeeded ? (
        <p className="story-avatar-username">{user.user_name}</p>
      ) : (
        ''
      )}
    </div>
  );
}
