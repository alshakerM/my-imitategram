import React from "react";
import { Avatar } from "../Avatar/Avatar";
import storiesData from "../Data/IG-Stories.json";
import { absoluteToRelativeDate } from "../utils";
import "./UsersStroyPage.css";

export function UsersStoryPage({ userId }) {
  const userIndex = storiesData.findIndex((user) => user.user_id === userId);
  const user = storiesData[userIndex];
  const [storyIndex, setStoryIndex] = React.useState(0);
  const story = user.stories[storyIndex];
  return (
    <div className="secondary-page-container">
      {storiesData.map((user) => (
        <div className="secondary-extended-stories-container">
          <div className="secondary-story-header">
            <Avatar
              id="secondary-user-avatar"
              src={user.user_thumbnail}
              alt={user.user_name}
            />
            <p className="secondary-username">
              <strong>{user.user_name}</strong>
            </p>
            <p className="secondary-story-post-time">
              {absoluteToRelativeDate(story.posting_time)}
            </p>
          </div>
          <div className="secondary-story-body">
            {story.story_type === "video" ? (
              <video
                style={{ opacity: "0.2", maxWidth: "340px" }}
                paused
                muted
                src={story.story_media}
                key={story.story_id}
              />
            ) : (
              <img
                style={{ opacity: "0.2", maxWidth: "340px" }}
                src={story.story_media}
                alt=""
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
