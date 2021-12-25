export function getPost(state, index) {
  return state.posts[index];
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
