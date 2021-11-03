import { Post } from "./Post/Post";
import React from "react";
import "./App.css";
import data from "./Data/IG.json";

export function PostPage({ postId, isFloating}) {
  const post = data[postId];
  return (
    <div className="content-section">
      <Post
        datum={post}
        comments={post.comments}
        isExtended={true}
        isFloating={isFloating}
      />
    </div>
  );
}
