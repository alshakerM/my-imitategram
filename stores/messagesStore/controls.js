export async function REQUEST_MESSAGES() {
  const response = await fetch('/Data/messages.json');
  const results = await response.json();
  return results;
}
