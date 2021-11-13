import { Post } from './Post/Post';
import React from 'react';

export function PostPage({ postId, isFloating }) {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch('../Data/MOCK_DATA.json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((results) => setData(results));
  }, []);
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
