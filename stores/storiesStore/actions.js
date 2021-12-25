export function requestStories(userId) {
  return { type: 'REQUEST_STORIES', userId };
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
