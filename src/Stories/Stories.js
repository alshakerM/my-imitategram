import classnames from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CircularChevron } from '../Icons/CircularChevron';
import { Avatar } from '../Avatar/Avatar';
import { elementWidth } from '../utils';
import './Stories.css';

export function Stories() {
  const allCirclesDiv = React.useRef();
  const allCirclesWidth = elementWidth(allCirclesDiv.current);
  const [containerWidth, setContainerWidth] = useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const scrollLimit = -1 * (allCirclesWidth - containerWidth);
  const [storiesData, setStoriesData] = React.useState([]);
  React.useEffect(() => {
    fetch('../Data/IG-Stories.json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((results) => setStoriesData(results));
  }, []);
  return (
    <div className="stories-avatars-container">
      <div
        ref={(ref) => setContainerWidth(elementWidth(ref))}
        className="stories-overflow"
      >
        <div
          style={{ transform: `translateX(${scrollLeft}px)` }}
          ref={allCirclesDiv}
          className="all-circles"
        >
          {storiesData.map((user, index) => (
            <div key={user.user_id}>
              <Avatar
                key={user.user_id}
                user={user}
                index={index}
                colorRing
                size="medium"
              />
              <Link
                to={`/${user?.user_name}`}
                className="story-avatar-username"
              >
                {user.user_name}
              </Link>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setScrollLeft((s) => Math.min(0, s + containerWidth / 2));
          }}
          className={classnames('story-nav-prev', {
            hidden: scrollLeft === 0,
          })}
        >
          <CircularChevron size="24" />
        </button>

        <button
          onClick={() => {
            setScrollLeft((s) => Math.max(scrollLimit, s - containerWidth / 2));
          }}
          className={classnames('story-nav-next', {
            hidden: scrollLeft === scrollLimit,
          })}
        >
          <CircularChevron size="24" direction="left" />
        </button>
      </div>
    </div>
  );
}
