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
import { absoluteToRelativeDate, numberBetween } from '../../../utils';
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
function calculateStoryDimensions() {
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

export function UserStories({ userId }) {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  const areStoriesResolved = useSelect((select) =>
    select('ig-stories').hasFinishedResolution('getStories')
  );
  const [isOneUser] = React.useState(!areStoriesResolved);

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
      setDimensions(calculateStoryDimensions());
    }
    window.addEventListener('resize', handler);
    setDimensions(calculateStoryDimensions());
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);
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
  const activeUserStory = user?.stories[storyIndices[userId]];
  const [currentProgress, setCurrentProgress] = React.useState(0);
  const allStoriesContainer = useRef();
  const currentStoryX = userIndex * dimensions.width;
  const requiredX =
    global.innerWidth / 2 - (dimensions.width / 2 + STORY_BORDER_WIDTH);
  const scrollAmount = Math.floor(currentStoryX - requiredX);

  const isLoading =
    storiesData.length === 0 || Object.keys(storyIndices).length === 0;

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
      <Link href="/">
        <a className={styles.instagramLogoLink}>
          <Image
            src="/Instagram_logo_text-light.svg"
            width="109"
            height="39"
            alt="Instagram text"
          />
        </a>
      </Link>

      <Link href="/">
        <a className={styles.exitIconLink}>
          <Clear fontSize="large" />
        </a>
      </Link>
      <div
        ref={allStoriesContainer}
        className={styles.storiesScrollable}
        style={{ transform: `translateX(${-scrollAmount}px)` }}
      >
        {Object.keys(storyIndices).length &&
          storiesData.map((user) => {
            const activeUser = userId === user.user_id;
            // when the user isn't specified, we go to the first story
            const story = activeUser ? activeUserStory : user.stories[0];
            return (
              <div
                className={cx(styles.storiesContainer, {
                  [styles.isExpanded]: activeUser,
                  [styles.isSmall]: !activeUser,
                })}
                style={dimensions}
                key={user.user_id}
                onClick={() => {
                  if (!activeUser) {
                    setCurrentProgress(0);
                    history.push(`/stories/${user.user_id}`, undefined, {
                      shallow: true,
                    });
                  }
                }}
              >
                <div
                  className={cx(styles.storyHeader, {
                    [styles.isExpanded]: activeUser,
                    [styles.isSmall]: !activeUser,
                  })}
                >
                  {activeUser && (
                    <div className={styles.progressBars}>
                      {user.stories.map((story, index) => (
                        <div
                          className={styles.progressBar}
                          key={story.story_id}
                        >
                          <div
                            className={styles.progressBarCore}
                            style={{
                              width: progressWidth(
                                storyIndices[userId],
                                index,
                                currentProgress
                              ),
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  )}
                  <Avatar
                    user={user}
                    size={activeUser ? 'small' : 'medium'}
                    className={cx({
                      [styles.storyAvatarSmall]: !activeUser,
                      [styles.storyAvatarActive]: activeUser,
                    })}
                    colorRing={
                      !activeUser &&
                      storyIndices[user.user_id] !== user.stories.length - 1
                    }
                    isSilver={
                      !activeUser &&
                      storyIndices[user.user_id] === user.stories.length - 1
                    }
                    link={`/stories/${user.user_id}`}
                  />

                  <p
                    className={cx(styles.storyUsername, {
                      [styles.isExpanded]: activeUser,
                      [styles.isSmall]: !activeUser,
                    })}
                  >
                    <strong>{user.user_name}</strong>
                  </p>
                  <p
                    className={cx(styles.storyPostTime, {
                      [styles.isExpanded]: activeUser,
                      [styles.isSmall]: !activeUser,
                    })}
                  >
                    {absoluteToRelativeDate(story.posting_time, 'mini')}
                  </p>
                  {activeUser ? (
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
                    [styles.isExpanded]: activeUser,
                    [styles.isSmall]: !activeUser,
                  })}
                >
                  {story.story_type === 'video' ? (
                    <StoryVideo
                      paused={activeUser ? pause : true}
                      muted={activeUser ? mute : true}
                      videoURL={story.story_media}
                      onProgress={progressHandler}
                      key={story.story_id}
                      autoPlay={true}
                    />
                  ) : (
                    <StoryImage
                      src={story.story_media}
                      onProgress={progressHandler}
                      paused={activeUser ? pause : true}
                      key={story.story_id}
                      dimensions={dimensions}
                    />
                  )}
                </div>
                {activeUser && (
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
                      onClick={() => {
                        if (storyIndices[userId] < user.stories.length - 1) {
                          setCurrentProgress(0);
                          setStoryIndices((indices) => ({
                            ...indices,
                            [userId]: indices[userId] + 1,
                          }));
                        } else {
                          if (nextUser) {
                            history.push(
                              `/stories/${nextUser.user_id}`,
                              undefined,
                              { shallow: true }
                            );
                          } else if (isOneUser) {
                            history.push('/');
                          }
                        }
                      }}
                    >
                      <ChevronRight />
                    </button>
                  </div>
                )}

                {story.can_reply && activeUser ? (
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
