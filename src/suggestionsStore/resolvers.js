import {
  setLoadingSuggestions,
  requestSuggestions,
  receiveSuggestions,
} from './actions';

export function* getSuggestions() {
  yield setLoadingSuggestions(true);
  const suggestions = yield requestSuggestions();
  yield receiveSuggestions(suggestions);
  yield setLoadingSuggestions(false);
}
