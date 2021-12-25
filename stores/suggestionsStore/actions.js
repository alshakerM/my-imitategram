export function requestSuggestions() {
  return { type: 'REQUEST_SUGGESTIONS' };
}

export function receiveSuggestions(suggestions) {
  return {
    type: 'RECEIVE_SUGGESTIONS',
    suggestions,
  };
}

export function setLoadingSuggestions(isLoading) {
  return {
    type: 'SET_LOADING',
    isLoading,
  };
}
