import "./StoryAvatar.css";
import React from "react";
import { Link } from "react-router-dom";

export function StoryAvatar({ user, index }) {
  const userId = user.user_id;

  return (
    <div className="story-avatar">
      <div className="circle">
        <Link className="circle2" to={`/stories/${userId}`}>
          <img src={user.user_thumbnail} />
        </Link>
      </div>
      <p className="story-avatar-username">{user.user_name}</p>
    </div>
  );
}
