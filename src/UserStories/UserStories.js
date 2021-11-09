/**import storiesData from "../Data/IG-Stories.json";
import "./UserStories.css";
import React from "react";
import { StoryImage } from "../StoryImage/StoryImage";
import { absoluteToRelativeDate } from "../utils";
import { Avatar } from "../Avatar/Avatar";
import { IconButton } from "@mui/material";
import {
  ArrowBackIosNewOutlined,
  ArrowBackIosOutlined,
  Clear,
  Favorite,
  MoreHoriz,
  NavigateNext,
  NavigateNextOutlined,
  Pause,
  PlayArrow,
  VolumeMute,
  VolumeOff,
} from "@mui/icons-material";
import { StoryVideo } from "../StoryVideo/StoryVideo";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function progressWidth(storyIndex, progressBarIndex, progress) {
  if (progressBarIndex === storyIndex) {
    return `${progress * 100}%`;
  } else if (progressBarIndex < storyIndex) {
    return "100%";
  } else if (progressBarIndex > storyIndex) {
    return 0;
  }
}
export function UserStories({ userId }) {
  const userIndex = storiesData.findIndex((user) => user.user_id === userId);
  const user = storiesData[userIndex];
  const nextUser = storiesData[userIndex + 1];
  const prevUser = storiesData[userIndex - 1];
  const history = useHistory();
  const [storyIndex, setStoryIndex] = React.useState(0);
  const [pause, setPause] = React.useState(false);
  const [mute, setMute] = React.useState(false);
  const story = user.stories[storyIndex];
  const [currentProgress, setCurrentProgress] = React.useState(0);

  const progressHandler = (progress) => {
    if (progress === 1) {
      if (storyIndex === user.stories.length - 1) {
        if (nextUser) {
          history.push(`/stories/${nextUser.user_id}`);
          setStoryIndex(0);
        }
      } else {
        setStoryIndex((i) => i + 1);
      }
      setCurrentProgress(0);
    } else {
      setCurrentProgress(progress);
    }
  };

  return (
    <div className="page-container">
      <Link to="/" className="instagram-logo-link">
        Instagram
      </Link>
      <Link to="/" className="exit-icon-link">
        <Clear fontSize="large" />
      </Link>
      <div className="extended-stories-container">
        <div className="story-header">
          <div className="progress-bars">
            {user.stories.map((story, index) => (
              <div className="progress-bar">
                <div
                  style={{
                    height: "2px",
                    background: "white",
                    width: progressWidth(storyIndex, index, currentProgress),
                  }}
                ></div>
              </div>
            ))}
          </div>
          <Avatar avatar={user.user_thumbnail} alt={user.user_name} />
          <p>
            <strong>{user.user_name}</strong>
          </p>
          <p>{absoluteToRelativeDate(story.posting_time)}</p>
          <div className="story-actions">
            <IconButton onClick={() => setPause(!pause)}>
              {pause ? <PlayArrow /> : <Pause />}
            </IconButton>
            <IconButton onClick={() => setMute(!mute)}>
              {mute ? <VolumeMute /> : <VolumeOff />}
            </IconButton>
            <IconButton>
              <MoreHoriz />
            </IconButton>
          </div>
        </div>
        <div className="story-body">
          {story.story_type === "video" ? (
            <StoryVideo
              paused={pause}
              muted={mute}
              videoURL={story.story_media}
              onProgress={progressHandler}
              key={story.story_id}
            />
          ) : (
            <StoryImage
              src={story.story_media}
              onProgress={progressHandler}
              paused={pause}
              key={story.story_id}
            ></StoryImage>
          )}
        </div>
        <div className="next-prev-buttons">
          <button
            className="prev-button"
            onClick={() => {
              if (storyIndex > 0) {
                setCurrentProgress(0);
                setStoryIndex((s) => s - 1);
              } else {
                if (prevUser) {
                  history.push(`/stories/${prevUser.user_id}`);
                }
              }
            }}
          >
            <NavigateNext />
          </button>
          <button
            className="next-button"
            onClick={() => {
              if (storyIndex < user.stories.length - 1) {
                setCurrentProgress(0);
                setStoryIndex((s) => s + 1);
              } else {
                if (nextUser) {
                  history.push(`/stories/${nextUser.user_id}`);
                  setStoryIndex(0);
                }
              }
            }}
          >
            <NavigateNext />
          </button>
        </div>
        {story.can_reply ? (
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
          ""
        )}
      </div>
    </div>
  );
}
*/