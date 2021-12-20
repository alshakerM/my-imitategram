import { setLoadingStories, requestStories, receiveStories } from './actions';

export function* getStories() {
  yield setLoadingStories(true);
  const stories = yield requestStories();
  yield receiveStories(stories);
  yield setLoadingStories(false);
}
