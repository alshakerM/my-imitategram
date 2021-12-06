import './StoryAvatar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
export function StoryAvatar({
  user,
  isUserNameNeeded,
  className,
  size = '64',
}) {
  const userId = user?.user_id;
  return (
    <div className={cx('story-avatar', className)}>
      <div className="circle">
        <div className="user-img-container">
          <Link to={`/stories/${userId}`}>
            <img
              src={user?.user_thumbnail}
              alt={`${user?.user_name} avatar`}
              className="story-user-avatar"
              width={size -9}
            />
          </Link>
          
        </div>
        <div className="animation-section">
          <svg viewBox="0 0 300 300" width={size} className="animation-svg">
            <linearGradient id="ig-grad" gradientTransform="rotate(45)">
              <stop stop-color="#fdd074" offset="0%" />
              <stop stop-color="#dd326e" offset="25%" />
              <stop stop-color="#FD1D1D" offset="50%" />
              <stop stop-color="#dd326e" offset="75%" />
              <stop stop-color="#a432b1" offset="100%" />
            </linearGradient>
            <circle
              className="animation-circle"
              cx="150"
              cy="150"
              r="140"
              stroke="url(#ig-grad)"
              stroke-width="11"
              fill="white"
              stroke-dasharray="20 100"
              stroke-linecap="round"
            />
          </svg>
        </div>
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
