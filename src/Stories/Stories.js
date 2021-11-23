import classnames from 'classnames';
import React, { useState } from 'react';
import { CircularChevron } from '../Icons/CircularChevron';
import { StoryAvatar } from '../StoryAvatar/StoryAvatar';
import './Stories.css';
function width(el) {
  return el?.getBoundingClientRect().width;
}

export function Stories() {
  const allCirclesDiv = React.useRef();
  const allCirclesWidth = width(allCirclesDiv.current);
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
        ref={(ref) => setContainerWidth(width(ref))}
        className="stories-overflow"
      >
        <div
          style={{ transform: `translateX(${scrollLeft}px)` }}
          ref={allCirclesDiv}
          className="all-circles"
        >
          {storiesData.map((user, index) => (
            <StoryAvatar key={user.user_id} user={user} index={index} isUserNameNeeded={true} />
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
