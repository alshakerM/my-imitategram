export function togglePostLike(postId) {
  return {
    type: 'TOGGLE_POST_LIKE',
    postId,
  };
}

export function toggleCommentLike(postId, commentId) {
  return {
    type: 'TOGGLE_COMMENT_LIKE',
    postId,
    commentId,
  };
}

export function setCommentFieldText(text) {
  return {
    type: 'SET_COMMENT_FIELD_TEXT',
    text,
  };
}

export function setCommentFieldCommentId(postId, commentId) {
  return {
    type: 'SET_COMMENT_FIELD_COMMENT_ID',
    postId,
    commentId,
  };
}

export function toggleReplyLike(postId, commentId, replyId) {
  return {
    type: 'TOGGLE_REPLY_LIKE',
    postId,
    commentId,
    replyId,
  };
}

export function setLoadingPosts(isLoading) {
  return {
    type: 'SET_LOADING',
    isLoading,
  };
}
export function setExpandedPost(postId) {
  return {
    type: 'SET_EXPANDED_POST',
    postId,
  };
}

export function requestPosts(postId) {
  return { type: 'REQUEST_POSTS', postId };
}

export function receivePosts(posts) {
  return {
    type: 'RECEIVE_POSTS',
    posts,
  };
}
export function receivePost(post) {
  return {
    type: 'RECEIVE_POST',
    post,
  };
}

export function submitComment(postId, text) {
  return {
    type: 'SUBMIT_POST_COMMENT',
    postId,
    text,
  };
}
