import React from 'react';
import produce from 'immer';

let cachedData;

const subscribers = new Set();

function createComment(user_name, user_thumbnail, comment) {

}

export function useIGData() {
  const [data, setData] = React.useState(cachedData || []);

  function updateSubscribers(data) {
    cachedData = data;
    subscribers.forEach((sub) => sub(data));
  }

  React.useEffect(() => {
    if (!cachedData) {
      fetch('../Data/IG-v2.json', {
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
    const newData = produce(data, (draft) => {
      draft[postIndex].is_post_liked = !draft[postIndex].is_post_liked;
    });
    updateSubscribers(newData);
  }
  function toggleCommentLike(postIndex, commentId) {
    const newData = produce(data, (draft) => {
      const comment = draft[postIndex].comments.find(
        (el) => el.comment_id === commentId
      );
      comment.is_liked_by_user = !comment.is_liked_by_user;
    });
    updateSubscribers(newData);
  }
  function toggleCommentReplyLike(postIndex, commentId, replyId) {
    const newData = produce(data, (draft) => {
      const comment = draft[postIndex].comments.find(
        (el) => el.comment_id === commentId
      );
      const reply = comment.replies.find((el) => el.comment_id === replyId);
      reply.is_liked_by_user = !reply.is_liked_by_user;
    });

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

  return {
    data,
    toggleLike,
    toggleCommentLike,
    toggleCommentReplyLike,
    addComment,
  };
}
