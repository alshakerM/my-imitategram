import { setLoadingPosts, requestPosts, receivePosts } from './actions';

export function* getPosts() {
  yield setLoadingPosts(true);
  const posts = yield requestPosts();
  yield receivePosts(posts);
  yield setLoadingPosts(false);
}
