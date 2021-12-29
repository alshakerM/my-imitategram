import {
  setLoadingSuggestions,
  requestSuggestions,
  receiveSuggestions,
} from './actions';

export function* getSuggestions(count) {
  yield setLoadingSuggestions(true);
  const suggestions = yield requestSuggestions(count);
  yield receiveSuggestions(suggestions);
  yield setLoadingSuggestions(false);
}
