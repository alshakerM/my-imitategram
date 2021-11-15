import React from 'react';
import { uuid } from 'uuidv4';

let cachedData;

const subscribers = new Set();

function createComment(user_name, user_thumbnail, comment) {
  const newComment = {
    comment_id: uuid(),
    user_name,
    comment,
    posting_time: new Date().toString(),
    user_thumbnail,
    comment_likes: 0,
    is_liked_by_user: false,
    replies: [],
  };
}

export function useIGData() {
  const [data, setData] = React.useState(cachedData || []);

  function updateSubscribers(data) {
    cachedData = data;
    subscribers.forEach((sub) => sub(data));
  }

  React.useEffect(() => {
    if (!cachedData) {
      fetch('../Data/IG.json', {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((results) => updateSubscribers(results));
    }
  }, []);

  React.useEffect(() => {
    subscribers.add(setData);
  }, [setData]);

  function toggleLike(postIndex) {
    const newPost = { ...data[postIndex] };
    newPost.is_post_liked = !newPost.is_post_liked;
    const newData = data.slice(0);
    newData.splice(postIndex, 1, newPost);
    updateSubscribers(newData);
  }

  function addComment(postIndex, commentBody, commentUserName) {
    const user = data.find((post) => post.user_name === commentUserName);
    const newComment = createComment(
      user.user_name,
      user.user_thumbnail,
      commentBody
    );

    const newPost = { ...data[postIndex] };
    const newPostComments = newPost.comments.slice(0);
    newPostComments.push(newComment);
    newPost.comments = newPostComments;

    const newData = data.slice(0);
    newData.splice(postIndex, 1, newPost);
    updateSubscribers(newData);
  }

  return { data, toggleLike, addComment };
}
