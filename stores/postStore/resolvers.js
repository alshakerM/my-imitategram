import {
  setLoadingPosts,
  requestPosts,
  receivePosts,
  receivePost,
} from './actions';

export function* getPosts() {
  yield setLoadingPosts(true);
  const posts = yield requestPosts();
  yield receivePosts(posts);
  yield setLoadingPosts(false);
}

export function* _getPost(postId) {
  yield setLoadingPosts(true);
  const post = yield requestPosts(postId);
  yield receivePost(post);
  yield setLoadingPosts(false);
}