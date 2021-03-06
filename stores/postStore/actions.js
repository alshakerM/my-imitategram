export function* postLike(postId, like = true) {
  yield {
    type: 'POST_LIKE',
    postId,
    like,
  };
  return {
    type: 'POST_LIKE',
    postId,
    like,
  };
}
export function* toggleCommentLike(postId, commentId) {
  yield {
    type: 'TOGGLE_COMMENT_LIKE',
    postId,
    commentId,
  };
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

export function* toggleReplyLike(postId, commentId, replyId) {
  yield {
    type: 'TOGGLE_REPLY_LIKE',
    postId,
    commentId,
    replyId,
  };
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
export function setItemsLeft(itemsLeft) {
  return {
    type: 'SET_ITEMS_LEFT',
    itemsLeft,
  };
}
export function setExpandedPost(postId) {
  return {
    type: 'SET_EXPANDED_POST',
    postId,
  };
}

export function requestPosts(postId, pageNumber) {
  return { type: 'REQUEST_POSTS', postId, pageNumber };
}

export function receivePosts(posts, pageNumber) {
  return {
    type: 'RECEIVE_POSTS',
    posts,
    pageNumber,
  };
}
export function receivePost(post) {
  return {
    type: 'RECEIVE_POST',
    post,
  };
}

export function* submitComment(postId, text) {
  yield {
    type: 'SUBMIT_POST_COMMENT',
    postId,
    text,
  };
  return {
    type: 'SUBMIT_POST_COMMENT',
    postId,
    text,
  };
}
