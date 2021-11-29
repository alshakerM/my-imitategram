import './StoryAvatar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
export function StoryAvatar({ user, isUserNameNeeded, className }) {
  const userId = user?.user_id;

  return (
    <div className={cx('story-avatar', className)}>
      <div className="circle">
        <Link to={`/stories/${userId}`}>
          <img
            src={user?.user_thumbnail}
            alt={`${user?.user_name} avatar`}
            className="story-user-avatar"
          />
        </Link>
      </div>
      {isUserNameNeeded ? (
        <Link to={`/${user?.user_name}`} className="story-avatar-username">
          {user.user_name}
        </Link>
      ) : (
        ''
      )}
    </div>
  );
}
