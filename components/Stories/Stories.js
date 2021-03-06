import classnames from 'classnames';
import React, { useState } from 'react';
import Link from 'next/link';
import { CircularChevron } from '../Icons/CircularChevron';
import { Avatar } from '../Avatar/Avatar';
import { elementWidth } from '../../utils';
import styles from './Stories.module.css';
import { useSelect } from '@wordpress/data';
import '../../stores/storiesStore';

export function Stories() {
  const allCirclesDiv = React.useRef();
  const allCirclesWidth = elementWidth(allCirclesDiv.current);
  const [containerWidth, setContainerWidth] = useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const scrollLimit = -1 * (allCirclesWidth - containerWidth);
  const storiesData = useSelect((select) => select('ig-stories').getStories());
  return (
    <div className={styles.storiesAvatarsContainer}>
      <div
        ref={(ref) => setContainerWidth(elementWidth(ref))}
        className={styles.storiesOverflow}
      >
        <div
          style={{ transform: `translateX(${scrollLeft}px)` }}
          ref={allCirclesDiv}
          className={styles.allCircles}
        >
          {storiesData.map((user, index) => (
            <div key={user.user_id}>
              <Avatar
                key={user.user_id}
                user={user}
                index={index}
                colorRing
                size="medium"
                link={`/stories/${user.user_id}`}
              />
              <Link href={`/${user?.user_name}`}>
                <a className={styles.storyAvatarUsername}>{user.user_name}</a>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.navButtonsContainer}>
        <button
          onClick={() => {
            setScrollLeft((s) => Math.min(0, s + containerWidth / 2));
          }}
          className={classnames(styles.storyNavPrev, {
            [styles.hidden]: scrollLeft === 0,
          })}
        >
          <CircularChevron maskKey="story-previous" size="24" />
        </button>

        <button
          onClick={() => {
            setScrollLeft((s) => Math.max(scrollLimit, s - containerWidth / 2));
          }}
          className={classnames(styles.storyNavNext, {
            [styles.hidden]: scrollLeft === scrollLimit,
          })}
        >
          <CircularChevron maskKey="story-next" size="24" direction="left" />
        </button>
      </div>
    </div>
  );
}
