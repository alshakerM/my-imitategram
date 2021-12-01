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
import { IconButton } from '@mui/material';
import cx from 'classnames';
import React, { useRef } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Avatar } from '../Avatar/Avatar';
import { StoryAvatar } from '../StoryAvatar/StoryAvatar';
import { StoryImage } from '../StoryImage/StoryImage';
import { absoluteToRelativeDate } from '../utils';
import CircularProgress from '@mui/material/CircularProgress';
import './UserStories.css';
import { StoryVideo } from '../StroyVideo/StoryVideo';

function getX(el) {
  return el?.offsetLeft;
}
function width(el) {
  return el?.getBoundingClientRect().width;
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
  const [storiesData, setStoriesData] = React.useState([]);
  React.useEffect(() => {
    fetch('/Data/IG-Stories.json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((results) => setStoriesData(results));
  }, []);
  const userIndex = storiesData.findIndex((user) => user.user_id === userId);
  const user = storiesData[userIndex];
  const nextUser = storiesData[userIndex + 1];
  const prevUser = storiesData[userIndex - 1];
  const history = useHistory();
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
  const [currentStoryX, setCurrentStoryX] = React.useState(0);
  const [currentStoryWidth, setCurrentStoryWidth] = React.useState(0);
  const requiredX = window.innerWidth / 2 - currentStoryWidth / 2;
  const scrollAmount = Math.floor(currentStoryX - requiredX);

  const isLoading =
    storiesData.length === 0 || Object.keys(storyIndices).length === 0;

  const progressHandler = (progress) => {
    if (progress === 1) {
      if (storyIndices[userId] === user.stories.length - 1) {
        if (nextUser) {
          history.push(`/stories/${nextUser.user_id}`);
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
      <div key="all-stories" className="loading-section">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div key="all-stories" className="all-stories-container">
      <Link to="/" className="instagram-logo-link">
        Instagram
      </Link>
      <Link to="/" className="exit-icon-link">
        <Clear fontSize="large" />
      </Link>
      <div
        ref={allStoriesContainer}
        className="stories-scrollable"
        style={{ transform: `translateX(-${scrollAmount}px)` }}
      >
        {Object.keys(storyIndices).length &&
          storiesData.map((user) => {
            const activeStory = userId === user.user_id;
            const story = activeStory ? activeUserStory : user.stories[0];
            return (
              <div
                ref={(div) => {
                  if (div && activeStory && currentStoryX !== getX(div)) {
                    setCurrentStoryX(getX(div));
                    setCurrentStoryWidth(width(div));
                  }
                }}
                className={cx('stories-container', {
                  'is-expanded': activeStory,
                  'is-small': !activeStory,
                })}
                style={{ transition: 'all 0.5s ease-out' }}
                key={user.user_id}
                onClick={() => {
                  if (!activeStory) {
                    setCurrentProgress(0);
                    history.push(`/stories/${user.user_id}`);
                  }
                }}
              >
                <div
                  className={cx('story-header', {
                    'is-expanded': activeStory,
                    'is-small': !activeStory,
                  })}
                >
                  {activeStory && (
                    <div className="progress-bars">
                      {user.stories.map((story, index) => (
                        <div className="progress-bar" key={story.story_id}>
                          <div
                            className="progress-bar-core"
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

                  {activeStory ? (
                    <Avatar
                      borderColor="#fff"
                      avatar={user.user_thumbnail}
                      style={{ display: 'flex', alignSelf: 'center' }}
                      alt={user.user_name}
                    />
                  ) : (
                    <StoryAvatar
                      user={user}
                      className="story-avatar-small"
                    />
                  )}

                  <p
                    className={cx('story-username', {
                      'is-expanded': activeStory,
                      'is-small': !activeStory,
                    })}
                  >
                    <strong>{user.user_name}</strong>
                  </p>
                  <p
                    className={cx('story-post-time', {
                      'is-expanded': activeStory,
                      'is-small': !activeStory,
                    })}
                  >
                    {absoluteToRelativeDate(story.posting_time, 'mini')}
                  </p>

                  {activeStory ? (
                    <div className="story-actions">
                      <IconButton onClick={() => setPause(!pause)}>
                        {pause ? <PlayArrow /> : <Pause />}
                      </IconButton>
                      <IconButton onClick={() => setMute(!mute)}>
                        {mute ? <VolumeOff /> : <VolumeDown />}
                      </IconButton>
                      <IconButton>
                        <MoreHoriz />
                      </IconButton>
                    </div>
                  ) : (
                    ''
                  )}
                </div>

                <div
                  className={cx('story-body', {
                    'is-expanded': activeStory,
                    'is-small': !activeStory,
                  })}
                >
                  {story.story_type === 'video' ? (
                    <StoryVideo
                      paused={activeStory ? pause : true}
                      muted={activeStory ? mute : true}
                      videoURL={story.story_media}
                      className="story-video"
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
                    ></StoryImage>
                  )}
                </div>
                {activeStory && (
                  <div className="next-prev-buttons">
                    {(storyIndices[userId] > 0 || userIndex > 0) && (
                      <button
                        className="prev-button"
                        onClick={() => {
                          if (storyIndices[userId] > 0) {
                            setCurrentProgress(0);
                            setStoryIndices((indices) => ({
                              ...indices,
                              [userId]: indices[userId] - 1,
                            }));
                          } else {
                            if (prevUser) {
                              history.push(`/stories/${prevUser.user_id}`);
                            }
                          }
                        }}
                      >
                        <ChevronLeft />
                      </button>
                    )}
                    <button
                      className="next-button"
                      onClick={() => {
                        if (storyIndices[userId] < user.stories.length - 1) {
                          setCurrentProgress(0);
                          setStoryIndices((indices) => ({
                            ...indices,
                            [userId]: indices[userId] + 1,
                          }));
                        } else {
                          if (nextUser) {
                            history.push(`/stories/${nextUser.user_id}`);
                          }
                        }
                      }}
                    >
                      <ChevronRight />
                    </button>
                  </div>
                )}

                {story.can_reply && activeStory ? (
                  <div className="story-footer">
                    <input
                      type="text"
                      placeholder={`Reply to ${user.user_name}`}
                      className="story-reply-input"
                    />
                    <svg
                      aria-label="Direct"
                      className="direct-story-icon"
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
