import { Post } from '../Post/Post';
import React from 'react';
import { useSelect } from '@wordpress/data';

export function PostPage({ postId, isFloating }) {
  const post = useSelect((select) => select('ig-posts').getPost(postId));
  console.log({post})

  return (
    <div className="content-section">
      <Post
        datum={post}
        comments={post?.comments}
        isFloating={isFloating}
        isIndependentPost
      />
    </div>
  );
}
