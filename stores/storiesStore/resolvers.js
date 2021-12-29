import { setLoadingStories, requestStories, receiveStories } from './actions';

export function* getStories(userId) {
  yield setLoadingStories(true);
  const stories = yield requestStories(userId);
  yield receiveStories(stories);
  yield setLoadingStories(false);
}
