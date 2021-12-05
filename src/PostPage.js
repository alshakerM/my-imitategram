import { Post } from './Post/Post';
import React from 'react';
import { useIGData } from './hooks/useIGData';

export function PostPage({ setIsExpanded, postId, isFloating }) {
  const { data } = useIGData();
  if (!data.length) {
    return null;
  }
  const post = data[postId];
  return (
    <div className="content-section">
      <Post
        index={postId}
        datum={post}
        comments={post?.comments}
        isExpanded={true}
        setIsExpanded={setIsExpanded}
        isFloating={isFloating}
      />
    </div>
  );
}
