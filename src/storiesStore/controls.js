export async function REQUEST_STORIES() {
  const response = await fetch('/Data/IG-Stories.json');
  const results = await response.json();
  return results;
}
