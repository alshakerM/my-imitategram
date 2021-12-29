export function requestSuggestions(count) {
  return { type: 'REQUEST_SUGGESTIONS', count };
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
