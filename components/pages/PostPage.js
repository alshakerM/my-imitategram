import { Post } from '../Post/Post';
import React from 'react';
import { useSelect } from '@wordpress/data';

export function PostPage({ postId, isFloating, onlyComments }) {
  const post = useSelect((select) => select('ig-posts').getPost(postId));
  return (
    <div className="content-section">
      <Post
        onlyComments={onlyComments}
        datum={post}
        comments={post?.comments}
        isFloating={isFloating}
        isIndependentPost
      />
    </div>
  );
}
