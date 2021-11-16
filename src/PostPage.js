import { Post } from './Post/Post';
import React from 'react';
import { useIGData } from './hooks/useIGData';

export function PostPage({ postId, isFloating }) {
  const {data} = useIGData();
  const post = data[postId];
  return (
    <div className="content-section">
      <Post
        index={postId}
        datum={post}
        comments={post?.comments}
        isExpanded={true}
        isFloating={isFloating}
      />
    </div>
  );
}
