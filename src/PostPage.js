import { Post } from './Post/Post';
import React, { useEffect } from 'react';


export function PostPage({ postId, isFloating }) {
  const arr = React.useS([]);
  const data = arr[0];
  const setData = arr[1];
  React.useEffect(() => {
    fetch('../Data/IG.json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((results) => setData(results));
  }, []);
  const post = useDeleteAfter5Sec(data[postId]);
  return (
    <div className="content-section">
      <Post
        datum={post}
        comments={post?.comments}
        isExtended={true}
        isFloating={isFloating}
      />
    </div>
  );
}
