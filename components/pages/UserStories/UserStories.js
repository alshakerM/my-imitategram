import {
  ChevronLeft,
  ChevronRight,
  Clear,
  MoreHoriz,
  Pause,
  PlayArrow,
  VolumeDown,
  VolumeOff,
} from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelect } from '@wordpress/data';
import cx from 'classnames';
import React, { useRef } from 'react';
import Link from 'next/link';
import { Avatar } from '../../Avatar/Avatar';
import { StoryImage } from '../../StoryImage/StoryImage';
import { StoryVideo } from '../../StroyVideo/StoryVideo';
import {
  absoluteToRelativeDate,
  numberBetween,
  useMediaQuery,
} from '../../../utils';
import styles from './UserStories.module.css';
import '../../../stores/storiesStore';
import { useRouter } from 'next/router';
import Image from 'next/image';

const STORY_ASPECT_RATIO = 0.562;
const STORY_VERTICAL_MARGIN = 18;
const TABLET_BREAKPOINT = 1540;
const TABLET_STORY_RATIO = 0.59;
/**
 * borders are needed to activate next-prev nav buttons hover
 */
const STORY_BORDER_WIDTH = 46;
function calculateStoryDimensions(isMobile) {
  if (isMobile) {
    return { width: window.innerWidth, height: window.innerHeight };
  }
  const maxHeight = window.innerHeight - STORY_VERTICAL_MARGIN * 2;
  let height, width;
  if (window.innerWidth < window.innerHeight) {
    // strangely, real IG connects the height of the story to the width of the screen
    height = Math.min(window.innerWidth - STORY_VERTICAL_MARGIN * 2, maxHeight);
    width = height * STORY_ASPECT_RATIO;
  } else {
    if (window.innerWidth < TABLET_BREAKPOINT) {
      height = numberBetween(
        TABLET_STORY_RATIO * window.innerWidth,
        500,
        maxHeight
      );

      width = height * STORY_ASPECT_RATIO;
    } else {
      height = maxHeight;
      width = height * STORY_ASPECT_RATIO;
    }
  }
  return { width, height };
}

function progressWidth(storyIndex, progressBarIndex, progress) {
  if (progressBarIndex === storyIndex) {
    return `${progress * 100}%`;
  } else if (progressBarIndex < storyIndex) {
    return '100%';
  } else if (progressBarIndex > storyIndex) {
    return 0;
  }
}

function calculateOrigin(direction, position) {
  if (direction === 'left') {
    switch (position) {
      case -1:
        return 100;
      case 0:
        return 100;
      case 1:
        return 0;
    }
  } else {
    switch (position) {
      case -1:
        return 100;
      case 0:
        return 0;
      case 1:
        return 100;
    }
  }
}

