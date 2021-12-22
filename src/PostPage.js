import { Post } from './Post/Post';
import React from 'react';
import { useSelect } from '@wordpress/data';

export function PostPage({ postId, isFloating }) {
  const data = useSelect((select) => select('ig-posts').getPosts());
  if (!data.length) {
    return null;
  }
  const post = data?.find((el) => postId === el.post_id);
  return (
    <div className="content-section">
      <Post
        index={postId}
        datum={post}
        comments={post?.comments}
        isFloating={isFloating}
        isIndependentPost
      />
    </div>
  );
}
