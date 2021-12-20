import {
  setLoadingSuggestions,
  requestSuggestions,
  receiveSuggestions,
} from './actions';

export function* getSuggestions() {
  yield setLoadingSuggestions(true);
  console.log(1);
  const suggestions = yield requestSuggestions();
  console.log(suggestions);
  yield receiveSuggestions(suggestions);
  yield setLoadingSuggestions(false);
}
