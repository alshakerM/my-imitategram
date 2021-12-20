export function requestStories() {
  return { type: 'REQUEST_STORIES' };
}

export function receiveStories(stories) {
  return {
    type: 'RECEIVE_STORIES',
    stories,
  };
}

export function setLoadingStories(isLoading) {
  return {
    type: 'SET_LOADING',
    isLoading,
  };
}
