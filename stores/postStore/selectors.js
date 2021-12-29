import { select } from '@wordpress/data';

export function _getPost(state, postId) {
  return state.posts.find((post) => post.post_id === postId);
}

export function getPost(state, postId) {
  // check if the post is already in the store, without triggering the resolver (fetch)
  const post = state.posts.find((post) => post.post_id === postId);
  if (post) {
    return post;
  } else {
    return select('ig-posts')._getPost(postId);
  }
}
export function getPosts(state) {
  return state.posts;
}
export function getIsLoading(state) {
  return state.isLoading;
}
export function getExpandedPost(state) {
  return state.expandedPostId;
}

export function getCommentFieldText(state) {
  return state.commentFieldText;
}
export function getCommentFieldCommentId(state) {
  return state.commentFieldCommentId;
}