export function UserStories({ userId }) {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  const areStoriesResolved = useSelect((select) =>
    select('ig-stories').hasFinishedResolution('getStories')
  );
  const [isOneUser] = React.useState(!areStoriesResolved);
  const isMobile = useMediaQuery('(max-width: 735px)');
  const storiesData = useSelect(
    (select) => {
      if (areStoriesResolved) {
        return select('ig-stories').getStories();
      } else {
        if (!userId) {
          return [];
        }
        return select('ig-stories').getStories(userId);
      }
    },
    [userId]
  );
  React.useEffect(() => {
    function handler() {
      setDimensions(calculateStoryDimensions(isMobile));
    }
    window.addEventListener('resize', handler);
    setDimensions(calculateStoryDimensions(isMobile));
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [isMobile]);
  const userIndex = storiesData.findIndex((user) => user.user_id === userId);

  const user = storiesData[userIndex];
  const nextUser = storiesData[userIndex + 1];
  const prevUser = storiesData[userIndex - 1];
  const history = useRouter();
  const [storyIndices, setStoryIndices] = React.useState(
    storiesData.reduce((acc, user) => {
      acc[user.user_id] = 0;
      return acc;
    }, {})
  );
  React.useEffect(() => {
    setStoryIndices(
      storiesData.reduce((acc, user) => {
        acc[user.user_id] = 0;
        return acc;
      }, {})
    );
  }, [storiesData]);
  const [pause, setPause] = React.useState(false);
  const [mute, setMute] = React.useState(false);
  const [mouseDownPosition, setMouseDownPosition] = React.useState(false);
  const activeUserStory = user?.stories[storyIndices[userId]];
  const [currentProgress, setCurrentProgress] = React.useState(0);
  const [dragOffset, setDragOffset] = React.useState(0);
  const allStoriesContainer = useRef();
  const currentStoryX = userIndex * dimensions.width;
  const dragDirection = dragOffset > 0 ? 'right' : 'left';
  const requiredX =
    global.innerWidth / 2 -
    (dimensions.width / 2 + (isMobile ? 0 : STORY_BORDER_WIDTH)) +
    dragOffset;
  const scrollAmount = Math.floor(currentStoryX - requiredX);

  const isLoading =
    storiesData.length === 0 || Object.keys(storyIndices).length === 0;

  function goToNextStory() {
    if (storyIndices[userId] < user.stories.length - 1) {
      setCurrentProgress(0);
      setStoryIndices((indices) => ({
        ...indices,
        [userId]: indices[userId] + 1,
      }));
    } else {
      goToNextUser();
    }
  }
  function goToPrevUser() {
    if (prevUser) {
      history.push(`/stories/${prevUser.user_id}`, undefined, {
        shallow: true,
      });
    } else if (isOneUser) {
      history.push('/');
    }
  }
  function goToNextUser() {
    if (nextUser) {
      history.push(`/stories/${nextUser.user_id}`, undefined, {
        shallow: true,
      });
    } else if (isOneUser) {
      history.push('/');
    }
  }
  const progressHandler = (progress) => {
    if (progress === 1) {
      if (storyIndices[userId] === user.stories.length - 1) {
        if (nextUser) {
          history.push(`/stories/${nextUser.user_id}`, undefined, {
            shallow: true,
          });
        }
      } else {
        setStoryIndices((indices) => ({
          ...indices,
          [userId]: indices[userId] + 1,
        }));
      }
      setCurrentProgress(0);
    } else {
      setCurrentProgress(progress);
    }
  };

  if (isLoading) {
    return (
      <div key="all-stories" className={styles.loadingSection}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div key="all-stories" className={styles.allStoriesContainer}>
      {!isMobile && (
        <>
          <Link href="/">
            <a className={styles.imitategramLogoLink}>
              <Image
                src="/Imitategram_logo_text-light.svg"
                width="109"
                height="39"
                alt="Imitategram text"
              />
            </a>
          </Link>

          <Link href="/">
            <a className={styles.exitIconLink}>
              <Clear fontSize="large" />
            </a>
          </Link>
        </>
      )}

      <div
        ref={allStoriesContainer}
        className={styles.storiesScrollable}
        style={{ transform: `translateX(${-scrollAmount}px)` }}
      >
        {Object.keys(storyIndices).length &&
          storiesData.map((user) => {
            const currentUserIndex = storiesData.findIndex(
              (u) => u.user_id === user.user_id
            );
            const userPosition = currentUserIndex - userIndex;

            if (isMobile && Math.abs(userPosition) > 1) {
              return (
                <div
                  style={{
                    width: window.innerWidth,
                    height: window.innerHeight,
                    flex: '0 0 auto',
                  }}
                ></div>
              );
            }
            if (
              userPosition === -2 &&
              dragDirection === 'right' &&
              dragOffset !== 0
            ) {
              return (
                <div
                  style={{
                    width: window.innerWidth,
                    height: window.innerHeight,
                    flex: '0 0 auto',
                  }}
                ></div>
              );
            }
            if (
              userPosition === -1 &&
              dragDirection === 'left' &&
              dragOffset !== 0
            ) {
              return (
                <div
                  style={{
                    width: window.innerWidth,
                    height: window.innerHeight,
                    flex: '0 0 auto',
                  }}
                ></div>
              );
            }

            const fullStory = userId === user.user_id || isMobile;
            const activeStory = userId === user.user_id;
            // when the user isn't specified, we go to the first story
            let story = fullStory ? activeUserStory : user.stories[0];
            let transformations = {};
            if (isMobile) {
              story = user.stories[storyIndices[user.user_id]];
              transformations = {
                transform: `perspective(2000px) rotateY(${Math.abs(
                  360 +
                    (dragOffset / window.innerWidth) * 90 +
                    90 * userPosition
                )}deg)`,
                transformOrigin: `${calculateOrigin(
                  dragDirection,
                  userPosition
                )}% center`,
              };
            }

            return (
              <div
                className={cx(styles.storiesContainer, {
                  [styles.isExpanded]: fullStory,
                  [styles.isSmall]: !fullStory,
                })}
                style={{
                  ...dimensions,
                  ...transformations,
                }}
                key={user.user_id}
                onClick={() => {
                  if (!fullStory) {
                    setCurrentProgress(0);
                    history.push(`/stories/${user.user_id}`, undefined, {
                      shallow: true,
                    });
                  }
                }}
              >
                <div
                  className={cx(styles.storyHeader, {
                    [styles.isExpanded]: fullStory,
                    [styles.isSmall]: !fullStory,
                  })}
                >
                  {fullStory && (
                    <div className={styles.progressBars}>
                      {user.stories.map((story, index) => (
                        <div
                          className={styles.progressBar}
                          key={story.story_id}
                        >
                          <div
                            className={styles.progressBarCore}
                            style={{
                              width: activeStory
                                ? progressWidth(
                                    storyIndices[userId],
                                    index,
                                    currentProgress
                                  )
                                : 0,
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  )}
                  <Avatar
                    user={user}
                    size={fullStory ? 'small' : 'medium'}
                    className={cx({
                      [styles.storyAvatarSmall]: !fullStory,
                      [styles.storyAvatarActive]: fullStory,
                    })}
                    colorRing={
                      !fullStory &&
                      storyIndices[user.user_id] !== user.stories.length - 1
                    }
                    isSilver={
                      !fullStory &&
                      storyIndices[user.user_id] === user.stories.length - 1
                    }
                    link={`/stories/${user.user_id}`}
                  />

                  <p
                    className={cx(styles.storyUsername, {
                      [styles.isExpanded]: fullStory,
                      [styles.isSmall]: !fullStory,
                    })}
                  >
                    <strong>{user.user_name}</strong>
                  </p>
                  <p
                    className={cx(styles.storyPostTime, {
                      [styles.isExpanded]: fullStory,
                      [styles.isSmall]: !fullStory,
                    })}
                  >
                    {absoluteToRelativeDate(story.posting_time, 'mini')}
                  </p>
                  {fullStory ? (
                    <div className={styles.storyActions}>
                      <button
                        className={styles.storyAction}
                        onClick={() => setPause(!pause)}
                      >
                        {pause ? <PlayArrow /> : <Pause />}
                      </button>
                      <button
                        className={styles.storyAction}
                        onClick={() => setMute(!mute)}
                      >
                        {mute ? <VolumeOff /> : <VolumeDown />}
                      </button>
                      <button className={styles.storyAction}>
                        <MoreHoriz />
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                </div>

                <div
                  className={cx(styles.storyBody, {
                    [styles.isExpanded]: fullStory,
                    [styles.isSmall]: !fullStory,
                  })}
                  onClick={goToNextStory}
                  onTouchStart={(e) =>
                    setMouseDownPosition(e.changedTouches[0].clientX)
                  }
                  onTouchEnd={(e) => {
                    if (
                      Math.abs(
                        mouseDownPosition - e.changedTouches[0].clientX
                      ) >
                      window.innerWidth / 3
                    ) {
                      if (mouseDownPosition > e.changedTouches[0].clientX) {
                        goToNextUser();
                      } else {
                        goToPrevUser();
                      }
                    }
                    setDragOffset(0);
                  }}
                  onTouchMove={(e) => {
                    setDragOffset(
                      e.changedTouches[0].clientX - mouseDownPosition
                    );
                  }}
                >
                  {story.story_type === 'video' ? (
                    <StoryVideo
                      paused={activeStory ? pause : true}
                      muted={activeStory ? mute : true}
                      videoURL={story.story_media}
                      onProgress={progressHandler}
                      key={story.story_id}
                      autoPlay={true}
                    />
                  ) : (
                    <StoryImage
                      src={story.story_media}
                      onProgress={progressHandler}
                      paused={activeStory ? pause : true}
                      key={story.story_id}
                      dimensions={dimensions}
                    />
                  )}
                </div>
                {fullStory && (
                  <div
                    className={styles.nextPrevButtons}
                    style={{ width: dimensions.width }}
                  >
                    {(storyIndices[userId] > 0 ||
                      userIndex > 0 ||
                      isOneUser) && (
                      <button
                        className={styles.prevButton}
                        onClick={() => {
                          if (storyIndices[userId] > 0) {
                            setCurrentProgress(0);
                            setStoryIndices((indices) => ({
                              ...indices,
                              [userId]: indices[userId] - 1,
                            }));
                          } else {
                            if (prevUser) {
                              history.push(
                                `/stories/${prevUser.user_id}`,
                                undefined,
                                { shallow: true }
                              );
                            } else if (isOneUser) {
                              history.push('/');
                            }
                          }
                        }}
                      >
                        <ChevronLeft />
                      </button>
                    )}
                    <button
                      className={styles.nextButton}
                      onClick={goToNextStory}
                    >
                      <ChevronRight />
                    </button>
                  </div>
                )}

                {story.can_reply && fullStory ? (
                  <div className={styles.storyFooter}>
                    <input
                      type="text"
                      placeholder={`Reply to ${user.user_name}`}
                      className={styles.storyReplyInput}
                    />
                    <svg
                      aria-label="Direct"
                      className={styles.directStoryIcon}
                      color="#dbdbdb"
                      fill="#dbdbdb"
                      height="24"
                      role="img"
                      viewBox="0 0 48 48"
                      width="24"
                    >
                      <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                    </svg>
                  </div>
                ) : (
                  ''
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
