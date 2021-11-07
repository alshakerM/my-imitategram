import storiesData from "../Data/IG-Stories.json";
import "./StoryInfo.css";
import React from "react";
import { StoryImage } from "../StoryImage/StoryImage";

/**
 * <video
          width="200"
            controls
            onTimeUpdate={(event) =>
              setCurrentProgress(
                event.currentTarget.currentTime / event.currentTarget.duration
              )
            }
            src="/willSmith.mp4"
            className=""
          ></video>
 * @param {*} param0 
 * @returns 
 *           <StoryImage
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
 */

export function StoryInfo({ userId }) {
  const user = storiesData.find((user) => user.user_id === userId);
  console.log(user);
  const [currentProgress, setCurrentProgress] = React.useState(0);
  return (
    <div className="extended-stories-container">
      <div className="video-container">
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
      </div>
      <div className="video-content-container">
        <progress
          min="0"
          max="1"
          value={currentProgress}
          className="progress-bar"
        />
        <div className="story-username-avatar-section">
          <img className="user-avatar" src={user.user_thumbnail} alt="story-user-avatar" />
          <p className="story-username"></p>
        </div>
      </div>
    </div>
  );
}
