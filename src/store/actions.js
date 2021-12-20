export function togglePostLike(postIndex) {
  return {
    type: 'TOGGLE_POST_LIKE',
    postIndex,
  };
}

export function toggleCommentLike(postIndex, commentId) {
  return {
    type: 'TOGGLE_COMMENT_LIKE',
    postIndex,
    commentId,
  };
}

export function setCommentFieldText(text) {
  return {
    type: 'SET_COMMENT_FIELD_TEXT',
    text,
  };
}

export function setCommentFieldCommentId(postIndex, commentId) {
  return {
    type: 'SET_COMMENT_FIELD_COMMENT_ID',
    postIndex,
    commentId,
  };
}

export function toggleReplyLike(postIndex, commentId, replyId) {
  return {
    type: 'TOGGLE_REPLY_LIKE',
    postIndex,
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

export function requestPosts() {
  return { type: 'REQUEST_POSTS' };
}

export function receivePosts(posts) {
  return {
    type: 'RECEIVE_POSTS',
    posts,
  };
}

export function submitComment(postIndex, text) {
  return {
    type: 'SUBMIT_POST_COMMENT',
    postIndex,
    text,
  };
}
