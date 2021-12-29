import {
  setLoadingPosts,
  requestPosts,
  receivePosts,
  receivePost,
  setItemsLeft,
} from './actions';

export function* getPosts(pageNumber) {
  yield setLoadingPosts(true);
  const { posts, itemsLeft } = yield requestPosts(undefined, pageNumber);
  yield receivePosts(posts);
  yield setItemsLeft(itemsLeft);
  yield setLoadingPosts(false);
}

export function* _getPost(postId) {
  yield setLoadingPosts(true);
  const post = yield requestPosts(postId);
  yield receivePost(post);
  yield setLoadingPosts(false);
}
