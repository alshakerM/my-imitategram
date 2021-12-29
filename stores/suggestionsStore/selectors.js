export function getSuggestions(state, count) {
  return state.suggestions.slice(0, count);
}
export function getIsLoading(state) {
  return state.isLoading;
}

