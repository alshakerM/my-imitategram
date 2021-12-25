export async function REQUEST_SUGGESTIONS() {
  const response = await fetch('/Data/suggestions.json');
  const results = await response.json();
  return results;
}
