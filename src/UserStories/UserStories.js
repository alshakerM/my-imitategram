import storiesData from "../Data/IG-Stories.json";
import "./UserStories.css";
import React from "react";
import { StoryImage } from "../StoryImage/StoryImage";
import { absoluteToRelativeDate } from "../utils";
import { Avatar } from "../Avatar/Avatar";
import { IconButton } from "@mui/material";
import {
  Favorite,
  MoreHoriz,
  Pause,
  PlayArrow,
  VolumeMute,
  VolumeOff,
} from "@mui/icons-material";
import { StoryVideo } from "../StoryVideo/StoryVideo";
import { useHistory } from "react-router";

/*
         <StoryImage
            width="200"
            onProgress={(progress) => setCurrentProgress(progress)}
            src="/Instagarm logo.png"
            className=""
          ></StoryImage>



          <div className="extended-stories-content">
        <div className="extended-media-container">
          <progress
            min="0"
            max="1"
            value={currentProgress}
            className="progress-bar"
          />
          <div className="story-username-avatar-section">
            <img src="{}" alt="story-user-avatar" />
            <p className="story-username"></p>
          </div>


             <video
          controls
          onTimeUpdate={(event) =>
            setCurrentProgress(
              event.currentTarget.currentTime / event.currentTarget.duration
            )
          }
          src="/willSmith.mp4"
          className=""
        ></video>
 */
function progressWidth(storyIndex, progressBarIndex, progress) {
  if (progressBarIndex === storyIndex) {
    return `${progress * 100}%`;
  } else if (progressBarIndex < storyIndex) {
    return "100 %";
  } else if (progressBarIndex > storyIndex) {
    return 0;
  }
}
export function UserStories({ userId }) {
  const userIndex = storiesData.findIndex((user) => user.user_id === userId);
  const user = storiesData[userIndex];
  const nextUser = storiesData[userIndex + 1];
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
    </div>
  );
}
