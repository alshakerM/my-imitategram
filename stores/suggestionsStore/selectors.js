export function getSuggestions(state, count) {
  if (count) {
    return state.suggestions.slice(0, count);
  } else {
    return state.suggestions;
  }
}
export function getIsLoading(state) {
  return state.isLoading;
}
